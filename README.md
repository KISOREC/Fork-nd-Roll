# CineScope

A modern React-based movie discovery application for browsing,
filtering, sorting, saving, and discovering movies.

## Features

- Movie search
- Genre filtering
- Rating-based sorting
- Movie details
- Watchlist
- Recently Viewed
- Dark / Light mode
- Surprise Me random movie discovery
- Responsive design
- Local movie poster assets
- LocalStorage persistence

## Tech Stack

- React 19
- Vite
- React Router DOM
- JavaScript
- CSS
- LocalStorage

## Application Flow

Search
   ↓
Genre Filter
   ↓
Rating Sort
   ↓
Movie Grid
   ↓
Movie Details
   ├── Add to Watchlist
   └── Recently Viewed

Navbar
   ├── Search
   ├── Watchlist
   ├── Dark Mode
   └── Surprise Me

## Data

Movie information is maintained locally in:

src/data/movies.js

Poster assets are stored locally in:

public/posters/

No external movie API is required.

## Persistence

The application uses browser LocalStorage for:

- Watchlist
- Recently Viewed
- Theme preference

## Installation

npm install

## Development

npm run dev

## Production Build

npm run build

## Project Structure

src/
├── components/
├── data/
├── pages/
├── App.jsx
├── main.jsx
└── index.css

public/
└── posters/

## Key Pages

/                  Home
/movies             Movie browsing
/movies/:movieId    Movie details
/watchlist          Saved movies

## Validation

The project was tested for:

- Search
- Genre filtering
- Rating sorting
- Watchlist add/remove
- Watchlist persistence
- Recently Viewed tracking
- Recently Viewed persistence
- Dark mode persistence
- Surprise Me navigation
- Movie detail routing
- Invalid LocalStorage data handling
- Responsive layout
- Production build

`npm run build` passes successfully.