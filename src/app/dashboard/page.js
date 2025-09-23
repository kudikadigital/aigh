import React from 'react';
import { supabase } from '@/lib/supabase';
import DashboardClient from '@/components/DashboardClient';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../(components)/footer';

// Tipagem para os dados do inscrito
/**
 * @typedef {Object} Subscriber
 * @property {string} id
 * @property {string} nome
 * @property {string} email
 * @property {string} created_at
 * // Adicione outros campos conforme sua tabela
 */

async function getSubscribers() {
  try {
    const { data, error } = await supabase
      .from('inscritos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Erro ao buscar inscritos:", error);
      return { subscribers: [], error: "Erro ao carregar os dados." };
    }

    return { subscribers: data || [], error: null };
  } catch (error) {
    console.error("Erro inesperado:", error);
    return { subscribers: [], error: "Erro interno do servidor." };
  }
}

export default async function DashboardPage() {
  const { subscribers, error } = await getSubscribers();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header com logo e navegação */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-12">
          <Link 
            href="/" 
            className="group transition-all duration-300 hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="Logo da Empresa"
              width={140}
              height={50}
              className="cursor-pointer drop-shadow-lg"
              priority
            />
          </Link>
        </header>

        {/* Estado de erro */}
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <p className="text-red-300 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Conteúdo principal */}
        <main className="mb-16">
          <DashboardClient subscribers={subscribers} />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}