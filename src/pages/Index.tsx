
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, DollarSign, Zap, ArrowRight } from "lucide-react";
import { useState } from 'react';
import QuizComponent from '@/components/QuizComponent';
import SoftwareCard from '@/components/SoftwareCard';
import { cadSoftwareData } from '@/data/cadSoftware';

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [filteredSoftware, setFilteredSoftware] = useState(cadSoftwareData);

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    
    // Filter software based on quiz results
    const filtered = cadSoftwareData.filter(software => {
      const budgetMatch = software.price <= results.budget || software.price === 0;
      const categoryMatch = results.primaryUse === 'any' || software.categories.includes(results.primaryUse);
      const levelMatch = results.experience === 'any' || software.difficulty <= results.experienceLevel;
      
      return budgetMatch && categoryMatch && levelMatch;
    });
    
    setFilteredSoftware(filtered.sort((a, b) => b.rating - a.rating));
    setShowQuiz(false);
  };

  const resetResults = () => {
    setQuizResults(null);
    setFilteredSoftware(cadSoftwareData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              CAD Software Guide
            </h1>
            <nav className="flex items-center gap-6">
              <Button variant="ghost" onClick={resetResults}>All Software</Button>
              <Button onClick={() => setShowQuiz(true)} className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Take Quiz
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!quizResults && (
        <section className="py-20 px-4">
          <div className="container mx-auto text-center max-w-4xl">
            <h2 className="text-5xl font-bold text-slate-800 mb-6 leading-tight">
              Find the Perfect 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> CAD Software</span>
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Discover the ideal Computer-Aided Design software for your needs. From 3D modeling to architectural design, 
              we'll help you choose from over 20+ professional CAD tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                onClick={() => setShowQuiz(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-8 py-4 text-lg"
              >
                Take Our Quiz <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => document.getElementById('software-list').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 text-lg"
              >
                Browse All Software
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">25+</div>
                  <div className="text-sm text-slate-600">CAD Software Options</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">All Levels</div>
                  <div className="text-sm text-slate-600">Beginner to Professional</div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/60 backdrop-blur-sm border-slate-200">
                <CardContent className="pt-6 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-800">Free & Paid</div>
                  <div className="text-sm text-slate-600">Options for Every Budget</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <QuizComponent 
              onComplete={handleQuizComplete}
              onClose={() => setShowQuiz(false)}
            />
          </div>
        </div>
      )}

      {/* Results Section */}
      {quizResults && (
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Recommended CAD Software for You
              </h2>
              <p className="text-slate-600 mb-4">
                Based on your preferences: {quizResults.primaryUse} • {quizResults.experience} level • 
                Budget: ${quizResults.budget === 10000 ? '1000+' : quizResults.budget} per month
              </p>
              <Button 
                variant="outline" 
                onClick={resetResults}
                className="mr-4"
              >
                View All Software
              </Button>
              <Button onClick={() => setShowQuiz(true)}>
                Retake Quiz
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Software List */}
      <section id="software-list" className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              {quizResults ? 'Your Recommendations' : 'All CAD Software'}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {quizResults 
                ? `We found ${filteredSoftware.length} CAD software options that match your criteria.`
                : 'Comprehensive list of CAD software tools for every use case and budget.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSoftware.map((software, index) => (
              <SoftwareCard key={software.id} software={software} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4 mt-20">
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-bold mb-4">CAD Software Guide</h3>
          <p className="text-slate-400 mb-4">
            Helping you find the perfect CAD software for your needs since 2024
          </p>
          <p className="text-sm text-slate-500">
            © 2024 CAD Software Guide. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
