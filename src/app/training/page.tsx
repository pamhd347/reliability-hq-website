'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import { useState } from 'react';

const courses = [
  {
    title: 'RCM Fundamentals',
    subtitle: 'Introduction Course',
    description: 'Master the core principles of Reliability Centred Maintenance in 5 practical lessons. Perfect for beginners or as a refresher.',
    lessons: 5,
    duration: '2-3 hours',
    price: 'Free',
    originalPrice: null,
    href: '/training/rcm-fundamentals',
    badge: 'Start Learning',
    badgeColor: 'bg-green-500',
    features: ['5 interactive lessons', 'Quizzes with instant feedback', 'Certificate of completion', 'Progress tracking'],
  },
  {
    title: 'RCM Practitioner Preparation',
    subtitle: 'Professional Course',
    description: 'Become a confident RCM practitioner with our comprehensive training program. Lead RCM analyses with confidence.',
    lessons: 12,
    duration: '8-10 hours',
    price: 'Free',
    originalPrice: '£399',
    href: '/training/rcm-practitioner',
    badge: 'Free for Limited Time',
    badgeColor: 'bg-industrial-amber',
    features: ['12 in-depth modules', 'Real-world case studies', 'Final assessment', 'Lifetime access'],
  },
  {
    title: 'FMEA Masterclass',
    subtitle: 'Specialist Course',
    description: 'Deep dive into Failure Modes and Effects Analysis. Learn to conduct rigorous FMEAs that drive maintenance strategy.',
    lessons: 8,
    duration: '5-6 hours',
    price: '£199',
    originalPrice: null,
    href: '/training/fmea-masterclass',
    badge: 'Coming Soon',
    badgeColor: 'bg-slate-navy',
    features: ['8 focused modules', 'FMEA templates included', 'Expert techniques', 'Practical exercises'],
  },
];

const faqs = [
  {
    question: 'Are your courses SAE JA1011 compliant?',
    answer: 'Absolutely. All our training content is built around the SAE JA1011 standard, which defines the minimum criteria that a process must meet to be called RCM. We teach the methodology properly—no shortcuts or "RCM-lite" approaches.',
  },
  {
    question: 'Who is the training designed for?',
    answer: 'Our courses are designed for Reliability Engineers, Maintenance Managers, Asset Managers, and anyone involved in developing maintenance strategies. Whether you\'re new to RCM or looking for a refresher, we have content for you.',
  },
  {
    question: 'Do I get a certificate?',
    answer: 'Yes! Upon completing our free RCM Fundamentals course (including all quizzes), you\'ll receive a completion certificate. Our premium courses offer completion certificates that demonstrate your expertise.',
  },
  {
    question: 'Can I access the courses on mobile?',
    answer: 'Yes, all courses are fully responsive and work on desktop, tablet, and mobile devices. Learn on your commute, during lunch, or whenever suits you.',
  },
  {
    question: 'What\'s the difference between the free and paid courses?',
    answer: 'Our free RCM Fundamentals course covers the essential concepts—perfect for beginners. Paid courses go much deeper with advanced techniques, real-world case studies, practical exercises, and professional certifications.',
  },
  {
    question: 'Is team/enterprise training available?',
    answer: 'Yes! Contact us for team licensing and bespoke training programmes for your organisation. We can customise content to your industry and equipment types.',
  },
];

export default function TrainingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-deep-teal to-slate-navy text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
              <span className="text-industrial-amber">🎓</span>
              <span className="text-sm font-medium">Professional RCM Training</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Learn RCM the Right Way.{' '}
              <span className="text-industrial-amber">Practical. Standards-Based. Effective.</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
              From understanding the 7 RCM questions to leading full analyses—our courses give you the knowledge and confidence to implement RCM properly.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button href="/training/rcm-fundamentals" variant="secondary" size="lg">
                Start Free Course
              </Button>
              <Button href="#courses" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-slate-navy">
                View All Courses →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Train With Us */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              Why Train With Reliability HQ?
            </h2>
            <p className="mt-4 text-lg text-mid-grey">
              Not all RCM training is created equal. Here&apos;s what sets us apart.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-deep-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">SAE JA1011 Compliant</h3>
              <p className="text-mid-grey text-sm">
                Every lesson aligns with the international standard. This is real RCM, not watered-down versions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-industrial-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Practical Experience</h3>
              <p className="text-mid-grey text-sm">
                Created by engineers who&apos;ve implemented RCM in real facilities. Theory backed by practice.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-navy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-navy" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Interactive Learning</h3>
              <p className="text-mid-grey text-sm">
                Quizzes, progress tracking, and hands-on exercises. Not just watching videos—actually learning.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-heading font-semibold text-lg text-slate-navy mb-2">Free to Start</h3>
              <p className="text-mid-grey text-sm">
                Our fundamentals course is completely free. No credit card, no hidden fees. Just start learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="courses" className="bg-off-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
              Our Training Courses
            </h2>
            <p className="mt-4 text-lg text-mid-grey">
              From free introductions to professional certifications—choose your path.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-light-grey overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`${course.badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                      {course.badge}
                    </span>
                    <div className="text-right">
                      {course.originalPrice && (
                        <span className="text-sm text-mid-grey line-through mr-2">{course.originalPrice}</span>
                      )}
                      <span className="text-2xl font-heading font-bold text-deep-teal">{course.price}</span>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-navy mb-1">{course.title}</h3>
                  <p className="text-sm text-deep-teal font-medium mb-3">{course.subtitle}</p>
                  <p className="text-mid-grey text-sm mb-4">{course.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-mid-grey mb-4">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                      </svg>
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-charcoal">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {course.badge === 'Coming Soon' ? (
                    <span className="block w-full text-center py-3 px-4 rounded-lg font-semibold bg-light-grey text-mid-grey cursor-not-allowed">
                      Coming Soon
                    </span>
                  ) : (
                    <Link
                      href={course.href}
                      className="block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors bg-deep-teal text-white hover:bg-slate-navy"
                    >
                      Start Free Course
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
                What You&apos;ll Master
              </h2>
              <p className="mt-4 text-lg text-mid-grey">
                Core RCM concepts that every reliability professional needs to know.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-off-white rounded-xl p-6 border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-deep-teal mb-3">The 7 RCM Questions</h3>
                <p className="text-mid-grey text-sm">
                  The backbone of RCM analysis. Understand how to systematically evaluate assets and develop optimal maintenance strategies using these seven critical questions.
                </p>
              </div>
              <div className="bg-off-white rounded-xl p-6 border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-deep-teal mb-3">Failure Modes & Effects Analysis</h3>
                <p className="text-mid-grey text-sm">
                  Learn to identify how equipment fails, what happens when it does, and why it matters. The foundation for evidence-based maintenance decisions.
                </p>
              </div>
              <div className="bg-off-white rounded-xl p-6 border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-deep-teal mb-3">The RCM Decision Diagram</h3>
                <p className="text-mid-grey text-sm">
                  Navigate the logical framework for selecting maintenance tasks. Preventive, predictive, or run-to-failure—know when each applies and why.
                </p>
              </div>
              <div className="bg-off-white rounded-xl p-6 border border-light-grey">
                <h3 className="font-heading font-semibold text-lg text-deep-teal mb-3">Implementation Strategy</h3>
                <p className="text-mid-grey text-sm">
                  Knowledge without action is useless. Learn how to implement RCM in your organisation, overcome resistance, and measure results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access / Feedback Request */}
      <section className="bg-off-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-industrial-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy mb-4">
              Help Us Improve
            </h2>
            <p className="text-lg text-mid-grey mb-6">
              We&apos;ve just launched and we&apos;re offering our courses free while we gather feedback from real reliability professionals.
            </p>
            <div className="bg-white rounded-xl p-6 border border-light-grey inline-block text-left">
              <p className="text-charcoal mb-4">After completing a course, we&apos;d love to hear:</p>
              <ul className="space-y-2 text-mid-grey">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  What was most useful?
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  What would you add or change?
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                  </svg>
                  Would you recommend it to colleagues?
                </li>
              </ul>
              <a 
                href="mailto:hello@reliabilityhq.com?subject=Course%20Feedback" 
                className="inline-flex items-center gap-2 mt-6 text-deep-teal font-semibold hover:underline"
              >
                Share your feedback
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-off-white rounded-xl border border-light-grey overflow-hidden">
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-heading font-semibold text-slate-navy">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 text-deep-teal transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-mid-grey">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-deep-teal section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Learn RCM Properly?
            </h2>
            <p className="text-gray-200 text-lg mb-8">
              Start with our free fundamentals course. No credit card. No commitment. Just quality training.
            </p>
            <Button href="/training/rcm-fundamentals" variant="secondary" size="lg">
              Start Free Course →
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
