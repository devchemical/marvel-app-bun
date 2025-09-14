import * as React from "react";
import { CharacterCard } from "../components/CharacterCard";
import { apiRepository } from "../../infrastructure/apiRepository";
import type { CharacterEntity } from "../../domain/characterEntity";
import { getCharactersUseCase } from "../../application/getCharactersUseCase";

export const HomePage = () => {
  const [characters, setCharacters] = React.useState(Array<CharacterEntity>);

  React.useEffect(() => {
    const fetchCharacters = async () => {
      const repository = getCharactersUseCase(apiRepository());
      try {
        const charactersData = await repository;
        setCharacters(charactersData);
      } catch (error) {
        console.error("Error fetching characters:", error);
      }
    };

    fetchCharacters();
  }, []);

  console.log({ characters });

  return (
    <main className="container mx-auto px-4 py-8 bg-white">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Personajes de Marvel</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(172px,1fr))] gap-[16px] px-[48px]">
          {characters.map((character) => (
            <CharacterCard {...character} />
          ))}
        </div>
      </div>
    </main>
  );
};
