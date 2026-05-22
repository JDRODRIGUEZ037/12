import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import { Badge } from "../components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  Clock,
  Edit,
  Trash2,
  X,
  Save
} from "lucide-react";
import { format, setHours, setMinutes, parse } from "date-fns";
import { es } from "date-fns/locale";
import { toast } from "sonner";

const today = new Date();
const scheduledPostsInit = [
  {
    id: 1,
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
    platform: "Instagram",
    icon: Instagram,
    color: "bg-pink-100 text-pink-700",
    content: "Nueva colección primavera-verano 2026 🌸",
    status: "scheduled"
  },
  {
    id: 2,
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30),
    platform: "Twitter",
    icon: Twitter,
    color: "bg-blue-100 text-blue-700",
    content: "Consejos para aumentar tu engagement en redes sociales",
    status: "scheduled"
  },
  {
    id: 3,
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0),
    platform: "Facebook",
    icon: Facebook,
    color: "bg-indigo-100 text-indigo-700",
    content: "Evento en vivo este fin de semana 🎉",
    status: "scheduled"
  },
  {
    id: 4,
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 16, 0),
    platform: "LinkedIn",
    icon: Linkedin,
    color: "bg-sky-100 text-sky-700",
    content: "El futuro del marketing digital en 2026",
    status: "scheduled"
  },
  {
    id: 5,
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 11, 0),
    platform: "Instagram",
    icon: Instagram,
    color: "bg-pink-100 text-pink-700",
    content: "Behind the scenes de nuestra última campaña",
    status: "scheduled"
  },
];

export function Scheduler() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [posts, setPosts] = useState<any[]>(() => {
    const local = localStorage.getItem("scheduled_posts");
    if (local) {
      try {
        const parsed = JSON.parse(local).map((p: any) => ({
          ...p,
          date: new Date(p.date),
          icon: p.platform.toLowerCase() === "instagram" ? Instagram :
                p.platform.toLowerCase() === "twitter" ? Twitter :
                p.platform.toLowerCase() === "facebook" ? Facebook :
                p.platform.toLowerCase() === "linkedin" ? Linkedin : Clock,
          color: p.platform.toLowerCase() === "instagram" ? "bg-pink-100 text-pink-700" :
                 p.platform.toLowerCase() === "twitter" ? "bg-blue-100 text-blue-700" :
                 p.platform.toLowerCase() === "facebook" ? "bg-indigo-100 text-indigo-700" :
                 p.platform.toLowerCase() === "linkedin" ? "bg-sky-100 text-sky-700" : "bg-gray-100 text-gray-700"
        }));
        return [...scheduledPostsInit, ...parsed];
      } catch (e) {
        console.error("Error parsing scheduled posts:", e);
        return scheduledPostsInit;
      }
    }
    return scheduledPostsInit;
  });
  
  // Modal State
  const [editingPost, setEditingPost] = useState<any>(null);
  const [draftContent, setDraftContent] = useState("");
  const [draftDate, setDraftDate] = useState("");
  const [draftTime, setDraftTime] = useState("");

  const postsForSelectedDate = posts.filter(post => {
    if (!selectedDate) return false;
    return format(post.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
  });

  const handleEditClick = (post: any) => {
    setEditingPost(post);
    setDraftContent(post.content);
    setDraftDate(format(post.date, "yyyy-MM-dd"));
    setDraftTime(format(post.date, "HH:mm"));
  };

  const handleDeleteClick = (postId: number | string) => {
    const updated = posts.filter(p => p.id !== postId);
    setPosts(updated);
    
    // Save updated local posts to localStorage
    try {
      const local = JSON.parse(localStorage.getItem("scheduled_posts") || "[]");
      const updatedLocal = local.filter((p: any) => p.id !== postId);
      localStorage.setItem("scheduled_posts", JSON.stringify(updatedLocal));
    } catch (e) {
      console.error(e);
    }
    
    toast.success("Publicación eliminada correctamente.");
  };

  const handleSave = () => {
    // Parse time and date and update the post
    try {
      const parsedDate = parse(draftDate, "yyyy-MM-dd", new Date());
      const hours = parseInt(draftTime.split(":")[0]);
      const minutes = parseInt(draftTime.split(":")[1]);
      
      const newDate = setMinutes(setHours(parsedDate, hours), minutes);

      const updated = posts.map(p => {
        if (p.id === editingPost.id) {
          return { ...p, content: draftContent, date: newDate };
        }
        return p;
      });
      setPosts(updated);

      // Save updated local posts to localStorage
      try {
        const local = JSON.parse(localStorage.getItem("scheduled_posts") || "[]");
        const updatedLocal = local.map((p: any) => {
          if (p.id === editingPost.id) {
            return { ...p, content: draftContent, date: newDate.toISOString() };
          }
          return p;
        });
        localStorage.setItem("scheduled_posts", JSON.stringify(updatedLocal));
      } catch (e) {
        console.error(e);
      }

      toast.success("Post actualizado correctamente", {
        description: "Los cambios se han guardado con éxito.",
      });
      setEditingPost(null);
    } catch (e) {
      toast.error("Error al guardar","Revisa los valores de fecha y hora");
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Programador de Posts</h1>
          <p className="text-gray-600 mt-1">Gestiona y programa tus publicaciones</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Clock className="w-4 h-4 mr-2" />
          Nueva Programación
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Calendar */}
        <Card className="p-6 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendario</h2>
          <div className="w-full border border-gray-100 rounded-xl p-4 bg-gray-50/30">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
              className="w-full"
            />
          </div>
          
          <div className="mt-6 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Posts programados</span>
              <Badge variant="secondary">{posts.length}</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Este mes</span>
              <Badge variant="secondary">{posts.length}</Badge>
            </div>
          </div>
        </Card>

        {/* Scheduled Posts List */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Posts para {selectedDate ? format(selectedDate, "d 'de' MMMM, yyyy", { locale: es }) : "seleccionar fecha"}
          </h2>
          
          {postsForSelectedDate.length > 0 ? (
            <div className="space-y-4">
              {postsForSelectedDate.map((post) => (
                <div key={post.id} className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors bg-white shadow-sm">
                  <div className={`p-3 rounded-xl ${post.color}`}>
                    <post.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 mt-0.5">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-semibold text-gray-900">{post.platform}</span>
                      <Badge variant="outline" className="text-xs bg-gray-50 font-semibold border-gray-200">
                        {format(post.date, "HH:mm")}
                      </Badge>
                    </div>
                    <p className="text-gray-700 text-sm">{post.content}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(post)} className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteClick(post.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No hay posts programados para esta fecha</p>
              <Button variant="outline" className="mt-4">
                Programar Post
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Timeline View */}
      <Card className="p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Próximas Publicaciones</h2>
        <div className="space-y-6">
          {posts.slice(0, 5).map((post, index) => (
            <div key={post.id} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-lg ${post.color}`}>
                  <post.icon className="w-4 h-4" />
                </div>
                {index < posts.length - 1 && (
                  <div className="w-px h-12 bg-gray-200 my-2" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {format(post.date, "d 'de' MMMM, yyyy", { locale: es })}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(post.date, "HH:mm")}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Edit Post Modal */}
      <Dialog open={!!editingPost} onOpenChange={(open) => !open && setEditingPost(null)}>
        <DialogContent className="sm:max-w-[500px] p-6 bg-white border-0 shadow-lg gap-0">
          <DialogHeader className="mb-6">
            <DialogTitle className="flex items-center gap-3 text-xl">
              {editingPost?.icon && <editingPost.icon className="w-6 h-6 text-gray-700" />}
              Editar Post Programado
            </DialogTitle>
          </DialogHeader>

          {editingPost && (
            <div className="space-y-6">
              {/* Platform */}
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">Plataforma</label>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg w-fit text-sm font-medium text-gray-700">
                  <editingPost.icon className="w-4 h-4" /> {editingPost.platform}
                </div>
              </div>
              
              {/* Content */}
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">Contenido</label>
                <textarea
                  className="w-full bg-white border border-gray-200 rounded-xl p-3 text-[15px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                />
                <div className="text-right text-xs text-gray-500 mt-1 font-medium">{draftContent.length} caracteres</div>
              </div>
              
              {/* DateTime */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">Fecha</label>
                  <input 
                    type="date"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 h-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    value={draftDate}
                    onChange={(e) => setDraftDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-900 mb-2 block">Hora</label>
                  <input 
                    type="time"
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 h-10 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    value={draftTime}
                    onChange={(e) => setDraftTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 mt-8 pt-4">
                <Button variant="outline" onClick={() => setEditingPost(null)} className="flex items-center gap-2 font-medium">
                  <X className="w-4 h-4" /> Cancelar
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 font-medium">
                  <Save className="w-4 h-4" /> Guardar Cambios
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
