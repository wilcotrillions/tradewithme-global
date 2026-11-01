
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
} from "lucide-react";

const platformLinks = [
  { label: "Trading", href: "/trading" },
  { label: "Investments", href: "/investments" },
  { label: "Academy", href: "/academy" },
  { label: "Mentors", href: "/mentors" },
];

const resourceLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-panelAlt">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Main Footer */}
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">

          {/* Company Information */}
          <div>
            <Link
              href="/"
              aria-label="TradeWithMe Global homepage"
              className="mb-4 flex items-center gap-2 text-lg font-bold text-primary"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-background">
                TWM
              </span>
              <span>TradeWithMe Global</span>
            </Link>

            <p className="mb-4 text-sm leading-6 text-muted">
              Professional trading education and investment resources.
              Learn about financial markets, develop your knowledge,
              and understand responsible risk management.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">
              Platform
            </h3>

            <ul className="space-y-3 text-sm text-muted">
              {platformLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">
              Resources
            </h3>

            <ul className="space-y-3 text-sm text-muted">
              {resourceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 font-semibold text-foreground">
              Contact
            </h3>

            <ul className="space-y-4 text-sm text-muted">

              <li className="flex items-start gap-3">
                <Mail
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <a
                  href="mailto:support@tradewithme.global"
                  className="break-all transition-colors hover:text-primary"
                >
                  support@tradewithme.global
                </a>
              </li>

              <li className="flex items-start gap-3">
                <Phone
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <span>
                  Contact us by email for assistance.
                </span>
              </li>

              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden="true"
                />

                <span>Serving a global audience</span>
              </li>

            </ul>
          </div>
        </div>

        {/* Social Links and Copyright */}
        <div className="border-t border-border pt-8">

          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">

            {/* Social Media */}
            <div className="flex items-center gap-5">

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-muted transition-colors hover:text-primary"
              >
                <Twitter size={20} />
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted transition-colors hover:text-primary"
              >
                <Linkedin size={20} />
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted transition-colors hover:text-primary"
              >
                <Facebook size={20} />
              </a>

            </div>

            {/* Copyright */}
            <p className="text-center text-sm text-muted md:text-right">
              © {currentYear} TradeWithMe Global. All rights reserved.
            </p>

          </div>
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-xs leading-6 text-muted">
            Trading and investing involve financial risk. You may lose
            some or all of your invested capital. Past performance does
            not guarantee future results. All website content is provided
            for general educational purposes and should not be considered
            personalized financial or investment advice.
          </p>
        </div>

      </div>
    </footer>
  );
}
