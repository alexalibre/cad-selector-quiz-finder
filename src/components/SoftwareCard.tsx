
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, DollarSign, Monitor, Smartphone, Globe, ExternalLink } from "lucide-react";

const SoftwareCard = ({ software }) => {
  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'web':
        return <Globe className="h-4 w-4" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getPriceDisplay = (price, type) => {
    if (price === 0 || price === null) return 'Free';
    if (type === 'one-time') return `$${price} one-time`;
    return `$${price}/month`;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-orange-100 text-orange-800';
      case 4: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 1: return 'Beginner';
      case 2: return 'Intermediate';
      case 3: return 'Advanced';
      case 4: return 'Expert';
      default: return 'Unknown';
    }
  };

  const handleExternalLink = (url) => {
    if (url) {
      // Ensure URL has protocol
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      window.open(fullUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            {software.image_url && (
              <div className="mb-3">
                <img 
                  src={software.image_url} 
                  alt={`${software.name} logo`}
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            )}
            <CardTitle className="text-lg font-bold text-slate-800 mb-1">
              {software.name}
              {software.version && (
                <span className="text-sm font-medium text-blue-600 ml-2">
                  {software.version}
                </span>
              )}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{software.rating || 0}</span>
              </div>
              <Badge 
                variant="secondary" 
                className={getDifficultyColor(software.difficulty)}
              >
                {getDifficultyText(software.difficulty)}
              </Badge>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <DollarSign className="h-4 w-4" />
              {getPriceDisplay(software.price, software.priceType || software.price_type)}
            </div>
          </div>
        </div>
        
        <CardDescription className="text-sm text-slate-600 line-clamp-2">
          {software.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Categories */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {(software.categories || []).slice(0, 3).map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {typeof category === 'string' ? category : category.name}
              </Badge>
            ))}
            {(software.categories || []).length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{software.categories.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Key Features */}
        {software.features && software.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-slate-700 mb-2">Key Features:</h4>
            <ul className="text-xs text-slate-600 space-y-1">
              {software.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-1">
                  <span className="text-blue-500 mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Platforms */}
        {software.platforms && software.platforms.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-medium">Available on:</span>
              <div className="flex items-center gap-1">
                {software.platforms.map((platform, index) => (
                  <div key={index} className="flex items-center gap-1">
                    {getPlatformIcon(platform)}
                    <span>{platform}</span>
                    {index < software.platforms.length - 1 && <span className="mx-1">•</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pros & Cons */}
        {software.pros && software.cons && (
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div>
                <span className="font-medium text-green-700">Pros: </span>
                <span className="text-slate-600">{software.pros.slice(0, 2).join(', ')}</span>
              </div>
              <div>
                <span className="font-medium text-red-700">Cons: </span>
                <span className="text-slate-600">{software.cons.slice(0, 1).join(', ')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-200">
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            size="sm"
            onClick={() => handleExternalLink(software.website_url)}
            disabled={!software.website_url}
          >
            {software.website_url ? 'Visit Website' : 'Learn More'}
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftwareCard;
