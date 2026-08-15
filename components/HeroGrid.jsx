"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_IMAGES, HERO_POOL } from "@/data/content";

// 2x2 cinematic hero grid. Each tile cycles through different photos every 3.5s.
export default function HeroGrid() {
  const [indices, setIndices] = useState([0, 1, 2, 3]); // current index in HERO_POOL for each tile

  useEffect(() => {
    const tiles = [
      { delay: 0,    every: 3500 },
      { delay: 900,  every: 3500 },
      { delay: 1800, every: 3500 },
      { delay: 2600, every: 3500 },
    ];
    const timers = [];
    tiles.forEach((t, i) => {
      const start = setTimeout(() => {
        const id = setInterval(() => {
          setIndices((prev) => {
            const next = [...prev];
            let n = (next[i] + 1 + Math.floor(Math.random() * 2)) % HERO_POOL.length;
            if (next.includes(n)) n = (n + 1) % HERO_POOL.length;
            next[i] = n;
            return next;
          });
        }, t.every);
        timers.push(id);
      }, t.delay);
      timers.push(start);
    });
    return () => timers.forEach((id) => clearInterval(id) || clearTimeout(id));
  }, []);

  return (
    <div
      data-testid="hero-grid"
      className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3"
    >
      {indices.map((imgIdx, tileIdx) => {
        const src = HERO_POOL[imgIdx % HERO_POOL.length] || HERO_IMAGES[tileIdx];
        return (
          <motion.div
            key={tileIdx}
            data-testid={`hero-tile-${tileIdx}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: tileIdx * 0.18, ease: [0.22, 0.61, 0.36, 1] }}
            className="hero-card grain"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={src}
                src={src}
                alt={`Lakshitography frame ${tileIdx + 1}`}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 1.3, ease: "easeOut" }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        );
      })}
    </div>
  );
}
