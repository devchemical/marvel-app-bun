import * as React from "react";
import { CharacterCard } from "../components/CharacterCard";
import { apiRepository } from "../../infrastructure/dbApiRepository";
import type { DBCharacterEntity } from "../../domain/characterEntity";
import { CharacterService } from "../../application/characterService";
import { useSearchCharacters } from "../hooks/useSearchCharacters";
import { useSearchCharacterStore } from "../stores/useSearchCharacterStore";

export const HomePage = () => {
  const [characters, setCharacters] = React.useState<DBCharacterEntity[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const { searchQuery } = useSearchCharacterStore();

  console.log("searchQuery", searchQuery);

  React.useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const repository = CharacterService().getCharacters(apiRepository());
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

  React.useEffect(() => {}, [searchQuery]);

  return (
    <main className="container mx-auto px-4 py-2 bg-white min-h-[calc(100vh-200px)]">
      <div className="mb-6">
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
