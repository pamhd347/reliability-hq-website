# Reliability HQ Website — Build Brief

## Mission
Build a complete, production-ready marketing website for Reliability HQ and deploy it to Vercel.

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Fonts:** Inter (headings), Source Sans Pro (body) via Google Fonts
- **Deployment:** Vercel (GitHub integration)
- **Repo name:** `reliability-hq-website`

## Brand

| Element | Value |
|---------|-------|
| Primary | Deep Teal `#0D6E6E` |
| Secondary | Slate Navy `#2C3E50` |
| Accent | Industrial Amber `#E67E22` |
| Background | Off-White `#F8F9FA` |
| Body Text | Charcoal `#343A40` |
| Light Grey | `#E9ECEF` |

**Tagline:** "Reliability Made Practical"

## Pages Required

### Launch Essential
1. **Homepage** (`/`) — Hero, pain points, solution, credibility, featured products, email signup, CTA
2. **About** (`/about`) — Mission, who we serve, approach, why different
3. **Products** (`/products`) — Product grid with categories (Templates, Courses, Tools, Bundles)
4. **Contact** (`/contact`) — Contact form, email (hello@reliabilityhq.com)
5. **Privacy Policy** (`/privacy`)
6. **Terms of Service** (`/terms`)

### Individual Product Pages
- `/products/[slug]` — Dynamic product page template

## Content Source
All copy is in: `/projects/reliability-hq/reliability-hq-website-content.md`

Use this content exactly — it's already written and approved.

## Features
- Responsive design (mobile-first)
- SEO metadata on all pages
- Email signup form (just capture to console for now, or use Formspree)
- Contact form (Formspree or similar)
- Accessible (WCAG AA)
- Fast (target 90+ Lighthouse score)

## Product Data
Create a `/data/products.ts` file with placeholder products:

```typescript
export const products = [
  {
    slug: 'rcm-fmea-template-pack',
    name: 'RCM FMEA Template Pack',
    description: 'Complete FMEA worksheet set with decision logic. SAE JA1011 compliant.',
    price: 79,
    currency: 'GBP',
    category: 'templates',
    featured: true,
    image: '/images/products/fmea-template.png', // placeholder
  },
  {
    slug: 'criticality-analysis-tool',
    name: 'Criticality Analysis Tool',
    description: 'Equipment criticality ranking calculator with customisable criteria.',
    price: 49,
    currency: 'GBP',
    category: 'tools',
    featured: true,
  },
  {
    slug: 'rcm-decision-diagram',
    name: 'RCM Decision Diagram Worksheet',
    description: 'Standard RCM decision logic tree with guidance notes.',
    price: 29,
    currency: 'GBP',
    category: 'templates',
    featured: false,
  },
  {
    slug: 'rcm-starter-bundle',
    name: 'RCM Starter Bundle',
    description: 'Everything you need to start your first RCM analysis. Templates, guides, and checklists.',
    price: 149,
    currency: 'GBP',
    category: 'bundles',
    featured: true,
  },
];
```

## Deployment Steps
1. Create GitHub repo: `gh repo create reliability-hq-website --public --source=. --push`
2. Connect to Vercel: `vercel --prod`
3. Note the deployed URL

## Deliverables
1. Working website deployed to Vercel
2. GitHub repo with clean code
3. Report back the live URL

## Don't
- Don't use a CMS yet (static is fine for launch)
- Don't integrate payments yet (products link to "coming soon" or Gumroad later)
- Don't overcomplicate — clean, professional, functional

## Do
- Make it look professional and polished
- Use the exact brand colours
- Follow the content document closely
- Add subtle animations/transitions for polish
- Include proper meta tags and Open Graph for sharing
