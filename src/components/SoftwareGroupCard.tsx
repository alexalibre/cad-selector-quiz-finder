
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Star, DollarSign, ChevronDown, ChevronUp, Monitor, Smartphone, Globe } from "lucide-react";
import { SoftwareGroup } from '@/data/softwareGroups';

interface SoftwareGroupCardProps {
  group: SoftwareGroup;
}

const SoftwareGroupCard: React.FC<SoftwareGroupCardProps> = ({ group }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'web':
        return <Globe className="h-3 w-3" />;
      case 'mobile':
      case 'ipad':
        return <Smartphone className="h-3 w-3" />;
      default:
        return <Monitor className="h-3 w-3" />;
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    switch (difficulty) {
      case 1: return 'bg-green-100 text-green-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-orange-100 text-orange-800';
      case 4: return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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

  const getPriceDisplay = (price: number, type: string) => {
    if (price === 0) return 'Free';
    if (type === 'one-time') return `$${price} one-time`;
    return `$${price}/month`;
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-slate-800 mb-1 flex items-center gap-2">
              {group.name}
              {group.versions.length > 1 && (
                <Badge variant="outline" className="text-xs">
                  {group.versions.length} versions
                </Badge>
              )}
            </CardTitle>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{group.mainVersion.rating}</span>
              </div>
              <Badge 
                variant="secondary" 
                className={getDifficultyColor(group.mainVersion.difficulty)}
              >
                {group.versions.length > 1 ? `Level ${group.difficultyRange}` : getDifficultyText(group.mainVersion.difficulty)}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-green-600 font-semibold">
              <DollarSign className="h-4 w-4" />
              {group.priceRange}
            </div>
          </div>
        </div>
        
        <CardDescription className="text-sm text-slate-600 line-clamp-2">
          {group.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col">
        {/* Categories */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {group.mainVersion.categories.slice(0, 3).map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {group.mainVersion.categories.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{group.mainVersion.categories.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Platforms */}
        <div className="mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-medium">Available on:</span>
            <div className="flex items-center gap-1">
              {group.mainVersion.platforms.slice(0, 3).map((platform, index) => (
                <div key={index} className="flex items-center gap-1">
                  {getPlatformIcon(platform)}
                  <span>{platform}</span>
                  {index < Math.min(2, group.mainVersion.platforms.length - 1) && <span className="mx-1">•</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-4 flex-1">
          <h4 className="text-sm font-medium text-slate-700 mb-2">Key Features:</h4>
          <ul className="text-xs text-slate-600 space-y-1">
            {group.mainVersion.features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-blue-500 mt-1">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Versions Collapsible */}
        {group.versions.length > 1 && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mb-4">
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                View All Versions ({group.versions.length})
                {isOpen ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3 space-y-2">
              {group.versions.map((version, index) => (
                <div key={index} className="p-3 border rounded-lg bg-slate-50">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-medium text-sm">
                      {version.version || 'Standard'}
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      {getPriceDisplay(version.price, version.priceType)}
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 mb-2">
                    {version.description}
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant="secondary" 
                      className={`${getDifficultyColor(version.difficulty)} text-xs`}
                    >
                      {getDifficultyText(version.difficulty)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{version.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-3 border-t border-slate-200">
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            size="sm"
          >
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoftwareGroupCard;
