"use client";

import { useState } from "react";

const accordionItems = [
  {
    id: 1,
    question: "É criador?",
    answer: "Vai ter acesso a formação e mentoria.",
  },
  {
    id: 2,
    question: "É jogador?",
    answer: "Vai conhecer e experimentar os novos títulos feitos em Angola.",
  },
  {
    id: 3,
    question: "É professor ou mentor?",
    answer: "Vai poder inspirar, orientar e partilhar experiência com a nova geração de talentos.",
  },
  {
    id: 4,
    question: "É patrocinador ou parceiro?",
    answer: "Vai se conectar com os principais players da indústria e aumentar visibilidade.",
  },
  {
    id: 5,
    question: "É organizador de eventos?",
    answer: "Vai aprender e trocar experiências sobre a realização de eventos de grande impacto.",
  },
];

export default function WhyParticipateSection() {
  const [activeId, setActiveId] = useState(null);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-black text-white py-16 px-6 md:px-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Título da Seção */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 leading-snug">
          Um Evento Para Todos os Players da Indústria
        </h2>

        {/* Accordion */}
        <div className="space-y-4">
          {accordionItems.map((item) => (
            <div key={item.id} className="border border-[#FF5C00]/50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex justify-between items-center p-4 text-left text-lg font-medium hover:bg-[#FF5C00]/10 transition"
              >
                <span>{item.question}</span>
                <span className="ml-4 text-[#FF5C00]">{activeId === item.id ? "−" : "+"}</span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden px-4 ${
                  activeId === item.id ? "max-h-40 py-4" : "max-h-0"
                }`}
              >
                <p className="text-white/80">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
