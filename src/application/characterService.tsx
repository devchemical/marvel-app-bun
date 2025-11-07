import type {
  DBCharacterRepository,
  MarvelCharacterRepository,
} from "../domain/characterRepository";

export const CharacterService = () => {
  const getCharacters = async (
    dbCharacterRepository: DBCharacterRepository
  ) => {
    return await dbCharacterRepository.getCharacters?.();
  };

  const searchCharacters = async (
    dbCharacterRepository: DBCharacterRepository,
    query: string
  ) => {
    console.log("service", query);

    return await dbCharacterRepository.searchCharacters?.(query);
  };

  return {
    getCharacters,
    searchCharacters,
  };
};
