/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  completeLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  const completeLoading = useCallback(() => {
    setProgress(100);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, progress, setLoading, setProgress, completeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
