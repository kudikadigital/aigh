"use client";

import { useState } from "react";

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para um backend ou API
    alert(`Obrigado por se inscrever, ${formData.name}!`);
    setFormData({ name: "", email: "", role: "" });
  };

  return (
    <section className="bg-black text-white py-16 px-6 md:px-10 flex justify-center">
      <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-10 max-w-3xl w-full border border-[#FF5C00]/70">
        {/* Título */}
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
          Faça Parte da História. <span className="text-[#FF5C00]">Inscreva-se Agora.</span>
        </h2>

        {/* Informações do evento */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-6 text-center sm:text-left">
          <p>📅 <span className="font-medium">Data:</span> 28 de Setembro</p>
          <p>📍 <span className="font-medium">Local:</span> Centro de Ciências de Luanda</p>
          <p>💡 <span className="font-medium">Entrada:</span> Gratuita (Inscrição Obrigatória)</p>
        </div>

        {/* Aviso de escassez */}
        <p className="text-[#FF5C00] font-semibold text-center mb-6">
          Atenção: Apenas 120 vagas disponíveis. A inscrição será confirmada por notificação.
        </p>

        {/* Formulário de inscrição */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-600 bg-[#232323] focus:outline-none focus:border-[#FF5C00]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-600 bg-[#232323] focus:outline-none focus:border-[#FF5C00]"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="p-3 rounded-lg border border-gray-600 bg-[#232323] focus:outline-none focus:border-[#FF5C00]"
          >
            <option value="">Eu sou...</option>
            <option value="Criador">Criador</option>
            <option value="Jogador">Jogador</option>
            <option value="Professor/Mentor">Professor/Mentor</option>
            <option value="Patrocinador/Parceiro">Patrocinador/Parceiro</option>
            <option value="Organizador">Organizador</option>
          </select>

          <button
            type="submit"
            className="bg-[#FF5C00] text-white font-bold py-3 rounded-lg mt-2 hover:bg-[#e65400] transition-colors"
          >
            Quero Participar
          </button>
        </form>
      </div>
    </section>
  );
}
