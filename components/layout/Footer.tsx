import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-panelAlt">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-primary mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-background text-sm font-bold">
                TWM
              </div>
              <span>TradeWithMe</span>
            </div>
            <p className="text-sm text-muted mb-4">
              Professional trading education and investment platform. Learn, grow, and succeed together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/trading" className="hover:text-primary transition-colors">
                  Trading
                </Link>
              </li>
              <li>
                <Link href="/investments" className="hover:text-primary transition-colors">
                  Investments
                </Link>
              </li>
              <li>
                <Link href="/academy" className="hover:text-primary transition-colors">
                  Academy
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-primary transition-colors">
                  Mentors
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a href="mailto:support@tradewithme.global" className="hover:text-primary transition-colors">
                  support@tradewithme.global
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>Global</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-muted hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
            </div>
            <p className="text-sm text-muted text-center md:text-right">
              © {currentYear} TradeWithMe Global. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
