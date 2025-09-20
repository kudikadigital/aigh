"use client";

import { useEffect, useState, useMemo } from "react";
import { Users, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function DashboardClient() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Buscar inscritos do Supabase
  useEffect(() => {
    async function fetchSubscribers() {
      try {
        const { data, error } = await supabase
          .from("inscritos")
          .select("*")
          .order("id", { ascending: true });

        if (error) {
          console.error("Erro ao buscar inscritos:", error);
        } else {
          setSubscribers(data);
        }
      } catch (err) {
        console.error("Erro inesperado ao buscar inscritos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSubscribers();
  }, []);

  const totalSubscribers = subscribers.length;

  const rolesCount = useMemo(() => {
    return subscribers.reduce((acc, curr) => {
      acc[curr.role] = (acc[curr.role] || 0) + 1;
      return acc;
    }, {});
  }, [subscribers]);

  // Skeleton card
  const SkeletonCard = () => (
    <div className="bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-700 h-40 animate-pulse flex flex-col">
      <div className="h-1 bg-gray-600 rounded-t-xl"></div>
      <div className="flex-1 p-6 flex items-center gap-4">
        <div className="bg-gray-700 p-4 rounded-full w-12 h-12"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
        </div>
        <div className="h-6 bg-gray-700 rounded w-12"></div>
      </div>
    </div>
  );

  // Skeleton row da tabela
  const SkeletonRow = () => (
    <tr className="border-b border-gray-700 animate-pulse">
      <td className="p-3"><div className="h-4 bg-gray-700 rounded w-24"></div></td>
      <td className="p-3 hidden sm:table-cell"><div className="h-4 bg-gray-700 rounded w-36"></div></td>
      <td className="p-3"><div className="h-4 bg-gray-700 rounded w-20"></div></td>
      <td className="p-3 hidden sm:table-cell"><div className="h-4 bg-gray-700 rounded w-24"></div></td>
      <td className="p-3 hidden sm:table-cell"><div className="h-4 bg-gray-700 rounded w-28"></div></td>
    </tr>
  );

  if (loading) {
    return (
      <main className="p-6 space-y-8">
        {/* Skeleton cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </section>

        {/* Skeleton tabela */}
        <section className="bg-[#1a1a1a] rounded-xl p-6 shadow-xl border border-[#FF5C00]/70">
          <h3 className="text-xl font-semibold mb-4 text-white">
            Detalhes dos Inscritos
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="border-b border-gray-600 text-gray-400 uppercase text-sm">
                  <th className="p-3">Nome</th>
                  <th className="p-3 hidden sm:table-cell">Email</th>
                  <th className="p-3">Papel</th>
                  <th className="p-3 hidden sm:table-cell">Telefone</th>
                  <th className="p-3 hidden sm:table-cell">Perfil</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-8">
      {/* Top Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Total Inscritos */}
        <div className="bg-[#1a1a1a] rounded-xl shadow-xl border border-[#FF5C00]/70 flex flex-col h-40 hover:scale-105 transition-transform">
          <div className="h-1 bg-[#FF5C00] rounded-t-xl"></div>
          <div className="flex items-center gap-4 p-6 flex-1">
            <div className="bg-[#FF5C00] p-4 rounded-full flex items-center justify-center">
              <Users size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-gray-400 uppercase tracking-wide text-sm">
                Total de Inscritos
              </p>
              <h2 className="text-4xl font-bold text-white">{totalSubscribers}</h2>
            </div>
            <span className="bg-[#FF5C00]/20 text-[#FF5C00] px-3 py-1 rounded-full font-semibold text-sm">
              {totalSubscribers}
            </span>
          </div>
        </div>

        {/* Cards por papel */}
        {Object.entries(rolesCount).map(([role, count]) => (
          <div
            key={role}
            className="bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-600 flex flex-col h-40 hover:scale-105 transition-transform"
          >
            <div className="h-1 bg-gray-600 rounded-t-xl"></div>
            <div className="flex items-center gap-4 p-6 flex-1">
              <div className="bg-gray-700 p-4 rounded-full flex items-center justify-center">
                <User size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-400 uppercase tracking-wide text-sm">{role}</p>
                <h2 className="text-4xl font-bold text-white">{count}</h2>
              </div>
              <span className="bg-gray-700/30 text-gray-300 px-3 py-1 rounded-full font-semibold text-sm">
                {count}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Tabela de inscritos */}
      <section className="bg-[#1a1a1a] rounded-xl p-6 shadow-xl border border-[#FF5C00]/70">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Detalhes dos Inscritos
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="border-b border-gray-600 text-gray-400 uppercase text-sm">
                <th className="p-3">Nome</th>
                <th className="p-3 hidden sm:table-cell">Email</th>
                <th className="p-3">Papel</th>
                <th className="p-3 hidden sm:table-cell">Telefone</th>
                <th className="p-3 hidden sm:table-cell">Perfil</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr
                  key={subscriber.id}
                  className="border-b border-gray-700 hover:bg-[#232323] transition-colors"
                >
                  <td className="p-3">{subscriber.name}</td>
                  <td className="p-3 hidden sm:table-cell">{subscriber.email}</td>
                  <td className="p-3">{subscriber.role}</td>
                  <td className="p-3 hidden sm:table-cell">{subscriber.phone}</td>
                  <td className="p-3 hidden sm:table-cell">
                    {subscriber.profile ? (
                      <a
                        href={subscriber.profile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#FF5C00] hover:underline flex items-center gap-1"
                      >
                        Ver Perfil
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
