"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/trading", label: "Trading" },
  { href: "/investments", label: "Investments" },
  { href: "/academy", label: "Academy" },
  { href: "/mentors", label: "Mentors" },
  { href: "/community", label: "Community" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      aria-label="Main navigation"
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Navigation Header */}
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="TradeWithMe Global homepage"
            className="flex items-center gap-2 text-lg font-bold text-primary"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-background">
              TWM
            </span>

            <span className="hidden sm:inline">
              TradeWithMe Global
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Authentication */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm text-foreground transition-colors hover:text-primary"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary/80"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((previous) => !previous)}
            className="rounded-lg p-2 transition-colors hover:bg-panel md:hidden"
          >
            {isOpen ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-navigation"
            className="space-y-2 border-t border-border pb-4 pt-4 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:bg-panel hover:text-primary"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Authentication */}
            <div className="space-y-2 border-t border-border px-4 pt-4">
              <Link
                href="/login"
                onClick={closeMenu}
                className="block rounded-lg px-4 py-2 text-center text-sm text-foreground transition-colors hover:bg-panel"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMenu}
                className="block rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-background transition-colors hover:bg-primary/80"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
