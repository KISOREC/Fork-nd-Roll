import React from "react";
import { Link, useParams } from "react-router-dom";
import movies from "../data/movies.js";

function MovieDetails({ watchlistIds, onToggleWatchlist }) {
  const { movieId } = useParams();
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <section className="details-page not-found">
        <h1>Movie not found</h1>
        <p>The movie you are looking for is not available in CineScope.</p>
        <Link className="button" to="/">
          Back to Movies
        </Link>
      </section>
    );
  }

  return (
    <section className="details-page">
      <Link className="back-link" to="/">
        ← Back to Movies
      </Link>

      <div className="details-layout">
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <div className="details-content">
          <p className="eyebrow">{movie.genre}</p>
          <h1>{movie.title}</h1>
          <p className="details-description">{movie.description}</p>

          <div className="details-list">
            <div>
              <span>Release Year</span>
              <strong>{movie.year}</strong>
            </div>
            <div>
              <span>Rating</span>
              <strong>★ {movie.rating}</strong>
            </div>
            <div>
              <span>Duration</span>
              <strong>{movie.duration}</strong>
            </div>
            <div>
              <span>Director</span>
              <strong>{movie.director}</strong>
            </div>
          </div>

          <div className="cast-section">
            <h2>Cast</h2>
            <ul>
              {movie.cast.map((actor) => (
                <li key={actor}>{actor}</li>
              ))}
            </ul>
          </div>

          <button
            className="button details-watchlist-button"
            type="button"
            onClick={() => onToggleWatchlist(movie.id)}
          >
            {watchlistIds.includes(movie.id)
              ? "Remove from Watchlist"
              : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default MovieDetails;
