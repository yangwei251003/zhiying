"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Mail } from "lucide-react";
import { Xiaojing404Mascot } from "@/components/motion/xiaojing-mascot";
import { DataParticles } from "@/components/motion/data-particles";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50 px-4 relative overflow-hidden">
      {/* 数据粒子氛围 */}
      <DataParticles className="absolute inset-0 opacity-30" count={32} color="primary" />

      <div className="text-center max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
          className="inline-flex w-40 h-40 items-center justify-center mb-4"
        >
          <Xiaojing404Mascot size={160} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl font-bold text-neutral-900 mb-2"
        >
          404
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-600 mb-2"
        >
          这个页面好像走丢了——职映小镜也找不到它
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-xs text-neutral-400 mb-8"
        >
          可能是你访问的链接已失效，或者这个功能还在路上
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button asChild>
            <Link href="/">
              <Sparkles className="mr-2 h-4 w-4" />
              回到首页
            </Link>
          </Button>
          <Button variant="outline" asChild>
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
