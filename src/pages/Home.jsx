import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import MovieGrid from "../components/MovieGrid.jsx";
import movies from "../data/movies.js";

const genres = [
  "All Genres",
  "Action",
  "Comedy",
  "Drama",
  "Sci-Fi",
  "Thriller",
  "Animation"
];

function Home({ watchlistIds, onToggleWatchlist, recentlyViewedIds }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const [ratingSort, setRatingSort] = useState("highest");
  const searchTerm = searchParams.get("search") || "";
  const featuredMovie = movies.find((movie) => movie.featured) || movies[0];

  const titleFilteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMovies = titleFilteredMovies.filter(
    (movie) => selectedGenre === "All Genres" || movie.genre === selectedGenre
  );
  const sortedMovies = [...filteredMovies].sort((firstMovie, secondMovie) =>
    ratingSort === "highest"
      ? secondMovie.rating - firstMovie.rating
      : firstMovie.rating - secondMovie.rating
  );
  const recentlyViewedMovies = recentlyViewedIds
    .map((movieId) => movies.find((movie) => movie.id === movieId))
    .filter(Boolean);

  function handleSearchChange(event) {
    const value = event.target.value;

    if (value.trim() === "") {
      setSearchParams({});
      return;
    }

    setSearchParams({ search: value });
  }

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">Featured Movie</p>
          <h1>{featuredMovie.title}</h1>
          <p className="hero-description">{featuredMovie.description}</p>
          <div className="hero-details">
            <span>{featuredMovie.genre}</span>
            <span>★ {featuredMovie.rating}</span>
          </div>
          <Link className="button" to={`/movies/${featuredMovie.id}`}>
            View Details
          </Link>
        </div>
        <img src={featuredMovie.poster} alt={`${featuredMovie.title} poster`} />
      </section>

      {recentlyViewedMovies.length > 0 && (
        <section className="recently-viewed">
          <div className="recently-viewed-heading">
            <div>
              <p className="eyebrow">Keep Watching</p>
              <h2>Recently Viewed</h2>
            </div>
            <span>{recentlyViewedMovies.length} recent</span>
          </div>
          <MovieGrid
            movies={recentlyViewedMovies}
            watchlistIds={watchlistIds}
            onToggleWatchlist={onToggleWatchlist}
          />
        </section>
      )}

      <section className="section-heading" id="movies">
        <div>
          <p className="eyebrow">Movie Collection</p>
          <h2>Explore Movies</h2>
        </div>
        <div className="collection-controls">
          <label className="movie-search">
            <span>Search by title</span>
            <input
              type="search"
              placeholder="Try Orbit Cafe"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>

          <label className="genre-filter">
            <span>Filter by genre</span>
            <select
              value={selectedGenre}
              onChange={(event) => setSelectedGenre(event.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </label>

          <label className="rating-sort">
            <span>Sort by rating</span>
            <select
              value={ratingSort}
              onChange={(event) => setRatingSort(event.target.value)}
            >
              <option value="highest">Highest → Lowest</option>
              <option value="lowest">Lowest → Highest</option>
            </select>
          </label>
        </div>
      </section>

      <MovieGrid
        movies={sortedMovies}
        watchlistIds={watchlistIds}
        onToggleWatchlist={onToggleWatchlist}
      />
    </>
  );
}

export default Home;
