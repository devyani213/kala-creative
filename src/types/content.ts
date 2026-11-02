export type ProjectCategory = 'Branding' | 'Packaging' | 'Spatial' | 'Editorial' | 'Digital';

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
  deliverables?: string[];
  metrics: { label: string; value: string }[];
  quote: { text: string; author: string; role: string };
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  timeline: string;
  proof: { project: string; outcome: string };
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  photo: string;
  project?: string;
  rating?: number;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio?: string;
}

export interface JournalEntry {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author?: string;
  content?: string[];
}

export interface PricingTier {
  name: string;
  positioning: string;
  description: string;
  priceEstimate?: string;
  duration?: string;
  includes: string[];
  engagement: string;
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface StudioMilestone {
  year: string;
  title: string;
  description: string;
}

export interface ClientPortalProject {
  id: string;
  clientName: string;
  code: string;
  brandName: string;
  phase: string;
  completion: number;
  leadPartner: string;
  targetLaunch: string;
  deliverablesCount: number;
  assets: {
    name: string;
    type: string;
    size: string;
    status: 'Ready' | 'In Review' | 'Draft';
  }[];
  recentUpdates: {
    date: string;
    title: string;
    detail: string;
  }[];
}
