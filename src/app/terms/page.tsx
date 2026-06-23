import Link from "next/link";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-transparent">
      <div className="container-narrow mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-primary-600 mb-3">
            <FileText className="h-5 w-5" />
            <span className="text-xs font-medium uppercase tracking-wide">法律文档</span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">用户协议</h1>
          <p className="text-sm text-neutral-500">最后更新：2026 年 6 月 21 日</p>
        </div>

        <div className="prose prose-neutral max-w-none space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">1. 服务说明</h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              职映（ZhiYing）是一个 AI 职业自我认知与岗位匹配平台，提供职业知识库构建、
              个人画像生成、岗位匹配分析、简历生成等服务。使用本服务即表示你同意本协议。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">2. 使用规则</h2>
            <ul className="text-sm text-neutral-700 list-disc pl-6 space-y-1">
              <li>你须提供真实、准确的个人信息</li>
              <li>不得使用本服务进行求职欺诈或编造虚假履历</li>
              <li>不得滥用、攻击、反向工程本服务</li>
              <li>不得将本服务内容用于商业转售</li>
              <li>不得侵犯他人隐私或知识产权</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">3. 真实性承诺</h2>
            <p className="text-sm text-neutral-700 leading-relaxed">
              职映的核心价值观是"真实匹配，不编造"。本服务会帮助你挖掘真实经历的价值、
              将普通经历转化为专业表达、推荐可快速学习的技能——但任何情况下都不会协助你
              进行求职欺诈。简历中每一句话都应能在你的知识库中找到依据。
            </p>
            <p className="text-sm text-amber-700 mt-2 font-medium">
              你对简历内容的真实性负最终责任。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">4. 知识产权</h2>
            <ul className="text-sm text-neutral-700 list-disc pl-6 space-y-1">
              <li>你输入的内容（知识库、JD）归你所有</li>
              <li>生成的简历内容归你所有，可自由使用</li>
              <li>职映的 Logo、IP 形象、品牌素材归职映所有</li>
              <li>简历排版模板基于 MIT 协议开源</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">5. 免责声明</h2>
            <ul className="text-sm text-neutral-700 list-disc pl-6 space-y-1">
              <li>AI 生成内容可能存在偏差，你应自行审核</li>
              <li>本服务不保证求职结果，匹配结果仅供参考</li>
              <li>因不可抗力（网络、第三方服务中断等）造成的损失不承担责任</li>
              <li>你需对自己的求职决策负责</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">6. 协议变更</h2>
            <p className="text-sm text-neutral-700">
              本协议可能不时更新，重大变更将通过邮件通知注册用户。继续使用即视为接受变更。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 mb-2">7. 联系我们</h2>
            <p className="text-sm text-neutral-700">
              协议相关问题请联系{" "}
              <a href="mailto:legal@zhiying.app" className="text-primary-600 hover:underline">
                legal@zhiying.app
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
