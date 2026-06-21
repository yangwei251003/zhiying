"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import {
  Target,
  Upload,
  FileText,
  Sparkles,
  ArrowRight,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

export default function MatchCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const kbId = searchParams.get("kb") || "default";

  const [jdText, setJdText] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jdText.trim() && !imageUrl) {
      toast.error("请粘贴 JD 文本或上传 JD 截图");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/match/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kb_id: kbId,
          jd_text: jdText,
          jd_image_url: imageUrl,
        }),
      });

      if (!res.ok) throw new Error("匹配分析失败");
      const data = await res.json();

      // 跳转到结果页（带 loading 状态轮询）
      router.push(`/match/${data.match_id}/result`);
    } catch (err) {
      // 降级：模拟创建 matchId，跳转
      const mockMatchId = `mock_${Date.now()}`;
      toast("AI 服务正在准备中，先用演示数据展示", {
        description: "稍后可重新发起真实匹配",
      });
      router.push(`/match/${mockMatchId}/result`);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("文件超过 10MB 限制");
      return;
    }
    // 实际项目上传到 Supabase Storage，这里仅本地预览
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    toast.success("截图已上传，将用于 OCR 解析");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-neutral-50 to-primary-50 py-10">
      <div className="container-page mx-auto px-4 md:px-8 max-w-3xl">
        {/* 头部 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 items-center justify-center mb-3">
            <Target className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">岗位匹配分析</h1>
          <p className="text-neutral-600">
            把你心仪的岗位 JD 贴进来，或上传截图。职映会做深度拆解和三分组精准匹配。
          </p>
        </motion.div>

        {/* 输入区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6 space-y-5">
              {/* JD 文本输入 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  岗位 JD 文本
                </label>
                <Textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="在这里粘贴岗位 JD 全文，包括岗位职责、任职要求等..."
                  className="min-h-[200px] font-mono text-xs leading-relaxed"
                />
                <p className="text-xs text-neutral-400">
                  支持粘贴富文本，系统会自动清理格式
                </p>
              </div>

              {/* 分割线 */}
              <div className="flex items-center gap-3">
                <div className="flex-1 border-t border-neutral-200" />
                <span className="text-xs text-neutral-400">或</span>
                <div className="flex-1 border-t border-neutral-200" />
              </div>

              {/* 上传截图 */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  上传 JD 截图
                </label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-neutral-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50/30 transition-colors">
                  {imageUrl ? (
                    <div className="text-center">
                      <Badge variant="success">截图已上传</Badge>
                      <p className="text-xs text-neutral-500 mt-2">点击重新选择</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                      <p className="text-sm text-neutral-500">点击上传 JD 截图</p>
                      <p className="text-xs text-neutral-400 mt-1">支持 jpg/png/webp · 最大 10MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleUploadImage}
                    className="hidden"
                  />
                </label>
              </div>

              {/* 知识库选择 */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-500">使用知识库：</span>
                <Badge variant="primary">张三-大三版 · 完整度 100%</Badge>
              </div>

              {/* CTA */}
              <Button
                onClick={handleMatch}
                disabled={loading || (!jdText.trim() && !imageUrl)}
                size="lg"
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    正在分析...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    开始匹配分析
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* 流程提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-3 gap-3 text-center"
        >
          {[
            { step: 1, label: "JD 解析", desc: "AI 拆解岗位 10 维度" },
            { step: 2, label: "三分组匹配", desc: "直接/关联/补强" },
            { step: 3, label: "客观评价", desc: "9 维度岗位评估" },
          ].map((s) => (
            <div key={s.step} className="rounded-lg bg-white border border-neutral-200 p-3">
              <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 text-xs font-bold mx-auto mb-2 flex items-center justify-center">
                {s.step}
              </div>
              <p className="text-xs font-medium text-neutral-700">{s.label}</p>
              <p className="text-[10px] text-neutral-400 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </motion.div>

        <p className="text-center text-sm text-neutral-400 mt-6">
          <Link href="/dashboard" className="hover:text-primary-600">
            ← 返回我的工作台
          </Link>
        </p>
      </div>
    </div>
  );
}
