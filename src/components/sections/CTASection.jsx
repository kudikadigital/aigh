"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Calendar, MapPin, Info } from "lucide-react";

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    profile: "", // Novo campo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Obrigado por se inscrever, ${formData.name}!`);
    setFormData({ name: "", email: "", role: "", profile: "" });
  };

  return (
    <section className="bg-black text-white py-16 px-6 md:px-10 flex justify-center">
      <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-10 max-w-3xl w-full border border-[#FF5C00]/70 flex flex-col space-y-6">
        {/* Título */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Faça Parte da História.
          <br />
          <span className="text-[#FF5C00]">Inscreva-se Agora.</span>
        </h2>

        {/* Informações do evento com ícones Lucide */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-center sm:text-left text-lg">
          <p className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#FF5C00]" />
            28 de Setembro
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#FF5C00]" />
            Centro de Ciências de Luanda
          </p>
          <p className="flex items-center gap-2">
            <Info className="w-5 h-5 text-[#FF5C00]" />
            Gratuita (<span className="text-[#FF5C00]">Inscrição Obrigatória</span>)
          </p>
        </div>

        {/* Aviso de escassez */}
        <p className="text-[#FF5C00] font-semibold text-center">
          Atenção: Apenas 120 vagas disponíveis. A inscrição será confirmada por notificação.
        </p>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-600 bg-[#232323] focus:outline-none focus:border-[#FF5C00] transition"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-600 bg-[#232323] focus:outline-none focus:border-[#FF5C00] transition"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-600 bg-[#232323] focus:outline-none focus:border-[#FF5C00] transition"
          >
            <option value="">Eu sou...</option>
            <option value="Criador">Criador</option>
            <option value="Jogador">Jogador</option>
            <option value="Professor/Mentor">Professor/Mentor</option>
            <option value="Patrocinador/Parceiro">Patrocinador/Parceiro</option>
            <option value="Organizador">Organizador</option>
          </select>

          {/* Novo campo: Perfil/LinkedIn */}
          <input
            type="url"
            name="profile"
            placeholder="LinkedIn ou Website (opcional)"
            value={formData.profile}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-600 bg-[#232323] focus:outline-none focus:border-[#FF5C00] transition"
          />

          {/* Botão com ícone de seta */}
          <button
            type="submit"
            className="bg-[#FF5C00] text-white font-bold py-3 rounded-lg mt-2 flex items-center justify-center gap-2 hover:bg-[#e65400] transition-colors"
          >
            Quero Participar
            <FiArrowRight className="text-xl" />
          </button>
        </form>
      </div>
    </section>
  );
}
