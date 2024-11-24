'use client'
import { createContext, useContext, useState, ReactNode } from 'react';
import {useStore} from '../store/useStore'

// Define the User interface
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  balance: number;
  enrolledCourses: number[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => string;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const {existingUsers} = useStore();

  const login = (email: string, password: string): string => {
    // Validate the user against existingUsers
    const user = existingUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      return 'Login successful';
    } else {
      return 'Invalid email or password';
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
