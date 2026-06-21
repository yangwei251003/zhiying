"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import {
  Compass,
  ArrowRight,
  Target,
  TrendingUp,
  Sparkles,
  Star,
  ArrowLeft,
  Mail,
  Send,
} from "lucide-react";

const recommendations = [
  {
    title: "电力系统工程师",
    match: "高度匹配",
    reason: "你的变电站实习经验和系统分析课程与此岗位高度吻合",
    tags: ["电力系统分析", "变电站检修", "继电保护"],
    salary: "应届 8-12K",
    growth: "3-5年可晋升主责/主管",
  },
  {
    title: "新能源工程师",
    match: "较高匹配",
    reason: "你的系统仿真能力和项目经验可迁移至新能源领域",
    tags: ["光伏系统", "风力发电", "储能技术"],
    salary: "应届 9-13K",
    growth: "行业高速发展期，晋升快",
  },
  {
    title: "电气设计工程师",
    match: "中等匹配",
    reason: "课程设计与CAD技能有相关性，但需补强设计规范",
    tags: ["CAD设计", "电气规范", "电路设计"],
    salary: "应届 7-10K",
    growth: "设计院路线，稳定成长",
  },
  {
    title: "售前技术支持",
    match: "可尝试",
    reason: "沟通表达能力和技术基础可支撑，需补强商务技能",
    tags: ["技术方案", "客户沟通", "标书制作"],
    salary: "应届 8-12K",
    growth: "技术转销售路线，薪资上限高",
  },
];

export default function RecommendPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email || !email.includes("@")) {
      toast.error("请输入有效邮箱");
      return;
    }
    setSubscribed(true);
    toast.success("已订阅，更多岗位分析将发送至你的邮箱");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-neutral-50 to-primary-50 py-10">
      <div className="container-page mx-auto px-4 md:px-8 max-w-4xl">
        {/* 顶部 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 items-center justify-center mb-3">
            <Compass className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">岗位推荐</h1>
          <p className="text-neutral-600 max-w-md mx-auto">
            基于你的个人画像和知识库，AI 反向推荐最适合你的岗位方向
          </p>
          <Badge variant="accent" className="mt-2">Beta · 持续优化中</Badge>
        </motion.div>

        {/* 推荐列表 */}
        <div className="space-y-4 mb-10">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-neutral-900">{rec.title}</h3>
                        <Badge
                          variant={
                            rec.match === "高度匹配" ? "success" :
                            rec.match === "较高匹配" ? "primary" :
                            rec.match === "中等匹配" ? "warning" : "neutral"
                          }
                          size="sm"
                        >
                          {rec.match}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600 mb-2">{rec.reason}</p>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {rec.tags.map((tag) => (
                          <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-600">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5" />
                          {rec.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" />
                          {rec.growth}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/research/${encodeURIComponent(rec.title)}`}
                      className="flex-shrink-0"
                    >
                      <Button variant="outline" size="sm">
                        <Target className="mr-1 h-3.5 w-3.5" />
                        岗位详情
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 订阅 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-primary-50/60 border-primary-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Mail className="h-4 w-4 text-primary-600" />
                获取更多岗位推荐
              </CardTitle>
            </CardHeader>
            <CardContent>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-primary-700">
                  <Sparkles className="h-4 w-4" />
                  已订阅！新岗位分析将发送至 {email}
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSubscribe}>
                    <Send className="mr-2 h-3.5 w-3.5" />
                    订阅更新
                  </Button>
                </div>
              )}
              <p className="text-xs text-neutral-400 mt-2">
                更多岗位方向正在训练中，订阅后可第一时间获取完整分析报告
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* 返回 */}
        <div className="text-center mt-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary-600">
            <ArrowLeft className="h-4 w-4" />
            返回工作台
          </Link>
        </div>
      </div>
    </div>
  );
}
