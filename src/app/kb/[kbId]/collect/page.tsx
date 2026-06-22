"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import {
  Check,
  Circle,
  Loader2,
  Send,
  Sparkles,
  Save,
  ArrowRight,
  ArrowLeft,
  Upload,
} from "lucide-react";
import { XiaojingAvatar } from "@/components/motion/xiaojing-avatar";
import {
  KB_MODULE_NAMES,
  KB_MODULE_LABELS,
  KB_MODULE_ICONS,
  cn,
} from "@/lib/utils";
import * as LucideIcons from "lucide-react";

interface ChatMessage {
  role: "ai" | "user";
  content: string;
  timestamp: number;
  options?: string[];
}

const MODULE_GUIDE_QUESTIONS: Record<string, string> = {
  basic_info: "我们先从基本信息开始。请告诉我你的姓名、性别、求职方向（如电力系统工程师）和意向城市。",
  education: "很好！现在聊聊教育经历。请提供：学校名称、专业、学历、起止时间。如果方便，也可以说说核心课程和毕设方向。",
  core_experiences: "接下来是核心经历。请用「背景 + 具体做了什么 + 可衡量的结果」的格式描述1-3个最值得说的经历。",
  internships_jobs: "聊聊实习或工作经历。请按「问题→方案→结果」的链条描述，公司、职位、时间段也请一起说明。",
  projects: "项目经历部分。请区分「我做了什么」和「团队做了什么」，并说明你的项目产出和用到的技术栈。",
  skills: "技能清单。请按类别（编程语言/框架工具/专业软件/语言能力/办公技能/软技能/行业知识/数据分析等）列出，并标注熟练度（了解/基础/熟悉/熟练/精通），每项最好附一个能证明的场景。",
  certificates_honors: "证书与荣誉。请列出你获得的证书和奖项，包括颁发机构、时间、获奖范围（如省级、国家级）。",
  portfolio: "作品或案例。如果有可以公开查看的产出（论文、代码、设计、作品集链接），请提供标题、描述和链接。",
  self_reflection: "最后一个模块——自我认知。请具体说出你的2条以上优势和2条以上短板，避免空话，最好举个例子。",
};

export default function CollectPage() {
  const router = useRouter();
  const params = useParams();
  const kbId = params.kbId as string;

  const [currentModule, setCurrentModule] = useState(0);
  const [moduleStatus, setModuleStatus] = useState<Record<string, "pending" | "current" | "done">>(
    Object.fromEntries(KB_MODULE_NAMES.map((m) => [m, "pending"]))
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 初始化欢迎语
  useEffect(() => {
    const moduleName = KB_MODULE_NAMES[currentModule];
    setMessages([
      {
        role: "ai",
        content: `你好！我是职映小镜\n\n我会一步步引导你建立完整的职业知识库。每个模块大约 1-2 分钟，全做完通常 8-15 分钟。\n\n${MODULE_GUIDE_QUESTIONS[moduleName]}`,
        timestamp: Date.now(),
      },
    ]);
    setModuleStatus((prev) => ({ ...prev, [moduleName]: "current" }));
  }, []);

  // 自动滚动
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = {
      role: "user",
      content: input,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // 调用 AI 处理（这里用模拟实现，实际接入 API）
      const res = await fetch("/api/kb/collect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kb_id: kbId,
          module: KB_MODULE_NAMES[currentModule],
          message: input,
          history: messages.slice(-6),
        }),
      });

      if (!res.ok) throw new Error("AI 服务暂时不可用");
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: data.reply || "收到，我们继续下一个问题。",
          timestamp: Date.now(),
          options: data.options,
        },
      ]);

      // 如果 AI 标记本模块完成
      if (data.module_complete) {
        const moduleName = KB_MODULE_NAMES[currentModule];
        setModuleStatus((prev) => ({ ...prev, [moduleName]: "done" }));
        if (currentModule < KB_MODULE_NAMES.length - 1) {
          const next = currentModule + 1;
          setCurrentModule(next);
          setModuleStatus((prev) => ({
            ...prev,
            [KB_MODULE_NAMES[next]]: "current",
          }));
        }
      }
    } catch (err) {
      // 降级：模拟 AI 回复
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "（AI 服务暂时不可用，但你的回答已经保存。继续输入即可，下次会同步处理。）",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      // 实际项目会调用 API 保存
      await new Promise((r) => setTimeout(r, 600));
      toast.success("草稿已保存");
    } finally {
      setSaving(false);
    }
  };

  const handleJumpModule = (idx: number) => {
    setCurrentModule(idx);
    const moduleName = KB_MODULE_NAMES[idx];
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: `好的，我们切换到「${KB_MODULE_LABELS[moduleName]}」模块。\n\n${MODULE_GUIDE_QUESTIONS[moduleName]}`,
        timestamp: Date.now(),
      },
    ]);
  };

  const isAllComplete =
    Object.values(moduleStatus).filter((s) => s === "done").length >=
    KB_MODULE_NAMES.length;

  const completedCount = Object.values(moduleStatus).filter((s) => s === "done").length;
  const progressPct = Math.round((completedCount / KB_MODULE_NAMES.length) * 100);

  const handleComplete = () => {
    router.push(`/kb/${kbId}/self-check`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50 flex">
      {/* 左侧 Sidebar：进度 */}
      <aside className="hidden lg:flex w-72 border-r border-neutral-200 bg-white flex-col">
        <div className="p-5 border-b border-neutral-200">
          <h2 className="text-sm font-semibold text-neutral-900 mb-1">知识库收集</h2>
          <p className="text-xs text-neutral-500">9 模块结构化收集</p>
        </div>

        {/* 进度条 */}
        <div className="p-5 border-b border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-neutral-500">完成度</span>
            <span className="text-xs font-medium text-primary-600">{progressPct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* 模块列表 */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {KB_MODULE_NAMES.map((m, idx) => {
            const status = moduleStatus[m];
            const Icon = (LucideIcons as Record<string, any>)[KB_MODULE_ICONS[m]] || Circle;
            return (
              <button
                key={m}
                onClick={() => handleJumpModule(idx)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors text-left",
                  idx === currentModule
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-neutral-600 hover:bg-neutral-50"
                )}
              >
                <span className="flex-shrink-0">
                  {status === "done" ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : status === "current" ? (
                    <span className="block w-4 h-4 rounded-full border-2 border-primary-500 bg-primary-500/30" />
                  ) : (
                    <Circle className="h-4 w-4 text-neutral-300" />
                  )}
                </span>
                <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                <span className="truncate">{KB_MODULE_LABELS[m]}</span>
              </button>
            );
          })}
        </div>

        <div className="p-3 border-t border-neutral-200 space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleSaveDraft}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
            ) : (
              <Save className="mr-2 h-3.5 w-3.5" />
            )}
            {saving ? "保存中..." : "保存草稿"}
          </Button>
        </div>
      </aside>

      {/* 右侧：聊天区 */}
      <main className="flex-1 flex flex-col">
        {/* 移动端进度条 */}
        <div className="lg:hidden bg-white border-b border-neutral-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-neutral-700">
              {KB_MODULE_LABELS[KB_MODULE_NAMES[currentModule]]}
            </span>
            <span className="text-xs text-neutral-500">{progressPct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-neutral-100 overflow-hidden">
            <motion.div
              className="h-full bg-primary-500"
              animate={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* 消息区 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex gap-3 max-w-2xl",
                  msg.role === "user" ? "ml-auto flex-row-reverse" : ""
                )}
              >
                {/* 头像 */}
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm overflow-hidden",
                    msg.role === "ai"
                      ? "bg-gradient-to-br from-primary-500 to-accent-500 text-white"
                      : "bg-neutral-200 text-neutral-700"
                  )}
                >
                  {msg.role === "ai" ? <XiaojingAvatar size={32} /> : "我"}
                </div>

                {/* 气泡 */}
                <div
                  className={cn(
                    "rounded-xl px-4 py-3 max-w-[80%]",
                    msg.role === "ai"
                      ? "bg-white border border-neutral-200 text-neutral-800"
                      : "bg-primary-500 text-white"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setInput(opt)}
                          className="text-xs px-3 py-1 rounded-full bg-primary-50 text-primary-700 hover:bg-primary-100 transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* 加载态 */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3 max-w-2xl"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-sm overflow-hidden">
                <XiaojingAvatar size={32} expression="thinking" />
              </div>
              <div className="rounded-xl px-4 py-3 bg-white border border-neutral-200">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 输入区 */}
        <div className="border-t border-neutral-200 bg-white p-3 md:p-4">
          <div className="max-w-2xl mx-auto flex gap-2 items-end">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`请输入你的${KB_MODULE_LABELS[KB_MODULE_NAMES[currentModule]]}信息...`}
              className="min-h-[44px] max-h-32 resize-none"
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              size="icon"
              className="h-11 w-11 flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* 完成按钮 */}
          {isAllComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mt-3"
            >
              <Button
                onClick={handleComplete}
                className="w-full"
                size="lg"
                variant="accent"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                全部完成，进入完整性自检
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
