'use client';

import Link from 'next/link';
import Button from '@/components/Button';
import { usePractitionerProgress } from '@/hooks/usePractitionerProgress';
import { practitionerLessons } from '@/data/rcm-practitioner';

export default function RCMPractitionerPage() {
  const { 
    isLoaded, 
    completedLessons, 
    completedQuizzes, 
    overallProgress, 
    isReadyForFinalExam,
    isCertified,
    getNextIncompleteLesson,
    getLessonStatus 
  } = usePractitionerProgress();

  const nextLesson = getNextIncompleteLesson();

  return (
    <div className="bg-off-white min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-navy to-deep-teal text-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full mb-6">
              <span className="text-white font-semibold text-sm">NOW AVAILABLE</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              RCM Practitioner Preparation
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-200 leading-relaxed">
              Become a confident RCM practitioner. Lead analyses with confidence, make better maintenance decisions, and transform your organisation&apos;s reliability approach.
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
                <span>10-12 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
                <span>Comprehensive Assessment</span>
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
                {isCertified ? (
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      Course Completed
                    </span>
                    <Button href="/training/rcm-practitioner/certificate" variant="secondary" size="lg">
                      View Certificate
                    </Button>
                  </div>
                ) : nextLesson ? (
                  <Button href={`/training/rcm-practitioner/${nextLesson.slug}`} variant="secondary" size="lg">
                    {overallProgress > 0 ? `Continue Learning (${overallProgress}%)` : 'Start Learning'} →
                  </Button>
                ) : (
                  <Button href="/training/rcm-practitioner/advanced-operating-context" variant="secondary" size="lg">
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
            {/* Progress overview (if started) */}
            {isLoaded && overallProgress > 0 && (
              <section className="bg-gradient-to-r from-deep-teal to-slate-navy rounded-xl shadow-sm p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-semibold text-lg">Your Progress</h3>
                  <span className="text-2xl font-bold">{overallProgress}%</span>
                </div>
                <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-industrial-amber transition-all duration-500"
                    style={{ width: `${overallProgress}%` }}
                  />
                </div>
                <div className="mt-4 flex justify-between text-sm text-white/70">
                  <span>{completedLessons.length} of {practitionerLessons.length} modules read</span>
                  <span>{completedQuizzes.length} of {practitionerLessons.length} quizzes passed</span>
                </div>
                {isReadyForFinalExam && !isCertified && (
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <Link 
                      href="/training/rcm-practitioner/final-assessment"
                      className="inline-flex items-center gap-2 bg-industrial-amber text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                      </svg>
                      Take Final Assessment
                    </Link>
                  </div>
                )}
              </section>
            )}

            {/* Course overview */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">About This Course</h2>
              <div className="prose max-w-none text-charcoal">
                <p>
                  The RCM Practitioner Preparation course takes you beyond the fundamentals to become a confident, 
                  competent RCM analyst. You&apos;ll learn to lead RCM analysis teams, navigate complex maintenance 
                  decisions, and implement sustainable reliability programs.
                </p>
                <p className="mt-4">
                  This comprehensive course covers the complete RCM methodology according to SAE JA1011 and 
                  Moubray&apos;s RCM II, with practical examples from pumps, motors, valves, heat exchangers, 
                  and instrumentation systems.
                </p>
              </div>
            </section>

            {/* What you'll learn */}
            <section className="bg-white rounded-xl shadow-sm border border-light-grey p-8">
              <h2 className="font-heading text-2xl font-bold text-slate-navy mb-6">What You&apos;ll Master</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  'Define operating context precisely across all dimensions',
                  'Write complete function statements with quantified standards',
                  'Identify all reasonably likely failure modes',
                  'Write comprehensive failure effect descriptions',
                  'Classify consequences correctly using the decision logic',
                  'Select appropriate proactive maintenance tasks',
                  'Apply failure-finding intervals for hidden failures',
                  'Facilitate RCM analysis sessions effectively',
                  'Implement RCM results and sustain living programs',
                  'Analyse complex equipment through interactive case studies',
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
                {practitionerLessons.map((lesson) => {
                  const status = getLessonStatus(lesson.id);
                  const isLocked = lesson.id === 12 && !isReadyForFinalExam;
                  
                  return (
                    <Link
                      key={lesson.id}
                      href={isLocked ? '#' : `/training/rcm-practitioner/${lesson.slug}`}
                      className={`block p-4 rounded-lg border-2 transition-all ${
                        isLocked 
                          ? 'border-light-grey bg-gray-50 cursor-not-allowed' 
                          : status.fullyComplete 
                            ? 'border-green-200 bg-green-50 hover:border-green-300' 
                            : 'border-light-grey bg-white hover:border-deep-teal hover:shadow-md'
                      }`}
                      onClick={(e) => isLocked && e.preventDefault()}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isLocked
                            ? 'bg-gray-200 text-gray-400'
                            : status.fullyComplete 
                              ? 'bg-green-500 text-white' 
                              : status.lessonComplete
                                ? 'bg-industrial-amber text-white'
                                : 'bg-deep-teal/10 text-deep-teal'
                        }`}>
                          {isLocked ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                          ) : status.fullyComplete ? (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                          ) : (
                            <span className="font-heading font-bold">{lesson.id}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className={`font-heading font-semibold ${isLocked ? 'text-gray-400' : 'text-slate-navy'}`}>
                              {lesson.title}
                            </h3>
                            <span className="text-sm text-mid-grey whitespace-nowrap">{lesson.duration}</span>
                          </div>
                          <p className={`text-sm ${isLocked ? 'text-gray-400' : 'text-mid-grey'}`}>{lesson.subtitle}</p>
                          
                          {/* Status badges */}
                          {!isLocked && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                status.lessonComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {status.lessonComplete ? '✓ Lesson' : 'Lesson'}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                status.quizComplete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                              }`}>
                                {status.quizComplete 
                                  ? `✓ Quiz ${status.quizScore ? `(${status.quizScore}%)` : ''}` 
                                  : lesson.id === 12 ? 'Final Exam' : 'Quiz'}
                              </span>
                            </div>
                          )}
                          {isLocked && (
                            <p className="text-xs text-gray-400 mt-2">
                              Complete all modules to unlock the final assessment
                            </p>
                          )}
                        </div>
                        {!isLocked && (
                          <svg className="w-5 h-5 text-mid-grey flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        )}
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
                  <p className="text-sm text-mid-grey">Looking to differentiate yourself with advanced RCM expertise.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Course info card */}
              <div className="bg-white rounded-xl shadow-sm border border-light-grey p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-heading font-bold text-slate-navy mb-1">Free Access</div>
                  <div className="text-sm text-mid-grey line-through">£399</div>
                  <div className="text-sm text-green-600 font-medium mt-1">Early Access Preview</div>
                </div>

                {isLoaded && (
                  <div className="mb-6">
                    {isCertified ? (
                      <Button href="/training/rcm-practitioner/certificate" className="w-full" variant="primary">
                        View Your Certificate
                      </Button>
                    ) : nextLesson ? (
                      <Button href={`/training/rcm-practitioner/${nextLesson.slug}`} className="w-full" variant="primary">
                        {overallProgress > 0 ? 'Continue Learning' : 'Start Learning'}
                      </Button>
                    ) : (
                      <Button href="/training/rcm-practitioner/advanced-operating-context" className="w-full" variant="primary">
                        Start Learning
                      </Button>
                    )}
                  </div>
                )}

                <div className="space-y-3 pt-6 border-t border-light-grey">
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    12 in-depth modules
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Interactive case studies
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    35-question final assessment
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Completion certificate
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Expert tips and exercises
                  </div>
                  <div className="flex items-center gap-2 text-sm text-charcoal">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Lifetime access
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

              {/* Certification info */}
              <div className="bg-gradient-to-br from-deep-teal to-slate-navy rounded-xl p-6 text-white">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">Earn Your Certificate</h3>
                <p className="text-sm text-white/80">
                  Complete all 12 modules and pass the final assessment (80%+) to earn your RCM Practitioner certificate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
