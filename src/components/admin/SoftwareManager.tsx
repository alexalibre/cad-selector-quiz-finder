import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import SampleDataSeeder from './SampleDataSeeder';

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

interface SoftwareManagerProps {
  onStatsUpdate: () => void;
}

const SoftwareManager = ({ onStatsUpdate }: SoftwareManagerProps) => {
  const [software, setSoftware] = useState<SoftwareEntry[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSoftware, setEditingSoftware] = useState<SoftwareEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    price_type: 'one-time',
    category_id: '',
    image_url: '',
    website_url: '',
    rating: '0',
    difficulty: '1',
    platforms: '',
    features: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [softwareData, categoriesData] = await Promise.all([
        supabase.from('software_entries').select('*').order('name'),
        supabase.from('categories').select('*').order('name')
      ]);

      if (softwareData.data) setSoftware(softwareData.data);
      if (categoriesData.data) setCategories(categoriesData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      price_type: 'one-time',
      category_id: '',
      image_url: '',
      website_url: '',
      rating: '0',
      difficulty: '1',
      platforms: '',
      features: ''
    });
    setEditingSoftware(null);
  };

  const handleEdit = (item: SoftwareEntry) => {
    setEditingSoftware(item);
    setFormData({
      name: item.name || '',
      description: item.description || '',
      price: item.price?.toString() || '',
      price_type: item.price_type || 'one-time',
      category_id: item.category_id || '',
      image_url: item.image_url || '',
      website_url: item.website_url || '',
      rating: item.rating?.toString() || '0',
      difficulty: item.difficulty?.toString() || '1',
      platforms: Array.isArray(item.platforms) ? item.platforms.join(', ') : '',
      features: Array.isArray(item.features) ? item.features.join(', ') : ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const platformsArray = formData.platforms.split(',').map(p => p.trim()).filter(p => p);
    const featuresArray = formData.features.split(',').map(f => f.trim()).filter(f => f);
    
    const data = {
      name: formData.name,
      description: formData.description,
      price: formData.price ? parseFloat(formData.price) : null,
      price_type: formData.price_type,
      category_id: formData.category_id || null,
      image_url: formData.image_url || null,
      website_url: formData.website_url || null,
      rating: parseFloat(formData.rating),
      difficulty: parseInt(formData.difficulty),
      platforms: platformsArray,
      features: featuresArray
    };

    try {
      if (editingSoftware) {
        const { error } = await supabase
          .from('software_entries')
          .update(data)
          .eq('id', editingSoftware.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Software updated successfully" });
      } else {
        const { error } = await supabase
          .from('software_entries')
          .insert([data]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Software added successfully" });
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchData();
      onStatsUpdate();
    } catch (error) {
      console.error('Error saving software:', error);
      toast({
        title: "Error",
        description: "Failed to save software entry",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this software entry?')) return;
    
    try {
      const { error } = await supabase
        .from('software_entries')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({ title: "Success", description: "Software deleted successfully" });
      fetchData();
      onStatsUpdate();
    } catch (error) {
      console.error('Error deleting software:', error);
      toast({
        title: "Error",
        description: "Failed to delete software entry",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {software.length === 0 && (
        <SampleDataSeeder onDataSeeded={fetchData} />
      )}
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Software Entries</h2>
          <p className="text-slate-600">Manage CAD software listings</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Software
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingSoftware ? 'Edit Software' : 'Add New Software'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the CAD software entry.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({...formData, category_id: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="price_type">Price Type</Label>
                  <Select value={formData.price_type} onValueChange={(value) => setFormData({...formData, price_type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="one-time">One-time</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    type="url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({...formData, website_url: e.target.value})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="platforms">Platforms (comma separated)</Label>
                <Input
                  id="platforms"
                  value={formData.platforms}
                  onChange={(e) => setFormData({...formData, platforms: e.target.value})}
                  placeholder="Windows, Mac, Linux"
                />
              </div>
              
              <div>
                <Label htmlFor="features">Features (comma separated)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({...formData, features: e.target.value})}
                  placeholder="3D modeling, CAM, Simulation"
                  rows={2}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingSoftware ? 'Update' : 'Add'} Software
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {software.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    {item.website_url && (
                      <Button size="sm" variant="ghost" asChild>
                        <a href={item.website_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                  
                  <p className="text-slate-600 mb-2">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge variant="secondary">
                      {item.price === 0 || item.price === null ? 'Free' : `$${item.price} ${item.price_type}`}
                    </Badge>
                    <Badge variant="outline">Rating: {item.rating}</Badge>
                    <Badge variant="outline">Difficulty: {item.difficulty}/4</Badge>
                  </div>
                  
                  {item.platforms && item.platforms.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {item.platforms.map((platform, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SoftwareManager;
