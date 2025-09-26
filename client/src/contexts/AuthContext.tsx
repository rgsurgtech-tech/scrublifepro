import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionTier: 'free' | 'standard' | 'premium';
  selectedSpecialties: string[];
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading, refetch } = useQuery<User | null>({
    queryKey: ['/api/auth/me'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/auth/me', { 
          credentials: 'include'
        });
        
        if (res.status === 401) {
          return null;
        }
        
        if (!res.ok) {
          throw new Error(`Failed to fetch user: ${res.status}`);
        }
        
        const data = await res.json();
        // Server returns { user: userData }, so extract the user
        return data.user || data;
      } catch (error) {
        console.error('Auth fetch error:', error);
        throw error; // Don't swallow errors
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  return (
    <AuthContext.Provider value={{ user: user || null, isLoading, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}