// src/components/StarredContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface StarredItem {
  imageUrl: string;
  name: string;
  vicinity: string;
  rating: number;
}

interface StarredContextType {
  starredItems: StarredItem[];
  toggleStarredItem: (item: StarredItem) => void;
}

export const StarredContext = createContext<StarredContextType | undefined>(undefined);

export const useStarred = () => {
  const context = useContext(StarredContext);
  if (!context) {
    throw new Error('useStarred must be used within a StarredProvider');
  }
  return context;
};

export const StarredProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [starredItems, setStarredItems] = useState<StarredItem[]>([]);

  const toggleStarredItem = (item: StarredItem) => {
    setStarredItems(prevItems => {
      if (prevItems.some(i => i.name === item.name)) {
        return prevItems.filter(i => i.name !== item.name);
      } else {
        return [...prevItems, item];
      }
    });
  };

  return (
    <StarredContext.Provider value={{ starredItems, toggleStarredItem }}>
      {children}
    </StarredContext.Provider>
  );
};
