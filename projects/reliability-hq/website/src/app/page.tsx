import Button from '@/components/Button';
import ProductCard from '@/components/ProductCard';
import EmailSignupForm from '@/components/EmailSignupForm';
import { getFeaturedProducts } from '@/data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-teal to-slate-navy text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Stop Reinventing the Wheel.{' '}
              <span className="text-industrial-amber">Start Implementing RCM That Works.</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
              Professional RCM templates, tools, and training built by reliability engineers, for reliability engineers. Based on SAE JA1011 standards. Ready to use today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="/products" variant="secondary" size="lg">
                Browse Products
              </Button>
              <Button href="#signup" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-navy">
                Get Free Resources →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Pain Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              RCM Is Powerful. But Let&apos;s Be Honest—It&apos;s Also a Grind.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-off-white rounded-xl p-6 border border-light-grey">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="font-heading font-semibold text-xl text-slate-navy mb-2">
                Starting from scratch every time
              </h3>
              <p className="text-mid-grey">
                You know the methodology. But building FMEA worksheets, decision logic trees, and analysis templates from a blank page? That&apos;s hours (or days) you don&apos;t have.
              </p>
            </div>
            
            <div className="bg-off-white rounded-xl p-6 border border-light-grey">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="font-heading font-semibold text-xl text-slate-navy mb-2">
                Inconsistent analysis quality
              </h3>
              <p className="text-mid-grey">
                Without standardised formats, every analyst does it differently. Results vary. Management questions the process. Buy-in erodes.
              </p>
            </div>
            
            <div className="bg-off-white rounded-xl p-6 border border-light-grey">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-heading font-semibold text-xl text-slate-navy mb-2">
                Training gaps across your team
              </h3>
              <p className="text-mid-grey">
                Some people get it. Others are still confusing failure modes with failure causes. Getting everyone to the same level feels impossible.
              </p>
            </div>
            
            <div className="bg-off-white rounded-xl p-6 border border-light-grey">
              <div className="text-3xl mb-4">⏱️</div>
              <h3 className="font-heading font-semibold text-xl text-slate-navy mb-2">
                No time to do it &quot;properly&quot;
              </h3>
              <p className="text-mid-grey">
                You&apos;re fighting fires, attending meetings, and managing breakdowns. Deep, methodical RCM work keeps getting pushed to &quot;next quarter.&quot;
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-deep-teal font-medium">
              What if you had a head start?
            </p>
            <p className="text-mid-grey mt-2">
              Tools that are already built. Templates that enforce the right methodology. Training that gets your team aligned—fast.
            </p>
            <p className="font-heading font-semibold text-slate-navy mt-4">
              That&apos;s exactly what we built.
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-off-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              Everything You Need to Implement RCM — Without Starting from Zero
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-light-grey hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-deep-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">RCM Templates</h3>
              <p className="text-mid-grey text-sm">
                Production-ready FMEA worksheets, decision logic diagrams, and analysis templates. SAE JA1011 compliant.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-light-grey hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-industrial-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Training & Courses</h3>
              <p className="text-mid-grey text-sm">
                Practical, no-fluff training for reliability engineers and maintenance teams. Learn the methodology.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-light-grey hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-slate-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-navy" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Tools & Calculators</h3>
              <p className="text-mid-grey text-sm">
                Criticality matrices, maintenance interval calculators, and analysis aids for faster implementation.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-light-grey hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Bundles</h3>
              <p className="text-mid-grey text-sm">
                Complete implementation kits combining templates, guides, and tools at a discount.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-light-grey">
            <h3 className="font-heading text-2xl font-bold text-slate-navy mb-6">What Makes Us Different</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-heading font-semibold text-deep-teal mb-2">Standards-based, not improvised</h4>
                <p className="text-mid-grey text-sm">Everything follows Moubray&apos;s methodology and SAE JA1011 requirements. No shortcuts. No &quot;RCM-lite.&quot;</p>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-deep-teal mb-2">Built by practitioners</h4>
                <p className="text-mid-grey text-sm">We&apos;ve done this work in real plants. These aren&apos;t academic exercises—they&apos;re battle-tested tools.</p>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-deep-teal mb-2">Ready to use today</h4>
                <p className="text-mid-grey text-sm">Download, customise with your data, and start your analysis. No weeks of setup. No consultants required.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              Built on Proven Standards. Refined Through Real-World Application.
            </h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-deep-teal text-3xl mb-2">✓</div>
              <h4 className="font-heading font-semibold text-slate-navy">SAE JA1011 Compliant</h4>
              <p className="text-mid-grey text-sm mt-1">All templates align with the international standard for RCM processes</p>
            </div>
            <div className="text-center">
              <div className="text-deep-teal text-3xl mb-2">✓</div>
              <h4 className="font-heading font-semibold text-slate-navy">Moubray Methodology</h4>
              <p className="text-mid-grey text-sm mt-1">Grounded in principles from the definitive RCM text</p>
            </div>
            <div className="text-center">
              <div className="text-deep-teal text-3xl mb-2">✓</div>
              <h4 className="font-heading font-semibold text-slate-navy">Practical First</h4>
              <p className="text-mid-grey text-sm mt-1">Every product is designed for implementation, not just theory</p>
            </div>
            <div className="text-center">
              <div className="text-deep-teal text-3xl mb-2">✓</div>
              <h4 className="font-heading font-semibold text-slate-navy">Global Community</h4>
              <p className="text-mid-grey text-sm mt-1">Used by reliability engineers across industries worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-off-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              Three Steps to Better Reliability
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-teal rounded-full flex items-center justify-center mx-auto mb-4 text-white font-heading font-bold text-2xl">1</div>
              <h3 className="font-heading font-semibold text-xl text-slate-navy mb-2">Browse</h3>
              <p className="text-mid-grey">Explore our library of templates, courses, and tools. Filter by category or search for exactly what you need.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-teal rounded-full flex items-center justify-center mx-auto mb-4 text-white font-heading font-bold text-2xl">2</div>
              <h3 className="font-heading font-semibold text-xl text-slate-navy mb-2">Buy</h3>
              <p className="text-mid-grey">Secure checkout. Instant access. All digital products are available for immediate download—no waiting, no shipping.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-teal rounded-full flex items-center justify-center mx-auto mb-4 text-white font-heading font-bold text-2xl">3</div>
              <h3 className="font-heading font-semibold text-xl text-slate-navy mb-2">Implement</h3>
              <p className="text-mid-grey">Open the files, add your equipment data, and start your analysis. Each product includes clear instructions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              Popular with Reliability Engineers
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/products" variant="primary" size="lg">
              View All Products →
            </Button>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section id="signup" className="bg-deep-teal section-padding">
        <div className="container-max">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Get Free RCM Resources + Insider Updates
            </h2>
            <p className="text-gray-200 mb-2">Join 1,000+ reliability professionals. Get:</p>
            <ul className="text-gray-200 mb-8 space-y-1">
              <li>• Free templates and checklists</li>
              <li>• New product announcements</li>
              <li>• Practical tips you can use immediately</li>
              <li>• Exclusive subscriber discounts</li>
            </ul>
            
            <EmailSignupForm />
            <p className="text-gray-300 text-sm mt-4">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-navy section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Spend Less Time Building Templates and More Time Improving Reliability?
            </h2>
            <Button href="/products" variant="secondary" size="lg">
              Browse All Products →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
