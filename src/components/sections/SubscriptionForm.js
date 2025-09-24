"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { FiArrowRight, FiClock, FiMail, FiUsers } from "react-icons/fi";
import { Calendar, MapPin, Info, Lock, CheckCircle } from "lucide-react";

export default function SubscriptionForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isWaitlist, setIsWaitlist] = useState(false);

  // Configuração - limite de vagas atingido
  const MAX_PARTICIPANTS = 150;
  const currentParticipants = 150;
  const isRegistrationClosed = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validação básica no frontend
    if (!formData.name || !formData.email || !formData.role) {
      await Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Por favor, preencha nome, email e perfil.",
        confirmButtonColor: "#FF5C00",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          type: "waitlist",
          timestamp: new Date().toISOString()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Erro da API:", data);
        await Swal.fire({
          icon: "error",
          title: "Erro ao processar",
          text: data.error || "Não foi possível adicionar à lista de espera.",
          confirmButtonColor: "#FF5C00",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Inscrito na Lista de Espera! 📝",
        html: `
          <div class="text-center">
            <p>Obrigado, <strong>${formData.name}</strong>!</p>
            <p class="text-sm text-gray-600 mt-2">Você será contactado brevemente caso haja desistências.</p>
            <p class="text-xs text-gray-500 mt-2">Nº de referência: ${data.data?.[0]?.id || 'WL' + Date.now()}</p>
          </div>
        `,
        confirmButtonColor: "#FF5C00",
        confirmButtonText: "Entendido"
      });

      // Reset form
      setFormData({ name: "", email: "", phone: "", role: "" });
      setIsWaitlist(false);
      
    } catch (err) {
      console.error("Erro completo:", err);
      await Swal.fire({
        icon: "error",
        title: "Erro de conexão",
        html: `
          <div class="text-center">
            <p>Problema de conexão com o servidor.</p>
            <p class="text-sm text-gray-600 mt-2">Tente novamente ou entre em contacto conosco.</p>
            <p class="text-xs text-gray-500 mt-1">contacto@aigh.com</p>
          </div>
        `,
        confirmButtonColor: "#FF5C00",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const showWaitlistForm = () => {
    setIsWaitlist(true);
  };

  return (
    <section className="bg-black text-white py-20 flex justify-center px-6">
      <div className="bg-[#1A1A1A] rounded-4xl shadow-xl p-8 md:p-10 max-w-3xl w-full border border-[#FF5C00]/30 flex flex-col space-y-8 relative">
        
        {/* Badge de Inscrições Fechadas */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-red-600 text-white px-6 py-2 rounded-full flex items-center gap-2 text-sm font-bold shadow-lg">
            <Lock size={16} />
            INSCRIÇÕES FECHADAS
          </div>
        </div>

        {/* Título */}
        <div className="text-center pt-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-mono mb-2">
            Inscrições <span className="text-[#FF5C00]">Encerradas</span>
          </h2>
          <p className="text-gray-400 text-lg">Limite de vagas atingido</p>
        </div>

        {/* Status do Evento */}
        <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <FiUsers className="w-8 h-8 text-[#FF5C00]" />
                <CheckCircle className="w-4 h-4 text-green-500 absolute -top-1 -right-1" />
              </div>
              <p className="text-2xl font-bold text-green-400">{currentParticipants}/{MAX_PARTICIPANTS}</p>
              <span className="text-sm text-gray-400">Vagas Preenchidas</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Calendar className="w-8 h-8 text-[#FF5C00]" />
              <p className="text-lg font-bold">28 de Setembro</p>
              <span className="text-sm text-gray-400">Data do Evento</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <MapPin className="w-8 h-8 text-[#FF5C00]" />
              <p className="text-lg font-bold">Centro de Ciências de Luanda</p>
              <span className="text-sm text-gray-400">Local Confirmado</span>
            </div>
          </div>
        </div>

        {/* Mensagem de Encerramento */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-orange-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-orange-300 mb-2">
                Vagas Esgotadas! 🎯
              </h3>
              <p className="text-gray-300 mb-3">
                Todas as {MAX_PARTICIPANTS} vagas disponíveis foram preenchidas. 
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <p>✅ Inscrições confirmadas: <strong className="text-green-400">{currentParticipants} participantes</strong></p>
                <p>📧 Contato: <strong>Os inscritos serão contactados brevemente</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Espera */}
        {!isWaitlist ? (
          <div className="bg-gray-900/30 rounded-2xl p-6 border border-gray-700">
            <div className="text-center">
              <FiClock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                Lista de Espera Disponível
              </h3>
              <p className="text-gray-300 mb-4">
                Caso haja desistências, entraremos em contato por ordem de inscrição.
              </p>
              
              <button
                onClick={showWaitlistForm}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-lg py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 mx-auto"
              >
                <FiMail className="text-xl" />
                Entrar na Lista de Espera
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-gray-900/30 rounded-2xl p-6 border border-yellow-500/30">
            <div className="flex items-center gap-3 mb-6">
              <FiMail className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-bold text-yellow-400">
                Formulário de Lista de Espera
              </h3>
            </div>

            <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Seu nome completo *"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-5 py-3 rounded-2xl border border-gray-600 bg-[#232323] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              />
              
              <input
                type="email"
                name="email"
                placeholder="Seu melhor e-mail *"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-5 py-3 rounded-2xl border border-gray-600 bg-[#232323] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              />
              
              <input
                type="tel"
                name="phone"
                placeholder="Telefone para contato *"
                value={formData.phone}
                onChange={handleChange}
                required
                className="px-5 py-3 rounded-2xl border border-gray-600 bg-[#232323] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              />
              
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="px-5 py-3 rounded-2xl border border-gray-600 bg-[#232323] text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
              >
                <option value="">Selecione seu perfil *</option>
                <option value="Criador">Criador</option>
                <option value="Jogador">Jogador</option>
                <option value="Professor/Mentor">Professor/Mentor</option>
                <option value="Patrocinador/Parceiro">Patrocinador/Parceiro</option>
                <option value="Organizador">Organizador</option>
                <option value="Interessado(a) pela indústria de vídeo jogos em Angola">Interessado(a) pela indústria</option>
                <option value="Outro">Outro</option>
              </select>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsWaitlist(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-2xl transition-all duration-300"
                >
                  Cancelar
                </button>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? "Enviando..." : "Confirmar"}
                  {!isLoading && <FiArrowRight />}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="text-center text-gray-400 text-sm">
          <p>📞 Dúvidas? <strong>contacto@aigh.com</strong></p>
        </div>
      </div>
    </section>
  );
}