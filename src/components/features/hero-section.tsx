"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-primary-50">
      <div className="container-wide mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* 主标题 */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-neutral-900 leading-tight tracking-tight">
                先照清自己，
                <br />
                再匹配岗位。
                <span className="gradient-text">每份简历，都有迹可循。</span>
              </h1>
            </div>

            {/* 副标题 */}
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-lg">
              不是套模板的简历生成器。职映帮你建立可追溯的职业知识库，
              深度剖析真实能力，针对目标岗位做三分组精准匹配——
              简历里每一句话都能在知识库找到依据。
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button size="lg" asChild className="text-base px-8 h-12">
                <Link href="/start">
                  开始构建我的知识库
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild className="text-primary-600">
                <Link href="/start?mode=demo">先看看示例 →</Link>
              </Button>
            </div>

            {/* 信任标签 */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {[
                { label: "真实匹配", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
                { label: "可追溯", color: "bg-blue-50 text-blue-700 border-blue-200" },
                { label: "不编造", color: "bg-amber-50 text-amber-700 border-amber-200" },
              ].map((tag) => (
                <span
                  key={tag.label}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium border ${tag.color}`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {tag.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right: IP Character Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-square">
              {/* IP 形象 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-white/80 backdrop-blur-sm shadow-lg border border-primary-100 flex items-center justify-center overflow-hidden p-6 animate-float">
                  <img
                    src="/assets/ip/mascot.png"
                    alt="职映小镜 - AI职业顾问"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                {/* 装饰光斑 */}
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent-400/10 blur-xl" />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-primary-400/10 blur-xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
