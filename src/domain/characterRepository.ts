import type {
  DBCharacterEntity,
  MarvelCharacterEntity,
} from "./characterEntity";

export interface MarvelCharacterRepository {
  getCharacters?(): Promise<MarvelCharacterEntity[]>;
  searchCharacters?(query: string): Promise<MarvelCharacterEntity[]>;
}

export interface DBCharacterRepository {
  getCharacters?(): Promise<DBCharacterEntity[]>;
  searchCharacters?(query: string): Promise<DBCharacterEntity[]>;
}
