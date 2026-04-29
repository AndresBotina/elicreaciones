import QRCode from 'qrcode';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  // Obtenemos el texto de la URL, si no hay, usamos la web por defecto
  const text = url.searchParams.get('text') || 'https://elicreaciones.com';
  
  try {
    // Generamos el QR como un Buffer de imagen PNG
    // Usamos una resolución alta (width: 600) para asegurar buena calidad al imprimir
    const qrBuffer = await QRCode.toBuffer(text, {
      type: 'png',
      width: 600,
      margin: 2,
      errorCorrectionLevel: 'H', // Alta capacidad de recuperación (mejor para impresión)
      color: {
        dark: '#000000', // Puntos negros
        light: '#ffffff' // Fondo blanco
      }
    });
    
    // Retornamos la respuesta con el Content-Type correcto para que el navegador lo vea como imagen
    return new Response(qrBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable' // Cache para mejorar rendimiento
      }
    });
  } catch (err) {
    console.error('Error generando QR:', err);
    return new Response(
      JSON.stringify({ error: 'No se pudo generar el código QR' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
