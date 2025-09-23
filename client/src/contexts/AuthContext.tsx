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
    queryFn: () => {
      return fetch('/api/auth/me', { credentials: 'include' })
        .then(res => {
          if (res.status === 401) return null;
          if (!res.ok) throw new Error('Failed to fetch user');
          return res.json();
        });
    },
    retry: false
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