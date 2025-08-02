import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../stores/useUserStore";
import {
  LayoutDashboard,
  List,
  Heart,
  ThumbsDown,
  BookmarkPlus,
  BarChart3,
  Settings,
  LogOut,
  Search,
} from "lucide-react";

export default function DashboardNav() {
  const location = useLocation();
  const { logout } = useUserStore();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "แดชบอร์ด" },
    { to: "/search", icon: Search, label: "ค้นหาหนัง" },
    { to: "/my-list", icon: List, label: "รายการของฉัน" },
    { to: "/my-list/liked", icon: Heart, label: "หนังที่ชอบ" },
    { to: "/my-list/disliked", icon: ThumbsDown, label: "หนังที่ไม่ชอบ" },
    { to: "/my-list/watch_later", icon: BookmarkPlus, label: "ดูภายหลัง" },
    { to: "/stats", icon: BarChart3, label: "สถิติ" },
    { to: "/settings", icon: Settings, label: "ตั้งค่า" },
  ];

  const handleLogout = async () => {
    if (confirm("คุณต้องการออกจากระบบหรือไม่?")) {
      await logout();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <Link to="/dashboard" className="text-lg font-bold">
          🎬 My Movie List
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.to}
              asChild
              variant={isActive(item.to) ? "default" : "ghost"}
              className="w-full justify-start"
            >
              <Link to={item.to}>
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="mr-3 h-4 w-4" />
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );
}
