import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DBCharacterEntity } from "../../domain/characterEntity";

interface FavoritesInterface {
  favorites: DBCharacterEntity[];
  toggleFavorite: (character: DBCharacterEntity) => void;
  isFavorite: (characterId: number) => boolean;
  getFavoritesCount: () => number;
}

export const useFavoritesStore = create<FavoritesInterface>()(
  persist(
    (set, get) => {
      // Funciones privadas (no exportadas en la interfaz)
      const addFavorite = (character: DBCharacterEntity) => {
        const { favorites } = get();
        set({ favorites: [...favorites, character] });
      };

      const removeFavorite = (characterId: number) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== characterId),
        }));
      };

      return {
        favorites: [],

        // Acciones públicas
        isFavorite: (characterId: number) => {
          const { favorites } = get();
          return favorites.some((fav) => fav.id === characterId);
        },

        getFavoritesCount: () => {
          const { favorites } = get();
          return favorites.length;
        },

        toggleFavorite: (character: DBCharacterEntity) => {
          const { isFavorite } = get();

          if (isFavorite(character.id)) {
            removeFavorite(character.id);
          } else {
            addFavorite(character);
          }
        },
      };
    },
    {
      name: "marvel_favorites",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
