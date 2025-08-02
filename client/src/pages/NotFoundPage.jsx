import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900">
      <div className="relative z-10 w-full max-w-md px-6">
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl dark:bg-gray-800/80">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🎬</div>
            <CardTitle className="text-2xl font-semibold">หน้าไม่พบ</CardTitle>
            <CardDescription>ขออภัย ไม่พบหน้าที่คุณกำลังมองหา</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center text-sm text-muted-foreground mb-6">
              หน้าที่คุณพยายามเข้าถึงอาจถูกย้าย ลบ หรือไม่มีอยู่จริง
            </div>

            <div className="flex flex-col gap-3">
              <Button asChild className="w-full" size="lg">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  กลับหน้าแรก
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full" size="lg">
                <Link to="/search">
                  <Search className="mr-2 h-4 w-4" />
                  ค้นหาหนัง
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                กลับหน้าก่อนหน้า
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
