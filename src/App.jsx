import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import movies from "./data/movies.js";

const WATCHLIST_STORAGE_KEY = "cineScopeWatchlist";

function getStoredWatchlist() {
  try {
    const storedWatchlist = JSON.parse(
      window.localStorage.getItem(WATCHLIST_STORAGE_KEY)
    );
    const validMovieIds = new Set(movies.map((movie) => movie.id));

    if (!Array.isArray(storedWatchlist)) {
      return [];
    }

    return [...new Set(storedWatchlist)].filter(
      (movieId) => Number.isInteger(movieId) && validMovieIds.has(movieId)
    );
  } catch {
    return [];
  }
}

function App() {
  const [watchlistIds, setWatchlistIds] = useState(getStoredWatchlist);

  useEffect(() => {
    window.localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      JSON.stringify(watchlistIds)
    );
  }, [watchlistIds]);

  function toggleWatchlist(movieId) {
    setWatchlistIds((currentWatchlist) =>
      currentWatchlist.includes(movieId)
        ? currentWatchlist.filter((id) => id !== movieId)
        : [...currentWatchlist, movieId]
    );
  }

  return (
    <div className="app">
      <Navbar watchlistCount={watchlistIds.length} />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                watchlistIds={watchlistIds}
                onToggleWatchlist={toggleWatchlist}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <Home
                watchlistIds={watchlistIds}
                onToggleWatchlist={toggleWatchlist}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <MovieDetails
                watchlistIds={watchlistIds}
                onToggleWatchlist={toggleWatchlist}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                watchlistIds={watchlistIds}
                onToggleWatchlist={toggleWatchlist}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
