import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Importe o cliente Supabase
import { Resend } from 'resend';

// Inicialize o Resend com a sua API Key
const resend = new Resend(process.env.RESEND_API_KEY);

// Função para enviar o e-mail de confirmação ao inscrito
async function sendConfirmationEmail(name, email) {
    await resend.emails.send({
        from: 'Seu Evento <kudika.digital>', // Use o domínio verificado
        to: [email],
        subject: `Confirmação de Inscrição para o evento!`,
        html: `
            <h1>Olá, ${name}!</h1>
            <p>Sua inscrição para o evento foi confirmada com sucesso.</p>
            <p>Fique de olho no seu e-mail, em breve enviaremos mais detalhes sobre o evento.</p>
            <br>
            <p>Até lá!</p>
            <p>A equipe do seu evento</p>
        `,
    });
}

// Função para notificar a empresa sobre o novo inscrito
async function sendNotificationEmail(formData) {
    await resend.emails.send({
        from: 'Notificações <kudika.digital>', // Use o domínio verificado
        to: ['kudikadigital@gmail.com'], // Coloque o e-mail da empresa aqui
        subject: `Novo Inscrito no Evento`,
        html: `
            <h1>Novo Inscrito!</h1>
            <p>Um novo participante se inscreveu no evento com as seguintes informações:</p>
            <ul>
                <li><strong>Nome:</strong> ${formData.name}</li>
                <li><strong>Email:</strong> ${formData.email}</li>
                <li><strong>Papel:</strong> ${formData.role}</li>
                <li><strong>Perfil/LinkedIn:</strong> ${formData.profile || 'Não informado'}</li>
            </ul>
        `,
    });
}

export async function POST(request) {
    const formData = await request.json();

    // 1. Validar os dados
    if (!formData.name || !formData.email || !formData.role) {
        return NextResponse.json({ error: 'Dados incompletos' }, { status: 400 });
    }

    try {
        // 2. Salvar no Supabase
        const { error: dbError } = await supabase.from('inscritos').insert([
            {
                name: formData.name,
                email: formData.email,
                role: formData.role,
                profile: formData.profile,
            },
        ]);

        if (dbError) {
            console.error("Erro ao salvar no Supabase:", dbError);
            return NextResponse.json({ error: 'Erro ao salvar a inscrição' }, { status: 500 });
        }

        // 3. Enviar e-mails transacionais
        // Enviar e-mail para o inscrito
        await sendConfirmationEmail(formData.name, formData.email);

        // Enviar e-mail de notificação para a empresa
        await sendNotificationEmail(formData);

        return NextResponse.json({ message: 'Inscrição realizada com sucesso' }, { status: 200 });

    } catch (err) {
        console.error("Erro no processamento da inscrição:", err);
        return NextResponse.json({ error: 'Ocorreu um erro no servidor' }, { status: 500 });
    }
}