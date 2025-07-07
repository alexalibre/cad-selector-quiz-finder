
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import QuizComponent from '@/components/QuizComponent';
import SoftwareCard from '@/components/SoftwareCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

const Quiz = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizResults, setQuizResults] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [previousAnswers, setPreviousAnswers] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for previous quiz results in localStorage
    const savedAnswers = localStorage.getItem('quiz-answers');
    if (savedAnswers) {
      setPreviousAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleRetakeQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = async (results: any) => {
    setQuizResults(results);
    setShowQuiz(false);
    
    // Save answers to localStorage
    localStorage.setItem('quiz-answers', JSON.stringify(results));
    
    // Generate recommendations based on quiz results
    await generateRecommendations(results);
    
    // Show email capture dialog
    setShowEmailDialog(true);
  };

  const generateRecommendations = async (results: any) => {
    try {
      // Fetch software based on quiz results
      let query = supabase
        .from('software_entries')
        .select('*')
        .eq('is_active', true);

      // Filter by budget
      if (results.budget !== undefined) {
        query = query.or(`price.lte.${results.budget},price.is.null`);
      }

      // Filter by difficulty/experience level
      if (results.experienceLevel) {
        query = query.lte('difficulty', results.experienceLevel + 1);
      }

      const { data } = await query.limit(6);
      
      if (data) {
        // Sort by rating and relevance
        const sortedData = data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setRecommendations(sortedData);
      }
    } catch (error) {
      console.error('Error generating recommendations:', error);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      // Here you could save the email and quiz results to your database
      toast({
        title: "Email Saved!",
        description: "We'll send you updates and recommendations based on your quiz results.",
      });
    }
    
    setShowEmailDialog(false);
  };

  const handleSkipEmail = () => {
    setShowEmailDialog(false);
  };

  if (showQuiz) {
    return (
      <div className="min-h-screen bg-slate-50">
        <QuizComponent 
          onComplete={handleQuizComplete}
          onClose={() => setShowQuiz(false)}
          previousAnswers={previousAnswers}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!quizResults ? (
          <div className="text-center">
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Find Your Perfect CAD Software</CardTitle>
                <CardDescription className="text-lg">
                  Take our interactive quiz to get personalized CAD software recommendations 
                  based on your needs, experience level, and budget.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900">5 Minutes</h3>
                    <p className="text-sm text-blue-700">Quick and easy</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900">Personalized</h3>
                    <p className="text-sm text-green-700">Tailored to your needs</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h3 className="font-semibold text-purple-900">Expert Tips</h3>
                    <p className="text-sm text-purple-700">Professional guidance</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    onClick={handleStartQuiz}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    size="lg"
                  >
                    Start Quiz
                  </Button>
                  
                  {previousAnswers && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-slate-600 mb-2">
                        You've taken this quiz before. Your previous answers will be pre-filled.
                      </p>
                      <Button 
                        onClick={handleRetakeQuiz}
                        variant="outline"
                        className="w-full"
                      >
                        Retake Quiz
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Your CAD Software Recommendations</h1>
              <p className="text-lg text-slate-600">
                Based on your quiz results, here are the best CAD software options for you
              </p>
              <Button 
                onClick={handleRetakeQuiz}
                variant="outline"
                className="mt-4"
              >
                Retake Quiz
              </Button>
            </div>

            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((software) => (
                  <SoftwareCard key={software.id} software={software} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500">Loading recommendations...</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Email Capture Dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Get Your Results via Email
            </DialogTitle>
            <DialogDescription>
              Enter your email to receive your personalized recommendations and stay updated 
              with new CAD software releases and tutorials.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address (Optional)</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Send Results
              </Button>
              <Button type="button" variant="outline" onClick={handleSkipEmail}>
                Skip
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Quiz;
