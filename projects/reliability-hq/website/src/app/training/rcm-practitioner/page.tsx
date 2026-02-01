'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/Button';

const curriculum = [
  {
    module: 1,
    title: 'Advanced Operating Context',
    topics: ['Defining operating context precisely', 'Performance standards and boundaries', 'Multiple operating modes', 'Environmental considerations'],
  },
  {
    module: 2,
    title: 'Mastering Function Statements',
    topics: ['Primary, secondary, and protective functions', 'Quantifying performance standards', 'Hidden vs evident functions', 'Function-based asset hierarchies'],
  },
  {
    module: 3,
    title: 'Functional Failure Analysis',
    topics: ['Complete vs partial failures', 'State vs rate failures', 'Functional failures vs failure modes', 'Documenting functional failures'],
  },
  {
    module: 4,
    title: 'Expert Failure Mode Identification',
    topics: ['Sources of failure mode data', 'Level of detail decisions', 'Reasonably likely criteria', 'Failure mode classification'],
  },
  {
    module: 5,
    title: 'Failure Effects Documentation',
    topics: ['Writing effective failure effects', 'Local and system-wide effects', 'Time-dependent effects', 'Repair and resource requirements'],
  },
  {
    module: 6,
    title: 'Consequence Evaluation',
    topics: ['Hidden failure identification', 'Safety and environmental assessment', 'Economic consequence analysis', 'Multiple failure scenarios'],
  },
  {
    module: 7,
    title: 'Proactive Task Selection',
    topics: ['On-condition task design', 'P-F interval determination', 'Scheduled restoration criteria', 'Scheduled discard decisions'],
  },
  {
    module: 8,
    title: 'Default Actions & Redesign',
    topics: ['Failure-finding task intervals', 'When redesign is necessary', 'Run-to-failure decisions', 'Combination strategies'],
  },
  {
    module: 9,
    title: 'Facilitating RCM Analyses',
    topics: ['Team composition and roles', 'Facilitation techniques', 'Managing disagreements', 'Session planning and execution'],
  },
  {
    module: 10,
    title: 'Implementation & Living Program',
    topics: ['Translating analysis to action', 'Change management', 'Continuous improvement', 'Age exploration and feedback'],
  },
  {
    module: 11,
    title: 'Case Studies Workshop',
    topics: ['Rotating equipment analysis', 'Electrical systems analysis', 'Instrumentation and controls', 'Safety systems analysis'],
  },
  {
    module: 12,
    title: 'Certification Exam Preparation',
    topics: ['Key concepts review', 'Practice questions', 'Common pitfalls', 'Exam strategy'],
  },
];

export default function RCMPractitionerPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an email service
    console.log('Waitlist signup:', email);
    setSubmitted(true);
  };

  return (
    <div className="bg-off-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-navy to-deep-teal text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-industrial-amber px-4 py-2 rounded-full mb-6">
              <span className="text-white font-semibold text-sm">COMING SOON</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              RCM Practitioner Certification
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
              Become a certified RCM practitioner. Lead analyses with confidence, make better maintenance decisions, and transform your organisation&apos;s reliability approach.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span>12 Modules</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>8-10 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                <span>Professional Certification</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-heading font-bold text-industrial-amber">£399</span>
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
                  The RCM Practitioner Certification course takes you beyond the fundamentals to become a confident, 
                  competent RCM analyst. You&apos;ll learn to lead RCM analysis teams, navigate complex maintenance 
                  decisions, and implement sustainable reliability programs.
                </p>
                <p className="mt-4">
                  This course builds on the RCM Fundamentals content, diving deeper into each element of the 
                  methodology with real-world case studies, practical exercises, and expert insights.
                </p>
              </div>
            </section>

            {/* What you'll learn */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">What You&apos;ll Master</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Lead RCM analyses as a competent facilitator',
                  'Make defensible maintenance task decisions',
                  'Write precise function statements with standards',
                  'Identify and analyse all reasonably likely failure modes',
                  'Apply the decision diagram with confidence',
                  'Design effective on-condition and scheduled tasks',
                  'Handle complex consequence evaluation scenarios',
                  'Implement sustainable RCM programs',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
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
                      <div className="w-10 h-10 bg-deep-teal/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-heading font-bold text-deep-teal">{module.module}</span>
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

            {/* Who is this for */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">Who Is This Course For?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-off-white rounded-lg">
                  <h4 className="font-semibold text-slate-navy mb-2">Reliability Engineers</h4>
                  <p className="text-sm text-mid-grey">Ready to lead RCM analyses and take ownership of your facility&apos;s reliability strategy.</p>
                </div>
                <div className="p-4 bg-off-white rounded-lg">
                  <h4 className="font-semibold text-slate-navy mb-2">Maintenance Managers</h4>
                  <p className="text-sm text-mid-grey">Want to understand RCM deeply enough to guide implementation and evaluate results.</p>
                </div>
                <div className="p-4 bg-off-white rounded-lg">
                  <h4 className="font-semibold text-slate-navy mb-2">Consultants</h4>
                  <p className="text-sm text-mid-grey">Building your credentials to deliver RCM services to clients with confidence.</p>
                </div>
                <div className="p-4 bg-off-white rounded-lg">
                  <h4 className="font-semibold text-slate-navy mb-2">Career Advancers</h4>
                  <p className="text-sm text-mid-grey">Looking to differentiate yourself with a recognised professional certification.</p>
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
                    Launching Q2 2026
                  </div>
                  <div className="text-3xl font-heading font-bold text-slate-navy mb-1">£399</div>
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
                      className="w-full px-4 py-3 rounded-lg border border-light-grey focus:border-deep-teal focus:ring-1 focus:ring-deep-teal outline-none mb-3"
                    />
                    <button
                      type="submit"
                      className="w-full bg-industrial-amber text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
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
                    Professional certification exam
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Case study workshops
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    RCM template bundle included
                  </div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="bg-off-white rounded-xl p-6 border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4">Prerequisites</h3>
                <p className="text-sm text-mid-grey mb-4">
                  Complete the free RCM Fundamentals course first to ensure you have the foundational knowledge.
                </p>
                <Button href="/training/rcm-fundamentals" variant="outline" size="sm" className="w-full">
                  Take Free Course First
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
