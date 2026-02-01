'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

const curriculum = [
  {
    module: 1,
    title: 'FMEA Foundations',
    topics: ['FMEA history and evolution', 'Design vs Process vs RCM FMEA', 'When to use FMEA', 'Common misconceptions'],
  },
  {
    module: 2,
    title: 'System Boundaries & Functions',
    topics: ['Defining analysis scope', 'Function-based approach', 'Input/output analysis', 'Interface identification'],
  },
  {
    module: 3,
    title: 'Identifying Failure Modes',
    topics: ['Failure mode sources', 'Level of detail decisions', 'Complete vs partial modes', 'Failure mode databases'],
  },
  {
    module: 4,
    title: 'Analysing Failure Effects',
    topics: ['Local vs system effects', 'End effects determination', 'Failure detection methods', 'Time-dependent effects'],
  },
  {
    module: 5,
    title: 'Failure Causes & Mechanisms',
    topics: ['Root cause identification', 'Failure mechanisms', 'Cause-effect relationships', 'Human factors in failure'],
  },
  {
    module: 6,
    title: 'Risk Priority Numbers (RPN)',
    topics: ['Severity rating scales', 'Occurrence estimation', 'Detection assessment', 'RPN limitations and alternatives'],
  },
  {
    module: 7,
    title: 'Recommended Actions',
    topics: ['Design modifications', 'Process controls', 'Detection improvements', 'Action prioritisation'],
  },
  {
    module: 8,
    title: 'FMEA Documentation & Maintenance',
    topics: ['Worksheet design', 'Documentation standards', 'Updating FMEAs', 'Lessons learned capture'],
  },
];

export default function FMEAMasterclassPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Waitlist signup:', email);
    setSubmitted(true);
  };

  return (
    <div className="bg-off-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-900 to-slate-navy text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-industrial-amber px-4 py-2 rounded-full mb-6">
              <span className="text-white font-semibold text-sm">COMING SOON</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              FMEA Masterclass
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
              Deep dive into Failure Modes and Effects Analysis. Learn to conduct rigorous, practical FMEAs that drive better maintenance and design decisions.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span>8 Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>5-6 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span>Templates Included</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-heading font-bold text-industrial-amber">£199</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course overview */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">About This Course</h2>
              <div className="prose max-w-none text-charcoal">
                <p>
                  FMEA is the analytical backbone of RCM, but it&apos;s often done poorly—too superficial, too detailed, 
                  or disconnected from practical maintenance decisions. This masterclass teaches you to conduct FMEAs 
                  that actually drive value.
                </p>
                <p className="mt-4">
                  Whether you&apos;re doing Design FMEA for new equipment, Process FMEA for manufacturing, or 
                  reliability-focused FMEA for maintenance strategy, you&apos;ll learn techniques that work in the real world.
                </p>
              </div>
            </section>

            {/* What you'll learn */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">What You&apos;ll Master</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Identify failure modes at the right level of detail',
                  'Trace effects through systems to end consequences',
                  'Link failure causes to practical countermeasures',
                  'Apply rating scales consistently and meaningfully',
                  'Prioritise actions based on risk, not just RPN',
                  'Document FMEAs for future value',
                  'Distinguish between FMEA types and when to use each',
                  'Avoid common FMEA pitfalls and time wasters',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-charcoal">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {curriculum.map((module) => (
                  <div key={module.module} className="border border-light-grey rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-heading font-bold text-purple-600">{module.module}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold text-slate-navy mb-2">{module.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic, index) => (
                            <span key={index} className="text-xs bg-off-white text-mid-grey px-2 py-1 rounded">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* What's included */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">What&apos;s Included</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-navy">FMEA Worksheet Templates</h4>
                    <p className="text-sm text-mid-grey mt-1">Professional Excel templates for all FMEA types</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-navy">Rating Scale Guides</h4>
                    <p className="text-sm text-mid-grey mt-1">Customisable severity, occurrence, and detection scales</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-navy">Case Study Examples</h4>
                    <p className="text-sm text-mid-grey mt-1">Complete FMEA examples from various industries</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-navy">Certificate of Completion</h4>
                    <p className="text-sm text-mid-grey mt-1">Demonstrate your FMEA expertise</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Waitlist signup */}
              <div className="bg-white rounded-xl shadow-sm border border-light-grey p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 bg-industrial-amber/10 text-industrial-amber px-3 py-1 rounded-full text-sm font-medium mb-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Launching Q3 2026
                  </div>
                  <div className="text-3xl font-heading font-bold text-slate-navy mb-1">£199</div>
                  <div className="text-sm text-mid-grey">Early bird pricing</div>
                </div>

                {submitted ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-navy">You&apos;re on the list!</p>
                    <p className="text-sm text-mid-grey mt-1">We&apos;ll notify you when the course launches.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Get notified when we launch
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-light-grey focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none mb-3"
                    />
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      Join Waitlist
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-light-grey space-y-3">
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Lifetime access
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    FMEA templates included
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Practical exercises
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Certificate of completion
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-off-white rounded-xl p-6 border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4">Prerequisites</h3>
                <p className="text-sm text-mid-grey mb-4">
                  We recommend completing the free RCM Fundamentals course first, though it&apos;s not required.
                </p>
                <Button href="/training/rcm-fundamentals" variant="outline" size="sm" className="w-full">
                  Take Free Course
                </Button>
              </div>

              {/* Related */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4">Related Courses</h3>
                <Link href="/training/rcm-practitioner" className="block p-4 bg-off-white rounded-lg hover:bg-light-grey transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-navy">RCM Practitioner</p>
                      <p className="text-sm text-mid-grey">Full certification course</p>
                    </div>
                    <svg className="w-5 h-5 text-mid-grey" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
