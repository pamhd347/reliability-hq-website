'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  getPractitionerLesson, 
  getNextPractitionerLesson, 
  getPreviousPractitionerLesson, 
  practitionerLessons 
} from '@/data/rcm-practitioner';
import { hasPractitionerSlides, getPractitionerSlides } from '@/data/rcm-practitioner-slides';
import { usePractitionerProgress } from '@/hooks/usePractitionerProgress';
import PractitionerQuiz from '@/components/PractitionerQuiz';
import SlideViewer from '@/components/SlideViewer';

export default function PractitionerLessonPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const lesson = getPractitionerLesson(slug);
  const { 
    isLoaded, 
    completedLessons, 
    completedQuizzes, 
    quizScores,
    overallProgress,
    isReadyForFinalExam,
    isCertified,
    completeLesson, 
    completeQuiz,
    completeFinalExam,
  } = usePractitionerProgress();

  const [showQuiz, setShowQuiz] = useState(false);
  const [hasMarkedComplete, setHasMarkedComplete] = useState(false);
  const [activeTab, setActiveTab] = useState<'lesson' | 'exercises'>('lesson');
  const [slidesCompleted, setSlidesCompleted] = useState(false);

  const nextLesson = lesson ? getNextPractitionerLesson(lesson.id) : undefined;
  const prevLesson = lesson ? getPreviousPractitionerLesson(lesson.id) : undefined;

  const isLessonComplete = lesson ? completedLessons.includes(lesson.id) : false;
  const isQuizComplete = lesson ? completedQuizzes.includes(lesson.id) : false;

  // Check if this lesson has slides
  const lessonHasSlides = lesson ? hasPractitionerSlides(lesson.id) : false;
  const slides = lesson ? getPractitionerSlides(lesson.id) : undefined;

  // Mark lesson as complete (for regular content after 10s, for slides after completion)
  useEffect(() => {
    if (lesson && isLoaded && !hasMarkedComplete) {
      if (lessonHasSlides) {
        // For slide-based lessons, mark complete when slides are done
        if (slidesCompleted) {
          completeLesson(lesson.id);
          setHasMarkedComplete(true);
        }
      } else {
        // For regular lessons, mark complete after 10 seconds
        const timer = setTimeout(() => {
          completeLesson(lesson.id);
          setHasMarkedComplete(true);
        }, 10000);
        return () => clearTimeout(timer);
      }
    }
  }, [lesson, isLoaded, completeLesson, hasMarkedComplete, lessonHasSlides, slidesCompleted]);

  const handleSlidesComplete = () => {
    setSlidesCompleted(true);
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-off-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-slate-navy mb-4">Module Not Found</h1>
          <Link href="/training/rcm-practitioner" className="text-deep-teal hover:underline">
            ← Back to Course
          </Link>
        </div>
      </div>
    );
  }

  // Check if this is the final assessment and user isn't ready
  if (lesson.id === 12 && !isReadyForFinalExam && isLoaded) {
    return (
      <div className="min-h-screen bg-off-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-industrial-amber/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <h1 className="font-heading text-3xl font-bold text-slate-navy mb-4">
              Complete All Modules First
            </h1>
            <p className="text-lg text-mid-grey mb-8">
              You must complete all 11 modules and their quizzes before taking the final assessment.
            </p>
            <Link 
              href="/training/rcm-practitioner" 
              className="inline-flex items-center gap-2 bg-deep-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-navy transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back to Course
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleQuizComplete = (score: number) => {
    if (lesson.id === 12) {
      completeFinalExam(score);
    } else {
      completeQuiz(lesson.id, score);
    }
  };

  // Parse markdown-like content to JSX
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let inCodeBlock = false;
    let codeContent: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-2 my-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-charcoal">{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
            <table className="w-full border-collapse border border-light-grey text-sm">
              <thead>
                <tr className="bg-off-white">
                  {tableRows[0].map((cell, i) => (
                    <th key={i} className="border border-light-grey px-4 py-2 text-left font-semibold text-slate-navy">
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-off-white/50'}>
                    {row.map((cell, j) => (
                      <td key={j} className="border border-light-grey px-4 py-2 text-charcoal">
                        {cell}
                      </td>
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

    const flushCodeBlock = () => {
      if (codeContent.length > 0) {
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-slate-navy text-gray-200 p-4 rounded-lg overflow-x-auto my-4 text-sm">
            <code>{codeContent.join('\n')}</code>
          </pre>
        );
        codeContent = [];
        inCodeBlock = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code block handling
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
        } else {
          flushList();
          inCodeBlock = true;
        }
        continue;
      }
      
      if (inCodeBlock) {
        codeContent.push(line);
        continue;
      }
      
      // Skip empty lines
      if (!line.trim()) {
        flushList();
        continue;
      }

      // Table handling
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

      // Blockquote handling
      if (line.startsWith('>')) {
        flushList();
        const quoteContent = line.replace(/^>\s*/, '');
        elements.push(
          <blockquote key={`quote-${elements.length}`} className="border-l-4 border-deep-teal bg-deep-teal/5 pl-4 py-3 my-4 italic text-charcoal">
            {quoteContent}
          </blockquote>
        );
        continue;
      }

      // Headers
      if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={`h2-${elements.length}`} className="font-heading text-2xl font-bold text-slate-navy mt-10 mb-4">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={`h3-${elements.length}`} className="font-heading text-xl font-semibold text-deep-teal mt-8 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('---')) {
        flushList();
        elements.push(<hr key={`hr-${elements.length}`} className="my-8 border-light-grey" />);
      } else if (line.startsWith('- ')) {
        currentList.push(line.replace('- ', ''));
      } else if (line.match(/^\d+\. /)) {
        currentList.push(line.replace(/^\d+\. /, ''));
      } else {
        flushList();
        // Process inline formatting
        let text = line;
        
        // Bold
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-navy">$1</strong>');
        
        // Italic
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        // Links
        text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-deep-teal hover:underline">$1</a>');
        
        // Inline code
        text = text.replace(/`(.+?)`/g, '<code class="bg-off-white px-1.5 py-0.5 rounded text-sm font-mono text-slate-navy">$1</code>');
        
        elements.push(
          <p 
            key={`p-${elements.length}`} 
            className="text-charcoal leading-relaxed my-4"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        );
      }
    }

    flushList();
    flushTable();
    flushCodeBlock();
    return elements;
  };

  return (
    <div className="min-h-screen bg-off-white">
      {/* Top navigation bar */}
      <div className="bg-white border-b border-light-grey sticky top-0 z-40">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link 
              href="/training/rcm-practitioner" 
              className="flex items-center gap-2 text-mid-grey hover:text-deep-teal transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              <span className="text-sm font-medium">Back to Course</span>
            </Link>

            {/* Progress indicators */}
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-1">
                {practitionerLessons.map((l) => {
                  const complete = completedLessons.includes(l.id) && completedQuizzes.includes(l.id);
                  const current = l.id === lesson.id;
                  return (
                    <Link
                      key={l.id}
                      href={`/training/rcm-practitioner/${l.slug}`}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                        complete
                          ? 'bg-green-500 text-white'
                          : current
                            ? 'bg-deep-teal text-white'
                            : 'bg-light-grey text-mid-grey hover:bg-mid-grey hover:text-white'
                      }`}
                      title={l.title}
                    >
                      {complete ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        l.id
                      )}
                    </Link>
                  );
                })}
              </div>
              <span className="text-sm text-mid-grey">{overallProgress}%</span>
            </div>

            <div className="text-sm text-mid-grey">
              Module {lesson.id} of {practitionerLessons.length}
            </div>
          </div>
        </div>
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Lesson header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="bg-slate-navy text-white text-sm font-medium px-3 py-1 rounded-full">
                Module {lesson.id}
              </span>
              <span className="text-mid-grey text-sm">{lesson.duration}</span>
              {isLessonComplete && isQuizComplete && (
                <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  Completed
                </span>
              )}
              {lesson.id === 12 && isCertified && (
                <span className="bg-industrial-amber text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                  </svg>
                  Certified
                </span>
              )}
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-slate-navy mb-2">
              {lesson.title}
            </h1>
            <p className="text-lg text-mid-grey">{lesson.subtitle}</p>
          </div>

          {/* Tab navigation for lessons with exercises */}
          {(lesson.expertTips || lesson.commonMistakes || lesson.reflectionPrompts) && lesson.id !== 12 && (
            <div className="flex gap-1 mb-6 bg-light-grey p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('lesson')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'lesson' 
                    ? 'bg-white text-slate-navy shadow-sm' 
                    : 'text-mid-grey hover:text-charcoal'
                }`}
              >
                Lesson Content
              </button>
              <button
                onClick={() => setActiveTab('exercises')}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'exercises' 
                    ? 'bg-white text-slate-navy shadow-sm' 
                    : 'text-mid-grey hover:text-charcoal'
                }`}
              >
                Tips & Exercises
              </button>
            </div>
          )}

          {/* Main content */}
          {activeTab === 'lesson' && (
            <>
              {/* Slide-based content */}
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

              {/* Key Takeaways - show after slides are completed or for non-slide lessons */}
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
            </>
          )}

          {/* Exercises tab content */}
          {activeTab === 'exercises' && (
            <div className="space-y-8 mb-8">
              {/* Expert Tips */}
              {lesson.expertTips && lesson.expertTips.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-light-grey p-6 md:p-8">
                  <h3 className="font-heading text-xl font-bold text-slate-navy mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                    Expert Tips
                  </h3>
                  <ul className="space-y-3">
                    {lesson.expertTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 bg-industrial-amber/5 p-4 rounded-lg">
                        <span className="text-industrial-amber font-bold">💡</span>
                        <span className="text-charcoal">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistakes */}
              {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-light-grey p-6 md:p-8">
                  <h3 className="font-heading text-xl font-bold text-slate-navy mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    Common Mistakes to Avoid
                  </h3>
                  <ul className="space-y-3">
                    {lesson.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-3 bg-red-50 p-4 rounded-lg border border-red-100">
                        <span className="text-red-500 font-bold">⚠️</span>
                        <span className="text-charcoal">{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Reflection Prompts */}
              {lesson.reflectionPrompts && lesson.reflectionPrompts.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-light-grey p-6 md:p-8">
                  <h3 className="font-heading text-xl font-bold text-slate-navy mb-4 flex items-center gap-2">
                    <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                    Reflection Prompts
                  </h3>
                  <p className="text-mid-grey mb-4">Think about your own facility and experience:</p>
                  <ul className="space-y-3">
                    {lesson.reflectionPrompts.map((prompt, index) => (
                      <li key={index} className="flex items-start gap-3 bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <span className="text-purple-500 font-bold">{index + 1}.</span>
                        <span className="text-charcoal">{prompt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Quiz section */}
          <div className="mb-8">
            {!showQuiz && !isQuizComplete ? (
              <div className="bg-white rounded-xl shadow-sm border border-light-grey p-8 text-center">
                <div className="w-16 h-16 bg-industrial-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-slate-navy mb-2">
                  {lesson.id === 12 ? 'Ready for Final Assessment?' : 'Test Your Knowledge'}
                </h3>
                <p className="text-mid-grey mb-6">
                  {lesson.id === 12 
                    ? `This comprehensive assessment covers all modules. You need 80% (28/35) to pass and earn your certificate.`
                    : `Take a quiz to reinforce what you've learned in this module.`
                  }
                </p>
                <button
                  onClick={() => setShowQuiz(true)}
                  className="bg-deep-teal text-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-navy transition-colors"
                >
                  {lesson.id === 12 ? 'Start Final Assessment' : 'Start Quiz'}
                </button>
              </div>
            ) : (
              <PractitionerQuiz
                questions={lesson.quiz}
                lessonId={lesson.id}
                onComplete={handleQuizComplete}
                isCompleted={isQuizComplete}
                previousScore={quizScores[lesson.id]}
                isFinalExam={lesson.id === 12}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            {prevLesson ? (
              <Link
                href={`/training/rcm-practitioner/${prevLesson.slug}`}
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
                href={`/training/rcm-practitioner/${nextLesson.slug}`}
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
            ) : isCertified ? (
              <Link
                href="/training/rcm-practitioner/certificate"
                className="flex items-center gap-2 px-6 py-3 bg-industrial-amber rounded-lg text-white hover:bg-orange-600 transition-colors"
              >
                <div className="text-right">
                  <div className="text-xs text-white/70">Congratulations!</div>
                  <div className="font-medium text-sm">Get Your Certificate</div>
                </div>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
