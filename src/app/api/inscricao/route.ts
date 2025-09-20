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
    const { error: dbError } = await supabase.from("inscritos").insert([
      {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        profile: formData.profile || null,
      },
    ]);

    if (dbError) {
      console.error("Erro ao salvar no Supabase:", dbError);
      return NextResponse.json(
        { error: "Erro ao salvar a inscrição" },
        { status: 500 }
      );
    }

    console.log("✅ Inscrição salva no Supabase:", formData);

    // Função auxiliar para enviar e-mail com debug completo
    async function sendEmail(
      toEmail: string,
      toName: string,
      subject: string,
      htmlContent: string
    ) {
      try {
        const res = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            "api-key": process.env.BREVO_API_KEY as string,
          },
          body: JSON.stringify({
            sender: { name: "AIGH", email: "no-reply@vdzacarias.com" }, // deve estar verificado
            to: [{ email: toEmail, name: toName }],
            subject,
            htmlContent,
          }),
        });

        const text = await res.text(); // pegar texto completo da resposta
        console.log(`📧 Resposta Brevo para ${toEmail}:`, text);

        if (!res.ok) {
          console.error(`❌ Erro no envio para ${toEmail}`);
        } else {
          console.log(`📧 E-mail enviado com sucesso para ${toEmail}`);
        }
      } catch (err) {
        console.error(
          `🚨 Erro inesperado ao enviar e-mail para ${toEmail}:`,
          err
        );
      }
    }

    // 3. Enviar confirmação para o usuário
    // 3. Enviar confirmação para o usuário
    await sendEmail(
      formData.email,
      formData.name,
      "🎮 Seu Ingresso Confirmado – AIGH",
      `
  <div style="font-family: Arial, sans-serif; background-color:#0f0f0f; color:#fff; padding:0; margin:0;">
    <!-- Banner Topo -->
    <div style="background:#FF5C00; padding:20px; text-align:center;">
      <h1 style="margin:0; font-size:28px; color:#fff;">Angola Indie Game Hub</h1>
      <p style="margin:0; font-size:16px;">Ingresso Confirmado!</p>
    </div>

    <!-- Corpo -->
    <div style="padding:30px; text-align:center;">
      <p style="font-size:18px;">Olá, <strong>${formData.name}</strong>!</p>
      <p style="font-size:16px; margin:10px 0;">✅ Sua inscrição foi confirmada para o <strong>Angola Indie Game Hub</strong>.</p>
      <p style="font-size:16px; margin:10px 0;"><strong>📅 Data:</strong> 28 de Setembro<br/><strong>⏰ Horário:</strong> 14h às 16h30 (Portas abertas às 13h)</p>
      <p style="font-size:16px; margin:20px 0;">Prepare-se para uma tarde cheia de networking, jogos e oportunidades.</p>

      <!-- "Ingresso" destaque -->
      <div style="border:2px dashed #FF5C00; padding:20px; margin:20px 0; border-radius:10px;">
        <h2 style="margin:0; color:#FF5C00;">🎟️ Ingresso para: ${formData.name}</h2>
        <p style="margin:5px 0; color:#fff;">Papel: ${formData.role}</p>
        <p style="margin:5px 0; color:#fff;">Telefone: ${formData.phone}</p>
      </div>

      <p style="font-size:16px;">Nos vemos lá! 🚀</p>
    </div>

    <!-- Rodapé -->
    <div style="background:#1a1a1a; text-align:center; padding:15px; font-size:12px; color:#888;">
      Powered by Vd Zacarias
    </div>
  </div>
  `
    );

    // 4. Enviar notificação para admin
    await sendEmail(
      "aigh@vdzacarias.com",
      "Admin",
      "📥 Novo inscrito no evento",
      `
        <h1>Novo inscrito!</h1>
        <ul>
          <li><strong>Nome:</strong> ${formData.name}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Papel:</strong> ${formData.role}</li>
          <li><strong>Telefone:</strong> ${formData.phone}</li>
          <li><strong>Perfil/LinkedIn:</strong> ${
            formData.profile || "Não informado"
          }</li>
        </ul>
      `
    );

    return NextResponse.json(
      { message: "Inscrição realizada com sucesso" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro no processamento da inscrição:", err);
    return NextResponse.json(
      { error: "Ocorreu um erro no servidor" },
      { status: 500 }
    );
  }
}
