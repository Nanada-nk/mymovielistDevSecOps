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
    <div className="h-full bg-gray-950 text-gray-100">
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            className="min-w-full min-h-full object-cover"
          >
            {/* <<<< แก้ไขตรงนี้! Path ต้องเริ่มจาก '/' สำหรับไฟล์ใน public/ */}
            <source src="https://videos.pexels.com/video-files/7266487/7266487-uhd_2732_1440_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
        </div>

   
        <div className="relative z-10 text-center space-y-8 px-4 max-w-5xl mx-auto">

          <Badge variant="secondary" className="text-sm px-4 py-2 bg-red-700 text-white border-red-800"> {/* สีแดงเข้ม Netflix */}
            <Film className="w-4 h-4 mr-2" />
            ฐานข้อมูลหนังที่ใหญ่ที่สุด
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
            My Movie
            <span className="text-red-600"> 
              {" "}
              List
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"> 
            จัดการรายการหนังของคุณ ค้นหาหนังใหม่ เขียนโน้ต
            และติดตามสถิติการดูหนัง
            <br />
            <span className="text-red-500">ทุกอย่างในที่เดียว</span> 
          </p>
         
          <Button
            asChild
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white border-0 px-8 py-6 text-lg transition-colors duration-300 mr-2"
          >
            <Link to="/register">
              <Play className="w-5 h-5 mr-2" />
              เริ่มต้นใช้งาน
            </Link>
          </Button>
        
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-gray-800 hover:bg-gray-700 text-white border-red-600 hover:border-red-700 px-8 py-6 text-lg transition-colors duration-300"
          >
            <Link to="/search">
              <Search className="w-5 h-5 mr-2" /> 
              ค้นหาหนัง
            </Link>
          </Button>
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10M+</div>
              <div className="text-gray-400">หนังในฐานข้อมูล</div> 
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-gray-400">ผู้ใช้งาน</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">1M+</div>
              <div className="text-gray-400">รีวิว</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900"> 
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-white">ฟีเจอร์ที่น่าสนใจ</h2>
            <p className="text-xl text-gray-300"> 
              ทุกอย่างที่คุณต้องการสำหรับการจัดการรายการหนัง
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: จัดการรายการ */}
            <Card className="group hover:scale-105 transition-all duration-300 border border-gray-700 bg-gray-800 text-gray-100 shadow-lg"> {/* ปรับสี Card, เพิ่ม border */}
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"> {/* ไอคอนพื้นหลังแดง Netflix */}
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">จัดการรายการ</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  เพิ่มหนังในรายการ LIKED, DISLIKED หรือ WATCH_LATER
                  ได้อย่างง่ายดาย
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 2: ค้นหาหนัง */}
            <Card className="group hover:scale-105 transition-all duration-300 border border-gray-700 bg-gray-800 text-gray-100 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">ค้นหาหนัง</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  ค้นหาหนังจากฐานข้อมูล TMDB ที่ครบถ้วน พร้อมข้อมูลละเอียด
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 3: สถิติ & Analytics */}
            <Card className="group hover:scale-105 transition-all duration-300 border border-gray-700 bg-gray-800 text-gray-100 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">สถิติ & Analytics</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  ดูสถิติการดูหนังและติดตามความชื่นชอบของคุณ
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 4: เรทติ้ง & รีวิว */}
            <Card className="group hover:scale-105 transition-all duration-300 border border-gray-700 bg-gray-800 text-gray-100 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">เรทติ้ง & รีวิว</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  ให้คะแนนและเขียนรีวิวหนังที่คุณดู พร้อมแชร์ความเห็น
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 5: Watchlist */}
            <Card className="group hover:scale-105 transition-all duration-300 border border-gray-700 bg-gray-800 text-gray-100 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">Watchlist</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  สร้างรายการหนังที่ต้องการดู และติดตามความคืบหน้า
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Card 6: แชร์กับเพื่อน */}
            <Card className="group hover:scale-105 transition-all duration-300 border border-gray-700 bg-gray-800 text-gray-100 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">แชร์กับเพื่อน</CardTitle>
                <CardDescription className="text-base text-gray-300">
                  แชร์รายการหนังและรีวิวกับเพื่อนๆ ได้อย่างง่ายดาย
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            เข้าร่วมกับผู้ใช้หลายพันคนที่ใช้ My Movie List จัดการรายการหนัง
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-red-600 hover:bg-red-700 text-white border-0 px-8 py-6 text-lg transition-colors duration-300"
            >
              <Link to="/register">สมัครสมาชิกฟรี</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-gray-800 hover:bg-gray-700 text-white border-red-600 hover:border-red-700 px-8 py-6 text-lg transition-colors duration-300"
            >
              <Link to="/login">เข้าสู่ระบบ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}