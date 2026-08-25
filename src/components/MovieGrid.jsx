import React from "react";
import MovieCard from "./MovieCard.jsx";

function MovieGrid({ movies, watchlistIds, onToggleWatchlist }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h3>No movies found</h3>
        <p>Try searching with a different movie title.</p>
      </div>
    );
  }

  return (
    <section className="movie-grid" aria-label="Movie collection">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isInWatchlist={watchlistIds.includes(movie.id)}
          onToggleWatchlist={onToggleWatchlist}
        />
      ))}
    </section>
  );
}

export default MovieGrid;
