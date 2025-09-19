"use client"; // Adicione esta linha no topo para indicar que é um Client Component

import { ArrowUpRight } from "lucide-react";
import { Link } from "react-scroll";

export default function ButtonCta() {
  return (
    <Link
      to="contato" // O ID da seção de destino
      smooth={true} // Ativa a rolagem suave
      duration={500} // Duração da animação em milissegundos
      offset={-50} // Opcional: Ajuste o deslocamento para compensar o header fixo, se houver
      className="
        inline-flex items-center gap-2 
        bg-white text-[#202020] rounded-full 
        px-4 py-2 text-sm
        sm:px-6 sm:py-3 sm:text-base
        hover:brightness-110 active:scale-95 
        transition-all duration-200 cursor-pointer
      "
    >
      Quero Participar
      <span
        className="
          flex items-center justify-center 
          bg-[#202020] rounded-full 
          p-1.5 sm:p-2
        "
      >
        <ArrowUpRight size={12} className="text-white sm:size-4" />
      </span>
    </Link>
  );
}