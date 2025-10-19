import * as React from "react";
import { CharacterCard } from "../components/CharacterCard";
import { useFavoritesStore } from "../stores/favoritesStore";

export const FavoritesPage = () => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const favoritesCount = useFavoritesStore((state) =>
    state.getFavoritesCount()
  );

  return (
    <main className="container mx-auto px-4 py-8 bg-white min-h-[calc(100vh-200px)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Mis Personajes Favoritos</h2>
        {favoritesCount > 0 && (
          <p className="text-gray-600 text-sm font-bold">
            {favoritesCount} {favoritesCount === 1 ? "RESULT" : "RESULTS"}
          </p>
        )}
      </div>

      {favoritesCount === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-2">
            No tienes personajes favoritos todavía
          </p>
          <p className="text-gray-400 text-sm">
            Explora personajes y márcalos con ❤️ para verlos aquí
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(172px,1fr))] gap-[16px] px-[48px]">
          {favorites.map((character) => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      )}
    </main>
  );
};
