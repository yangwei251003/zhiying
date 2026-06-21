"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-neutral-50 to-primary-50 px-4">
      <div className="text-center max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex w-20 h-20 rounded-full bg-white shadow-md items-center justify-center mb-6 text-4xl"
        >
          🤔
        </motion.div>

        <h1 className="text-4xl font-bold text-neutral-900 mb-2">404</h1>
        <p className="text-neutral-600 mb-6">
          这个页面好像走丢了——职映小镜也找不到它
        </p>

        <p className="text-xs text-neutral-400 mb-6">
          可能是你访问的链接已失效，或者这个功能还在路上
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
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
        </div>
      </div>
    </div>
  );
}
