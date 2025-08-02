import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate, useLocation } from "react-router";
import { useUserStore } from "../stores/useUserStore";
import {
  Mail,
  Lock,
  Film,
  Star,
  Eye,
  EyeOff,
  Sparkles,
  Heart,
  Clock,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUserStore();

  // Get the return URL from location state
  const from = location.state?.from || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login({ email, password });
      // Redirect to the page user was trying to access, or dashboard
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      alert("เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบอีเมลและรหัสผ่าน");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">

      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 min-w-full min-h-full object-cover z-0 opacity-20" // <<<< ปรับ opacity เพื่อให้ภาพไม่สว่างเกินไป
      >
        <source src="https://videos.pexels.com/video-files/3987752/3987752-hd_1920_1080_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay เพื่อให้ข้อความอ่านง่ายขึ้นบนพื้นหลังวิดีโอ */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>


      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-red-500/15 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>

        {/* Floating movie icons */}
        <div className="absolute top-20 left-20 text-white-300/20 animate-float">
          <Film className="w-16 h-16" />
        </div>
        <div className="absolute top-32 right-32 text-white-300/20 animate-float animation-delay-1000">
          <Star className="w-12 h-12" />
        </div>
        <div className="absolute bottom-20 right-20 text-white-300/20 animate-float animation-delay-2000">
          <Sparkles className="w-20 h-20" />
        </div>
        <div className="absolute bottom-32 left-32 text-white-300/20 animate-float animation-delay-3000">
          <Heart className="w-14 h-14" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-red-600 to-red-900 rounded-full p-6 shadow-2xl">
              <Film className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-red-900 to-blue-600 bg-clip-text text-transparent mb-2">
            My Movie List
          </h1>
          <p className="text-gray-300 text-lg">ยินดีต้อนรับกลับมา</p>
        </div>

        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-white">
              เข้าสู่ระบบ
            </CardTitle>
            <CardDescription className="text-gray-300">
              กรอกข้อมูลเพื่อเข้าสู่บัญชีของคุณ
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-200"
                >
                  อีเมล
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-400 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-200"
                  >
                    รหัสผ่าน
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-red-400 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-red-500 focus:ring-red-500/20 transition-all duration-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-400 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="space-y-4 pt-2 flex flex-col items-center">
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-red-600 to-red-950 hover:from-blue-700 hover:to-red-700 text-white font-semibold shadow-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/25 disabled:hover:scale-100 border-0"
            >
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  กำลังเข้าสู่ระบบ...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>เข้าสู่ระบบ</span>
                  <Sparkles className="w-4 h-4" />
                </div>
              )}
            </Button>

            <div className="text-center space-y-1">
              <div className="text-gray-300">ยังไม่มีบัญชี?</div>
              <Link
                to="/register"
                className="block font-medium text-red-400 hover:text-red-300 transition-colors duration-200 underline-offset-4 hover:underline"
              >
                สมัครสมาชิกที่นี่
              </Link>
            </div>
          </CardFooter>
        </Card>

        {/* Features Preview */}
        <div className="mt-8 text-center">
          <div className="flex justify-center items-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200">
              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
              <span>จัดการรายการหนัง</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200">
              <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-pulse animation-delay-1000"></div>
              <span>เขียนรีวิว</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse animation-delay-2000"></div>
              <span>ดูสถิติ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-3000 {
          animation-delay: 3s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
