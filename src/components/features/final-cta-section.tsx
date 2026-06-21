"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-page mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          {/* IP 占位 */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-md mb-6 animate-float">
            <span className="text-4xl">🤖</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
            你的下一份简历，从照镜子开始。
          </h2>
          <p className="text-neutral-600 mb-8">
            无需注册，先体验 · 全免费
          </p>

          <Button size="lg" asChild className="text-base px-8 h-12">
            <Link href="/start">
              开始构建我的知识库
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
