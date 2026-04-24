import { Card } from "../components/ui/card";
import { Link } from "react-router";
import { 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Heart,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  LayoutGrid
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

const statsData = [
  { label: "Seguidores Totales", value: "47,321", change: "+12.5%", icon: Users, color: "bg-blue-500" },
  { label: "Engagement Rate", value: "8.4%", change: "+2.3%", icon: Heart, color: "bg-pink-500" },
  { label: "Posts Publicados", value: "124", change: "+18", icon: MessageCircle, color: "bg-green-500" },
  { label: "Alcance Total", value: "328K", change: "+24.1%", icon: TrendingUp, color: "bg-purple-500" },
];

const engagementData = [
  { name: "Lun", engagement: 4200 },
  { name: "Mar", engagement: 5800 },
  { name: "Mié", engagement: 4900 },
  { name: "Jue", engagement: 7200 },
  { name: "Vie", engagement: 6500 },
  { name: "Sáb", engagement: 8900 },
  { name: "Dom", engagement: 7800 },
];

  // Se reemplaza platformData estática por una dinámica calculada dentro del componente

const recentPosts = [
  { 
    id: 1, 
    platform: "Instagram", 
    icon: Instagram, 
    content: "Lanzamiento de nueva campaña de verano 🌞", 
    likes: 1234, 
    comments: 89,
    time: "Hace 2 horas"
  },
  { 
    id: 2, 
    platform: "Twitter", 
    icon: Twitter, 
    content: "Tips para mejorar tu estrategia de contenido", 
    likes: 567, 
    comments: 34,
    time: "Hace 5 horas"
  },
  { 
    id: 3, 
    platform: "Facebook", 
    icon: Facebook, 
    content: "Evento especial este fin de semana 🎉", 
    likes: 892, 
    comments: 45,
    time: "Hace 1 día"
  },
  { 
    id: 4, 
    platform: "LinkedIn", 
    icon: Linkedin, 
    content: "Casos de éxito en marketing digital", 
    likes: 234, 
    comments: 12,
    time: "Hace 1 día"
  },
];

import { useState, useEffect } from "react";

export function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("Todas");
  const [realPosts, setRealPosts] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [postsRes, accountsRes] = await Promise.all([
          fetch("http://localhost:3000/instagram/posts"),
          fetch("http://localhost:3000/instagram/accounts")
        ]);
        
        const postsData = await postsRes.json();
        const accountsData = await accountsRes.json();
        
        setRealPosts(Array.isArray(postsData) ? postsData : []);
        setAccounts(Array.isArray(accountsData) ? accountsData : []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoadingPosts(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate dynamic stats
  const totalFollowers = accounts.reduce((sum, acc) => sum + (acc.followersCount || 0), 0);
  const totalPostsCount = accounts.reduce((sum, acc) => sum + (acc.mediaCount || 0), 0);
  
  const totalLikes = realPosts.reduce((sum, p) => sum + (p.like_count || 0), 0);
  const totalComments = realPosts.reduce((sum, p) => sum + (p.comments_count || 0), 0);
  const totalEngagement = totalLikes + totalComments;
  
  // Historical or specific dynamic stats based on filter
  const isAll = activeFilter === "Todas";
  const hasRealData = totalFollowers > 0;
  
  const displayFollowers = hasRealData ? totalFollowers.toLocaleString() : "0";
  const displayEngagementRate = hasRealData ? ((totalEngagement / (totalFollowers || 1)) * 100).toFixed(1) + "%" : "0%";
  const displayPosts = hasRealData ? totalPostsCount.toString() : "0";
  const displayReach = hasRealData ? ((totalEngagement * 3.5) >= 1000 ? ((totalEngagement * 3.5)/1000).toFixed(1) + 'K' : Math.floor(totalEngagement * 3.5).toString()) : "0";

  // Fake historical data for the graph using our real total as a base (for MVP aesthetics)
  const baseAvg = Math.max(1, totalEngagement / 7);
  const dynamicEngagementData = [
    { name: "Lun", engagement: Math.floor(baseAvg * 0.8) },
    { name: "Mar", engagement: Math.floor(baseAvg * 1.2) },
    { name: "Mié", engagement: Math.floor(baseAvg * 0.9) },
    { name: "Jue", engagement: Math.floor(baseAvg * 1.5) },
    { name: "Vie", engagement: Math.floor(baseAvg * 1.1) },
    { name: "Sáb", engagement: Math.floor(baseAvg * 1.8) },
    { name: "Dom", engagement: Math.floor(baseAvg * 1.3) },
  ];

  // Dynamic Platform Distribution (Solo Instagram por ahora de lo que hay en BD)
  const platformData = hasRealData ? [
    { name: "Instagram", value: 100, color: "#E1306C" }
  ] : [
    { name: "Sin Datos", value: 100, color: "#e5e7eb" }
  ];

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Resumen de tu actividad en redes sociales</p>
        </div>
      </div>

      {/* Social Network Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <button
          onClick={() => setActiveFilter("Todas")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
            activeFilter === "Todas" 
              ? "bg-gray-800 text-white border-gray-800 shadow-sm" 
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          Todas
        </button>
        
        <button
          onClick={() => setActiveFilter("Instagram")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
            activeFilter === "Instagram" 
              ? "bg-gray-800 text-white border-gray-800 shadow-sm" 
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          <Instagram className="w-4 h-4" />
          Instagram
        </button>
        
        <button
          disabled
          title="Próximamente"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
        >
          <Twitter className="w-4 h-4" />
          Twitter
        </button>
        
        <button
          disabled
          title="Próximamente"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
        >
          <Facebook className="w-4 h-4" />
          Facebook
        </button>
        
        <button
          disabled
          title="Próximamente"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors border bg-gray-50 text-gray-400 border-gray-100 cursor-not-allowed"
        >
          <Linkedin className="w-4 h-4" />
          LinkedIn
        </button>
      </div>

      {/* Dynamic Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border-gray-200/60 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Seguidores Totales</p>
              <p className="text-2xl font-black text-gray-900">{displayFollowers}</p>
              <p className="text-xs font-semibold text-emerald-500 mt-2">+12.5% vs mes anterior</p>
            </div>
            <div className={`bg-blue-500 rounded-xl p-3 flex items-center justify-center`}><Users className="w-6 h-6 text-white" /></div>
          </div>
        </Card>
        
        <Card className="p-6 border-gray-200/60 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Engagement Rate</p>
              <p className="text-2xl font-black text-gray-900">{displayEngagementRate}</p>
              <p className="text-xs font-semibold text-emerald-500 mt-2">+2.3% vs mes anterior</p>
            </div>
            <div className={`bg-pink-500 rounded-xl p-3 flex items-center justify-center`}><Heart className="w-6 h-6 text-white" /></div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200/60 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Posts Publicados</p>
              <p className="text-2xl font-black text-gray-900">{displayPosts}</p>
              <p className="text-xs font-semibold text-emerald-500 mt-2">+18 vs mes anterior</p>
            </div>
            <div className={`bg-emerald-500 rounded-xl p-3 flex items-center justify-center`}><MessageCircle className="w-6 h-6 text-white" /></div>
          </div>
        </Card>

        <Card className="p-6 border-gray-200/60 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Alcance Total</p>
              <p className="text-2xl font-black text-gray-900">{displayReach}</p>
              <p className="text-xs font-semibold text-emerald-500 mt-2">+24.1% vs mes anterior</p>
            </div>
            <div className={`bg-purple-500 rounded-xl p-3 flex items-center justify-center`}><TrendingUp className="w-6 h-6 text-white" /></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Engagement Chart */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement Semanal</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dynamicEngagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="engagement" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Platform Distribution */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribución por Plataforma</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {platformData.map((platform, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: platform.color }}
                  />
                  <span className="text-sm text-gray-700">{platform.name}</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">{platform.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Posts */}
      <Card className="p-6 shadow-sm border-gray-200/60">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Posts Recientes</h2>
        <div className="space-y-4">
          {isLoadingPosts ? (
            <div className="text-center py-6 text-gray-500">Cargando posts de Instagram...</div>
          ) : realPosts.length === 0 ? (
            <div className="text-center py-6 text-gray-500">No hay posts todavía o no has conectado tu cuenta.</div>
          ) : (
            realPosts.map((post) => (
              <Link key={post.id} to={`/post/${post.id}`} className="block">
                <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200 cursor-pointer">
                  <div className="p-2 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-lg">
                    {post.thumbnail_url || post.media_url ? (
                      <img 
                         src={post.thumbnail_url || post.media_url} 
                         alt="Post thumbnail" 
                         className="w-10 h-10 object-cover rounded-md" 
                      />
                    ) : (
                      <Instagram className="w-5 h-5 text-white m-2.5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900">Instagram</span>
                      <span className="text-sm text-gray-500">• {new Date(post.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-700 mb-2 line-clamp-2">{post.caption || "Post visual sin texto."}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1 font-semibold text-gray-800">
                        <Heart className="w-4 h-4 text-pink-500" />
                        {post.like_count || 0}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-gray-800">
                        <MessageCircle className="w-4 h-4 text-blue-500" />
                        {post.comments_count || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
