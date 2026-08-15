"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Image as ImageIcon, Users, Film } from "lucide-react";
import { SERVICES } from "@/data/content";

export default function Services() {
  return (
    <div data-testid="page-services" className="bg-bg min-h-screen pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="eyebrow mb-6">Services</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-display text-text-primary leading-[1.05]">
            Sessions designed to <span className="italic text-gold">feel slow</span>.
          </h1>
          <p className="mt-6 text-text-secondary text-base lg:text-lg leading-relaxed">
            Transparent pricing, modest groups, and a finishing process that takes its time. Every session includes a
            pre-shoot call to talk through your day.
          </p>
        </motion.div>

        <div className="mt-20 grid md:grid-cols-2 gap-8 lg:gap-10">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.slug}
              data-testid={`service-card-${s.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
              className="group bg-surface border border-faint overflow-hidden hover:border-gold/40 transition-colors duration-500"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={s.image} alt={s.name}
                  className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
              </div>
              <div className="p-8 lg:p-10">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h3 className="font-serif-display text-3xl text-text-primary leading-tight">{s.name}</h3>
                  <p className="font-serif-display italic text-2xl text-gold">{s.price}</p>
                </div>
                <p className="mt-4 text-text-secondary leading-relaxed">{s.blurb}</p>

                <div className="mt-8 grid grid-cols-2 gap-y-5 gap-x-4 border-t border-faint pt-6">
                  <Detail icon={Clock}      label="Duration"   value={s.duration} />
                  <Detail icon={ImageIcon}  label="Delivery"   value={s.photos} />
                  <Detail icon={Users}      label="Group size" value={s.people} />
                  <Detail icon={Film}       label="Add-on"     value={s.addOn} />
                </div>

                <Link
                  href={`/contact?service=${s.slug}`}
                  data-testid={`book-${s.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm tracking-eyebrow uppercase text-gold hover:text-text-primary transition-colors"
                >
                  Book this session <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-24 border border-faint p-10 lg:p-14 bg-surface">
          <p className="eyebrow mb-4">A note on pricing</p>
          <p className="font-serif-display italic text-2xl lg:text-3xl text-beige max-w-3xl leading-snug">
            Prices vary based on location and travel. I keep brackets tight so you always know what to expect — no
            surprises, no upsells.
          </p>
        </div>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="text-gold mt-1 shrink-0" />
      <div>
        <p className="text-xs tracking-eyebrow uppercase text-text-secondary">{label}</p>
        <p className="text-sm text-text-primary mt-1 leading-snug">{value}</p>
      </div>
    </div>
  );
}
