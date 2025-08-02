import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import {
  Film,
  Search,
  Heart,
  Clock,
  BarChart3,
  Star,
  Play,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1489599511495-8b6b7b82b5b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Film className="w-4 h-4 mr-2" />
              ฐานข้อมูลหนังที่ใหญ่ที่สุด
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
              My Movie
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {" "}
                List
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              จัดการรายการหนังของคุณ ค้นหาหนังใหม่ เขียนโน้ต
              และติดตามสถิติการดูหนัง
              <br />
              <span className="text-blue-300">ทุกอย่างในที่เดียว</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg"
            >
              <Link to="/register">
                <Play className="w-5 h-5 mr-2" />
                เริ่มต้นใช้งาน
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg"
            >
              <Link to="/search">
                <Play className="w-5 h-5 mr-2" />
                ค้นหาหนัง
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10M+</div>
              <div className="text-gray-300">หนังในฐานข้อมูล</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-gray-300">ผู้ใช้งาน</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-gray-300">รีวิว</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">ฟีเจอร์ที่น่าสนใจ</h2>
            <p className="text-xl text-muted-foreground">
              ทุกอย่างที่คุณต้องการสำหรับการจัดการรายการหนัง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">จัดการรายการ</CardTitle>
                <CardDescription className="text-base">
                  เพิ่มหนังในรายการ LIKED, DISLIKED หรือ WATCH_LATER
                  ได้อย่างง่ายดาย
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">ค้นหาหนัง</CardTitle>
                <CardDescription className="text-base">
                  ค้นหาหนังจากฐานข้อมูล TMDB ที่ครบถ้วน พร้อมข้อมูลละเอียด
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">สถิติ & Analytics</CardTitle>
                <CardDescription className="text-base">
                  ดูสถิติการดูหนังและติดตามความชื่นชอบของคุณ
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">เรทติ้ง & รีวิว</CardTitle>
                <CardDescription className="text-base">
                  ให้คะแนนและเขียนรีวิวหนังที่คุณดู พร้อมแชร์ความเห็น
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">Watchlist</CardTitle>
                <CardDescription className="text-base">
                  สร้างรายการหนังที่ต้องการดู และติดตามความคืบหน้า
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl">แชร์กับเพื่อน</CardTitle>
                <CardDescription className="text-base">
                  แชร์รายการหนังและรีวิวกับเพื่อนๆ ได้อย่างง่ายดาย
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            เข้าร่วมกับผู้ใช้หลายพันคนที่ใช้ My Movie List จัดการรายการหนัง
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="px-8 py-6 text-lg"
            >
              <Link to="/register">สมัครสมาชิกฟรี</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="px-8 py-6 text-lg"
            >
              <Link to="/login">เข้าสู่ระบบ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
