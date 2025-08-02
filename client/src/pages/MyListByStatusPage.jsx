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
import { ArrowLeft } from "lucide-react";
import { movieApi } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

export default function MyListByStatusPage() {
  const { status } = useParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const statusConfig = {
    liked: {
      title: "หนังที่ชอบ",
      emoji: "👍",
      description: "หนังที่คุณให้คะแนนชอบ",
    },
    disliked: {
      title: "หนังที่ไม่ชอบ",
      emoji: "👎",
      description: "หนังที่คุณให้คะแนนไม่ชอบ",
    },
    watch_later: {
      title: "ดูภายหลัง",
      emoji: "📚",
      description: "หนังที่คุณบันทึกไว้เพื่อดูภายหลัง",
    },
  };

  const currentConfig = statusConfig[status] || statusConfig.liked;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieApi.getUserMoviesByStatus(status.toUpperCase());
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status && statusConfig[status]) {
      fetchMovies();
    }
  }, [status]);

  if (!statusConfig[status]) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">หน้าไม่พบ</h1>
        <Button asChild>
          <Link to="/my-list">กลับไปรายการหนัง</Link>
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link to="/my-list">
          <ArrowLeft className="mr-2 h-4 w-4" />
          กลับไปรายการหนัง
        </Link>
      </Button>

      <div className="flex items-center gap-3">
        <span className="text-4xl">{currentConfig.emoji}</span>
        <div>
          <h1 className="text-3xl font-bold">{currentConfig.title}</h1>
          <p className="text-muted-foreground">{currentConfig.description}</p>
        </div>
      </div>

      {movies.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">{currentConfig.emoji}</div>
            <h3 className="text-lg font-semibold mb-2">
              ยังไม่มีหนังในหมวด {currentConfig.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              เริ่มค้นหาและเพิ่มหนังในรายการของคุณ
            </p>
            <Button asChild>
              <Link to="/search">ค้นหาหนัง</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">พบ {movies.length} เรื่อง</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showStatus={true}
                onStatusChange={() => {
                  // Remove from current list if status changed
                  setMovies((prev) => prev.filter((m) => m.id !== movie.id));
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
