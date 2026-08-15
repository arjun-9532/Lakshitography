"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Book" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_28px_rgba(0,0,0,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
        <Link href="/" data-testid="logo-link" className="group flex items-baseline gap-2 transition-opacity hover:opacity-90">
          <span className="font-serif-display text-2xl sm:text-[2rem] text-text-primary tracking-tight">Lakshit</span>
          <span className="font-serif-display italic text-2xl sm:text-[2rem] text-gold">ography</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((l) => {
            const isActive = pathname === l.to;
            return (
              <Link
                key={l.to}
                href={l.to}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className={`relative text-[0.78rem] tracking-eyebrow uppercase font-light transition-colors duration-300 ${
                  isActive ? "text-gold" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                <span className="relative after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:bg-gold after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:content-['']">
                  {l.label}
                </span>
              </Link>
            );
          })}
          <Link href="/contact" data-testid="nav-cta-book" className="btn-primary">
            Book a Session
          </Link>
        </nav>

        <button
          data-testid="mobile-menu-toggle"
          className="md:hidden text-text-primary transition-colors hover:text-gold"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-xl">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => {
              const isActive = pathname === l.to;
              return (
                <Link
                  key={l.to}
                  href={l.to}
                  data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                  className={`text-base tracking-wide ${isActive ? "text-gold" : "text-text-primary"}`}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link href="/contact" data-testid="mobile-nav-cta-book" className="btn-primary mt-2 w-fit">
              Book a Session
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
