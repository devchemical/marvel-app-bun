import * as React from "react";
import { CharacterCard } from "../components/CharacterCard";
import { apiRepository } from "../../infrastructure/apiRepository";
import type { CharacterEntity } from "../../domain/characterEntity";
import { getCharactersUseCase } from "../../application/getCharactersUseCase";

export const HomePage = () => {
  const [characters, setCharacters] = React.useState<CharacterEntity[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const repository = getCharactersUseCase(apiRepository());
        const charactersData = await repository;
        setCharacters(charactersData);
      } catch (error) {
        console.error("Error fetching characters:", error);
        setError(
          "Error al cargar los personajes. Por favor, intenta de nuevo."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 bg-white min-h-[calc(100vh-200px)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Personajes de Marvel</h2>
        {!isLoading && !error && (
          <p className="text-gray-600 text-sm font-bold">
            {characters.length} RESULTS
          </p>
        )}
      </div>

      {isLoading && (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
          <p className="mt-4 text-gray-600">Cargando personajes...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-16">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(172px,1fr))] gap-[16px] px-[48px]">
          {characters.map((character) => (
            <CharacterCard key={character.id} {...character} />
          ))}
        </div>
      )}
    </main>
  );
};
