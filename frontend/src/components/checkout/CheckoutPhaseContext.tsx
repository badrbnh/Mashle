import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CheckoutPhaseContextType {
  currentPhase: number;
  setCurrentPhase: React.Dispatch<React.SetStateAction<number>>;
}

const CheckoutPhaseContext = createContext<CheckoutPhaseContextType | undefined>(undefined);

export const CheckoutPhaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPhase, setCurrentPhase] = useState<number>(0);

  return (
    <CheckoutPhaseContext.Provider value={{ currentPhase, setCurrentPhase }}>
      {children}
    </CheckoutPhaseContext.Provider>
  );
};

export const useCheckoutPhase = (): CheckoutPhaseContextType => {
  const context = useContext(CheckoutPhaseContext);
  if (!context) {
    throw new Error('useCheckoutPhase must be used within a CheckoutPhaseProvider');
  }
  return context;
};