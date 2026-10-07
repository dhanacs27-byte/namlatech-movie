# Movie Collection List

A complete, professional Movie Collection List web application built with React, Vite, and the TMDB API. It displays all movies from a specified TMDB collection using a modern, responsive, and cinematic dark theme.

## Features

- **Movie Collection Display:** Dynamically fetches and displays all movies from a specific TMDB collection.
- **Search Filtering:** A search box to filter the loaded movies instantly by title without making additional network requests.
- **Responsive Layout:** Uses CSS Grid to adjust the number of movie cards per row across mobile, tablet, and desktop screens.
- **Modern UI:** Features a dark cinematic theme, hover animations, rounded corners, and truncated text.
- **Loading & Error States:** Provides a professional loading spinner and error messages to handle slow or failed network requests.
- **Robust Image Handling:** Implements professional placeholder states for movies that lack posters.

## Technologies Used

- React.js (Hooks: `useState`, `useEffect`)
- Vite
- JavaScript (ES6+)
- HTML5 & CSS3
- Fetch API
- TMDB API

## API Used

This project uses the [TMDB Get Collection Details API](https://developer.themoviedb.org/reference/collection-details).
Endpoint: `https://api.themoviedb.org/3/collection/{collection_id}`

## Installation Steps

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd movie-list
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Environment Variable Setup

**Important:** Never commit your TMDB API key to version control.

1. Create a `.env` file in the root directory (this file is ignored by Git).
2. Copy the contents of `.env.example` into `.env`.
3. Add your TMDB API key:

   ```
   VITE_TMDB_API_KEY=your_actual_tmdb_api_key_here
   VITE_TMDB_COLLECTION_ID=10
   ```
   *(Note: Collection ID `10` represents the Star Wars Collection. You can change this to any valid TMDB Collection ID).*

## How to Run the Application

Start the development server:

```bash
npm run dev
```

Then, open the URL provided in the terminal (usually `http://localhost:5173`) in your web browser.

## Screenshots

*(Placeholders for screenshots)*
- `desktop-view.png`
- `mobile-view.png`
- `search-filter.png`

## Future Improvements

- Add movie detail modals when clicking a card.
- Implement sorting functionality (by year, rating).
- Use local storage to save search history or favorite collections.
- Add pagination or virtualization if dealing with massive collections.
