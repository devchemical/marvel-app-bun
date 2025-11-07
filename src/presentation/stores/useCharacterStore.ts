import { create } from "zustand";
import type { DBCharacterEntity } from "../../domain/characterEntity";
import { persist } from "zustand/middleware";

const CACHE_DURATION = 24 * 3600 * 1000;

interface CharacterState {
  characters: DBCharacterEntity[];
  isLoading: boolean;
  lastFetch: number | null;
  error: string | null;
}

interface CharacterActions {
  setCharacters: (characters: DBCharacterEntity[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  isCacheValid: () => boolean;
}

export const useCharactersStore = create<CharacterState & CharacterActions>()(
  persist(
    (set, get) => ({
      characters: [],
      isLoading: false,
      lastFetch: null,
      error: null,

      setCharacters: (characters) => {
        set({
          characters,
          lastFetch: Date.now(),
          error: null,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setError: (error) => {
        set({ error: error, isLoading: false });
      },

      isCacheValid: () => {
        const { lastFetch } = get();
        if (!lastFetch) return false;
        return Date.now() - lastFetch < CACHE_DURATION;
      },
    }),
    {
      name: "db_characters_store",
      partialize: (state) => ({
        characters: state.characters,
        lastFetch: state.lastFetch,
      }),
    }
  )
);
