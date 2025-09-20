"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MenuItem from "@/components/MenuItem";
import ButtonCta from "@/components/ui/button-cta";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 mt-4 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <Image
                src="/logo.png"
                alt="Angola Indie Game Hub"
                width={120}
                height={40}
                priority
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Menu desktop */}
          <nav
            className="
              absolute left-1/2 -translate-x-1/2
              hidden md:flex items-center gap-6
              backdrop-blur-lg bg-white/5 rounded-full px-6 py-2
            "
          >
            <MenuItem href="#quem-somos">Quem Somos</MenuItem>
            <MenuItem href="#sobre">Sobre</MenuItem>
            <MenuItem href="#evento">Evento</MenuItem>
            <MenuItem href="#contato">Contacto</MenuItem>
          </nav>

          {/* CTA desktop */}
          <div className="hidden sm:block">
            <ButtonCta />
          </div>

          {/* Botão menu mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-white focus:outline-none"
            aria-label="Abrir Menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-[#FF5C00]/50">
          <nav className="flex flex-col items-center py-6 space-y-6">
            <MenuItem href="#quem-somos" onClick={() => setMenuOpen(false)}>
              Quem Somos
            </MenuItem>
            <MenuItem href="#sobre" onClick={() => setMenuOpen(false)}>
              Sobre
            </MenuItem>
            <MenuItem href="#evento" onClick={() => setMenuOpen(false)}>
              Evento
            </MenuItem>
            <MenuItem href="#contato" onClick={() => setMenuOpen(false)}>
              Contacto
            </MenuItem>
            <ButtonCta />
          </nav>
        </div>
      )}
    </header>
  );
}
