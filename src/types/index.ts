// 职映网站类型定义
// 基于 resumecraft 的 profile_schema.json 和 resume_content_schema.json

// ========== 知识库模块类型 ==========

export interface BasicInfo {
  name: string;
  gender: "男" | "女";
  phone?: string;
  email?: string;
  photo_url?: string;
  target_directions?: string[];
  city?: string;
  job_status?: "实习" | "全职" | "都看" | "其他";
}

export interface EducationRecord {
  school: string;
  major: string;
  degree: "专科" | "本科" | "硕士" | "博士" | "其他";
  start_date: string; // YYYY-MM
  end_date: string; // YYYY-MM 或 "至今"
  gpa?: string;
  core_courses?: string[];
  thesis_topic?: string;
}

export interface CoreExperience {
  background: string;
  action: string;
  result: string;
  tags?: string[];
  time_range?: string;
}

export interface InternshipJob {
  problem: string;
  solution: string;
  result: string;
  company: string;
  position: string;
  time_range?: string;
}

export interface ProjectExperience {
  my_role: string;
  team_role: string;
  description: string;
  outcome: string;
  name: string;
  tech_stack?: string[];
  time_range?: string;
}

export interface SkillItem {
  category: "编程语言" | "框架/工具" | "专业软件" | "语言能力" | "办公技能" | "软技能" | "行业知识" | "设计能力" | "数据分析" | "其他";
  name: string;
  level: "了解" | "基础" | "熟悉" | "熟练" | "精通";
  evidence?: string;
}

export interface CertificateHonor {
  name: string;
  issuer: string;
  date: string;
  scope?: string; // 如"省级"、"国家级"
  relevance_note?: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  url?: string;
  type: "论文" | "代码" | "设计" | "作品集" | "其他";
}

export interface SelfReflection {
  strengths: string[]; // 至少2条具体描述
  weaknesses: string[]; // 至少2条具体描述
  motivation?: string;
  career_goal?: string;
}

// 知识库完整结构
export interface KnowledgeBaseData {
  basic_info?: BasicInfo;
  education?: EducationRecord[];
  core_experiences?: CoreExperience[];
  internships_jobs?: InternshipJob[];
  projects?: ProjectExperience[];
  skills?: SkillItem[];
  certificates_honors?: CertificateHonor[];
  portfolio?: PortfolioItem[];
  self_reflection?: SelfReflection;
}

// 知识库阶段
export type KnowledgeBaseStage =
  | "collecting"
  | "self_check"
  | "job_match"
  | "generating";

// ========== 匹配相关类型 ==========

export interface MatchDirectItem {
  item: string;
  evidence: string; // 指向知识库的具体条目路径
  strength: "high" | "medium" | "low";
  kb_source_module: string; // 来源的模块名
  kb_source_index?: number; // 来源的数组索引
}

export interface MatchAssociation {
  item: string;
  rephrasing_as: string; // 换角度后的表达
  how_to_bridge: string; // 具体怎么换角度
  kb_source_module?: string;
  kb_source_index?: number;
}

export interface MatchGapItem {
  skill: string;
  level: "无" | "了解" | "基础认知"; // 用户当前水平
  reason: string; // 为什么岗位需要
  learning_priority: "高" | "中" | "低";
}

export interface Evaluation9Dim {
  pros: string;
  cons: string;
  growth_space: string;
  salary_outlook: string;
  work_intensity: string;
  ai_replaceability: string;
  beginner_friendly: string;
  long_term_dev: string;
  industry_risk: string;
}

export type RecommendationLevel =
  | "强烈推荐"
  | "可以尝试"
  | "谨慎投递"
  | "不建议";

// ========== 学习路径类型 ==========

export interface LearningPath7Day {
  day_range: string;
  topic: string;
  resources: { title: string; url?: string; type: "免费" | "付费" }[];
}

export interface LearningPath30Day {
  week_range: string;
  theme: string;
  tasks: string[];
  deliverable?: string;
}

export interface InterviewQA {
  question: string;
  suggested_answer: string;
  tips: string;
  difficulty: "常见" | "刁钻" | "行为";
}

// ========== 简历类型 ==========

export interface ResumeContentJSON {
  // 遵循 resume_content_schema.json 的结构
  personal_info: {
    name: string;
    phone: string;
    email: string;
    location?: string;
    photo_url?: string;
    target_position?: string;
  };
  education: EducationRecord[] & { gpa_detail?: string };
  experience: Array<{
    org: string;
    role: string;
    period: string;
    bullets: string[];
  }>;
  skills?: SkillItem[];
  certificates?: CertificateHonor[];
  projects?: ProjectExperience[];
  self_evaluation?: string;
}

export interface TraceabilityMap {
  sentence_index: number; // 在哪个 bullet
  sentence_text: string; // 句子原文
  source_module: string; // 来自哪个知识库模块
  source_item: string; // 对应的知识库条目
  source_content: string; // 知识库中的原始内容
}

// ========== API 响应类型 ==========

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

// ========== 分享类型 ==========

export interface ShareLink {
  token: string;
  share_url: string;
  expires_at: string;
  has_password: boolean;
}
