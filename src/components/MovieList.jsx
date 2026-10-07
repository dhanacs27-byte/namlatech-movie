import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  // Empty state handling
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <p>No movies found in this collection.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        // movie.id is used as the key because it's a unique identifier provided by TMDB
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
