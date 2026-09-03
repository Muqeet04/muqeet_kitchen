export interface ReviewItem {
  id: number;
  stars: string;
  quote: string;
  author: string;
  location: string;
  bg: string;
}

export interface ReviewAtmosphere {
  glow: string;
  cardBg: string;
  border: string;
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 0,
    stars: "★★★★★",
    quote: "“They left on Friday; we cooked for twelve on Saturday. It is undoubtedly the finest and warmest room in the house.”",
    author: "A. Richardson",
    location: "Surrey Estate Kitchen",
    bg: "#1A0A0E",
  },
  {
    id: 1,
    stars: "★★★★★",
    quote: "“Our fluted oak island has become the true centerpiece of our home. Exceptional bespoke craftsmanship from bench to fit.”",
    author: "Elena V.",
    location: "Chelsea Residence",
    bg: "#2C0E14",
  },
  {
    id: 2,
    stars: "★★★★★",
    quote: "“The five-day turnaround felt like magic. Uncompromising joinery, seamless stone joints, and absolutely zero mess left behind.”",
    author: "Shahzad D.",
    location: "Full Kitchen Renovation",
    bg: "#1A0A16",
  },
  {
    id: 3,
    stars: "★★★★★",
    quote: "“Every soft-close drawer and unlacquered brass tap was fitted with obsessive, artisan precision. A total masterclass.”",
    author: "Marcus & Claire T.",
    location: "Wimbledon Townhouse",
    bg: "#2E1310",
  },
  {
    id: 4,
    stars: "★★★★★",
    quote: "“No subcontractors, no excuses. Just dedicated master craftspeople who take genuine, uncompromising pride in their work.”",
    author: "Julian B.",
    location: "Kensington Pavilion",
    bg: "#140508",
  },
];

export const REVIEW_ATMOSPHERES: ReviewAtmosphere[] = [
  // Review 1: Heritage Shaker — Warm Brass & Terracotta glow
  {
    glow: "radial-gradient(circle at 50% 50%, rgba(234, 155, 118, 0.16) 0%, rgba(176, 67, 36, 0.05) 50%, transparent 70%)",
    cardBg: "rgba(38, 15, 20, 0.60)",
    border: "rgba(234, 155, 118, 0.18)",
  },
  // Review 2: Chelsea Fluted Oak — Warm Roasted Auburn glow
  {
    glow: "radial-gradient(circle at 50% 50%, rgba(210, 105, 70, 0.16) 0%, rgba(150, 50, 35, 0.05) 50%, transparent 70%)",
    cardBg: "rgba(42, 17, 23, 0.60)",
    border: "rgba(210, 105, 70, 0.18)",
  },
  // Review 3: Full Renovation — Smoked Mulberry & Charcoal glow
  {
    glow: "radial-gradient(circle at 50% 50%, rgba(185, 75, 90, 0.15) 0%, rgba(125, 40, 50, 0.05) 50%, transparent 70%)",
    cardBg: "rgba(36, 14, 22, 0.60)",
    border: "rgba(185, 75, 90, 0.18)",
  },
  // Review 4: Wimbledon Townhouse — Honey Amber Brass glow
  {
    glow: "radial-gradient(circle at 50% 50%, rgba(245, 170, 120, 0.17) 0%, rgba(185, 85, 50, 0.05) 50%, transparent 70%)",
    cardBg: "rgba(40, 18, 20, 0.60)",
    border: "rgba(245, 170, 120, 0.20)",
  },
  // Review 5: Kensington Pavilion — Midnight Burnished Copper glow
  {
    glow: "radial-gradient(circle at 50% 50%, rgba(200, 90, 60, 0.15) 0%, rgba(135, 45, 32, 0.05) 50%, transparent 70%)",
    cardBg: "rgba(34, 12, 16, 0.60)",
    border: "rgba(200, 90, 60, 0.18)",
  },
];
