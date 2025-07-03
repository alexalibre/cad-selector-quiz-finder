
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category_id: string;
  status: string;
  featured_image_url: string;
  slug: string;
  created_at: string;
  published_at: string;
}

interface Category {
  id: string;
  name: string;
}

interface BlogManagerProps {
  onStatsUpdate: () => void;
}

const BlogManager = ({ onStatsUpdate }: BlogManagerProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category_id: '',
    status: 'draft',
    featured_image_url: '',
    slug: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [postsData, categoriesData] = await Promise.all([
        supabase.from('blog_posts').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name')
      ]);

      if (postsData.data) setPosts(postsData.data);
      if (categoriesData.data) setCategories(categoriesData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load blog data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category_id: '',
      status: 'draft',
      featured_image_url: '',
      slug: ''
    });
    setEditingPost(null);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  };

  const generateAIContent = async () => {
    // Mock AI content generation - replace with actual OpenAI API call
    const topics = [
      'Best CAD Software for Beginners in 2024',
      'AutoCAD vs SolidWorks: Complete Comparison',
      'Free CAD Software That Rivals Premium Tools',
      'CAD Software for 3D Printing: Ultimate Guide',
      'Architecture CAD Software: Top 10 Picks',
      'Mechanical CAD Design Best Practices'
    ];
    
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const mockContent = `# ${randomTopic}

Computer-Aided Design (CAD) software has revolutionized the way engineers, architects, and designers create and modify designs. In this comprehensive guide, we'll explore the latest trends and recommendations in CAD software.

## Introduction

The world of CAD software continues to evolve rapidly, with new features and capabilities being added regularly. Whether you're a beginner looking to learn CAD or a professional seeking to upgrade your tools, choosing the right software is crucial for your success.

## Key Features to Consider

When selecting CAD software, consider these important factors:

- **Ease of Use**: How intuitive is the interface?
- **Feature Set**: Does it include all the tools you need?
- **File Compatibility**: Can it work with industry-standard formats?
- **Cost**: Does it fit within your budget?
- **Support**: Is there adequate documentation and community support?

## Conclusion

The CAD software landscape offers something for everyone, from free open-source solutions to professional-grade tools. Take time to evaluate your specific needs and try different options before making a decision.

*This content was generated to help you get started with your blog post. Feel free to edit and customize it according to your needs.*`;

    setFormData({
      ...formData,
      title: randomTopic,
      content: mockContent,
      excerpt: `A comprehensive guide to ${randomTopic.toLowerCase()}, covering key features, comparisons, and recommendations for users at all levels.`,
      slug: generateSlug(randomTopic)
    });
    
    toast({
      title: "AI Content Generated",
      description: "Blog post content has been generated. You can edit it before saving.",
    });
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      content: post.content || '',
      excerpt: post.excerpt || '',
      category_id: post.category_id || '',
      status: post.status || 'draft',
      featured_image_url: post.featured_image_url || '',
      slug: post.slug || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      author_id: user?.id,
      slug: formData.slug || generateSlug(formData.title),
      published_at: formData.status === 'published' ? new Date().toISOString() : null
    };

    try {
      if (editingPost) {
        const { error } = await supabase
          .from('blog_posts')
          .update(data)
          .eq('id', editingPost.id);
        
        if (error) throw error;
        toast({ title: "Success", description: "Blog post updated successfully" });
      } else {
        const { error } = await supabase
          .from('blog_posts')
          .insert([data]);
        
        if (error) throw error;
        toast({ title: "Success", description: "Blog post created successfully" });
      }
      
      setIsDialogOpen(false);
      resetForm();
      fetchData();
      onStatsUpdate();
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast({
        title: "Error",
        description: "Failed to save blog post",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast({ title: "Success", description: "Blog post deleted successfully" });
      fetchData();
      onStatsUpdate();
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Blog Posts</h2>
          <p className="text-slate-600">Manage your CAD blog content</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </DialogTrigger>
          
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
              </DialogTitle>
              <DialogDescription>
                Write and manage your CAD blog content.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button type="button" onClick={generateAIContent} variant="outline">
                  Generate AI Content
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    placeholder="auto-generated-from-title"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={2}
                />
              </div>
              
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={10}
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
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
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="featured_image">Featured Image URL</Label>
                  <Input
                    id="featured_image"
                    type="url"
                    value={formData.featured_image_url}
                    onChange={(e) => setFormData({...formData, featured_image_url: e.target.value})}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingPost ? 'Update' : 'Create'} Post
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status}
                    </Badge>
                  </div>
                  
                  <p className="text-slate-600 mb-2">{post.excerpt}</p>
                  
                  <div className="text-sm text-slate-500">
                    Created: {new Date(post.created_at).toLocaleDateString()}
                    {post.published_at && (
                      <span> • Published: {new Date(post.published_at).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)}>
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

export default BlogManager;
