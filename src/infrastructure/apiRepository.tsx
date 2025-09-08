import MD5 from "crypto-js/md5";
import type { CharacterEntity } from "../domain/characterEntity";
import type { CharacterRepository } from "../domain/characterRepository";

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;

const timestamp = 1;

const basicURL = "https://gateway.marvel.com/v1/public/";

const md5Message = timestamp + privateKey + publicKey;

const md5Hash = MD5(md5Message).toString();
console.log({ publicKey, privateKey, md5Message, md5Hash });

export const apiRepository = (
  apiUrl = `${basicURL}characters?ts=1&apikey=${publicKey}&hash=${md5Hash}`
): CharacterRepository => {
  const getCharacters = async (): Promise<CharacterEntity[]> => {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const charactersData = await response.json();
    return charactersData.data.results.map((character: CharacterEntity) => {
      return {
        id: character.id,
        name: character.name,
        description: character.description,
        thumbnail: {
          path: character.thumbnail.path,
          extension: character.thumbnail.extension,
        },
      };
    });
  };

  return {
    getCharacters,
  };
};
