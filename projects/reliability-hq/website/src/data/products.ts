export interface Product {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  currency: string;
  category: 'templates' | 'courses' | 'tools' | 'bundles';
  featured: boolean;
  features?: string[];
  whoIsItFor?: string[];
  whatsIncluded?: string[];
}

export const products: Product[] = [
  {
    slug: 'rcm-fmea-template-pack',
    name: 'RCM FMEA Template Pack',
    description: 'Complete FMEA worksheet set with decision logic. SAE JA1011 compliant.',
    longDescription: 'A comprehensive set of FMEA worksheets designed to guide you through every step of your RCM analysis. Built to SAE JA1011 standards, these templates ensure your analysis meets international requirements while remaining practical and easy to use.',
    price: 79,
    currency: 'GBP',
    category: 'templates',
    featured: true,
    features: [
      'SAE JA1011 compliant methodology',
      'Complete FMEA worksheet structure',
      'Decision logic trees included',
      'Guidance notes on every sheet',
      'Excel and Google Sheets formats',
      'Lifetime updates included',
    ],
    whoIsItFor: [
      'Reliability Engineers conducting RCM analysis',
      'Maintenance Managers implementing PM programs',
      'Consultants delivering RCM projects',
      'Plant Managers standardising maintenance strategies',
    ],
    whatsIncluded: [
      'FMEA Information Worksheet Template',
      'FMEA Decision Worksheet Template',
      'RCM Decision Diagram',
      'Quick Start Guide (PDF)',
      'Example completed analysis',
    ],
  },
  {
    slug: 'criticality-analysis-tool',
    name: 'Criticality Analysis Tool',
    description: 'Equipment criticality ranking calculator with customisable criteria.',
    longDescription: 'Prioritise your equipment with confidence. This criticality analysis tool helps you rank your assets based on safety, environmental, production, and cost impacts—so you know exactly where to focus your RCM efforts.',
    price: 49,
    currency: 'GBP',
    category: 'tools',
    featured: true,
    features: [
      'Customisable criticality criteria',
      'Weighted scoring system',
      'Visual ranking outputs',
      'Supports unlimited equipment',
      'Export to PDF and Excel',
      'Based on industry best practices',
    ],
    whoIsItFor: [
      'Reliability Engineers prioritising RCM studies',
      'Maintenance Planners allocating resources',
      'Asset Managers building maintenance strategies',
      'Engineering teams assessing equipment portfolios',
    ],
    whatsIncluded: [
      'Criticality Analysis Calculator (Excel)',
      'Customisation Guide',
      'Criteria Weighting Framework',
      'Sample completed analysis',
    ],
  },
  {
    slug: 'rcm-decision-diagram',
    name: 'RCM Decision Diagram Worksheet',
    description: 'Standard RCM decision logic tree with guidance notes.',
    longDescription: 'The heart of RCM task selection. This decision diagram follows the Moubray methodology precisely, guiding you through the logic of selecting appropriate maintenance tasks for each failure mode.',
    price: 29,
    currency: 'GBP',
    category: 'templates',
    featured: false,
    features: [
      'Moubray methodology compliant',
      'Clear decision flow structure',
      'Guidance notes at each decision point',
      'Printable A3 format',
      'Digital interactive version',
    ],
    whoIsItFor: [
      'RCM facilitators leading analysis sessions',
      'Reliability Engineers conducting task selection',
      'Teams learning RCM methodology',
    ],
    whatsIncluded: [
      'RCM Decision Diagram (PDF - A3 printable)',
      'Interactive Excel version',
      'Guidance document',
    ],
  },
  {
    slug: 'rcm-starter-bundle',
    name: 'RCM Starter Bundle',
    description: 'Everything you need to start your first RCM analysis. Templates, guides, and checklists.',
    longDescription: 'The complete package for teams starting their RCM journey. This bundle combines our most popular templates with practical guides and checklists—everything you need to conduct your first analysis professionally.',
    price: 149,
    currency: 'GBP',
    category: 'bundles',
    featured: true,
    features: [
      'All essential templates included',
      'Step-by-step implementation guide',
      'Facilitator checklists',
      'Save 30% vs buying separately',
      'Email support for 90 days',
      'Lifetime updates',
    ],
    whoIsItFor: [
      'Teams new to RCM methodology',
      'Plants implementing their first RCM program',
      'Consultants needing a complete toolkit',
      'Managers standardising reliability practices',
    ],
    whatsIncluded: [
      'RCM FMEA Template Pack',
      'Criticality Analysis Tool',
      'RCM Decision Diagram',
      'Implementation Guide (50+ pages)',
      'Facilitator Checklist',
      'Team Training Presentation',
    ],
  },
  {
    slug: 'pm-optimisation-template',
    name: 'PM Optimisation Template',
    description: 'Analyse and optimise your existing preventive maintenance tasks.',
    longDescription: 'Not starting from scratch? This template helps you review and optimise your existing PM program. Identify redundant tasks, optimise intervals, and eliminate value-destroying maintenance.',
    price: 59,
    currency: 'GBP',
    category: 'templates',
    featured: false,
    features: [
      'Task review framework',
      'Value analysis methodology',
      'Interval optimisation guidance',
      'Cost-benefit calculator',
      'Prioritisation matrix',
    ],
    whoIsItFor: [
      'Maintenance Managers reviewing PM programs',
      'Reliability Engineers optimising task lists',
      'Plants looking to reduce maintenance costs',
    ],
    whatsIncluded: [
      'PM Review Template (Excel)',
      'Optimisation Guide (PDF)',
      'Task Classification Framework',
      'Example optimisation report',
    ],
  },
  {
    slug: 'failure-mode-library',
    name: 'Failure Mode Library',
    description: 'Pre-built failure mode database for common industrial equipment.',
    longDescription: 'Stop researching failure modes from scratch. This library contains hundreds of failure modes, causes, and effects for common industrial equipment—giving you a head start on every analysis.',
    price: 89,
    currency: 'GBP',
    category: 'tools',
    featured: false,
    features: [
      '500+ documented failure modes',
      'Common industrial equipment covered',
      'Linked causes and effects',
      'Searchable database format',
      'Regular updates',
    ],
    whoIsItFor: [
      'RCM facilitators needing reference material',
      'New analysts learning failure mode identification',
      'Teams wanting to accelerate their analysis',
    ],
    whatsIncluded: [
      'Failure Mode Database (Excel)',
      'Equipment Category Index',
      'Usage Guide',
      'Update access for 12 months',
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((p) => p.category === category);
}
