'use client'
import { createContext, useContext, ReactNode } from 'react';
import { useStore } from '../store/useStore';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => string;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { user, login: storeLogin, logout: storeLogout } = useStore();

  const login = (email: string, password: string): string => {
    return storeLogin({ email, password });
  };

  const logout = () => {
    storeLogout();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
