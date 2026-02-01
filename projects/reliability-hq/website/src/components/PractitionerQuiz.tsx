'use client';

import { useState } from 'react';
import type { QuizQuestion } from '@/data/rcm-practitioner';

interface PractitionerQuizProps {
  questions: QuizQuestion[];
  lessonId: number;
  onComplete: (score: number) => void;
  isCompleted: boolean;
  previousScore?: number;
  isFinalExam?: boolean;
}

export default function PractitionerQuiz({ 
  questions, 
  lessonId, 
  onComplete, 
  isCompleted, 
  previousScore,
  isFinalExam = false 
}: PractitionerQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [isFinished, setIsFinished] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const question = questions[currentQuestion];
  const isCorrect = selectedAnswer === question.correctIndex;
  
  const passingScore = isFinalExam ? 80 : 60;

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz finished
      const correctCount = answers.filter((a, i) => a === questions[i].correctIndex).length + 
                          (isCorrect ? 1 : 0);
      const score = Math.round((correctCount / questions.length) * 100);
      setIsFinished(true);
      onComplete(score);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswers(new Array(questions.length).fill(null));
    setIsFinished(false);
    setRetrying(true);
  };

  // Calculate final score for display
  const calculateFinalScore = () => {
    if (!isFinished) return previousScore || 0;
    const correctCount = answers.filter((a, i) => a === questions[i].correctIndex).length;
    return Math.round((correctCount / questions.length) * 100);
  };

  // Show completion state
  if ((isCompleted && !retrying) || isFinished) {
    const finalScore = calculateFinalScore();
    const passed = finalScore >= passingScore;

    // For final exam, show detailed results
    if (isFinalExam && isFinished) {
      const correctAnswers = answers.filter((a, i) => a === questions[i].correctIndex).length;
      const incorrectQuestions = questions
        .map((q, i) => ({ question: q, index: i, userAnswer: answers[i] }))
        .filter(item => item.userAnswer !== item.question.correctIndex);

      return (
        <div className="bg-white rounded-xl border border-light-grey overflow-hidden">
          {/* Results Header */}
          <div className={`p-8 text-center ${passed ? 'bg-green-50' : 'bg-amber-50'}`}>
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              passed ? 'bg-green-100' : 'bg-amber-100'
            }`}>
              {passed ? (
                <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-12 h-12 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              )}
            </div>
            
            <h2 className="font-heading text-3xl font-bold text-slate-navy mb-2">
              {passed ? '🎉 Congratulations!' : 'Not Quite There Yet'}
            </h2>
            
            <div className="text-5xl font-heading font-bold my-4">
              <span className={passed ? 'text-green-600' : 'text-amber-600'}>{finalScore}%</span>
            </div>
            
            <p className="text-lg text-charcoal mb-2">
              You answered <span className="font-bold">{correctAnswers}</span> of <span className="font-bold">{questions.length}</span> questions correctly
            </p>
            
            <p className="text-mid-grey">
              {passed 
                ? 'You\'ve demonstrated RCM practitioner competency!' 
                : `You needed ${passingScore}% to pass. Review the areas below and try again.`}
            </p>
          </div>

          {/* Areas for Improvement (if not passed) */}
          {!passed && incorrectQuestions.length > 0 && (
            <div className="p-6 border-t border-light-grey">
              <h3 className="font-heading text-lg font-bold text-slate-navy mb-4">
                Areas for Improvement
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {incorrectQuestions.slice(0, 10).map((item, idx) => (
                  <div key={idx} className="bg-red-50 border border-red-100 rounded-lg p-4">
                    <p className="font-medium text-slate-navy mb-2">
                      Q{item.index + 1}: {item.question.question}
                    </p>
                    <p className="text-sm text-red-600 mb-1">
                      Your answer: {item.question.options[item.userAnswer as number]}
                    </p>
                    <p className="text-sm text-green-600 mb-2">
                      Correct answer: {item.question.options[item.question.correctIndex]}
                    </p>
                    <p className="text-sm text-mid-grey">{item.question.explanation}</p>
                  </div>
                ))}
                {incorrectQuestions.length > 10 && (
                  <p className="text-sm text-mid-grey text-center">
                    ... and {incorrectQuestions.length - 10} more questions to review
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="p-6 border-t border-light-grey bg-off-white flex justify-center gap-4">
            {passed ? (
              <a
                href="/training/rcm-practitioner"
                className="px-6 py-3 bg-deep-teal text-white rounded-lg font-semibold hover:bg-slate-navy transition-colors"
              >
                Return to Course
              </a>
            ) : (
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-deep-teal text-white rounded-lg font-semibold hover:bg-slate-navy transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      );
    }

    // Regular quiz completion
    return (
      <div className="bg-white rounded-xl border border-light-grey p-8 text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
          passed ? 'bg-green-100' : 'bg-amber-100'
        }`}>
          {passed ? (
            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-amber-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          )}
        </div>
        
        <h3 className="font-heading text-2xl font-bold text-slate-navy mb-2">
          {passed ? 'Module Quiz Complete!' : 'Keep Learning!'}
        </h3>
        
        <p className="text-mid-grey mb-4">
          You scored <span className={`font-bold ${passed ? 'text-green-600' : 'text-amber-600'}`}>{finalScore}%</span>
          {passed ? ' — Great job!' : ' — Review the lesson and try again.'}
        </p>

        <div className="flex items-center justify-center gap-2 mb-6">
          {questions.map((_, i) => {
            const wasCorrect = answers[i] === questions[i].correctIndex;
            return (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  answers[i] === null ? 'bg-gray-200' : wasCorrect ? 'bg-green-500' : 'bg-red-400'
                }`}
              />
            );
          })}
        </div>

        <button
          onClick={handleRetry}
          className="text-deep-teal font-medium hover:underline"
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-light-grey overflow-hidden">
      {/* Header */}
      <div className="bg-off-white px-6 py-4 border-b border-light-grey">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-semibold text-slate-navy">
            {isFinalExam ? 'Final Assessment' : `Module ${lessonId} Quiz`}
          </h3>
          <span className="text-sm text-mid-grey">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-deep-teal transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        {/* Progress dots for smaller quizzes */}
        {questions.length <= 10 && (
          <div className="flex items-center gap-2 mt-3">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  i < currentQuestion
                    ? answers[i] === questions[i].correctIndex
                      ? 'bg-green-500'
                      : 'bg-red-400'
                    : i === currentQuestion
                      ? 'bg-deep-teal'
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Question */}
      <div className="p-6">
        <p className="font-medium text-lg text-slate-navy mb-6">{question.question}</p>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrectAnswer = index === question.correctIndex;
            
            let buttonStyle = 'border-light-grey hover:border-deep-teal hover:bg-off-white';
            if (showResult) {
              if (isCorrectAnswer) {
                buttonStyle = 'border-green-500 bg-green-50';
              } else if (isSelected && !isCorrect) {
                buttonStyle = 'border-red-400 bg-red-50';
              }
            } else if (isSelected) {
              buttonStyle = 'border-deep-teal bg-deep-teal/5';
            }

            return (
              <button
                key={index}
                onClick={() => !showResult && setSelectedAnswer(index)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${buttonStyle}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    showResult && isCorrectAnswer
                      ? 'border-green-500 bg-green-500'
                      : showResult && isSelected && !isCorrect
                        ? 'border-red-400 bg-red-400'
                        : isSelected
                          ? 'border-deep-teal bg-deep-teal'
                          : 'border-gray-300'
                  }`}>
                    {((showResult && isCorrectAnswer) || (isSelected && !showResult)) && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <span className="text-charcoal">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Result feedback */}
        {showResult && (
          <div className={`mt-6 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              )}
              <div>
                <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite right'}
                </p>
                <p className="text-sm text-gray-600 mt-1">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end">
          {!showResult ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                selectedAnswer === null
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-deep-teal text-white hover:bg-slate-navy'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-lg font-semibold bg-deep-teal text-white hover:bg-slate-navy transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
