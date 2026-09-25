export const env = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000/api',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
  maptilerKey: process.env.NEXT_PUBLIC_MAPTILER_KEY ?? '',
  groqKey: process.env.NEXT_PUBLIC_GROQ_API_KEY ?? '',
  geminiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? '',
};
