
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">About CAD Directory</h1>
          <p className="text-lg text-slate-600">
            Your comprehensive guide to CAD software solutions
          </p>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                CAD Directory is dedicated to helping professionals, students, and hobbyists 
                find the perfect CAD software for their needs. We provide comprehensive 
                comparisons, detailed reviews, and expert recommendations to make your 
                software selection process easier.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-600">
                <li>• Comprehensive CAD software database</li>
                <li>• Interactive quiz to find your perfect match</li>
                <li>• Side-by-side software comparisons</li>
                <li>• Expert reviews and insights</li>
                <li>• Regular updates on new software releases</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600">
                Have questions or suggestions? We'd love to hear from you.
                Visit our Contact page to get in touch with our team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
