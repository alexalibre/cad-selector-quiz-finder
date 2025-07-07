import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface QuizAnswers {
  primaryUse?: string;
  experience?: string;
  budget?: number;
  platform?: string;
  features?: string[];
}

interface QuizComponentProps {
  onComplete: (results: any) => void;
  onClose: () => void;
  previousAnswers?: QuizAnswers | null;
}

const QuizComponent: React.FC<QuizComponentProps> = ({ onComplete, onClose, previousAnswers }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(previousAnswers || {});

  const questions = [
    {
      id: 'primaryUse',
      title: 'What will you primarily use CAD software for?',
      subtitle: 'Select your main use case',
      options: [
        { value: 'mechanical', label: 'Mechanical Design & Engineering', description: 'Parts, assemblies, product design' },
        { value: 'architectural', label: 'Architecture & Construction', description: 'Buildings, floor plans, structures' },
        { value: '3dprinting', label: '3D Printing & Prototyping', description: 'Models for 3D printing, rapid prototyping' },
        { value: 'industrial', label: 'Industrial Design', description: 'Consumer products, aesthetics, ergonomics' },
        { value: 'jewelry', label: 'Jewelry Design', description: 'Rings, pendants, custom jewelry' },
        { value: 'electronics', label: 'Electronics & PCB Design', description: 'Circuit boards, electronic enclosures' },
        { value: 'animation', label: '3D Animation & Modeling', description: 'Characters, scenes, visual effects' },
        { value: 'any', label: 'General Purpose', description: 'Multiple use cases' }
      ]
    },
    {
      id: 'experience',
      title: 'What is your experience level with CAD software?',
      subtitle: 'This helps us recommend appropriate complexity',
      options: [
        { value: 'beginner', label: 'Beginner', description: 'New to CAD, need user-friendly interface' },
        { value: 'intermediate', label: 'Intermediate', description: 'Some CAD experience, comfortable with learning' },
        { value: 'advanced', label: 'Advanced', description: 'Experienced user, need powerful features' },
        { value: 'professional', label: 'Professional', description: 'Industry expert, need enterprise features' }
      ]
    },
    {
      id: 'budget',
      title: 'What is your budget range per month?',
      subtitle: 'Select your preferred pricing tier',
      options: [
        { value: 0, label: 'Free', description: 'Open source or free versions only' },
        { value: 50, label: '$0 - $50/month', description: 'Personal or small business budget' },
        { value: 200, label: '$50 - $200/month', description: 'Professional individual license' },
        { value: 500, label: '$200 - $500/month', description: 'Small team or advanced features' },
        { value: 1000, label: '$500 - $1000/month', description: 'Enterprise features' },
        { value: 10000, label: '$1000+/month', description: 'No budget constraints' }
      ]
    },
    {
      id: 'platform',
      title: 'What platform do you prefer?',
      subtitle: 'Choose your operating system',
      options: [
        { value: 'windows', label: 'Windows', description: 'Windows 10/11' },
        { value: 'mac', label: 'macOS', description: 'Mac computers' },
        { value: 'linux', label: 'Linux', description: 'Linux distributions' },
        { value: 'web', label: 'Web Browser', description: 'Browser-based, any platform' },
        { value: 'any', label: 'No Preference', description: 'Any platform is fine' }
      ]
    },
    {
      id: 'features',
      title: 'Which features are most important to you?',
      subtitle: 'Select your top priorities (choose multiple)',
      multiple: true,
      options: [
        { value: 'simulation', label: 'Simulation & Analysis', description: 'FEA, CFD, stress testing' },
        { value: 'collaboration', label: 'Team Collaboration', description: 'Cloud sharing, version control' },
        { value: 'rendering', label: 'Photorealistic Rendering', description: 'High-quality visualizations' },
        { value: 'parametric', label: 'Parametric Modeling', description: 'History-based, editable features' },
        { value: 'assembly', label: 'Large Assembly Handling', description: 'Complex multi-part designs' },
        { value: 'drafting', label: '2D Drafting & Documentation', description: 'Technical drawings, blueprints' },
        { value: 'manufacturing', label: 'Manufacturing Integration', description: 'CAM, toolpaths, production' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string | number) => {
    const question = questions[currentQuestion];
    
    if (question.multiple) {
      const currentAnswers = (answers[questionId as keyof QuizAnswers] as string[]) || [];
      const updatedAnswers = currentAnswers.includes(value as string)
        ? currentAnswers.filter(v => v !== value)
        : [...currentAnswers, value as string];
      
      setAnswers(prev => ({
        ...prev,
        [questionId]: updatedAnswers
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        [questionId]: value
      }));
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Process answers and complete quiz
      const results = {
        primaryUse: answers.primaryUse || 'any',
        experience: answers.experience || 'beginner',
        budget: answers.budget || 0,
        platform: answers.platform || 'any',
        features: answers.features || [],
        experienceLevel: getExperienceLevel(answers.experience || 'beginner')
      };
      
      onComplete(results);
    }
  };

  const getExperienceLevel = (experience: string) => {
    const levels: Record<string, number> = {
      'beginner': 1,
      'intermediate': 2,
      'advanced': 3,
      'professional': 4
    };
    return levels[experience] || 1;
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const canProceed = () => {
    const currentQ = questions[currentQuestion];
    const answer = answers[currentQ.id as keyof QuizAnswers];
    
    if (currentQ.multiple) {
      return answer && Array.isArray(answer) && answer.length > 0;
    }
    return answer !== undefined;
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800">CAD Software Quiz</h2>
          <Badge variant="secondary">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          {currentQ.title}
        </h3>
        <p className="text-slate-600">
          {currentQ.subtitle}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {currentQ.options.map((option) => {
          const isSelected = currentQ.multiple 
            ? ((answers[currentQ.id as keyof QuizAnswers] as string[]) || []).includes(option.value as string)
            : answers[currentQ.id as keyof QuizAnswers] === option.value;
            
          return (
            <Card 
              key={option.value}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                  : 'hover:border-slate-300'
              }`}
              onClick={() => handleAnswer(currentQ.id, option.value)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 mt-1 transition-colors ${
                    isSelected 
                      ? 'bg-blue-500 border-blue-500' 
                      : 'border-slate-300'
                  }`}>
                    {isSelected && (
                      <div className="w-full h-full rounded-full bg-white scale-50 transform" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-800 mb-1">
                      {option.label}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={prevQuestion}
          disabled={currentQuestion === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        <Button 
          onClick={nextQuestion}
          disabled={!canProceed()}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
          {currentQuestion < questions.length - 1 && (
            <ChevronRight className="h-4 w-4 ml-2" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default QuizComponent;
