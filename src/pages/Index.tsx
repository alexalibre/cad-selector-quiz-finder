
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, DollarSign, Zap, ArrowRight, Grid, List } from "lucide-react";
import { useState } from 'react';
import QuizComponent from '@/components/QuizComponent';
import SoftwareCard from '@/components/SoftwareCard';
import SoftwareGroupCard from '@/components/SoftwareGroupCard';
import { allCadSoftware, groupedSoftware, flatSoftwareList } from '@/data/allCadSoftware';

const Index = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState(null);
  const [filteredSoftware, setFilteredSoftware] = useState(allCadSoftware);
  const [filteredGroups, setFilteredGroups] = useState(groupedSoftware);
  const [viewMode, setViewMode] = useState<'grouped' | 'individual'>('grouped');

  const handleQuizComplete = (results) => {
    console.log('Quiz results:', results);
    setQuizResults(results);
    
    // Enhanced filtering with scoring system
    const scoredSoftware = allCadSoftware.map(software => {
      let score = 0;
      
      // Budget matching (30% weight)
      if (software.price === 0 && results.budget === 0) {
        score += 30;
      } else if (software.price <= results.budget) {
        score += 30 - (software.price / results.budget) * 10;
      } else if (software.price > results.budget) {
        score -= 20;
      }
      
      // Primary use matching (25% weight)
      if (software.primaryUse && software.primaryUse.includes(results.primaryUse)) {
        score += 25;
      } else if (results.primaryUse === 'any' || software.primaryUse?.includes('any')) {
        score += 15;
      }
      
      // Experience level matching (20% weight)
      const experienceDiff = Math.abs(software.difficulty - results.experienceLevel);
      if (experienceDiff === 0) {
        score += 20;
      } else if (experienceDiff === 1) {
        score += 15;
      } else if (experienceDiff === 2) {
        score += 5;
      }
      
      // Platform matching (10% weight)
      if (results.platform === 'any' || software.platforms.some(p => 
        p.toLowerCase().includes(results.platform.toLowerCase())
      )) {
        score += 10;
      }
      
      // Features matching (10% weight)
      if (results.features && results.features.length > 0) {
        const featureMatches = results.features.filter(userFeature => 
          software.features.some(softwareFeature => 
            softwareFeature.toLowerCase().includes(userFeature.toLowerCase())
          )
        ).length;
        score += (featureMatches / results.features.length) * 10;
      }
      
      // Alibre boost for target users (5% weight)
      if (software.name === 'Alibre Design') {
        if (results.primaryUse === 'mechanical') score += 8;
        if (results.experienceLevel === 2 && results.budget >= 20 && results.budget <= 200) score += 5;
        if (results.budget >= 20 && results.budget <= 100) score += 3;
        if (software.version === 'Atom3D' && results.experienceLevel === 1) score += 5;
      }
      
      // Rating bonus (5% weight)
      score += software.rating;
      
      return { ...software, score };
    });
    
    // Filter and sort
    const filtered = scoredSoftware
      .filter(software => {
        if (software.price > results.budget * 2 && results.budget > 0) return false;
        if (software.score < 10) return false;
        return true;
      })
      .sort((a, b) => b.score - a.score);
    
    // Create filtered groups
    const softwareNames = new Set(filtered.map(s => s.name));
    const filteredGroupsResult = groupedSoftware.filter(group => 
      softwareNames.has(group.name)
    );
    
    setFilteredSoftware(filtered);
    setFilteredGroups(filteredGroupsResult);
    setShowQuiz(false);
  };

  const resetResults = () => {
    setQuizResults(null);
    setFilteredSoftware(allCadSoftware);
    setFilteredGroups(groupedSoftware);
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
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === 'grouped' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('grouped')}
                >
                  <Grid className="h-4 w-4 mr-1" />
                  Grouped
                </Button>
                <Button 
                  variant={viewMode === 'individual' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('individual')}
                >
                  <List className="h-4 w-4 mr-1" />
                  Individual
                </Button>
              </div>
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
              we'll help you choose from over 200+ professional CAD tools.
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
                  <div className="text-2xl font-bold text-slate-800">200+</div>
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
                ? `We found ${viewMode === 'grouped' ? filteredGroups.length : filteredSoftware.length} CAD software options that match your criteria.`
                : `Comprehensive list of 200+ CAD software tools for every use case and budget. View by ${viewMode === 'grouped' ? 'software families' : 'individual versions'}.`
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {viewMode === 'grouped' ? (
              (quizResults ? filteredGroups : groupedSoftware).map((group) => (
                <SoftwareGroupCard key={group.id} group={group} />
              ))
            ) : (
              (quizResults ? filteredSoftware : flatSoftwareList).map((software) => (
                <SoftwareCard key={`${software.name}-${software.version || 'default'}-${software.id}`} software={software} />
              ))
            )}
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
          <div className="text-sm text-slate-500 space-y-1">
            <p>Over 200 CAD software options • Free and paid solutions • All skill levels</p>
            <p>© 2024 CAD Software Guide. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
