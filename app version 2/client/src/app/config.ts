let rawUrl = (import.meta.env.VITE_API_URL as string) || "http://localhost:3000";

// Eliminar comillas y barras diagonales finales si las hay
rawUrl = rawUrl.replace(/['"]/g, '').trim().replace(/\/+$/, '');

if (rawUrl && !rawUrl.startsWith("http://") && !rawUrl.startsWith("https://")) {
  if (rawUrl.includes("localhost") || rawUrl.includes("127.0.0.1")) {
    rawUrl = `http://${rawUrl}`;
  } else {
    rawUrl = `https://${rawUrl}`;
  }
}

export const API_BASE_URL = rawUrl;

