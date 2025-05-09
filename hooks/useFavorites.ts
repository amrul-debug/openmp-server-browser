import { useFavorites as useFavoritesContext } from '@/contexts/FavoritesContext';

export function useFavorites() {
  return useFavoritesContext();
}