import React from 'react';
import { supabase } from '@/lib/supabase';
import DashboardClient from '@/components/DashboardClient';
import Link from 'next/link'; // Importe o componente Link
import Image from 'next/image'; // Importe o componente Image
import Footer from '../(components)/footer';

async function getSubscribers() {
    const { data, error } = await supabase.from('inscritos').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error("Erro ao buscar inscritos:", error);
        return { subscribers: [], error: "Erro ao carregar os dados." };
    }

    return { subscribers: data, error: null };
}

export default async function DashboardPage() {
    const { subscribers, error } = await getSubscribers();

    return (
        <div className="p-6 md:p-10">
            {/* Logo no topo que leva para a página inicial */}
            <Link href="/" className="inline-block mb-8">
                <Image
                    src="/logo.png"
                    alt="Logo da Empresa"
                    width={120} // Ajuste a largura conforme necessário
                    height={40} // Ajuste a altura conforme necessário
                    className="cursor-pointer"
                />
            </Link>

            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-[#FF5C00]">Dashboard de Inscrições</h1>
                <p className="mt-2 text-lg text-gray-400">Visão geral dos participantes do evento.</p>
            </header>

            {error && <div className="text-center text-red-500">{error}</div>}

            <DashboardClient subscribers={subscribers} />

            <Footer />
        </div>
    );
}