import { useState } from "react";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Eye
} from "lucide-react";

const followerGrowth = [
  { month: "Ene", followers: 42000 },
  { month: "Feb", followers: 43500 },
  { month: "Mar", followers: 45200 },
  { month: "Abr", followers: 44800 },
  { month: "May", followers: 46500 },
  { month: "Jun", followers: 47321 },
];

const engagementByPlatform = [
  { platform: "Instagram", likes: 8500, comments: 1200, shares: 450 },
  { platform: "Twitter", likes: 5200, comments: 890, shares: 320 },
  { platform: "Facebook", likes: 6800, comments: 1100, shares: 560 },
  { platform: "LinkedIn", likes: 3400, comments: 450, shares: 280 },
];

const contentPerformance = [
  { type: "Videos", engagement: 85 },
  { type: "Imágenes", engagement: 72 },
  { type: "Carruseles", engagement: 68 },
  { type: "Texto", engagement: 45 },
  { type: "Stories", engagement: 78 },
  { type: "Reels", engagement: 92 },
];

const hourlyActivity = [
  { hour: "00:00", activity: 120 },
  { hour: "03:00", activity: 80 },
  { hour: "06:00", activity: 150 },
  { hour: "09:00", activity: 450 },
  { hour: "12:00", activity: 680 },
  { hour: "15:00", activity: 720 },
  { hour: "18:00", activity: 890 },
  { hour: "21:00", activity: 650 },
];

const metrics = [
  { 
    label: "Alcance Total", 
    value: "328K", 
    change: "+24.1%", 
    isPositive: true,
    icon: Eye,
    color: "bg-blue-500"
  },
  { 
    label: "Total Likes", 
    value: "45.2K", 
    change: "+18.3%", 
    isPositive: true,
    icon: Heart,
    color: "bg-pink-500"
  },
  { 
    label: "Comentarios", 
    value: "3.8K", 
    change: "+12.7%", 
    isPositive: true,
    icon: MessageCircle,
    color: "bg-green-500"
  },
  { 
    label: "Compartidos", 
    value: "2.1K", 
    change: "-3.2%", 
    isPositive: false,
    icon: Share2,
    color: "bg-purple-500"
  },
];

export function Analytics() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analíticas</h1>
          <p className="text-gray-600 mt-1">Análisis detallado del rendimiento de tus redes sociales</p>
        </div>
        <Tabs value={timeRange} onValueChange={setTimeRange}>
          <TabsList>
            <TabsTrigger value="7d">7 días</TabsTrigger>
            <TabsTrigger value="30d">30 días</TabsTrigger>
            <TabsTrigger value="90d">90 días</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.isPositive ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className={`${metric.color} p-3 rounded-lg`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Follower Growth */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Crecimiento de Seguidores</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={followerGrowth}>
              <defs>
                <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="followers" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorFollowers)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Engagement by Platform */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement por Plataforma</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementByPlatform}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="platform" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="likes" fill="#ec4899" radius={[4, 4, 0, 0]} />
              <Bar dataKey="comments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shares" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-pink-500" />
              <span className="text-sm text-gray-600">Likes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-600">Comentarios</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-gray-600">Compartidos</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Performance Radar */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rendimiento por Tipo de Contenido</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={contentPerformance}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="type" stroke="#6b7280" />
              <PolarRadiusAxis stroke="#6b7280" />
              <Radar 
                name="Engagement" 
                dataKey="engagement" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.6} 
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Hourly Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Actividad por Hora</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="activity" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Performing Posts */}
      <Card className="p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Posts con Mejor Rendimiento</h2>
        <div className="space-y-4">
          {[
            { platform: "Instagram", content: "Lanzamiento nueva colección primavera", likes: 2845, comments: 234, date: "15 Mar" },
            { platform: "Twitter", content: "10 consejos para aumentar tu engagement", likes: 1923, comments: 156, date: "14 Mar" },
            { platform: "Facebook", content: "Evento especial este fin de semana", likes: 1678, comments: 198, date: "13 Mar" },
            { platform: "LinkedIn", content: "El futuro del marketing digital", likes: 987, comments: 87, date: "12 Mar" },
          ].map((post, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">{post.platform}</span>
                  <span className="text-sm text-gray-500">• {post.date}</span>
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
              <div className="flex items-center gap-6 ml-6">
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{post.likes}</p>
                  <p className="text-xs text-gray-500">Likes</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-gray-900">{post.comments}</p>
                  <p className="text-xs text-gray-500">Comentarios</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
