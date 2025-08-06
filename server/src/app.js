import express from "express";
import morgan from "morgan";
import cors from "cors";
import notFoundMiddleware from "./middleware/not-found.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRouter from "./route/auth.route.js";
import movieRouter from "./route/movie.route.js";
import tmdbRouter from "./route/tmdb.route.js";
import prisma from "./config/prisma.config.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

// CORS configuration with multiple origins
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "http://localhost:8080", // Docker client
  "http://localhost:3000", // Same port (for testing)
  "http://localhost:80", // Port 80
  "http://127.0.0.1:5173", // Alternative localhost
  "http://127.0.0.1:8080", // Alternative localhost
  process.env.FRONTEND_URL, // From environment variable
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);

app.get("/db-test", async (req, res) => {
  try {
    // Test database connection with simple query
    await prisma.$connect();

    // Try a simple query that works with MongoDB
    await prisma.user.findMany({ take: 1 });

    res.status(200).json({
      status: "success",
      message: "Database connection and query successful",
      timestamp: new Date().toISOString(),
      database: "MongoDB",
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
      details: "Check MongoDB Atlas credentials and network access",
    });
  }
});

app.use("/api/auth", authRouter);
app.use("/api/movies", movieRouter);
app.use("/api/tmdb", tmdbRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
