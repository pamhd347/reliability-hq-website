'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { articles, categoryLabels, formatDate, type Article } from '@/data/articles';

const categories = ['all', 'rcm-basics', 'implementation', 'case-studies', 'industry-news', 'ai-tools'] as const;
type CategoryFilter = typeof categories[number];

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group">
      <article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="h-48 bg-gradient-to-br from-deep-teal/10 to-slate-navy/10 flex items-center justify-center relative overflow-hidden">
          {article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="text-deep-teal/30">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          {/* Category badge */}
          <span className="inline-block text-xs font-semibold text-deep-teal bg-deep-teal/10 px-2 py-1 rounded mb-3 self-start">
            {categoryLabels[article.category]}
          </span>
          
          {/* Title */}
          <h3 className="font-heading font-semibold text-lg text-slate-navy group-hover:text-deep-teal transition-colors mb-2">
            {article.title}
          </h3>
          
          {/* Excerpt */}
          <p className="text-mid-grey text-sm mb-4 flex-grow">
            {article.excerpt}
          </p>
          
          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-mid-grey border-t border-light-grey pt-4">
            <span>{formatDate(article.publishDate)}</span>
            <span>{article.readTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
        <div className="md:flex">
          {/* Image */}
          <div className="md:w-2/5 h-64 md:h-auto min-h-[250px] bg-gradient-to-br from-deep-teal/20 to-slate-navy/20 flex items-center justify-center relative overflow-hidden">
            {article.featuredImage ? (
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="text-deep-teal/40">
                <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="md:w-3/5 p-6 md:p-8">
            {/* Featured badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block text-xs font-semibold text-industrial-amber bg-industrial-amber/10 px-2 py-1 rounded">
                Featured
              </span>
              <span className="inline-block text-xs font-semibold text-deep-teal bg-deep-teal/10 px-2 py-1 rounded">
                {categoryLabels[article.category]}
              </span>
            </div>
            
            {/* Title */}
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-slate-navy group-hover:text-deep-teal transition-colors mb-4">
              {article.title}
            </h2>
            
            {/* Excerpt */}
            <p className="text-charcoal mb-6">
              {article.excerpt}
            </p>
            
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-mid-grey">
              <span>{formatDate(article.publishDate)}</span>
              <span>•</span>
              <span>{article.readTime} min read</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const featuredArticle = articles.find(a => a.featured);
  
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Category filter
      if (activeCategory !== 'all' && article.category !== activeCategory) {
        return false;
      }
      
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesExcerpt = article.excerpt.toLowerCase().includes(query);
        const matchesCategory = categoryLabels[article.category].toLowerCase().includes(query);
        
        if (!matchesTitle && !matchesExcerpt && !matchesCategory) {
          return false;
        }
      }
      
      return true;
    });
  }, [activeCategory, searchQuery]);

  // Non-featured articles for the grid
  const gridArticles = filteredArticles.filter(a => !a.featured || activeCategory !== 'all' || searchQuery);

  return (
    <div className="bg-off-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-navy to-deep-teal text-white py-16 md:py-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
              RCM Insights & Guides
            </h1>
            <p className="text-xl text-white/80">
              Practical articles on Reliability Centred Maintenance—written by practitioners, for practitioners.
            </p>
          </div>
        </div>
      </section>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-10">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-light-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mid-grey"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-deep-teal text-white'
                    : 'bg-white text-charcoal hover:bg-light-grey'
                }`}
              >
                {category === 'all' ? 'All Articles' : categoryLabels[category as Article['category']]}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article (only show when no filters active) */}
        {featuredArticle && activeCategory === 'all' && !searchQuery && (
          <div className="mb-12">
            <FeaturedArticle article={featuredArticle} />
          </div>
        )}

        {/* Articles Grid */}
        {gridArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-mid-grey mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-xl text-slate-navy mb-2">
              No articles found
            </h3>
            <p className="text-mid-grey">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Newsletter CTA */}
        <section className="mt-16 bg-gradient-to-br from-deep-teal to-slate-navy rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
            Stay Updated on RCM Best Practices
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Get practical reliability engineering insights delivered to your inbox. No spam—just useful content for maintenance professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg text-charcoal focus:ring-2 focus:ring-industrial-amber outline-none"
            />
            <button className="bg-industrial-amber hover:bg-industrial-amber/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
