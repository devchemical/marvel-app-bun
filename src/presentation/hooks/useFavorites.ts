import { useFavoritesStore } from "../stores/useFavoritesStore";

export const useFavorites = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const getFavoritesCount = useFavoritesStore(
    (state) => state.getFavoritesCount
  );

  return {
    favorites,
    favoritesCount: getFavoritesCount(),
    toggleFavorite,
    isFavorite,
  };
};
