import { publicApi } from "./baseApi";

const tmdbApi = {
  // Search and discover movies
  searchMovies: (query, page = 1) => {
    return publicApi.get(
      `/tmdb/search?query=${encodeURIComponent(query)}&page=${page}`
    );
  },

  getAllMovies: (page = 1) => {
    return publicApi.get(`/tmdb/movies?page=${page}`);
  },

  getPopularMovies: (page = 1) => {
    return publicApi.get(`/tmdb/popular?page=${page}`);
  },

  getTopRatedMovies: (page = 1) => {
    return publicApi.get(`/tmdb/top-rated?page=${page}`);
  },

  getUpcomingMovies: (page = 1) => {
    return publicApi.get(`/tmdb/upcoming?page=${page}`);
  },

  // Movie details
  getMovieDetails: (id) => {
    return publicApi.get(`/tmdb/movie/${id}`);
  },

  getMovieCredits: (id) => {
    return publicApi.get(`/tmdb/movie/${id}/credits`);
  },

  getMovieVideos: (id) => {
    return publicApi.get(`/tmdb/movie/${id}/videos`);
  },

  getSimilarMovies: (id) => {
    return publicApi.get(`/tmdb/movie/${id}/similar`);
  },

  // Genres
  getGenres: () => {
    return publicApi.get("/tmdb/genres");
  },

  getMoviesByGenre: (genreId, page = 1) => {
    return publicApi.get(`/tmdb/genre/${genreId}/movies?page=${page}`);
  },
};

export { tmdbApi };
