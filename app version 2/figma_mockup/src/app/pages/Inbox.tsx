import React, { useState } from 'react';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { 
  MessageSquare, AtSign, Mail, Star, Archive, Trash2, Send, Heart, 
  Instagram, Twitter 
} from "lucide-react";

export function Inbox() {
  const [activeTab, setActiveTab] = useState('todos');

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bandeja de Entrada</h1>
          <p className="text-gray-600">Gestiona todos tus mensajes y comentarios en un solo lugar</p>
        </div>
        <div className="bg-blue-100 text-blue-600 font-medium px-4 py-1.5 rounded-lg text-sm flex items-center h-fit">
          2 sin leer
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6 h-[calc(100vh-160px)] min-h-[600px]">
        {/* Left Sidebar - Message List */}
        <Card className="w-[400px] flex flex-col bg-white overflow-hidden flex-shrink-0 shadow-sm border-gray-200">
          
          {/* Tabs */}
          <div className="p-4 pt-5 pb-3 border-b border-gray-100">
            <div className="flex bg-gray-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('todos')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'todos' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveTab('comments')}
                className={`flex-1 py-1.5 px-3 rounded-lg flex justify-center items-center transition-all ${activeTab === 'comments' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab('mentions')}
                className={`flex-1 py-1.5 px-3 rounded-lg flex justify-center items-center transition-all ${activeTab === 'mentions' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <AtSign className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab('dms')}
                className={`flex-1 py-1.5 px-3 rounded-lg flex justify-center items-center transition-all ${activeTab === 'dms' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            
            {/* Item 1 - Active, Unread */}
            <div className="p-4 rounded-xl border-2 border-blue-200 bg-blue-50/50 cursor-pointer shadow-sm pointer-events-none relative">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  MG
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span className="font-semibold text-gray-900 text-sm truncate">María González</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  </div>
                  <p className="text-gray-800 text-[13px] mb-2 line-clamp-2 leading-relaxed">
                    ¡Me encanta este producto! ¿Dónde puedo comprarlo?
                  </p>
                  <div className="text-xs text-gray-500 font-medium">Hace 5 min</div>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  CR
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Twitter className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-semibold text-gray-900 text-sm truncate">Carlos Rodríguez</span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  </div>
                  <p className="text-gray-600 text-[13px] mb-2 line-clamp-2 leading-relaxed">
                    @mi_empresa Excelente servicio al cliente, muy recomendado 👏
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 font-medium">Hace 15 min</div>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-400 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  AM
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span className="font-semibold text-gray-900 text-sm truncate">Ana Martínez</span>
                  </div>
                  <p className="text-gray-600 text-[13px] mb-2 line-clamp-2 leading-relaxed">
                    Hola, quisiera información sobre sus horarios de atención.
                  </p>
                  <div className="text-xs text-gray-400 font-medium">Hace 1 hora</div>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  LH
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span className="font-semibold text-gray-900 text-sm truncate">Luis Hernández</span>
                  </div>
                  <p className="text-gray-600 text-[13px] mb-2 line-clamp-2 leading-relaxed">
                    Interesante artículo, me gustaría saber más sobre este tema.
                  </p>
                  <div className="text-xs text-gray-400 font-medium">Hace 2 horas</div>
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="p-4 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 cursor-pointer transition-colors shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-300 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  PS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span className="font-semibold text-gray-900 text-sm truncate">Patricia Silva</span>
                  </div>
                  <p className="text-gray-600 text-[13px] mb-2 line-clamp-2 leading-relaxed">
                    ¿Tienen envíos internacionales?
                  </p>
                  <div className="text-xs text-gray-400 font-medium">Hace 3 horas</div>
                </div>
              </div>
            </div>

          </div>
        </Card>

        {/* Right Content - Chat View */}
        <Card className="flex-1 flex flex-col bg-white overflow-hidden shadow-sm border-gray-200 relative">
          
          {/* View Header */}
          <div className="px-6 py-4 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold text-lg">
                MG
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">María González</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-0.5">
                  <Instagram className="w-4 h-4 text-gray-600" />
                  Instagram • Hace 5 min
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <button className="p-2.5 hover:bg-gray-50 rounded-lg transition-colors"><Star className="w-5 h-5 focus:outline-none" /></button>
              <button className="p-2.5 hover:bg-gray-50 rounded-lg transition-colors"><Archive className="w-5 h-5" /></button>
              <button className="p-2.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-5 h-5" /></button>
            </div>
          </div>
          
          <div className="border-b border-gray-100 w-full" />

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 bg-white relative">
            
            {/* Context Header */}
            <div className="mb-8">
              <div className="text-[13px] text-gray-500 font-medium mb-1.5">En respuesta a:</div>
              <div className="text-sm text-gray-700">Lanzamiento de nueva campaña de verano 😍</div>
            </div>

            <div className="border-t border-gray-100 my-6 -mx-6" />

            {/* Inbound Message */}
            <div className="flex justify-start mb-6">
              <div className="bg-white border border-gray-100 rounded-lg rounded-tl-sm p-4 shadow-sm max-w-[70%] text-gray-800 text-[15px] relative">
                ¡Me encanta este producto! ¿Dónde puedo comprarlo?
              </div>
            </div>

            {/* Outbound Message */}
            <div className="flex flex-col items-end mb-6 w-full">
               <div className="flex items-start gap-4 max-w-[70%]">
                 <div className="w-8 h-8 rounded-full bg-green-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-1">
                   T
                 </div>
                 <div className="bg-blue-50/60 border border-blue-50/80 rounded-lg rounded-tr-sm p-4 text-gray-800 text-[15px] relative">
                   <div className="font-semibold text-gray-900 mb-1.5 text-sm">
                     Tú
                   </div>
                   ¡Hola! Gracias por tu interés. Te envío más información por mensaje directo.
                   <div className="text-xs text-gray-400 mt-3 font-medium">Hace 30 min</div>
                 </div>
               </div>
            </div>

          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-gray-100 relative">
            <div className="border border-gray-200 rounded-xl bg-white p-2.5 shadow-sm focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <textarea 
                className="w-full bg-transparent border-none focus:ring-0 resize-none p-2 text-[15px] text-gray-800 placeholder-gray-400 outline-none"
                rows={3}
                placeholder="Escribe tu respuesta..."
              />
              <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 mt-1">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 flex gap-2 font-medium h-9 px-3">
                    <Heart className="w-4 h-4" /> Like
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 font-medium h-9 px-3">
                    Plantillas
                  </Button>
                </div>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-5 h-9 flex gap-2 font-medium">
                  <Send className="w-4 h-4" /> Enviar
                </Button>
              </div>
            </div>
          </div>

        </Card>
      </div>
    </div>
  );
}
