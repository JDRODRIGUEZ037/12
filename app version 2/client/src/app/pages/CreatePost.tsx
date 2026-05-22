import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../config";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Linkedin,
  Image as ImageIcon,
  Calendar,
  Send,
  Clock,
  Sparkles,
  RefreshCw,
  Camera,
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Check
} from "lucide-react";
import { toast } from "sonner";

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-black" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
];

export function CreatePost() {
  const navigate = useNavigate();
  const [account, setAccount] = useState<any>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/instagram/accounts`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setAccount(data[0]);
        }
      })
      .catch(err => console.error("Error fetching accounts for preview:", err));
  }, []);

  const getDraftField = (field: string, defaultValue: any) => {
    const saved = localStorage.getItem("current_post_draft");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed[field] !== undefined) return parsed[field];
      } catch (e) {}
    }
    return defaultValue;
  };

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(() => getDraftField("selectedPlatforms", ["instagram"]));
  const [content, setContent] = useState(() => getDraftField("content", ""));
  const [scheduleDate, setScheduleDate] = useState(() => getDraftField("scheduleDate", ""));
  const [scheduleTime, setScheduleTime] = useState(() => getDraftField("scheduleTime", ""));
  
  // Prompts split
  const [imagePrompt, setImagePrompt] = useState(() => getDraftField("imagePrompt", ""));
  const [copyPrompt, setCopyPrompt] = useState(() => getDraftField("copyPrompt", ""));
  const [aiTone, setAiTone] = useState(() => getDraftField("aiTone", "profesional"));
  
  // Loading indicators
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Generative assets
  const [uploadedImage, setUploadedImage] = useState<string | null>(() => getDraftField("uploadedImage", null));
  const [publicImageUrl, setPublicImageUrl] = useState(() => getDraftField("publicImageUrl", "")); 

  // Autosave Draft
  useEffect(() => {
    const isAllDefault = 
      content === "" &&
      scheduleDate === "" &&
      scheduleTime === "" &&
      imagePrompt === "" &&
      copyPrompt === "" &&
      aiTone === "profesional" &&
      uploadedImage === null &&
      publicImageUrl === "" &&
      selectedPlatforms.length === 1 && selectedPlatforms[0] === "instagram";

    if (isAllDefault) {
      localStorage.removeItem("current_post_draft");
    } else {
      const draft = {
        selectedPlatforms,
        content,
        scheduleDate,
        scheduleTime,
        imagePrompt,
        copyPrompt,
        aiTone,
        uploadedImage,
        publicImageUrl
      };
      localStorage.setItem("current_post_draft", JSON.stringify(draft));
    }
  }, [
    selectedPlatforms,
    content,
    scheduleDate,
    scheduleTime,
    imagePrompt,
    copyPrompt,
    aiTone,
    uploadedImage,
    publicImageUrl
  ]);

  const clearDraftState = () => {
    setContent("");
    setScheduleDate("");
    setScheduleTime("");
    setImagePrompt("");
    setCopyPrompt("");
    setAiTone("profesional");
    setUploadedImage(null);
    setPublicImageUrl("");
    setSelectedPlatforms(["instagram"]);
    localStorage.removeItem("current_post_draft");
  };

  const handleSaveDraft = () => {
    if (!content.trim() && !imagePrompt.trim() && !copyPrompt.trim() && !uploadedImage) {
      toast.error("El borrador está vacío. Escribe algo antes de guardarlo.");
      return;
    }

    try {
      const newDraft = {
        id: Date.now() + Math.random(),
        createdAt: new Date().toISOString(),
        selectedPlatforms,
        content,
        scheduleDate,
        scheduleTime,
        imagePrompt,
        copyPrompt,
        aiTone,
        uploadedImage,
        publicImageUrl
      };

      const existingDrafts = JSON.parse(localStorage.getItem("saved_drafts") || "[]");
      localStorage.setItem("saved_drafts", JSON.stringify([newDraft, ...existingDrafts]));

      toast.success("¡Borrador guardado exitosamente!");
      clearDraftState();
      navigate("/app/drafts");
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Error al guardar el borrador.");
    }
  };

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) {
      toast.error("Por favor escribe la descripción de la imagen que quieres generar.");
      return;
    }

    setIsGeneratingImage(true);
    toast.loading("Generando imagen con Inteligencia Artificial...", { id: "image-gen-toast" });

    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-image`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: imagePrompt })
      });
      const data = await response.json();

      if (data && data.success && data.imageUrl) {
        setUploadedImage(data.imageUrl);
        setPublicImageUrl(data.imageUrl);
        toast.success("¡Imagen generada exitosamente con IA!", { id: "image-gen-toast" });
      } else {
        toast.error("Error al generar la imagen con el servidor de IA.", { id: "image-gen-toast" });
      }
    } catch (err) {
      toast.error("Error de conexión al generar la imagen.", { id: "image-gen-toast" });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGenerateCopy = async () => {
    if (!copyPrompt.trim()) {
      toast.error("Por favor escribe sobre qué tema o idea quieres el copy.");
      return;
    }

    setIsGeneratingCopy(true);
    toast.loading("Redactando copy con IA...", { id: "copy-gen-toast" });

    try {
      const response = await fetch(`${API_BASE_URL}/ai/generate-copy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: copyPrompt, tone: aiTone })
      });
      const data = await response.json();

      if (data && data.success && data.copy) {
        setContent(data.copy);
        toast.success("¡Copy generado exitosamente con IA!", { id: "copy-gen-toast" });
      } else {
        toast.error("Error al redactar el copy con el servidor de IA.", { id: "copy-gen-toast" });
      }
    } catch (err) {
      toast.error("Error de conexión al generar el copy.", { id: "copy-gen-toast" });
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  const handlePublishNow = async () => {
    if (!content.trim()) {
      toast.error("Por favor escribe o genera contenido para el post");
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error("Selecciona al menos una plataforma");
      return;
    }
    if (!publicImageUrl.trim()) {
      toast.error("Para publicar en Instagram necesitas generar o cargar una imagen.");
      return;
    }

    setIsPublishing(true);
    toast.loading("Publicando en Instagram (esto puede tardar unos segundos)...", { id: "publish-toast" });

    try {
      const response = await fetch(`${API_BASE_URL}/instagram/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: publicImageUrl,
          caption: content,
          userId: "default-user"
        })
      });

      const data = await response.json();

      if (data.error) {
        toast.error(`Error de Instagram: ${data.error}`, { id: "publish-toast" });
      } else {
        toast.success(`¡Post publicado exitosamente en tu cuenta!`, { id: "publish-toast" });
        clearDraftState();
      }
    } catch (err) {
      toast.error("Error de conexión con el backend.", { id: "publish-toast" });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSchedule = () => {
    if (!content.trim()) {
      toast.error("Por favor escribe o genera contenido para el post");
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error("Selecciona al menos una plataforma");
      return;
    }
    if (!scheduleDate || !scheduleTime) {
      toast.error("Selecciona fecha y hora para programar");
      return;
    }

    // Save post to localStorage
    try {
      const dateStr = `${scheduleDate}T${scheduleTime}`;
      const dateObj = new Date(dateStr);

      const newPosts = selectedPlatforms.map((platform) => {
        const id = Date.now() + Math.random();
        return {
          id,
          date: dateObj.toISOString(),
          platform: platform.charAt(0).toUpperCase() + platform.slice(1),
          content: content,
          status: "scheduled"
        };
      });

      const existingPosts = JSON.parse(localStorage.getItem("scheduled_posts") || "[]");
      localStorage.setItem("scheduled_posts", JSON.stringify([...existingPosts, ...newPosts]));

      toast.success("¡Post programado exitosamente para el calendario!");
      clearDraftState();
    } catch (error) {
      console.error("Error saving scheduled post:", error);
      toast.error("Error al programar el post.");
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Crear Post con IA</h1>
        <p className="text-gray-500 mt-1">Genera contenido increíble usando inteligencia artificial</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Editor Principal (Izquierda) */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Generación de Imagen */}
          <Card className="p-6 border border-purple-100 bg-purple-50/10 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <Label className="text-base font-bold text-purple-900">Generación de Imagen</Label>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="image-prompt" className="text-sm font-semibold text-gray-700 mb-2 block">
                  Describe la imagen que quieres generar
                </Label>
                <div className="relative">
                  <Textarea
                    id="image-prompt"
                    placeholder="Ej: Un atardecer en la playa con palmeras de estilo futurista, tonos morados y cian..."
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    className="min-h-[100px] bg-white border-purple-100 pr-10 resize-none rounded-lg text-sm"
                  />
                  <Camera className="absolute right-3 bottom-3 text-purple-300 w-5 h-5" />
                </div>
              </div>

              {uploadedImage && (
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">URL de la imagen generada</Label>
                  <Input 
                    value={publicImageUrl} 
                    onChange={(e) => {
                      setPublicImageUrl(e.target.value);
                      setUploadedImage(e.target.value);
                    }}
                    className="bg-white border-purple-100 text-xs text-gray-500" 
                  />
                </div>
              )}

              <Button
                onClick={handleGenerateImage}
                disabled={isGeneratingImage}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isGeneratingImage ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2" />
                )}
                Generar Imagen con IA
              </Button>
            </div>
          </Card>

          {/* Generación de Copy */}
          <Card className="p-6 border border-emerald-100 bg-emerald-50/10 shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <Label className="text-base font-bold text-emerald-900">Generación de Copy</Label>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="copy-prompt" className="text-sm font-semibold text-gray-700 mb-2 block">
                  ¿Sobre qué quieres escribir?
                </Label>
                <Textarea
                  id="copy-prompt"
                  placeholder="Ej: Lanzamiento de producto con descuento del 20%, consejos clave de marketing, frase motivacional..."
                  value={copyPrompt}
                  onChange={(e) => setCopyPrompt(e.target.value)}
                  className="min-h-[100px] bg-white border-emerald-100 resize-none rounded-lg text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ai-tone" className="text-sm font-semibold text-gray-700 mb-2 block">
                    Tono del mensaje
                  </Label>
                  <Select value={aiTone} onValueChange={setAiTone}>
                    <SelectTrigger id="ai-tone" className="bg-white border-emerald-100 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="profesional">Profesional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="inspiracional">Inspiracional</SelectItem>
                      <SelectItem value="divertido">Divertido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={handleGenerateCopy}
                    disabled={isGeneratingCopy}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isGeneratingCopy ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2" />
                    )}
                    Generar Copy con IA
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Edición de Contenido Manual */}
          <Card className="p-6 shadow-sm border border-gray-100">
            <Label className="text-sm font-semibold text-gray-700 mb-3 block">Contenido editable final</Label>
            <Textarea
              placeholder="Escribe o edita el texto definitivo aquí. También puedes usar las herramientas de IA arriba."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[140px] resize-none border-gray-200 rounded-lg text-sm"
            />
            <div className="flex justify-end mt-2">
              <span className="text-xs text-gray-400 font-semibold">{content.length} caracteres</span>
            </div>
          </Card>

          {/* Programación */}
          <Card className="p-6 shadow-sm border border-gray-100">
            <Label className="text-base font-bold text-gray-900 mb-4 block">Programación</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schedule-date" className="text-xs font-semibold text-gray-600 mb-2 block">Fecha</Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="rounded-lg border-gray-200"
                />
              </div>
              <div>
                <Label htmlFor="schedule-time" className="text-xs font-semibold text-gray-600 mb-2 block">Hora</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="rounded-lg border-gray-200"
                />
              </div>
            </div>
          </Card>

          {/* Botones de Acción */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button 
              onClick={handlePublishNow}
              disabled={isPublishing}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer w-full"
            >
              {isPublishing ? (
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <Send className="w-5 h-5 mr-2" />
              )}
              {isPublishing ? "Publicando..." : "Publicar Ahora"}
            </Button>
            <Button 
              onClick={handleSchedule}
              variant="outline"
              className="border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-3 rounded-lg shadow-2xs flex items-center justify-center gap-2 cursor-pointer w-full"
            >
              <Clock className="w-5 h-5 mr-2 text-gray-400" />
              Programar
            </Button>
            <Button 
              onClick={handleSaveDraft}
              variant="secondary"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-lg shadow-2xs flex items-center justify-center gap-2 cursor-pointer w-full"
            >
              <Bookmark className="w-5 h-5 mr-2 text-gray-500" />
              Guardar Borrador
            </Button>
          </div>

        </div>

        {/* Sidebar (Derecha) */}
        <div className="space-y-6">
          
          {/* Selección de Plataformas */}
          <Card className="p-6 shadow-sm border border-gray-100">
            <Label className="text-base font-bold text-gray-900 mb-4 block">Plataformas</Label>
            <div className="space-y-3">
              {platforms.map((platform) => {
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                  >
                    <div className={`${platform.color} p-2 rounded-lg text-white`}>
                      <platform.icon className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-800 text-sm">{platform.name}</span>
                    {isSelected && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <Check className="w-3. h-3" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Vista Previa Móvil Estilo Instagram Premium */}
          <Card className="p-6 shadow-sm border border-gray-100">
            <Label className="text-base font-bold text-gray-900 mb-4 block">Vista Previa</Label>
            
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xs max-w-sm mx-auto">
              
              {/* Instagram Card Header */}
              <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 p-0.5">
                  <div className="w-full h-full rounded-full bg-white p-0.5">
                    {account?.profilePicture ? (
                      <img 
                        src={account.profilePicture} 
                        alt={account.accountName} 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-[10px] font-bold text-gray-700">
                        {account?.accountName ? account.accountName.substring(0, 2).toUpperCase() : "JD"}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900">
                    {account?.accountName ? `@${account.accountName}` : "Usuario Conectado"}
                  </p>
                  <p className="text-[10px] text-gray-500">Instagram Profesional</p>
                </div>
              </div>

              {/* Instagram Card Image Area */}
              <div className="relative aspect-square bg-gray-50 border-b border-gray-100 flex items-center justify-center overflow-hidden">
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Preview"
                    className="w-full h-full object-cover animate-fade-in"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2">
                    <ImageIcon className="w-12 h-12 text-gray-300 mx-auto" />
                    <p className="text-xs text-gray-400 font-medium">La imagen de IA se renderizará aquí</p>
                  </div>
                )}
                
                {isGeneratingImage && (
                  <div className="absolute inset-0 bg-purple-900/40 backdrop-blur-xs flex items-center justify-center">
                    <div className="text-center">
                      <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                      <p className="text-xs text-white font-semibold">Generando imagen...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Instagram Action Icons */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-4 text-gray-700">
                  <Heart className="w-5 h-5 hover:text-red-500 transition-colors cursor-pointer" />
                  <MessageCircle className="w-5 h-5 cursor-pointer" />
                  <Share2 className="w-5 h-5 cursor-pointer" />
                </div>
                <Bookmark className="w-5 h-5 text-gray-700 cursor-pointer" />
              </div>

              {/* Instagram Card Caption Area */}
              <div className="px-3 pb-4 space-y-1.5">
                <p className="text-xs font-extrabold text-gray-900">
                  Likes <span className="font-normal text-gray-500">simulados</span>
                </p>
                {content ? (
                  <p className="text-xs text-gray-800 leading-relaxed whitespace-pre-wrap">
                    <span className="font-bold text-gray-900 mr-1.5">{account?.accountName ? account.accountName : "demo_account"}</span>
                    {content}
                  </p>
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    Esperando copy redactado por IA...
                  </p>
                )}
              </div>

            </div>
          </Card>

          {/* Mejores Horarios */}
          <Card className="p-6 shadow-sm border border-gray-100">
            <Label className="text-base font-bold text-gray-900 mb-4 block">Mejores Horarios</Label>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm p-2 bg-pink-50/30 rounded border border-pink-100/50">
                <span className="font-medium text-pink-700 flex items-center gap-1.5">
                  <Instagram className="w-4 h-4" />
                  Instagram
                </span>
                <span className="font-bold text-gray-900">10:00 - 14:00</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded border border-gray-200/50">
                <span className="font-medium text-gray-800 flex items-center gap-1.5">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </span>
                <span className="font-bold text-gray-900">12:00 - 15:00</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-blue-50/30 rounded border border-blue-100/50">
                <span className="font-medium text-blue-700 flex items-center gap-1.5">
                  <Facebook className="w-4 h-4" />
                  Facebook
                </span>
                <span className="font-bold text-gray-900">09:00 - 13:00</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-blue-50/20 rounded border border-blue-100/30">
                <span className="font-medium text-blue-800 flex items-center gap-1.5">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </span>
                <span className="font-bold text-gray-900">08:00 - 10:00</span>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}