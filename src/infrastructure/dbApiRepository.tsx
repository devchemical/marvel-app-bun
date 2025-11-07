import type { DBCharacterEntity } from "../domain/characterEntity";
import type { DBCharacterRepository } from "../domain/characterRepository";

const basicUrl = "https://dragonball-api.com/api";

export const apiRepository = (): DBCharacterRepository => {
  const getCharacters = async (): Promise<DBCharacterEntity[]> => {
    try {
      const response = await fetch(`${basicUrl}/characters?limit=20`);
      if (!response.ok) {
        throw new Error(
          `DB API error: ${response.status} ${response.statusText}`
        );
      }

      const charactersData = await response.json();
      console.log("charactersData", charactersData);
      return charactersData.items.map((character: DBCharacterEntity) => {
        return {
          id: character.id,
          name: character.name,
          ki: character.ki,
          image: character.image,
        };
      });
    } catch (error) {
      throw new Error(`Error fetching characters from DB: ${error}`);
    }
  };

  //   const searchCharacters = async (
  //     name: string
  //   ): Promise<DBCharacterEntity[]> => {
  //     // Implementation for searching characters in the database
  //   };

  return {
    getCharacters,
    // searchCharacters,
  };
};
