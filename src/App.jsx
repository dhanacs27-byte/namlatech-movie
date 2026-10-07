import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import { mockCollection } from './data/mockCollection';
import './App.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// Parse one or multiple collection IDs (e.g., "10,8650,1241")
const RAW_COLLECTION_IDS = import.meta.env.VITE_TMDB_COLLECTION_ID || '10';
const COLLECTION_IDS = RAW_COLLECTION_IDS
  .split(',')
  .map(id => id.trim())
  .filter(Boolean);

function App() {
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        if (!API_KEY) {
          // Gracefully load demo collection if no API key is set in .env
          setCollections([mockCollection]);
          setSelectedCollectionId(String(mockCollection.id));
          setIsDemoMode(true);
          return;
        }

        const idsToFetch = COLLECTION_IDS.length > 0 ? COLLECTION_IDS : ['10'];
        const results = await Promise.all(
          idsToFetch.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/collection/${id}?api_key=${API_KEY}&language=en-US`
            );
            if (!response.ok) {
              throw new Error(`Failed to fetch collection ID "${id}" (HTTP ${response.status}). Check if the ID is valid.`);
            }
            return response.json();
          })
        );

        setCollections(results);
        if (results.length > 1) {
          setSelectedCollectionId('all');
        } else if (results.length === 1) {
          setSelectedCollectionId(String(results[0].id));
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Unable to load movies. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const activeCollection = collections.find(c => String(c.id) === String(selectedCollectionId));

  const allMovies = collections.flatMap(c => 
    (c.parts || []).map(p => ({ ...p, collectionName: c.name }))
  );

  const displayedMovies = selectedCollectionId === 'all'
    ? Array.from(new Map(allMovies.map(m => [m.id, m])).values())
    : (activeCollection?.parts || []).map(p => ({ ...p, collectionName: activeCollection?.name }));

  // Filter existing movies by search query without making another API request
  const filteredMovies = displayedMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      {isDemoMode && (
        <aside className="demo-notice-banner" role="status">
          <span className="demo-badge">Demo Mode</span>
          <span>
            Showing sample <strong>Star Wars</strong> collection. To fetch live TMDB data, add your <code>VITE_TMDB_API_KEY</code> to <code>.env</code> and restart Vite.
          </span>
        </aside>
      )}

      <header className="app-header">
        <h1>Movie Collection Explorer</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search within collections..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search movies"
          />
        </div>
      </header>

      <main className="app-main">
        {isLoading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading movies...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <p className="error-icon">⚠️</p>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && collections.length > 1 && (
          <nav className="collection-tabs-container" aria-label="Franchise navigation">
            <button
              type="button"
              className={`collection-tab ${selectedCollectionId === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCollectionId('all')}
            >
              All Collections ({allMovies.length})
            </button>
            {collections.map(col => (
              <button
                key={col.id}
                type="button"
                className={`collection-tab ${String(selectedCollectionId) === String(col.id) ? 'active' : ''}`}
                onClick={() => setSelectedCollectionId(String(col.id))}
              >
                {col.name} ({col.parts?.length || 0})
              </button>
            ))}
          </nav>
        )}

        {!isLoading && !error && collections.length > 0 && (
          <div className="collection-info">
            <div className="collection-header">
              <h2>
                {selectedCollectionId === 'all'
                  ? `All Collections (${filteredMovies.length} movies)`
                  : activeCollection?.name}
              </h2>
              {(selectedCollectionId === 'all' || activeCollection?.overview) && (
                <p className="collection-overview">
                  {selectedCollectionId === 'all'
                    ? `Browsing ${collections.length} franchises: ${collections.map(c => c.name).join(', ')}.`
                    : activeCollection?.overview}
                </p>
              )}
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <MovieList movies={filteredMovies} />
        )}
      </main>
    </div>
  );
}

export default App;

