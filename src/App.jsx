import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import Watchlist from "./pages/Watchlist.jsx";
import movies from "./data/movies.js";

const WATCHLIST_STORAGE_KEY = "cineScopeWatchlist";
const THEME_STORAGE_KEY = "cineScopeTheme";

function getStoredTheme() {
  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  return storedTheme === "dark" || storedTheme === "light"
    ? storedTheme
    : "light";
}

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
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    window.localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      JSON.stringify(watchlistIds)
    );
  }, [watchlistIds]);

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function toggleWatchlist(movieId) {
    setWatchlistIds((currentWatchlist) =>
      currentWatchlist.includes(movieId)
        ? currentWatchlist.filter((id) => id !== movieId)
        : [...currentWatchlist, movieId]
    );
  }

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }

  return (
    <div className="app" data-theme={theme}>
      <Navbar
        watchlistCount={watchlistIds.length}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
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
