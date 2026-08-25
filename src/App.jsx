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
const RECENTLY_VIEWED_STORAGE_KEY = "cineScopeRecentlyViewed";
const RECENTLY_VIEWED_LIMIT = 5;

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

function getStoredRecentlyViewed() {
  try {
    const storedRecentlyViewed = JSON.parse(
      window.localStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY)
    );
    const validMovieIds = new Set(movies.map((movie) => movie.id));

    if (!Array.isArray(storedRecentlyViewed)) {
      return [];
    }

    return [...new Set(storedRecentlyViewed)]
      .filter(
        (movieId) => Number.isInteger(movieId) && validMovieIds.has(movieId)
      )
      .slice(0, RECENTLY_VIEWED_LIMIT);
  } catch {
    return [];
  }
}

function App() {
  const [watchlistIds, setWatchlistIds] = useState(getStoredWatchlist);
  const [theme, setTheme] = useState(getStoredTheme);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(
    getStoredRecentlyViewed
  );

  useEffect(() => {
    window.localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      JSON.stringify(watchlistIds)
    );
  }, [watchlistIds]);

  useEffect(() => {
    window.localStorage.setItem(
      RECENTLY_VIEWED_STORAGE_KEY,
      JSON.stringify(recentlyViewedIds)
    );
  }, [recentlyViewedIds]);

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

  function recordRecentlyViewed(movieId) {
    setRecentlyViewedIds((currentRecentlyViewed) => {
      if (currentRecentlyViewed[0] === movieId) {
        return currentRecentlyViewed;
      }

      return [
        movieId,
        ...currentRecentlyViewed.filter((id) => id !== movieId)
      ].slice(0, RECENTLY_VIEWED_LIMIT);
    });
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
                recentlyViewedIds={recentlyViewedIds}
              />
            }
          />
          <Route
            path="/movies"
            element={
              <Home
                watchlistIds={watchlistIds}
                onToggleWatchlist={toggleWatchlist}
                recentlyViewedIds={recentlyViewedIds}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <MovieDetails
                watchlistIds={watchlistIds}
                onToggleWatchlist={toggleWatchlist}
                onViewMovie={recordRecentlyViewed}
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
