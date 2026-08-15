"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { CATEGORIES } from "@/data/content";
import { api } from "@/lib/api";

export default function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  useEffect(() => {
    api.get("/gallery").then((response) => setUploadedPhotos(response.data)).catch(() => {
      // The curated gallery remains visible if the database is temporarily unavailable.
    });
  }, []);

  const gallery = useMemo(() => [...uploadedPhotos], [uploadedPhotos]);

  const items = useMemo(
    () => (active === "All" ? gallery : gallery.filter((g) => g.category === active)),
    [active, gallery]
  );

  return (
    <div data-testid="page-gallery" className="bg-bg min-h-screen pt-32 pb-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">Gallery</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-light tracking-display text-text-primary leading-[1.05]">
            A handful of <span className="italic text-gold">quiet</span> frames.
          </h1>
          <p className="mt-6 text-text-secondary text-base lg:text-lg leading-relaxed">
            Stories from the past year — pieced together from afternoons, kitchens, terraces, and tea-cup tables.
          </p>
        </div>

        {/* Category filters */}
        <div data-testid="gallery-filters" className="mt-12 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              data-testid={`filter-${c.toLowerCase()}`}
              onClick={() => setActive(c)}
              className={`px-5 py-2 text-xs tracking-eyebrow uppercase border transition-all duration-300 ${
                active === c
                  ? "bg-gold text-[#0a0a0a] border-gold"
                  : "border-white/15 text-text-secondary hover:border-gold hover:text-gold"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4"
        >
          <AnimatePresence>
            {items.map((g, i) => (
              <motion.div
                key={g.url}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: (i % 8) * 0.04 }}
                onClick={() => setLightbox(g)}
                data-testid={`gallery-item-${i}`}
                className={`gallery-tile aspect-[4/5] bg-surface border border-faint ${
                  i % 5 === 0 ? "row-span-2 aspect-[4/6]" : ""
                }`}
              >
                <img src={g.url} alt={g.category} className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 z-10 text-xs tracking-eyebrow uppercase text-beige opacity-0 group-hover:opacity-100">
                  {g.category}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            data-testid="gallery-lightbox"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              data-testid="lightbox-close"
              className="absolute top-6 right-6 text-text-primary"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              key={lightbox.url}
              initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.98, opacity: 0 }}
              src={lightbox.url}
              alt={lightbox.category}
              className="max-h-[88vh] max-w-[92vw] object-contain border border-white/10"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
