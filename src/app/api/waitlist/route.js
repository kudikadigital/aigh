import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, role, type } = body;

    // Validação básica
    if (!name || !email || !role) {
      return new Response(
        JSON.stringify({ error: 'Nome, email e perfil são obrigatórios' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Inserir na tabela de lista de espera
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          name,
          email,
          phone,
          role,
          type: type || 'waitlist',
          created_at: new Date().toISOString(),
        }
      ])
      .select();

    if (error) {
      console.error('Erro ao inserir na lista de espera:', error);
      
      // Verificar se é erro de duplicação
      if (error.code === '23505') {
        return new Response(
          JSON.stringify({ error: 'Este email já está na lista de espera' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Erro ao salvar na lista de espera' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Adicionado à lista de espera com sucesso',
        data 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro inesperado na API:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}