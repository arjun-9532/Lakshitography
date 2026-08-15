"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, Cake, Sparkles, Coffee, Slash, Camera, Sun } from "lucide-react";
import HeroGrid from "@/components/HeroGrid";
import { SERVICES } from "@/data/content";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] },
  }),
};

const ICONS = {
  "couple-lifestyle": Heart,
  "family-portraits": Users,
  "kids-birthday": Cake,
  "anniversary": Sparkles,
  "kitty-gathering": Coffee,
};

export default function Home() {
  return (
    <div data-testid="page-home" className="bg-bg">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0b0907] to-[#0a0a0a]" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Title */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            data-testid="hero-content"
            className="order-2 lg:order-1"
          >
            <motion.p variants={fadeUp} custom={0} className="eyebrow mb-8">
              Slow · Intimate · Photography
            </motion.p>

            <motion.h1
              variants={fadeUp} custom={1}
              className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-display text-text-primary leading-[1.02]"
            >
              Lakshit<span className="italic text-gold">ography</span>
            </motion.h1>

            <motion.p
              variants={fadeUp} custom={2}
              className="mt-8 max-w-md font-serif-display italic text-2xl sm:text-3xl text-beige leading-snug"
            >
              Capturing moments that feel like home.
            </motion.p>

            <motion.p
              variants={fadeUp} custom={3}
              className="mt-6 max-w-md text-text-secondary text-base leading-relaxed"
            >
              I photograph couples, small families, and the quiet gatherings in
              between — without staging, without rush.
            </motion.p>

            <motion.div variants={fadeUp} custom={4} className="mt-10 flex flex-wrap gap-4">
              <Link href="/services" data-testid="hero-cta-services" className="btn-ghost">
                View Services <ArrowRight size={14} />
              </Link>
              <Link href="/contact" data-testid="hero-cta-book" className="btn-primary">
                Book a Session <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={5} className="mt-14 flex items-center gap-6">
              <div className="divider-line w-16" />
              <p className="text-xs tracking-eyebrow uppercase text-text-secondary">Based in India · Available pan-India</p>
            </motion.div>
          </motion.div>

          {/* Right: 2x2 grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
            className="order-1 lg:order-2 relative aspect-square w-full max-w-[640px] mx-auto"
          >
            <HeroGrid />
            <div className="absolute -inset-px pointer-events-none border border-white/5" />
          </motion.div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section data-testid="section-what-i-do" className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-1">
              <p className="eyebrow mb-5">01 — What I Do</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-display text-text-primary leading-[1.05]">
                Warm,&nbsp;human, <br /> <span className="italic text-gold">unhurried</span> photography.
              </h2>
            </div>
            <div className="lg:col-span-2 flex items-end">
              <p className="text-text-secondary text-base lg:text-lg max-w-2xl leading-relaxed">
                Five things I love photographing more than anything. All shot at home, in cafés, at small venues —
                wherever you feel most like yourselves.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.slug] || Camera;
              return (
                <motion.div
                  key={s.slug}
                  data-testid={`what-i-do-card-${s.slug}`}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={fadeUp}
                  custom={i}
                  className="group relative bg-surface border border-faint overflow-hidden"
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img src={s.image} alt={s.name}
                      className="w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                    <div className="absolute top-5 left-5 w-10 h-10 rounded-full bg-[#050505]/70 backdrop-blur-md border border-white/10 flex items-center justify-center">
                      <Icon size={16} className="text-gold" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif-display text-2xl text-text-primary leading-tight">{s.name}</h3>
                    <p className="mt-2 text-text-secondary text-sm leading-relaxed line-clamp-2">{s.blurb}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT I DON'T DO */}
      <section data-testid="section-what-i-dont-do" className="relative py-24 lg:py-32 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://customer-assets.emergentagent.com/job_moments-home/artifacts/777br5s9_DSC00005.jpg"
            alt=""
            className="w-full h-full object-cover opacity-15 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/85 to-[#050505]" />
        </div>

        <div className="max-w-5xl mx-auto">
          <p className="eyebrow mb-5" style={{ color: "var(--accent)" }}>02 — A gentle filter</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-display text-text-primary leading-[1.05]">
            What I <span className="italic" style={{ color: "var(--warning-muted)" }}>don't</span> do.
          </h2>
          <p className="mt-6 text-text-secondary max-w-2xl text-base lg:text-lg leading-relaxed">
            Honesty before booking. These aren't things I'm bad at — they just aren't the kind of work I want to make.
          </p>

          <div className="mt-14 space-y-6">
            {[
              { t: "Large-scale weddings as the main photographer", d: "Big wedding days deserve a team built for them. I'm happy to shoot intimate pre/post events instead." },
              { t: "Heavily staged or directed shoots", d: "If a moment needs choreography to exist, it isn't yours yet." },
              { t: "High-pressure, run-of-show event coverage", d: "I work slowly. I miss the chaos on purpose, and chase the quiet in between." },
            ].map((it, i) => (
              <motion.div
                key={it.t}
                initial="hidden" whileInView="show" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                data-testid={`dont-do-item-${i}`}
                className="flex items-start gap-6 border-l-2 pl-6 py-2"
                style={{ borderColor: "var(--warning-muted)" }}
              >
                <Slash size={20} className="mt-1 shrink-0" style={{ color: "var(--warning-muted)" }} />
                <div>
                  <h3 className="font-serif-display text-2xl text-text-primary leading-tight">{it.t}</h3>
                  <p className="mt-2 text-text-secondary text-sm lg:text-base leading-relaxed max-w-2xl">{it.d}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-14 max-w-2xl">
            <p className="font-serif-display italic text-2xl text-beige leading-snug">
              "I focus on calm, meaningful moments — the kind that don't shout for attention."
            </p>
          </div>
        </div>
      </section>

      {/* MY APPROACH */}
      <section data-testid="section-my-approach" className="py-24 lg:py-32 px-6 lg:px-12 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 mb-16">
            <div>
              <p className="eyebrow mb-5">03 — My Approach</p>
              <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-display text-text-primary leading-[1.05]">
                How I <span className="italic text-gold">work</span> with you.
              </h2>
            </div>
            <div className="lg:col-span-2 flex items-end">
              <p className="text-text-secondary text-base lg:text-lg max-w-2xl leading-relaxed">
                Four small promises that shape every session. Nothing fancy — just a way of working that's gentle on you, and
                kind to the images.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-[#1a1a1a]">
            {[
              { n: "01", icon: Sun,      t: "Natural & candid", d: "I follow available light and real moments. The camera waits, it doesn't direct." },
              { n: "02", icon: Heart,    t: "Comfort first",    d: "Shy in front of cameras? Same. The first twenty minutes are just for warming up." },
              { n: "03", icon: Sparkles, t: "Small & intimate", d: "I keep groups small on purpose. Fewer people, deeper photographs." },
              { n: "04", icon: Camera,   t: "No chaos, no rush", d: "We build in slow time. You'll never feel like I'm chasing the next frame." },
            ].map((b, i) => {
              const I = b.icon;
              return (
                <motion.div
                  key={b.n}
                  initial="hidden" whileInView="show" viewport={{ once: true }}
                  variants={fadeUp} custom={i}
                  data-testid={`approach-block-${i}`}
                  className="bg-bg p-10 lg:p-14 group hover:bg-surface-2 transition-colors duration-500"
                >
                  <div className="flex items-baseline justify-between mb-8">
                    <span className="font-serif-display text-5xl text-gold/40">{b.n}</span>
                    <I size={22} className="text-gold" />
                  </div>
                  <h3 className="font-serif-display text-3xl text-text-primary leading-tight">{b.t}</h3>
                  <p className="mt-4 text-text-secondary leading-relaxed">{b.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section data-testid="section-final-cta" className="relative py-32 lg:py-40 px-6 lg:px-12 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://customer-assets.emergentagent.com/job_moments-home/artifacts/asow04c1_DSC03405.ARW.jpg"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/95 via-[#050505]/85 to-[#050505]" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-8">Let's begin</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-light tracking-display text-text-primary leading-[1.08]">
            If your moments are <span className="italic text-gold">small</span> but&nbsp;meaningful, <br className="hidden sm:block"/>
            I'd love to capture them.
          </h2>
          <p className="mt-8 text-text-secondary max-w-xl mx-auto">
            Send me a note about your date, your people, and the feeling you'd like to remember.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/contact" data-testid="final-cta-book" className="btn-primary">
              Book Your Session <ArrowRight size={14} />
            </Link>
            <Link href="/gallery" data-testid="final-cta-gallery" className="btn-ghost">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
