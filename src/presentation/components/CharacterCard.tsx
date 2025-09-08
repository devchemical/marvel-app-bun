import favoriteIconSelected from "@/assets/favorite_icon_selected.svg";
import type { CharacterEntity } from "../../domain/characterEntity";

export const CharacterCard = (character: CharacterEntity) => {
  return (
    <div
      key={character.id}
      className="flex flex-col w-[172px] h-[246px] bg-black"
    >
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="w-full h-[190px] object-cover"
      />
      <div className="border-red-500 border-2" />
      <div className="flex flex-row justify-between items-center flex-1 px-2">
        <p className="text-white">{character.name}</p>
        <button>
          <img src={favoriteIconSelected} className="h-auto w-auto" />
        </button>
      </div>
    </div>
  );
};
