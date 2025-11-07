import favoriteIconSelected from "@/assets/favorite_icon_selected.svg";
import favoriteIconUnselected from "@/assets/favorite_icon_unselected.svg";
import type { DBCharacterEntity } from "../../domain/characterEntity";
import { useFavoritesStore } from "../stores/useFavoritesStore";

export const CharacterCard = (character: DBCharacterEntity) => {
  const isFavorite = useFavoritesStore((state) => state.isFavorite);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isCharacterFavorite = isFavorite(character.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(character);
  };

  console.log("image url", character);

  return (
    <div className="flex flex-col w-[172px] h-[246px] bg-black">
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-[190px] object-contain"
      />
      <div className="border-red-500 border-2" />
      <div className="flex flex-row justify-between items-center flex-1 px-2">
        <p className="text-white text-sm truncate">{character.name}</p>
        <button
          onClick={handleToggleFavorite}
          className="cursor-pointer"
          aria-label={
            isCharacterFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"
          }
        >
          <img
            src={
              isCharacterFavorite
                ? favoriteIconSelected
                : favoriteIconUnselected
            }
            alt={isCharacterFavorite ? "Favorito" : "No favorito"}
            className="h-3 w-3"
          />
        </button>
      </div>
    </div>
  );
};
