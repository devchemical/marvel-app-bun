import type { DBCharacterEntity } from "../domain/characterEntity";
import type { DBCharacterRepository } from "../domain/characterRepository";

const basicUrl = "https://dragonball-api.com/api";

export const apiRepository = (): DBCharacterRepository => {
  const mapCharacter = (character: DBCharacterEntity) => ({
    id: character.id,
    name: character.name,
    ki: character.ki,
    image: character.image,
  });

  const getCharacters = async (): Promise<DBCharacterEntity[]> => {
    try {
      const response = await fetch(`${basicUrl}/characters?limit=20`);
      if (!response.ok) {
        throw new Error(
          `DB API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data.items.map(mapCharacter);
    } catch (error) {
      throw new Error(`Error fetching characters from DB: ${error}`);
    }
  };

  const searchCharacters = async (
    query: string
  ): Promise<DBCharacterEntity[]> => {
    try {
      const response = await fetch(
        `${basicUrl}/characters?name=${query}&limit=20`
      );
      if (!response.ok) {
        throw new Error(
          `DB API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      const items = data.items || data;
      return items.map(mapCharacter);
    } catch (error) {
      throw new Error(`Error searching characters from DB: ${error}`);
    }
  };

  return {
    getCharacters,
    searchCharacters,
  };
};
