import { Outlet, Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Calendar, 
  PlusCircle, 
  Users, 
  BarChart3,
  Share2,
  FileText,
  MessageSquare,
  Sparkles
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "./ui/dropdown-menu";

export function Layout() {
  const location = useLocation();
  
  const navItems = [
    { path: "/app", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/app/scheduler", icon: Calendar, label: "Programador" },
    { path: "/app/create", icon: PlusCircle, label: "Crear Post" },
    { path: "/app/drafts", icon: FileText, label: "Borradores" },
    { path: "/app/inbox", icon: MessageSquare, label: "Mensajes" },
    { path: "/app/accounts", icon: Users, label: "Cuentas" },
    { path: "/app/analytics", icon: BarChart3, label: "Analíticas" },
    { path: "/app/insights", icon: Sparkles, label: "AI Insights" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Share2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-900">SocialHub</h1>
          </div>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer w-full">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  U
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-medium text-gray-900">Usuario Demo</p>
                  <p className="text-xs text-gray-500">demo@socialhub.com</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/app/settings" className="cursor-pointer w-full block">Configuración</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer">
                Cerrar Sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
