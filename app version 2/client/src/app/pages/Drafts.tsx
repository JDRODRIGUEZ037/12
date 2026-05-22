import React from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { 
  Search, FileText, MoreVertical, Image as ImageIcon,
  Instagram, Facebook, Twitter, Linkedin, Edit, Calendar
} from "lucide-react";

export function Drafts() {
  const drafts = [
    {
      id: 1,
      title: "Promoción de verano 2026",
      text: "😎 ¡Grandes descuentos este verano! Aprovecha hasta 50% de descuento en...",
      hasImage: true,
      platforms: ["instagram", "facebook"],
      words: 145,
      time: "Hace 2 horas"
    },
    {
      id: 2,
      title: "Tips de productividad",
      text: "💡 5 consejos para ser más productivo: 1. Planifica tu día 2. Elimina distracciones...",
      hasImage: false,
      platforms: ["twitter", "linkedin"],
      words: 89,
      time: "Hace 1 día"
    },
    {
      id: 3,
      title: "Nuevo producto lanzamiento",
      text: "🎉 Presentamos nuestro nuevo producto revolucionario que cambiará la forma...",
      hasImage: true,
      platforms: ["instagram", "twitter", "facebook", "linkedin"],
      words: 234,
      time: "Hace 3 días"
    },
    {
      id: 4,
      title: "Testimonio de cliente",
      text: "⭐ Mira lo que nuestros clientes dicen sobre nosotros. 'Excelente servicio...",
      hasImage: true,
      platforms: ["facebook", "linkedin"],
      words: 112,
      time: "Hace 1 semana"
    }
  ];

  const renderPlatformBadge = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <span key={platform} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-pink-50 text-pink-600 border border-pink-100">
            <Instagram className="w-3.5 h-3.5" /> Instagram
          </span>
        );
      case 'facebook':
        return (
          <span key={platform} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-100">
            <Facebook className="w-3.5 h-3.5" /> Facebook
          </span>
        );
      case 'twitter':
        return (
          <span key={platform} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-50 text-sky-600 border border-sky-100">
            <Twitter className="w-3.5 h-3.5" /> Twitter
          </span>
        );
      case 'linkedin':
        return (
          <span key={platform} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
          </span>
        );
      default: return null;
    }
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Borradores</h1>
        <p className="text-gray-600">Tus posts guardados que aún no han sido programados</p>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 w-full">
        <div className="flex-1 w-full max-w-xl md:max-w-2xl">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <Input 
              placeholder="Buscar en borradores..." 
              className="pl-12 py-6 bg-gray-50 border-gray-200 text-base rounded-xl w-full"
            />
          </div>
        </div>
        
        <div className="flex-shrink-0 w-full md:w-auto flex justify-end">
          <div className="flex flex-row items-center gap-3 p-2 px-3.5 rounded-xl border border-gray-200 bg-white shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4.5 h-4.5 text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider leading-none">Total Borradores</span>
              <span className="text-base font-bold text-gray-900 mt-1 leading-none">4</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 1024: 3}}>
        <Masonry gutter="1.5rem">
          {drafts.map((draft) => (
            <Card key={draft.id} className="p-6 border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col">
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight pr-4">{draft.title}</h3>
                <button className="text-gray-400 hover:text-gray-600 transition-colors mt-0.5">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-700 text-[15px] mb-5 leading-relaxed">
                {draft.text}
              </p>

              {draft.hasImage && (
                <div className="bg-purple-50 rounded-xl h-44 flex items-center justify-center mb-6 border border-purple-100 border-dashed">
                  <ImageIcon className="w-8 h-8 text-purple-300" />
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {draft.platforms.map(platform => renderPlatformBadge(platform))}
              </div>

              <div className="mt-auto">
                <div className="flex items-center justify-between text-[13px] text-gray-500 font-medium mb-6">
                  <span>{draft.words} palabras</span>
                  <span>{draft.time}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg h-10 hover:bg-gray-50 text-gray-800 font-semibold shadow-sm">
                    <Edit className="w-4 h-4" /> Editar
                  </Button>
                  <Button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-10 font-semibold shadow-sm">
                    <Calendar className="w-4 h-4 text-white" /> Programar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}
