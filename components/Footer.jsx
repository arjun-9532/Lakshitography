import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#050505] border-t border-white/5 mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif-display text-3xl text-text-primary">Lakshit</span>
            <span className="font-serif-display italic text-3xl text-gold">ography</span>
          </div>
          <p className="mt-5 text-text-secondary text-sm leading-relaxed max-w-xs">
            Slow, intimate photography for the moments that feel like home.
          </p>
        </div>

        <div className="md:justify-self-center">
          <p className="eyebrow mb-5">Explore</p>
          <ul className="space-y-3 text-text-secondary text-sm">
            <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
            <li><Link href="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link href="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
            <li><Link href="/contact" className="hover:text-gold transition-colors">Book a Session</Link></li>
          </ul>
        </div>

        <div className="md:justify-self-end">
          <p className="eyebrow mb-5">Reach out</p>
          <ul className="space-y-3 text-text-secondary text-sm">
            <li className="flex items-center gap-3"><Mail size={14} className="text-gold"/>hello@lakshitography.com</li>
            <li className="flex items-center gap-3"><Phone size={14} className="text-gold"/>+919794747454</li>
            <li className="flex items-center gap-3"><Instagram size={14} className="text-gold"/>@lakshitography</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-secondary">© {new Date().getFullYear()} Lakshitography. All moments reserved.</p>
          <Link href="/admin/login" data-testid="admin-login-link" className="text-xs text-text-secondary hover:text-gold transition-colors tracking-wider uppercase">Admin</Link>
        </div>
      </div>
    </footer>
  );
}
