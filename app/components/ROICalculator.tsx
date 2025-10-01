'use client';

import { useState } from 'react';

export default function ROICalculator() {
  const [students, setStudents] = useState(150);
  const [monthlyFee, setMonthlyFee] = useState(150);
  const [churnRate, setChurnRate] = useState(8);

  // Calculations
  const monthlyChurn = Math.round((students * churnRate) / 100);
  const monthlyLoss = monthlyChurn * monthlyFee;
  const yearlyLoss = monthlyLoss * 12;

  // With NeoFitFlow (40% reduction in churn)
  const newChurn = Math.round(monthlyChurn * 0.6); // 40% reduction
  const newLoss = newChurn * monthlyFee;
  const monthlySaved = monthlyLoss - newLoss;
  const yearlySaved = monthlySaved * 12;

  return (
    <div className="bg-white text-black border-2 border-black p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-2">💰 Calculadora de ROI</h3>
        <p className="text-xl text-gray-700">Descubra quanto você perde com evasão todo mês</p>
      </div>

      {/* Inputs */}
      <div className="space-y-6 mb-8">
        <div>
          <label className="block font-bold mb-2">
            Número de Alunos: <span className="text-2xl">{students}</span>
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="10"
            value={students}
            onChange={(e) => setStudents(Number(e.target.value))}
            className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>50</span>
            <span>1000</span>
          </div>
        </div>

        <div>
          <label className="block font-bold mb-2">
            Mensalidade Média: R$ <span className="text-2xl">{monthlyFee}</span>
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={monthlyFee}
            onChange={(e) => setMonthlyFee(Number(e.target.value))}
            className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>R$ 50</span>
            <span>R$ 500</span>
          </div>
        </div>

        <div>
          <label className="block font-bold mb-2">
            Taxa de Evasão Mensal: <span className="text-2xl">{churnRate}%</span>
          </label>
          <input
            type="range"
            min="3"
            max="20"
            step="1"
            value={churnRate}
            onChange={(e) => setChurnRate(Number(e.target.value))}
            className="w-full h-3 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>3%</span>
            <span>20%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="border-t-2 border-black pt-8">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Current Loss */}
          <div className="bg-red-50 border-2 border-red-600 p-6">
            <p className="font-bold text-red-600 mb-2">❌ PERDA ATUAL</p>
            <p className="text-sm text-gray-700 mb-3">
              {monthlyChurn} alunos cancelam por mês
            </p>
            <p className="text-4xl font-bold text-red-600 mb-1">
              R$ {monthlyLoss.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-gray-700">por mês</p>
            <p className="text-2xl font-bold text-red-800 mt-3">
              R$ {yearlyLoss.toLocaleString('pt-BR')}/ano
            </p>
          </div>

          {/* With NeoFitFlow */}
          <div className="bg-green-50 border-2 border-green-600 p-6">
            <p className="font-bold text-green-600 mb-2">✅ COM NEOFITFLOW</p>
            <p className="text-sm text-gray-700 mb-3">
              {newChurn} alunos cancelam (redução de 40%)
            </p>
            <p className="text-4xl font-bold text-green-600 mb-1">
              R$ {newLoss.toLocaleString('pt-BR')}
            </p>
            <p className="text-sm text-gray-700">por mês</p>
            <p className="text-2xl font-bold text-green-800 mt-3">
              R$ {(newLoss * 12).toLocaleString('pt-BR')}/ano
            </p>
          </div>
        </div>

        {/* Savings Highlight */}
        <div className="bg-black text-white p-6 text-center">
          <p className="text-xl mb-2">💰 VOCÊ ECONOMIZA:</p>
          <p className="text-5xl font-bold mb-2">
            R$ {monthlySaved.toLocaleString('pt-BR')}
          </p>
          <p className="text-lg mb-4">por mês</p>
          <div className="border-t-2 border-white pt-4">
            <p className="text-2xl font-bold">
              R$ {yearlySaved.toLocaleString('pt-BR')} no primeiro ano
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://wa.me/5531995255982?text=Fiz%20a%20calculadora%20e%20quero%20reduzir%20evasão%20com%20IA%20NeoFitFlow"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-8 py-4 font-bold hover:bg-gray-800 transition-colors text-xl border-2 border-black"
          >
            🤖 Quero Recuperar Essa Receita
          </a>
          <p className="text-sm text-gray-600 mt-3">
            Fale com especialista e veja demonstração da IA
          </p>
        </div>
      </div>
    </div>
  );
}