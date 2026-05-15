import React from 'react';
import { motion } from 'framer-motion';
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
  MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router';

const LandingPage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/10 bg-[#0F172A]/70">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Share2 className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">Social<span className="text-blue-400">Hub</span> v2</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-white transition-colors">Nosotros</a>
            <a href="#services" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#team" className="hover:text-white transition-colors">Equipo</a>
            <button 
              onClick={() => navigate('/app')}
              className="bg-white/5 hover:bg-white/10 text-white px-5 py-2.5 rounded-full border border-white/10 transition-all active:scale-95"
            >
              Acceder al App
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/10 blur-[120px] rounded-full" />
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <Zap className="w-3 h-3" />
            EL HUB DEFINITIVO PARA TUS REDES SOCIALES
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold mb-8 leading-[1.1] tracking-tight">
            Domina tus Redes Sociales <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              con Inteligencia Artificial
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            Programa contenido, gestiona mensajes y analiza tus métricas de Instagram en tiempo real desde una plataforma unificada y potenciada por IA.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate('/app')}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-8 py-4 rounded-xl font-bold shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 group transition-all active:scale-95"
            >
              Pruébalo ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold border border-white/10 transition-all">
              Ver Video Tutorial
            </button>
          </motion.div>
        </motion.div>

        {/* Mockup Preview (Dashboard Realista) */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-6xl mx-auto mt-24 relative"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#1E293B] shadow-2xl shadow-black/50">
            <div className="bg-[#1E293B] border-b border-white/5 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="mx-auto bg-white/5 rounded-md px-12 py-1 text-[10px] text-gray-500 font-mono italic">
                app.socialhub.v2/analytics
              </div>
            </div>
            
            <div className="p-8 grid grid-cols-12 gap-6 bg-gradient-to-br from-[#1E293B] to-[#0F172A]">
              <div className="col-span-12 md:col-span-8 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Engagement', value: '4.8%', icon: Zap, color: 'text-yellow-400' },
                    { label: 'Seguidores', value: '+12.4k', icon: Users, color: 'text-blue-400' },
                    { label: 'Alcance', value: '85k', icon: BarChart3, color: 'text-cyan-400' }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 p-4 rounded-xl">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">{stat.label}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold">{stat.value}</span>
                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="h-64 rounded-xl bg-white/5 border border-white/5 p-6 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="font-semibold text-sm">Calendario de Publicaciones</h4>
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  {/* Fake Chart/Grid */}
                  <div className="grid grid-cols-7 gap-2 h-40">
                    {Array.from({ length: 14 }).map((_, i) => (
                      <div key={i} className={`rounded-lg border border-white/5 flex items-center justify-center ${i % 3 === 0 ? 'bg-blue-600/20 border-blue-600/40' : 'bg-white/2'}`}>
                        {i % 3 === 0 && <Instagram className="w-3 h-3 text-blue-400" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 space-y-6">
                <div className="h-full rounded-xl bg-blue-600/10 border border-blue-500/20 p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                    <Bot className="w-5 h-5 text-blue-400" />
                    Generador de Contenido
                  </h4>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-[#0F172A] border border-white/5 text-[11px] text-gray-400">
                      <p className="mb-2">Sugerencia de Pie de Foto:</p>
                      "¡Potencia tu marca con SocialHub! 🚀 La herramienta definitiva para dominar Instagram. #SocialMedia #Growth"
                    </div>
                    <button className="w-full py-2 bg-blue-600 rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                      Copiar al Portapapeles
                    </button>
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-[10px] text-gray-500 uppercase font-bold mb-3 tracking-widest">IA Insight</p>
                      <div className="flex items-center gap-2 text-[11px] text-blue-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Mejor hora para publicar: 6:00 PM
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 blur-2xl -z-10 rounded-3xl" />
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Potencia tu Presencia Digital</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Todo lo que necesitas para escalar tu marca personal o corporativa en un solo lugar.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, title: "Programador Pro", desc: "Planifica y programa tus publicaciones de toda la semana en minutos." },
              { icon: MessageCircle, title: "Inbox Unificado", desc: "Responde todos tus mensajes directos de Instagram sin cambiar de pestaña." },
              { icon: BarChart3, title: "Métricas Reales", desc: "Entiende qué contenido funciona mejor con reportes detallados." },
              { icon: Bot, title: "Asistente AI", desc: "Genera captions, hashtags y sugerencias de contenido basadas en tendencias." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestra Visión</h2>
            <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
              <p>
                Creemos que la gestión de redes sociales no debería ser una tarea abrumadora. SocialHub nació para simplificar la vida de creadores y agencias.
              </p>
              <p>
                Combinamos herramientas robustas de programación con el poder de la Inteligencia Artificial para que puedas enfocarte en crear, no en administrar.
              </p>
              <div className="flex flex-col gap-3 pt-4">
                {['Interfaz Intuitiva', 'Ahorro de Tiempo', 'Crecimiento Orgánico'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                    <span className="text-white text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-blue-600/30 to-cyan-500/30 border border-white/10 flex items-center justify-center overflow-hidden">
              <div className="p-12 text-center">
                <Share2 className="w-32 h-32 text-blue-400 mx-auto mb-6 animate-pulse" />
                <h4 className="text-2xl font-bold mb-2">Social Hub v2</h4>
                <p className="text-sm text-gray-400">Escalabilidad y simplicidad garantizada.</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-cyan-600/20 blur-3xl rounded-full" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 px-6 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Nuestro Equipo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Juan Rodríguez", role: "Product Strategy & AI", color: "from-blue-500 to-indigo-500", image: "https://img.bracedevelopers.com/photos/juanda.png" },
              { name: "SocialHub Devs", role: "Fullstack Development", color: "from-cyan-500 to-blue-500", image: null },
              { name: "Content Specialists", role: "Marketing & Growth", color: "from-blue-400 to-cyan-400", image: null }
            ].map((member, i) => (
              <div key={i} className="group cursor-pointer">
                <div className={`w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br ${member.color} p-[2px] transition-transform group-hover:scale-110 shadow-lg shadow-blue-500/10`}>
                  <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center overflow-hidden">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-12 h-12 text-gray-300" />
                    )}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{member.name}</h4>
                <p className="text-gray-500 text-sm font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 border-t border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">¿Listo para llevar tus redes al siguiente nivel?</h2>
          <button 
            onClick={() => navigate('/app')}
            className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/30 active:scale-95"
          >
            EMPEZAR AHORA
          </button>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 -z-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/40 via-transparent to-transparent" />
      </section>

      <footer className="py-12 px-6 text-center text-gray-600 text-xs border-t border-white/5">
        <p>© 2026 SocialHub Management Platform v2. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
