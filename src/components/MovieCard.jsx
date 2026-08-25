import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie, isInWatchlist, onToggleWatchlist }) {
  return (
    <article className="movie-card">
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <div className="movie-card-content">
        <div className="movie-card-meta">
          <span>{movie.genre}</span>
          <span>{movie.year}</span>
        </div>
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <div className="movie-card-footer">
          <span className="rating">★ {movie.rating}</span>
          <div className="movie-card-actions">
            <button
              className="button button-small button-secondary"
              type="button"
              onClick={() => onToggleWatchlist(movie.id)}
            >
              {isInWatchlist ? "Remove" : "Add to Watchlist"}
            </button>
            <Link className="button button-small" to={`/movies/${movie.id}`}>
              View Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
