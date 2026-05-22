import React, { useState, useEffect } from 'react';
import { Card } from "../components/ui/card";
import { API_BASE_URL } from '../config';
import { Button } from "../components/ui/button";
import { 
  MessageSquare, MessageCircle, AtSign, Mail, Star, Archive, Trash2, Send, Heart, 
  Instagram, Twitter 
} from "lucide-react";

export function Inbox() {
  const [activeTab, setActiveTab] = useState('todos');
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetch(`${API_BASE_URL}/instagram/conversations`)
      .then(res => res.json())
      .then(data => {
        setConversations(data);
        if (data.length > 0) setSelectedConv(data[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching conversations:', err);
        setLoading(false);
      });
  }, []);

  const filteredConversations = conversations.filter(conv => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'comments') return conv.type === 'comment';
    if (activeTab === 'dms') return conv.type === 'dm' || !conv.type;
    if (activeTab === 'mentions') return conv.type === 'mention';
    return true;
  });

  // Automatically update the selected conversation when the active tab changes
  useEffect(() => {
    if (filteredConversations.length > 0) {
      const isStillVisible = filteredConversations.some(c => c.id === selectedConv?.id);
      if (!isStillVisible) {
        setSelectedConv(filteredConversations[0]);
      }
    } else {
      setSelectedConv(null);
    }
  }, [activeTab, conversations]);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / 60000);
    if (diffMins < 60) return `Hace ${diffMins} min`;
    const diffHours = Math.round(diffMins / 60);
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    return date.toLocaleDateString();
  };

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
            <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
              <button 
                onClick={() => setActiveTab('todos')}
                className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${activeTab === 'todos' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setActiveTab('dms')}
                className={`flex-1.5 py-2 px-2 rounded-lg flex justify-center items-center gap-1.5 transition-all ${activeTab === 'dms' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Mensajes</span>
              </button>
              <button 
                onClick={() => setActiveTab('comments')}
                className={`flex-1.5 py-2 px-2 rounded-lg flex justify-center items-center gap-1.5 transition-all ${activeTab === 'comments' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Comentarios</span>
              </button>
              <button 
                onClick={() => setActiveTab('mentions')}
                className={`flex-1 py-2 px-2 rounded-lg flex justify-center items-center gap-1.5 transition-all ${activeTab === 'mentions' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <AtSign className="w-3.5 h-3.5" />
                <span className="text-xs font-semibold">Menciones</span>
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            
            {loading ? (
              <div className="flex flex-col items-center justify-center p-12 text-gray-400">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
                <span>Cargando mensajes...</span>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="text-center p-12 text-gray-500">No hay mensajes recientes</div>
            ) : (
              filteredConversations.map((conv) => (
                <div 
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer shadow-sm ${
                    selectedConv?.id === conv.id 
                      ? 'border-blue-200 bg-blue-50/50' 
                      : 'border-gray-100 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold flex-shrink-0 text-sm overflow-hidden">
                      {conv.profile_picture ? (
                        <img src={conv.profile_picture} alt={conv.name} className="w-full h-full object-cover" />
                      ) : (
                        conv.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {conv.platform === 'instagram' ? (
                          <Instagram className="w-3.5 h-3.5 text-pink-600" />
                        ) : (
                          <Twitter className="w-3.5 h-3.5 text-blue-400" />
                        )}
                        <span className="font-semibold text-gray-900 text-sm truncate">{conv.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase ${conv.type === 'comment' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                          {conv.type === 'comment' ? 'Comentario' : 'DM'}
                        </span>
                        {conv.unseen_count > 0 && <span className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />}
                      </div>
                      <p className={`text-[13px] mb-2 line-clamp-2 leading-relaxed ${conv.unseen_count > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                        {conv.last_message}
                      </p>
                      <div className="text-xs text-gray-500 font-medium">{formatDate(conv.timestamp)}</div>
                    </div>
                  </div>
                </div>
              ))
            )}

          </div>
        </Card>

        {/* Right Content - Chat View */}
        <Card className="flex-1 flex flex-col bg-white overflow-hidden shadow-sm border-gray-200 relative">
          
          {selectedConv ? (
            <>
              {/* View Header */}
              <div className="px-6 py-4 flex items-center justify-between bg-white z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold text-lg overflow-hidden">
                    {selectedConv.profile_picture ? (
                      <img src={selectedConv.profile_picture} alt={selectedConv.name} className="w-full h-full object-cover" />
                    ) : (
                      selectedConv.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{selectedConv.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mt-0.5">
                      {selectedConv.platform === 'instagram' ? <Instagram className="w-4 h-4" /> : <Twitter className="w-4 h-4" />}
                      {selectedConv.platform.charAt(0).toUpperCase() + selectedConv.platform.slice(1)} • {formatDate(selectedConv.timestamp)}
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
                  <div className="text-[13px] text-gray-500 font-medium mb-1.5">
                    {selectedConv.type === 'comment' ? 'En respuesta al post:' : 'Conversación iniciada:'}
                  </div>
                  <div className="text-sm text-gray-700 italic">
                    {selectedConv.type === 'comment' ? selectedConv.post_caption || 'Publicación sin pie de foto' : 'Chat directo con el cliente'}
                  </div>
                </div>

                <div className="border-t border-gray-100 my-6 -mx-6" />

                {/* Dynamic Messages Render */}
                {selectedConv.messages && selectedConv.messages.length > 0 ? (
                  selectedConv.messages.map((msg: any, idx: number) => {
                    const isMe = msg.from === 'me';
                    if (isMe) {
                      return (
                        <div key={idx} className="flex flex-col items-end mb-6 w-full">
                          <div className="flex items-start gap-3 max-w-[70%] justify-end">
                            <div className="bg-blue-50/70 border border-blue-100 rounded-2xl rounded-tr-xs p-4 text-gray-800 text-[15px] shadow-xs relative">
                              <div className="font-semibold text-blue-700 mb-1 text-xs">
                                Tú
                              </div>
                              {msg.text}
                              <div className="text-[10px] text-gray-400 mt-2 font-medium text-right">{formatDate(msg.timestamp)}</div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-1 shadow-sm">
                              T
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={idx} className="flex justify-start mb-6">
                          <div className="flex items-start gap-3 max-w-[70%]">
                            <div className="w-8 h-8 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-1 shadow-sm">
                              {selectedConv.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-xs p-4 shadow-sm text-gray-800 text-[15px] relative">
                              <div className="font-semibold text-gray-700 mb-1 text-xs">
                                {selectedConv.name}
                              </div>
                              {msg.text}
                              <div className="text-[10px] text-gray-400 mt-2 font-medium text-right">{formatDate(msg.timestamp)}</div>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <>
                    {/* Fallback to legacy single message layout if messages array not populated */}
                    <div className="flex justify-start mb-6">
                      <div className="bg-white border border-gray-100 rounded-lg rounded-tl-sm p-4 shadow-sm max-w-[70%] text-gray-800 text-[15px] relative">
                        {selectedConv.last_message}
                        <div className="text-xs text-gray-400 mt-3 font-medium text-right">{formatDate(selectedConv.timestamp)}</div>
                      </div>
                    </div>
                  </>
                )}

              </div>

              {/* Input Area */}
              <div className="p-6 bg-white border-t border-gray-100 relative">
                <div className="border border-gray-200 rounded-xl bg-white p-2.5 shadow-sm focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <textarea 
                    className="w-full bg-transparent border-none focus:ring-0 resize-none p-2 text-[15px] text-gray-800 placeholder-gray-400 outline-none"
                    rows={3}
                    placeholder="Escribe tu respuesta..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (!replyText.trim()) return;
                        const newMessage = {
                          from: 'me',
                          text: replyText,
                          timestamp: new Date().toISOString()
                        };
                        const updatedConv = {
                          ...selectedConv,
                          last_message: replyText,
                          timestamp: newMessage.timestamp,
                          messages: [...(selectedConv.messages || []), newMessage]
                        };
                        setSelectedConv(updatedConv);
                        setConversations(prev => prev.map(c => c.id === selectedConv.id ? updatedConv : c));
                        setReplyText('');
                      }
                    }}
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
                    <Button 
                      onClick={() => {
                        if (!replyText.trim()) return;
                        const newMessage = {
                          from: 'me',
                          text: replyText,
                          timestamp: new Date().toISOString()
                        };
                        const updatedConv = {
                          ...selectedConv,
                          last_message: replyText,
                          timestamp: newMessage.timestamp,
                          messages: [...(selectedConv.messages || []), newMessage]
                        };
                        setSelectedConv(updatedConv);
                        setConversations(prev => prev.map(c => c.id === selectedConv.id ? updatedConv : c));
                        setReplyText('');
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-5 h-9 flex gap-2 font-medium"
                    >
                      <Send className="w-4 h-4" /> Enviar
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
              <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
              <p>Selecciona una conversación para leer los mensajes</p>
            </div>
          )}

        </Card>
      </div>
    </div>
  );
}
