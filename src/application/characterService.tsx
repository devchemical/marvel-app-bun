import type {
  DBCharacterRepository,
  MarvelCharacterRepository,
} from "../domain/characterRepository";

export const CharacterService = () => {
  const getCharacters = async (
    dbCharacterRepository: DBCharacterRepository
  ) => {
    return await dbCharacterRepository.getCharacters();
  };

  //   const searchCharacters = async (
  //     dbCharacterRepository: DBCharacterRepository,
  //     name: string
  //   ) => {
  //     return await dbCharacterRepository.searchCharacters(name);
  //   };

  return {
    getCharacters,
    // searchCharacters,
  };
};
