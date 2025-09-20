// src/app/api/inscricao/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from 'resend';

// Inicialize o cliente do Resend
const resend = new Resend(process.env.RESEND_API_KEY); // Chave de API do Resend

export async function POST(request: Request) {
  const formData = await request.json();

  // 1. Validação dos dados
  if (!formData.name || !formData.email || !formData.phone || !formData.role) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  try {
    // 2. Salvar no Supabase
    const { error: dbError } = await supabase.from("inscritos").insert([{
      name: formData.name,
      email: formData.email,
      role: formData.role,
      phone: formData.phone,
      profile: formData.profile || null,
    }]);

    if (dbError) {
      console.error("Erro ao salvar no Supabase:", dbError);
      return NextResponse.json({ error: "Erro ao salvar a inscrição" }, { status: 500 });
    }

    console.log("✅ Inscrição salva no Supabase:", formData);

    // 3. Enviar e-mail de confirmação via Resend
    try {
      const emailResponse = await resend.emails.send({
        from: 'no-reply@vdzacarias.com',
        to: formData.email,
        subject: '🎮 Confirmação de Inscrição – AIGH',
        html: `
          <h1>Olá, ${formData.name}!</h1>
          <p>✅ Sua inscrição para o <strong>Angola Indie Game Hub</strong> foi confirmada!</p>
          <p><strong>📅 28 de Setembro</strong> | ⏰ Das 14h às 16h30 (Portas abertas às 13h)</p>
          <p>Prepare-se para uma tarde cheia de networking, jogos e oportunidades.</p>
          <br/>
          <p>Nos vemos lá! 🚀</p>
        `,
      });

      if (emailResponse.error) {
        console.error("❌ Erro no envio da confirmação:", emailResponse.error);
      } else {
        console.log("📧 Confirmação enviada com sucesso:", emailResponse.data);
      }
    } catch (error) {
      console.error("🚨 Erro inesperado ao tentar enviar confirmação:", error);
    }

    // 4. Enviar e-mail de notificação para o admin via Resend
    try {
      const notifyResponse = await resend.emails.send({
        from: 'no-reply@vdzacarias.com',
        to: 'aigh@vdzacarias.com',
        subject: '📥 Novo inscrito no evento',
        html: `
          <h1>Novo inscrito!</h1>
          <ul>
            <li><strong>Nome:</strong> ${formData.name}</li>
            <li><strong>Email:</strong> ${formData.email}</li>
            <li><strong>Papel:</strong> ${formData.role}</li>
            <li><strong>Telefone:</strong> ${formData.phone}</li>
            <li><strong>Perfil/LinkedIn:</strong> ${formData.profile || "Não informado"}</li>
          </ul>
        `,
      });

      if (notifyResponse.error) {
        console.error("❌ Erro no envio da notificação:", notifyResponse.error);
      } else {
        console.log("📧 Notificação enviada com sucesso:", notifyResponse.data);
      }
    } catch (error) {
      console.error("🚨 Erro inesperado ao tentar enviar notificação:", error);
    }

    // ✅ Resposta final sempre sucesso para o usuário
    return NextResponse.json({ message: "Inscrição realizada com sucesso" }, { status: 200 });

  } catch (err) {
    console.error("Erro no processamento da inscrição:", err);
    return NextResponse.json({ error: "Ocorreu um erro no servidor" }, { status: 500 });
  }
}
