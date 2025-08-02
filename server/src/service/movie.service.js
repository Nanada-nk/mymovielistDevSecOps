// import prisma from "../config/prisma.config.js";

// const movieService = {
//   getAllMovies: async (userId) => {
//     return await prisma.movie.findMany({
//       where: {
//         userId: userId,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });
//   },
//   getMoviebyId: async (userId, movieId) => {
//     return await prisma.movie.findFirst({
//       where: {
//         id: movieId,
//         userId: userId,
//       },
//     });
//   },
//   createMovie: async (userId, movieData) => {
//     return await prisma.movie.create({
//       data: {
//         ...movieData,
//         userId: userId,
//       },
//     });
//   },
//   updateMovie: async (userId, movieId, movieData) => {
//     return await prisma.movie.update({
//       where: {
//         id: movieId,
//         userId: userId,
//       },
//       data: movieData,
//     });
//   },
//   deleteMovie: async (userId, movieId) => {
//     return await prisma.movie.delete({
//       where: {
//         id: movieId,
//         userId: userId,
//       },
//     });
//   },
// };

// export default movieService;


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
    const statusCounts = await prisma.movieList.groupBy({
      by: ['status'],
      where: { userId },
      _count: {
        status: true,
      },
    });

    const stats = {
      totalMovies,
      likedMovies: 0,
      dislikedMovies: 0,
      watchLaterMovies: 0,
    };

    statusCounts.forEach(item => {
      if (item.status === 'LIKED') stats.likedMovies = item._count.status;
      if (item.status === 'DISLIKED') stats.dislikedMovies = item._count.status;
      if (item.status === 'WATCH_LATER') stats.watchLaterMovies = item._count.status;
    });

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
