import { Outlet, Link, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { 
  LayoutDashboard, 
  Calendar, 
  PlusCircle, 
  Users, 
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
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/instagram/accounts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAccount(data[0]);
        }
      })
      .catch(err => console.error("Error fetching accounts for layout:", err));
  }, []);
  
  const navItems = [
    { path: "/app", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/app/scheduler", icon: Calendar, label: "Programador" },
    { path: "/app/create", icon: PlusCircle, label: "Crear Post" },
    { path: "/app/drafts", icon: FileText, label: "Borradores" },
    { path: "/app/inbox", icon: MessageSquare, label: "Mensajes" },
    { path: "/app/accounts", icon: Users, label: "Cuentas" },
    { path: "/app/insights", icon: Sparkles, label: "AI Insights" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center leading-none select-none">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-blue-600 bg-clip-text text-transparent uppercase font-sans">
              DOCE
            </span>
            <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md tracking-wider uppercase">
              APP
            </span>
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
                {account?.profilePicture ? (
                  <img 
                    src={account.profilePicture} 
                    alt={account.accountName} 
                    className="w-10 h-10 rounded-full object-cover shadow-sm border border-gray-100" 
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-sm">
                    {account?.accountName ? account.accountName[0].toUpperCase() : "U"}
                  </div>
                )}
                <div className="text-left flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {account?.accountName ? `@${account.accountName}` : "Usuario Conectado"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {account?.followersCount !== undefined ? `${account.followersCount} seguidores` : "Sin cuenta vinculada"}
                  </p>
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
