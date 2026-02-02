'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Question {
  id: string;
  category: string;
  text: string;
  options: { value: number; label: string }[];
}

interface Answer {
  questionId: string;
  value: number;
}

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
  level: 'weak' | 'developing' | 'strong';
}

const categories = [
  { id: 'practices', name: 'Maintenance Practices', color: '#0D6E6E' },
  { id: 'culture', name: 'Organizational Culture', color: '#2C3E50' },
  { id: 'data', name: 'Data & Systems', color: '#E67E22' },
  { id: 'resources', name: 'Resources', color: '#27AE60' },
  { id: 'goals', name: 'Goals & Metrics', color: '#8E44AD' },
];

const questions: Question[] = [
  // Maintenance Practices (4 questions)
  {
    id: 'p1',
    category: 'practices',
    text: 'Do you have documented maintenance procedures for your critical equipment?',
    options: [
      { value: 1, label: 'No documented procedures' },
      { value: 2, label: 'Some equipment has procedures' },
      { value: 3, label: 'Most critical equipment has basic procedures' },
      { value: 4, label: 'Comprehensive procedures for critical equipment' },
      { value: 5, label: 'Fully documented, reviewed, and regularly updated procedures' },
    ],
  },
  {
    id: 'p2',
    category: 'practices',
    text: 'Do you currently track and analyze failure data?',
    options: [
      { value: 1, label: 'We don\'t track failures systematically' },
      { value: 2, label: 'Basic failure logging but no analysis' },
      { value: 3, label: 'Track failures and do occasional analysis' },
      { value: 4, label: 'Regular failure analysis with root cause investigation' },
      { value: 5, label: 'Comprehensive failure tracking with FMEA and trend analysis' },
    ],
  },
  {
    id: 'p3',
    category: 'practices',
    text: 'How would you describe your current preventive maintenance program?',
    options: [
      { value: 1, label: 'Mostly reactive - fix when it breaks' },
      { value: 2, label: 'Basic time-based PM on some equipment' },
      { value: 3, label: 'Structured PM program based on OEM recommendations' },
      { value: 4, label: 'Optimized PM with some condition-based elements' },
      { value: 5, label: 'Advanced program with predictive and condition-based maintenance' },
    ],
  },
  {
    id: 'p4',
    category: 'practices',
    text: 'Do you use condition monitoring techniques (vibration, oil analysis, thermography)?',
    options: [
      { value: 1, label: 'No condition monitoring' },
      { value: 2, label: 'Basic visual inspections only' },
      { value: 3, label: 'Some condition monitoring on critical equipment' },
      { value: 4, label: 'Regular condition monitoring program' },
      { value: 5, label: 'Comprehensive PdM program with multiple techniques' },
    ],
  },
  
  // Organizational Culture (4 questions)
  {
    id: 'c1',
    category: 'culture',
    text: 'Does management actively support and champion reliability initiatives?',
    options: [
      { value: 1, label: 'No management interest in reliability' },
      { value: 2, label: 'Occasional lip service but no real support' },
      { value: 3, label: 'Some management support, limited resources' },
      { value: 4, label: 'Active management sponsorship with allocated resources' },
      { value: 5, label: 'Reliability is a core organizational value with executive backing' },
    ],
  },
  {
    id: 'c2',
    category: 'culture',
    text: 'Do operations and maintenance teams collaborate effectively?',
    options: [
      { value: 1, label: 'Siloed departments with little communication' },
      { value: 2, label: 'Basic communication, often adversarial' },
      { value: 3, label: 'Regular meetings, improving collaboration' },
      { value: 4, label: 'Good teamwork with joint problem-solving' },
      { value: 5, label: 'Fully integrated teams with shared reliability goals' },
    ],
  },
  {
    id: 'c3',
    category: 'culture',
    text: 'Is there a culture of continuous improvement in maintenance?',
    options: [
      { value: 1, label: 'No improvement initiatives' },
      { value: 2, label: 'Occasional improvement projects' },
      { value: 3, label: 'Improvement ideas encouraged but not systematic' },
      { value: 4, label: 'Structured improvement process with regular reviews' },
      { value: 5, label: 'Embedded CI culture with empowered teams and visible results' },
    ],
  },
  {
    id: 'c4',
    category: 'culture',
    text: 'How does your organization respond to equipment failures?',
    options: [
      { value: 1, label: 'Blame individuals, quick fixes' },
      { value: 2, label: 'Fix the immediate problem, move on' },
      { value: 3, label: 'Basic investigation for major failures' },
      { value: 4, label: 'Root cause analysis with corrective actions' },
      { value: 5, label: 'Comprehensive RCA, systemic learning, prevention focus' },
    ],
  },
  
  // Data & Systems (4 questions)
  {
    id: 'd1',
    category: 'data',
    text: 'Do you have a CMMS/EAM system in place?',
    options: [
      { value: 1, label: 'No maintenance management system' },
      { value: 2, label: 'Spreadsheets or basic tracking' },
      { value: 3, label: 'CMMS installed but underutilized' },
      { value: 4, label: 'CMMS actively used for work orders and PM' },
      { value: 5, label: 'Fully utilized CMMS with KPIs, analytics, and integration' },
    ],
  },
  {
    id: 'd2',
    category: 'data',
    text: 'Do you have access to historical failure and repair records?',
    options: [
      { value: 1, label: 'No historical data available' },
      { value: 2, label: 'Limited paper records or institutional knowledge' },
      { value: 3, label: 'Some historical data, not easily accessible' },
      { value: 4, label: 'Good historical records in CMMS' },
      { value: 5, label: 'Comprehensive failure history with searchable database' },
    ],
  },
  {
    id: 'd3',
    category: 'data',
    text: 'Is your equipment information (specifications, manuals, P&IDs) well organized?',
    options: [
      { value: 1, label: 'Documentation scattered or missing' },
      { value: 2, label: 'Some documentation exists but hard to find' },
      { value: 3, label: 'Basic documentation library' },
      { value: 4, label: 'Good documentation system, mostly complete' },
      { value: 5, label: 'Comprehensive, organized, digitized technical library' },
    ],
  },
  {
    id: 'd4',
    category: 'data',
    text: 'Can you easily report on maintenance KPIs (MTBF, MTTR, OEE)?',
    options: [
      { value: 1, label: 'No maintenance KPIs tracked' },
      { value: 2, label: 'Basic metrics calculated manually' },
      { value: 3, label: 'Some KPIs available from CMMS' },
      { value: 4, label: 'Regular KPI reporting and reviews' },
      { value: 5, label: 'Real-time dashboards with automated reporting' },
    ],
  },
  
  // Resources (4 questions)
  {
    id: 'r1',
    category: 'resources',
    text: 'Do you have personnel trained in reliability engineering concepts?',
    options: [
      { value: 1, label: 'No reliability training' },
      { value: 2, label: 'Basic awareness only' },
      { value: 3, label: 'Some staff have had reliability training' },
      { value: 4, label: 'Reliability engineer(s) on staff' },
      { value: 5, label: 'Dedicated reliability team with advanced qualifications' },
    ],
  },
  {
    id: 'r2',
    category: 'resources',
    text: 'Would you be able to allocate time for cross-functional RCM analysis teams?',
    options: [
      { value: 1, label: 'No time available for analysis work' },
      { value: 2, label: 'Very limited time, constant fire-fighting' },
      { value: 3, label: 'Could allocate some time with planning' },
      { value: 4, label: 'Regular time available for improvement work' },
      { value: 5, label: 'Protected time for reliability activities' },
    ],
  },
  {
    id: 'r3',
    category: 'resources',
    text: 'Do your maintenance technicians have input into maintenance strategy?',
    options: [
      { value: 1, label: 'Technicians just follow instructions' },
      { value: 2, label: 'Occasional suggestions considered' },
      { value: 3, label: 'Technician feedback actively sought' },
      { value: 4, label: 'Technicians involved in procedure reviews' },
      { value: 5, label: 'Technicians are key participants in analysis and planning' },
    ],
  },
  {
    id: 'r4',
    category: 'resources',
    text: 'Do you have budget flexibility for reliability improvement initiatives?',
    options: [
      { value: 1, label: 'No budget for improvements' },
      { value: 2, label: 'Very tight budget, reactive only' },
      { value: 3, label: 'Some budget with strong justification' },
      { value: 4, label: 'Annual improvement budget allocated' },
      { value: 5, label: 'Strategic reliability investment program' },
    ],
  },
  
  // Goals & Metrics (4 questions)
  {
    id: 'g1',
    category: 'goals',
    text: 'Do you have clear reliability or availability targets?',
    options: [
      { value: 1, label: 'No defined targets' },
      { value: 2, label: 'Informal or vague goals' },
      { value: 3, label: 'Some equipment has availability targets' },
      { value: 4, label: 'Clear targets for critical equipment' },
      { value: 5, label: 'Comprehensive OEE/availability targets linked to business goals' },
    ],
  },
  {
    id: 'g2',
    category: 'goals',
    text: 'Do you know which equipment failures cost you the most?',
    options: [
      { value: 1, label: 'No visibility into failure costs' },
      { value: 2, label: 'Anecdotal knowledge of major issues' },
      { value: 3, label: 'Track repair costs, not total impact' },
      { value: 4, label: 'Understand cost impact of main failures' },
      { value: 5, label: 'Full cost tracking including production losses' },
    ],
  },
  {
    id: 'g3',
    category: 'goals',
    text: 'Have you identified your most critical equipment?',
    options: [
      { value: 1, label: 'No formal criticality assessment' },
      { value: 2, label: 'Informal understanding based on experience' },
      { value: 3, label: 'Basic criticality ranking done' },
      { value: 4, label: 'Documented criticality assessment with criteria' },
      { value: 5, label: 'Regular criticality reviews driving maintenance strategy' },
    ],
  },
  {
    id: 'g4',
    category: 'goals',
    text: 'Can you articulate the business case for improving reliability?',
    options: [
      { value: 1, label: 'Haven\'t thought about it' },
      { value: 2, label: 'Know it\'s important but can\'t quantify' },
      { value: 3, label: 'Basic cost avoidance arguments' },
      { value: 4, label: 'Clear ROI understanding for key initiatives' },
      { value: 5, label: 'Detailed business case with proven results' },
    ],
  },
];

const STORAGE_KEY = 'rcm-readiness-assessment';

const getRecommendations = (categoryScores: CategoryScore[]): { category: string; recommendation: string; priority: 'high' | 'medium' | 'low' }[] => {
  const recommendations: { category: string; recommendation: string; priority: 'high' | 'medium' | 'low' }[] = [];

  categoryScores.forEach(cat => {
    if (cat.level === 'weak') {
      switch (cat.name) {
        case 'Maintenance Practices':
          recommendations.push({
            category: cat.name,
            recommendation: 'Start by documenting your current maintenance procedures and establishing basic failure tracking. Consider implementing condition monitoring on your most critical assets.',
            priority: 'high',
          });
          break;
        case 'Organizational Culture':
          recommendations.push({
            category: cat.name,
            recommendation: 'Focus on building management buy-in before launching RCM. Start with a small pilot project to demonstrate value, and work on improving operations-maintenance collaboration.',
            priority: 'high',
          });
          break;
        case 'Data & Systems':
          recommendations.push({
            category: cat.name,
            recommendation: 'Invest in a CMMS if you don\'t have one, or improve utilization of your existing system. Start collecting failure data now—you\'ll need historical records for effective RCM analysis.',
            priority: 'high',
          });
          break;
        case 'Resources':
          recommendations.push({
            category: cat.name,
            recommendation: 'Consider RCM training for key personnel before attempting analysis. Identify potential team members and start protecting time for reliability improvement work.',
            priority: 'high',
          });
          break;
        case 'Goals & Metrics':
          recommendations.push({
            category: cat.name,
            recommendation: 'Establish baseline metrics and identify your most critical equipment. You need to know where you stand before you can measure improvement.',
            priority: 'high',
          });
          break;
      }
    } else if (cat.level === 'developing') {
      switch (cat.name) {
        case 'Maintenance Practices':
          recommendations.push({
            category: cat.name,
            recommendation: 'Good foundation! Focus on formalizing your procedures and expanding condition monitoring. Consider starting FMEA on your top critical assets.',
            priority: 'medium',
          });
          break;
        case 'Organizational Culture':
          recommendations.push({
            category: cat.name,
            recommendation: 'Continue building cross-functional collaboration. Celebrate early wins to build momentum, and ensure root cause analysis becomes standard practice.',
            priority: 'medium',
          });
          break;
        case 'Data & Systems':
          recommendations.push({
            category: cat.name,
            recommendation: 'Work on improving data quality and accessibility. Ensure your CMMS is capturing the right information for RCM analysis.',
            priority: 'medium',
          });
          break;
        case 'Resources':
          recommendations.push({
            category: cat.name,
            recommendation: 'Continue developing reliability expertise in your team. Consider certification programs and ensure technician knowledge is being captured.',
            priority: 'medium',
          });
          break;
        case 'Goals & Metrics':
          recommendations.push({
            category: cat.name,
            recommendation: 'Refine your criticality assessment and expand KPI tracking. Link reliability targets to business outcomes for better executive engagement.',
            priority: 'medium',
          });
          break;
      }
    }
  });

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

const getProductRecommendations = (overallScore: number, categoryScores: CategoryScore[]): { title: string; description: string; link: string }[] => {
  const products: { title: string; description: string; link: string }[] = [];
  
  const practicesScore = categoryScores.find(c => c.name === 'Maintenance Practices')?.percentage || 0;
  const resourcesScore = categoryScores.find(c => c.name === 'Resources')?.percentage || 0;

  if (overallScore < 40) {
    products.push({
      title: 'RCM Fundamentals Training',
      description: 'Build a solid foundation in RCM methodology before starting analysis.',
      link: '/training/rcm-fundamentals',
    });
  }
  
  if (practicesScore < 60) {
    products.push({
      title: 'FMEA Worksheet Templates',
      description: 'Professional templates to structure your failure mode analysis.',
      link: '/products',
    });
  }

  if (overallScore >= 40 && overallScore < 70) {
    products.push({
      title: 'RCM Analysis Workbook',
      description: 'Complete toolkit for conducting full RCM analysis on your equipment.',
      link: '/products',
    });
  }

  if (resourcesScore < 50) {
    products.push({
      title: 'RCM Practitioner Course',
      description: 'In-depth training to develop internal RCM expertise.',
      link: '/training/rcm-practitioner',
    });
  }

  if (overallScore >= 70) {
    products.push({
      title: 'Advanced FMEA Masterclass',
      description: 'Take your analysis skills to the next level.',
      link: '/training/fmea-masterclass',
    });
  }

  return products.slice(0, 3);
};

export default function ReadinessAssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.answers && Array.isArray(parsed.answers)) {
          setAnswers(parsed.answers);
          if (parsed.answers.length === questions.length) {
            setIsComplete(true);
          } else {
            setCurrentQuestion(parsed.answers.length);
          }
        }
      } catch {
        // Invalid data, start fresh
      }
    }
    setIsLoading(false);
  }, []);

  // Save progress
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, timestamp: Date.now() }));
    }
  }, [answers, isLoading]);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === questions[currentQuestion].id);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId: questions[currentQuestion].id, value };
    } else {
      newAnswers.push({ questionId: questions[currentQuestion].id, value });
    }
    
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setIsComplete(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handlePrint = () => {
    window.print();
  };

  // Calculate scores
  const calculateScores = (): { overall: number; categories: CategoryScore[] } => {
    const categoryScores = categories.map(cat => {
      const catQuestions = questions.filter(q => q.category === cat.id);
      const catAnswers = answers.filter(a => catQuestions.some(q => q.id === a.questionId));
      const score = catAnswers.reduce((sum, a) => sum + a.value, 0);
      const maxScore = catQuestions.length * 5;
      const percentage = Math.round((score / maxScore) * 100);
      
      let level: 'weak' | 'developing' | 'strong';
      if (percentage < 40) level = 'weak';
      else if (percentage < 70) level = 'developing';
      else level = 'strong';
      
      return {
        name: cat.name,
        score,
        maxScore,
        percentage,
        level,
      };
    });

    const totalScore = answers.reduce((sum, a) => sum + a.value, 0);
    const totalMaxScore = questions.length * 5;
    const overall = Math.round((totalScore / totalMaxScore) * 100);

    return { overall, categories: categoryScores };
  };

  const { overall, categories: categoryScores } = calculateScores();
  const recommendations = getRecommendations(categoryScores);
  const productRecommendations = getProductRecommendations(overall, categoryScores);

  const getOverallLevel = (): { label: string; color: string; description: string } => {
    if (overall < 30) return { label: 'Early Stage', color: 'text-red-600', description: 'Significant groundwork needed before RCM implementation' };
    if (overall < 50) return { label: 'Building Foundation', color: 'text-orange-600', description: 'Some elements in place, but important gaps to address' };
    if (overall < 70) return { label: 'Ready to Start', color: 'text-yellow-600', description: 'Good foundation for beginning RCM with focused effort' };
    if (overall < 85) return { label: 'Well Prepared', color: 'text-green-600', description: 'Strong position to implement RCM successfully' };
    return { label: 'Advanced', color: 'text-deep-teal', description: 'Excellent readiness—focus on optimization and expansion' };
  };

  const overallLevel = getOverallLevel();

  // Radar chart calculations
  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  
  const getRadarPoints = (scores: CategoryScore[]): string => {
    return scores.map((score, index) => {
      const angle = (Math.PI * 2 * index) / scores.length - Math.PI / 2;
      const r = (score.percentage / 100) * radius;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const getRadarAxisEnd = (index: number): { x: number; y: number } => {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const getLabelPosition = (index: number): { x: number; y: number; anchor: 'start' | 'middle' | 'end' } => {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    const labelRadius = radius + 25;
    let anchor: 'start' | 'middle' | 'end' = 'middle';
    if (Math.cos(angle) < -0.1) anchor = 'end';
    else if (Math.cos(angle) > 0.1) anchor = 'start';
    
    return {
      x: centerX + labelRadius * Math.cos(angle),
      y: centerY + labelRadius * Math.sin(angle),
      anchor,
    };
  };

  if (isLoading) {
    return (
      <div className="bg-off-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-deep-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-mid-grey">Loading assessment...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = Math.round((answers.length / questions.length) * 100);
  const currentAnswer = answers.find(a => a.questionId === currentQ?.id);

  return (
    <div className="bg-off-white min-h-screen">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          section { padding: 1rem !important; }
        }
        .print-only { display: none; }
      `}</style>

      {/* Hero */}
      <section className="bg-gradient-to-br from-deep-teal to-slate-navy text-white no-print">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl">
            <Link 
              href="/resources" 
              className="text-gray-300 hover:text-white text-sm mb-4 inline-flex items-center gap-2"
            >
              ← Back to Resources
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-4">
              RCM Readiness Assessment
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-200">
              Answer {questions.length} questions to assess your organization&apos;s readiness for Reliability Centred Maintenance. 
              Get personalized recommendations based on your results.
            </p>
          </div>
        </div>
      </section>

      {/* Assessment Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            
            {!isComplete ? (
              /* Assessment Questions */
              <div className="no-print">
                {/* Progress */}
                <div className="bg-white rounded-xl p-4 border border-light-grey mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-slate-navy">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span className="text-sm text-mid-grey">{progress}% complete</span>
                  </div>
                  <div className="h-2 bg-light-grey rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-deep-teal transition-all duration-300 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Category Indicator */}
                <div className="mb-4">
                  <span 
                    className="text-xs font-medium px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: categories.find(c => c.id === currentQ.category)?.color }}
                  >
                    {categories.find(c => c.id === currentQ.category)?.name}
                  </span>
                </div>

                {/* Question Card */}
                <div className="bg-white rounded-2xl shadow-lg border border-light-grey overflow-hidden">
                  <div className="p-6 md:p-8">
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-slate-navy mb-8">
                      {currentQ.text}
                    </h2>
                    
                    <div className="space-y-3">
                      {currentQ.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            currentAnswer?.value === option.value
                              ? 'border-deep-teal bg-deep-teal/5'
                              : 'border-light-grey hover:border-deep-teal/50 hover:bg-off-white'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                              currentAnswer?.value === option.value
                                ? 'border-deep-teal bg-deep-teal'
                                : 'border-mid-grey'
                            }`}>
                              {currentAnswer?.value === option.value && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </span>
                            <span className={currentAnswer?.value === option.value ? 'text-slate-navy font-medium' : 'text-charcoal'}>
                              {option.label}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="mt-8 flex justify-between items-center">
                      <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                          currentQuestion === 0
                            ? 'text-mid-grey cursor-not-allowed'
                            : 'text-deep-teal hover:bg-deep-teal/5'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Previous
                      </button>
                      
                      <span className="text-sm text-mid-grey">
                        {answers.length} of {questions.length} answered
                      </span>
                    </div>
                  </div>
                </div>

                {/* Resume Notice */}
                {answers.length > 0 && (
                  <p className="text-center text-sm text-mid-grey mt-6">
                    💾 Your progress is automatically saved
                  </p>
                )}
              </div>
            ) : (
              /* Results */
              <div ref={resultsRef}>
                {/* Print Header */}
                <div className="print-only text-center mb-8">
                  <h1 className="font-heading text-3xl font-bold text-slate-navy">RCM Readiness Assessment Results</h1>
                  <p className="text-mid-grey mt-2">Generated by Reliability HQ</p>
                  <p className="text-sm text-mid-grey">reliabilityhq.com</p>
                </div>

                {/* Overall Score */}
                <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8 mb-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="font-heading text-2xl font-bold text-slate-navy">
                      Your Results
                    </h2>
                    <div className="no-print flex gap-2">
                      <button
                        onClick={handlePrint}
                        className="text-deep-teal hover:text-slate-navy font-medium text-sm flex items-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print
                      </button>
                      <button
                        onClick={handleRestart}
                        className="text-mid-grey hover:text-charcoal font-medium text-sm flex items-center gap-2"
                      >
                        Retake
                      </button>
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <div className="inline-block relative">
                      <svg className="w-48 h-48" viewBox="0 0 120 120">
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="#E9ECEF"
                          strokeWidth="12"
                        />
                        <circle
                          cx="60"
                          cy="60"
                          r="54"
                          fill="none"
                          stroke="#0D6E6E"
                          strokeWidth="12"
                          strokeDasharray={`${(overall / 100) * 339.3} 339.3`}
                          strokeLinecap="round"
                          transform="rotate(-90 60 60)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold text-slate-navy">{overall}</span>
                        <span className="text-sm text-mid-grey">out of 100</span>
                      </div>
                    </div>
                    <h3 className={`font-heading text-2xl font-bold mt-4 ${overallLevel.color}`}>
                      {overallLevel.label}
                    </h3>
                    <p className="text-mid-grey mt-2">{overallLevel.description}</p>
                  </div>
                </div>

                {/* Radar Chart & Category Scores */}
                <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8 mb-6">
                  <h3 className="font-heading text-xl font-bold text-slate-navy mb-6">
                    Category Breakdown
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Radar Chart */}
                    <div className="flex justify-center">
                      <svg viewBox="0 0 300 300" className="w-full max-w-[300px]">
                        {/* Grid circles */}
                        {[20, 40, 60, 80, 100].map((pct) => (
                          <circle
                            key={pct}
                            cx={centerX}
                            cy={centerY}
                            r={(pct / 100) * radius}
                            fill="none"
                            stroke="#E9ECEF"
                            strokeWidth="1"
                          />
                        ))}
                        
                        {/* Axis lines */}
                        {categories.map((_, index) => {
                          const end = getRadarAxisEnd(index);
                          return (
                            <line
                              key={index}
                              x1={centerX}
                              y1={centerY}
                              x2={end.x}
                              y2={end.y}
                              stroke="#E9ECEF"
                              strokeWidth="1"
                            />
                          );
                        })}
                        
                        {/* Data polygon */}
                        <polygon
                          points={getRadarPoints(categoryScores)}
                          fill="rgba(13, 110, 110, 0.2)"
                          stroke="#0D6E6E"
                          strokeWidth="2"
                        />
                        
                        {/* Data points */}
                        {categoryScores.map((score, index) => {
                          const angle = (Math.PI * 2 * index) / categoryScores.length - Math.PI / 2;
                          const r = (score.percentage / 100) * radius;
                          const x = centerX + r * Math.cos(angle);
                          const y = centerY + r * Math.sin(angle);
                          return (
                            <circle
                              key={index}
                              cx={x}
                              cy={y}
                              r="5"
                              fill="#0D6E6E"
                            />
                          );
                        })}
                        
                        {/* Labels */}
                        {categoryScores.map((score, index) => {
                          const pos = getLabelPosition(index);
                          return (
                            <text
                              key={index}
                              x={pos.x}
                              y={pos.y}
                              textAnchor={pos.anchor}
                              className="text-xs fill-charcoal"
                              dominantBaseline="middle"
                            >
                              {score.name.split(' ')[0]}
                            </text>
                          );
                        })}
                      </svg>
                    </div>

                    {/* Score Bars */}
                    <div className="space-y-4">
                      {categoryScores.map((score, index) => (
                        <div key={score.name}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-charcoal">{score.name}</span>
                            <span className={`text-sm font-bold ${
                              score.level === 'weak' ? 'text-red-600' :
                              score.level === 'developing' ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>{score.percentage}%</span>
                          </div>
                          <div className="h-3 bg-light-grey rounded-full overflow-hidden">
                            <div
                              className="h-full transition-all duration-500 rounded-full"
                              style={{ 
                                width: `${score.percentage}%`,
                                backgroundColor: categories[index].color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Level Legend */}
                  <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-600"></span>
                      <span className="text-mid-grey">Weak (&lt;40%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-yellow-600"></span>
                      <span className="text-mid-grey">Developing (40-69%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-green-600"></span>
                      <span className="text-mid-grey">Strong (70%+)</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                  <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8 mb-6">
                    <h3 className="font-heading text-xl font-bold text-slate-navy mb-6">
                      Recommendations
                    </h3>
                    <div className="space-y-4">
                      {recommendations.map((rec, index) => (
                        <div 
                          key={index}
                          className={`p-4 rounded-lg border-l-4 ${
                            rec.priority === 'high' 
                              ? 'bg-red-50 border-red-600' 
                              : 'bg-yellow-50 border-yellow-600'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              rec.priority === 'high'
                                ? 'bg-red-600 text-white'
                                : 'bg-yellow-600 text-white'
                            }`}>
                              {rec.priority.toUpperCase()}
                            </span>
                            <div>
                              <h4 className="font-semibold text-slate-navy mb-1">{rec.category}</h4>
                              <p className="text-sm text-charcoal">{rec.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div className="bg-white rounded-2xl shadow-lg border border-light-grey p-6 md:p-8 mb-6">
                  <h3 className="font-heading text-xl font-bold text-slate-navy mb-6">
                    Suggested Next Steps
                  </h3>
                  <ol className="space-y-4">
                    {overall < 40 && (
                      <>
                        <li className="flex items-start gap-3">
                          <span className="bg-deep-teal text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                          <p className="text-charcoal">Get management buy-in by presenting the business case for RCM using our <Link href="/tools/roi-calculator" className="text-deep-teal hover:underline">ROI Calculator</Link></p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-deep-teal text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                          <p className="text-charcoal">Establish basic data collection processes—start tracking failures in your CMMS</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-deep-teal text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                          <p className="text-charcoal">Train key personnel in RCM fundamentals before attempting analysis</p>
                        </li>
                      </>
                    )}
                    {overall >= 40 && overall < 70 && (
                      <>
                        <li className="flex items-start gap-3">
                          <span className="bg-deep-teal text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                          <p className="text-charcoal">Use our <Link href="/tools/criticality-calculator" className="text-deep-teal hover:underline">Criticality Calculator</Link> to identify 5-10 assets for a pilot program</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-deep-teal text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                          <p className="text-charcoal">Form a cross-functional RCM team with operations and maintenance representatives</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-deep-teal text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                          <p className="text-charcoal">Start with a facilitated FMEA workshop on your most critical pilot asset</p>
                        </li>
                      </>
                    )}
                    {overall >= 70 && (
                      <>
                        <li className="flex items-start gap-3">
                          <span className="bg-deep-teal text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                          <p className="text-charcoal">Scale your RCM program systematically across all critical equipment</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-deep-teal text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                          <p className="text-charcoal">Develop internal facilitators to sustain the program long-term</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="bg-deep-teal text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                          <p className="text-charcoal">Implement living program reviews to keep analyses current</p>
                        </li>
                      </>
                    )}
                  </ol>
                </div>

                {/* Product Recommendations */}
                <div className="bg-gradient-to-br from-deep-teal to-slate-navy rounded-2xl p-6 md:p-8 text-white no-print">
                  <h3 className="font-heading text-2xl font-bold mb-2">
                    Recommended Resources
                  </h3>
                  <p className="text-gray-200 mb-6">
                    Based on your assessment, these resources can help you strengthen your weak areas:
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {productRecommendations.map((product, index) => (
                      <Link
                        key={index}
                        href={product.link}
                        className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors block"
                      >
                        <h4 className="font-semibold mb-2">{product.title}</h4>
                        <p className="text-sm text-gray-300">{product.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
