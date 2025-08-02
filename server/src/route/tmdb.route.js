import express from "express";
import tmdbController from "../controller/tmdb.controller.js";

const tmdbRouter = express.Router();

tmdbRouter.get("/get-all-movies", tmdbController.getAllMovies);
tmdbRouter.get("/search", tmdbController.searchMovies);
tmdbRouter.get("/popular", tmdbController.getPopularMovies);
tmdbRouter.get("/top-rated", tmdbController.getTopRatedMovies);
tmdbRouter.get("/upcoming", tmdbController.getUpcomingMovies);
tmdbRouter.get("/movie/:id", tmdbController.getMovieDetailById);


tmdbRouter.get("/movie/:id/credits", tmdbController.getMovieCredits);
tmdbRouter.get("/movie/:id/videos", tmdbController.getMovieVideos);
tmdbRouter.get("/movie/:id/similar", tmdbController.getSimilarMovies);
tmdbRouter.get("/genres", tmdbController.getGenres);
tmdbRouter.get("/genre/:id/movies", tmdbController.getMoviesByGenre);

tmdbRouter.get('/movies', tmdbController.getAllMovies); 

export default tmdbRouter;
