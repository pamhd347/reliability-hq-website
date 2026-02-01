'use client';

import { useState, useEffect, useCallback } from 'react';
import { lessons } from '@/data/rcm-fundamentals';

const STORAGE_KEY = 'rcm-fundamentals-progress';

export interface CourseProgressData {
  completedLessons: number[];
  completedQuizzes: number[];
  quizScores: Record<number, number>;
  startedAt?: string;
  completedAt?: string;
}

const defaultProgress: CourseProgressData = {
  completedLessons: [],
  completedQuizzes: [],
  quizScores: {},
};

export function useCourseProgress() {
  const [progress, setProgress] = useState<CourseProgressData>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProgress(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse course progress', e);
        }
      }
      setIsLoaded(true);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: CourseProgressData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    }
    setProgress(newProgress);
  }, []);

  // Mark a lesson as completed (reading done)
  const completeLesson = useCallback((lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      
      const newProgress: CourseProgressData = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        startedAt: prev.startedAt || new Date().toISOString(),
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // Mark a quiz as completed with score
  const completeQuiz = useCallback((lessonId: number, score: number) => {
    setProgress((prev) => {
      const newQuizScores = { ...prev.quizScores, [lessonId]: score };
      const newCompletedQuizzes = prev.completedQuizzes.includes(lessonId)
        ? prev.completedQuizzes
        : [...prev.completedQuizzes, lessonId];
      
      // Check if course is now complete
      const allLessonsDone = lessons.every((l) => 
        prev.completedLessons.includes(l.id) || l.id === lessonId
      );
      const allQuizzesDone = lessons.every((l) => 
        newCompletedQuizzes.includes(l.id)
      );
      
      const newProgress: CourseProgressData = {
        ...prev,
        completedQuizzes: newCompletedQuizzes,
        quizScores: newQuizScores,
        completedAt: allLessonsDone && allQuizzesDone ? new Date().toISOString() : prev.completedAt,
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    setProgress(defaultProgress);
  }, []);

  // Calculate overall progress percentage
  const totalItems = lessons.length * 2; // lessons + quizzes
  const completedItems = progress.completedLessons.length + progress.completedQuizzes.length;
  const overallProgress = Math.round((completedItems / totalItems) * 100);

  // Check if course is complete
  const isComplete = progress.completedLessons.length === lessons.length && 
                     progress.completedQuizzes.length === lessons.length;

  // Get next incomplete lesson
  const getNextIncompleteLesson = useCallback(() => {
    for (const lesson of lessons) {
      if (!progress.completedLessons.includes(lesson.id) || 
          !progress.completedQuizzes.includes(lesson.id)) {
        return lesson;
      }
    }
    return null;
  }, [progress]);

  return {
    progress,
    isLoaded,
    completedLessons: progress.completedLessons,
    completedQuizzes: progress.completedQuizzes,
    quizScores: progress.quizScores,
    overallProgress,
    isComplete,
    completeLesson,
    completeQuiz,
    resetProgress,
    getNextIncompleteLesson,
  };
}
