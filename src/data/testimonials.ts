export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Manan delivered an AI data pipeline that processed our entire catalog — 17,000+ categories — with 98% accuracy. The system he built would have taken our team months manually. Exceptional engineering thinking.",
    author: "Senior Category Manager",
    role: "Enterprise E-Commerce Platform",
    rating: 5,
  },
  {
    quote: "Working with Manan on InvestMate was seamless. He integrated Gemini AI recommendations that genuinely improved how we understand our portfolios. Rare to find someone who bridges AI and product so effortlessly.",
    author: "Early User & Beta Tester",
    role: "InvestMate Platform",
    rating: 5,
  },
  {
    quote: "The NeoFin PWA he built is incredible — voice commands to track expenses, automatic subscription detection, and it works offline flawlessly. This is production-grade engineering from a college student. Unreal.",
    author: "Finance Enthusiast",
    role: "NeoFin User",
    rating: 5,
  },
  {
    quote: "Manan's ShopLens project blew my mind. CLIP embeddings + FAISS for fashion search? Over 40k items indexed with sub-second retrieval. The outfit recommendation engine alone is worth a startup.",
    author: "ML Research Peer",
    role: "Delhi Technological University",
    rating: 5,
  },
];
