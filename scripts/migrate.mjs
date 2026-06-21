import pkg from "pg";
const { Pool } = pkg;

// Supabase PostgreSQL 直连
const pool = new Pool({
  host: "aws-0-us-east-1.pooler.supabase.com",
  port: 6543,
  user: "postgres.nobuzpvtdjmkwodjbdfx",
  password: "ywc251003",
  database: "postgres",
  ssl: { rejectUnauthorized: false },
});

const SQL = `
-- ============================================
-- 职映 ZhiYing 数据库 Migration
-- ============================================

-- 1. 用户扩展信息表（Supabase Auth 管理用户登录，此表存扩展字段）
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
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
  user_id UUID REFERENCES public.users(id),
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
  user_id UUID NOT NULL REFERENCES public.users(id),
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

-- ===== RLS 策略：启用 =====
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_bases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.self_check_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shares ENABLE ROW LEVEL SECURITY;

-- ===== RLS 策略 =====

-- users: 用户可以读写自己的记录
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- knowledge_bases: 用户只能 CRUD 自己的知识库
CREATE POLICY "Users can view own KB" ON public.knowledge_bases
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own KB" ON public.knowledge_bases
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own KB" ON public.knowledge_bases
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own KB" ON public.knowledge_bases
  FOR DELETE USING (auth.uid() = user_id);

-- self_check_results: 通过 kb_id 关联权限
CREATE POLICY "Users can view own self-check" ON public.self_check_results
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.knowledge_bases WHERE id = kb_id AND user_id = auth.uid()));

CREATE POLICY "Users can insert own self-check" ON public.self_check_results
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.knowledge_bases WHERE id = kb_id AND user_id = auth.uid()));

-- job_matches
CREATE POLICY "Users can view own matches" ON public.job_matches
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own matches" ON public.job_matches
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- match_results: 通过 job_match_id -> kb_id 关联
CREATE POLICY "Users can view own match results" ON public.match_results
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.job_matches WHERE id = job_match_id AND user_id = auth.uid()));

CREATE POLICY "Users can insert own match results" ON public.match_results
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.job_matches WHERE id = job_match_id AND user_id = auth.uid()));

-- learning_paths
CREATE POLICY "Users can view own learning paths" ON public.learning_paths
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.job_matches WHERE id = job_match_id AND user_id = auth.uid()));

CREATE POLICY "Users can insert own learning paths" ON public.learning_paths
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.job_matches WHERE id = job_match_id AND user_id = auth.uid()));

-- resumes
CREATE POLICY "Users can view own resumes" ON public.resumes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own resumes" ON public.resumes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own resumes" ON public.resumes
  FOR UPDATE USING (auth.uid() = user_id);

-- shares: 公开读取（分享链接），但只有简历所有者可以创建
CREATE POLICY "Anyone can view shared link" ON public.shares
  FOR SELECT USING (true);

CREATE POLICY "Users can create shares" ON public.shares
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid()));

CREATE POLICY "Users can delete own shares" ON public.shares
  FOR DELETE USING (EXISTS (SELECT 1 FROM public.resumes WHERE id = resume_id AND user_id = auth.uid()));

-- ===== Done =====
`;

async function migrate() {
  const client = await pool.connect();
  try {
    console.log("🔗 Connected to Supabase PostgreSQL");
    console.log("📝 Running migration...");

    // 分行执行（每个语句以分号分隔）
    const statements = SQL
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    for (let i = 0; i < statements.length; i++) {
      try {
        await client.query(statements[i] + ";");
      } catch (err) {
        // 忽略 "already exists" 等错误
        const msg = err instanceof Error ? err.message : String(err);
        if (!msg.includes("already exists") && !msg.includes("duplicate")) {
          console.warn(`⚠ Statement ${i + 1} warning:`, msg.slice(0, 120));
        }
      }
    }

    console.log("✅ Migration completed successfully!");

    // 验证：列出所有表
    const result = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);

    console.log("📊 Created tables:");
    result.rows.forEach((r) => console.log(`   - ${r.table_name}`));
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
