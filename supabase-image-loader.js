export default function supabaseLoader({ src, quality }) {
    return `https://pjiybecehatvdpefgnck.supabase.co/storage/v1/object/public/${src}?quality=${
      quality || 76
    }`
  }