
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileQuestion, FileText, BarChart3, Settings, Mail, Info } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Footer = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: FileQuestion, label: 'Take Quiz', path: '/quiz' },
    { icon: FileText, label: 'Blog', path: '/blog' },
    { icon: BarChart3, label: 'Compare Tools', path: '/compare' },
    ...(user ? [{ icon: Settings, label: 'Admin', path: '/admin' }] : []),
    { icon: Info, label: 'About', path: '/about' },
    { icon: Mail, label: 'Contact', path: '/contact' }
  ];

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-center space-x-8 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 text-xs transition-colors ${
                  isActive 
                    ? 'text-blue-600 font-medium' 
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="border-t border-slate-200 py-4 text-center text-sm text-slate-500">
          <p>&copy; 2024 CAD Directory. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
