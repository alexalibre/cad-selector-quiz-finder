
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Check if user is admin - use setTimeout to avoid recursion
          setTimeout(async () => {
            try {
              const { data, error } = await supabase
                .from('admin_users')
                .select('id, role')
                .eq('id', session.user.id)
                .single();
              
              console.log('Admin check result:', data, error);
              setIsAdmin(!!data && data.role === 'admin');
            } catch (error) {
              console.error('Error checking admin status:', error);
              setIsAdmin(false);
            }
          }, 0);
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Check admin status for existing session
        setTimeout(async () => {
          try {
            const { data, error } = await supabase
              .from('admin_users')
              .select('id, role')
              .eq('id', session.user.id)
              .single();
            
            console.log('Initial admin check result:', data, error);
            setIsAdmin(!!data && data.role === 'admin');
          } catch (error) {
            console.error('Error checking initial admin status:', error);
            setIsAdmin(false);
          }
          setLoading(false);
        }, 0);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    user,
    session,
    loading,
    isAdmin,
    signOut
  };
};
