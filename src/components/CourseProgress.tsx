'use client';

import Link from 'next/link';
import { useCourseProgress } from '@/hooks/useCourseProgress';
import { lessons } from '@/data/rcm-fundamentals';

export default function CourseProgress() {
  const { progress, completedLessons, completedQuizzes, overallProgress } = useCourseProgress();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-light-grey p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-slate-navy">Your Progress</h3>
        <span className="text-deep-teal font-semibold">{overallProgress}%</span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-light-grey rounded-full h-3 mb-6">
        <div 
          className="bg-deep-teal h-3 rounded-full transition-all duration-500"
          style={{ width: `${overallProgress}%` }}
        />
      </div>

      {/* Lesson List */}
      <div className="space-y-3">
        {lessons.map((lesson) => {
          const lessonComplete = completedLessons.includes(lesson.id);
          const quizComplete = completedQuizzes.includes(lesson.id);
          const isFullyComplete = lessonComplete && quizComplete;
          
          return (
            <Link
              key={lesson.id}
              href={`/training/rcm-fundamentals/${lesson.slug}`}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isFullyComplete 
                  ? 'bg-green-50 hover:bg-green-100' 
                  : 'bg-off-white hover:bg-light-grey'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                isFullyComplete 
                  ? 'bg-green-500 text-white' 
                  : lessonComplete 
                    ? 'bg-industrial-amber text-white'
                    : 'bg-light-grey text-mid-grey'
              }`}>
                {isFullyComplete ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <span className="font-semibold text-sm">{lesson.id}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${isFullyComplete ? 'text-green-700' : 'text-slate-navy'}`}>
                  {lesson.title}
                </p>
                <p className="text-xs text-mid-grey">
                  {lessonComplete && !quizComplete && 'Quiz pending'}
                  {isFullyComplete && 'Completed'}
                  {!lessonComplete && lesson.duration}
                </p>
              </div>
              <svg className="w-5 h-5 text-mid-grey flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          );
        })}
      </div>

      {/* Certificate Link */}
      {overallProgress === 100 && (
        <div className="mt-6 pt-6 border-t border-light-grey">
          <Link
            href="/training/certificate"
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-deep-teal to-slate-navy rounded-lg text-white hover:opacity-90 transition-opacity"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
              </svg>
            </div>
            <div>
              <p className="font-semibold">Claim Your Certificate!</p>
              <p className="text-sm text-white/80">You&apos;ve completed all lessons</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
