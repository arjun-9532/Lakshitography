"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { MessageCircle, Send, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { api, formatApiErrorDetail } from "@/lib/api";
import { SERVICES, WHATSAPP_NUMBER } from "@/data/content";

const empty = {
  name: "", email: "", phone: "",
  service: "couple-lifestyle",
  preferred_date: "",
  people_count: "",
  location: "",
  message: "",
};

export default function ContactForm() {
  const params = useSearchParams();
  const [form, setForm] = useState(empty);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const s = params.get("service");
    if (s && SERVICES.some((x) => x.slug === s)) setForm((f) => ({ ...f, service: s }));
  }, [params]);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildWhatsAppLink = (f) => {
    const svc = SERVICES.find((s) => s.slug === f.service)?.name || f.service;
    const text =
      `Hi Ravi! I'd love to book a session.\n\n` +
      `• Name: ${f.name}\n` +
      `• Service: ${svc}\n` +
      `• Preferred date: ${f.preferred_date || "Flexible"}\n` +
      `• People: ${f.people_count || "—"}\n` +
      `• Location: ${f.location || "—"}\n` +
      `• Phone: ${f.phone}\n` +
      (f.message ? `\nNote: ${f.message}\n` : "");
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/bookings", form);
      setDone(true);
      toast.success("Booking request sent. I'll get back within 24 hours.");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Could not submit. Try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="page-contact" className="bg-bg min-h-screen pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="lg:col-span-2"
        >
          <p className="eyebrow mb-6">Book a session</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl font-light tracking-display text-text-primary leading-[1.05]">
            Tell me about <span className="italic text-gold">your day</span>.
          </h1>
          <p className="mt-6 text-text-secondary leading-relaxed">
            Send the form, or message me directly on WhatsApp. I usually reply within a day — sometimes sooner with a cup
            of chai in hand.
          </p>

          <div className="mt-10 space-y-5 text-text-secondary text-sm">
            <a href={buildWhatsAppLink(form)} target="_blank" rel="noreferrer"
              data-testid="contact-whatsapp-direct"
              className="flex items-center gap-4 group hover:text-gold transition-colors">
              <span className="w-10 h-10 border border-faint flex items-center justify-center"><MessageCircle size={16} className="text-gold"/></span>
              WhatsApp Ravi Chokra
            </a>
            <a href="mailto:hello@lakshitography.com" className="flex items-center gap-4 group hover:text-gold transition-colors">
              <span className="w-10 h-10 border border-faint flex items-center justify-center"><Mail size={16} className="text-gold"/></span>
              hello@lakshitography.com
            </a>
            <a href="tel:+919794747454" className="flex items-center gap-4 group hover:text-gold transition-colors">
              <span className="w-10 h-10 border border-faint flex items-center justify-center"><Phone size={16} className="text-gold"/></span>
              +91 9794747454
            </a>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="lg:col-span-3 bg-surface border border-faint p-8 lg:p-10"
        >
          {done ? (
            <div data-testid="booking-success" className="py-10 text-center">
              <p className="eyebrow mb-5">Thank you</p>
              <h2 className="font-serif-display text-4xl text-text-primary leading-tight">Your note just landed in my inbox.</h2>
              <p className="mt-5 text-text-secondary">I'll reply within 24 hours. Want a quicker chat?</p>
              <a
                href={buildWhatsAppLink(form)}
                target="_blank" rel="noreferrer"
                data-testid="success-whatsapp-link"
                className="btn-primary mt-8"
              >
                Continue on WhatsApp <MessageCircle size={14} />
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} data-testid="booking-form" className="space-y-6">
              <Field label="Your name" required>
                <input data-testid="form-name" required value={form.name} onChange={onChange("name")} className="input" />
              </Field>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Email" required>
                  <input data-testid="form-email" required type="email" value={form.email} onChange={onChange("email")} className="input" />
                </Field>
                <Field label="Phone" required>
                  <input data-testid="form-phone" required value={form.phone} onChange={onChange("phone")} className="input" />
                </Field>
              </div>

              <Field label="Service">
                <select data-testid="form-service" value={form.service} onChange={onChange("service")} className="input">
                  {SERVICES.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </Field>

              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Preferred date">
                  <input data-testid="form-date" type="date" value={form.preferred_date} onChange={onChange("preferred_date")} className="input" />
                </Field>
                <Field label="People count">
                  <input data-testid="form-people" placeholder="e.g. 2, family of 4..." value={form.people_count} onChange={onChange("people_count")} className="input" />
                </Field>
              </div>

              <Field label="Location / City">
                <input data-testid="form-location" placeholder="Delhi, Bangalore, home address..." value={form.location} onChange={onChange("location")} className="input" />
              </Field>

              <Field label="Anything I should know?">
                <textarea data-testid="form-message" rows={4} value={form.message} onChange={onChange("message")} className="input resize-none" />
              </Field>

              <div className="flex flex-wrap gap-4 pt-2">
                <button type="submit" data-testid="form-submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                  {submitting ? "Sending…" : "Send request"} <Send size={14} />
                </button>
                <a
                  href={buildWhatsAppLink(form)}
                  target="_blank" rel="noreferrer"
                  data-testid="form-whatsapp"
                  className="btn-ghost"
                >
                  WhatsApp instead <MessageCircle size={14} />
                </a>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          color: var(--text-primary);
          border: none;
          border-bottom: 1px solid rgba(232,220,203,0.18);
          padding: 0.7rem 0;
          font-family: 'Outfit', sans-serif;
          font-size: 0.95rem;
          transition: border-color 0.3s ease;
          outline: none;
        }
        .input:focus { border-color: var(--accent); }
        .input::placeholder { color: rgba(163,163,152,0.5); }
        select.input { background: var(--surface); padding: 0.7rem 0.5rem; }
        select.input option { background: var(--surface); color: var(--text-primary); }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-xs tracking-eyebrow uppercase text-text-secondary mb-2">
        {label}{required ? <span className="text-gold ml-1">*</span> : null}
      </span>
      {children}
    </label>
  );
}
