
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthForm from '@/components/auth/AuthForm';
import AdminDashboard from '@/components/admin/AdminDashboard';

const Admin = () => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <AuthForm onSuccess={() => window.location.reload()} />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-slate-600">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
};

export default Admin;
