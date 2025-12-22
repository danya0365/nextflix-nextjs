import Link from "next/link";

const footerLinks = {
  column1: [
    { href: "/faq", label: "FAQ" },
    { href: "/investor-relations", label: "Investor Relations" },
    { href: "/ways-to-watch", label: "Ways to Watch" },
    { href: "/corporate-info", label: "Corporate Information" },
    { href: "/originals", label: "Only on Nextflix" },
  ],
  column2: [
    { href: "/help", label: "Help Center" },
    { href: "/jobs", label: "Jobs" },
    { href: "/terms", label: "Terms of Use" },
    { href: "/contact", label: "Contact Us" },
  ],
  column3: [
    { href: "/account", label: "Account" },
    { href: "/redeem", label: "Redeem Gift Cards" },
    { href: "/privacy", label: "Privacy" },
    { href: "/speed-test", label: "Speed Test" },
  ],
  column4: [
    { href: "/media-center", label: "Media Center" },
    { href: "/buy-gift-cards", label: "Buy Gift Cards" },
    { href: "/cookie-preferences", label: "Cookie Preferences" },
    { href: "/legal-notices", label: "Legal Notices" },
  ],
};

/**
 * Netflix-style footer with multiple link columns
 */
export function MainFooter() {
  return (
    <footer className="main-footer">
      <div className="main-footer-grid">
        {/* Column 1 */}
        <div className="flex flex-col gap-3">
          {footerLinks.column1.map((link) => (
            <Link key={link.href} href={link.href} className="main-footer-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-3">
          {footerLinks.column2.map((link) => (
            <Link key={link.href} href={link.href} className="main-footer-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3">
          {footerLinks.column3.map((link) => (
            <Link key={link.href} href={link.href} className="main-footer-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Column 4 */}
        <div className="flex flex-col gap-3">
          {footerLinks.column4.map((link) => (
            <Link key={link.href} href={link.href} className="main-footer-link">
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="main-footer-copyright">
        © {new Date().getFullYear()} Nextflix, Inc. All rights reserved.
      </p>
    </footer>
  );
}
