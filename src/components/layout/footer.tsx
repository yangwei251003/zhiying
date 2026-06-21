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
    <footer className="bg-primary-800 text-primary-50">
      <div className="container-page mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-accent-400" />
              <span className="text-lg font-semibold text-white">职映</span>
            </Link>
            <p className="text-sm text-primary-200 leading-relaxed max-w-xs">
              让每段经历，都精准匹配理想岗位。
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">产品</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">资源</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium text-white mb-3">联系</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@zhiying.app"
                  className="inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white transition-colors"
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
                  className="inline-flex items-center gap-2 text-sm text-primary-200 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-700 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-300">
            &copy; {new Date().getFullYear()} 职映 ZhiYing. All rights reserved.
          </p>
          <p className="text-xs text-primary-400">
            真实匹配，不编造。
          </p>
        </div>
      </div>
    </footer>
  );
}
