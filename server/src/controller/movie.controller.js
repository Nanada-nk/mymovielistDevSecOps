import movieService from "../service/movie.service.js";
import createError from "../util/create-error.util.js";

const movieController = {
  getAllMovies: async (req, res) => {
    const userId = req.user.id;
    const { status } = req.query;
    const movies = await movieService.getAllMovies(userId, status);
    res.status(200).json(movies);
  },

  getMovieById: async (req, res) => {
    const userId = req.user.id;
    const tmdbId = req.params.id;
    const movie = await movieService.getMoviebyId(userId, tmdbId);
    if (!movie) {
      return next(createError(404, "Movie not found in your list"));
    }
    res.status(200).json(movie);
  },

  addMovieToList: async (req, res) => {
    const userId = req.user.id;
    const movieData = req.body;
    const resultMovie = await movieService.addMovieToList(userId, movieData);
    res
      .status(201)
      .json({ message: "Movie added/updated successfully", movie: resultMovie });
  },

  updateMovie: async (req, res) => {
    const userId = req.user.id;
    const tmdbId = req.params.id;
    const movieData = req.body;
    const updatedMovieResult = await movieService.updateMovie(
      userId,
      tmdbId,
      movieData
    );

    if (updatedMovieResult.count === 0) {
      return next(createError(404, "Movie not found in your list to update"));
    }

    res
      .status(200)
      .json({ message: "Movie updated successfully" });
  },

  deleteMovie: async (req, res) => {
    const userId = req.user.id;
    const tmdbId = req.params.id;
    const deletedMovieResult = await movieService.deleteMovie(userId, tmdbId);

    if (deletedMovieResult.count === 0) {
      return next(createError(404, "Movie not found in your list to delete"));
    }
    res.status(204).send();
  },

  getUserStats: async (req, res) => {
    const userId = req.user.id;
    const stats = await movieService.getUserStats(userId);
    res.status(200).json(stats);
  },

  getRecentMovies: async (req, res) => {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 5;
    const movies = await movieService.getRecentMovies(userId, limit);
    res.status(200).json(movies);
  },

  getMovieNote: async (req, res) => {
    const userId = req.user.id;
    const tmdbId = req.params.id;
    const note = await movieService.getMovieNote(userId, tmdbId);
    res.status(200).json(note);
  },

  createMovieNote: async (req, res) => {
    const userId = req.user.id;
    const noteData = req.body;
    const newNote = await movieService.createOrUpdateMovieNote(userId, noteData);
    res.status(201).json({ message: "Note created/updated successfully", note: newNote });
  },

  updateMovieNote: async (req, res) => {
    const userId = req.user.id;
    const noteId = req.params.noteId;
    const noteData = req.body;
    const updatedNote = await movieService.updateMovieNoteById(userId, noteId, noteData);
    res.status(200).json({ message: "Note updated successfully", note: updatedNote })
  },

  deleteMovieNote: async (req, res) => {
    const userId = req.user.id;
    const noteId = req.params.noteId;
    await movieService.deleteMovieNoteById(userId, noteId);
    res.status(204).send();
  },
};

export default movieController;