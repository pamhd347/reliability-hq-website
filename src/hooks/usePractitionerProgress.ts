'use client';

import { useState, useEffect, useCallback } from 'react';
import { practitionerLessons } from '@/data/rcm-practitioner';

const STORAGE_KEY = 'rcm-practitioner-progress';
const EXERCISES_KEY = 'rcm-practitioner-exercises';

export interface PractitionerProgressData {
  completedLessons: number[];
  completedQuizzes: number[];
  quizScores: Record<number, number>;
  startedAt?: string;
  completedAt?: string;
  certificateIssued?: boolean;
  finalExamScore?: number;
  finalExamPassed?: boolean;
}

export interface ExerciseData {
  lessonId: number;
  exerciseId: string;
  response: string | number | string[];
  savedAt: string;
}

const defaultProgress: PractitionerProgressData = {
  completedLessons: [],
  completedQuizzes: [],
  quizScores: {},
};

export function usePractitionerProgress() {
  const [progress, setProgress] = useState<PractitionerProgressData>(defaultProgress);
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setProgress(JSON.parse(stored));
        } catch (e) {
          console.error('Failed to parse practitioner progress', e);
        }
      }
      
      const storedExercises = localStorage.getItem(EXERCISES_KEY);
      if (storedExercises) {
        try {
          setExercises(JSON.parse(storedExercises));
        } catch (e) {
          console.error('Failed to parse exercise data', e);
        }
      }
      
      setIsLoaded(true);
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: PractitionerProgressData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    }
    setProgress(newProgress);
  }, []);

  // Save exercise data
  const saveExercise = useCallback((lessonId: number, exerciseId: string, response: string | number | string[]) => {
    setExercises((prev) => {
      const filtered = prev.filter(e => !(e.lessonId === lessonId && e.exerciseId === exerciseId));
      const newExercises = [...filtered, {
        lessonId,
        exerciseId,
        response,
        savedAt: new Date().toISOString(),
      }];
      if (typeof window !== 'undefined') {
        localStorage.setItem(EXERCISES_KEY, JSON.stringify(newExercises));
      }
      return newExercises;
    });
  }, []);

  // Get exercise response
  const getExerciseResponse = useCallback((lessonId: number, exerciseId: string) => {
    return exercises.find(e => e.lessonId === lessonId && e.exerciseId === exerciseId)?.response;
  }, [exercises]);

  // Mark a lesson as completed (reading done)
  const completeLesson = useCallback((lessonId: number) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      
      const newProgress: PractitionerProgressData = {
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
      
      // Check if course is now complete (excluding final assessment from regular completion)
      const regularLessons = practitionerLessons.filter(l => l.id !== 12);
      const allLessonsDone = regularLessons.every((l) => 
        prev.completedLessons.includes(l.id) || l.id === lessonId
      );
      const allQuizzesDone = regularLessons.every((l) => 
        newCompletedQuizzes.includes(l.id)
      );
      
      const newProgress: PractitionerProgressData = {
        ...prev,
        completedQuizzes: newCompletedQuizzes,
        quizScores: newQuizScores,
        completedAt: allLessonsDone && allQuizzesDone ? new Date().toISOString() : prev.completedAt,
      };
      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // Complete final exam
  const completeFinalExam = useCallback((score: number) => {
    const passed = score >= 80;
    setProgress((prev) => {
      const newProgress: PractitionerProgressData = {
        ...prev,
        finalExamScore: score,
        finalExamPassed: passed,
        completedQuizzes: prev.completedQuizzes.includes(12) 
          ? prev.completedQuizzes 
          : [...prev.completedQuizzes, 12],
        quizScores: { ...prev.quizScores, 12: score },
        certificateIssued: passed,
      };
      saveProgress(newProgress);
      return newProgress;
    });
    return passed;
  }, [saveProgress]);

  // Reset all progress
  const resetProgress = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(EXERCISES_KEY);
    }
    setProgress(defaultProgress);
    setExercises([]);
  }, []);

  // Calculate overall progress percentage (modules 1-11 + final exam)
  const totalItems = practitionerLessons.length * 2; // lessons + quizzes
  const completedItems = progress.completedLessons.length + progress.completedQuizzes.length;
  const overallProgress = Math.round((completedItems / totalItems) * 100);

  // Check if course is complete (all lessons and quizzes including final)
  const isComplete = progress.completedLessons.length === practitionerLessons.length && 
                     progress.completedQuizzes.length === practitionerLessons.length;

  // Check if ready for final exam (modules 1-11 complete)
  const regularLessons = practitionerLessons.filter(l => l.id !== 12);
  const isReadyForFinalExam = regularLessons.every(l => 
    progress.completedLessons.includes(l.id) && progress.completedQuizzes.includes(l.id)
  );

  // Check if certified (passed final exam)
  const isCertified = progress.finalExamPassed === true;

  // Get next incomplete lesson
  const getNextIncompleteLesson = useCallback(() => {
    for (const lesson of practitionerLessons) {
      if (!progress.completedLessons.includes(lesson.id) || 
          !progress.completedQuizzes.includes(lesson.id)) {
        return lesson;
      }
    }
    return null;
  }, [progress]);

  // Get lesson status
  const getLessonStatus = useCallback((lessonId: number) => {
    const lessonComplete = progress.completedLessons.includes(lessonId);
    const quizComplete = progress.completedQuizzes.includes(lessonId);
    const quizScore = progress.quizScores[lessonId];
    
    return {
      lessonComplete,
      quizComplete,
      quizScore,
      fullyComplete: lessonComplete && quizComplete,
    };
  }, [progress]);

  return {
    progress,
    exercises,
    isLoaded,
    completedLessons: progress.completedLessons,
    completedQuizzes: progress.completedQuizzes,
    quizScores: progress.quizScores,
    overallProgress,
    isComplete,
    isReadyForFinalExam,
    isCertified,
    finalExamScore: progress.finalExamScore,
    completeLesson,
    completeQuiz,
    completeFinalExam,
    resetProgress,
    getNextIncompleteLesson,
    getLessonStatus,
    saveExercise,
    getExerciseResponse,
  };
}
