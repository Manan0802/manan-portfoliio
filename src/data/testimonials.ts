export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote: "Manan delivered an AI data pipeline that processed our entire catalog — 17,000+ categories — with 98% accuracy. The system he built would have taken our team months manually. Exceptional engineering thinking.",
    author: "Senior Category Manager",
    role: "IndiaMART InterMESH",
  },
  {
    quote: "Working with Manan on InvestMate was seamless. He integrated Gemini AI recommendations that genuinely improved how we understand our portfolios. Rare to find someone who bridges AI and product so effortlessly.",
    author: "Early User",
    role: "InvestMate Platform",
  },
];
