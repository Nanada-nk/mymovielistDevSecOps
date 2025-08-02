import { privateApi } from "./baseApi";

const movieApi = {
  // User movie list operations
  getUserMovies: () => {
    return privateApi.get("/movies/my-list");
  },
  getUserMoviesByStatus: (status) => {
    return privateApi.get(`/movies/my-list?status=${status}`);
  },
  getUserStats: () => {
    return privateApi.get("/movies/stats");
  },
  getRecentMovies: (limit = 5) => {
    return privateApi.get(`/movies/recent?limit=${limit}`);
  },

  // Movie CRUD operations
  addToList: (data) => {
    return privateApi.post("/movies/add-to-list", data);
  },
  removeFromList: (movieId) => {
    return privateApi.delete(`/movies/remove/${movieId}`);
  },
  updateMovieStatus: (movieId, status) => {
    return privateApi.put(`/movies/update/${movieId}`, { status });
  },

  // Movie notes
  getMovieNote: (movieId) => {
    return privateApi.get(`/movies/${movieId}/note`);
  },
  createMovieNote: (data) => {
    return privateApi.post("/movies/notes", data);
  },
  updateMovieNote: (noteId, data) => {
    return privateApi.put(`/movies/notes/${noteId}`, data);
  },
  deleteMovieNote: (noteId) => {
    return privateApi.delete(`/movies/notes/${noteId}`);
  },
};

export { movieApi };
