"use client";

import Countdown from "@/components/Countdown"; // Importe aqui seu componente de contagem regressiva
import ButtonCta from "../ui/button-cta";

export default function CTAWithCountdown() {
  return (
    <section className="bg-black text-white py-16 px-6 md:px-10 flex flex-col items-center space-y-8">
      {/* Faixa de Destaque */}
      <div className="bg-[#FF5C00] rounded-xl w-full max-w-5xl p-8 flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        {/* Títulos e informações */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl sm:text-4xl font-mono font-bold">Faça Parte da História</h2>
          <h3 className="text-xl sm:text-2xl font-mono font-semibold">Inscreva-se Agora</h3>
          <p className="text-white/90 text-sm sm:text-base">
            28 de Setembro | Centro de Ciências de Luanda
          </p>
        </div>

        {/* Botão CTA */}
<ButtonCta />
      </div>

      {/* Aviso de inscrição */}
      <p className="text-[#FF5C00] font-medium text-sm sm:text-base">
        Gratuita (Inscrição Obrigatória)
      </p>

      {/* Contador Regressivo */}
      <div className="w-full max-w-5xl">
        <Countdown />
      </div>
    </section>
  );
}
