"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Mail } from "lucide-react";
import { XiaojingMascot } from "@/components/motion/xiaojing-mascot";
import { DataParticles } from "@/components/motion/data-particles";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-neutral-950 text-white px-4 relative overflow-hidden">
      {/* Awwwards Grain Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Decorative neon ambient lights */}
      <div className="absolute w-72 h-72 rounded-full bg-primary-500/10 blur-3xl" />

      {/* 数据粒子氛围 */}
      <DataParticles className="absolute inset-0 opacity-20" count={32} color="primary" />

      <div className="text-center max-w-md relative z-10 space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="inline-flex w-44 h-44 items-center justify-center mb-2"
        >
          <XiaojingMascot state="error" size={180} speakText="啊呀，小镜也找不到这个页面了..." />
        </motion.div>

        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-5xl font-black text-white tracking-tight"
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-300 text-base"
          >
            这个页面好像走丢了——职映小镜正在全力检索中
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-xs text-neutral-500"
          >
            可能是您访问的链接已失效，或者对应功能还在路上
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
        >
          <Button asChild className="bg-primary-500 hover:bg-primary-400">
            <Link href="/">
              <Sparkles className="mr-2 h-4 w-4" />
              回到首页
            </Link>
          </Button>
          <Button variant="outline" className="border-neutral-800 text-neutral-300 hover:bg-white/5" asChild>
            <Link href="/start">
              <Mail className="mr-2 h-4 w-4" />
              开始建知识库
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
