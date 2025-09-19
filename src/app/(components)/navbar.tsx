"use client";
import Image from "next/image";
import MenuItem from "@/components/MenuItem";
import ButtonCta from "@/components/ui/button-cta";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
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

          {/* Menu centralizado */}
          <nav
            className="
              absolute left-1/2 -translate-x-1/2
              hidden md:flex items-center gap-6
              backdrop-blur-lg bg-white/5 rounded-full px-6 py-2
            "
          >
            <MenuItem href="#quem-somos">
              Quem Somos
            </MenuItem>
            <MenuItem href="#sobre">
              Sobre
            </MenuItem>
            <MenuItem href="#evento">
              Evento
            </MenuItem>
            <MenuItem href="#contato">
              Contacto
            </MenuItem>
          </nav>

          {/* CTA à direita */}
          <div className="hidden sm:block">
            <ButtonCta />
          </div>
        </div>
      </div>
    </header>
  );
}
