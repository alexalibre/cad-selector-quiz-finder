
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface TrendingSoftware {
  id: string;
  name: string;
  rating: number;
  price: number;
  price_type: string;
  image_url: string;
}

const TrendingTools = () => {
  const [trending, setTrending] = useState<TrendingSoftware[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingTools();
  }, []);

  const fetchTrendingTools = async () => {
    try {
      // For now, we'll show top-rated tools as "trending"
      // In a real app, this would be based on user interactions, quiz results, etc.
      const { data } = await supabase
        .from('software_entries')
        .select('id, name, rating, price, price_type, image_url')
        .eq('is_active', true)
        .order('rating', { ascending: false })
        .limit(5);
      
      if (data) setTrending(data);
    } catch (error) {
      console.error('Error fetching trending tools:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriceDisplay = (price: number, type: string) => {
    if (price === 0 || price === null) return 'Free';
    if (type === 'one-time') return `$${price}`;
    return `$${price}/mo`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Trending Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Trending Tools
        </CardTitle>
        <CardDescription>
          Most popular CAD software this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {trending.map((tool, index) => (
            <div key={tool.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                {index + 1}
              </div>
              
              {tool.image_url && (
                <img 
                  src={tool.image_url} 
                  alt={tool.name}
                  className="w-8 h-8 object-contain"
                />
              )}
              
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{tool.name}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">★ {tool.rating}</span>
                  <Badge variant="secondary" className="text-xs">
                    {getPriceDisplay(tool.price, tool.price_type)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTools;
