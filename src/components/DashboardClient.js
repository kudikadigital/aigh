"use client";

import { useMemo } from 'react';
import { Mail, Users, User, Link } from 'lucide-react';

export default function DashboardClient({ subscribers }) {
    
    // Contagem total
    const totalSubscribers = subscribers.length;

    // Contagem por 'role'
    const rolesCount = useMemo(() => {
        return subscribers.reduce((acc, curr) => {
            acc[curr.role] = (acc[curr.role] || 0) + 1;
            return acc;
        }, {});
    }, [subscribers]);

    return (
        <main>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card de contagem total */}
                <div className="bg-[#1a1a1a] rounded-lg p-6 shadow-md border border-[#FF5C00]/70">
                    <div className="flex items-center space-x-4">
                        <div className="bg-[#FF5C00] p-3 rounded-full">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-gray-400">Total de Inscritos</p>
                            <h2 className="text-3xl font-bold text-white">{totalSubscribers}</h2>
                        </div>
                    </div>
                </div>

                {/* Cards de contagem por papel */}
                {Object.entries(rolesCount).map(([role, count]) => (
                    <div key={role} className="bg-[#1a1a1a] rounded-lg p-6 shadow-md border border-gray-600">
                        <div className="flex items-center space-x-4">
                            <div className="bg-gray-700 p-3 rounded-full">
                                <User size={24} />
                            </div>
                            <div>
                                <p className="text-gray-400">{role}</p>
                                <h2 className="text-3xl font-bold text-white">{count}</h2>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Tabela de inscritos */}
            <section className="bg-[#1a1a1a] rounded-lg p-6 shadow-md border border-[#FF5C00]/70">
                <h3 className="text-xl font-semibold mb-4 text-white">Detalhes dos Inscritos</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-600 text-gray-400">
                                <th className="p-3">Nome</th>
                                <th className="p-3 hidden sm:table-cell">Email</th>
                                <th className="p-3">Papel</th>
                                <th className="p-3 hidden sm:table-cell">Perfil</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((subscriber) => (
                                <tr key={subscriber.id} className="border-b border-gray-700 hover:bg-[#232323]">
                                    <td className="p-3">{subscriber.name}</td>
                                    <td className="p-3 hidden sm:table-cell">{subscriber.email}</td>
                                    <td className="p-3">{subscriber.role}</td>
                                    <td className="p-3 hidden sm:table-cell">
                                        {subscriber.profile && (
                                            <a href={subscriber.profile} target="_blank" rel="noopener noreferrer" className="text-[#FF5C00] hover:underline flex items-center gap-1">
                                                Ver Perfil <Link size={16} />
                                            </a>
                                        )}
                                        {!subscriber.profile && "N/A"}
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