import type { CharacterRepository } from "../domain/characterRepository";

export const getCharactersUseCase = async (
  marvelRepository: CharacterRepository
) => {
  try {
    return await marvelRepository.getCharacters();
  } catch (error) {
    throw new Error(`Error obtaining characters: ${error}`);
  }
};
