'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getLesson, getNextLesson, getPreviousLesson, lessons } from '@/data/rcm-fundamentals';
import { hasSlides, getSlides } from '@/data/rcm-fundamentals-slides';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import Quiz from '@/components/Quiz';
import SlideViewer from '@/components/SlideViewer';
import ProtectedRoute from '@/components/ProtectedRoute';

function LessonContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const lesson = getLesson(slug);
  const { 
    isLoaded, 
    completedLessons, 
    completedQuizzes, 
    quizScores,
    overallProgress,
    completeLesson, 
    completeQuiz 
  } = useCourseProgress();

  const [showQuiz, setShowQuiz] = useState(false);
  const [hasMarkedComplete, setHasMarkedComplete] = useState(false);
  const [slidesCompleted, setSlidesCompleted] = useState(false);

  const nextLesson = lesson ? getNextLesson(lesson.id) : undefined;
  const prevLesson = lesson ? getPreviousLesson(lesson.id) : undefined;

  const isLessonComplete = lesson ? completedLessons.includes(lesson.id) : false;
  const isQuizComplete = lesson ? completedQuizzes.includes(lesson.id) : false;

  // Check if this lesson has slides
  const lessonHasSlides = lesson ? hasSlides(lesson.id) : false;
  const slides = lesson ? getSlides(lesson.id) : undefined;

  // Mark lesson as complete (for regular content after 5s, for slides after completion)
  useEffect(() => {
    if (lesson && isLoaded && !hasMarkedComplete) {
      if (lessonHasSlides) {
        // For slide-based lessons, mark complete when slides are done
        if (slidesCompleted) {
          completeLesson(lesson.id);
          setHasMarkedComplete(true);
        }
      } else {
        // For regular lessons, mark complete after 5 seconds
        const timer = setTimeout(() => {
          completeLesson(lesson.id);
          setHasMarkedComplete(true);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [lesson, isLoaded, completeLesson, hasMarkedComplete, lessonHasSlides, slidesCompleted]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-slate-navy mb-4">Lesson Not Found</h1>
          <Link href="/training/rcm-fundamentals" className="text-deep-teal hover:underline">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (score: number) => {
    completeQuiz(lesson.id, score);
  };

  const handleSlidesComplete = () => {
    setSlidesCompleted(true);
  };

  // Process inline markdown formatting
  const processInlineMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-navy">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-deep-teal hover:underline">$1</a>');
  };

  // Parse markdown-like content to JSX (for non-slide lessons)
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let isNumberedList = false;
    let inTable = false;
    let tableRows: string[][] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        if (isNumberedList) {
          elements.push(
            <ol key={`list-${elements.length}`} className="list-decimal pl-6 space-y-2 my-4">
              {currentList.map((item, i) => (
                <li 
                  key={i} 
                  className="text-charcoal"
                  dangerouslySetInnerHTML={{ __html: processInlineMarkdown(item) }}
                />
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-2 my-4">
              {currentList.map((item, i) => (
                <li 
                  key={i} 
                  className="text-charcoal"
                  dangerouslySetInnerHTML={{ __html: processInlineMarkdown(item) }}
                />
              ))}
            </ul>
          );
        }
        currentList = [];
        isNumberedList = false;
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-light-grey">
              <thead>
                <tr className="bg-off-white">
                  {tableRows[0].map((cell, i) => (
                    <th 
                      key={i} 
                      className="border border-light-grey px-4 py-2 text-left font-semibold text-slate-navy"
                      dangerouslySetInnerHTML={{ __html: processInlineMarkdown(cell) }}
                    />
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td 
                        key={j} 
                        className="border border-light-grey px-4 py-2 text-charcoal"
                        dangerouslySetInnerHTML={{ __html: processInlineMarkdown(cell) }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (!line.trim()) {
        flushList();
        continue;
      }

      if (line.startsWith('|')) {
        if (!inTable) inTable = true;
        const cells = line.split('|').filter(c => c.trim()).map(c => c.trim());
        if (!line.includes('---')) {
          tableRows.push(cells);
        }
        continue;
      } else if (inTable) {
        flushTable();
      }

      if (line.startsWith('## ')) {
        flushList();
        const headerText = line.replace('## ', '');
        elements.push(
          <h2 
            key={`h2-${elements.length}`} 
            className="font-heading text-2xl font-bold text-slate-navy mt-10 mb-4"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(headerText) }}
          />
        );
      } else if (line.startsWith('### ')) {
        flushList();
        const headerText = line.replace('### ', '');
        elements.push(
          <h3 
            key={`h3-${elements.length}`} 
            className="font-heading text-xl font-semibold text-deep-teal mt-8 mb-3"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(headerText) }}
          />
        );
      } else if (line.startsWith('---')) {
        flushList();
        elements.push(<hr key={`hr-${elements.length}`} className="my-8 border-light-grey" />);
      } else if (line.startsWith('- ')) {
        currentList.push(line.replace('- ', ''));
      } else if (line.match(/^\d+\. /)) {
        if (currentList.length === 0) isNumberedList = true;
        currentList.push(line.replace(/^\d+\. /, ''));
      } else {
        flushList();
        elements.push(
          <p 
            key={`p-${elements.length}`} 
            className="text-charcoal leading-relaxed my-4"
            dangerouslySetInnerHTML={{ __html: processInlineMarkdown(line) }}
          />
        );
      }
    }

    flushList();
    flushTable();
    return elements;
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-light-grey sticky top-0 z-40">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link 
              href="/training/rcm-fundamentals" 
              className="flex items-center gap-2 text-mid-grey hover:text-deep-teal transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span className="text-sm font-medium">Back to Course</span>
            </Link>

            {/* Progress bar */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-1">
                {lessons.map((l) => {
                  const complete = completedLessons.includes(l.id) && completedQuizzes.includes(l.id);
                  const current = l.id === lesson.id;
                  return (
                    <Link
                      key={l.id}
                      href={`/training/rcm-fundamentals/${l.slug}`}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        complete
                          ? 'bg-green-500 text-white'
                          : current
                            ? 'bg-deep-teal text-white'
                            : 'bg-light-grey text-mid-grey hover:bg-mid-grey hover:text-white'
                      }`}
                    >
                      {complete ? (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        l.id
                      )}
                    </Link>
                  );
                })}
              </div>
              <span className="text-sm text-mid-grey">{overallProgress}% complete</span>
            </div>

            <div className="text-sm text-mid-grey">
              Lesson {lesson.id} of {lessons.length}
            </div>
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Lesson header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="bg-deep-teal/10 text-deep-teal text-sm font-medium px-3 py-1 rounded-full">
                Lesson {lesson.id}
              </span>
              <span className="text-mid-grey text-sm">{lesson.duration}</span>
              {lessonHasSlides && (
                <span className="bg-industrial-amber/10 text-industrial-amber text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                  </svg>
                  Interactive
                </span>
              )}
              {isLessonComplete && isQuizComplete && (
                <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Completed
                </span>
              )}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy mb-2">
              {lesson.title}
            </h1>
            <p className="text-lg text-mid-grey">{lesson.subtitle}</p>
          </div>

          {/* Main content - either slides or traditional */}
          {lessonHasSlides && slides ? (
            <div className="mb-8">
              <SlideViewer 
                slides={slides} 
                lessonTitle={lesson.title}
                onComplete={handleSlidesComplete}
              />
            </div>
          ) : (
            <article className="bg-white rounded-xl shadow-sm border border-light-grey p-6 md:p-10 mb-8">
              <div className="prose max-w-none">
                {renderContent(lesson.content)}
              </div>
            </article>
          )}

          {/* Key Takeaways - shown after slides complete or for non-slide lessons */}
          {(!lessonHasSlides || slidesCompleted) && (
            <div className="bg-gradient-to-r from-deep-teal/10 to-slate-navy/10 rounded-xl p-6 md:p-8 mb-8 border border-deep-teal/20">
              <h3 className="font-heading text-xl font-bold text-slate-navy mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
                Key Takeaways
              </h3>
              <ul className="space-y-3">
                {lesson.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-charcoal">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quiz section - shown after slides complete or for non-slide lessons */}
          {(!lessonHasSlides || slidesCompleted) && (
            <div className="mb-8">
              {!showQuiz && !isQuizComplete ? (
                <div className="bg-white rounded-xl shadow-sm border border-light-grey p-8 text-center">
                  <div className="w-16 h-16 bg-industrial-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-slate-navy mb-2">Ready to Test Your Knowledge?</h3>
                  <p className="text-mid-grey mb-6">
                    Take a quick quiz to reinforce what you&apos;ve learned in this lesson.
                  </p>
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="bg-deep-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-navy transition-colors"
                  >
                    Start Quiz
                  </button>
                </div>
              ) : (
                <Quiz
                  questions={lesson.quiz}
                  lessonId={lesson.id}
                  onComplete={handleQuizComplete}
                  isCompleted={isQuizComplete}
                  previousScore={quizScores[lesson.id]}
                />
              )}
            </div>
          )}

          {/* Navigation - shown after slides complete or for non-slide lessons */}
          {(!lessonHasSlides || slidesCompleted) && (
            <div className="flex items-center justify-between gap-4">
              {prevLesson ? (
                <Link
                  href={`/training/rcm-fundamentals/${prevLesson.slug}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border border-light-grey text-charcoal hover:border-deep-teal hover:text-deep-teal transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-mid-grey">Previous</div>
                    <div className="font-medium text-sm">{prevLesson.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  href={`/training/rcm-fundamentals/${nextLesson.slug}`}
                  className="flex items-center gap-2 px-6 py-3 bg-deep-teal rounded-lg text-white hover:bg-slate-navy transition-colors"
                >
                  <div className="text-right">
                    <div className="text-xs text-white/70">Next</div>
                    <div className="font-medium text-sm">{nextLesson.title}</div>
                  </div>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ) : (
                <Link
                  href="/training/certificate"
                  className="flex items-center gap-2 px-6 py-3 bg-industrial-amber rounded-lg text-white hover:bg-orange-600 transition-colors"
                >
                  <div className="text-right">
                    <div className="text-xs text-white/70">Completed all lessons!</div>
                    <div className="font-medium text-sm">Get Your Certificate</div>
                  </div>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LessonPage() {
  return (
    <ProtectedRoute>
      <LessonContent />
    </ProtectedRoute>
  );
}
