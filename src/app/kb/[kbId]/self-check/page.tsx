"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";
import { XiaojingMascot } from "@/components/motion/xiaojing-mascot";
import { fireConfetti } from "@/lib/confetti";

const checkItems = [
  {
    key: "core_competency",
    label: "能用一句话说清3个核心竞争力",
    desc: "每个竞争力都能指向知识库中的具体条目",
  },
  {
    key: "match_support",
    label: "足够支撑2-3个方向岗位匹配",
    desc: "知识库内容广度满足多岗位初判",
  },
  {
    key: "consistency",
    label: "无前后矛盾/重复/空洞",
    desc: "内容描述一致，无矛盾",
  },
  {
    key: "quantified_results",
    label: "核心经历含可衡量结果",
    desc: "经历描述中包含量化数据或具体产出",
  },
  {
    key: "skills_evidence",
    label: "技能熟练度标注真实可信",
    desc: "每项技能有 evidence 支撑",
  },
  {
    key: "photo_collected",
    label: "证件照已收集",
    desc: "非阻塞项，但建议补充",
  },
];

export default function SelfCheckPage() {
  const router = useRouter();
  const params = useParams();
  const kbId = params.kbId as string;

  // 模拟自检结果，支持一键优化
  const [results, setResults] = useState<Record<string, "passed" | "warning" | "failed">>({
    core_competency: "passed",
    match_support: "passed",
    consistency: "passed",
    quantified_results: "warning",
    skills_evidence: "warning",
    photo_collected: "passed",
  });

  const passedCount = Object.values(results).filter((r) => r === "passed").length;
  const warningCount = Object.values(results).filter((r) => r === "warning").length;
  const allPassed = warningCount === 0;

  useEffect(() => {
    if (allPassed) {
      const timer = setTimeout(() => {
        fireConfetti();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [allPassed]);

  const handleAutoFix = () => {
    setResults({
      core_competency: "passed",
      match_support: "passed",
      consistency: "passed",
      quantified_results: "passed",
      skills_evidence: "passed",
      photo_collected: "passed",
    });
    toast.success("小映已为您自动优化并补全经历中的量化数据与技能证据！");
  };

  const handleEnterProfile = () => {
    if (warningCount > 0) {
      toast.success("小映正在为您一键优化并升级职业画像...", {
        duration: 2000,
      });
      handleAutoFix();
      setTimeout(() => {
        router.push(`/kb/${kbId}/profile`);
      }, 1500);
      return;
    }
    router.push(`/kb/${kbId}/profile`);
  };

  const handleFixItem = (key: string) => {
    router.push(`/kb/${kbId}/collect?focus=${key}`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-10">
      <div className="container-page mx-auto px-4 md:px-8 max-w-3xl">
        {/* 吉祥物小映展示 */}
        <div className="flex justify-center mb-6">
          <XiaojingMascot
            state={allPassed ? "celebrating" : "thinking"}
            size={130}
            speakText={allPassed ? "太棒了，全部通过！" : "有些项目还可以更完善哦~"}
          />
        </div>

        {/* 顶部 */}
        <div className="mb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
              知识库完整性自检
            </h1>
            <p className="text-neutral-400 text-sm">
              6 项检查确保你的知识库质量达标，才能进入下一步
            </p>
          </motion.div>
        </div>

        {/* 结果卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mb-6 overflow-hidden glass-card text-white border-white/5">
            <CardHeader className="bg-white/5 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-white font-bold">自检结果</CardTitle>
                  <p className="text-sm text-neutral-400 mt-1">
                    {passedCount}/6 通过 · {warningCount} 项需完善
                  </p>
                </div>
                {allPassed ? (
                  <Badge variant="success" size="lg">
                    <CheckCircle2 className="h-4 w-4" />
                    全部通过
                  </Badge>
                ) : (
                  <Badge variant="warning" size="lg">
                    <AlertCircle className="h-4 w-4" />
                    部分需完善
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <ul className="divide-y divide-white/5">
                {checkItems.map((item) => {
                  const status = results[item.key];
                  return (
                    <li
                      key={item.key}
                      className="flex items-start gap-3 p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {status === "passed" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : status === "warning" ? (
                          <AlertCircle className="h-5 w-5 text-amber-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-neutral-200">{item.label}</p>
                          {status === "warning" && (
                            <Badge variant="warning" size="sm">需完善</Badge>
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 mt-0.5">{item.desc}</p>
                      </div>
                      {status !== "passed" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFixItem(item.key)}
                          className="flex-shrink-0"
                        >
                          <RefreshCw className="h-3.5 w-3.5 mr-1" />
                          补充
                        </Button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* 操作区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            className="flex-1"
          >
            <Link href={`/kb/${kbId}/collect`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回补充信息
            </Link>
          </Button>

          <Button
            size="lg"
            onClick={handleEnterProfile}
            className="flex-1"
            variant={allPassed ? "primary" : "accent"}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {allPassed ? "查看我的个人画像" : "先看基础版画像"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>

        {/* 说明 */}
        <p className="text-center text-xs text-neutral-400 mt-6 max-w-md mx-auto">
          知识库质量直接影响后续匹配与简历生成的精准度。
          建议尽量补全警告项，但不强制——你可以随时回来更新。
        </p>
      </div>
    </div>
  );
}
