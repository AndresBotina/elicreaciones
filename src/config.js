export const CONFIG = {
  whatsapp: {
    number: '+573142501765',
    defaultMessage: 'Hola! Vi tu página web y me interesa saber más sobre tus productos.',
    customMessage: 'Hola! Me gustaría encargar una pieza personalizada. ¿Me puedes dar más información?',
  },
  social: {
    instagram: 'https://www.instagram.com/eli_creaciones94',
    facebook: 'https://web.facebook.com/people/Elizabeth-Botina/pfbid0CQonRYcwi6HKgisZoQ6KzZjrR79KkFsqdUpvPPyiWUH5hc2QMnMsG2dRa4ruBHGDl/?rdid=0Yv2AMs1hcaNA73Y&share_url=https%3A%2F%2Fweb.facebook.com%2Fshare%2F18N7jiXHz9%2F%3F_rdc%3D1%26_rdr',
    tiktok: 'https://www.tiktok.com/@eli_creaciones0?_r=1&_t=ZS-95tmYQRlYOu',
  },
  blob: {
    // Las fotos se suben desde el dashboard de Vercel o con la CLI de Vercel
    // El token se configura en .env como BLOB_READ_WRITE_TOKEN (solo para subir — no se usa en el frontend)
    // Las URLs resultantes tienen el formato: https://[id].public.blob.vercel-storage.com/[archivo]
    storeId: 'elicreaciones',
  },
  site: {
    name: 'Eli Creaciones',
    description: 'Eli Creaciones — Piezas únicas a crochet hechas a mano en Mocoa, Colombia. Bolsos, llaveros, blusas, moñas y más. Envíos a todo el país.',
    url: 'https://elicreaciones.vercel.app',
  },
};
