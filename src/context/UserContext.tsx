import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
  name: string;
  age: number;
  height: number;
  weight: number;
  gender: string;
  dailyRoutine: string;
  foodPreferences: string;
  fitnessGoal: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (data: UserData) => void;
  clearUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const clearUserData = () => {
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};