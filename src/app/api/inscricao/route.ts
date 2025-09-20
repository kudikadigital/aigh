// src/app/api/inscricao/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    // 3. Tentar enviar e-mail de confirmação
    try {
      const confirmRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY as string,
        },
        body: JSON.stringify({
          sender: { name: "AIGH", email: "no-reply@vdzacarias.com" },
          to: [{ email: formData.email, name: formData.name }],
          subject: "🎮 Confirmação de Inscrição – AIGH",
          htmlContent: `
            <h1>Olá, ${formData.name}!</h1>
            <p>✅ Sua inscrição para o <strong>Angola Indie Game Hub</strong> foi confirmada!</p>
            <p><strong>📅 28 de Setembro</strong> | ⏰ Das 14h às 16h30 (Portas abertas às 13h)</p>
            <p>Prepare-se para uma tarde cheia de networking, jogos e oportunidades.</p>
            <br/>
            <p>Nos vemos lá! 🚀</p>
          `,
        }),
      });

      const confirmJson = await confirmRes.json();
      if (!confirmRes.ok) {
        console.error("❌ Erro no envio da confirmação:", confirmJson);
      } else {
        console.log("📧 Confirmação enviada com sucesso:", confirmJson);
      }
    } catch (error) {
      console.error("🚨 Erro inesperado ao tentar enviar confirmação:", error);
    }

    // 4. Tentar enviar e-mail de notificação para o admin
    try {
      const notifyRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY as string,
        },
        body: JSON.stringify({
          sender: { name: "Notificação AIGH", email: "no-reply@vdzacarias.com" },
          to: [{ email: "aigh@vdzacarias.com", name: "Admin" }],
          subject: "📥 Novo inscrito no evento",
          htmlContent: `
            <h1>Novo inscrito!</h1>
            <ul>
              <li><strong>Nome:</strong> ${formData.name}</li>
              <li><strong>Email:</strong> ${formData.email}</li>
              <li><strong>Papel:</strong> ${formData.role}</li>
              <li><strong>Telefone:</strong> ${formData.phone}</li>
              <li><strong>Perfil/LinkedIn:</strong> ${formData.profile || "Não informado"}</li>
            </ul>
          `,
        }),
      });

      const notifyJson = await notifyRes.json();
      if (!notifyRes.ok) {
        console.error("❌ Erro no envio da notificação:", notifyJson);
      } else {
        console.log("📧 Notificação enviada com sucesso:", notifyJson);
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
