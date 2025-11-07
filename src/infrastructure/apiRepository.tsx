import MD5 from "crypto-js/md5";
import type { MarvelCharacterEntity } from "../domain/characterEntity";
import type { MarvelCharacterRepository } from "../domain/characterRepository";

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

const timestamp = 1;

const basicURL = "https://gateway.marvel.com/v1/public/";

const md5Message = timestamp + privateKey + publicKey;

const md5Hash = MD5(md5Message).toString();

const apiUrl = `${basicURL}characters?ts=1&apikey=${publicKey}&hash=${md5Hash}`;

export const apiRepository = (): MarvelCharacterRepository => {
  const getCharacters = async (): Promise<MarvelCharacterEntity[]> => {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `Marvel API error: ${response.status} ${response.statusText}`
        );
      }
      const charactersData = await response.json();
      return charactersData.data.results.map(
        (character: MarvelCharacterEntity) => {
          return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: {
              path: character.thumbnail.path,
              extension: character.thumbnail.extension,
            },
          };
        }
      );
    } catch (error) {
      throw new Error(`Error fetching characters: ${error}`);
    }
  };

  const searchCharacters = async (
    query: string
  ): Promise<MarvelCharacterEntity[]> => {
    try {
      const searchUrl = `${apiUrl}&nameStartsWith=${query}`;
      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error(
          `Marvel API error: ${response.status} ${response.statusText}`
        );
      }
      const charactersData = await response.json();
      return charactersData.data.results.map(
        (character: MarvelCharacterEntity) => {
          return {
            id: character.id,
            name: character.name,
            description: character.description,
            thumbnail: {
              path: character.thumbnail.path,
              extension: character.thumbnail.extension,
            },
          };
        }
      );
    } catch (error) {
      throw new Error(`Error searching characters: ${error}`);
    }
  };

  return {
    getCharacters,
    searchCharacters,
  };
};
