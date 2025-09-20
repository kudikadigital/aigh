"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Dados do carrossel/lista com emojis como ícones
const carouselItems = [
  {
    id: 1,
    title: "Game Devs Angolanos",
    icon: "👨‍💻",
    image: "/gamers/g01.jpg",
  },
  {
    id: 2,
    title: "Gamers e Comunidade",
    icon: "🎮",
    image: "/gamers/g02.jpg",
  },
  {
    id: 3,
    title: "Professores e Mentores",
    icon: "👩‍🏫",
    image: "/gamers/g03.jpg",
  },
  {
    id: 4,
    title: "Patrocinadores & Parceiros",
    icon: "💼",
    image: "/gamers/g04.jpg",
  },
  {
    id: 5,
    title: "Organizadores de Eventos",
    icon: "🎤",
    image: "/gamers/g05.jpg",
  },
];

export default function EventSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Autoplay do carrossel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-black text-white py-16 px-6 md:px-10 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:space-x-16">
        {/* Painel esquerdo */}
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
          <div className="w-16 h-1 bg-[#FF5C00] mb-4 rounded-full"></div>
          <h2 className="text-4xl font-bold leading-tight mb-2">28 de Setembro</h2>
          <h3 className="text-4xl font-bold text-[#FF5C00] leading-tight mb-6">
            O Ponto de Viragem
          </h3>
          <p className="text-lg font-light max-w-lg mb-6">
            Este primeiro encontro da AIGH é mais do que uma apresentação – é
            um marco histórico. Será o pontapé de saída oficial para unir:
          </p>

          {/* Lista visual com emojis */}
          <ul className="space-y-4">
            {carouselItems.map((item) => (
              <li key={item.id} className="flex items-center space-x-3 text-xl font-medium">
                <span className="text-[#FF5C00]">{item.icon}</span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Painel direito: carrossel de imagens */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          <div className="relative w-full max-w-xl h-[360px] rounded-xl overflow-hidden border border-[#FF5C00]/70">
            {carouselItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === activeSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                  className="rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-8 space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === activeSlide ? "bg-[#FF5C00]" : "bg-gray-700"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
