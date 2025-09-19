// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

// Carrega as variáveis de ambiente com o Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verifica se as variáveis de ambiente estão definidas
if (!supabaseUrl || !supabaseKey) {
  throw new Error("As variáveis de ambiente do Supabase não estão configuradas.");
}

// Cria e exporta o cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);