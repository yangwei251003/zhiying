"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { XiaojingMascot, XiaojingState } from "@/components/motion/xiaojing-mascot";
import { DataParticles } from "@/components/motion/data-particles";

const easing = [0.16, 1, 0.3, 1];

export function HeroSection() {
  const [mascotState, setMascotState] = useState<XiaojingState>("welcome");
  const [speakText, setSpeakText] = useState("你好！我是 AI 助手小镜~");

  // Welcome state on mount, then turn to idle after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setMascotState("idle");
      setSpeakText("");
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    setMascotState("welcome");
    setSpeakText("欢迎来到职映！需要制作简历吗？");
  };

  const handleMouseLeave = () => {
    setMascotState("idle");
    setSpeakText("");
  };

  const handleMascotClick = () => {
    setMascotState("celebrating");
    setSpeakText("太棒了！点击左侧开启您的知识库吧！");
    setTimeout(() => {
      setMascotState("idle");
      setSpeakText("");
    }, 4000);
  };
  return (
    <section className="relative overflow-hidden hero-bg min-h-[100dvh] flex items-center">
      {/* 霓虹光斑背景 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 主光斑（蓝色，左上）*/}
        <div
          className="neon-orb w-[500px] h-[500px] bg-primary-500/25 -top-32 -left-32"
          aria-hidden="true"
        />
        {/* 副光斑（橙色，右下）*/}
        <div
          className="neon-orb w-[380px] h-[380px] bg-accent-500/15 bottom-0 right-0"
          aria-hidden="true"
        />
        {/* 深蓝辅助光斑（中部）*/}
        <div
          className="neon-orb w-[300px] h-[300px] bg-blue-400/10 top-1/3 right-1/4"
          aria-hidden="true"
        />
        {/* 网格背景纹理 */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container-wide mx-auto px-4 md:px-8 py-24 md:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: easing }}
            className="space-y-8"
          >
            {/* 顶部标签 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easing, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold border border-primary-400/30 bg-primary-400/10 text-primary-300">
                <Sparkles className="h-3.5 w-3.5" />
                AI 驱动的职业认知平台
              </span>
            </motion.div>

            {/* 主标题 */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: easing, delay: 0.15 }}
                className="text-5xl md:text-6xl lg:text-[72px] font-black text-white leading-[1.08] tracking-[-0.03em]"
              >
                先照清自己，
                <br />
                再匹配岗位。
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easing, delay: 0.25 }}
                className="text-2xl md:text-3xl font-semibold gradient-text-warm"
              >
                每份简历，都有迹可循。
              </motion.p>
            </div>

            {/* 副标题 */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing, delay: 0.3 }}
              className="text-base md:text-lg text-neutral-300 leading-[1.75] max-w-lg"
            >
              不是套模板的简历生成器。职映帮你建立可追溯的职业知识库，
              深度剖析真实能力，针对目标岗位做三分组精准匹配——
              简历里每一句话都能在知识库找到依据。
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easing, delay: 0.38 }}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Button
                  size="lg"
                  asChild
                  className="text-base px-8 h-12 btn-glow transition-all duration-300 bg-primary-500 hover:bg-primary-400"
                >
                  <Link href="/start">
                    开始构建我的知识库
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Button
                  variant="ghost"
                  size="lg"
                  asChild
                  className="text-primary-300 hover:text-white hover:bg-white/10 border border-white/10 h-12 px-6"
                >
                  <Link href="/start?mode=demo">先看看示例 →</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* 信任标签 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: easing, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              {[
                { label: "真实匹配", color: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" },
                { label: "可追溯", color: "border-blue-400/30 bg-blue-400/10 text-blue-300" },
                { label: "不编造", color: "border-amber-400/30 bg-amber-400/10 text-amber-300" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border ${tag.color}`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {tag.label}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: 动画 IP 形象 */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: easing, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 外层光晕环 */}
                <div className="absolute w-80 h-80 rounded-full bg-primary-500/10 animate-pulse-glow" />
                <div className="absolute w-64 h-64 rounded-full bg-primary-400/10 blur-xl" />

                {/* 主容器 */}
                <div 
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl glass-card-dark shadow-2xl flex items-center justify-center overflow-hidden p-6 cursor-pointer group"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleMascotClick}
                >
                  <DataParticles className="absolute inset-0 opacity-50" count={22} />
                  {/* 浮动动画包裹 */}
                  <div className="animate-float-slow flex items-center justify-center">
                    <XiaojingMascot state={mascotState} size={220} speakText={speakText} />
                  </div>
                </div>

                {/* 悬浮装饰卡片 */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6, ease: easing }}
                  className="absolute -right-4 top-8 glass-card-dark rounded-xl px-3 py-2 text-xs text-white border border-white/10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-neutral-300">匹配度 <strong className="text-white">87%</strong></span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1.0, duration: 0.6, ease: easing }}
                  className="absolute -left-4 bottom-12 glass-card-dark rounded-xl px-3 py-2 text-xs text-white border border-white/10"
                >
                  <div className="text-neutral-300">
                    <div>知识库已建立</div>
                    <strong className="text-primary-300 text-sm">9 个模块 ✓</strong>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
