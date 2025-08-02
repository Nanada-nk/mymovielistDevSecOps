import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router";
import { useUserStore } from "../stores/useUserStore";
import { movieApi } from "../api/movieApi";
import {
  Film,
  Heart,
  HeartOff,
  Clock,
  Star,
  Search,
  List,
  BarChart3,
  TrendingUp,
  Calendar,
  Trophy,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useUserStore();
  const [stats, setStats] = useState({
    totalMovies: 0,
    likedMovies: 0,
    dislikedMovies: 0,
    watchLaterMovies: 0,
  });
  const [recentMovies, setRecentMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch user stats and recent movies
        const [statsData, recentData] = await Promise.all([
          movieApi.getUserStats(),
          movieApi.getRecentMovies(5),
        ]);

        setStats(statsData);
        setRecentMovies(recentData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">กำลังโหลดข้อมูลแดชบอร์ด...</p>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      LIKED: { label: "ชอบ", variant: "default", color: "bg-green-500" },
      DISLIKED: {
        label: "ไม่ชอบ",
        variant: "destructive",
        color: "bg-red-500",
      },
      WATCH_LATER: {
        label: "ดูภายหลัง",
        variant: "secondary",
        color: "bg-yellow-500",
      },
    };
    return statusConfig[status] || statusConfig.WATCH_LATER;
  };

  const totalMovies = stats.totalMovies || 0;
  const likedPercentage =
    totalMovies > 0 ? (stats.likedMovies / totalMovies) * 100 : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-lg p-8">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-bold">สวัสดี, {user?.name}! 👋</h1>
            <p className="text-blue-100 text-lg">
              ยินดีต้อนรับสู่แดชบอร์ดการจัดการหนังของคุณ
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-gray-950 to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium text-muted-foreground">
              รวมทั้งหมด
            </CardTitle>
            <div className="p-2 bg-blue-100 rounded-full">
              <Film className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {totalMovies}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              หนังทั้งหมดในรายการ
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-gray-950 to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-md font-medium text-muted-foreground">
              หนังที่ชอบ
            </CardTitle>
            <div className="p-2 bg-green-100 rounded-full">
              <Heart className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {stats.likedMovies}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <Progress value={likedPercentage} className="flex-1 h-4 bg-green-600" />
              <span className="text-sm text-white">
                {likedPercentage.toFixed(0)}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-gray-950 to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium text-muted-foreground">
              หนังที่ไม่ชอบ
            </CardTitle>
            <div className="p-2 bg-red-100 rounded-full">
              <HeartOff className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {stats.dislikedMovies}
            </div>
            <p className="text-sm text-white mt-1">
              หนังที่ไม่ถูกใจ
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-b from-gray-950 to-gray-900">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-md font-medium text-muted-foreground">
              ดูภายหลัง
            </CardTitle>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {stats.watchLaterMovies}
            </div>
            <p className="text-sm text-white mt-1">
              หนังที่วางแผนจะดู
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle>การกระทำด่วน</CardTitle>
          </div>
          <CardDescription>ฟีเจอร์ที่ใช้บ่อยเพื่อความสะดวก</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-16 flex-col space-y-2">
              <Link to="/search">
                <Search className="h-6 w-6" />
                <span>ค้นหาหนัง</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-16 flex-col space-y-2"
            >
              <Link to="/my-list">
                <List className="h-6 w-6" />
                <span>ดูรายการของฉัน</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-16 flex-col space-y-2"
            >
              <Link to="/stats">
                <BarChart3 className="h-6 w-6" />
                <span>ดูสถิติรายละเอียด</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Movies */}
      {recentMovies.length > 0 && (
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <CardTitle>หนังที่เพิ่มล่าสุด</CardTitle>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link to="/my-list">ดูทั้งหมด</Link>
              </Button>
            </div>
            <CardDescription>
              หนัง 5 เรื่องล่าสุดที่คุณเพิ่มเข้ารายการ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {recentMovies.map((movie) => {
                const statusConfig = getStatusBadge(movie.status);
                return (
                  <div key={movie.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        src={movie.poster_url || "/placeholder-movie.jpg"}
                        alt={movie.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="sm" variant="secondary">
                          ดูรายละเอียด
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm leading-tight line-clamp-2">
                        {movie.title}
                      </h4>
                      <Badge variant={statusConfig.variant} className="text-xs">
                        {statusConfig.label}
                      </Badge>
                      {movie.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-muted-foreground">
                            {movie.rating}/5
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Achievement Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-600 to-red-600">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-yellow-500 font-bold" />
            <CardTitle className="text-2xl">ความสำเร็จ</CardTitle>
          </div>
          <CardDescription className="text-xl text-white">เป้าหมายและความสำเร็จของคุณ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
              <div className="p-3 bg-blue-100 rounded-full">
                <Film className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-black">นักดูหนัง</p>
                <p className="text-sm text-muted-foreground">
                  ดูหนังแล้ว {totalMovies} เรื่อง
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg">
              <div className="p-3 bg-green-100 rounded-full">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-black">คนชอบหนัง</p>
                <p className="text-sm text-muted-foreground">
                  ชอบหนัง {stats.likedMovies} เรื่อง
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



