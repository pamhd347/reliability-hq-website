import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'deep-teal': '#0D6E6E',
        'slate-navy': '#2C3E50',
        'industrial-amber': '#E67E22',
        'off-white': '#F8F9FA',
        'light-grey': '#E9ECEF',
        'mid-grey': '#6C757D',
        'charcoal': '#343A40',
      },
      fontFamily: {
        heading: ['var(--font-inter)', 'sans-serif'],
        body: ['var(--font-source-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
