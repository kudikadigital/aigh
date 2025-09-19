"use client";

import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Calendar, MapPin, Info } from "lucide-react";
import { supabase } from "@/lib/supabase"; // Importe o cliente Supabase

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    profile: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
        // Enviar os dados para a sua API Route
        const response = await fetch('/api/inscricao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao processar a inscrição.');
        }

        setSuccess(true);
        setFormData({ name: "", email: "", role: "", profile: "" });

    } catch (err) {
        console.error("Erro ao enviar a inscrição:", err);
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
};


  return (
    <section className="bg-black text-white py-16 px-6 md:px-10 flex justify-center">
      <div className="bg-[#1a1a1a] rounded-2xl shadow-xl p-10 max-w-3xl w-full border border-[#FF5C00]/70 flex flex-col space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center">
          Faça Parte da História.
          <br />
          <span className="text-[#FF5C00]">Inscreva-se Agora.</span>
        </h2>

        {/* Informações do evento */}
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

        {/* Mensagens de estado */}
        {error && (
          <p className="text-red-500 font-semibold text-center">{error}</p>
        )}
        {success && (
          <p className="text-green-500 font-semibold text-center">
            Obrigado! Sua inscrição foi enviada com sucesso.
          </p>
        )}
        {!success && (
          <p className="text-[#FF5C00] font-semibold text-center">
            Atenção: Apenas 120 vagas disponíveis. A inscrição será confirmada por notificação.
          </p>
        )}

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
          <input
            type="url"
            name="profile"
            placeholder="LinkedIn ou Website (opcional)"
            value={formData.profile}
            onChange={handleChange}
            className="p-3 rounded-lg border border-gray-600 bg-[#232323] focus:outline-none focus:border-[#FF5C00] transition"
          />
          <button
            type="submit"
            disabled={isLoading || success}
            className="bg-[#FF5C00] text-white font-bold py-3 rounded-lg mt-2 flex items-center justify-center gap-2 hover:bg-[#e65400] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Enviando..." : "Quero Participar"}
            <FiArrowRight className="text-xl" />
          </button>
        </form>
      </div>
    </section>
  );
}