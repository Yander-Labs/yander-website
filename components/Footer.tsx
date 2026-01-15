import Link from "next/link";
import Image from "next/image";
import { Container } from "./ui/Container";
import { Twitter, Linkedin, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Features", href: "#", comingSoon: true },
    { label: "How It Works", href: "#", comingSoon: true },
    { label: "Integrations", href: "#", comingSoon: true },
    { label: "Pricing", href: "#", comingSoon: true },
  ],
  company: [
    { label: "About", href: "#", comingSoon: true },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "#", comingSoon: true },
    { label: "Contact", href: "#", comingSoon: true },
  ],
  resources: [
    { label: "Documentation", href: "#", comingSoon: true },
    { label: "Help Center", href: "#", comingSoon: true },
    { label: "Privacy Policy", href: "#", comingSoon: true },
    { label: "Terms of Service", href: "#", comingSoon: true },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-[#E4E7EC]">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center text-gray-900">
                <Image
                  src="/logo.svg"
                  alt="Yander"
                  width={120}
                  height={35}
                  className="h-7 w-auto"
                />
              </Link>
              <p className="mt-4 text-sm text-gray-500 max-w-xs">
                Build stronger remote teams. Keep clients longer. Get live insights on engagement, workload, and sentiment.
              </p>
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-9 h-9 rounded-lg bg-white border border-[#E4E7EC] flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    {link.comingSoon ? (
                      <span className="inline-flex items-center gap-2 text-sm text-gray-400 cursor-default">
                        {link.label}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 font-medium">
                          Soon
                        </span>
                      </span>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    {link.comingSoon ? (
                      <span className="inline-flex items-center gap-2 text-sm text-gray-400 cursor-default">
                        {link.label}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 font-medium">
                          Soon
                        </span>
                      </span>
                    ) : link.href.startsWith('/') ? (
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    {link.comingSoon ? (
                      <span className="inline-flex items-center gap-2 text-sm text-gray-400 cursor-default">
                        {link.label}
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-400 font-medium">
                          Soon
                        </span>
                      </span>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#E4E7EC]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Yander. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 cursor-default">
                Privacy
                <span className="text-[9px] px-1 py-0.5 rounded bg-gray-100 text-gray-400 font-medium">Soon</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 cursor-default">
                Terms
                <span className="text-[9px] px-1 py-0.5 rounded bg-gray-100 text-gray-400 font-medium">Soon</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-400 cursor-default">
                Cookies
                <span className="text-[9px] px-1 py-0.5 rounded bg-gray-100 text-gray-400 font-medium">Soon</span>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
