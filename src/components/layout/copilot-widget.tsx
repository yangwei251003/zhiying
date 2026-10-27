"use client";

import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { XiaojingMascot } from "@/components/motion/xiaojing-mascot";
import { fireConfetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";

interface Message {
  role: "robot" | "user";
  text: string;
  expression?: "smile" | "happy" | "confused" | "thinking" | "surprised";
}

export function CopilotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  
  // 小镜 Mascot 情绪状态机
  const [mascotState, setMascotState] = useState<"idle" | "listening" | "speaking" | "thinking" | "celebrating" | "error">("idle");

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "robot",
      text: "嗨！我是小镜。把你的目标岗位 JD 发给我，我现在就帮您开启 ResumeCraft 四阶段简历智能适配！",
      expression: "smile",
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const dialogueFlow = [
    "收到！正在载入您的岗位目标。为了实现精确的匹配，请先告诉我您最擅长的前端技术栈（比如 React/Vue/TypeScript)？",
    "太棒了！小镜已将该能力更新到您的简历知识库。接下来，您在此方向上最具有代表性的一项『核心项目经验』或成果是什么？最好带有数据（比如页面性能提升40%）哦！",
    "信息收集完毕！当前自检通过。小镜已帮您开启 ResumeCraft 三分组分析：\n\n✅ 直接匹配项：React/Vue 项目实践\n⚠️ 待补强项：大流量高并发调优经验\n\n正在为您打包生成一页式 Word 简历，并规划了 7 天速成提升路径！您可以前往 Dashboard 工作台下载您的专属简历了！",
  ];

  // 滚动监听：滚动超过 200px 显示悬浮球
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
        setIsOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 自动滚动到聊天底部
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping || mascotState === "speaking") return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    
    // 切换至思考状态
    setIsTyping(true);
    setMascotState("thinking");

    // 模拟小镜思考和打字流式回复
    setTimeout(() => {
      let replyText = "";
      let activeExp: "smile" | "happy" | "confused" | "thinking" | "surprised" = "smile";

      if (step < dialogueFlow.length) {
        replyText = dialogueFlow[step];
        if (step === 0) activeExp = "thinking";
        if (step === 1) activeExp = "surprised";
        if (step === 2) activeExp = "happy";
        setStep((s) => s + 1);
      } else {
        replyText = "简历生成已完成！我们现在可以进一步优化，或者模拟一下面试官针对本岗位最可能提问的问题与应对策略？";
        activeExp = "smile";
      }

      setIsTyping(false);
      
      // 如果进入了“生成简历”的成功节点，喷洒礼花！
      const isSuccessStep = (step === 2);
      if (isSuccessStep) {
        setTimeout(() => {
          fireConfetti();
        }, 800);
      }

      // 切换至说话状态
      setMascotState("speaking");
      setMessages((prev) => [...prev, { role: "robot", text: "", expression: activeExp }]);

      // 仿真流式打字机效果
      let currentLength = 0;
      const interval = setInterval(() => {
        currentLength += 2;
        if (currentLength >= replyText.length) {
          clearInterval(interval);
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { role: "robot", text: replyText, expression: activeExp };
            return next;
          });
          
          // 对话输出完毕，重置表情
          if (isSuccessStep) {
            setMascotState("celebrating");
            setTimeout(() => setMascotState("idle"), 3000);
          } else {
            setMascotState("idle");
          }
        } else {
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { 
              role: "robot", 
              text: replyText.slice(0, currentLength),
              expression: activeExp 
            };
            return next;
          });
        }
      }, 30);
    }, 1200);
  };

  return (
    <div className={cn("fixed bottom-8 right-8 z-[1001] flex flex-col items-end transition-opacity duration-500", visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-[340px] h-[440px] refractive-glass rounded-2xl mb-4 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/35 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-semibold text-white">小镜 · AI 简历顾问</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-white text-xs transition-colors"
              >
                收起
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={chatBodyRef}
              className="flex-1 p-4 overflow-y-auto space-y-3 flex flex-col bg-neutral-950/25 scrollbar-thin"
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex gap-2.5 max-w-[88%] text-xs leading-relaxed items-start animate-fade-in-up",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  {msg.role === "robot" && (
                    <div className="w-7 h-7 rounded-full bg-blue-500/10 flex-shrink-0 flex items-center justify-center overflow-hidden border border-blue-500/25 shadow-inner">
                      <div className="scale-75 translate-y-[2px]">
                        <XiaojingMascot state="idle" expression={msg.expression || "smile"} size={28} animate={false} />
                      </div>
                    </div>
                  )}
                  <div
                    className={cn(
                      "px-3.5 py-2.5 rounded-2xl whitespace-pre-wrap shadow-sm",
                      msg.role === "user" 
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-tr-none" 
                        : "bg-white/5 border border-white/5 text-neutral-200 rounded-tl-none backdrop-blur-sm"
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2.5 mr-auto max-w-[85%] text-xs items-center">
                  <div className="w-7 h-7 rounded-full bg-blue-500/10 flex-shrink-0 flex items-center justify-center overflow-hidden border border-blue-500/25">
                    <div className="scale-75 translate-y-[2px]">
                      <XiaojingMascot state="thinking" size={28} animate={true} />
                    </div>
                  </div>
                  <div className="px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-neutral-400 rounded-tl-none backdrop-blur-sm">
                    <span className="inline-flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/5 bg-black/40 backdrop-blur-md flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="输入求职方向或技术栈..."
                disabled={isTyping || mascotState === "speaking"}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/40 focus:bg-white/10 transition-all disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping || mascotState === "speaking"}
                className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg cursor-pointer relative border border-white/10"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-black/25 border border-white/10">
          <div className="scale-90 translate-y-[2px]">
            <XiaojingMascot state={isOpen ? "celebrating" : mascotState} size={32} animate={true} />
          </div>
        </div>
        {/* 呼吸灯特效环 */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-500/40 animate-pulse-glow" style={{ animationDuration: "2s" }} />
      </motion.button>
    </div>
  );
}
