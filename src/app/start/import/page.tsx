"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { XiaojingUploadMascot } from "@/components/motion/xiaojing-mascot";
import { DataParticles } from "@/components/motion/data-particles";
import {
  ArrowLeft,
  ArrowRight,
  FileUp,
  FileText,
  CheckCircle2,
  Loader2,
  Sparkles,
  AlertCircle,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "text/plain",
];

const ACCEPTED_EXTENSIONS = ".pdf,.doc,.docx,.txt";

export default function ImportResumePage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extracted, setExtracted] = useState(false);

  const validateFile = (file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type) && !/\.(pdf|doc|docx|txt)$/i.test(file.name)) {
      toast.error(`${file.name} 格式不支持，请上传 PDF / Word / TXT 简历`);
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error(`${file.name} 超过 10MB 限制`);
      return false;
    }
    return true;
  };

  const handleFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    const validFiles = Array.from(newFiles).filter(validateFile);
    setFiles((prev) => [...prev, ...validFiles].slice(0, 3));
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setExtracted(false);
  };

  const handleExtract = async () => {
    if (files.length === 0) {
      toast.error("请先上传简历文件");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // 模拟上传进度
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((r) => setTimeout(r, 180));
        setUploadProgress(i);
      }

      // 实际项目应调用 /api/resume/import 解析文件
      // const formData = new FormData();
      // files.forEach((f) => formData.append("files", f));
      // const res = await fetch("/api/resume/import", { method: "POST", body: formData });
      // if (!res.ok) throw new Error("解析失败");

      setExtracted(true);
      toast.success("简历信息已提取，接下来补充缺失模块即可");
    } catch {
      toast.error("提取失败，请重试或选择对话式补全");
    } finally {
      setIsUploading(false);
    }
  };

  const handleContinue = () => {
    // 导入成功后跳转到新建知识库对话补全模式，或直接进入收集页
    router.push("/kb/new/collect?mode=import");
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden">
      {/* 背景装饰 */}
      <DataParticles className="absolute inset-0 opacity-40" count={24} />

      <div className="container-page mx-auto px-4 md:px-8 py-10 md:py-16 relative z-10">
        {/* 顶部返回 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/start"
            className="inline-flex items-center text-sm text-neutral-500 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            返回开始页
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* 左侧：上传区 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <Card className="border-primary-100 shadow-lg shadow-primary-500/5">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge variant="primary" className="mb-2 text-primary-600 border-primary-200">
                      <Sparkles className="mr-1 h-3 w-3" />
                      快速导入
                    </Badge>
                    <CardTitle className="text-xl md:text-2xl">导入旧简历</CardTitle>
                    <CardDescription className="text-sm mt-1">
                      上传已有简历，AI 自动提取经历，只追问缺失部分
                    </CardDescription>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <FileUp className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* 拖拽区 */}
                {!extracted && (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200",
                      isDragging
                        ? "border-primary-500 bg-primary-50/80 scale-[1.01]"
                        : "border-neutral-200 bg-neutral-50/50 hover:border-primary-300 hover:bg-primary-50/30"
                    )}
                  >
                    <input
                      type="file"
                      accept={ACCEPTED_EXTENSIONS}
                      multiple
                      onChange={(e) => handleFiles(e.target.files)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-neutral-100 flex items-center justify-center mx-auto mb-4">
                      <FileText className="h-7 w-7 text-primary-500" />
                    </div>
                    <p className="text-sm font-medium text-neutral-900 mb-1">
                      点击或拖拽上传简历
                    </p>
                    <p className="text-xs text-neutral-500">
                      支持 PDF / Word / TXT，最多 3 个文件，单个 ≤ 10MB
                    </p>
                  </div>
                )}

                {/* 文件列表 */}
                <AnimatePresence>
                  {files.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      {files.map((file, idx) => (
                        <motion.div
                          key={`${file.name}-${idx}`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg bg-white border border-neutral-200"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                              <FileText className="h-4 w-4 text-primary-600" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-neutral-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-neutral-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          {!extracted && (
                            <button
                              onClick={() => removeFile(idx)}
                              className="p-1.5 rounded-md hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          )}
                          {extracted && (
                            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 上传进度 */}
                {isUploading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary-500" />
                        AI 正在解析简历…
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary-500 to-accent-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.div>
                )}

                {/* 提取完成提示 */}
                {extracted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-emerald-50 border border-emerald-100 p-4"
                  >
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-emerald-900">提取完成</p>
                        <p className="text-xs text-emerald-700/80 mt-0.5">
                          已识别出教育、经历、技能等关键信息。下一步我们将对照 9 模块知识库，只补充缺失部分。
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 操作按钮 */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {!extracted ? (
                    <>
                      <Button
                        onClick={handleExtract}
                        disabled={files.length === 0 || isUploading}
                        className="flex-1"
                      >
                        {isUploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            解析中…
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            开始提取
                          </>
                        )}
                      </Button>
                      <Button variant="outline" asChild className="flex-1 sm:flex-initial">
                        <Link href="/kb/new/collect?mode=chat">
                          <ArrowRight className="mr-2 h-4 w-4" />
                          跳过，对话式补全
                        </Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={handleContinue} className="flex-1">
                        继续补充缺失信息
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setFiles([]);
                          setExtracted(false);
                          setUploadProgress(0);
                        }}
                        className="flex-1 sm:flex-initial"
                      >
                        重新上传
                      </Button>
                    </>
                  )}
                </div>

                {/* 提示 */}
                <div className="flex items-start gap-2 text-xs text-neutral-500">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <p>
                    简历解析依赖 AI 识别，复杂排版可能需手动补充。所有数据仅用于生成你的知识库，不会泄露给第三方。
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 右侧：IP 动画 + 说明 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="order-1 lg:order-2 flex flex-col items-center text-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mb-6">
              <XiaojingUploadMascot className="w-full h-full" />
              {/* 装饰光斑 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent-400/10 blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-primary-400/10 blur-xl" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              小镜帮你快速导入
            </h2>
            <p className="text-neutral-600 max-w-sm leading-relaxed">
              已有简历不用从头写。上传后，AI 会提取关键信息并映射到 9 模块知识库，
              你只需要查漏补缺。
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
