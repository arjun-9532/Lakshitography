// Real Lakshitography images (5 client-shot photos) + a few stock fillers for
// categories not yet represented. Swap the stock ones when more real work arrives.

const REAL = {
  wedding_bride: "https://customer-assets.emergentagent.com/job_moments-home/artifacts/asow04c1_DSC03405.ARW.jpg",
  kids_two_girls: "https://customer-assets.emergentagent.com/job_moments-home/artifacts/28jggwuz_DSC00237.jpg",
  kid_pink_tutu: "https://customer-assets.emergentagent.com/job_moments-home/artifacts/e231pwru_DSC00275.jpg",
  baby_boy_party: "https://customer-assets.emergentagent.com/job_moments-home/artifacts/777br5s9_DSC00005.jpg",
  kids_celebration: "https://customer-assets.emergentagent.com/job_moments-home/artifacts/ndqimdo2_IMG_20251220_231929.jpg",
};

export const SERVICES = [
  {
    slug: "couple-lifestyle",
    name: "Couple Lifestyle Shoot",
    duration: "60–90 mins",
    photos: "20–30 edited photos",
    price: "₹6,500 – ₹9,500",
    people: "Just the two of you",
    addOn: "Optional 30-sec reel add-on",
    blurb:
      "Slow mornings, soft sunlight, quiet glances. A relaxed walk-through of the way you two actually exist together.",
    image: REAL.wedding_bride,
  },
  {
    slug: "family-portraits",
    name: "Family Portraits",
    duration: "75–120 mins",
    photos: "30–45 edited photos",
    price: "₹8,500 – ₹12,500",
    people: "Small families (up to 6)",
    addOn: "Optional family video story",
    blurb:
      "Real laughter, real chaos, the kind of family photos you'll actually frame — not the stiff studio kind.",
    image: REAL.wedding_bride,
  },
  {
    slug: "kids-birthday",
    name: "Kids' Birthday at Home",
    duration: "2–3 hours",
    photos: "40–60 edited photos",
    price: "₹9,500 – ₹14,000",
    people: "Up to 25 close guests",
    addOn: "Highlight reel add-on",
    blurb:
      "Tiny hands on cake, the candle moment, that one cousin crying — birthdays exactly as they happen.",
    image: REAL.kid_pink_tutu,
  },
  {
    slug: "anniversary",
    name: "Intimate Anniversary",
    duration: "90–120 mins",
    photos: "30–40 edited photos",
    price: "₹8,000 – ₹11,500",
    people: "Couple + close family",
    addOn: "Optional cinematic clip",
    blurb:
      "A return to where it began, or simply the home you've built. Quiet, romantic, unhurried.",
    image: REAL.wedding_bride,
  },
  {
    slug: "kitty-gathering",
    name: "Kitty Party / Close Gathering",
    duration: "2 hours",
    photos: "35–50 edited photos",
    price: "₹7,500 – ₹10,500",
    people: "Up to 15 friends",
    addOn: "Group portrait set",
    blurb:
      "The afternoon stretches. Tea, laughter, gossip — captured without interrupting a single moment.",
    image: REAL.wedding_bride,
  },
];

// Hero grid (2x2) — mix of real signature shots + warm stock for missing categories
export const HERO_IMAGES = [
  REAL.wedding_bride,
  REAL.kid_pink_tutu,
  REAL.baby_boy_party,
  REAL.kids_two_girls,
  REAL.kids_celebration,
  REAL.married_couple,
  REAL.bride_entering,
  REAL.birthday_family,
];

export const HERO_POOL = [
  REAL.wedding_bride,
  REAL.kid_pink_tutu,
  REAL.baby_boy_party,
  REAL.kids_two_girls,
  REAL.kids_celebration,
  REAL.married_couple,
  REAL.bride_entering,
  REAL.birthday_family,

];

export const DEFAULT_GALLERY_CATEGORIES = ["Couples", "Families", "Kids", "Anniversary", "Gatherings"];
export const CATEGORIES = ["All", ...DEFAULT_GALLERY_CATEGORIES];

export const WHATSAPP_NUMBER = "919794747454";
