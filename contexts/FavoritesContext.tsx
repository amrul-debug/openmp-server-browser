import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Platform } from 'react-native';

interface FavoritesContextProps {
  favorites: string[];
  toggleFavorite: (serverId: string) => void;
  isFavorite: (serverId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const storedFavorites = localStorage.getItem('serverFavorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web' && favorites.length > 0) {
      localStorage.setItem('serverFavorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  const toggleFavorite = (serverId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(serverId)) {
        return prevFavorites.filter(id => id !== serverId);
      } else {
        return [...prevFavorites, serverId];
      }
    });
  };

  const isFavorite = (serverId: string) => {
    return favorites.includes(serverId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};