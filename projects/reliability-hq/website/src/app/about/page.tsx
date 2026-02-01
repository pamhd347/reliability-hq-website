import type { Metadata } from 'next';
import Button from '@/components/Button';

export const metadata: Metadata = {
  title: 'About Us - Reliability HQ',
  description: 'Learn about Reliability HQ - professional RCM tools and templates built by reliability engineers, for reliability engineers.',
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-navy to-deep-teal text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold">
              About Reliability HQ
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              We build the tools we wished we had.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-slate-navy mb-6">
              We Build the Tools We Wished We Had
            </h2>
            <div className="prose prose-lg text-mid-grey">
              <p>
                Reliability HQ exists for one reason: to help reliability engineers spend less time on administrative work and more time actually improving equipment performance.
              </p>
              <p>
                We&apos;ve sat in the same meetings you have. We&apos;ve built FMEA spreadsheets from scratch at 6 PM on a Friday. We&apos;ve explained the difference between a failure mode and a failure cause for the hundredth time.
              </p>
              <p>
                So we started building better tools. Templates that enforce good methodology. Training that actually sticks. Resources that work in the real world—not just in textbooks.
              </p>
              <p className="font-semibold text-deep-teal">
                Now we&apos;re sharing them with you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-off-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-slate-navy mb-8">
              Built for People Who Do the Work
            </h2>
            <p className="text-mid-grey mb-8">Our products are designed for:</p>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-deep-teal mb-2">Reliability Engineers</h3>
                <p className="text-mid-grey">Who need to conduct rigorous analysis without endless setup time</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-deep-teal mb-2">Maintenance Managers</h3>
                <p className="text-mid-grey">Who want their teams aligned on methodology and speaking the same language</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-deep-teal mb-2">Plant Managers</h3>
                <p className="text-mid-grey">Looking to implement RCM properly—without hiring an army of consultants</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-deep-teal mb-2">Consultants and Trainers</h3>
                <p className="text-mid-grey">Who need professional, standards-compliant materials for their clients</p>
              </div>
            </div>
            
            <p className="mt-8 text-mid-grey">
              Whether you&apos;re in manufacturing, utilities, oil & gas, mining, or any asset-intensive industry—if you&apos;re responsible for equipment reliability, you&apos;re in the right place.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-slate-navy mb-8">
              Standards First. Practical Always.
            </h2>
            
            <div className="prose prose-lg text-mid-grey mb-8">
              <p>Everything we create is grounded in established methodology:</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-deep-teal/5 rounded-xl p-6 border border-deep-teal/20">
                <h3 className="font-heading font-semibold text-lg text-deep-teal mb-2">SAE JA1011</h3>
                <p className="text-mid-grey text-sm">
                  The international standard that defines what a &quot;true&quot; RCM process must include. Our templates and training align with these requirements, so your analysis will stand up to scrutiny.
                </p>
              </div>
              
              <div className="bg-slate-navy/5 rounded-xl p-6 border border-slate-navy/20">
                <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Moubray&apos;s RCM II</h3>
                <p className="text-mid-grey text-sm">
                  John Moubray&apos;s work remains the definitive guide to reliability-centered maintenance. His systematic approach forms the backbone of everything we build.
                </p>
              </div>
            </div>
            
            <div className="prose prose-lg text-mid-grey">
              <p>
                But we&apos;re not academics. We know that a perfect template sitting unused helps no one.
              </p>
              <p>
                That&apos;s why every product is designed for <strong>immediate implementation</strong>:
              </p>
              <ul>
                <li>Clear instructions</li>
                <li>Logical layouts</li>
                <li>Real-world examples</li>
                <li>Flexibility to adapt to your specific context</li>
              </ul>
              <p>
                The goal isn&apos;t to follow methodology for its own sake. The goal is to <strong className="text-deep-teal">improve reliability</strong>. Our tools help you get there faster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="bg-off-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-slate-navy mb-8">
              What Sets Us Apart
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-2xl">🎯</div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-navy mb-1">Focused Exclusively on RCM</h3>
                  <p className="text-mid-grey">We&apos;re not a general &quot;maintenance templates&quot; shop. We specialise in reliability-centered maintenance and related methodologies. That focus means deeper expertise and better products.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-2xl">📋</div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-navy mb-1">Ready to Use, Not Ready to Customise for Six Months</h3>
                  <p className="text-mid-grey">Our templates aren&apos;t frameworks that require consultants to implement. They&apos;re working tools. Download, add your data, start your analysis.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-2xl">📖</div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-navy mb-1">No &quot;RCM-Lite&quot;</h3>
                  <p className="text-mid-grey">Some vendors water down RCM to make it &quot;easier.&quot; We don&apos;t. Proper RCM requires rigour. Our products help you apply that rigour efficiently—not skip it.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="text-2xl">💬</div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-slate-navy mb-1">We Speak Your Language</h3>
                  <p className="text-mid-grey">Failure modes. Functional failures. Default actions. P-F intervals. We know this world because we&apos;ve worked in it. Our products are built by people who understand the job.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-slate-navy mb-8">
              The Team Behind Reliability HQ
            </h2>
            
            <div className="prose prose-lg text-mid-grey">
              <p>
                Reliability HQ was founded by reliability engineering practitioners who got tired of rebuilding the same tools for every new project and client.
              </p>
              <p>Our team combines decades of experience across:</p>
              <ul>
                <li>Heavy manufacturing</li>
                <li>Utilities and power generation</li>
                <li>Oil & gas production and refining</li>
                <li>Process industries</li>
                <li>Mining and minerals processing</li>
              </ul>
              <p>
                We&apos;ve facilitated RCM analyses, trained maintenance teams, developed PM programs, and implemented CMMS systems. We&apos;ve seen what works—and what doesn&apos;t.
              </p>
              <p className="font-semibold text-deep-teal">
                Now we&apos;re packaging that experience into products that help you skip the learning curve and get straight to results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-deep-teal section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl font-bold text-white mb-4">
              Ready to See What We&apos;ve Built?
            </h2>
            <p className="text-gray-200 mb-8">
              Browse our library of templates, courses, and tools—all designed to help you implement RCM faster and better.
            </p>
            <Button href="/products" variant="secondary" size="lg">
              Explore Products →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
