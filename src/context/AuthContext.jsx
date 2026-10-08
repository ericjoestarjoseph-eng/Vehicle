import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DEMO_ACCOUNTS } from '../lib/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('Admin'); // 'Admin' | 'Service Advisor' | 'Customer'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active Supabase session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setRole(session.user.user_metadata?.role || 'Admin');
        } else {
          // Default mock session for instant preview
          const defaultDemo = DEMO_ACCOUNTS[0];
          setUser({
            id: 'demo-user-1',
            email: defaultDemo.email,
            user_metadata: { name: defaultDemo.name, role: defaultDemo.role }
          });
          setRole(defaultDemo.role);
        }
      } catch (err) {
        console.warn('Supabase session fetch notice:', err);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen to Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setRole(session.user.user_metadata?.role || 'Admin');
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const loginWithSupabase = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      setRole(data.user.user_metadata?.role || 'Admin');
      return { success: true };
    } catch (err) {
      // Fallback mock login matching email
      const matchedDemo = DEMO_ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase());
      if (matchedDemo || password === 'password123') {
        const demoUser = matchedDemo || {
          email,
          name: email.split('@')[0],
          role: 'Customer'
        };
        const mockUserObj = {
          id: `usr-${Date.now()}`,
          email: demoUser.email,
          user_metadata: { name: demoUser.name, role: demoUser.role }
        };
        setUser(mockUserObj);
        setRole(demoUser.role);
        return { success: true, isDemo: true };
      }
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.log('Signout notice:', err);
    }
    setUser(null);
    setRole('Customer');
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    if (user) {
      setUser({
        ...user,
        user_metadata: { ...user.user_metadata, role: newRole }
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, loginWithSupabase, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
