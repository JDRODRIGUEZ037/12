import { useState } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { 
  Search, FileText, Image as ImageIcon,
  Instagram, Facebook, Twitter, Linkedin, Edit, Calendar, Trash2
} from "lucide-react";
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function Drafts() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [drafts, setDrafts] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("saved_drafts") || "[]");
    } catch (e) {
      return [];
    }
  });

  const handleDeleteDraft = (id: number) => {
    const updated = drafts.filter(draft => draft.id !== id);
    setDrafts(updated);
    localStorage.setItem("saved_drafts", JSON.stringify(updated));
    toast.success("Borrador eliminado exitosamente");
  };

  const handleEditDraft = (draft: any) => {
    localStorage.setItem("current_post_draft", JSON.stringify({
      selectedPlatforms: draft.selectedPlatforms,
      content: draft.content,
      scheduleDate: draft.scheduleDate,
      scheduleTime: draft.scheduleTime,
      imagePrompt: draft.imagePrompt,
      copyPrompt: draft.copyPrompt,
      aiTone: draft.aiTone,
      uploadedImage: draft.uploadedImage,
      publicImageUrl: draft.publicImageUrl
    }));
    navigate("/app/create");
  };

  const handleScheduleDraft = (draft: any) => {
    localStorage.setItem("current_post_draft", JSON.stringify({
      selectedPlatforms: draft.selectedPlatforms,
      content: draft.content,
      scheduleDate: draft.scheduleDate || new Date().toISOString().split('T')[0],
      scheduleTime: draft.scheduleTime || "12:00",
      imagePrompt: draft.imagePrompt,
      copyPrompt: draft.copyPrompt,
      aiTone: draft.aiTone,
      uploadedImage: draft.uploadedImage,
      publicImageUrl: draft.publicImageUrl
    }));
    navigate("/app/create");
  };

  const filteredDrafts = drafts.filter(draft => {
    const textToSearch = `${draft.content || ""} ${draft.imagePrompt || ""} ${draft.copyPrompt || ""}`.toLowerCase();
    return textToSearch.includes(searchQuery.toLowerCase());
  });

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
              <span className="text-base font-bold text-gray-900 mt-1 leading-none">{drafts.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredDrafts.length === 0 && (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-gray-100 rounded-2xl shadow-xs max-w-lg mx-auto mt-12">
          <FileText className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No hay borradores</h3>
          <p className="text-gray-500 mb-6 max-w-sm">
            {searchQuery 
              ? "No se encontraron borradores que coincidan con tu búsqueda."
              : "Comienza a crear contenido y guárdalo como borrador para terminarlo o programarlo después."}
          </p>
          {!searchQuery && (
            <Button 
              onClick={() => navigate("/app/create")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer"
            >
              Crear un Post Nuevo
            </Button>
          )}
        </div>
      )}

      {/* Grid */}
      {filteredDrafts.length > 0 && (
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 1024: 3}}>
          <Masonry gutter="1.5rem">
            {filteredDrafts.map((draft) => {
              const hasImage = !!draft.uploadedImage || !!draft.publicImageUrl;
              const textPreview = draft.content || draft.copyPrompt || draft.imagePrompt || "Borrador sin contenido redactado...";
              const title = draft.copyPrompt ? `Tema: ${draft.copyPrompt}` : (draft.imagePrompt ? `Imagen: ${draft.imagePrompt}` : "Borrador de Post");
              const wordsCount = draft.content ? draft.content.split(/\s+/).filter(Boolean).length : 0;
              const timeFormatted = draft.createdAt 
                ? new Date(draft.createdAt).toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'short', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })
                : "Hace un momento";

              return (
                <Card key={draft.id} className="p-6 border-gray-200 shadow-sm rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow bg-white">
                  
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-gray-900 text-base leading-tight pr-4 truncate max-w-[80%]" title={title}>
                      {title}
                    </h3>
                    <button 
                      onClick={() => handleDeleteDraft(draft.id)} 
                      className="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 cursor-pointer flex-shrink-0"
                      title="Eliminar borrador"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-4 min-h-[80px]">
                    {textPreview}
                  </p>

                  {hasImage && (
                    <div className="rounded-xl h-44 overflow-hidden mb-6 border border-gray-100 shadow-3xs relative group">
                      <img 
                        src={draft.uploadedImage || draft.publicImageUrl} 
                        alt="Draft Preview" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold p-1 px-2 rounded-md flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5" /> Imagen IA
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {draft.selectedPlatforms?.map((platform: string) => renderPlatformBadge(platform)) || renderPlatformBadge("instagram")}
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold mb-4 border-t border-gray-50 pt-4">
                      <span>{wordsCount} palabras</span>
                      <span>{timeFormatted}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        onClick={() => handleEditDraft(draft)}
                        variant="outline" 
                        className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg h-9 hover:bg-gray-50 text-gray-800 font-semibold shadow-xs text-xs cursor-pointer"
                      >
                        <Edit className="w-3.5 h-3.5" /> Editar
                      </Button>
                      <Button 
                        onClick={() => handleScheduleDraft(draft)}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg h-9 font-semibold shadow-xs text-xs cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5 text-white" /> Programar
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </div>
  );
}
