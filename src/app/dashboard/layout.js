import React from 'react';

// Seus imports de CSS ou fontes podem vir aqui
// Por exemplo:
// import localFont from '@next/font/local';
// import '@/app/globals.css';

export const metadata = {
    title: 'Dashboard | Meu Evento',
    description: 'Painel de controle para visualização de inscrições.',
};

export default function DashboardLayout({ children }) {
    return (
        <html lang="pt-br">
            <body className="bg-black text-white">
                {/* Aqui você pode adicionar um header ou sidebar específicos do dashboard */}
                {children}
            </body>
        </html>
    );
}