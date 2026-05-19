import { useState } from "react";
import { API_BASE_URL } from '../config';
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
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
  Wand2,
  Hash,
  RefreshCw,
  Upload,
  Palette,
  Eraser,
  Crop,
  Download,
  Zap
} from "lucide-react";
import { toast } from "sonner";

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-pink-500" },
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-blue-400" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-600" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-700" },
];

export function CreatePost() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram"]);
  const [content, setContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiTone, setAiTone] = useState("profesional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [publicImageUrl, setPublicImageUrl] = useState(""); // URL string for FB Graph API MVP
  const [selectedFilter, setSelectedFilter] = useState("original");
  const [isPublishing, setIsPublishing] = useState(false);

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platformId)
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handlePublishNow = async () => {
    if (!content.trim()) {
      toast.error("Por favor escribe contenido para el post");
      return;
    }
    if (selectedPlatforms.length === 0) {
      toast.error("Selecciona al menos una plataforma");
      return;
    }
    if (!publicImageUrl.trim()) {
      toast.error("Para poder publicarlo de verdad en Meta, necesitas ingresar una URL pública de imagen.");
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
          userId: "default-user" // Mock auth user
        })
      });

      const data = await response.json();

      if (data.error) {
        toast.error(`Error de Instagram: ${data.error}`, { id: "publish-toast" });
      } else {
        toast.success(`¡Post publicado exitosamente en tu cuenta!`, { id: "publish-toast" });
        setContent("");
        setPublicImageUrl("");
        setUploadedImage(null);
      }
    } catch (err) {
      toast.error("Error de conexión con el backend.", { id: "publish-toast" });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSchedule = () => {
    if (!content.trim()) {
      toast.error("Por favor escribe contenido para el post");
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
    toast.success("¡Post programado exitosamente!");
    setContent("");
    setScheduleDate("");
    setScheduleTime("");
  };

  const generateWithAI = () => {
    if (!aiPrompt.trim()) {
      toast.error("Por favor escribe un tema o idea para generar contenido");
      return;
    }

    setIsGenerating(true);
    
    // Simulación de generación con IA
    setTimeout(() => {
      const examples = {
        profesional: `📊 ${aiPrompt}\n\nEn el mundo empresarial actual, es fundamental mantenerse actualizado con las últimas tendencias. Nuestro equipo está comprometido en ofrecer soluciones innovadoras que impulsen tu negocio.\n\n¿Quieres saber más? Contáctanos hoy. 💼\n\n#Negocios #Innovación #Crecimiento`,
        casual: `¡Hola! 👋\n\n${aiPrompt} - y estamos súper emocionados de compartirlo contigo 🎉\n\nNo te lo pierdas, esto va a estar increíble 😍\n\n¿Qué opinas? ¡Déjanos tu comentario! 💬\n\n#VibesPositivos #Comunidad #Contenido`,
        inspiracional: `✨ ${aiPrompt}\n\n"El éxito no es la clave de la felicidad. La felicidad es la clave del éxito."\n\nCada día es una nueva oportunidad para alcanzar tus sueños. No te rindas, sigue adelante y verás cómo tus esfuerzos dan frutos. 🌟\n\n#Motivación #Inspiración #Éxito #Crecimiento`,
        divertido: `😄 ${aiPrompt}\n\n¿Sabías que...? ¡Esto te va a sorprender! 🤯\n\nLa vida es demasiado corta para no divertirnos un poco. Así que aquí va algo que te sacará una sonrisa 😂\n\n¡Etiqueta a ese amigo que necesita ver esto! 👇\n\n#Humor #Diversión #RisasGarantizadas`
      };

      setContent(examples[aiTone as keyof typeof examples] || examples.profesional);
      setIsGenerating(false);
      toast.success("¡Contenido generado con IA!");
    }, 1500);
  };

  const improveText = () => {
    if (!content.trim()) {
      toast.error("Escribe algo de contenido primero para mejorarlo");
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setContent(content + "\n\n✨ ¡No te pierdas esta oportunidad!\n\n#NuevoContenido #Tendencias #Digital");
      setIsGenerating(false);
      toast.success("¡Texto mejorado!");
    }, 1000);
  };

  const generateHashtags = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const hashtags = "\n\n#Marketing #RedesSociales #Contenido #Digital #Estrategia #Engagement #Branding #SocialMedia #Growth #Success";
      setContent(content + hashtags);
      setIsGenerating(false);
      toast.success("¡Hashtags generados!");
    }, 1000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        toast.success("¡Imagen cargada! Ahora puedes editarla con IA");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        toast.success("¡Imagen cargada! Ahora puedes editarla con IA");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const applyAIFilter = (filterName: string) => {
    setIsGenerating(true);
    setSelectedFilter(filterName);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`¡Filtro "${filterName}" aplicado con IA!`);
    }, 1500);
  };

  const enhanceImage = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("¡Imagen mejorada con IA! Calidad optimizada");
    }, 2000);
  };

  const removeBackground = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("¡Fondo eliminado con IA!");
    }, 2500);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Crear Post</h1>
        <p className="text-gray-600 mt-1">Crea y programa contenido para tus redes sociales</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Content Generator - UPDATED */}
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <Label className="text-base text-purple-900">Crear con IA</Label>
            </div>
            
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="text">Texto con IA</TabsTrigger>
                <TabsTrigger value="image">Imagen con IA</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="ai-prompt" className="text-sm mb-2 block text-gray-700">
                    ¿Sobre qué quieres crear contenido?
                  </Label>
                  <Input
                    id="ai-prompt"
                    placeholder="Ej: Lanzamiento de producto, consejos de marketing, promoción especial..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="bg-white"
                  />
                </div>

                <div>
                  <Label htmlFor="ai-tone" className="text-sm mb-2 block text-gray-700">
                    Tono del mensaje
                  </Label>
                  <Select value={aiTone} onValueChange={setAiTone}>
                    <SelectTrigger id="ai-tone" className="bg-white">
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

                <div className="grid grid-cols-3 gap-2">
                  <Button
                    onClick={generateWithAI}
                    disabled={isGenerating}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    {isGenerating ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Wand2 className="w-4 h-4 mr-2" />
                    )}
                    Generar
                  </Button>
                  <Button
                    onClick={improveText}
                    disabled={isGenerating}
                    variant="outline"
                    className="border-purple-300"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Mejorar
                  </Button>
                  <Button
                    onClick={generateHashtags}
                    disabled={isGenerating}
                    variant="outline"
                    className="border-purple-300"
                  >
                    <Hash className="w-4 h-4 mr-2" />
                    Hashtags
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="image" className="space-y-4">
                {/* Image Upload Area */}
                <div>
                  <Label htmlFor="image-url" className="text-sm mb-2 block text-gray-700">
                    URL Pública de la Imagen (Facebook requiere links públicos para publicar)
                  </Label>
                  <Input
                    id="image-url"
                    placeholder="Ej: https://un-sitio.com/tu-foto.jpg"
                    value={publicImageUrl}
                    onChange={(e) => {
                      setPublicImageUrl(e.target.value);
                      if (e.target.value.startsWith("http")) {
                        setUploadedImage(e.target.value);
                      }
                    }}
                    className="bg-white mb-4"
                  />
                </div>
                {!uploadedImage ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center bg-white hover:border-purple-400 transition-colors cursor-pointer"
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <p className="text-gray-700 font-medium mb-1">
                      Arrastra tu imagen aquí
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      o haz clic para seleccionar
                    </p>
                    <Button variant="outline" className="border-purple-300" size="sm">
                      Seleccionar Imagen
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Image Preview */}
                    <div className="relative bg-white rounded-lg overflow-hidden border border-purple-200">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className={`w-full h-64 object-cover transition-all duration-500 ${
                          selectedFilter === 'vintage' ? 'sepia-[0.5] contrast-110' :
                          selectedFilter === 'vibrant' ? 'saturate-150 brightness-105' :
                          selectedFilter === 'bw' ? 'grayscale' :
                          selectedFilter === 'warm' ? 'sepia-[0.3] brightness-105' :
                          selectedFilter === 'cool' ? 'hue-rotate-180 saturate-120' :
                          ''
                        }`}
                      />
                      {isGenerating && (
                        <div className="absolute inset-0 bg-purple-900/50 flex items-center justify-center">
                          <div className="text-center">
                            <RefreshCw className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
                            <p className="text-white font-medium">Procesando con IA...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* AI Filters */}
                    <div>
                      <Label className="text-sm mb-2 block text-gray-700">
                        Filtros con IA
                      </Label>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[
                          { name: 'original', label: 'Original', icon: ImageIcon },
                          { name: 'vintage', label: 'Vintage', icon: Palette },
                          { name: 'vibrant', label: 'Vibrante', icon: Zap },
                          { name: 'bw', label: 'B&N', icon: Palette },
                          { name: 'warm', label: 'Cálido', icon: Palette },
                          { name: 'cool', label: 'Frío', icon: Palette },
                        ].map((filter) => (
                          <Button
                            key={filter.name}
                            onClick={() => applyAIFilter(filter.name)}
                            variant={selectedFilter === filter.name ? "default" : "outline"}
                            size="sm"
                            className={selectedFilter === filter.name ? "bg-purple-600" : "border-purple-300"}
                          >
                            <filter.icon className="w-3 h-3 mr-1" />
                            {filter.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* AI Enhancement Tools */}
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={enhanceImage}
                        disabled={isGenerating}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Mejorar Calidad
                      </Button>
                      <Button
                        onClick={removeBackground}
                        disabled={isGenerating}
                        variant="outline"
                        className="border-purple-300"
                      >
                        <Eraser className="w-4 h-4 mr-2" />
                        Quitar Fondo
                      </Button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-purple-200">
                      <Button
                        onClick={() => setUploadedImage(null)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        Cambiar Imagen
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-6">
            <Label className="text-base mb-3 block">Contenido del Post</Label>
            <Textarea
              placeholder="¿Qué quieres compartir con tu audiencia?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Añadir Imagen
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Emojis
                </Button>
              </div>
              <span className="text-sm text-gray-500">{content.length} caracteres</span>
            </div>
          </Card>

          {/* Schedule Options */}
          <Card className="p-6">
            <Label className="text-base mb-4 block">Programación</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="schedule-date" className="text-sm mb-2 block">Fecha</Label>
                <Input
                  id="schedule-date"
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="schedule-time" className="text-sm mb-2 block">Hora</Label>
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              onClick={handlePublishNow}
              disabled={isPublishing}
              className="bg-blue-600 hover:bg-blue-700 flex-1"
            >
              {isPublishing ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isPublishing ? "Publicando..." : "Publicar Ahora"}
            </Button>
            <Button 
              onClick={handleSchedule}
              variant="outline"
              className="flex-1"
            >
              <Clock className="w-4 h-4 mr-2" />
              Programar
            </Button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card className="p-6">
            <Label className="text-base mb-4 block">Plataformas</Label>
            <div className="space-y-3">
              {platforms.map((platform) => {
                const isSelected = selectedPlatforms.includes(platform.id);
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`${platform.color} p-2 rounded-lg`}>
                      <platform.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{platform.name}</span>
                    {isSelected && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Preview */}
          <Card className="p-6">
            <Label className="text-base mb-4 block">Vista Previa</Label>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[200px]">
              {content ? (
                <p className="text-gray-700 whitespace-pre-wrap">{content}</p>
              ) : (
                <p className="text-gray-400 text-center">
                  La vista previa aparecerá aquí
                </p>
              )}
            </div>
          </Card>

          {/* Best Times */}
          <Card className="p-6">
            <Label className="text-base mb-4 block">Mejores Horarios</Label>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Instagram</span>
                <span className="font-medium text-gray-900">10:00 - 14:00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Twitter</span>
                <span className="font-medium text-gray-900">12:00 - 15:00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Facebook</span>
                <span className="font-medium text-gray-900">09:00 - 13:00</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">LinkedIn</span>
                <span className="font-medium text-gray-900">08:00 - 10:00</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}