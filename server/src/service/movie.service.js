import prisma from "../config/prisma.config.js";

const movieService = {
  getAllMovies: async (userId, status) => {
    const whereClause = { userId };
    if (status) {
      whereClause.status = status.toUpperCase();
    }
    return prisma.movieList.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
  },

  getMoviebyId: async (userId, tmdbId) => {
    return prisma.movieList.findFirst({
      where: {
        userId: userId,
        movieId: parseInt(tmdbId),
      },
    });
  },

  addMovieToList: async (userId, movieData) => {
    const existingMovie = await prisma.movieList.findFirst({
      where: {
        userId: userId,
        movieId: movieData.movieId,
      },
    });

    const dataToSave = {
      title: movieData.title,
      posterUrl: movieData.posterUrl,
      voteAverage: movieData.voteAverage,
      releaseDate: movieData.releaseDate ? new Date(movieData.releaseDate) : null,
      status: movieData.status,
      isWatchLater: movieData.isWatchLater,
      note: movieData.note,
    };

    if (existingMovie) {
      return prisma.movieList.update({
        where: {
          id: existingMovie.id,
        },
        data: dataToSave,
      });
    } else {
      return prisma.movieList.create({
        data: {
          userId: userId,
          movieId: movieData.movieId,
          ...dataToSave,
        },
      });
    }
  },

  updateMovie: async (userId, tmdbId, movieData) => {
    return prisma.movieList.updateMany({
      where: {
        userId: userId,
        movieId: parseInt(tmdbId),
      },
      data: {
        ...movieData,
        releaseDate: movieData.releaseDate ? new Date(movieData.releaseDate) : undefined,
      },
    });
  },

  deleteMovie: async (userId, tmdbId) => {
    return prisma.movieList.deleteMany({
      where: {
        userId: userId,
        movieId: parseInt(tmdbId),
      },
    });
  },


  getUserStats: async (userId) => {
    const totalMovies = await prisma.movieList.count({ where: { userId } });

    const likedCount = await prisma.movieList.count({
      where: {
        userId: userId,
        status: 'LIKED',
      },
    });

    const dislikedCount = await prisma.movieList.count({
      where: {
        userId: userId,
        status: 'DISLIKED',
      },
    });

    const watchLaterCount = await prisma.movieList.count({
      where: {
        userId: userId,
        isWatchLater: true,
      },
    });

    const stats = {
      totalMovies,
      likedMovies: likedCount,
      dislikedMovies: dislikedCount,
      watchLaterMovies: watchLaterCount,
    };

    return stats;
  },

  getRecentMovies: async (userId, limit) => {
    return prisma.movieList.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  },

  getMovieNote: async (userId, tmdbId) => {
    return prisma.movieList.findFirst({
      where: { userId, movieId: parseInt(tmdbId) },
      select: { note: true, updatedAt: true },
    });
  },

  createOrUpdateMovieNote: async (userId, noteData) => {
    const existingMovie = await prisma.movieList.findFirst({
      where: { userId, movieId: noteData.movieId },
    });

    const dataToSave = {
      title: noteData.title,
      posterUrl: noteData.posterUrl,
      voteAverage: noteData.voteAverage,
      releaseDate: noteData.releaseDate ? new Date(noteData.releaseDate) : null,
      status: noteData.status,
      isWatchLater: noteData.isWatchLater,
      note: noteData.note,
    };

    if (existingMovie) {
      return prisma.movieList.update({
        where: { id: existingMovie.id },
        data: { note: noteData.note },
      });
    } else {
      return prisma.movieList.create({
        data: {
          userId,
          movieId: noteData.movieId,
          ...dataToSave,
        },
      });
    }
  },

  updateMovieNoteById: async (userId, noteId, noteData) => {
    const result = await prisma.movieList.updateMany({
      where: {
        userId: userId,
        id: noteId,
      },
      data: { note: noteData.note }
    });
    return result;
  },

  deleteMovieNoteById: async (userId, noteId) => {
    const result = await prisma.movieList.updateMany({
      where: {
        userId: userId,
        id: noteId,
      },
      data: { note: null }
    });
    return result;
  },
};

export default movieService;
