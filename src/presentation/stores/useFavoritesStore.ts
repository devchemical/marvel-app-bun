import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CharacterEntity } from "../../domain/characterEntity";

interface FavoritesInterface {
  favorites: CharacterEntity[];
  toggleFavorite: (character: CharacterEntity) => void;
  isFavorite: (characterId: number) => boolean;
  getFavoritesCount: () => number;
}

export const useFavoritesStore = create<FavoritesInterface>()(
  persist(
    (set, get) => {
      // Funciones privadas (no exportadas en la interfaz)
      const addFavorite = (character: CharacterEntity) => {
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
        toggleFavorite: (character: CharacterEntity) => {
          const { isFavorite } = get();

          if (isFavorite(character.id)) {
            removeFavorite(character.id);
          } else {
            addFavorite(character);
          }
        },

        isFavorite: (characterId: number) => {
          const { favorites } = get();
          return favorites.some((fav) => fav.id === characterId);
        },

        getFavoritesCount: () => {
          const { favorites } = get();
          return favorites.length;
        },
      };
    },
    {
      name: "marvel_favorites",
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);
