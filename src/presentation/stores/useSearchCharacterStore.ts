import { create } from "zustand";

interface SearchCharacterState {
  searchQuery: string;
}

interface SearchCharacterActions {
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

export const useSearchCharacterStore = create<
  SearchCharacterState & SearchCharacterActions
>()((set) => ({
  searchQuery: "",

  setQuery: (query: string) => {
    set({ searchQuery: query.trim() });
  },

  clearQuery: () => {
    set({ searchQuery: "" });
  },
}));
