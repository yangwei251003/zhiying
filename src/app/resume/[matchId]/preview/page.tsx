"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import {
  FileDown,
  Share2,
  Save,
  Edit3,
  Link2,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  User,
  GraduationCap,
  Briefcase,
  FolderOpen,
  Wrench,
  Star,
} from "lucide-react";

const resumeContent = {
  personal: {
    name: "张三",
    phone: "138****8888",
    email: "zhangsan@example.com",
    location: "武汉",
    target: "电力系统工程师",
  },
  education: [
    {
      school: "XX大学",
      major: "电气工程及其自动化",
      degree: "本科",
      period: "2023.09 - 2027.06",
      gpa: "3.8/4.0",
      detail: "核心课程：电力系统分析、继电保护、高电压技术、电力电子",
    },
  ],
  experience: [
    {
      org: "XX省电力公司 · 变电站",
      role: "实习检修工程师",
      period: "2025.07 - 2025.09",
      bullets: [
        "独立完成 3 次 110kV 变电站设备检修，缩短检修时间约 30%",
        "参与编制设备缺陷处理方案 5 份，被采纳率 100%",
        "协助班组完成 SF6 断路器更换 2 台，零事故",
      ],
    },
  ],
  projects: [
    {
      name: "电力系统仿真建模",
      role: "项目负责人",
      period: "2024.10 - 2024.12",
      bullets: [
        "使用 MATLAB/Simulink 搭建 35kV 配电网仿真模型",
        "通过数据驱动的分析方法，优化无功补偿方案，降低线损 8%",
        "课程设计获评优秀，作为年级示范项目展示",
      ],
    },
  ],
  skills: [
    { name: "MATLAB/Simulink", level: "熟练" },
    { name: "电力系统分析", level: "熟练" },
    { name: "Python", level: "基础" },
    { name: "Office", level: "熟练" },
  ],
  self_eval: "电气工程及其自动化专业本科生，专注电力系统方向。具备变电站检修实操经验和系统仿真建模能力，注重数据驱动的分析思维。诚实的差距：Python 数据分析仍在系统学习中。",
};

export default function ResumePreviewPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.matchId as string;

  const [activeTab, setActiveTab] = useState<"content" | "layout">("content");
  const [editing, setEditing] = useState(false);
  const [downloading, setDownloading] = useState<"word" | "pdf" | null>(null);

  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // 动态 A4 缩放
  useEffect(() => {
    if (typeof window === "undefined") return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const parentWidth = entry.contentRect.width;
        const baseWidth = 820; // 考虑 A4 的 padding
        const newScale = Math.min(1, parentWidth / baseWidth);
        setScale(newScale);
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  const handleDownload = async (format: "word" | "pdf") => {
    setDownloading(format);
    try {
      if (format === "word") {
        const res = await fetch("/api/resume/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: resumeContent.personal.name,
            contact_line: `${resumeContent.personal.phone} | ${resumeContent.personal.email} | ${resumeContent.personal.location}`,
            sections: [
              {
                title: "教育背景",
                entries: resumeContent.education.map(e => ({
                  heading: e.school,
                  subheading: `${e.major} · ${e.degree}`,
                  date: e.period,
                  bullets: [e.detail]
                }))
              },
              {
                title: "实习经历",
                entries: resumeContent.experience.map(e => ({
                  heading: e.org,
                  subheading: e.role,
                  date: e.period,
                  bullets: e.bullets
                }))
              },
              {
                title: "项目经历",
                entries: resumeContent.projects.map(p => ({
                  heading: p.name,
                  subheading: p.role,
                  date: p.period,
                  bullets: p.bullets
                }))
              },
              {
                title: "技能清单",
                freeform_bullets: resumeContent.skills.map(s => `${s.name} (${s.level})`)
              },
              {
                title: "自我评价",
                freeform_bullets: [resumeContent.self_eval]
              }
            ]
          })
        });

        if (!res.ok) throw new Error("下载失败");
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${resumeContent.personal.name}_简历.docx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        toast.success("Word 简历下载成功");
      } else {
        toast.info("正在调起系统打印，请在打印选项中选择「另存为 PDF」", {
          duration: 4000
        });
        setTimeout(() => {
          window.print();
        }, 800);
      }
    } catch {
      toast.error("下载失败，请重试");
    } finally {
      setDownloading(null);
    }
  };

  const handleShare = () => {
    toast.success("分享链接已生成", {
      description: "有效期 7 天，可在工作台管理",
    });
  };

  const handleSaveVersion = () => {
    toast.success("版本已保存", {
      description: "可在工作台查看所有版本",
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-100">
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] min-h-[calc(100vh-4rem)]">
        {/* 左侧编辑面板 */}
        <aside className="border-r border-neutral-200 bg-white flex flex-col print:hidden">
          <div className="p-4 border-b border-neutral-200">
            <h2 className="text-sm font-semibold text-neutral-900 mb-3">编辑面板</h2>
            <div className="flex gap-1 bg-neutral-100 p-1 rounded-md">
              <button
                onClick={() => setActiveTab("content")}
                className={`flex-1 py-1.5 text-xs rounded transition-colors ${
                  activeTab === "content" ? "bg-white shadow-sm text-primary-600 font-medium" : "text-neutral-500"
                }`}
              >
                内容编辑
              </button>
              <button
                onClick={() => setActiveTab("layout")}
                className={`flex-1 py-1.5 text-xs rounded transition-colors ${
                  activeTab === "layout" ? "bg-white shadow-sm text-primary-600 font-medium" : "text-neutral-500"
                }`}
              >
                排版设置
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeTab === "content" ? (
              <>
                {/* 模块列表 */}
                {[
                  { label: "个人信息", icon: User, expanded: true },
                  { label: "教育背景", icon: GraduationCap, expanded: false },
                  { label: "实习经历", icon: Briefcase, expanded: false },
                  { label: "项目经历", icon: FolderOpen, expanded: false },
                  { label: "技能清单", icon: Wrench, expanded: false },
                  { label: "自我评价", icon: Star, expanded: false },
                ].map((m) => (
                  <details
                    key={m.label}
                    open={m.expanded}
                    className="group rounded-lg border border-neutral-200 overflow-hidden"
                  >
                    <summary className="flex items-center gap-2 p-3 cursor-pointer hover:bg-transparent text-sm font-medium text-neutral-700 list-none">
                      <m.icon className="h-4 w-4 text-neutral-500" />
                      <span className="flex-1">{m.label}</span>
                      <svg className="w-4 h-4 text-neutral-400 group-open:rotate-90 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </summary>
                    <div className="p-3 pt-0 space-y-2 border-t border-neutral-100 mt-1">
                      <div className="flex items-start gap-1.5 text-xs">
                        <span className="text-neutral-400 mt-0.5">•</span>
                        <p className="text-neutral-700 flex-1">张三 · 138****8888</p>
                        <button className="text-primary-500 hover:text-primary-600">
                          <Edit3 className="h-3 w-3" />
                        </button>
                      </div>
                      <Badge variant="success" size="sm" className="text-[10px]">
                        <Link2 className="h-2.5 w-2.5" />
                        可追溯
                      </Badge>
                    </div>
                  </details>
                ))}
              </>
            ) : (
              <div className="space-y-3">
                {[
                  { label: "字体", value: "微软雅黑" },
                  { label: "字号", value: "正文 10.5pt" },
                  { label: "配色", value: "深蓝 #1F3864" },
                  { label: "页边距", value: "0.5 英寸" },
                  { label: "页数", value: "1 页 A4" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between p-2 rounded border border-neutral-100 text-xs">
                    <span className="text-neutral-500">{s.label}</span>
                    <span className="font-medium text-neutral-700">{s.value}</span>
                  </div>
                ))}
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                  排版由 build_resume.js 脚本统一渲染，遵循职映 ATS 友好规范
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-neutral-200 space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              <Sparkles className="mr-2 h-3.5 w-3.5" />
              AI 优化建议
            </Button>
            <Button variant="outline" size="sm" className="w-full" onClick={handleSaveVersion}>
              <Save className="mr-2 h-3.5 w-3.5" />
              保存为新版本
            </Button>
          </div>
        </aside>

        {/* 右侧 A4 预览 */}
        <main className="overflow-y-auto bg-neutral-200 p-4 md:p-8">
          <div className="max-w-[800px] mx-auto">
            {/* 状态条 */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4 print:hidden">
              <div className="flex items-center gap-2">
                <Badge variant="success">
                  <CheckCircle2 className="h-3 w-3" />
                  100% 可追溯
                </Badge>
                <Badge variant="primary">1 页 A4</Badge>
                <Badge variant="neutral">~ 420 字</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
                  <Edit3 className="h-3.5 w-3.5 mr-1" />
                  {editing ? "完成" : "编辑"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-3.5 w-3.5 mr-1" />
                  分享
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload("word")}
                  disabled={downloading === "word"}
                >
                  {downloading === "word" ? (
                    <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                  ) : (
                    <FileDown className="h-3.5 w-3.5 mr-1" />
                  )}
                  Word
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDownload("pdf")}
                  disabled={downloading === "pdf"}
                >
                  {downloading === "pdf" ? (
                    <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" />
                  ) : (
                    <FileDown className="h-3.5 w-3.5 mr-1" />
                  )}
                  PDF 下载
                </Button>
              </div>
            </div>

            {/* 动态自适应缩放视口容器 */}
            <div 
              ref={containerRef} 
              className="w-full relative flex items-start justify-center overflow-hidden resume-print-container"
              style={{ height: `${1130 * scale}px` }}
            >
              {/* A4 纸张预览 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg flex-shrink-0 resume-print-canvas print:shadow-none"
                style={{
                  width: "800px",
                  height: "1130px",
                  padding: "40px",
                  fontFamily: "'Microsoft YaHei', sans-serif",
                  transform: `scale(${scale})`,
                  transformOrigin: "top center",
                  transition: "transform 0.1s ease-out",
                }}
              >
              <div className="h-full text-[10px] leading-tight text-neutral-800">
                {/* 顶部：姓名+联系 */}
                <div className="flex items-start justify-between mb-3 pb-2 border-b-2" style={{ borderColor: "#1F3864" }}>
                  <div>
                    <h1 className="text-2xl font-bold" style={{ color: "#1F3864" }}>
                      {resumeContent.personal.name}
                    </h1>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      意向：{resumeContent.personal.target}
                    </p>
                  </div>
                  <div className="text-right text-[9px] text-neutral-600">
                    <p>{resumeContent.personal.phone}</p>
                    <p>{resumeContent.personal.email}</p>
                    <p>{resumeContent.personal.location}</p>
                  </div>
                </div>

                {/* 教育 */}
                <section className="mb-3">
                  <h2 className="text-xs font-bold mb-1.5 pb-1 border-b" style={{ color: "#1F3864", borderColor: "#1F3864" }}>
                    教育背景
                  </h2>
                  {resumeContent.education.map((e, i) => (
                    <div key={i} className="flex justify-between text-[10px]">
                      <div>
                        <span className="font-medium">{e.school}</span>
                        <span className="text-neutral-500 ml-2">{e.major} · {e.degree}</span>
                        <p className="text-[9px] text-neutral-500 mt-0.5">{e.detail}</p>
                      </div>
                      <div className="text-[9px] text-neutral-500">
                        <p>{e.period}</p>
                        <p>GPA: {e.gpa}</p>
                      </div>
                    </div>
                  ))}
                </section>

                {/* 实习 */}
                <section className="mb-3">
                  <h2 className="text-xs font-bold mb-1.5 pb-1 border-b" style={{ color: "#1F3864", borderColor: "#1F3864" }}>
                    实习经历
                  </h2>
                  {resumeContent.experience.map((exp, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between text-[10px]">
                        <span className="font-medium">{exp.org}</span>
                        <span className="text-neutral-500 text-[9px]">{exp.period}</span>
                      </div>
                      <p className="text-[9px] text-neutral-600 mb-1">{exp.role}</p>
                      <ul className="space-y-0.5">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="flex gap-1 text-[10px] leading-snug">
                            <span className="text-neutral-400">•</span>
                            <span className="flex-1">{b}</span>
                            <span className="text-[8px] text-primary-500 cursor-help" title="来自知识库：internships_jobs[0]">
                              [源]
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                {/* 项目 */}
                <section className="mb-3">
                  <h2 className="text-xs font-bold mb-1.5 pb-1 border-b" style={{ color: "#1F3864", borderColor: "#1F3864" }}>
                    项目经历
                  </h2>
                  {resumeContent.projects.map((p, i) => (
                    <div key={i} className="mb-2">
                      <div className="flex justify-between text-[10px]">
                        <span className="font-medium">{p.name}</span>
                        <span className="text-neutral-500 text-[9px]">{p.period}</span>
                      </div>
                      <p className="text-[9px] text-neutral-600 mb-1">{p.role}</p>
                      <ul className="space-y-0.5">
                        {p.bullets.map((b, j) => (
                          <li key={j} className="flex gap-1 text-[10px] leading-snug">
                            <span className="text-neutral-400">•</span>
                            <span className="flex-1">{b}</span>
                            <span className="text-[8px] text-primary-500 cursor-help" title="来自知识库：projects[0]">
                              [源]
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </section>

                {/* 技能 */}
                <section className="mb-3">
                  <h2 className="text-xs font-bold mb-1.5 pb-1 border-b" style={{ color: "#1F3864", borderColor: "#1F3864" }}>
                    技能清单
                  </h2>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px]">
                    {resumeContent.skills.map((s, i) => (
                      <span key={i}>
                        <span className="font-medium">{s.name}</span>
                        <span className="text-neutral-500 ml-1">({s.level})</span>
                      </span>
                    ))}
                  </div>
                </section>

                {/* 自我评价 */}
                <section>
                  <h2 className="text-xs font-bold mb-1.5 pb-1 border-b" style={{ color: "#1F3864", borderColor: "#1F3864" }}>
                    自我评价
                  </h2>
                  <p className="text-[10px] leading-snug text-neutral-700">
                    {resumeContent.self_eval}
                  </p>
                </section>
              </div>
            </motion.div>
          </div>

            {/* 底部说明 */}
            <div className="mt-6 flex items-center justify-between text-xs print:hidden">
              <Link href={`/match/${matchId}/result`} className="text-neutral-500 hover:text-primary-600 flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                返回匹配结果
              </Link>
              <button
                onClick={() => router.push(`/resume/${matchId}/learn`)}
                className="text-primary-600 hover:underline flex items-center gap-1"
              >
                查看面试不足与学习路径
                <Link2 className="h-3 w-3" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
