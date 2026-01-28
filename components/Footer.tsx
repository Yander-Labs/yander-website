import Link from "next/link";
import Image from "next/image";
import { Container } from "./ui/Container";
import { Mail } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "#", comingSoon: true },
  ],
};

const socialLinks = [
  { icon: XIcon, href: "https://x.com/yanderlabs", label: "X" },
  { icon: LinkedInIcon, href: "https://www.linkedin.com/company/107590331", label: "LinkedIn" },
  { icon: Mail, href: "mailto:jordan@yanderlabs.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-[#E4E7EC]">
      <Container>
        <div className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
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
                    {"comingSoon" in link && link.comingSoon ? (
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#E4E7EC]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Yander. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                Privacy
              </Link>
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
