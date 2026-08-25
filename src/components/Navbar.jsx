import React from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import movies from "../data/movies.js";

function Navbar({ watchlistCount, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchText.trim())}`);
    setMenuOpen(false);
  }

  function handleSurpriseMe() {
    const movie = movies[Math.floor(Math.random() * movies.length)];

    navigate(`/movies/${movie.id}`);
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo" onClick={() => setMenuOpen(false)}>
        <span className="logo-mark">C</span>
        <span>CineScope</span>
      </Link>

      <button
        className="menu-button"
        type="button"
        aria-label="Toggle navigation"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={menuOpen ? "nav-content show" : "nav-content"}>
        <div className="nav-links">
          <NavLink to="/" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/movies" onClick={() => setMenuOpen(false)}>
            Movies
          </NavLink>
          <NavLink to="/watchlist" onClick={() => setMenuOpen(false)}>
            Watchlist ({watchlistCount})
          </NavLink>
        </div>

        <button
          className="button button-small surprise-button"
          type="button"
          onClick={handleSurpriseMe}
          aria-label="Surprise me with a random movie"
        >
          Surprise Me
        </button>

        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "☾ Dark" : "☀ Light"}
        </button>

        <form className="nav-search" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search movies"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </nav>
    </header>
  );
}

export default Navbar;
