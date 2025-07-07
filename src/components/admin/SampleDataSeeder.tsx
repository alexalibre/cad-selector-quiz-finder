
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database, Upload } from 'lucide-react';

interface SampleDataSeederProps {
  onDataSeeded: () => void;
}

const SampleDataSeeder = ({ onDataSeeded }: SampleDataSeederProps) => {
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();

  const sampleSoftware = [
    {
      name: 'AutoCAD',
      description: 'Industry-standard 2D and 3D CAD software for design and drafting',
      price: 1690,
      price_type: 'subscription',
      rating: 4.5,
      difficulty: 3,
      platforms: ['Windows', 'Mac', 'Web'],
      features: ['2D Drafting', '3D Modeling', 'Documentation', 'Collaboration'],
      website_url: 'https://www.autodesk.com/products/autocad'
    },
    {
      name: 'SolidWorks',
      description: 'Professional 3D CAD software for product design and engineering',
      price: 3995,
      price_type: 'subscription',
      rating: 4.7,
      difficulty: 3,
      platforms: ['Windows'],
      features: ['3D Modeling', 'Simulation', 'CAM', 'Data Management'],
      website_url: 'https://www.solidworks.com'
    },
    {
      name: 'Fusion 360',
      description: 'Cloud-based 3D CAD/CAM software for product development',
      price: 545,
      price_type: 'subscription',
      rating: 4.4,
      difficulty: 2,
      platforms: ['Windows', 'Mac', 'Web'],
      features: ['3D Modeling', 'CAM', 'Simulation', 'Collaboration'],
      website_url: 'https://www.autodesk.com/products/fusion-360'
    },
    {
      name: 'FreeCAD',
      description: 'Open-source parametric 3D CAD modeler',
      price: 0,
      price_type: 'free',
      rating: 3.8,
      difficulty: 3,
      platforms: ['Windows', 'Mac', 'Linux'],
      features: ['3D Modeling', 'Parametric Design', 'FEM Analysis', 'Open Source'],
      website_url: 'https://www.freecad.org'
    },
    {
      name: 'SketchUp',
      description: 'Easy-to-use 3D modeling software for architecture and design',
      price: 299,
      price_type: 'subscription',
      rating: 4.2,
      difficulty: 1,
      platforms: ['Windows', 'Mac', 'Web'],
      features: ['3D Modeling', 'Architecture', 'Visualization', 'Easy Learning'],
      website_url: 'https://www.sketchup.com'
    },
    {
      name: 'Blender',
      description: 'Free and open-source 3D creation suite',
      price: 0,
      price_type: 'free',
      rating: 4.6,
      difficulty: 4,
      platforms: ['Windows', 'Mac', 'Linux'],
      features: ['3D Modeling', 'Animation', 'Rendering', 'Sculpting'],
      website_url: 'https://www.blender.org'
    }
  ];

  const seedSampleData = async () => {
    setSeeding(true);
    try {
      // First, create a default category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .upsert([
          { name: '3D CAD Software', description: 'Professional 3D Computer-Aided Design software' },
          { name: '2D CAD Software', description: 'Traditional 2D drafting and design software' },
          { name: 'Free CAD Software', description: 'Open-source and free CAD solutions' }
        ])
        .select();

      if (categoryError) throw categoryError;

      const defaultCategoryId = categoryData?.[0]?.id;

      // Insert sample software
      const { error: softwareError } = await supabase
        .from('software_entries')
        .insert(
          sampleSoftware.map(software => ({
            ...software,
            category_id: defaultCategoryId,
            is_active: true
          }))
        );

      if (softwareError) throw softwareError;

      toast({
        title: "Success!",
        description: `Added ${sampleSoftware.length} CAD software entries`,
      });

      onDataSeeded();
    } catch (error) {
      console.error('Error seeding data:', error);
      toast({
        title: "Error",
        description: "Failed to seed sample data",
        variant: "destructive",
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Quick Setup
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-slate-600 mb-4">
          It looks like you don't have any CAD software entries yet. Click below to add some popular CAD software to get started.
        </p>
        <Button 
          onClick={seedSampleData} 
          disabled={seeding}
          className="w-full"
        >
          {seeding ? (
            <>
              <Upload className="mr-2 h-4 w-4 animate-spin" />
              Adding Sample Data...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Add Sample CAD Software
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SampleDataSeeder;
