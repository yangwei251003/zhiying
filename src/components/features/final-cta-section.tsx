"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { XiaojingWaveMascot } from "@/components/motion/xiaojing-mascot";

const easing = [0.16, 1, 0.3, 1];

export function FinalCtaSection() {
  return (
    <section className="py-24 md:py-36 hero-bg relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="neon-orb w-[400px] h-[400px] bg-primary-500/20 -bottom-20 -left-20" />
        <div className="neon-orb w-[320px] h-[320px] bg-accent-500/15 -top-10 -right-10" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container-page mx-auto px-4 md:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: easing }}
          className="max-w-2xl mx-auto"
        >
          {/* IP 动画形象 */}
          <div className="relative inline-flex items-center justify-center mb-8">
            <div className="absolute w-40 h-40 rounded-full bg-primary-500/15 animate-pulse-glow" />
            <div className="relative w-32 h-32 rounded-full glass-card-dark border border-white/15 flex items-center justify-center overflow-hidden">
              <div className="animate-float">
                <XiaojingWaveMascot size={110} />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6, ease: easing }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-[52px] font-black text-white leading-[1.15] tracking-[-0.02em] mb-4">
              你的下一份简历，
              <br />
              从照镜子开始。
            </h2>
            <p className="text-neutral-400 text-lg mb-10">
              无需注册，先体验 · 全免费
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, ease: easing }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Button
                size="lg"
                asChild
                className="text-base px-10 h-13 btn-glow-accent transition-all duration-300 bg-accent-500 hover:bg-accent-400 text-white shadow-lg"
              >
                <Link href="/start">
                  开始构建我的知识库
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* 底部信任信号 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center justify-center gap-2 mt-8 text-neutral-500 text-sm"
          >
            <Star className="h-4 w-4 text-accent-400 fill-accent-400" />
            <span>每份简历，都有迹可循</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
