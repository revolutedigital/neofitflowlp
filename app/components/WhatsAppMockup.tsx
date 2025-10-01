'use client';

export default function WhatsAppMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Phone Frame */}
      <div className="bg-slate border-4 border-white rounded-[2.5rem] p-4 shadow-brutal">
        {/* Phone Notch */}
        <div className="h-6 bg-black rounded-b-3xl mx-auto w-40 mb-2"></div>

        {/* WhatsApp Header */}
        <div className="bg-success border-2 border-white p-3 rounded-t-lg flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-success">
            JM
          </div>
          <div className="flex-1">
            <p className="font-bold text-white">João Mendes</p>
            <p className="text-xs text-green-100">online</p>
          </div>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-white rounded-full"></div>
            <div className="w-6 h-6 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="bg-[#ECE5DD] border-2 border-t-0 border-white p-4 h-96 overflow-y-auto rounded-b-lg">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMwMDAiLz48L3N2Zz4=')]"></div>

          {/* Messages */}
          <div className="relative space-y-3">
            {/* System Message */}
            <div className="flex justify-center">
              <div className="bg-white/80 px-3 py-1 rounded-lg text-xs text-gray-600 border border-gray-200">
                Mensagem enviada pela IA • Hoje 09:15
              </div>
            </div>

            {/* Academia Message (Sent by AI) */}
            <div className="flex justify-end">
              <div className="bg-success border-2 border-white p-3 rounded-lg max-w-[80%] shadow-brutal-sm">
                <p className="text-white font-medium mb-2">
                  Oi João! Tudo bem? 👋
                </p>
                <p className="text-white mb-2">
                  Notamos que você não apareceu nos últimos treinos. Está tudo ok? Podemos te ajudar com algo?
                </p>
                <p className="text-white mb-2">
                  Horário não está dando certo? Treino muito pesado? Me conta! 💪
                </p>
                <div className="flex justify-end items-center gap-1 mt-2">
                  <span className="text-xs text-green-100">09:15</span>
                  <span className="text-white">✓✓</span>
                </div>
              </div>
            </div>

            {/* Read indicator */}
            <div className="flex justify-center">
              <div className="bg-primary/20 px-3 py-1 rounded-full text-xs text-primary font-bold animate-pulse">
                👁️ João visualizou a mensagem
              </div>
            </div>

            {/* Student typing... */}
            <div className="flex justify-start">
              <div className="bg-white border-2 border-gray-300 p-3 rounded-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>

            {/* Student Reply */}
            <div className="flex justify-start">
              <div className="bg-white border-2 border-gray-300 p-3 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-black font-medium mb-2">
                  Oi! Estava com uns problemas pessoais 😔
                </p>
                <p className="text-black mb-2">
                  Mas agora já está resolvido! Posso voltar amanhã?
                </p>
                <div className="flex justify-end items-center gap-1 mt-2">
                  <span className="text-xs text-gray-500">09:18</span>
                </div>
              </div>
            </div>

            {/* Academia Reply */}
            <div className="flex justify-end">
              <div className="bg-success border-2 border-white p-3 rounded-lg max-w-[80%] shadow-brutal-sm">
                <p className="text-white font-medium mb-2">
                  Claro! Que bom que está tudo bem! 🙌
                </p>
                <p className="text-white mb-2">
                  Te esperamos amanhã! Vou avisar o professor que você volta 💪🔥
                </p>
                <div className="flex justify-end items-center gap-1 mt-2">
                  <span className="text-xs text-green-100">09:19</span>
                  <span className="text-white">✓✓</span>
                </div>
              </div>
            </div>

            {/* Success Indicator */}
            <div className="flex justify-center">
              <div className="bg-success/20 px-3 py-2 rounded-lg text-sm text-success font-bold border-2 border-success">
                ✅ Aluno Recuperado • Volta ao treino amanhã
              </div>
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="h-1 bg-white rounded-full w-32 mx-auto mt-2"></div>
      </div>

      {/* Floating Stats */}
      <div className="absolute -bottom-4 -left-4 bg-accent text-black px-4 py-2 font-bold rotate-[-8deg] border-2 border-white shadow-brutal-sm">
        💬 Taxa de Resposta: 87%
      </div>

      <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 font-bold rotate-12 border-2 border-white shadow-brutal-sm animate-pulse-slow">
        ⚡ Resposta em 2min
      </div>
    </div>
  );
}