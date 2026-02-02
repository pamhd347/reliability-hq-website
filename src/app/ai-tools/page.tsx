import Link from 'next/link';
import Button from '@/components/Button';

const tools = [
  {
    title: 'Function Statement Generator',
    description: 'Transform equipment descriptions into properly formatted RCM function statements with performance standards.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    href: '/ai-tools/function-generator',
    status: 'live',
  },
  {
    title: 'Failure Mode Suggester',
    description: 'Input your equipment type and get a comprehensive list of common failure modes with typical causes.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    href: '/ai-tools/failure-modes',
    status: 'live',
  },
  {
    title: 'Consequence Classifier',
    description: 'Walk through the RCM decision logic interactively to classify failure consequences correctly.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
    ),
    href: '/ai-tools/consequence-classifier',
    status: 'live',
  },
  {
    title: 'P-F Interval Estimator',
    description: 'Get suggested monitoring intervals based on failure mode characteristics and detection techniques.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    href: '/ai-tools/pf-interval',
    status: 'live',
  },
  {
    title: 'FMEA Row Helper',
    description: 'Input a failure mode and get AI-generated effects, causes, and detection methods for your FMEA worksheet.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
      </svg>
    ),
    href: '/ai-tools/fmea-helper',
    status: 'live',
  },
];

const articles = [
  {
    title: 'How to Use AI for RCM Analysis',
    description: 'A practical guide to leveraging AI tools in your RCM work — without compromising quality.',
    href: '/blog/ai-for-rcm-analysis',
    status: 'coming',
  },
  {
    title: 'AI-Assisted FMEA: A Step-by-Step Guide',
    description: 'Learn how to use AI to accelerate your FMEA process while maintaining rigour.',
    href: '/blog/ai-assisted-fmea',
    status: 'coming',
  },
  {
    title: 'Prompt Templates for Reliability Engineers',
    description: 'Copy-paste prompts that actually work for reliability engineering tasks.',
    href: '/blog/prompts-for-reliability-engineers',
    status: 'coming',
  },
];

export default function AIToolsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-navy to-deep-teal text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <span className="text-industrial-amber">🤖</span>
              <span className="text-sm font-medium">AI-Powered Tools</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              AI Tools for{' '}
              <span className="text-industrial-amber">Reliability Engineers</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
              Free tools that use AI to accelerate your RCM analysis, FMEA work, and maintenance strategy development. Built by engineers who understand the methodology.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="#tools" variant="secondary" size="lg">
                Explore Tools
              </Button>
              <Button href="#articles" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-navy">
                Read Guides →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Wizard Promo */}
      <section className="bg-white section-padding border-b border-light-grey">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-navy to-deep-teal rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                FREE
              </div>
              <div className="relative z-10">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                  RCM Analysis Wizard
                </h2>
                <p className="text-gray-200 text-lg mb-6 max-w-2xl">
                  Connect all 5 tools into one seamless workflow. Analyze any equipment from start to finish with guided steps, auto-generated content, and professional exports.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    5-step guided workflow
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Auto-generated analysis
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    CSV & print export
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button href="/ai-tools/rcm-wizard" variant="secondary" size="lg">
                    Try RCM Wizard →
                  </Button>
                  <span className="text-gray-300 text-sm">No signup required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why AI for RCM */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              Why AI + Reliability Engineering?
            </h2>
            <p className="mt-4 text-lg text-mid-grey">
              AI won&apos;t replace reliability engineers — but engineers who use AI will outperform those who don&apos;t.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Accelerate Analysis</h3>
              <p className="text-mid-grey text-sm">
                Generate first drafts of function statements, failure modes, and effects in seconds instead of hours.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-industrial-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Improve Completeness</h3>
              <p className="text-mid-grey text-sm">
                AI suggests failure modes you might miss. You provide the judgement on what&apos;s relevant.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-navy" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Learn Faster</h3>
              <p className="text-mid-grey text-sm">
                Use AI as a learning tool to understand RCM concepts and see examples of proper methodology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="bg-off-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              Free AI Tools
            </h2>
            <p className="mt-4 text-lg text-mid-grey">
              No signup required for most tools. Just start using them.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl p-6 border transition-all ${
                  tool.status === 'live' 
                    ? 'border-deep-teal/20 hover:border-deep-teal hover:shadow-lg' 
                    : 'border-light-grey opacity-75'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  tool.status === 'live' ? 'bg-deep-teal/10 text-deep-teal' : 'bg-light-grey text-mid-grey'
                }`}>
                  {tool.icon}
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-heading font-semibold text-lg text-slate-navy">{tool.title}</h3>
                  {tool.status === 'coming' && (
                    <span className="text-xs bg-light-grey text-mid-grey px-2 py-1 rounded-full whitespace-nowrap">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-mid-grey text-sm mb-4">{tool.description}</p>
                {tool.status === 'live' ? (
                  <Link
                    href={tool.href}
                    className="inline-flex items-center gap-1 text-deep-teal font-semibold text-sm hover:underline"
                  >
                    Try it free
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                ) : (
                  <span className="text-mid-grey text-sm">Coming soon</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              Guides & Articles
            </h2>
            <p className="mt-4 text-lg text-mid-grey">
              Learn how to use AI effectively in your reliability engineering work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {articles.map((article, index) => (
              <div 
                key={index} 
                className="bg-off-white rounded-xl p-6 border border-light-grey"
              >
                <span className="text-xs bg-industrial-amber/10 text-industrial-amber px-2 py-1 rounded-full">
                  Coming Soon
                </span>
                <h3 className="font-heading font-semibold text-lg text-slate-navy mt-4 mb-2">{article.title}</h3>
                <p className="text-mid-grey text-sm">{article.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deep-teal section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Want to Learn RCM First?
            </h2>
            <p className="text-gray-200 text-lg mb-8">
              Our free RCM training courses teach you the methodology. Then use these AI tools to work faster.
            </p>
            <Button href="/training" variant="secondary" size="lg">
              Start Free Training →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
