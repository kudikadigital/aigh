"use client";
import { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import ButtonCta from "@/components/ui/button-cta";
import Countdown from "@/components/Countdown";

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(true);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      {videoLoaded && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-10"
          onError={() => setVideoLoaded(false)}
        >
          <source src="/videos/flash-bg.mp4" type="video/mp4" />
        </video>
      )}

      {/* Fallback Image */}
      {!videoLoaded && (
        <Image
          src="/images/flash-bg.jpg"
          alt="Background"
          fill
          className="object-cover object-center -z-10"
          priority
        />
      )}

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-6">
        {/* Tag / Badge */}
        <div
          className="
          inline-flex items-center gap-2
          backdrop-blur-md bg-[#FF6D0B]/30 
          border border-[#FF6D0B]/50 rounded-full shadow-md
          px-4 py-2
        "
        >
          <Sparkles size={16} className="text-[#FF6D0B]" />
          <span className="text-white font-medium">
            Angola Indie Game Hub
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight text-white max-w-3xl">
          O Raio que profissionaliza <br />
          o <span className="text-[#FF6D0B]">futuro dos videojogos</span> <br />
          em Angola e África.
        </h1>

        {/* Descrição */}
        <p className="text-white/90 max-w-2xl text-base sm:text-lg">
          Bem-vindo ao nascimento de uma nova era para os videojogos em Angola.
          No dia 28 de Setembro, acontece o primeiro grande encontro da AIGH,
          reunindo criadores, estúdios indie, jogadores, professores,
          investidores e patrocinadores.
        </p>

        {/* CTA */}
        <ButtonCta />

        {/* Countdown + Data + Divisor */}
        <div className="flex flex-col items-center gap-3">
          {/* Countdown centralizado */}
          <Countdown />

          {/* Data */}
          <span className="text-white text-lg font-medium">
            28 de Setembro
          </span>

          {/* Divisor */}
          <div className="w-16 h-[2px] bg-[#FF6D0B] rounded-full" />
        </div>
      </div>
    </section>
  );
}
