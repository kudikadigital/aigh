"use client";

import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-[#1a0f00] to-black py-12 px-6 text-white font-sans">
      <div className="max-w-5xl mx-auto flex flex-col items-center space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[#FF5C00] text-2xl font-bold">⚡</span>
            <span className="text-white text-2xl font-mono tracking-widest">AIGH</span>
          </div>
          <span className="text-sm text-white/70">ANGOLA INDIE GAME HUB</span>
        </div>

        {/* Contato */}
        <div className="text-center space-y-1 text-lg">
          <p>
            <a href="mailto:aigh@vdzacarias.com" className="hover:text-[#FF5C00]">
              aigh@vdzacarias.com
            </a>{" "}
            |{" "}
            <a href="tel:+244972580419" className="hover:text-[#FF5C00]">
              +244 972 580 419
            </a>
          </p>
        </div>

        {/* Redes Sociais */}
        <div className="flex space-x-4 mt-2">
          <a
            href="#"
            className="w-10 h-10 border border-[#FF5C00] rounded-full flex items-center justify-center text-[#FF5C00] hover:bg-[#FF5C00] hover:text-black transition"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="w-10 h-10 border border-[#FF5C00] rounded-full flex items-center justify-center text-[#FF5C00] hover:bg-[#FF5C00] hover:text-black transition"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="w-10 h-10 border border-[#FF5C00] rounded-full flex items-center justify-center text-[#FF5C00] hover:bg-[#FF5C00] hover:text-black transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>

        {/* Linha divisória */}
        <div className="w-full border-t border-[#FF5C00] mt-6"></div>

        {/* Direitos Autorais */}
        <div className="text-center text-sm text-white/20">
          © 2026 VD Zacarias. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
