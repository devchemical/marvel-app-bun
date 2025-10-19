import { Link, useLocation } from "react-router-dom";
import marvelLogo from "@/assets/marvel_logo.svg";
import favoriteIcon from "@/assets/favorite_icon_selected.svg";
import { useFavoritesStore } from "../stores/favoritesStore";

export const Header = () => {
  const location = useLocation();
  const isOnFavoritesPage = location.pathname === "/favorites";
  const favoritesCount = useFavoritesStore((state) =>
    state.getFavoritesCount()
  );

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img src={marvelLogo} alt="Marvel Logo" className="h-auto w-auto" />
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to={"/favorites"}
              className="cursor-pointer flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <img
                src={favoriteIcon}
                alt={
                  isOnFavoritesPage
                    ? "Ver todos los personajes"
                    : "Ver favoritos"
                }
                className="h-auto w-auto"
              />
              {favoritesCount > 0 && (
                <span className="text-white text-base">{favoritesCount}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
