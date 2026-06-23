import Link from "next/link";
import { Zap, Github, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { label: "知识库搭建", href: "/start" },
    { label: "岗位匹配", href: "/match" },
    { label: "简历生成", href: "#" },
    { label: "学习路径", href: "#" },
  ],
  resources: [
    { label: "关于职映", href: "/about" },
    { label: "帮助中心", href: "/help" },
    { label: "隐私政策", href: "/privacy" },
    { label: "用户协议", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#02080F] text-primary-50 border-t border-white/5">
      <div className="container-page mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white">职映</span>
            </Link>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-xs mb-4">
              AI 驱动的职业自我认知与岗位匹配平台。先照清自己，再匹配岗位。
            </p>
            <p className="text-xs text-neutral-600 font-medium">
              真实匹配，不编造。
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">产品功能</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">资源</h4>
            <ul className="space-y-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">联系</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@zhiying.app"
                  className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  <Mail className="h-4 w-4" />
                  hello@zhiying.app
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/zhiying-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-neutral-600">
            &copy; {new Date().getFullYear()} 职映 ZhiYing. All rights reserved.
          </p>
          <p className="text-xs text-neutral-600">
            每份简历，都有迹可循。
          </p>
        </div>
      </div>
    </footer>
  );
}
