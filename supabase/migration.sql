-- ============================================
-- 职映 ZhiYing 数据库 Migration
-- 请在 Supabase SQL Editor 中执行此文件:
-- https://nobuzpvtdjmkwodjbdfx.supabase.co → SQL Editor → New Query
-- 全选 → Run (或 Ctrl+Enter)
-- ============================================

-- 1. 用户扩展信息表
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE,
  display_name VARCHAR(100),
  avatar_url TEXT,
  provider TEXT DEFAULT 'email',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  onboarding_completed BOOLEAN DEFAULT false
);

-- 2. 知识库表
CREATE TABLE IF NOT EXISTS public.knowledge_bases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(200) NOT NULL,
  stage TEXT NOT NULL DEFAULT 'collecting',
  basic_info JSONB,
  education JSONB,
  core_experiences JSONB,
  internships_jobs JSONB,
  projects JSONB,
  skills JSONB,
  certificates_honors JSONB,
  portfolio JSONB,
  self_reflection JSONB,
  photo_url TEXT,
  is_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 自检结果表
CREATE TABLE IF NOT EXISTS public.self_check_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kb_id UUID UNIQUE NOT NULL REFERENCES public.knowledge_bases(id) ON DELETE CASCADE,
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. 岗位匹配表
CREATE TABLE IF NOT EXISTS public.job_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  kb_id UUID NOT NULL REFERENCES public.knowledge_bases(id),
  raw_jd_text TEXT NOT NULL,
  jd_image_url TEXT,
  parsed_job_info JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. 匹配结果表
CREATE TABLE IF NOT EXISTS public.match_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_match_id UUID UNIQUE NOT NULL REFERENCES public.job_matches(id) ON DELETE CASCADE,
  direct_matches JSONB NOT NULL DEFAULT '[]',
  associations JSONB NOT NULL DEFAULT '[]',
  gaps JSONB NOT NULL DEFAULT '[]',
  evaluation_9dim JSONB NOT NULL DEFAULT '{}',
  recommendation TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. 学习路径表
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_match_id UUID UNIQUE NOT NULL REFERENCES public.job_matches(id) ON DELETE CASCADE,
  gap_items JSONB DEFAULT '[]',
  plan_7day JSONB DEFAULT '[]',
  plan_30day JSONB DEFAULT '[]',
  interview_qa JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. 简历表
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  job_match_id UUID REFERENCES public.job_matches(id),
  kb_id UUID NOT NULL REFERENCES public.knowledge_bases(id),
  name VARCHAR(200) NOT NULL,
  content_json JSONB NOT NULL DEFAULT '{}',
  docx_file_url TEXT,
  pdf_file_url TEXT,
  page_count INT DEFAULT 1,
  traceability_map JSONB DEFAULT '[]',
  version INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. 分享表
CREATE TABLE IF NOT EXISTS public.shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES public.resumes(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  expires_at TIMESTAMPTZ,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ===== 索引 =====
CREATE INDEX IF NOT EXISTS idx_kb_user ON public.knowledge_bases(user_id);
CREATE INDEX IF NOT EXISTS idx_kb_stage ON public.knowledge_bases(stage);
CREATE INDEX IF NOT EXISTS idx_jm_user ON public.job_matches(user_id);
CREATE INDEX IF NOT EXISTS idx_jm_kb ON public.job_matches(kb_id);
CREATE INDEX IF NOT EXISTS idx_resumes_user ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_km ON public.resumes(job_match_id);
CREATE INDEX IF NOT EXISTS idx_shares_token ON public.shares(token);

-- ===== 创建 Storage Buckets =====
-- 注意：Storage Bucket 需要通过 Supabase 管理面板创建：
-- Storage → New Bucket → 创建以下 3 个 bucket（public）:
--   photos（证件照）、resumes（简历文件）、jds（JD 截图）

-- ===== RLS 策略 =====
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_bases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.self_check_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shares ENABLE ROW LEVEL SECURITY;

-- users 策略
CREATE POLICY "Users can manage own profile" ON public.users
  FOR ALL USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- knowledge_bases 策略
CREATE POLICY "Users can view own KB" ON public.knowledge_bases
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own KB" ON public.knowledge_bases
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own KB" ON public.knowledge_bases
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own KB" ON public.knowledge_bases
  FOR DELETE USING (auth.uid() = user_id);

-- self_check_results 策略
CREATE POLICY "Users can view own self-check" ON public.self_check_results
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.knowledge_bases WHERE id = kb_id AND user_id = auth.uid())
  );

-- job_matches 策略
CREATE POLICY "Users can view own matches" ON public.job_matches
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own matches" ON public.job_matches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- match_results 策略
CREATE POLICY "Users can view own match results" ON public.match_results
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.job_matches WHERE id = job_match_id AND user_id = auth.uid())
  );

-- learning_paths 策略
CREATE POLICY "Users can view own learning paths" ON public.learning_paths
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.job_matches WHERE id = job_match_id AND user_id = auth.uid())
  );

-- resumes 策略
CREATE POLICY "Users can view own resumes" ON public.resumes
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own resumes" ON public.resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON public.resumes
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON public.resumes
  FOR DELETE USING (auth.uid() = user_id);

-- shares 策略（公开读取，写权限绑定简历所有者）
CREATE POLICY "Anyone can view shared link" ON public.shares
  FOR SELECT USING (true);
CREATE POLICY "Users can create shares" ON public.shares
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
  );
CREATE POLICY "Users can delete own shares" ON public.shares
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid())
  );

-- 创建自动创建 users 行的触发器
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name, provider)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'provider', 'email')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 删除旧触发器（如果有）
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
-- 创建触发器
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
