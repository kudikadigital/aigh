import { ArrowUpRight } from "lucide-react";

export default function ButtonCta() {
  return (
    <button
      className="
        inline-flex items-center gap-2 
        bg-white text-[#202020] rounded-full 
        px-4 py-2 text-sm
        sm:px-6 sm:py-3 sm:text-base
        hover:brightness-110 active:scale-95 
        transition-all duration-200
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
    </button>
  );
}
