'use client';

export default function DashboardMockup() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Browser Chrome */}
      <div className="bg-slate border-2 border-white rounded-t-lg p-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger"></div>
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <div className="w-3 h-3 rounded-full bg-success"></div>
          </div>
          <div className="flex-1 bg-gray-800 rounded px-3 py-1 text-xs text-gray-400 font-mono">
            app.neofitflow.com.br/dashboard
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="bg-white border-2 border-t-0 border-white rounded-b-lg p-6 shadow-brutal">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-black mb-2">⚠️ Alunos em Risco</h3>
          <p className="text-gray-600">6 alunos precisam de atenção imediata</p>
        </div>

        {/* Risk List */}
        <div className="space-y-3">
          {/* Student 1 - High Risk */}
          <div className="bg-red-50 border-2 border-danger p-4 hover:shadow-brutal-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-danger rounded-full flex items-center justify-center text-white font-bold text-lg">
                  JM
                </div>
                <div>
                  <p className="font-bold text-black">João Mendes</p>
                  <p className="text-sm text-gray-600">Musculação • Plano Anual</p>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-danger text-white px-3 py-1 font-bold text-sm">
                  RISCO ALTO
                </span>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span>❌</span>
                <span className="font-bold">7 faltas consecutivas</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📉</span>
                <span>Frequência: 0%</span>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="bg-black text-white px-4 py-2 text-sm font-bold hover:bg-gray-800">
                💬 Enviar Mensagem
              </button>
              <button className="bg-white text-black border-2 border-black px-4 py-2 text-sm font-bold hover:bg-gray-100">
                📊 Ver Histórico
              </button>
            </div>
          </div>

          {/* Student 2 - Medium Risk */}
          <div className="bg-yellow-50 border-2 border-accent p-4 hover:shadow-brutal-sm transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                  AS
                </div>
                <div>
                  <p className="font-bold text-black">Ana Silva</p>
                  <p className="text-sm text-gray-600">Pilates • Plano Trimestral</p>
                </div>
              </div>
              <div className="text-right">
                <span className="bg-accent text-white px-3 py-1 font-bold text-sm">
                  RISCO MÉDIO
                </span>
              </div>
            </div>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span>⚠️</span>
                <span className="font-bold">4 faltas consecutivas</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📉</span>
                <span>Frequência: 25%</span>
              </div>
            </div>
          </div>

          {/* Student 3 - Medium Risk */}
          <div className="bg-yellow-50 border-2 border-accent p-4 hover:shadow-brutal-sm transition-all opacity-75">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                  RC
                </div>
                <div>
                  <p className="font-bold text-black">Roberto Costa</p>
                  <p className="text-sm text-gray-600">CrossFit • Plano Mensal</p>
                </div>
              </div>
              <span className="bg-accent text-white px-3 py-1 font-bold text-sm">
                RISCO MÉDIO
              </span>
            </div>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 pt-4 border-t-2 border-gray-200 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-danger">6</p>
            <p className="text-xs text-gray-600">Em Risco</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-success">24</p>
            <p className="text-xs text-gray-600">Recuperados</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">85%</p>
            <p className="text-xs text-gray-600">Precisão IA</p>
          </div>
        </div>
      </div>

      {/* Floating Badge */}
      <div className="absolute -top-4 -right-4 bg-primary text-white px-4 py-2 font-bold rotate-12 border-2 border-white shadow-brutal animate-bounce-slow">
        🤖 IA TRABALHANDO
      </div>
    </div>
  );
}