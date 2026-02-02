'use client';

import React, { useState, useEffect, useCallback } from 'react';

export interface Slide {
  id: number;
  title?: string;
  content: string;
  type?: 'intro' | 'concept' | 'example' | 'keypoint' | 'summary' | 'list';
  icon?: string;
}

interface SlideViewerProps {
  slides: Slide[];
  lessonTitle: string;
  onComplete?: () => void;
}

export default function SlideViewer({ slides, lessonTitle, onComplete }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSlides = slides.length;
  const slide = slides[currentSlide];
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  const goToSlide = useCallback((index: number, dir: 'next' | 'prev') => {
    if (isAnimating || index < 0 || index >= totalSlides) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 150);
  }, [isAnimating, totalSlides]);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1, 'next');
    } else if (onComplete) {
      onComplete();
    }
  }, [currentSlide, totalSlides, goToSlide, onComplete]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1, 'prev');
    }
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Process inline markdown
  const processMarkdown = (text: string): string => {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-slate-navy">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-deep-teal hover:underline">$1</a>')
      .replace(/`(.+?)`/g, '<code class="bg-off-white px-1.5 py-0.5 rounded text-sm font-mono text-slate-navy">$1</code>');
  };

  // Render slide content
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: string[] = [];
    let isNumberedList = false;

    const flushList = () => {
      if (currentList.length > 0) {
        if (isNumberedList) {
          elements.push(
            <ol key={`list-${elements.length}`} className="space-y-3 my-4">
              {currentList.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-deep-teal text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {i + 1}
                  </span>
                  <span 
                    className="text-charcoal pt-0.5"
                    dangerouslySetInnerHTML={{ __html: processMarkdown(item) }}
                  />
                </li>
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`list-${elements.length}`} className="space-y-3 my-4">
              {currentList.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-deep-teal flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span 
                    className="text-charcoal"
                    dangerouslySetInnerHTML={{ __html: processMarkdown(item) }}
                  />
                </li>
              ))}
            </ul>
          );
        }
        currentList = [];
        isNumberedList = false;
      }
    };

    for (const line of lines) {
      if (!line.trim()) {
        flushList();
        continue;
      }

      if (line.startsWith('- ')) {
        currentList.push(line.replace('- ', ''));
      } else if (line.match(/^\d+\. /)) {
        if (currentList.length === 0) isNumberedList = true;
        currentList.push(line.replace(/^\d+\. /, ''));
      } else {
        flushList();
        elements.push(
          <p 
            key={`p-${elements.length}`} 
            className="text-charcoal text-lg leading-relaxed my-4"
            dangerouslySetInnerHTML={{ __html: processMarkdown(line) }}
          />
        );
      }
    }

    flushList();
    return elements;
  };

  // Get type-based styling
  const getTypeStyles = (type?: string) => {
    switch (type) {
      case 'intro':
        return 'bg-gradient-to-br from-deep-teal to-slate-navy text-white';
      case 'keypoint':
        return 'bg-gradient-to-br from-industrial-amber/10 to-industrial-amber/5 border-2 border-industrial-amber/20';
      case 'summary':
        return 'bg-gradient-to-br from-slate-navy/5 to-deep-teal/5 border-2 border-deep-teal/20';
      default:
        return 'bg-white border border-light-grey';
    }
  };

  const getTypeIcon = (type?: string) => {
    switch (type) {
      case 'intro':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
        );
      case 'keypoint':
        return (
          <svg className="w-8 h-8 text-industrial-amber" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        );
      case 'summary':
        return (
          <svg className="w-8 h-8 text-deep-teal" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-mid-grey mb-2">
          <span>{lessonTitle}</span>
          <span>{currentSlide + 1} of {totalSlides}</span>
        </div>
        <div className="h-2 bg-light-grey rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-deep-teal to-slate-navy transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-1.5 mb-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index, index > currentSlide ? 'next' : 'prev')}
            className={`h-2 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'w-8 bg-deep-teal' 
                : index < currentSlide 
                  ? 'w-2 bg-deep-teal/50 hover:bg-deep-teal/70' 
                  : 'w-2 bg-light-grey hover:bg-mid-grey'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide card - fixed height for consistent button placement */}
      <div 
        className={`rounded-2xl shadow-lg p-8 md:p-12 h-[450px] flex flex-col transition-all duration-150 ${
          isAnimating 
            ? direction === 'next' 
              ? 'opacity-0 translate-x-4' 
              : 'opacity-0 -translate-x-4'
            : 'opacity-100 translate-x-0'
        } ${getTypeStyles(slide.type)}`}
      >
        {/* Type icon */}
        {getTypeIcon(slide.type) && (
          <div className="mb-4 flex-shrink-0">
            {getTypeIcon(slide.type)}
          </div>
        )}

        {/* Slide title */}
        {slide.title && (
          <h2 className={`font-heading text-2xl md:text-3xl font-bold mb-6 flex-shrink-0 ${
            slide.type === 'intro' ? 'text-white' : 'text-slate-navy'
          }`}>
            {slide.title}
          </h2>
        )}

        {/* Slide content - scrollable if needed */}
        <div className={`flex-grow overflow-y-auto ${slide.type === 'intro' ? '[&_p]:text-white/90 [&_strong]:text-white' : ''}`}>
          {renderContent(slide.content)}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            currentSlide === 0
              ? 'text-mid-grey cursor-not-allowed'
              : 'text-charcoal hover:bg-light-grey'
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Previous
        </button>

        <div className="text-sm text-mid-grey">
          Use ← → arrow keys
        </div>

        <button
          onClick={nextSlide}
          className="flex items-center gap-2 px-6 py-3 bg-deep-teal text-white rounded-lg font-medium hover:bg-slate-navy transition-colors"
        >
          {currentSlide === totalSlides - 1 ? 'Complete' : 'Next'}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
