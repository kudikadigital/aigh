"use client";

import { useState } from "react";
import Image from "next/image";
import { Zap } from "lucide-react";
import { motion } from "framer-motion";
import ButtonCta from "@/components/ui/button-cta";
import Countdown from "@/components/Countdown";
import PoweredBy from "@/components/PoweredBy";

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

      {/* Overlay para contraste geral */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      {/* Fade preto no bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none -z-0" />

      {/* Conteúdo principal */}
      <motion.div
        className="max-w-5xl mx-auto px-4 text-center flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Tag / Badge */}
        <motion.div
          className="inline-flex items-center gap-2 backdrop-blur-md bg-[#FF6D0B]/30 border border-[#FF6D0B]/50 rounded-full shadow-md px-4 py-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Zap size={16} className="text-[#FF6D0B]" />
          <span className="text-white font-medium">Angola Indie Game Hub</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-5xl font-bold leading-tight text-white max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
        >
          O Raio que profissionaliza <br />o{" "}
          <span className="text-[#FF6D0B]">futuro dos videojogos</span> <br />
          em Angola.
        </motion.h1>

        {/* Descrição */}
        <motion.p
          className="text-white/90 max-w-2xl text-base sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
        >
          Bem-vindo ao nascimento de uma nova era para os videojogos em Angola.
          No dia 28 de Setembro, acontece o primeiro grande encontro da AIGH,
          reunindo criadores, estúdios indie, jogadores, professores,
          investidores e patrocinadores.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        >
          <ButtonCta />
        </motion.div>

        {/* Countdown + Data + Divisor */}
        <motion.div
          className="flex flex-col items-center gap-2 sm:gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
        >
          <Countdown />

          {/* Data principal */}
          <span className="text-white text-lg font-medium">28 de Setembro</span>

          {/* Linha divisória */}
          <div className="w-16 h-[2px] bg-[#FF6D0B] rounded-full" />

          {/* Horário resumido */}
          <span className="text-white/80 text-sm sm:text-base">
            14h – 16h30 · Portas abertas às 13h
          </span>
        </motion.div>
      </motion.div>

      {/* Powered By */}
      <PoweredBy absolute />
    </section>
  );
}
