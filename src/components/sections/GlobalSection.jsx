"use client";

import { Globe, Award, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    id: 1,
    icon: <Award className="text-[#FF6D0B] w-8 h-8 mb-3" />,
    title: "Reconhecimento",
    text: "A melhor iniciativa africana de videojogos",
    bg: "bg-white/5",
    textColor: "text-white",
    textOpacity: "text-white/80",
    hoverBg: "hover:bg-white/10",
  },
  {
    id: 2,
    icon: <Globe className="text-white w-8 h-8 mb-3" />,
    title: "Colocação",
    text: "Entre os 8 melhores programas mundiais de aceleração pela GJ+",
    bg: "bg-[#FF6D0B]",
    textColor: "text-white",
    textOpacity: "text-white",
    hoverBg: "hover:bg-[#FF6D0B]/30",
  },
  {
    id: 3,
    icon: <Rocket className="text-[#FF6D0B] w-8 h-8 mb-3" />,
    title: "Programas Estruturados",
    text: "Academy, Incubator, Accelerator, Esports & Showcase, Connect Business.",
    bg: "bg-white/5",
    textColor: "text-white",
    textOpacity: "text-white/80",
    hoverBg: "hover:bg-white/10",
  },
];

export default function GlobalSection() {
  return (
    <section className="w-full py-16 bg-black flex flex-col items-center">
      {/* Divisor curto */}
      <div className="w-12 h-[3px] bg-[#FF6D0B] rounded-full mb-4" />

      {/* Headline */}
      <h2 className="text-center text-3xl sm:text-4xl font-bold text-white mb-10 leading-snug">
        Nascemos Globais <br />
        <span className="text-[#FF6D0B]">Agimos em Angola</span>
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full px-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
            className={`
              flex flex-col items-center text-center p-6
              ${card.bg} rounded-xl shadow-md
              transition-transform duration-300 ease-out
              ${card.hoverBg}
            `}
          >
            {card.icon}
            <h3 className={`text-lg font-semibold mb-2 ${card.textColor}`}>
              {card.title}
            </h3>
            <p className={`text-sm leading-relaxed ${card.textOpacity}`}>{card.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
