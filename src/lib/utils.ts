import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** 合并 Tailwind class（解决冲突） */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** 格式化日期 */
export function formatDate(date: string | Date, format: "short" | "long" = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (format === "long") {
    return d.toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  return d.toLocaleDateString("zh-CN", {
    month: "short",
    day: "numeric",
  });
}

/** 相对时间描述 */
export function timeAgo(date: string | Date): string {
  const now = new Date();
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHour = Math.floor(diffMs / 3600000);
  const diffDay = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return "刚刚";
  if (diffMin < 60) return `${diffMin}分钟前`;
  if (diffHour < 24) return `${diffHour}小时前`;
  if (diffDay < 30) return `${diffDay}天前`;
  return formatDate(d);
}

/** 截断文本 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

/** 生成随机 token */
export function generateToken(length = 32): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/** 延迟工具 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** 检查是否为浏览器环境 */
export function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** 知识库模块名称映射 */
export const KB_MODULE_NAMES = [
  "basic_info", // 基本信息
  "education", // 教育经历
  "core_experiences", // 核心经历
  "internships_jobs", // 实习/工作
  "projects", // 项目经历
  "skills", // 技能
  "certificates_honors", // 证书/荣誉
  "portfolio", // 作品/案例
  "self_reflection", // 自我认知
] as const;

export type KBModuleName = (typeof KB_MODULE_NAMES)[number];

export const KB_MODULE_LABELS: Record<KBModuleName, string> = {
  basic_info: "基本信息",
  education: "教育经历",
  core_experiences: "核心经历",
  internships_jobs: "实习/工作",
  projects: "项目经历",
  skills: "技能清单",
  certificates_honors: "证书荣誉",
  portfolio: "作品案例",
  self_reflection: "自我认知",
};

export const KB_MODULE_ICONS: Record<KBModuleName, string> = {
  basic_info: "User",
  education: "GraduationCap",
  core_experiences: "Star",
  internships_jobs: "Briefcase",
  projects: "FolderKanban",
  skills: "Wrench",
  certificates_honors: "Award",
  portfolio: "Image",
  self_reflection: "Brain",
};
