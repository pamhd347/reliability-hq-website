import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, getRelatedArticles, categoryLabels, formatDate } from '@/data/articles';

// Generate static params for all articles
export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Generate metadata for each article
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = getArticleBySlug(slug);
    if (!article) {
      return { title: 'Article Not Found' };
    }
    return {
      title: `${article.title} | Reliability HQ Blog`,
      description: article.metaDescription,
      openGraph: {
        title: article.title,
        description: article.metaDescription,
        type: 'article',
        publishedTime: article.publishDate,
        authors: [article.author],
      },
    };
  });
}

// Extract headings from markdown content for table of contents
function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ id, text, level });
  }
  
  return headings;
}

// Simple markdown to HTML converter for article content
function renderMarkdown(content: string): string {
  let html = content
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    
    // Tables
    .replace(/\n\|(.+)\|\n\|[-:|]+\|\n((?:\|.+\|\n?)+)/g, (match, header, body) => {
      const headers = header.split('|').map((h: string) => h.trim()).filter(Boolean);
      const headerHtml = headers.map((h: string) => `<th class="px-4 py-3 text-left text-sm font-semibold text-slate-navy border-b-2 border-deep-teal">${h}</th>`).join('');
      
      const rows = body.trim().split('\n').map((row: string) => {
        const cells = row.split('|').map((c: string) => c.trim()).filter(Boolean);
        return `<tr class="border-b border-light-grey hover:bg-off-white">${cells.map((c: string) => `<td class="px-4 py-3 text-sm">${c}</td>`).join('')}</tr>`;
      }).join('');
      
      return `<div class="overflow-x-auto my-6"><table class="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm"><thead class="bg-light-grey">${headerHtml}</thead><tbody>${rows}</tbody></table></div>`;
    })
    
    // Headers with IDs
    .replace(/^### (.+)$/gm, (match, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h3 id="${id}" class="font-heading font-semibold text-xl text-slate-navy mt-10 mb-4 scroll-mt-20">${text}</h3>`;
    })
    .replace(/^## (.+)$/gm, (match, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h2 id="${id}" class="font-heading font-bold text-2xl text-slate-navy mt-12 mb-6 scroll-mt-20">${text}</h2>`;
    })
    
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="my-12 border-t-2 border-light-grey" />')
    
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-navy">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    
    // Links - internal
    .replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2" class="text-deep-teal hover:text-slate-navy underline decoration-deep-teal/30 hover:decoration-deep-teal transition-colors">$1</a>')
    
    // Bullet lists
    .replace(/(?:^|\n)((?:- .+\n?)+)/g, (match, list) => {
      const items = list.trim().split('\n').map((item: string) => {
        const text = item.replace(/^- /, '');
        return `<li class="flex items-start gap-2"><span class="text-deep-teal mt-1.5">•</span><span>${text}</span></li>`;
      }).join('');
      return `<ul class="space-y-2 my-6 pl-1">${items}</ul>`;
    })
    
    // Numbered lists
    .replace(/(?:^|\n)((?:\d+\. .+\n?)+)/g, (match, list) => {
      const items = list.trim().split('\n').map((item: string, index: number) => {
        const text = item.replace(/^\d+\. /, '');
        return `<li class="flex items-start gap-3"><span class="text-deep-teal font-semibold min-w-[1.5rem]">${index + 1}.</span><span>${text}</span></li>`;
      }).join('');
      return `<ol class="space-y-2 my-6">${items}</ol>`;
    })
    
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-slate-navy text-white p-4 rounded-lg overflow-x-auto my-6 text-sm"><code>$2</code></pre>')
    
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-light-grey text-slate-navy px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    
    // Blockquotes
    .replace(/^&gt; (.+)$/gm, '<blockquote class="border-l-4 border-deep-teal pl-4 my-6 text-charcoal italic">$1</blockquote>')
    
    // Images with alt text and optional caption
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="my-8"><img src="$2" alt="$1" class="w-full rounded-xl shadow-lg" /><figcaption class="text-center text-sm text-mid-grey mt-3">$1</figcaption></figure>')
    
    // Paragraphs
    .replace(/\n\n([^<\n][^\n]+)\n\n/g, '\n\n<p class="text-charcoal leading-relaxed mb-6">$1</p>\n\n')
    .replace(/\n\n([^<\n][^\n]+)$/g, '\n\n<p class="text-charcoal leading-relaxed mb-6">$1</p>');

  return html;
}

// Social share buttons component
function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const url = `https://reliabilityhq.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-mid-grey">Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-mid-grey hover:text-deep-teal transition-colors"
        aria-label="Share on Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-mid-grey hover:text-deep-teal transition-colors"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=Check out this article: ${url}`}
        className="text-mid-grey hover:text-deep-teal transition-colors"
        aria-label="Share via email"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>
    </div>
  );
}

// Related article card
function RelatedArticleCard({ article }: { article: ReturnType<typeof getArticleBySlug> }) {
  if (!article) return null;
  
  return (
    <Link href={`/blog/${article.slug}`} className="group block">
      <article className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow">
        <span className="text-xs font-semibold text-deep-teal bg-deep-teal/10 px-2 py-0.5 rounded">
          {categoryLabels[article.category]}
        </span>
        <h4 className="font-heading font-semibold text-slate-navy group-hover:text-deep-teal transition-colors mt-2 mb-2 line-clamp-2">
          {article.title}
        </h4>
        <p className="text-sm text-mid-grey">{article.readTime} min read</p>
      </article>
    </Link>
  );
}

// Table of contents component (client-side interactive)
function TableOfContents({ headings }: { headings: { id: string; text: string; level: number }[] }) {
  if (headings.length === 0) return null;
  
  return (
    <nav className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="font-heading font-semibold text-slate-navy mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
            <a
              href={`#${heading.id}`}
              className="text-sm text-mid-grey hover:text-deep-teal transition-colors block py-1"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  
  const relatedArticles = getRelatedArticles(slug);
  const headings = extractHeadings(article.content);
  const contentHtml = renderMarkdown(article.content);

  return (
    <div className="bg-off-white">
      {/* Article Header */}
      <header className="bg-gradient-to-br from-slate-navy to-deep-teal text-white py-12 md:py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-white/60 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white/80">{categoryLabels[article.category]}</span>
            </nav>
            
            {/* Category badge */}
            <span className="inline-block text-sm font-semibold bg-white/20 px-3 py-1 rounded-full mb-4">
              {categoryLabels[article.category]}
            </span>
            
            {/* Title */}
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl mb-6">
              {article.title}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {formatDate(article.publishDate)}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.readTime} min read
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:flex lg:gap-12">
          {/* Sidebar - Table of Contents (desktop) */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents headings={headings} />
              
              {/* Share buttons */}
              <div className="mt-6 bg-white rounded-xl p-6 shadow-sm">
                <ShareButtons title={article.title} slug={article.slug} />
              </div>
            </div>
          </aside>

          {/* Article Content */}
          <article className="flex-grow max-w-3xl">
            {/* Mobile share buttons */}
            <div className="lg:hidden mb-8 p-4 bg-white rounded-lg shadow-sm">
              <ShareButtons title={article.title} slug={article.slug} />
            </div>

            {/* Article body */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* CTA Box */}
            <div className="mt-12 bg-gradient-to-br from-deep-teal to-slate-navy rounded-xl p-8 text-white">
              <h3 className="font-heading font-bold text-2xl mb-4">
                Ready to Improve Your Maintenance Programme?
              </h3>
              <p className="text-white/80 mb-6">
                Our professionally designed RCM templates and tools help you implement reliability best practices efficiently.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-block bg-industrial-amber hover:bg-industrial-amber/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Browse Products
                </Link>
                <Link
                  href="/resources"
                  className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  Free Tools
                </Link>
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-12 bg-white rounded-xl p-6 shadow-sm flex items-start gap-4">
              <div className="w-16 h-16 bg-deep-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-deep-teal font-heading font-bold text-xl">R</span>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-slate-navy">{article.author}</h4>
                <p className="text-mid-grey text-sm mt-1">
                  Sharing practical reliability engineering knowledge to help maintenance professionals 
                  implement RCM effectively. Based on SAE JA1011 standards and real-world experience.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="font-heading font-bold text-2xl text-slate-navy mb-6">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <RelatedArticleCard key={related.slug} article={related} />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter CTA */}
        <section className="mt-16 bg-light-grey rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-heading font-bold text-2xl text-slate-navy mb-4">
            Get More RCM Insights
          </h2>
          <p className="text-charcoal mb-6 max-w-2xl mx-auto">
            Subscribe to receive new articles, guides, and practical tips for reliability engineering professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 border border-mid-grey rounded-lg focus:ring-2 focus:ring-deep-teal focus:border-transparent outline-none"
            />
            <button className="bg-deep-teal hover:bg-slate-navy text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
