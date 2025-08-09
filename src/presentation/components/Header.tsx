import { Link, useLocation } from "react-router-dom";
import marvelLogo from "@/assets/marvel_logo.svg";
import favoriteIcon from "@/assets/favorite_icon_selected.svg";

export const Header = () => {
  const location = useLocation();
  const isOnFavoritesPage = location.pathname === "/favorites";

  return (
    <header className="bg-black text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src={marvelLogo} alt="Marvel Logo" className="h-auto w-auto" />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to={"/favorites"} className="cursor-pointer">
              <img
                src={favoriteIcon}
                alt={
                  isOnFavoritesPage
                    ? "Ver todos los personajes"
                    : "Ver favoritos"
                }
                className="h-auto w-auto"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
