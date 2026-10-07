import React from 'react';

const MovieCard = ({ movie }) => {
  // Extract the year from the release date (e.g. '1977-05-25' -> 1977)
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown Year';
  
  // Format rating to 1 decimal place (e.g. 8.167 -> 8.2)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  
  // Construct full poster URL
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
    : null;

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        {posterUrl ? (
          <img 
            src={posterUrl} 
            alt={`${movie.title} poster`} 
            className="movie-poster"
            loading="lazy"
          />
        ) : (
          <div className="movie-poster-placeholder">
            <span>No Poster Available</span>
          </div>
        )}
        <div className="movie-rating">
          ⭐ {rating}
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{releaseYear}</span>
          {movie.collectionName && (
            <span className="movie-collection-tag" title={movie.collectionName}>
              {movie.collectionName.replace(' Collection', '')}
            </span>
          )}
        </div>
        
        {movie.overview && (
          <p className="movie-overview">
            {movie.overview}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
