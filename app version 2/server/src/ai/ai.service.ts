import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);

  async generateCopy(prompt: string, tone: string): Promise<string> {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      this.logger.warn('OPENROUTER_API_KEY no encontrada. Utilizando fallback local de IA.');
      return this.getLocalCopyFallback(prompt, tone);
    }

    try {
      this.logger.log(`Solicitando generación de copy a OpenRouter para el prompt: "${prompt}" con tono: "${tone}"`);
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'meta-llama/llama-3-8b-instruct:free', // Usar el modelo gratuito por defecto si es posible
          messages: [
            {
              role: 'system',
              content: 'Eres un copywriter experto en marketing digital y redes sociales. Genera copys persuasivos, con excelente uso de emojis, hashtags estratégicos y llamados a la acción claros. Retorna SOLAMENTE el contenido del post sin introducciones, metatexto ni explicaciones.'
            },
            {
              role: 'user',
              content: `Escribe una publicación sobre el siguiente tema: "${prompt}". Usa un tono "${tone}". Asegúrate de estructurarlo con párrafos legibles, viñetas si es necesario, emojis adecuados y hashtags relevantes.`
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'SocialHub',
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10s timeout
        }
      );

      const generatedText = response.data?.choices?.[0]?.message?.content;
      if (generatedText) {
        return generatedText.trim();
      }

      throw new Error('Respuesta vacía de OpenRouter');
    } catch (error) {
      this.logger.error('Error al llamar a OpenRouter. Iniciando fallback de generación local.', error.response?.data || error.message);
      return this.getLocalCopyFallback(prompt, tone);
    }
  }

  async generateImage(prompt: string): Promise<string> {
    this.logger.log(`Generando imagen IA de alta calidad para el prompt: "${prompt}"`);
    
    const cleanPrompt = encodeURIComponent(prompt.trim());
    const seed = Math.floor(Math.random() * 999999);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=1080&height=1080&nologo=true&seed=${seed}&enhance=true`;

    try {
      this.logger.log(`Descargando imagen generada desde Pollinations AI...`);
      const response = await axios.get(pollinationsUrl, { responseType: 'arraybuffer', timeout: 25000 });
      const buffer = Buffer.from(response.data);

      const filename = `image_${Date.now()}_${seed}.png`;
      const uploadDir = path.join(process.cwd(), 'uploads');
      const filePath = path.join(uploadDir, filename);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(filePath, buffer);
      this.logger.log(`Imagen IA guardada localmente en: ${filePath}`);

      const staticUrl = process.env.RAILWAY_STATIC_URL;
      const baseUrl = staticUrl
        ? `https://${staticUrl}`
        : process.env.BACKEND_URL || 'http://localhost:3000';

      return `${baseUrl}/instagram/uploads/${filename}`;
    } catch (error) {
      this.logger.error('Error al descargar o guardar la imagen de Pollinations AI, utilizando fallback estético.', error.message);
      // Fallback a Unsplash en caso de falla extrema
      return `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1080&auto=format&fit=crop&q=80&sig=${seed}`;
    }
  }

  private getLocalCopyFallback(prompt: string, tone: string): string {
    const capitalizedPrompt = prompt.charAt(0).toUpperCase() + prompt.slice(1);
    
    const templates: Record<string, string> = {
      profesional: `📊 **${capitalizedPrompt}**\n\nEn el ecosistema empresarial dinámico de hoy, la innovación no es un lujo, sino una necesidad operativa. Desarrollar estrategias robustas alineadas con este concepto es fundamental para asegurar la sostenibilidad y la ventaja competitiva de cualquier organización.\n\nAquí 3 pilares clave para liderar el cambio:\n1️⃣ **Adaptabilidad ágil:** Ajustar los procesos internos a las demandas del mercado en tiempo real.\n2️⃣ **Toma de decisiones guiada por datos:** Minimizar la incertidumbre basando cada paso en métricas claras.\n3️⃣ **Capacitación continua:** Fomentar una cultura corporativa de crecimiento intelectual.\n\n¿Cómo está abordando tu equipo estos desafíos de cara al próximo trimestre? Conversemos en los comentarios. 👇💼\n\n#Liderazgo #Estrategia #InnovaciónCorporativa #DataMining #CrecimientoProfesional`,
      
      casual: `¡Hola comunidad! 👋 Hoy queremos hablar sobre algo super interesante: **${capitalizedPrompt}** ✨\n\nA veces nos complicamos la vida buscando la fórmula mágica, cuando en realidad lo que mejor funciona es mantener las cosas simples, reales y consistentes. Al final, lo que verdaderamente conecta es compartir experiencias que aporten valor real día a día. \n\nCuéntanos: ¿cómo manejas esto en tu rutina diaria? ¡Nos encantaría leerte y armar debate aquí abajo! 😍👇\n\n#Vibes #Comunidad #Emprendimiento #MarketingDigital #Growth`,
      
      inspiracional: `✨ **${capitalizedPrompt}** ✨\n\n"El camino al éxito no es una línea recta; es una serie de aprendizajes, adaptaciones y, sobre todo, resiliencia." 🌟\n\nCada meta que te propones requiere esfuerzo constante, paciencia y la convicción absoluta de que tu potencial no tiene límites. Cree en el proceso, confía en tu talento y recuerda que los mayores logros nacen de dar el primer paso con valentía.\n\nGuarda este post como un recordatorio para tu día a día: ¡tú puedes con esto y más! 💪🔥\n\n#Motivación #Inspiración #Resiliencia #Éxito #MentalidadDeCrecimiento`,
      
      divertido: `😂 **${capitalizedPrompt}**... ¿Quién más se siente identificado?\n\nExpectativa: Todo controlado, fluyendo de manera perfecta y con resultados inmediatos. 😎\nRealidad: Tres tazas de café después, buscando tutoriales en internet a las 2 AM y rezando para que el algoritmo nos trate con amor. 🤯☕\n\nPero hey, lo importante es no perder el sentido del humor (y seguir intentándolo con toda la actitud). \n\nMenciona en los comentarios a ese colega que está exactamente en este mood hoy. ¡No los dejes solos! 👇👇\n\n#Humor #MarketingHumor #Realidad #TrabajoSi #CaféParaSobrevivir`
    };

    return templates[tone.toLowerCase()] || templates.profesional;
  }
}
