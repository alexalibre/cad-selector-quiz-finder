
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check, X, ExternalLink } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface SoftwareEntry {
  id: string;
  name: string;
  description: string;
  price: number;
  price_type: string;
  image_url: string;
  website_url: string;
  rating: number;
  difficulty: number;
  platforms: string[];
  features: string[];
}

const Compare = () => {
  const [software, setSoftware] = useState<SoftwareEntry[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<SoftwareEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSoftware();
  }, []);

  const fetchSoftware = async () => {
    try {
      const { data } = await supabase
        .from('software_entries')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (data) setSoftware(data);
    } catch (error) {
      console.error('Error fetching software:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSoftwareSelect = (softwareId: string) => {
    const selected = software.find(s => s.id === softwareId);
    if (selected && selectedSoftware.length < 3 && !selectedSoftware.find(s => s.id === softwareId)) {
      setSelectedSoftware([...selectedSoftware, selected]);
    }
  };

  const removeSoftware = (softwareId: string) => {
    setSelectedSoftware(selectedSoftware.filter(s => s.id !== softwareId));
  };

  const getPriceDisplay = (price: number, type: string) => {
    if (price === 0 || price === null) return 'Free';
    if (type === 'one-time') return `$${price} one-time`;
    return `$${price}/month`;
  };

  const getDifficultyText = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      case 4: return 'Expert';
      default: return 'Unknown';
    }
  };

  const getAllFeatures = () => {
    const allFeatures = new Set<string>();
    selectedSoftware.forEach(software => {
      if (software.features) {
        software.features.forEach(feature => allFeatures.add(feature));
      }
    });
    return Array.from(allFeatures);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Compare CAD Tools</h1>
          <p className="text-lg text-slate-600 mb-6">
            Select up to 3 CAD software tools to compare their features, pricing, and specifications
          </p>
          
          <div className="max-w-md mx-auto">
            <Select onValueChange={handleSoftwareSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select software to compare" />
              </SelectTrigger>
              <SelectContent>
                {software.map((item) => (
                  <SelectItem 
                    key={item.id} 
                    value={item.id}
                    disabled={selectedSoftware.find(s => s.id === item.id) !== undefined}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedSoftware.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500">Select software tools above to start comparing</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Software Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedSoftware.map((item) => (
                <Card key={item.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removeSoftware(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <CardHeader className="pb-4">
                    {item.image_url && (
                      <img 
                        src={item.image_url} 
                        alt={`${item.name} logo`}
                        className="h-16 w-auto object-contain mb-4"
                      />
                    )}
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Pricing</h4>
                        <Badge variant="secondary" className="text-green-600">
                          {getPriceDisplay(item.price, item.price_type)}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Difficulty</h4>
                        <Badge variant="outline">
                          {getDifficultyText(item.difficulty)}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Rating</h4>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{item.rating}/5</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm mb-2">Platforms</h4>
                        <div className="flex flex-wrap gap-1">
                          {(item.platforms || []).map((platform, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {platform}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {item.website_url && (
                        <Button 
                          className="w-full mt-4" 
                          size="sm"
                          onClick={() => window.open(item.website_url, '_blank')}
                        >
                          Visit Website
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feature Comparison Table */}
            {selectedSoftware.length > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Feature Comparison</CardTitle>
                  <CardDescription>
                    Compare features across selected software
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-semibold">Feature</th>
                          {selectedSoftware.map((software) => (
                            <th key={software.id} className="text-center p-4 font-semibold">
                              {software.name}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {getAllFeatures().map((feature) => (
                          <tr key={feature} className="border-b">
                            <td className="p-4 font-medium">{feature}</td>
                            {selectedSoftware.map((software) => (
                              <td key={software.id} className="text-center p-4">
                                {software.features?.includes(feature) ? (
                                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                                ) : (
                                  <X className="h-5 w-5 text-red-400 mx-auto" />
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
