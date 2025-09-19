"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

export default function Countdown() {
  const targetDate = new Date(new Date().getFullYear(), new Date().getMonth(), 28);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  function getTimeRemaining(target) {
    const now = new Date();
    const total = target - now;
    const seconds = Math.max(0, Math.floor((total / 1000) % 60));
    const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
    const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
    const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
    return { dias: days, horas: hours, minutos: minutes };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      className="
        flex items-center gap-6 px-6 py-3
        border border-[#FF6D0B]/60 rounded-2xl
        bg-black/30 backdrop-blur-md
      "
    >
      {/* Ícone à esquerda */}
      <Sparkles size={18} className="text-[#FF6D0B]" />

      {/* Blocos de tempo (todos dentro do mesmo container) */}
      <div className="flex items-center gap-4">
        {Object.entries(timeLeft).map(([label, value], index, arr) => (
          <div key={label} className="flex items-center gap-4">
            {/* Número + Label */}
            <div className="flex flex-col items-center">
              <span className="text-[#FF6D0B] text-2xl font-bold leading-none">
                {String(value).padStart(2, "0")}
              </span>
              <span className="text-white text-[10px] uppercase tracking-wider">
                {label}
              </span>
            </div>

            {/* Separador ":" (só aparece se não for o último) */}
            {index < arr.length - 1 && (
              <span className="text-[#FF6D0B] text-2xl font-bold -mx-2">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
