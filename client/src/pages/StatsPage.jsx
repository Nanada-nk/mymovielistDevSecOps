import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { movieApi } from "../api/movieApi";

export default function StatsPage() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    likedMovies: 0,
    dislikedMovies: 0,
    watchLaterMovies: 0,
    topGenres: [],
    monthlyStats: [],
    averageRating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await movieApi.getUserStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="text-center">กำลังโหลด...</div>;
  }

  const likePercentage =
    stats.totalMovies > 0 ? (stats.likedMovies / stats.totalMovies) * 100 : 0;

  const dislikePercentage =
    stats.totalMovies > 0
      ? (stats.dislikedMovies / stats.totalMovies) * 100
      : 0;

  const watchLaterPercentage =
    stats.totalMovies > 0
      ? (stats.watchLaterMovies / stats.totalMovies) * 100
      : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">สถิติของฉัน</h1>
        <p className="text-muted-foreground">
          ดูสถิติการดูหนังและความชื่นชอบของคุณ
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-b from-gray-950 to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-sm font-medium">รวมทั้งหมด</CardTitle>
            <span className="text-2xl">🎬</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMovies}</div>
            <p className="text-xs text-muted-foreground">หนังทั้งหมด</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b from-gray-950 to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ชอบ</CardTitle>
            <span className="text-2xl">👍</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.likedMovies}</div>
            <p className="text-xs text-muted-foreground">
              {likePercentage.toFixed(1)}% ของทั้งหมด
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b from-gray-950 to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ไม่ชอบ</CardTitle>
            <span className="text-2xl">👎</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.dislikedMovies}</div>
            <p className="text-xs text-muted-foreground">
              {dislikePercentage.toFixed(1)}% ของทั้งหมด
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-b from-gray-950 to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ดูภายหลัง</CardTitle>
            <span className="text-2xl">📚</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.watchLaterMovies}</div>
            <p className="text-xs text-muted-foreground">
              {watchLaterPercentage.toFixed(1)}% ของทั้งหมด
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">👍 หนังที่ชอบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{stats.likedMovies} เรื่อง</span>
                <span>{likePercentage.toFixed(1)}%</span>
              </div>
              <Progress value={likePercentage} className="h-3 bg-white" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">👎 หนังที่ไม่ชอบ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{stats.dislikedMovies} เรื่อง</span>
                <span>{dislikePercentage.toFixed(1)}%</span>
              </div>
              <Progress value={dislikePercentage} className="h-3 bg-white" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">📚 ดูภายหลัง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{stats.watchLaterMovies} เรื่อง</span>
                <span>{watchLaterPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={watchLaterPercentage} className="h-3 bg-white" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Genres */}
      {stats.topGenres && stats.topGenres.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>🎭 แนวหนังที่ชอบ</CardTitle>
            <CardDescription>แนวหนังที่คุณดูมากที่สุด</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {stats.topGenres.map((genre, index) => (
                <Badge
                  key={genre.name}
                  variant={index < 3 ? "default" : "secondary"}
                >
                  {genre.name} ({genre.count})
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>📈 สรุปภาพรวม</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">อัตราการชอบ</p>
              <p className="text-lg font-semibold text-green-600">
                {likePercentage.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">อัตราการไม่ชอบ</p>
              <p className="text-lg font-semibold text-red-600">
                {dislikePercentage.toFixed(1)}%
              </p>
            </div>
          </div>

          {stats.totalMovies === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              เริ่มเพิ่มหนังในรายการเพื่อดูสถิติ
            </p>
          ) : (
            <div className="text-sm text-muted-foreground">
              <p>
                คุณมีหนังทั้งหมด <strong>{stats.totalMovies}</strong>{" "}
                เรื่องในรายการ
                {likePercentage > dislikePercentage
                  ? " และมีแนวโน้มชอบหนังมากกว่าไม่ชอบ"
                  : likePercentage < dislikePercentage
                  ? " และมีแนวโน้มไม่ชอบหนังมากกว่าชอบ"
                  : " และมีสัดส่วนการชอบและไม่ชอบเท่ากัน"}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

