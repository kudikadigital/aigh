"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { FiArrowRight } from "react-icons/fi";
import { Calendar, MapPin, Info } from "lucide-react";

// Criando uma interface para o estado do formulário
// Removido interface FormData para compatibilidade com JavaScript

export default function SubscriptionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    profile: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        await Swal.fire({
          icon: "error",
          title: "Erro ao processar",
          text:
            data.error || "Não foi possível enviar sua inscrição. Tente novamente.",
          confirmButtonColor: "#FF5C00",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Inscrição Confirmada 🎉",
        html: `
          <p>Obrigado, ⚡ <strong>${formData.name}</strong>!</p>
          <p>Verifique seu e-mail para mais detalhes.</p>
        `,
        confirmButtonColor: "#FF5C00",
      });

      // Resetando o formulário
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "",
        profile: "",
      });
    } catch (err) {
      console.error("Erro ao enviar a inscrição:", err);
      await Swal.fire({
        icon: "error",
        title: "Erro inesperado",
        text: "Tente novamente mais tarde.",
        confirmButtonColor: "#FF5C00",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-black text-white py-20 flex justify-center px-6">
      <div className="bg-[#1A1A1A] rounded-4xl shadow-xl p-10 max-w-3xl w-full border border-[#FF5C00]/70 flex flex-col space-y-8">
        {/* Título */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center font-mono">
          Formulário de <span className="text-[#FF5C00]">Inscrição</span>
        </h2>

        {/* Informações do evento */}
        <div className="grid sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2">
            <Calendar className="w-6 h-6 text-[#FF5C00]" />
            <p className="text-lg font-bold">28 de Setembro</p>
            <span className="text-sm text-gray-400">Reserve sua data</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <MapPin className="w-6 h-6 text-[#FF5C00]" />
            <p className="text-lg font-bold">Centro de Ciências de Luanda</p>
            <span className="text-sm text-gray-400">Local do evento</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Info className="w-6 h-6 text-[#FF5C00]" />
            <p className="text-lg font-bold text-[#FF5C00]">Vagas Limitadas</p>
            <span className="text-sm text-gray-400">Inscrição Obrigatória</span>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-5 py-4 text-lg rounded-2xl border border-gray-700 bg-[#232323] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C00] transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-5 py-4 text-lg rounded-2xl border border-gray-700 bg-[#232323] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C00] transition"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="px-5 py-4 text-lg rounded-2xl border border-gray-700 bg-[#232323] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C00] transition"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="px-5 py-4 text-lg rounded-2xl border border-gray-700 bg-[#232323] text-white focus:outline-none focus:ring-2 focus:ring-[#FF5C00] transition"
          >
            <option value="">Eu sou...</option>
            <option value="Criador">Criador</option>
            <option value="Jogador">Jogador</option>
            <option value="Professor/Mentor">Professor/Mentor</option>
            <option value="Patrocinador/Parceiro">Patrocinador/Parceiro</option>
            <option value="Organizador">Organizador</option>
            <option value="Interessado(a) pela indústria de vídeo jogos em Angola ">Interessado(a) pela indústria de vídeo jogos em Angola</option>
            <option value="Outro">Outro</option>
          </select>
          <input
            type="url"
            name="profile"
            placeholder="Link da sua melhor rede social/website (opcional)"
            value={formData.profile}
            onChange={handleChange}
            className="px-5 py-4 text-lg rounded-2xl border border-gray-700 bg-[#232323] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF5C00] transition"
          />

          {/* Botão */}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#FF5C00] hover:bg-[#e65400] text-white font-bold text-lg py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Enviando..." : "Quero Participar"}
            {!isLoading && <FiArrowRight className="text-xl" />}
          </button>
        </form>
      </div>
    </section>
  );
}
