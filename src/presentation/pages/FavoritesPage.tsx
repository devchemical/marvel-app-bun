import * as React from "react";

export const FavoritesPage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Mis Personajes Favoritos</h2>
      </div>
      <div className="text-center py-8">
        <p className="text-gray-600">
          Aquí aparecerán tus personajes favoritos cuando los marques con ❤️
        </p>
      </div>
    </main>
  );
};
