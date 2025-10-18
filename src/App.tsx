import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchBar } from "./presentation/components/SearchBar";
import { Header } from "./presentation/components/Header";
import { HomePage } from "./presentation/pages/HomePage";
import { FavoritesPage } from "./presentation/pages/FavoritesPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <SearchBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
