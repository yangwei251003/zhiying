import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-transparent">
      <div className="container-narrow mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-primary-600 mb-3">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-medium uppercase tracking-wide">法律文档</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">隐私政策</h1>
          <p className="text-sm text-neutral-500">最后更新：2026 年 6 月 21 日</p>
        </div>

        <div className="prose prose-neutral max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">1. 我们收集什么</h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              职映收集以下个人信息用于提供核心服务：
            </p>
            <ul className="text-sm text-neutral-700 list-disc pl-6 mt-2 space-y-1">
              <li><strong>账号信息</strong>：邮箱（用于登录与验证码）</li>
              <li><strong>知识库内容</strong>：你输入的基本信息、教育经历、工作经历、技能等</li>
              <li><strong>证件照</strong>：用于嵌入简历，可选提供</li>
              <li><strong>岗位 JD</strong>：你粘贴或上传的目标岗位信息</li>
              <li><strong>生成的简历</strong>：基于匹配结果生成的内容与文件</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">2. 我们如何使用</h2>
            <ul className="text-sm text-neutral-700 list-disc pl-6 space-y-1">
              <li>提供知识库管理、岗位匹配、简历生成等核心功能</li>
              <li>调用 AI 服务进行内容分析与生成（数据传输加密）</li>
              <li>生成可分享的只读简历链接（仅在你主动操作时）</li>
              <li>改进服务质量（聚合、匿名化的统计）</li>
            </ul>
            <p className="text-sm text-red-600 mt-2 font-medium">
              我们绝不将你的简历内容用于训练任何 AI 模型。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">3. 我们如何存储</h2>
            <ul className="text-sm text-neutral-700 list-disc pl-6 space-y-1">
              <li>数据存储于 Supabase（基于 PostgreSQL）的加密数据库</li>
              <li>传输全程 HTTPS 加密</li>
              <li>每用户数据通过 RLS（行级安全）隔离，仅本人可访问</li>
              <li>分享链接为只读、带有效期、可随时撤销</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">4. 你的权利</h2>
            <ul className="text-sm text-neutral-700 list-disc pl-6 space-y-1">
              <li><strong>访问权</strong>：随时在工作台查看你的全部数据</li>
              <li><strong>导出权</strong>：一键导出全部数据为标准格式</li>
              <li><strong>删除权</strong>：删除账号将级联删除所有关联数据与文件</li>
              <li><strong>撤回分享权</strong>：随时撤销已生成的分享链接</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">5. 第三方服务</h2>
            <p className="text-sm text-neutral-700">
              我们使用以下第三方服务，各有独立隐私政策：
            </p>
            <ul className="text-sm text-neutral-700 list-disc pl-6 mt-2 space-y-1">
              <li><strong>Supabase</strong>：数据库与文件存储</li>
              <li><strong>Vercel</strong>：网站部署与 CDN</li>
              <li><strong>OpenAI / 兼容 AI 服务</strong>：AI 内容分析与生成</li>
              <li><strong>GitHub OAuth</strong>：可选的第三方登录</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">6. 联系我们</h2>
            <p className="text-sm text-neutral-700">
              隐私相关问题请联系{" "}
              <a href="mailto:privacy@zhiying.app" className="text-primary-600 hover:underline">
                privacy@zhiying.app
              </a>
            </p>
          </section>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200">
          <Link href="/" className="text-sm text-primary-600 hover:underline">
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
