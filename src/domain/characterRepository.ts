import type {
  DBCharacterEntity,
  MarvelCharacterEntity,
} from "./characterEntity";

export interface MarvelCharacterRepository {
  getCharacters(): Promise<MarvelCharacterEntity[]>;
  searchCharacters(name: string): Promise<MarvelCharacterEntity[]>;
}

export interface DBCharacterRepository {
  getCharacters(): Promise<DBCharacterEntity[]>;
  //   searchCharacters(name: string): Promise<DBCharacterEntity[]>;
}
