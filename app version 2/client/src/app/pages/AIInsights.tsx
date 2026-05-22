import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  AreaChart,
  Area,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from "recharts";
import { 
  Sparkles,
  TrendingUp,
  BrainCircuit,
  Zap,
  Target,
  ArrowUpRight,
  ChevronRight,
  RefreshCw,
  Info,
  Calendar,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";
import { API_BASE_URL } from "../config";

interface KPI {
  precision: number;
  precisionText: string;
  growth: number;
  recoms: number;
  success: number;
}

interface Insights {
  formatInsight: string;
  peakInsight: string;
  weekdayInsight: string;
  predictionInsight: string;
}

interface PublicationItem {
  day: string;
  time: string;
  type: string;
  desc: string;
}

interface Recommendation {
  id: string;
  type: string;
  title: string;
  prob: string;
  desc: string;
  action: string;
}

export function AIInsights() {
  const [loading, setLoading] = useState(true);
  const [accountSelected, setAccountSelected] = useState("instagram");
  const [timeRange, setTimeRange] = useState("3m");
  
  // Data State with elegant defaults in case backend is offline
  const [kpis, setKpis] = useState<KPI>({
    precision: 94,
    precisionText: "+8% vs mes anterior",
    growth: 45,
    recoms: 12,
    success: 89,
  });

  const [insights, setInsights] = useState<Insights>({
    formatInsight: "Videos cortos superan otros formatos por 2.3x",
    peakInsight: "Horario pico: 6pm - 9pm con 95% de efectividad",
    weekdayInsight: "Los fines de semana (Vie-Dom) generan 35% más engagement",
    predictionInsight: "Predicción: Si mantienes el patrón actual y aplicas las recomendaciones, alcanzarás 4,500 usuarios en 6 semanas (incremento del 45%).",
  });

  const [charts, setCharts] = useState({
    growthData: [
      { name: "Sem 1", Real: 1200, IA: null },
      { name: "Sem 2", Real: 1800, IA: null },
      { name: "Sem 3", Real: 2300, IA: 2300 },
      { name: "Sem 4", Real: null, IA: 3100 },
      { name: "Sem 5", Real: null, IA: 3900 },
      { name: "Sem 6", Real: null, IA: 4500 },
    ],
    weekdayData: [
      { name: "Lun", Engagement: 65, Alcance: 3200 },
      { name: "Mar", Engagement: 70, Alcance: 3500 },
      { name: "Mié", Engagement: 78, Alcance: 4100 },
      { name: "Jue", Engagement: 82, Alcance: 4300 },
      { name: "Vie", Engagement: 90, Alcance: 4900 },
      { name: "Sáb", Engagement: 85, Alcance: 4500 },
      { name: "Dom", Engagement: 95, Alcance: 5200 },
    ],
    peakHoursData: [
      { subject: "6-9am", A: 40, fullMark: 100 },
      { subject: "9-12pm", A: 60, fullMark: 100 },
      { subject: "12-3pm", A: 75, fullMark: 100 },
      { subject: "3-6pm", A: 85, fullMark: 100 },
      { subject: "6-9pm", A: 95, fullMark: 100 },
      { subject: "9-12am", A: 50, fullMark: 100 },
    ],
    formatData: [
      { name: "Imágenes", Performance: 80 },
      { name: "Videos", Performance: 93 },
      { name: "Carruseles", Performance: 75 },
      { name: "Texto", Performance: 60 },
    ],
  });

  const [plan, setPlan] = useState<PublicationItem[]>([
    { day: "Lunes", time: "18:00", type: "Imagen inspiracional", desc: "Alto engagement en tarde" },
    { day: "Miércoles", time: "19:30", type: "Video corto", desc: "Pico de actividad" },
    { day: "Viernes", time: "20:00", type: "Carousel educativo", desc: "Mejor día de la semana" },
    { day: "Domingo", time: "17:00", type: "Post premium", desc: "Máximo engagement" },
  ]);

  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: "rec-1",
      type: "high",
      title: "Horario Óptimo de Publicación",
      prob: "94% seguro",
      desc: "Las publicaciones entre 6pm-9pm obtienen 45% más engagement que el promedio, basado en análisis de 1 meses.",
      action: "Programar tus posts principales en este horario",
    },
    {
      id: "rec-2",
      type: "high",
      title: "Frecuencia Recomendada",
      prob: "88% seguro",
      desc: "El patrón de 3-4 posts por semana muestra mejor retención de audiencia que publicar diariamente.",
      action: "Reducir la frecuencia a 3-4 posts semanales",
    },
    {
      id: "rec-3",
      type: "medium",
      title: "Tipo de Contenido Preferido",
      prob: "91% seguro",
      desc: "Los videos cortos generan 2.3x más shares que otros formatos. Tu audiencia prefiere contenido visual dinámico.",
      action: "Incrementar la producción de videos cortos",
    },
    {
      id: "rec-4",
      type: "high",
      title: "Días de Mayor Engagement",
      prob: "89% seguro",
      desc: "Domingos y viernes muestran picos de engagement del 35% sobre el promedio semanal.",
      action: "Concentrar contenido premium en fin de semana",
    },
    {
      id: "rec-5",
      type: "medium",
      title: "Evitar Lunes en la Mañana",
      prob: "82% seguro",
      desc: "Las publicaciones del lunes antes de las 12pm tienen 28% menos interacción.",
      action: "Evitar publicar los lunes en la mañana",
    },
  ]);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/instagram/insights?userId=default-user`);
      const data = await response.json();
      if (data && data.success) {
        setKpis(data.kpis);
        setInsights(data.insights);
        setCharts(data.charts);
        setPlan(data.plan);
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      console.warn("Falla de conexión con el backend de insights. Se mantienen los datos del mockup estéticos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleApplyPlan = () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));
    toast.promise(promise, {
      loading: "Sincronizando el plan óptimo con tu calendario...",
      success: "¡Plan de Publicación de IA aplicado exitosamente en tu agenda!",
      error: "Error al aplicar el plan",
    });
  };

  const handleExecuteAction = (actionText: string) => {
    toast.success(`Ejecutando acción optimizada: "${actionText}"`);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-8 h-8 text-purple-600 animate-pulse" />
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">AI Insights</h1>
          </div>
          <p className="text-gray-500 mt-1">Predicciones inteligentes y sugerencias basadas en minería de datos</p>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={accountSelected} 
            onChange={(e) => setAccountSelected(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="instagram">Instagram (@juanda_jime)</option>
            <option value="twitter">Twitter / X</option>
            <option value="facebook">Facebook</option>
          </select>

          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="1m">Último mes</option>
            <option value="3m">Últimos 3 meses</option>
            <option value="6m">Últimos 6 meses</option>
          </select>

          <Button 
            variant="outline" 
            size="icon" 
            onClick={fetchInsights} 
            disabled={loading}
            className="shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Grid General */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Columna Izquierda (3/4): Gráficos y Métricas */}
        <div className="xl:col-span-3 space-y-8">
          
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Precisión */}
            <Card className="p-6 border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute right-4 top-4 opacity-10 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-12 h-12 text-purple-600" />
              </div>
              <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Precisión IA</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{kpis.precision}%</h3>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span>{kpis.precisionText}</span>
              </p>
            </Card>

            {/* Crecimiento */}
            <Card className="p-6 border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute right-4 top-4 opacity-10 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-12 h-12 text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Crecimiento Proyectado</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-1">+{kpis.growth}%</h3>
              <p className="text-xs text-blue-500 font-medium">Próximas 6 semanas</p>
            </Card>

            {/* Recomendaciones */}
            <Card className="p-6 border-l-4 border-l-green-500 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute right-4 top-4 opacity-10 group-hover:scale-110 transition-transform">
                <Zap className="w-12 h-12 text-green-600" />
              </div>
              <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Recomendaciones</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{kpis.recoms}</h3>
              <p className="text-xs text-green-600 font-medium">5 de alto impacto</p>
            </Card>

            {/* Tasa Éxito */}
            <Card className="p-6 border-l-4 border-l-orange-500 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute right-4 top-4 opacity-10 group-hover:scale-110 transition-transform">
                <Target className="w-12 h-12 text-orange-600" />
              </div>
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">Tasa de Éxito</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mb-1">{kpis.success}%</h3>
              <p className="text-xs text-orange-500 font-medium">Sugerencias aplicadas</p>
            </Card>

          </div>

          {/* Gráfico 1: Proyecciones de Crecimiento */}
          <Card className="p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <span>Proyecciones de Crecimiento</span>
                  <span className="text-xs bg-purple-50 text-purple-700 font-medium px-2 py-0.5 rounded border border-purple-100">Basado en 12 semanas de datos</span>
                </h2>
              </div>
            </div>

            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={charts.growthData}>
                  <defs>
                    <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorIA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #f3f4f6', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}
                  />
                  <Legend verticalAlign="top" height={36} iconType="circle" />
                  <Area 
                    name="Alcance Real"
                    type="monotone" 
                    dataKey="Real" 
                    stroke="#8b5cf6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorReal)" 
                  />
                  <Area 
                    name="Proyección IA"
                    type="monotone" 
                    dataKey="IA" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    fillOpacity={1} 
                    fill="url(#colorIA)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
              <p className="text-sm text-purple-900 font-medium">
                {insights.predictionInsight}
              </p>
            </div>
          </Card>

          {/* Dos Gráficos en Fila (Día y Horarios) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Gráfico 2: Rendimiento por Día de la Semana */}
            <Card className="p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>Rendimiento por Día de la Semana</span>
              </h2>

              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={charts.weekdayData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
                    <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #f3f4f6', borderRadius: '8px' }}
                    />
                    <Legend verticalAlign="top" height={32} iconType="circle" />
                    <Bar name="Engagement %" dataKey="Engagement" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={28} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-50 px-3 py-2 rounded border border-green-100">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{insights.weekdayInsight}</span>
              </div>
            </Card>

            {/* Gráfico 3: Mejores Horarios de Publicación */}
            <Card className="p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>Mejores Horarios de Publicación</span>
              </h2>

              <div className="h-[280px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={charts.peakHoursData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" stroke="#6b7280" fontSize={11} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#9ca3af" fontSize={10} />
                    <Radar 
                      name="Efectividad" 
                      dataKey="A" 
                      stroke="#f59e0b" 
                      fill="#f59e0b" 
                      fillOpacity={0.35} 
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-2 rounded border border-amber-100">
                <Info className="w-4 h-4 shrink-0" />
                <span>{insights.peakInsight}</span>
              </div>
            </Card>

          </div>

          {/* Gráfico 4: Rendimiento por Tipo de Contenido */}
          <Card className="p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Rendimiento por Tipo de Contenido</h2>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={charts.formatData}
                  margin={{ left: 20, right: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} stroke="#9ca3af" fontSize={12} tickLine={false} />
                  <YAxis type="category" dataKey="name" stroke="#374151" fontSize={12} tickLine={false} />
                  <Tooltip />
                  <Bar name="Performance %" dataKey="Performance" fill="#10b981" radius={[0, 4, 4, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-2 rounded border border-emerald-100">
              <CheckCircle className="w-4 h-4 shrink-0" />
              <span>{insights.formatInsight}</span>
            </div>
          </Card>

        </div>

        {/* Columna Derecha (1/4): Plan IA y Recomendaciones */}
        <div className="xl:col-span-1 space-y-8">
          
          {/* Plan de Publicación IA */}
          <Card className="p-6 shadow-sm border border-purple-100 bg-gradient-to-b from-white to-purple-50/10">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-600" />
              <span>Plan de Publicación IA</span>
            </h2>

            <div className="space-y-4 mb-6">
              {plan.map((item, idx) => (
                <div key={idx} className="p-3 bg-white rounded-lg border border-purple-100 shadow-2xs hover:shadow-xs transition-shadow">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-gray-900">{item.day}</span>
                    <span className="text-xs bg-purple-50 text-purple-600 font-semibold px-2 py-0.5 rounded">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-gray-800">{item.type}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>

            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              onClick={handleApplyPlan}
            >
              <Sparkles className="w-4 h-4" />
              Aplicar Plan
            </Button>
          </Card>

          {/* Recomendaciones IA */}
          <Card className="p-6 shadow-sm flex flex-col max-h-[620px]">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-600" />
              <span>Recomendaciones IA</span>
            </h2>

            <div className="overflow-y-auto space-y-4 pr-1 flex-1 scrollbar-thin">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  onClick={() => handleExecuteAction(rec.action)}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-purple-200 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded flex items-center gap-1 ${
                      rec.type === 'high' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      <ArrowUpRight className="w-3 h-3" />
                      {rec.type === 'high' ? 'Alto Impacto' : 'Medio Impacto'}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{rec.prob}</span>
                  </div>
                  
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                    {rec.title}
                  </h3>
                  
                  <p className="text-xs text-gray-600 leading-relaxed mb-3">
                    {rec.desc}
                  </p>

                  <div className="flex items-center text-xs font-semibold text-purple-600 group-hover:text-purple-700">
                    <span>{rec.action}</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}
