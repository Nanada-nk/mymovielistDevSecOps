import { useState, useEffect, useCallback } from "react"; 
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
  const [error, setError] = useState(null); 

  const statusConfig = {
    liked: {
      title: "หนังที่ชอบ",
      emoji: "👍",
      description: "หนังที่คุณให้คะแนนชอบ",
      apiStatus: "LIKED", 
    },
    disliked: {
      title: "หนังที่ไม่ชอบ",
      emoji: "👎",
      description: "หนังที่คุณให้คะแนนไม่ชอบ",
      apiStatus: "DISLIKED", 
    },
    watch_later: {
      title: "ดูภายหลัง",
      emoji: "📚",
      description: "หนังที่คุณบันทึกไว้เพื่อดูภายหลัง",
      apiStatus: "WATCH_LATER_BOOLEAN", 
    },
  };

  const currentConfig = statusConfig[status] || statusConfig.liked;

  const fetchMoviesByStatus = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (currentConfig.apiStatus === "WATCH_LATER_BOOLEAN") {
        response = await movieApi.getUserMovies(); 
        const filteredData = response.data.filter(movie => movie.isWatchLater === true);
        setMovies(filteredData);
      } else {
        // สำหรับ LIKED หรือ DISLIKED
        response = await movieApi.getUserMoviesByStatus(currentConfig.apiStatus);
        setMovies(response.data); 
      }
    } catch (err) {
      console.error(`Failed to fetch movies for status ${status}:`, err);
      setError(err);
      setMovies([]); 
    } finally {
      setIsLoading(false);
    }
  }, [status, currentConfig.apiStatus]); 
  useEffect(() => {
    if (status && statusConfig[status]) {
      fetchMoviesByStatus();
    }
  }, [status]); 
  

  if (!statusConfig[status]) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">หน้าไม่พบ</h1>
        <p className="text-muted-foreground mb-4">
          หมวดหมู่ '{status}' ไม่ถูกต้อง โปรดตรวจสอบ URL
        </p>
        <Button asChild>
          <Link to="/my-list">กลับไปรายการหนังทั้งหมด</Link>
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

      {Array.isArray(movies) && movies.length === 0 ? ( 
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
            
            {Array.isArray(movies) && movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                showStatus={true}
                onStatusChange={fetchMoviesByStatus} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
