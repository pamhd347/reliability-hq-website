'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import CourseProgress from '@/components/CourseProgress';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { lessons } from '@/data/rcm-fundamentals';

export default function RCMFundamentalsPage() {
  const { isLoaded, completedLessons, completedQuizzes, overallProgress, isComplete, getNextIncompleteLesson } = useCourseProgress();

  const nextLesson = getNextIncompleteLesson();

  return (
    <div className="bg-off-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-deep-teal to-slate-navy text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full mb-6">
              <span className="text-white font-semibold text-sm">FREE COURSE</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
              RCM Fundamentals
            </h1>
            <p className="mt-4 text-xl text-gray-200 leading-relaxed">
              Master the core principles of Reliability Centred Maintenance in 5 practical lessons. Learn the methodology that&apos;s transformed maintenance strategies worldwide.
            </p>
            
            <div className="mt-8 flex flex-wrap items-center gap-6 text-gray-200">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
                <span>5 Lessons</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>2-3 Hours Total</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
                <span>5 Quizzes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
                <span>Certificate</span>
              </div>
            </div>

            {isLoaded && (
              <div className="mt-10">
                {isComplete ? (
                  <Button href="/training/certificate" variant="secondary" size="lg">
                    Get Your Certificate →
                  </Button>
                ) : nextLesson ? (
                  <Button href={`/training/rcm-fundamentals/${nextLesson.slug}`} variant="secondary" size="lg">
                    {overallProgress > 0 ? 'Continue Learning' : 'Start Learning'} →
                  </Button>
                ) : (
                  <Button href="/training/rcm-fundamentals/what-is-rcm" variant="secondary" size="lg">
                    Start Learning →
                  </Button>
                )}
              </div>
            )}
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
                  Reliability Centred Maintenance (RCM) is the methodology used by industries worldwide to develop 
                  optimal maintenance strategies. This free course gives you a solid foundation in RCM principles—
                  whether you&apos;re new to reliability engineering or need a refresher on the fundamentals.
                </p>
                <p className="mt-4">
                  By the end of this course, you&apos;ll understand:
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>The history and principles of RCM (Moubray, SAE JA1011)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>How to apply the 7 RCM questions systematically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>The fundamentals of Failure Modes and Effects Analysis (FMEA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>How to use the RCM Decision Diagram to select maintenance tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>Practical strategies for implementing RCM in your organisation</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Lesson list */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">Course Curriculum</h2>
              <div className="space-y-4">
                {lessons.map((lesson) => {
                  const isLessonComplete = completedLessons.includes(lesson.id);
                  const isQuizComplete = completedQuizzes.includes(lesson.id);
                  const isFullyComplete = isLessonComplete && isQuizComplete;

                  return (
                    <Link
                      key={lesson.id}
                      href={`/training/rcm-fundamentals/${lesson.slug}`}
                      className={`block p-6 rounded-xl border-2 transition-all hover:shadow-md ${
                        isFullyComplete 
                          ? 'border-green-200 bg-green-50 hover:border-green-300' 
                          : 'border-light-grey bg-white hover:border-deep-teal'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isFullyComplete 
                            ? 'bg-green-500 text-white' 
                            : isLessonComplete
                              ? 'bg-industrial-amber text-white'
                              : 'bg-deep-teal/10 text-deep-teal'
                        }`}>
                          {isFullyComplete ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          ) : (
                            <span className="font-heading font-bold text-lg">{lesson.id}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-heading font-semibold text-lg text-slate-navy">{lesson.title}</h3>
                            <span className="text-sm text-mid-grey">{lesson.duration}</span>
                          </div>
                          <p className="text-mid-grey text-sm">{lesson.subtitle}</p>
                          
                          {/* Status badges */}
                          <div className="flex items-center gap-2 mt-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isLessonComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {isLessonComplete ? '✓ Lesson' : 'Lesson'}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              isQuizComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                              {isQuizComplete ? '✓ Quiz' : 'Quiz'}
                            </span>
                          </div>
                        </div>
                        <svg className="w-6 h-6 text-mid-grey flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Who is this for */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">Who Is This Course For?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-off-white rounded-lg">
                  <h4 className="font-semibold text-slate-navy mb-2">Reliability Engineers</h4>
                  <p className="text-sm text-mid-grey">New to RCM or need a structured refresher on the fundamentals.</p>
                </div>
                <div className="p-4 bg-off-white rounded-lg">
                  <h4 className="font-semibold text-slate-navy mb-2">Maintenance Managers</h4>
                  <p className="text-sm text-mid-grey">Want to understand RCM to support implementation in your teams.</p>
                </div>
                <div className="p-4 bg-off-white rounded-lg">
                  <h4 className="font-semibold text-slate-navy mb-2">Asset Managers</h4>
                  <p className="text-sm text-mid-grey">Need to make evidence-based decisions about maintenance strategy.</p>
                </div>
                <div className="p-4 bg-off-white rounded-lg">
                  <h4 className="font-semibold text-slate-navy mb-2">Operations Personnel</h4>
                  <p className="text-sm text-mid-grey">Involved in RCM analysis teams and want to contribute effectively.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {isLoaded && <CourseProgress />}

              {/* Quick links */}
              <div className="bg-white rounded-xl shadow-sm border border-light-grey p-6">
                <h3 className="font-heading font-semibold text-lg text-slate-navy mb-4">Related Resources</h3>
                <div className="space-y-3">
                  <Link href="/tools/rcm-decision-diagram" className="flex items-center gap-3 text-mid-grey hover:text-deep-teal transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                    </svg>
                    <span className="text-sm">RCM Decision Diagram Tool</span>
                  </Link>
                  <Link href="/products" className="flex items-center gap-3 text-mid-grey hover:text-deep-teal transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-sm">RCM Templates & Tools</span>
                  </Link>
                  <Link href="/training/rcm-practitioner" className="flex items-center gap-3 text-mid-grey hover:text-deep-teal transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                    <span className="text-sm">RCM Practitioner Certification</span>
                  </Link>
                </div>
              </div>

              {/* Certificate preview */}
              <div className="bg-gradient-to-br from-deep-teal to-slate-navy rounded-xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Earn Your Certificate</h3>
                <p className="text-sm text-white/80">
                  Complete all 5 lessons and quizzes to earn your RCM Fundamentals completion certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
