import type { CharacterEntity } from "./characterEntity";

export interface CharacterRepository {
  getCharacters(): Promise<CharacterEntity[]>;
}
