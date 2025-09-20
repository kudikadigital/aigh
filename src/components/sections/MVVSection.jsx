"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const content = [
  {
    id: "missao",
    title: "Missão",
    image: "/images/missao.png",
    text: "Formar, profissionalizar e conectar talentos angolanos, transformando o futuro da tecnologia no país.",
  },
  {
    id: "visao",
    title: "Visão",
    image: "/images/visao.png",
    text: "Ser a maior referência em videojogos em Angola, reconhecida pela excelência e inovação.",
  },
  {
    id: "valores",
    title: "Valores",
    image: "/images/valor.png",
    text: "Inovação, Colaboração, Impacto, Excelência.",
  },
];

const MVVSection = () => {
  const [activeItem, setActiveItem] = useState("missao");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItem((prev) => {
        const currentIndex = content.findIndex((c) => c.id === prev);
        const nextIndex = (currentIndex + 1) % content.length;
        return content[nextIndex].id;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeContent = content.find((item) => item.id === activeItem);

  return (
    <section className="relative text-white py-16 px-6 md:px-10 font-sans overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('/grainy-gradient.png')",
            mixBlendMode: "overlay",
          }}
        ></div>

        {/* Fade no topo */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black via-black/70 to-transparent pointer-events-none"></div>

        {/* Fade no bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10">
        {/* Botões de seleção */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-[#232323] p-1 rounded-full space-x-2">
            {content.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`py-3 px-8 rounded-full transition-colors duration-300 ease-in-out ${
                  activeItem === item.id
                    ? "bg-[#FF5C00] text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                aria-pressed={activeItem === item.id}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex flex-col md:flex-row items-start md:items-center md:space-x-16 max-w-6xl mx-auto">
          {/* Imagem */}
          <div className="relative w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
            <div
              className="bg-[#232323] p-8 rounded-xl border relative w-full h-96"
              style={{ borderColor: "rgba(255,92,0,0.3)" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full relative flex items-center justify-center"
                >
                  {activeContent.image && (
                    <Image
                      src={activeContent.image}
                      alt={activeContent.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "contain" }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Texto */}
          <div className="w-full md:w-1/2">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeContent.id + "-text"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-3xl md:text-4xl font-light leading-relaxed max-w-xl"
              >
                {activeContent.text}
              </motion.h2>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center mt-10 space-x-3">
          {content.map((item) => (
            <div
              key={item.id}
              className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                activeItem === item.id ? "bg-[#FF5C00]" : "bg-[#FF5C00]/30"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MVVSection;
