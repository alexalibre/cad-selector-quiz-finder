
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category_id: string;
  featured_image_url: string;
  slug: string;
  published_at: string;
  categories?: {
    name: string;
  };
}

const BlogSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          excerpt,
          category_id,
          featured_image_url,
          slug,
          published_at,
          categories:category_id(name)
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      if (data) setPosts(data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Latest CAD Insights</h2>
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/2 mx-auto"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({length: 3}).map((_, i) => (
                  <div key={i} className="h-64 bg-slate-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Latest CAD Insights</h2>
          <p className="text-slate-600">Blog posts coming soon! Check back later for the latest CAD tips and insights.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Latest CAD Insights</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stay up-to-date with the latest trends, tips, and insights in the world of Computer-Aided Design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {posts.map((post) => (
            <Card key={post.id} className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              {post.featured_image_url && (
                <div className="aspect-video bg-slate-200 rounded-t-lg overflow-hidden">
                  <img 
                    src={post.featured_image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <CardHeader className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {post.categories && (
                    <Badge variant="secondary" className="text-xs">
                      {post.categories.name}
                    </Badge>
                  )}
                  <div className="flex items-center text-xs text-slate-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.published_at).toLocaleDateString()}
                  </div>
                </div>
                
                <CardTitle className="text-lg font-bold leading-tight mb-2">
                  {post.title}
                </CardTitle>
                
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Button variant="outline" className="w-full">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
