import type {
  ClientPortalProject,
  FAQItem,
  JournalEntry,
  PricingTier,
  Service,
  StudioMilestone,
  TeamMember,
  Testimonial
} from '../types/content';

export const heroMedia = {
  heroVideoSrc: '',
  heroPoster: '/fbfcfef3-f775-4015-af50-1f058c192015.jpg'
};

export const studioImages = {
  founder: '/33c4b21e-2756-44fc-87c9-0b5d882e774f.jpg',
  studioWide: '/29f8b55c-cac8-4bb0-9e8e-b68325dea54f.jpg',
  studioDetail: '/950858f6-5bb8-4eb2-9083-88a17da820ed.jpg',
  reception: '/b927e5fb-31d6-4afe-8ee1-f1c3901d6dfd.jpg'
};

export const navigation = [
  { label: 'Work', to: '/portfolio' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Journal', to: '/journal' }
];

export const brandStatement = {
  line: 'We don’t just design. We craft experiences.',
  support:
    'Kala Creative is an independent studio in Kalyani Nagar, Pune. We partner with founders and heritage houses who value restraint over noise. Identity, packaging, space and screen — held to one unrelenting standard.'
};

export const services: Service[] = [
  {
    id: 'identity',
    title: 'Brand Identity & Strategy',
    description:
      'The mark, the typographic voice, the custom palette, and the comprehensive system that keep them coherent across every customer touchpoint.',
    timeline: '6–10 weeks',
    deliverables: [
      'Strategic positioning & brand ethos',
      'Primary & secondary logotypes',
      'Bespoke typography & custom Devanagari marks',
      'Pantone & digital colour harmony',
      'Comprehensive brand guidelines vault (PDF + Tokens)'
    ],
    proof: { project: 'Aranya House', outcome: 'Eleven stores brought under one voice in fourteen weeks.' }
  },
  {
    id: 'packaging',
    title: 'Packaging & Print Craft',
    description:
      'Structural design, material textures, and finishes developed together, specified down to millimeter tolerance, and proofed on press with us in the room.',
    timeline: '8–12 weeks',
    deliverables: [
      'Custom box and vessel structural die-lines',
      'Uncoated paper & foil-stamping specification',
      'Secondary packaging and retail display units',
      'Regulatory compliance & multilingual layout',
      'On-site offset & screen press supervision'
    ],
    proof: { project: 'Noor Apothecary', outcome: 'Retail sell-through up 64% in a single quarter.' }
  },
  {
    id: 'spatial',
    title: 'Spatial & Retail Environment',
    description:
      'Translating brand DNA into three physical dimensions — the rhythm of arrival, warm lighting temperatures, tactile materials, and intuitive wayfinding.',
    timeline: '10–16 weeks',
    deliverables: [
      'Store layout & customer journey mapping',
      'Custom architectural signage & brass wayfinding',
      'Display fixture detailing & materiality curation',
      'Acoustic & lighting ambience guidelines',
      'Contractor supervision & spatial art direction'
    ],
    proof: { project: 'Sona Flagship', outcome: 'Dwell time up 2.4x; private salon generates majority of high-value sales.' }
  },
  {
    id: 'digital',
    title: 'Digital Experience & Commerce',
    description:
      'Flagship digital flagship sites and applications that feel like the brand they belong to — quiet, editorial, fast, and engineered to convert with elegance.',
    timeline: '8–14 weeks',
    deliverables: [
      'Interactive architecture & editorial wireframes',
      'Responsive design system & component token vault',
      'Fluid micro-interactions & bespoke motion direction',
      'Headless CMS or Shopify Plus architecture',
      'Front-end performance audits (<1s load times)'
    ],
    proof: { project: 'Vayu', outcome: 'Weekly active use up 112%, customer support setup tickets down 57%.' }
  }
];

export const processSteps = [
  {
    step: 'Discover',
    duration: 'Weeks 1–2',
    description:
      'We sit with your leadership, examine your category, and study the customer’s hesitation. Every successful decision is downstream of this groundwork.'
  },
  {
    step: 'Design',
    duration: 'Weeks 3–8',
    description:
      'Two clear creative directions, pushed far enough to be evaluated under real-world conditions. One is chosen, then perfected until every element has purpose.'
  },
  {
    step: 'Deliver',
    duration: 'Weeks 9–12',
    description:
      'Artwork, guidelines, vector masters, and production files — handed over with an interactive working session, not a dump of raw files.'
  },
  {
    step: 'Support',
    duration: '12 Months',
    description:
      'Retained design partnership throughout the following year to preserve system integrity as your internal teams ship new initiatives.'
  }
];

export const impactStats = [
  { value: 150, suffix: '+', label: 'Projects delivered' },
  { value: 50, suffix: '+', label: 'Brands partnered' },
  { value: 8, suffix: '+', label: 'Years of practice' },
  { value: 6, suffix: '', label: 'Design accolades' }
];

export const clients = [
  'ARANYA',
  'NOOR',
  'SONA',
  'BAITHAK',
  'VAYU',
  'MEHR',
  'INDIGO CO.',
  'TATVA'
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'They found the thread that was already in the cloth. Nothing feels invented — it feels remembered. Our brand finally looks like what we spent 80 years building.',
    author: 'Meera Raghunathan',
    role: 'Managing Director, Aranya House',
    photo: '/9a24fe47-aa08-48ca-8aeb-e774dcf4f504.jpg',
    project: 'Aranya House Rebrand',
    rating: 5
  },
  {
    quote:
      'Our retail buyers stopped negotiating discounts and started asking for prime shelf space. The matte charcoal packaging made our bottles undeniable.',
    author: 'Ishaan Kapoor',
    role: 'Founder, Noor Apothecary',
    photo: '/926c2420-f631-46e0-a8e1-29e8c0353e2c.jpg',
    project: 'Noor Packaging System',
    rating: 5
  },
  {
    quote:
      'Customers walk slower through our flagship now. The sequence of rooms and the quiet brass details turned retail browsing into an unhurried luxury ritual.',
    author: 'Rohit Sanghvi',
    role: 'Director, Sona Jewels',
    photo: '/7de094ac-de27-4c3d-890b-d11e0969106e.jpg',
    project: 'Sona Flagship Architecture',
    rating: 5
  }
];

export const team: TeamMember[] = [
  {
    name: 'Arjun Kala',
    role: 'Founder & Creative Director',
    photo: '/33c4b21e-2756-44fc-87c9-0b5d882e774f.jpg',
    bio: 'Educated at NID Ahmedabad. Spent 14 years shaping luxury identities across Mumbai and London before founding Kala Creative in 2018.'
  },
  {
    name: 'Priya Deshmukh',
    role: 'Design Director, Identity',
    photo: '/9a24fe47-aa08-48ca-8aeb-e774dcf4f504.jpg',
    bio: 'Specialist in multilingual typography and cultural semiotics. Leads identity architecture and design system governance.'
  },
  {
    name: 'Kabir Rao',
    role: 'Lead, Packaging & Print Craft',
    photo: '/926c2420-f631-46e0-a8e1-29e8c0353e2c.jpg',
    bio: 'Trained master printer and structural engineer. Spends half his week directly on press floors supervising finishes and tooling.'
  },
  {
    name: 'Nandita Iyer',
    role: 'Lead, Digital & Motion',
    photo: '/7de094ac-de27-4c3d-890b-d11e0969106e.jpg',
    bio: 'Crafts fluid digital interactions where subtle motion carries brand emotional resonance without compromising speed.'
  }
];

export const pricingTiers: PricingTier[] = [
  {
    name: 'Starter Sprint',
    positioning: 'For a first, deliberate mark',
    priceEstimate: 'From ₹4,50,000',
    duration: '6–8 weeks',
    description:
      'A focused engagement for founders launching with clear intent — one core identity system, applied to the primary surfaces that establish credibility.',
    includes: [
      'Brand positioning & naming alignment workshop',
      'Primary wordmark, symbol & Devanagari mark',
      'Custom typography hierarchy & colour palette',
      'Core launch collateral (packaging label / stationery / social)',
      'Digital brand guide vault & vector master files',
      '6 weeks direct creative director oversight'
    ],
    engagement: 'Best for pre-seed founders and launching boutique brands'
  },
  {
    name: 'Growth Signature',
    positioning: 'For a house finding its authoritative voice',
    priceEstimate: 'From ₹12,50,000',
    duration: '10–14 weeks',
    description:
      'Our most requested engagement. A comprehensive multi-surface transformation spanning full identity, packaging systems, and digital flagship.',
    includes: [
      'Comprehensive brand strategy & competitor audit',
      'Multi-touchpoint identity & design system',
      'Full packaging structural die-lines & press supervision',
      'Digital experience design (Figma systems + motion specs)',
      'Art direction guidelines for campaign photography',
      '12 months retained advisory & design continuity support'
    ],
    engagement: 'Best for established businesses repositioning or expanding nationally',
    featured: true
  },
  {
    name: 'Enterprise Flagship',
    positioning: 'For multi-brand groups with physical presence',
    priceEstimate: 'From ₹28,00,000',
    duration: '16–20 weeks',
    description:
      'Full-spectrum partnership with senior leadership embedded alongside your executive board to reshape group architecture, retail spaces, and global rollout.',
    includes: [
      'Group brand architecture & portfolio hierarchy',
      'Complete spatial & retail interior identity detailing',
      'Custom fixture design, brass wayfinding & ambient acoustics',
      'Omnichannel digital platform design system',
      'Full internal staff brand training workshops',
      'Dedicated partner liaison & priority studio queue'
    ],
    engagement: 'Best for luxury retailers, hospitality groups, and export houses'
  }
];

export const studioMilestones: StudioMilestone[] = [
  {
    year: '2018',
    title: 'Founded in Kalyani Nagar',
    description: 'Arjun Kala establishes the studio with a single bench, focusing on tactile print and bespoke Devanagari typography.'
  },
  {
    year: '2020',
    title: 'The Noor Apothecary Breakthrough',
    description: 'Our packaging for Noor wins CII Design Excellence and redefines modern Indian apothecary aesthetics in retail.'
  },
  {
    year: '2022',
    title: 'Expansion into Spatial Design',
    description: 'We complete the 3,100 sq ft Sona Flagship in Mumbai, proving our graphic discipline translates seamlessly into physical architecture.'
  },
  {
    year: '2024',
    title: 'The Baithak Review Launch',
    description: 'Co-founding an independent quarterly journal exploring South Asian visual culture and printing technique.'
  },
  {
    year: 'Present',
    title: 'Eleven Craftsmen, One Standard',
    description: 'Operating on a selective intake of maximum 6 major brand transformations per calendar year.'
  }
];

export const faqs: FAQItem[] = [
  {
    category: 'Process & Timeline',
    question: 'How long does a full brand identity engagement take?',
    answer:
      'A focused identity sprint takes 6 to 8 weeks. Larger transformations involving physical packaging, spatial architecture, or high-performance digital commerce typically span 10 to 14 weeks. We provide clear milestone calendars at kickoff.'
  },
  {
    category: 'Engagement & Geography',
    question: 'Do you collaborate with clients outside Pune and India?',
    answer:
      'Yes. Over 40% of our partners are based in Mumbai, Delhi, Bengaluru, London, Dubai, and Singapore. We run seamless remote workshops and travel on-site for crucial milestones such as press checks, material sourcing, and store openings.'
  },
  {
    category: 'Intellectual Property',
    question: 'Who owns the final intellectual property and source assets?',
    answer:
      'Upon final settlement, full unencumbered global intellectual property rights to all final chosen marks, vectors, packaging templates, and code assets transfer entirely to your entity. We deliver all open vector masters and production files.'
  },
  {
    category: 'Production Supervision',
    question: 'What do you mean by "on press supervision"?',
    answer:
      'We do not simply email PDFs to your vendor. Our packaging lead travels directly to the offset printing facility to calibrate ink densities, check foil registration, approve paper drawdowns, and sign off the first printed sheet in person.'
  },
  {
    category: 'Pricing & Terms',
    question: 'How are payments structured throughout the project?',
    answer:
      'All engagements are fixed-fee with no hourly surprises. Invoices are divided into three equal milestones: 40% upon signing and project inception, 30% upon approval of the creative direction, and 30% upon final delivery and file handover.'
  }
];

export const journalEntries: JournalEntry[] = [
  {
    slug: 'the-case-against-more',
    title: 'The case against more',
    author: 'Arjun Kala',
    excerpt:
      'Every brand we inherit arrives carrying too much. The work is almost never addition — it is deciding what earns the right to stay.',
    category: 'Craft & Philosophy',
    date: 'July 2026',
    readTime: '6 min read',
    image: '/64b42efa-e9d7-4d68-88a8-b1752e78f79d.jpg',
    content: [
      'When a founder brings their brand to the studio, they almost always believe they lack something. A new visual sub-language, three new gradient variations, a secondary seal, or a mascot that can speak on social channels.',
      'In eight years of practice, we have never once seen an identity suffering from a shortage of visual elements. What brands suffer from, almost without exception, is an accumulation of compromises.',
      'Every time a marketing team changes direction, an element gets bolted on. When sales feels a presentation looks dry, a badge is added. When legal flags a compliance note, a clumsy ribbon is wrapped across the header. Over five years, an identity resembles not an intentional house, but an unplanned settlement.',
      'Restraint is difficult because it leaves nowhere to hide. When you strip an identity down to a single bespoke serif, one drawn Devanagari consonant, and forty millimetres of unprinted cotton paper, every single curve must be faultless.',
      'Our first rule in the studio is this: we do not add until we have removed everything that does not defend itself. Luxury is not loud ornamentation; luxury is the quiet confidence of knowing exactly what to leave out.'
    ]
  },
  {
    slug: 'what-paper-remembers',
    title: 'What paper remembers',
    author: 'Kabir Rao',
    excerpt:
      'A note on why we still proof on press, and what an uncoated 350gsm stock will tell you that a calibrated screen never can.',
    category: 'Print & Materiality',
    date: 'May 2026',
    readTime: '8 min read',
    image: '/c46f26e4-caf1-4222-8b10-bfdee4f9da36.jpg',
    content: [
      'It is 3:00 AM in a press room outside Bhiwandi. The Heidelberg six-colour press is running at ten thousand impressions an hour, and the smell of vegetable oil ink, solvent, and warm pulp fills the warehouse.',
      'A high-resolution display running P3 wide colour gamut is an extraordinary tool for ideation. But light transmitted through glass behaves fundamentally differently from ambient light reflecting off long-grain cotton fibres.',
      'On screen, an ink layer is frictionless and uniform. On uncoated paper, ink soaks into the grain. The paper drinks the binder. An offset black that looked sharp on an iPad becomes a warm, velvety charcoal with character. If you do not account for dot gain and absorbency, your precise typography turns muddy.',
      'This is why no project leaves Kala Creative without physical press supervision. We inspect the wet ink drawdowns under 5000K daylight simulation lamps. We feel the deboss depth with the pad of our thumb.',
      'When your customer unboxes your product in quiet morning light, their eye does not inspect pixels. Their fingers register density, tooth, friction, and weight. The physical world has memory.'
    ]
  },
  {
    slug: 'designing-for-the-second-glance',
    title: 'Designing for the second glance',
    author: 'Priya Deshmukh',
    excerpt:
      'True luxury is rarely loud at two metres. It is what reveals itself when someone finally picks the object up and turns it over.',
    category: 'Perspective',
    date: 'March 2026',
    readTime: '5 min read',
    image: '/950858f6-5bb8-4eb2-9083-88a17da820ed.jpg',
    content: [
      'The modern internet is calibrated for the zero-second glance. Giant neon typography, hyperactive motion, saturated badges screaming for thirty milliseconds of algorithmic attention.',
      'Yet the objects and houses that endure operate on a completely different rhythm: the second glance.',
      'The second glance is the small gilded coordinate blind-debossed on the inside lid of a box. It is the subtle brass peg holding a spatial shelf that was turned on a local lathe. It is the ligature between two Devanagari glyphs that only a calligrapher would notice, yet imparts an unspoken feeling of balance to someone who cannot read the script.',
      'When you design exclusively for the initial thumbnail, you build disposable novelty. When you design for the person who will live with the object for three years, you invest in tactile durability.',
      'Give people something quiet to discover. That is the moment a customer converts from an accidental purchaser into an advocate.'
    ]
  }
];

export const demoClientProject: ClientPortalProject = {
  id: 'PRJ-2026-ARANYA',
  clientName: 'Meera Raghunathan',
  brandName: 'Aranya House Heritage Rebrand',
  code: 'KALA-AH-09',
  phase: 'Phase 3: Rollout & Press Proofing',
  completion: 78,
  leadPartner: 'Arjun Kala & Kabir Rao',
  targetLaunch: 'November 28, 2026',
  deliverablesCount: 18,
  assets: [
    { name: 'Aranya_Master_Identity_System_v2.4.pdf', type: 'PDF Guidelines', size: '42.8 MB', status: 'Ready' },
    { name: 'Aranya_Vector_Marks_Master_Pack.zip', type: 'Vector (AI, EPS, SVG)', size: '14.2 MB', status: 'Ready' },
    { name: 'Retail_Packaging_Dielines_Boxes_AtoF.dxf', type: 'Packaging CAD', size: '28.5 MB', status: 'In Review' },
    { name: 'Brass_Signage_Specifications_Kalyani.dwg', type: 'Spatial Specs', size: '18.1 MB', status: 'Ready' },
    { name: 'Bespoke_Loom_Monogram_Devanagari.otf', type: 'Typeface Master', size: '1.4 MB', status: 'Ready' }
  ],
  recentUpdates: [
    {
      date: 'Today, 11:30 AM',
      title: 'Offset proofs approved for Pune flagship packaging',
      detail: 'Kabir approved the 350gsm G.F Smith Colorplan unbleached cotton stock run. First batch shipping to central warehouse.'
    },
    {
      date: 'Yesterday, 4:15 PM',
      title: 'Digital guidelines portal tokens updated',
      detail: 'Added primary CSS/Tailwind variables and mobile navigation assets for the Shopify Plus engineering team.'
    },
    {
      date: 'Oct 29, 2026',
      title: 'Spatial brass wayfinding mockup delivered',
      detail: 'Physical 1:1 brass prototype inspected at the Kalyani Nagar studio with Meera.'
    }
  ]
};

export const contactDetails = {
  email: 'studio@kalacreative.in',
  phone: '+91 98220 41100',
  locationBadge: 'Kalyani Nagar, Pune — by appointment',
  address: 'Studio 4B, The Heritage Arcade, Kalyani Nagar, Pune 411006, Maharashtra, India',
  hours: 'Mon–Fri, 10:00–19:00 IST',
  bookingLabel: 'Book a Discovery Call',
  bookingHref: 'https://calendly.com/',
  whatsappHref: 'https://wa.me/919822041100?text=Hello%20Kala%20Creative%2C%20I%20would%20like%20to%20discuss%20a%20project.',
  budgetRanges: [
    '₹4.5L – ₹10L (Starter Sprint)',
    '₹10L – ₹25L (Growth Signature)',
    '₹25L – ₹50L (Enterprise Flagship)',
    'Above ₹50L (Full Group Programme)',
    'To be determined during discovery'
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'Behance', href: 'https://behance.net/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' }
  ]
};
