
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Users, Award, Zap, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/auth/AuthForm';
import AdminDashboard from '@/components/admin/AdminDashboard';
import SoftwareCard from '@/components/SoftwareCard';
import BlogSection from '@/components/BlogSection';
import TrendingTools from '@/components/TrendingTools';
import { supabase } from '@/integrations/supabase/client';

interface SoftwareEntry {
  id: string;
  name: string;
  description: string;
  price: number;
  price_type: string;
  category_id: string;
  image_url: string;
  website_url: string;
  rating: number;
  difficulty: number;
  platforms: string[];
  features: string[];
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
}

const Index = () => {
  const { user, loading, isAdmin } = useAuth();
  const [software, setSoftware] = useState<SoftwareEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredSoftware, setFilteredSoftware] = useState<SoftwareEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [dataLoading, setDataLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [loading]);

  useEffect(() => {
    filterSoftware();
  }, [software, searchTerm, selectedCategory, priceFilter, difficultyFilter]);

  const fetchData = async () => {
    try {
      const [softwareData, categoriesData] = await Promise.all([
        supabase.from('software_entries').select('*').eq('is_active', true).order('name'),
        supabase.from('categories').select('*').order('name')
      ]);

      if (softwareData.data) setSoftware(softwareData.data);
      if (categoriesData.data) setCategories(categoriesData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const filterSoftware = () => {
    let filtered = software;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category_id === selectedCategory);
    }

    // Price filter
    if (priceFilter !== 'all') {
      switch (priceFilter) {
        case 'free':
          filtered = filtered.filter(item => item.price === 0 || item.price === null);
          break;
        case 'paid':
          filtered = filtered.filter(item => item.price > 0);
          break;
        case 'under-100':
          filtered = filtered.filter(item => item.price <= 100);
          break;
        case 'over-100':
          filtered = filtered.filter(item => item.price > 100);
          break;
      }
    }

    // Difficulty filter
    if (difficultyFilter !== 'all') {
      const difficulty = parseInt(difficultyFilter);
      filtered = filtered.filter(item => item.difficulty === difficulty);
    }

    setFilteredSoftware(filtered);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Show admin dashboard if user is admin
  if (user && isAdmin) {
    return <AdminDashboard />;
  }

  // Show auth form if user is not logged in
  if (!user) {
    return <AuthForm onSuccess={() => window.location.reload()} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect CAD Software
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Discover, compare, and choose from 200+ CAD software solutions. 
              Get personalized recommendations based on your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3"
                onClick={() => navigate('/quiz')}
              >
                Take Our Quiz
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
                onClick={() => navigate('/compare')}
              >
                Compare Tools
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">200+</h3>
              <p className="text-slate-600">CAD Software Options</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">10K+</h3>
              <p className="text-slate-600">Happy Users</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 p-4 rounded-full mb-4">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Expert</h3>
              <p className="text-slate-600">Reviews & Ratings</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 p-4 rounded-full mb-4">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-2">Free</h3>
              <p className="text-slate-600">Personalized Recommendations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search & Filter
                </CardTitle>
                <CardDescription>
                  Find the perfect CAD software for your needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Input
                      placeholder="Search software..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="under-100">Under $100</SelectItem>
                      <SelectItem value="over-100">Over $100</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="1">Beginner</SelectItem>
                      <SelectItem value="2">Intermediate</SelectItem>
                      <SelectItem value="3">Advanced</SelectItem>
                      <SelectItem value="4">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Software Grid */}
            {dataLoading ? (
              <div className="text-center py-12">
                <p className="text-slate-500">Loading software...</p>
              </div>
            ) : filteredSoftware.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-500">No software found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    CAD Software Directory
                  </h2>
                  <Badge variant="secondary" className="text-sm">
                    {filteredSoftware.length} results
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {filteredSoftware.map((software) => (
                    <SoftwareCard key={software.id} software={software} />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TrendingTools />
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => navigate('/quiz')}
                >
                  Take Quiz
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/compare')}
                >
                  Compare Tools
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/blog')}
                >
                  Read Blog
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Blog Section */}
        <BlogSection />
      </div>
    </div>
  );
};

export default Index;
