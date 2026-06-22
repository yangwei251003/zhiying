"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** 新建知识库 → 生成 ID → 跳转到收集页 */
export default function NewKbCollectPage() {
  const router = useRouter();

  useEffect(() => {
    // 生成一个简单的 kbId（生产环境应调用 API 创建 Supabase 记录）
    const kbId = `kb_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    router.replace(`/kb/${kbId}/collect`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-3" />
        <p className="text-sm text-neutral-500">正在创建知识库...</p>
      </div>
    </div>
  );
}
