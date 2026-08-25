import React from "react";
import { Link } from "react-router-dom";
import MovieGrid from "../components/MovieGrid.jsx";
import movies from "../data/movies.js";

function Watchlist({ watchlistIds, onToggleWatchlist }) {
  const watchlistMovies = watchlistIds
    .map((movieId) => movies.find((movie) => movie.id === movieId))
    .filter(Boolean);

  if (watchlistMovies.length === 0) {
    return (
      <section className="watchlist-page empty-state">
        <p className="eyebrow">Your Watchlist</p>
        <h1>Your watchlist is empty</h1>
        <p>Add movies from the collection to keep them here for later.</p>
        <Link className="button" to="/movies">
          Explore Movies
        </Link>
      </section>
    );
  }

  return (
    <section className="watchlist-page">
      <div className="watchlist-heading">
        <div>
          <p className="eyebrow">Your Watchlist</p>
          <h1>Movies to Watch</h1>
        </div>
        <span>{watchlistMovies.length} saved</span>
      </div>
      <MovieGrid
        movies={watchlistMovies}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
      />
    </section>
  );
}

export default Watchlist;
