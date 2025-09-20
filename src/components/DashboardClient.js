"use client";

import { useMemo } from "react";
import { Users, User } from "lucide-react";

export default function DashboardClient({ subscribers }) {
  const totalSubscribers = subscribers.length;

  const rolesCount = useMemo(() => {
    return subscribers.reduce((acc, curr) => {
      acc[curr.role] = (acc[curr.role] || 0) + 1;
      return acc;
    }, {});
  }, [subscribers]);

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
