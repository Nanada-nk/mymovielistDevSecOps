import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStore } from "../stores/useUserStore";
import { User, Settings, List, LogOut, Search, Home, Film } from "lucide-react";

export default function Header() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useUserStore();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/90">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold hover:opacity-80 transition-opacity"
          >
            <Film className="h-6 w-6 text-red-600" />
            <span className="bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              My Movie List
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Button
              asChild
              variant={isActive("/") ? "default" : "ghost"}
              className={isActive("/") ? "bg-red-600 hover:bg-red-700 text-white" : "text-gray-200 hover:bg-gray-800 hover:text-white"}
              size="sm"
            >
              <Link to="/" className="gap-2">
                <Home className="h-4 w-4" />
                หน้าแรก
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/search") ? "default" : "ghost"}
              size="sm"
              className={isActive("/search") ? "bg-red-600 hover:bg-red-700 text-white" : "text-gray-200 hover:bg-gray-800 hover:text-white"}
            >
              <Link to="/search" className="gap-2">
                <Search className="h-4 w-4" />
                ค้นหา
              </Link>
            </Button>
          </nav>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              {/* Dashboard Button - Hidden on mobile */}
              <Button
                asChild
                variant={isActive("/dashboard") ? "default" : "ghost"}
                size="sm"
                className={isActive("/dashboard") ? "bg-red-600 hover:bg-red-700 text-white" : "hidden sm:inline-flex gap-2 text-gray-200 hover:bg-gray-800 hover:text-white"}
              >
                <Link to="/dashboard" className="gap-2">
                  <List className="h-4 w-4" />
                  แดชบอร์ด
                </Link>
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full text-gray-100 hover:bg-gray-800 hover:text-white"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback className="bg-red-600 text-white">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56  backdrop-blur supports-[backdrop-filter]:bg-gray-950/55 text-white border-none" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {/* Mobile Navigation Items */}
                  <div className="md:hidden">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <List className="h-4 w-4" />
                        แดชบอร์ด
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/search" className="flex items-center gap-2">
                        <Search className="h-4 w-4" />
                        ค้นหา
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </div>

                  <DropdownMenuItem asChild>
                    <Link to="/my-list" className="flex items-center gap-2">
                      <Film className="h-4 w-4" />
                      รายการของฉัน
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      ตั้งค่า
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    ออกจากระบบ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">เข้าสู่ระบบ</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">สมัครสมาชิก</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      {isAuthenticated && (
        <div className="md:hidden border-t bg-background/95">
          <div className="container mx-auto px-4 py-2 flex justify-center space-x-4">
            <Button
              asChild
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Link to="/">
                <Home className="h-4 w-4" />
                หน้าแรก
              </Link>
            </Button>
            <Button
              asChild
              variant={isActive("/search") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <Link to="/search">
                <Search className="h-4 w-4" />
                ค้นหา
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
