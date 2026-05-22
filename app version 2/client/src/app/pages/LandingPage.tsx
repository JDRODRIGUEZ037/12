import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Bot, 
  Share2, 
  BarChart3, 
  Instagram, 
  Users, 
  Calendar,
  CheckCircle2,
  Zap,
  MessageCircle,
  Sparkles,
  Shield,
  Lock,
  Globe,
  Sun,
  Moon,
  Database,
  Plug,
  TrendingUp,
  KeyRound,
  FileText,
  Activity,
  ArrowUpRight,
  ChevronRight,
  Smile,
  ShieldAlert,
  Sparkle
} from 'lucide-react';
import { useNavigate } from 'react-router';

// Custom Brand Vector Logo Component
const DoceLogo = () => (
  <div className="flex items-center leading-none select-none">
    <span className="text-2xl font-black tracking-tight text-white uppercase font-sans">
      DOCE
    </span>
  </div>
);

// Subcomponent: Animated Glowing Background Circles
const BackgroundGlows = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute top-[-10%] left-[5%] w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/15 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDuration: '8s' }} />
    <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/15 rounded-full blur-[130px] animate-float" style={{ animationDuration: '12s' }} />
    <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-cyan-600/10 dark:bg-cyan-600/15 rounded-full blur-[130px]" />
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'inbox' | 'scheduler' | 'analytics' | 'copy'>('inbox');
  const [isYearly, setIsYearly] = useState(false);
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // States for Self-Playing AI Simulator
  const [simStep, setSimStep] = useState(0);
  const [simMessages, setSimMessages] = useState<{ sender: 'user' | 'ai'; text: string; time: string }[]>([]);
  const [simStats, setSimStats] = useState({ reach: 85200, engagement: 4.8, followers: 12400 });
  const [simStatus, setSimStatus] = useState<'idle' | 'incoming' | 'thinking' | 'responded'>('idle');

  // Multi-language content dictionary
  const content = {
    es: {
      navHome: "Inicio",
      navFeatures: "Funcionalidades",
      navHowItWorks: "Cómo Funciona",
      navPricing: "Precios",
      navCTA: "Acceder al App",
      badgeText: "Plataforma Doce Digital AI v2",
      heroTitle: "Domina tus Redes Sociales",
      heroTitleGradient: "con Inteligencia Artificial",
      heroSubtitle: "Programa contenido, automatiza DMs de Instagram y optimiza tu engagement mediante modelos de IA conversacional avanzados y flujos seguros de datos.",
      heroCTA1: "Probar Doce Digital AI",
      heroCTA2: "Agendar Demo",
      heroTagline: "Prueba de 14 días gratis · Sin tarjeta de crédito",
      trustCenterTitle: "Centro de Confianza & Seguridad",
      trustCenterSubtitle: "Cumplimiento normativo y resiliencia arquitectónica de nivel empresarial por defecto.",
    },
    en: {
      navHome: "Home",
      navFeatures: "Features",
      navHowItWorks: "How It Works",
      navPricing: "Pricing",
      navCTA: "Enter App",
      badgeText: "Doce Digital AI Platform v2",
      heroTitle: "Master Your Social Networks",
      heroTitleGradient: "with Artificial Intelligence",
      heroSubtitle: "Schedule content, automate Instagram DMs, and optimize your engagement using advanced conversational AI and secure data pipelines.",
      heroCTA1: "Try Doce Digital AI",
      heroCTA2: "Book a Demo",
      heroTagline: "14-day free trial · No credit card required",
      trustCenterTitle: "Trust & Security Center",
      trustCenterSubtitle: "Enterprise-grade compliance and architectural resilience by default.",
    }
  };

  const t = content[language];

  // Self-playing AI Simulator cycle
  useEffect(() => {
    const timer = setInterval(() => {
      setSimStep((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    switch (simStep) {
      case 0:
        setSimStatus('idle');
        setSimMessages([]);
        setSimStats({ reach: 85200, engagement: 4.8, followers: 12400 });
        break;
      case 1:
        setSimStatus('incoming');
        setSimMessages([
          { sender: 'user', text: "¡Hola! ¿Tienen stock de la chaqueta azul y hacen envíos a Cali?", time: "Ahora" }
        ]);
        break;
      case 2:
        setSimStatus('thinking');
        break;
      case 3:
        setSimStatus('responded');
        setSimMessages([
          { sender: 'user', text: "¡Hola! ¿Tienen stock de la chaqueta azul y hacen envíos a Cali?", time: "Hace 1m" },
          { sender: 'ai', text: "¡Hola! Sí, tenemos stock disponible de la chaqueta azul en tallas M y L. Realizamos envíos rápidos a Cali y son totalmente gratis por compras superiores a $150k. 🚀✨", time: "Ahora" }
        ]);
        break;
      case 4:
        // Boost metrics after response
        setSimStats({ reach: 86450, engagement: 5.3, followers: 12415 });
        break;
    }
  }, [simStep]);

  return (
    <div className={`min-h-screen bg-[#070b18] text-[#f1f5f9] font-sans overflow-x-hidden selection:bg-blue-500/30 selection:text-white`}>
      <BackgroundGlows />

      {/* Modern Glassmorphism Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#070b18]/70 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DoceLogo className="h-6.5 w-auto text-white" />
          </div>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#about" className="hover:text-white transition-colors tracking-tight">{t.navHome}</a>
            <a href="#features" className="hover:text-white transition-colors tracking-tight">{t.navFeatures}</a>
            <a href="#how-it-works" className="hover:text-white transition-colors tracking-tight">{t.navHowItWorks}</a>
            <a href="#pricing" className="hover:text-white transition-colors tracking-tight">{t.navPricing}</a>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button 
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-slate-200 hover:bg-white/10 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'ES' : 'EN'}</span>
            </button>

            {/* Dark Mode toggle simulation */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 transition-colors hidden sm:block"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => navigate('/app')}
              className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/10 active:scale-95 transition-all flex items-center gap-1.5"
            >
              <span className="relative z-10">{t.navCTA}</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
              <div className="absolute inset-0 bg-white/15 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </nav>

      <main>
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content */}
          <div className="space-y-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider animate-pulse">
                <Sparkles className="w-3.5 h-3.5 text-blue-300 fill-blue-400/20" />
                {t.badgeText}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
                {t.heroTitle} <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">
                  {t.heroTitleGradient}
                </span>
              </h1>
              <p className="text-slate-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t.heroSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/app')}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold px-8 py-4.5 rounded-xl shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group transition-all active:scale-95 text-base"
              >
                {t.heroCTA1}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-cyan-200" />
              </button>
              <a 
                href="#how-it-works"
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-slate-200 font-extrabold px-8 py-4.5 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 text-base"
              >
                {t.heroCTA2}
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-semibold">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> {t.heroTagline}</span>
            </div>
          </div>

          {/* Hero Right: Real-time Live Interactive AI Simulator Dashboard */}
          <div className="relative w-full max-w-lg md:max-w-xl mx-auto h-[530px] rounded-3xl border border-white/10 bg-[#0c1226]/85 backdrop-blur-xl shadow-3xl shadow-blue-900/10 overflow-hidden flex flex-col select-none">
            
            {/* Browser Header Bar */}
            <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5 bg-[#090d1c]/80 shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ef4444]/60" />
                <div className="w-3 h-3 rounded-full bg-[#eab308]/60" />
                <div className="w-3 h-3 rounded-full bg-[#22c55e]/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-6 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] text-slate-400 font-mono flex items-center gap-1.5 tracking-tight w-48 justify-center">
                  <Lock className="w-2.5 h-2.5 text-blue-400" />
                  <span>app.docedigital.ai/dashboard</span>
                </div>
              </div>
              <div className="w-8 h-2.5" />
            </div>

            {/* Dashboard Content Container */}
            <div className="flex-1 p-5 space-y-5 overflow-hidden flex flex-col justify-between">
              
              {/* Row 1: Real-time Updating Stats */}
              <div className="grid grid-cols-3 gap-3 shrink-0">
                {[
                  { label: language === 'es' ? 'Alcance' : 'Reach', val: simStats.reach.toLocaleString(), trend: "+12.4%", desc: "Instagram API", color: "text-blue-400" },
                  { label: 'Engagement', val: `${simStats.engagement.toFixed(1)}%`, trend: "+5.1%", desc: "AI Powered", color: "text-indigo-400" },
                  { label: language === 'es' ? 'Seguidores' : 'Followers', val: simStats.followers.toLocaleString(), trend: "+8.9%", desc: "Crecimiento", color: "text-cyan-400" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white/3 border border-white/5 p-3 rounded-xl flex flex-col justify-between">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-0.5">{stat.label}</p>
                      <span className="text-base sm:text-lg font-black text-white">{stat.val}</span>
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[9px] text-[#A0A0B0] font-semibold">
                      <span className={stat.color}>{stat.desc}</span>
                      <span className="text-green-500 font-bold">{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2: Live Chat Simulator Card */}
              <div className="flex-1 min-h-[220px] bg-white/2 border border-white/5 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/5 shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                      <Instagram className="w-3.5 h-3.5 text-pink-400" />
                      Live Chat Simulator
                    </span>
                  </div>
                  
                  {/* Status Pills */}
                  <AnimatePresence mode="wait">
                    {simStatus === 'idle' && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-bold">
                        Esperando mensaje...
                      </motion.span>
                    )}
                    {simStatus === 'incoming' && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[9px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                        Mensaje entrante 📥
                      </motion.span>
                    )}
                    {simStatus === 'thinking' && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20 flex items-center gap-1">
                        <Bot className="w-3 h-3 text-indigo-400 animate-bounce" />
                        AI pensando...
                      </motion.span>
                    )}
                    {simStatus === 'responded' && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[9px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 font-bold border border-green-500/20 flex items-center gap-1">
                        Auto-respondido ✓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Threads */}
                <div className="flex-1 py-3 flex flex-col gap-3 justify-center">
                  <AnimatePresence>
                    {simMessages.map((msg, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-2 max-w-[85%] ${msg.sender === 'ai' ? 'self-end flex-row-reverse' : 'self-start'}`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-md ${msg.sender === 'ai' ? 'bg-indigo-600 text-white' : 'bg-pink-600 text-white'}`}>
                          {msg.sender === 'ai' ? <Bot className="w-4 h-4" /> : <Smile className="w-4 h-4" />}
                        </div>
                        <div className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold leading-relaxed shadow-sm ${msg.sender === 'ai' ? 'bg-indigo-600/90 text-white rounded-tr-none border border-indigo-500/20' : 'bg-white/5 text-slate-100 rounded-tl-none border border-white/5'}`}>
                          <p>{msg.text}</p>
                          <span className="text-[8px] text-slate-400 block text-right mt-1.5 font-bold uppercase">{msg.time}</span>
                        </div>
                      </motion.div>
                    ))}

                    {simStatus === 'thinking' && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 self-end flex-row-reverse max-w-[80%]">
                        <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
                          <Bot className="w-4 h-4 animate-spin" />
                        </div>
                        <div className="bg-indigo-600/20 rounded-xl rounded-tr-none px-4 py-3 border border-indigo-500/20 flex gap-1 items-center">
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                          <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                        </div>
                      </motion.div>
                    )}

                    {simMessages.length === 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-slate-500 text-xs py-4 flex flex-col items-center justify-center gap-2">
                        <MessageCircle className="w-8 h-8 text-slate-600" />
                        <p className="font-semibold italic">Esperando que un seguidor envíe un mensaje a tu cuenta de Instagram...</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Row 3: Automated Actions Queue */}
              <div className="bg-white/2 border border-white/5 p-3.5 rounded-2xl shrink-0 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{language === 'es' ? 'Próxima publicación automatizada' : 'Next scheduled post'}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{language === 'es' ? 'Reel de Instagram optimizado con IA' : 'AI optimized Instagram Reel'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/25">
                    {language === 'es' ? 'Programado' : 'Scheduled'}
                  </span>
                  <span className="text-[10px] text-slate-300 font-bold font-mono">18:00 PM</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Interactive Tabs Features Section ("Cómo Funciona") */}
      <section id="how-it-works" className="relative py-24 px-6 border-t border-white/5 bg-[#080d1e]/40">
        <div className="max-w-7xl mx-auto">
          
          {/* Title & Badge */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-widest">
              {language === 'es' ? 'Cómo Funciona' : 'How It Works'}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none">
              {language === 'es' ? 'Automatización y Métricas en' : 'Automation & Insights in'}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                {language === 'es' ? 'segundos' : 'seconds'}
              </span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-medium">
              {language === 'es' ? 'Una interfaz intuitiva que transforma tu gestión de redes sociales al instante.' : 'An intuitive interface that transforms your social media management instantly.'}
            </p>
          </div>

          {/* Interactive tabs layout */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-16 items-center">
            
            {/* Tabs List (Left Column) */}
            <div className="space-y-4">
              {[
                { 
                  id: 'inbox', 
                  title: language === 'es' ? '1. Inbox Inteligente con IA' : '1. AI Intelligent Inbox', 
                  desc: language === 'es' ? 'Responde mensajes directos al instante usando plantillas de IA y respuestas entrenadas con el tono de tu marca.' : 'Instantly reply to direct messages using AI models customized to fit your brand voice.',
                  color: 'border-blue-500/40 bg-blue-500/5 text-blue-400',
                  icon: MessageCircle
                },
                { 
                  id: 'scheduler', 
                  title: language === 'es' ? '2. Programador Visual Avanzado' : '2. Advanced Visual Scheduler', 
                  desc: language === 'es' ? 'Visualiza tu contenido mensual y programa posts, reels e historias en minutos con sugerencias de mejores horarios.' : 'Visualize your monthly content. Schedule posts, reels, and stories in minutes with perfect-timing recommendations.',
                  color: 'border-indigo-500/40 bg-indigo-500/5 text-indigo-400',
                  icon: Calendar
                },
                { 
                  id: 'analytics', 
                  title: language === 'es' ? '3. KPIs y Métricas Reales' : '3. Real KPIs & Analytics', 
                  desc: language === 'es' ? 'Reportes listos para exportar que analizan tu engagement, alcance total y crecimiento de seguidores en tiempo real.' : 'Exportable reports that analyze your engagement, total reach, and follower growth trends in real-time.',
                  color: 'border-cyan-500/40 bg-cyan-500/5 text-cyan-400',
                  icon: BarChart3
                },
                { 
                  id: 'copy', 
                  title: language === 'es' ? '4. Generador de Copys y Tags' : '4. AI Copy & Tag Generator', 
                  desc: language === 'es' ? 'Escribe captions persuasivos, hashtags en tendencia y copies optimizados según tu público objetivo.' : 'Draft high-converting captions, trending hashtags, and captions tailored directly to your target audience.',
                  color: 'border-purple-500/40 bg-purple-500/5 text-purple-400',
                  icon: Bot
                }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer hover:border-white/10 ${isActive ? tab.color + ' shadow-lg shadow-blue-500/2' : 'border-white/5 bg-transparent text-slate-400'}`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 ${isActive ? 'bg-white/10' : 'bg-white/5 text-slate-400'}`}>
                      <tab.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-extrabold text-sm sm:text-base text-white">{tab.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">{tab.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic tab contents (Right Column) */}
            <div className="relative w-full h-[450px] sm:h-[480px] bg-[#0c1226]/90 border border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col justify-between shadow-2xl shadow-blue-900/5">
              
              {/* Mock Window Controls */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  <span className="text-[10px] font-mono text-slate-400 tracking-wider">FEATURE PREVIEW</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                  <span className="text-[8px] font-bold">✓</span>
                </div>
              </div>

              {/* Tab Content Display Area */}
              <div className="flex-1 py-6 flex flex-col justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: INBOX */}
                  {activeTab === 'inbox' && (
                    <motion.div 
                      key="inbox" 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="bg-white/3 border border-white/5 rounded-xl p-3.5 max-w-[85%] self-start flex gap-2">
                        <div className="w-7.5 h-7.5 rounded-lg bg-pink-600 text-white flex items-center justify-center text-xs shrink-0 font-bold">C</div>
                        <div>
                          <p className="text-xs font-semibold text-white">¿Hacen envíos los fines de semana? Lo necesito urgente.</p>
                          <span className="text-[8px] text-pink-400 font-bold uppercase mt-1 block">Cliente Instagram</span>
                        </div>
                      </div>
                      
                      <div className="bg-blue-600/10 border border-blue-500/20 rounded-xl p-4 max-w-[90%] ml-auto flex gap-3">
                        <div className="w-7.5 h-7.5 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] px-2 py-0.5 rounded bg-blue-600 text-white font-bold tracking-wider">IA AUTOMATED</span>
                            <span className="text-[9px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 font-bold">Sentimiento Positivo</span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                            ¡Hola! Sí, realizamos entregas prioritarias los fines de semana si compras antes de las 11:00 AM. Tu pedido llegará el mismo día. ⚡
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: SCHEDULER */}
                  {activeTab === 'scheduler' && (
                    <motion.div 
                      key="scheduler" 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-300 font-bold border-b border-white/5 pb-2">
                        <span>Calendario Semanal</span>
                        <span className="text-indigo-400">Mayo 2026</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { day: 'Lun 20', task: 'Instagram Reel', active: true, time: '10:00 AM', status: 'Publicado' },
                          { day: 'Mar 21', task: 'Carousel Tip', active: false, time: '15:00 PM', status: 'Borrador' },
                          { day: 'Mié 22', task: 'Reel Trend', active: true, time: '18:00 PM', status: 'Programado' },
                          { day: 'Jue 23', task: 'IG Story Q&A', active: true, time: '09:00 AM', status: 'Programado' }
                        ].map((item, idx) => (
                          <div key={idx} className={`p-3 rounded-xl border ${item.active ? 'bg-indigo-600/10 border-indigo-500/25' : 'bg-white/2 border-white/5 opacity-55'}`}>
                            <span className="text-[10px] text-slate-400 font-bold font-mono block mb-1">{item.day}</span>
                            <p className="text-xs font-bold text-white tracking-tight">{item.task}</p>
                            <p className="text-[9px] text-slate-400 mt-2 font-mono">{item.time}</p>
                            <span className={`inline-block text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded mt-1.5 ${item.status === 'Publicado' ? 'bg-green-500/10 text-green-400' : item.status === 'Borrador' ? 'bg-amber-500/10 text-amber-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                              {item.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: ANALYTICS */}
                  {activeTab === 'analytics' && (
                    <motion.div 
                      key="analytics" 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">Desempeño de Engagement</span>
                        <div className="flex gap-2">
                          <span className="text-[10px] text-green-500 font-bold flex items-center gap-0.5"><TrendingUp className="w-3.5 h-3.5" /> +24%</span>
                        </div>
                      </div>
                      
                      {/* Interactive Visual SVG Chart */}
                      <div className="h-36 w-full bg-white/2 border border-white/5 rounded-xl p-3 flex items-end relative">
                        <svg className="w-full h-full" viewBox="0 0 400 120">
                          <defs>
                            <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          {/* Grid lines */}
                          <line x1="0" y1="30" x2="400" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          <line x1="0" y1="70" x2="400" y2="70" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                          {/* Smooth filled area */}
                          <path d="M 0 120 L 0 90 Q 50 40 100 80 T 200 40 T 300 70 T 400 20 L 400 120 Z" fill="url(#chartGlow)" />
                          {/* Line curve */}
                          <path d="M 0 90 Q 50 40 100 80 T 200 40 T 300 70 T 400 20" fill="none" stroke="#06b6d4" strokeWidth="2.5" />
                        </svg>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/3 p-2.5 rounded-xl text-center border border-white/5">
                          <span className="text-[9px] text-slate-400 font-bold uppercase">Visitas del Perfil</span>
                          <p className="text-sm font-black text-white">45,200</p>
                        </div>
                        <div className="bg-white/3 p-2.5 rounded-xl text-center border border-white/5">
                          <span className="text-[9px] text-slate-400 font-bold uppercase">Clicks en Botón</span>
                          <p className="text-sm font-black text-white">1,820</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: COPYWRITING */}
                  {activeTab === 'copy' && (
                    <motion.div 
                      key="copy" 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1 border-b border-white/5 pb-2 shrink-0">
                        <span className="text-[9px] text-purple-400 uppercase font-bold tracking-widest block">AI Copilot</span>
                        <p className="text-xs font-bold text-white">Generar sugerencia de copia persuasiva</p>
                      </div>
                      
                      <div className="bg-white/2 border border-white/5 rounded-xl p-3.5 text-xs text-slate-300 italic font-semibold leading-relaxed">
                        "¿Buscando llevar tu marketing a otro nivel? 🚀 Te traemos la guía definitiva de IA aplicada a tus redes. Síguenos y descubre cómo automatizar tu negocio sin fricción. 🔥 #DoceDigital #GrowthMarketing #AI"
                      </div>

                      <button className="w-full py-2.5 bg-purple-600 rounded-xl text-xs font-extrabold hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/20 text-white flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-purple-200" />
                        Copiar al Portapapeles
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Tagline bottom */}
              <div className="bg-blue-500/5 rounded-xl px-4 py-3 border border-blue-500/10 text-center shrink-0">
                <span className="text-[10px] text-blue-300 font-semibold leading-relaxed block">
                  💡 {language === 'es' ? 'Estas interfaces reflejan el flujo real del backend de la aplicación.' : 'These mockups reflect the actual visual flow of the main application backend.'}
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Integration Blueprint Section ("How It Connects") */}
      <section className="relative py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              {language === 'es' ? 'Conectividad Segura' : 'Secure Connection'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'es' ? 'Conexión Directa en 2 Pasos' : 'Direct 2-Step Connection'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-semibold">
              {language === 'es' ? 'Nos vinculamos mediante APIs y protocolos oficiales de Facebook e Instagram para proteger tu cuenta al 100%.' : 'We link through official Facebook & Instagram APIs and protocols to protect your accounts 100%.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center relative">
            
            {/* Step 1: Account Connection */}
            <div className="bg-white/2 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center shadow-lg shadow-pink-500/5">
                <Instagram className="w-7 h-7 text-pink-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm sm:text-base text-white">{language === 'es' ? '1. Vincula tu Cuenta' : '1. Connect Account'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {language === 'es' ? 'Inicia sesión con tu Facebook Business y otorga permisos de lectura y mensajería.' : 'Sign in using Facebook Business and authorize reading/messaging access scopes.'}
                </p>
              </div>
            </div>

            {/* Step 2: Glowing secure pipeline (Center Connector) */}
            <div className="bg-white/2 border border-white/5 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 relative border-dashed">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/5">
                <Plug className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm sm:text-base text-white">{language === 'es' ? '2. Handshake Exitoso' : '2. Secure Handshake'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {language === 'es' ? 'Nuestros servidores validan la conexión cifrada a través de HTTPS.' : 'Our secure backend validates the encrypted connection handshake via HTTPS.'}
                </p>
              </div>
            </div>

            {/* Step 3: Success Integration */}
            <div className="bg-[#09152b] border border-blue-500/20 p-6 rounded-2xl flex flex-col items-center text-center space-y-4 shadow-xl shadow-blue-950/20">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/5">
                <Sparkles className="w-7 h-7 text-blue-400 fill-blue-400/20" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm sm:text-base text-white">{language === 'es' ? '¡Listo para Escalar!' : 'Ready to Grow!'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {language === 'es' ? 'La IA comienza a monitorizar tus mensajes y actualizar métricas de inmediato.' : 'Our AI instantly starts monitoring your messages and updating your analytics.'}
                </p>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center">
            <span className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-white/3 border border-white/5 text-xs text-slate-300 font-semibold leading-relaxed">
              <Shield className="w-4.5 h-4.5 text-blue-400" />
              {language === 'es' ? 'La conexión es de solo-lectura para configuraciones críticas y no se almacena tu contraseña personal.' : 'Connection scopes are read-only for security, and your personal passwords are never stored.'}
            </span>
          </div>

        </div>
      </section>

      {/* Trust & Architecture Center (Best Practices Compliant) */}
      <section className="relative py-24 px-6 border-t border-white/5 bg-[#080d1e]/30">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
              {language === 'es' ? 'Gobernanza & Cumplimiento' : 'Governance & Compliance'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {t.trustCenterTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-semibold">
              {t.trustCenterSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Append-Only Audit Log */}
            <div className="bg-white/2 border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-blue-500/30 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-white">{language === 'es' ? 'Logs Inmutables' : 'Immutable Audit Logs'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {language === 'es' ? 'Historial cronológico de acciones inalterable para auditorías y control legal.' : 'Chronological, append-only historical trace of all system actions for absolute legal audits.'}
                </p>
              </div>
              <span className="text-[9px] text-[#A0A0B0] font-mono font-bold tracking-widest uppercase">Compliance Ready</span>
            </div>

            {/* Card 2: Principle of Least Privilege */}
            <div className="bg-white/2 border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-indigo-500/30 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                  <KeyRound className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-white">{language === 'es' ? 'Mínimo Privilegio' : 'Least Privilege (RBAC)'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {language === 'es' ? 'Políticas de acceso restrictivas (Analistas no modifican integraciones ni claves).' : 'Restrictive access permissions. Analysts cannot modify integrations, credentials, or billing.'}
                </p>
              </div>
              <span className="text-[9px] text-[#A0A0B0] font-mono font-bold tracking-widest uppercase">Granular Access</span>
            </div>

            {/* Card 3: PII Sanitization */}
            <div className="bg-white/2 border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-cyan-500/30 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-white">{language === 'es' ? 'Sanitización PII' : 'PII Sanitization'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {language === 'es' ? 'Ofuscación de datos personales sensibles antes de procesarse en APIs de IA externas.' : 'Masking and filtering of sensitive personal information before external LLM integrations process it.'}
                </p>
              </div>
              <span className="text-[9px] text-[#A0A0B0] font-mono font-bold tracking-widest uppercase">Data Privacy</span>
            </div>

            {/* Card 4: Fail-Open Architecture */}
            <div className="bg-white/2 border border-white/5 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-purple-500/30 transition-colors">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-white">{language === 'es' ? 'Resiliencia (Fail-Open)' : 'Fail-Open Resilience'}</h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                  {language === 'es' ? 'Si el proveedor de IA cae, el CRM se mantiene activo con alertas en cola para soporte.' : 'If the AI provider encounters timeouts, the CRM continues functioning with queued support tickets.'}
                </p>
              </div>
              <span className="text-[9px] text-[#A0A0B0] font-mono font-bold tracking-widest uppercase">High Availability</span>
            </div>

          </div>

        </div>
      </section>

      {/* Pricing Section (Stunning Tier Cards) */}
      <section id="pricing" className="relative py-24 px-6 border-t border-white/5 bg-[#080d1e]/20">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              {language === 'es' ? 'Planes Flexibles' : 'Flexible Plans'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'es' ? 'Invierte en tu Crecimiento' : 'Invest in Your Growth'}
            </h2>
            
            {/* Toggle Monthly / Yearly */}
            <div className="flex items-center justify-center gap-3.5 mt-6">
              <span className={`text-xs font-bold ${!isYearly ? 'text-white' : 'text-slate-500'}`}>
                {language === 'es' ? 'Mensual' : 'Monthly'}
              </span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                aria-label="Toggle monthly or annual billing"
                className="w-10.5 h-6 rounded-full bg-white/10 border border-white/10 p-0.5 relative transition-colors duration-300 flex items-center cursor-pointer"
              >
                <div className={`w-4.5 h-4.5 rounded-full bg-blue-500 shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-4.5' : 'translate-x-0'}`} />
              </button>
              <span className={`text-xs font-bold flex items-center gap-1.5 ${isYearly ? 'text-white' : 'text-slate-500'}`}>
                {language === 'es' ? 'Anual' : 'Yearly'}
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500 text-white font-extrabold uppercase tracking-wide">
                  {language === 'es' ? 'Ahorra 20%' : 'Save 20%'}
                </span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Plan 1: Starter */}
            <div className="bg-white/2 border border-white/5 p-8 rounded-3xl flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{language === 'es' ? 'Inicial' : 'Starter'}</span>
                  <h3 className="text-2xl font-black text-white mt-1">Social Starter</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">${isYearly ? '19' : '24'}</span>
                  <span className="text-xs text-[#A0A0B0] font-semibold">USD / {language === 'es' ? 'mes' : 'mo'}</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  {language === 'es' ? 'Perfecto para creadores de contenido individuales y pequeñas marcas.' : 'Perfect for individual creators and starting brands.'}
                </p>
                
                <div className="h-px bg-white/5" />
                
                <ul className="space-y-2.5 text-xs text-slate-300 font-semibold">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 1 {language === 'es' ? 'Cuenta de Instagram Business' : 'Instagram Business Account'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 100 {language === 'es' ? 'Respuestas Automatizadas/mes' : 'AI Automated Replies/mo'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {language === 'es' ? 'Programador de Posts Básicos' : 'Basic Post Scheduling'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 30 {language === 'es' ? 'días de Retención de Historial' : 'days History Retention'}</li>
                </ul>
              </div>

              <button 
                onClick={() => navigate('/app')}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-extrabold text-xs transition-colors"
              >
                {language === 'es' ? 'Empezar Plan Starter' : 'Start Starter Plan'}
              </button>
            </div>

            {/* Plan 2: Pro (Featured) */}
            <div className="bg-[#091024] border-2 border-blue-500/40 p-8 rounded-3xl flex flex-col justify-between space-y-8 relative shadow-2xl shadow-blue-950/20 scale-102">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {language === 'es' ? 'Recomendado' : 'Recommended'}
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-blue-400 font-bold uppercase tracking-widest">Professional</span>
                  <h3 className="text-2xl font-black text-white mt-1">Social Pro</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">${isYearly ? '39' : '49'}</span>
                  <span className="text-xs text-[#A0A0B0] font-semibold">USD / {language === 'es' ? 'mes' : 'mo'}</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  {language === 'es' ? 'Para agencias de marketing y marcas corporativas en pleno crecimiento.' : 'For digital agencies and growing corporate brands.'}
                </p>
                
                <div className="h-px bg-white/5" />
                
                <ul className="space-y-2.5 text-xs text-slate-300 font-semibold">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 3 {language === 'es' ? 'Cuentas de Instagram' : 'Instagram Accounts'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> 1,500 {language === 'es' ? 'Respuestas Automatizadas/mes' : 'AI Automated Replies/mo'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {language === 'es' ? 'Planificador Visual Pro (Arrastrar y Soltar)' : 'Visual Pro Drag-Drop Scheduler'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {language === 'es' ? 'Generador de Copys y Sugerencias de Horarios' : 'AI Copywriter & Optimal Times Suggestions'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {language === 'es' ? 'Analytics Avanzado con exportación de PDFs' : 'Advanced Analytics with PDF Exports'}</li>
                </ul>
              </div>

              <button 
                onClick={() => navigate('/app')}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 font-extrabold text-xs transition-all shadow-md shadow-blue-500/10 active:scale-95"
              >
                {language === 'es' ? 'Obtener Social Pro' : 'Get Social Pro'}
              </button>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="bg-white/2 border border-white/5 p-8 rounded-3xl flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Enterprise</span>
                  <h3 className="text-2xl font-black text-white mt-1">Social Custom</h3>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">Custom</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  {language === 'es' ? 'Volúmenes ilimitados y soporte prioritario para grandes multinacionales.' : 'Unlimited volumes and priority support for large corporations.'}
                </p>
                
                <div className="h-px bg-white/5" />
                
                <ul className="space-y-2.5 text-xs text-slate-300 font-semibold">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {language === 'es' ? 'Cuentas Ilimitadas' : 'Unlimited Accounts'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {language === 'es' ? 'Respuestas y Transacciones de IA Ilimitadas' : 'Unlimited AI Conversations & Actions'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {language === 'es' ? 'SLA y Disponibilidad del 99.9%' : '99.9% High Availability & Custom SLA'}</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> {language === 'es' ? 'Gerente de Cuenta Dedicado' : 'Dedicated Account Success Manager'}</li>
                </ul>
              </div>

              <button 
                onClick={() => navigate('/app')}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-extrabold text-xs transition-colors"
              >
                {language === 'es' ? 'Contactar Ventas' : 'Contact Sales'}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Final Action CTA Block (Stunning design) */}
      <section className="py-24 px-6 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-purple-900/10 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[160px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8 bg-[#0c1226]/50 border border-white/5 p-8 sm:p-14 rounded-[2.5rem] backdrop-blur-md shadow-2xl shadow-blue-950/10">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              {language === 'es' ? '¿Listo para dominar tu presencia digital?' : 'Ready to dominate your social media scope?'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
              {language === 'es' ? 'Únete a cientos de marcas y automatiza tu Inbox de Instagram hoy mismo mediante Inteligencia Artificial.' : 'Join hundreds of brands automating their Instagram Inbox today using Artificial Intelligence.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/app')}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold px-10 py-4.5 rounded-xl shadow-2xl shadow-blue-500/20 active:scale-95 transition-all text-base"
            >
              {language === 'es' ? 'EMPEZAR AHORA GRATIS' : 'START NOW FOR FREE'}
            </button>
          </div>
        </div>
      </section>
      </main>

      {/* Modern Footer */}
      <footer className="py-16 px-6 border-t border-white/5 bg-[#050812]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <DoceLogo className="h-6 w-auto text-white" />
            </div>
            <p className="text-xs text-[#A0A0B0] leading-relaxed max-w-sm font-semibold">
              {language === 'es' ? 'Nuestra misión es democratizar el poder de la Inteligencia Artificial conversacional para automatizar y hacer crecer tu negocio orgánicamente.' : 'Democratizing the power of conversational Artificial Intelligence to automate and scale your business organic growth.'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{language === 'es' ? 'Producto' : 'Product'}</h4>
            <ul className="space-y-2 text-xs text-[#A0A0B0] font-semibold">
              <li><a href="#features" className="hover:text-slate-300 transition-colors">{language === 'es' ? 'Funcionalidades' : 'Features'}</a></li>
              <li><a href="#pricing" className="hover:text-slate-300 transition-colors">{language === 'es' ? 'Precios' : 'Pricing'}</a></li>
              <li><a href="#how-it-works" className="hover:text-slate-300 transition-colors">{language === 'es' ? 'Cómo Funciona' : 'How It Works'}</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{language === 'es' ? 'Soporte' : 'Support'}</h4>
            <ul className="space-y-2 text-xs text-[#A0A0B0] font-semibold">
              <li><a href="#" className="hover:text-slate-300 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">API References</a></li>
              <li><a href="#" className="hover:text-slate-300 transition-colors">Status Page</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#A0A0B0] font-semibold">
          <p>© 2026 Doce Digital Management Platform v2. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookies Settings</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
