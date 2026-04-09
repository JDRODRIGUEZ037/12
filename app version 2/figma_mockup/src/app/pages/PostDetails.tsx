import React from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link, useParams } from "react-router";
import { 
  ArrowLeft, Instagram, Heart, MessageCircle, Share2, Eye, MapPin, Image as ImageIcon, TrendingUp 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell
} from "recharts";

const engagementData = [
  { time: "00:00", value: 50 },
  { time: "04:00", value: 120 },
  { time: "08:00", value: 350 },
  { time: "12:00", value: 600 },
  { time: "16:00", value: 900 },
  { time: "20:00", value: 1100 },
  { time: "24:00", value: 1250 },
];

const ageData = [
  { age: "18-24", value: 25 },
  { age: "25-34", value: 45 },
  { age: "35-44", value: 18 },
  { age: "45+", value: 12 },
];

const genderData = [
  { name: "Mujeres", value: 62, color: "#ec4899" },
  { name: "Hombres", value: 35, color: "#3b82f6" },
  { name: "Otros", value: 3, color: "#a855f7" },
];

const locationData = [
  { city: "Ciudad de México", percentage: 35, users: 4375, fill: 35 },
  { city: "Guadalajara", percentage: 22, users: 2750, fill: 22 },
  { city: "Monterrey", percentage: 18, users: 2250, fill: 18 },
  { city: "Puebla", percentage: 12, users: 1500, fill: 12 },
  { city: "Otros", percentage: 13, users: 1625, fill: 13 },
];

const comments = [
  { id: 1, name: "María González", time: "Hace 1 hora", text: "¡Me encanta! Definitivamente iré 😍", likes: 45, avatar: "M", color: "bg-purple-100 text-purple-600" },
  { id: 2, name: "Carlos Rodríguez", time: "Hace 2 horas", text: "Excelente iniciativa, muy profesional 👏", likes: 32, avatar: "C", color: "bg-blue-100 text-blue-600" },
  { id: 3, name: "Ana Martínez", time: "Hace 3 horas", text: "¿Habrá descuentos especiales?", likes: 28, avatar: "A", color: "bg-pink-100 text-pink-600" },
  { id: 4, name: "Luis Hernández", time: "Hace 4 horas", text: "Compartiré con mis amigos!", likes: 19, avatar: "L", color: "bg-indigo-100 text-indigo-600" },
];

export function PostDetails() {
  const { id } = useParams();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Top Nav */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Detalle de Publicación</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Instagram className="w-4 h-4 text-pink-600" />
            <span className="font-medium">Instagram</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>29 de Marzo, 2026 - 14:30</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">Publicado</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Contenido Post */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contenido</h2>
            <div className="bg-purple-50 rounded-xl h-64 flex flex-col items-center justify-center mb-6 border border-purple-100 border-dashed">
              <ImageIcon className="w-10 h-10 text-purple-300 mb-2" />
              <span className="text-purple-400 font-medium text-sm">Imagen de la publicación</span>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>¡Estamos emocionados de presentar nuestra nueva campaña de verano! 😍</p>
              <p>Descubre las últimas tendencias en moda veraniega con descuentos especiales durante todo el mes. No te lo pierdas!</p>
              <p className="text-blue-600 text-sm font-medium">#Verano2026 #Moda #Tendencias #NuevaColección</p>
            </div>
          </Card>

          {/* Engagement en el Tiempo */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Engagement en el Tiempo</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribución por Edad</h2>
              <div className="h-[200px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="age" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                    <RechartsTooltip cursor={{fill: '#f3f4f6'}} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-6 flex flex-col">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribución por Género</h2>
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="h-[140px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-full mt-4 space-y-2">
                  {genderData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-gray-600">{item.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Ubicaciones Principales */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Ubicaciones Principales</h2>
            <div className="space-y-4">
              {locationData.map((loc, idx) => (
                <div key={idx} className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 w-40 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">{loc.city}</span>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${loc.percentage}%` }} />
                    </div>
                  </div>
                  <div className="w-12 text-right font-medium text-gray-900">{loc.percentage}%</div>
                  <div className="w-12 text-right text-gray-500">{loc.users}</div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comentarios Destacados */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Comentarios Destacados</h2>
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${comment.color}`}>
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{comment.name}</span>
                      <span className="text-xs text-gray-500">• {comment.time}</span>
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{comment.text}</p>
                    <div className="flex items-center gap-1 text-xs font-medium text-gray-500">
                      <Heart className="w-3.5 h-3.5" />
                      {comment.likes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="space-y-8">
          
          {/* Métricas Principales */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Métricas Principales</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-pink-50/50 rounded-xl border border-pink-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-600 border-none" />
                  </div>
                  <span className="font-medium text-gray-800">Likes</span>
                </div>
                <span className="text-xl font-bold border-none text-gray-900">1234</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-600 border-none" />
                  </div>
                  <span className="font-medium text-gray-800">Comentarios</span>
                </div>
                <span className="text-xl font-bold border-none text-gray-900">89</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50/50 rounded-xl border border-green-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-green-600 border-none" />
                  </div>
                  <span className="font-medium text-gray-800">Compartidos</span>
                </div>
                <span className="text-xl font-bold border-none text-gray-900">45</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50/50 rounded-xl border border-purple-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-600 border-none" />
                  </div>
                  <span className="font-medium text-gray-800">Alcance</span>
                </div>
                <span className="text-xl font-bold border-none text-gray-900">12.500</span>
              </div>
            </div>
          </Card>

          {/* Resumen de Rendimiento */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Resumen de Rendimiento</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Engagement Rate</span>
                  <span className="font-bold text-green-600">10.94%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Impresiones</span>
                  <span className="font-bold text-gray-900">18.900</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Guardados</span>
                  <span className="font-bold text-gray-900">156</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Estadísticas Rápidas */}
          <Card className="p-6 text-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Estadísticas Rápidas</h2>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-600">Total Interacciones</span>
                <span className="font-semibold text-gray-900">1368</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-600">Tasa de Clic</span>
                <span className="font-semibold text-gray-900">3.2%</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-600">Tiempo Promedio</span>
                <span className="font-semibold text-gray-900">1m 45s</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Shares Rate</span>
                <span className="font-semibold text-gray-900">0.4%</span>
              </div>
            </div>
          </Card>

          {/* Acciones */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones</h2>
            <div className="space-y-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex gap-2">
                <TrendingUp className="w-4 h-4" /> Promocionar Post
              </Button>
              <Button variant="outline" className="w-full flex gap-2">
                <Share2 className="w-4 h-4" /> Compartir Nuevamente
              </Button>
              <Button variant="outline" className="w-full flex gap-2">
                Exportar Reporte
              </Button>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
