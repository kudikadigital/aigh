"use client";

import { useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaArrowUp } from "react-icons/fa";
import PoweredBy from "@/components/PoweredBy";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-black via-[#1a0f00] to-black py-12 px-6 text-white font-sans">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[#FF5C00] text-2xl font-bold">⚡</span>
            <span className="text-white text-2xl font-mono tracking-widest">AIGH</span>
          </div>
          <span className="text-sm text-white/70">ANGOLA INDIE GAME HUB</span>
        </div>

        {/* Powered By */}
        <PoweredBy />

        {/* Contato */}
        <div className="text-center space-y-1 text-lg">
          <p>
            <a
              href="mailto:aigh@vdzacarias.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF5C00]"
            >
              aigh@vdzacarias.com
            </a>{" "}
            |{" "}
            <a
              href="tel:+244972580419"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FF5C00]"
            >
              +244 972 580 419
            </a>
          </p>
        </div>

        {/* Redes Sociais */}
        <div className="flex space-x-4 mt-2">
          <a
            href="https://www.facebook.com/share/16uGMSj7XP/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-[#FF5C00] rounded-full flex items-center justify-center text-[#FF5C00] hover:bg-[#FF5C00] hover:text-black transition"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/aigh_1?utm_source=qr&igsh=MXZxYm9xMHRxejNqYw=="
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 border border-[#FF5C00] rounded-full flex items-center justify-center text-[#FF5C00] hover:bg-[#FF5C00] hover:text-black transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Linha divisória */}
        <div className="w-full border-t border-[#FF5C00] mt-6"></div>

        {/* Direitos Autorais */}
        <div className="text-center text-sm text-white/20">
          © 2025 VD Zacarias. All rights reserved.
        </div>
      </div>

      {/* Botão de voltar ao topo */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#FF5C00] text-black w-12 h-12 rounded-full shadow-lg flex items-center justify-center animate-pulse hover:scale-110 transition-transform"
          aria-label="Voltar ao topo"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </footer>
  );
}
