"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/providers/auth-provider";
import {
  Database,
  FileText,
  Share2,
  Settings,
  Plus,
  Edit,
  Copy,
  Trash2,
  Target,
  Eye,
  Download,
  Clock,
} from "lucide-react";

const mockKBs = [
  {
    id: "kb1",
    name: "张三-大三版",
    updated_at: "2026-06-20",
    completeness: 100,
    photo: "张",
  },
  {
    id: "kb2",
    name: "张三-实习版",
    updated_at: "2026-06-15",
    completeness: 85,
    photo: "张",
  },
];

const mockResumes = [
  {
    id: "r1",
    name: "国网电力版 v1",
    kb: "张三-大三版",
    created: "2026-06-20",
    target: "电力系统工程师",
  },
  {
    id: "r2",
    name: "南方电网版 v2",
    kb: "张三-大三版",
    created: "2026-06-21",
    target: "电气工程师",
  },
];

type Tab = "kb" | "resumes" | "shares" | "settings";

export default function DashboardPage() {
  const { user, isLoading } = useAuth();
  const [tab, setTab] = useState<Tab>("kb");

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <p className="text-sm text-neutral-400">加载中...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-600">请先登录以查看你的工作台</p>
        <Button asChild>
          <Link href="/login?redirect=/dashboard">前往登录</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-50">
      <div className="container-page mx-auto px-4 md:px-8 py-8 max-w-5xl">
        {/* 顶部 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-3 mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">我的工作台</h1>
            <p className="text-sm text-neutral-500 mt-1">
              欢迎回来，{user.email} · 管理你的知识库和简历
            </p>
          </div>
          <Button asChild>
            <Link href="/start">
              <Plus className="mr-2 h-4 w-4" />
              新建知识库
            </Link>
          </Button>
        </motion.div>

        {/* Tab 切换 */}
        <div className="border-b border-neutral-200 mb-6">
          <nav className="flex gap-1">
            {[
              { key: "kb" as Tab, label: "知识库", icon: Database },
              { key: "resumes" as Tab, label: "简历版本", icon: FileText },
              { key: "shares" as Tab, label: "分享记录", icon: Share2 },
              { key: "settings" as Tab, label: "账号设置", icon: Settings },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`relative px-4 py-2.5 text-sm font-medium transition-colors -mb-px border-b-2 ${
                  tab === t.key
                    ? "border-primary-500 text-primary-600"
                    : "border-transparent text-neutral-500 hover:text-neutral-700"
                }`}
              >
                <t.icon className="inline h-4 w-4 mr-1.5" />
                {t.label}
              </button>
            ))}
          </nav>
        </div>

        {/* 内容 */}
        {tab === "kb" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {mockKBs.map((kb) => (
              <Card key={kb.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex flex-wrap items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                    {kb.photo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-neutral-900">{kb.name}</h3>
                      <Badge variant={kb.completeness === 100 ? "success" : "warning"} size="sm">
                        完整度 {kb.completeness}%
                      </Badge>
                    </div>
                    <p className="text-xs text-neutral-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      更新于 {kb.updated_at}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/kb/${kb.id}/profile`}>
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        查看画像
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/match/new?kb=${kb.id}`}>
                        <Target className="h-3.5 w-3.5 mr-1" />
                        匹配岗位
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/kb/${kb.id}/collect`}>
                        <Edit className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {tab === "resumes" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {mockResumes.map((r) => (
              <Card key={r.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{r.name}</CardTitle>
                    <Badge variant="primary" size="sm">{r.target}</Badge>
                  </div>
                  <p className="text-xs text-neutral-500">基于：{r.kb}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-neutral-400 mb-3">生成于 {r.created}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/resume/${r.id}/preview`}>
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        预览
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      下载
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {tab === "shares" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Share2 className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm text-neutral-500 mb-4">还没有分享记录</p>
            <p className="text-xs text-neutral-400">在简历预览页点击"分享"即可生成分享链接</p>
          </motion.div>
        )}

        {tab === "settings" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl space-y-4"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">账号信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-500">邮箱</span>
                  <span className="text-neutral-900 font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">注册方式</span>
                  <Badge variant="primary">{user.app_metadata?.provider || "email"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">注册时间</span>
                  <span className="text-neutral-700">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString("zh-CN") : "-"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">数据管理</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  导出我的全部数据
                </Button>
                <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="mr-2 h-4 w-4" />
                  删除账号与全部数据
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
