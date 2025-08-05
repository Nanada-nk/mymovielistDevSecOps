import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Calendar, ArrowLeft } from "lucide-react";
import { tmdbApi } from "../api/tmdbApi";
import { useUserStore } from "../stores/useUserStore";
import { movieApi } from "../api/movieApi";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [isWatchLater, setIsWatchLater] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const user = useUserStore((state) => state.user)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await tmdbApi.getMovieDetails(id);
        setMovie(movieData.data);
        console.log('Movie data from API:', movieData);


        if (isAuthenticated && user) {
          const userMovieResponse = await movieApi.getUserMovie(id);
          if (userMovieResponse.data) {
            setCurrentStatus(userMovieResponse.data.status || null);
            setIsWatchLater(userMovieResponse.data.isWatchLater || false);
          }
        }

      } catch (error) {
        console.error("Failed to fetch movie:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [id, isAuthenticated, user]);

const handleStatusChange = async (newStatus) => {
  if (!isAuthenticated || isUpdating || !user || !movie) return;

  setIsUpdating(true);
  const newLikeDislikeStatus = currentStatus === newStatus ? null : newStatus;

  try {
    const payload = {
      userId: user.id, 
      movieId: movie.id, 
      title: movie.title,
      posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      status: newLikeDislikeStatus,
      isWatchLater: isWatchLater,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
    };

    await movieApi.addToList(payload);
    setCurrentStatus(newLikeDislikeStatus);
  } catch (error) {
    console.error("Failed to update status:", error);
  } finally {
    setIsUpdating(false);
  }
};

const handleWatchLaterChange = async () => {
  if (!isAuthenticated || isUpdating || !user || !movie) return;

  setIsUpdating(true);
  const newWatchLaterStatus = !isWatchLater;

  try {
    const payload = {
      userId: user.id, 
      movieId: movie.id, 
      title: movie.title,
      posterUrl: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
      status: currentStatus,
      isWatchLater: newWatchLaterStatus,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
    };

    await movieApi.addToList(payload);
    setIsWatchLater(newWatchLaterStatus);
  } catch (error) {
    console.error("Failed to update watch later status:", error);
  } finally {
    setIsUpdating(false);
  }
};

  if (isLoading) {
    return <div className="text-center">กำลังโหลด...</div>;
  }

  if (!movie) {
    return <div className="text-center">ไม่พบข้อมูลหนัง</div>;
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder-movie.jpg";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" className="mb-4">
        <Link to="/search">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปค้นหา
        </Link>
      </Button>

      {backdropUrl && (
        <div
          className="h-100 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img
            src={posterUrl}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            {movie.tagline && (
              <p className="text-lg text-muted-foreground italic mt-1">
                {movie.tagline}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.vote_average && movie.vote_average > 0 && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="h-3 w-3" />
                {movie.vote_average.toFixed(1)} / 10
              </Badge>
            )}
            {movie.runtime && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {movie.runtime} นาที
              </Badge>
            )}
            {movie.release_date && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(movie.release_date).getFullYear()}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {movie.genres?.map((genre) => (
              <Badge key={genre.id} variant="default">
                {genre.name}
              </Badge>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>เรื่องย่อ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {movie.overview || "ไม่มีเรื่องย่อ"}
              </p>
            </CardContent>
          </Card>

          {isAuthenticated && (
            <div className="flex gap-2">
              <Button
                variant={currentStatus === "LIKED" ? "default" : "outline"}
                onClick={() => handleStatusChange("LIKED")}
                disabled={isUpdating}
              >👍 ชอบ</Button>
              <Button
                variant={currentStatus === "DISLIKED" ? "destructive" : "outline"}
                onClick={() => handleStatusChange("DISLIKED")}
                disabled={isUpdating}
              >👎 ไม่ชอบ</Button>
              <Button
                variant={isWatchLater ? "default" : "outline"}
                onClick={handleWatchLaterChange}
                disabled={isUpdating}
              >📚 ดูภายหลัง</Button>
              <Button asChild variant="secondary">
                <Link to={`/movie/${id}/note`}>📝 เขียนโน้ต</Link>
              </Button>
            </div>
          )}

          {!isAuthenticated && (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground mb-4">
                  เข้าสู่ระบบเพื่อเพิ่มหนังในรายการและเขียนโน้ต
                </p>
                <div className="flex gap-2 justify-center">
                  <Button asChild>
                    <Link to="/login">เข้าสู่ระบบ</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/register">สมัครสมาชิก</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
