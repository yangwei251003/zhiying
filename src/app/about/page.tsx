import Link from "next/link";
import { Zap, Heart, Shield, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white">
      <div className="container-narrow mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 items-center justify-center mb-4">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            关于职映
          </h1>
          <p className="text-neutral-500 text-lg">
            让每段经历，都精准匹配理想岗位
          </p>
        </div>

        <div className="prose prose-neutral max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-3">我们的故事</h2>
            <p className="text-neutral-700 leading-relaxed">
              职映诞生于一个简单的观察：大多数 AI 简历工具都在解决"怎么把简历写好看"，
              却忽略了一个更上游的问题——"求职者根本不知道自己有什么"。
            </p>
            <p className="text-neutral-700 leading-relaxed mt-3">
              于是我们做了"职映小镜"——一面 AI 职业镜子。先帮你照清自己，
              再帮你照清岗位，最后才落地一份每句话都有依据的简历。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-3">我们的价值观</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Shield,
                  title: "真实性",
                  desc: "简历内容来自知识库真实经历，只做专业表达，不编造。",
                },
                {
                  icon: Eye,
                  title: "可追溯性",
                  desc: "简历每句话都能对应知识库条目，找不到依据即删除。",
                },
                {
                  icon: Heart,
                  title: "诚实差距披露",
                  desc: "岗位需要但你不具备的能力，诚实标注为待补强，不冒充精通。",
                },
                {
                  icon: Shield,
                  title: "不鼓励欺诈",
                  desc: "帮你挖掘真实价值，绝不协助求职欺诈。",
                },
              ].map((v) => (
                <div key={v.title} className="rounded-xl border border-neutral-200 p-4">
                  <v.icon className="h-6 w-6 text-primary-500 mb-2" />
                  <h3 className="font-semibold text-sm mb-1">{v.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-3">为什么叫"职映"？</h2>
            <p className="text-neutral-700 leading-relaxed">
              "职"是职业，"映"是照映。我们希望职映成为每个求职者的"职业镜子"——
              客观照见你的真实能力，不夸大、不缩小，让你能基于事实做出职业决策。
            </p>
            <p className="text-neutral-700 leading-relaxed mt-3">
              IP 形象"职映小镜"就是这面镜子的具象化——专业、智能、温暖、可靠。
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-neutral-900 mb-3">联系职映</h2>
            <p className="text-neutral-700">
              有建议、合作或反馈？欢迎邮件至{" "}
              <a href="mailto:hello@zhiying.app" className="text-primary-600 hover:underline">
                hello@zhiying.app
              </a>
            </p>
          </section>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-neutral-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:underline"
          >
            ← 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
