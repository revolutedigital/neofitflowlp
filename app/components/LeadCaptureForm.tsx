'use client';

import { useState } from 'react';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gymSize: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);

      // Redirect to WhatsApp with context after 2 seconds
      setTimeout(() => {
        const message = `Olá! Meu nome é ${formData.name}. Acabei de preencher o formulário e quero reduzir evasão na minha academia com IA. Tenho ${formData.gymSize} alunos.`;
        window.open(`https://wa.me/5531995255982?text=${encodeURIComponent(message)}`, '_blank');
      }, 2000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="bg-white text-black border-2 border-black p-8 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h3 className="text-3xl font-bold mb-4">Recebemos Sua Solicitação!</h3>
        <p className="text-xl mb-6 text-gray-700">
          Estamos te redirecionando para WhatsApp com um especialista...
        </p>
        <div className="animate-spin w-12 h-12 border-4 border-black border-t-transparent rounded-full mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary rounded-lg blur-sm"></div>

      <form onSubmit={handleSubmit} className="relative bg-white text-black border-4 border-primary p-8 rounded-lg shadow-brutal">
        {/* Floating Badge */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-accent px-6 py-2 rotate-[-2deg] border-2 border-black shadow-brutal-sm z-10 animate-bounce-slow">
          <span className="font-bold text-black">👑 DEMONSTRAÇÃO VIP GRATUITA</span>
        </div>

        <div className="mb-6 text-center mt-4">
          <h3 className="text-3xl font-bold mb-2">📊 Veja Como a IA Funciona</h3>
          <p className="text-gray-700 font-normal">Agende sua demonstração personalizada (15 minutos)</p>
        </div>

      <div className="space-y-4">
        <div>
          <label className="block font-bold mb-2" htmlFor="name">
            Nome Completo *
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            inputMode="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-primary focus:border-primary transition-all"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label className="block font-bold mb-2" htmlFor="email">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-primary focus:border-primary transition-all"
            placeholder="seu@email.com"
          />
        </div>

        <div>
          <label className="block font-bold mb-2" htmlFor="phone">
            WhatsApp *
          </label>
          <input
            id="phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-primary focus:border-primary transition-all"
            placeholder="(00) 00000-0000"
          />
        </div>

        <div>
          <label className="block font-bold mb-2" htmlFor="gymSize">
            Quantos alunos tem sua academia? *
          </label>
          <select
            id="gymSize"
            required
            value={formData.gymSize}
            onChange={(e) => setFormData({...formData, gymSize: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-primary focus:border-primary transition-all"
          >
            <option value="">Selecione...</option>
            <option value="menos-50">Menos de 50 alunos</option>
            <option value="50-100">50 a 100 alunos</option>
            <option value="100-200">100 a 200 alunos</option>
            <option value="200-500">200 a 500 alunos</option>
            <option value="mais-500">Mais de 500 alunos</option>
          </select>
        </div>

        <div>
          <label className="block font-bold mb-2" htmlFor="message">
            Qual seu maior desafio com evasão? (opcional)
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-4 focus:ring-primary focus:border-primary transition-all"
            placeholder="Ex: Perco muitos alunos no 3º mês..."
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-white px-8 py-4 font-bold hover:bg-primary-dark hover:scale-105 hover:shadow-brutal-primary transition-all text-xl border-2 border-primary disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
        >
          {isSubmitting ? '⏳ Enviando...' : '🤖 Ver Demonstração da IA'}
        </button>

        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            🔒 Seus dados estão seguros. Não compartilhamos com terceiros.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Progresso</span>
            <span>80% completo</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{width: '80%'}}
            ></div>
          </div>
        </div>
      </div>
    </form>
    </div>
  );
}