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

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const searchTerm = searchParams.get("search") || "";
  const featuredMovie = movies.find((movie) => movie.featured) || movies[0];

  const titleFilteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredMovies = titleFilteredMovies.filter(
    (movie) => selectedGenre === "All Genres" || movie.genre === selectedGenre
  );

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
        </div>
      </section>

      <MovieGrid movies={filteredMovies} />
    </>
  );
}

export default Home;
