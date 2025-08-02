import { Outlet } from "react-router";
import AuthGuard from "../components/AuthGuard";
import DashboardNav from "../components/DashboardNav";

export default function ProtectedLayout() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <div className="flex">
          <aside className="w-64 min-h-screen bg-card border-r">
            <DashboardNav />
          </aside>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
