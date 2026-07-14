import React, { useState } from 'react';
import { CreditScore } from '../types';
import { Calculator, ShieldAlert, Cpu, Sparkles, Scale, Info, CheckCircle2, RefreshCw } from 'lucide-react';

export default function CriptoFlow() {
  // Merchant configuration state
  const [maxCreditLimit, setMaxCreditLimit] = useState(500);
  const [maxInstallments, setMaxInstallments] = useState(6);
  const [monthlyInterest, setMonthlyInterest] = useState(2.5);

  // Client Credit Scoring inputs
  const [walletAgeDays, setWalletAgeDays] = useState(180);
  const [onChainTxCount, setOnChainTxCount] = useState(45);
  const [walletBalanceUsd, setWalletBalanceUsd] = useState(1500);
  const [communityReviewsCount, setCommunityReviewsCount] = useState(8);
  const [repaidCreditsCount, setRepaidCreditsCount] = useState(2);

  // Computed credit score output
  const [calculatedScore, setCalculatedScore] = useState<CreditScore | null>(null);
  const [loadingScore, setLoadingScore] = useState(false);

  // Client credit planner simulator inputs
  const [desiredCreditAmount, setDesiredCreditAmount] = useState(200);
  const [selectedInstallments, setSelectedInstallments] = useState(3);

  const calculateScore = () => {
    setLoadingScore(true);
    setTimeout(() => {
      // Logic for calculating high-fidelity scoring
      // base points on tx count (up to 30), balance (up to 30), wallet age (up to 20), repayments (up to 20)
      let score = 30; // base score

      // age points (max 15)
      score += Math.min(15, (walletAgeDays / 365) * 15);

      // tx points (max 20)
      score += Math.min(20, (onChainTxCount / 100) * 20);

      // balance points (max 25)
      score += Math.min(25, (walletBalanceUsd / 5000) * 25);

      // reputation repayment bonus
      score += Math.min(20, repaidCreditsCount * 10);

      score = Math.round(Math.min(100, Math.max(10, score)));

      let riskLevel: 'Bajo' | 'Medio' | 'Alto' = 'Alto';
      if (score >= 75) riskLevel = 'Bajo';
      else if (score >= 45) riskLevel = 'Medio';

      // recommended limit based on balance and score
      let limit = Math.round((walletBalanceUsd * 0.15) * (score / 100));
      limit = Math.max(50, Math.min(limit, maxCreditLimit));

      setCalculatedScore({
        score,
        riskLevel,
        onChainHistoryCount: onChainTxCount,
        walletBalanceUsd,
        recommendedLimitUsd: limit
      });
      setLoadingScore(false);

      // Update desired credit input limit to not exceed recommended limit
      if (desiredCreditAmount > limit) {
        setDesiredCreditAmount(limit);
      }
    }, 1200);
  };

  // Payment calculator
  const totalInterestRate = (monthlyInterest / 100) * selectedInstallments;
  const totalRepayment = desiredCreditAmount * (1 + totalInterestRate);
  const installmentFee = totalRepayment / selectedInstallments;

  return (
    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-8" id="criptoflow_module">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
          CriptoFlow (Crédito Inteligente)
        </h2>
        <p className="text-neutral-400 text-sm mt-1">
          Plataforma B2B de Crédito directo en comercios respaldado por Inteligencia Artificial y Scoring On-Chain.
        </p>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative h-48 md:h-60 rounded-xl overflow-hidden border border-neutral-800">
        <img
          src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1200"
          alt="CriptoFlow Financial Trust"
          className="w-full h-full object-cover filter brightness-45 saturate-120"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
          <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
            Financiación On-Chain
          </span>
          <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
            Microcrédito Descentralizado Sin Intermediarios Bancarios
          </h3>
          <p className="text-neutral-300 text-xs mt-1 max-w-xl">
            Utilizamos algoritmos de evaluación de riesgo basados en reputación y comportamiento transaccional en la red Polygon EVM para otorgar créditos seguros directo en comercios.
          </p>
        </div>
      </div>

      {/* Program Details: What, How, Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* ¿Qué es? */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            🤝
          </div>
          <h4 className="text-white font-bold text-sm">¿Qué es CriptoFlow?</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Es la división de financiamiento y microcréditos integrados de <strong className="text-white">TuZonaCripto</strong>. Facilita que los propios comercios ofrezcan crédito de corto plazo respaldado por contratos inteligentes auditados.
          </p>
        </div>

        {/* ¿Cómo funciona? */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            ⚡
          </div>
          <h4 className="text-white font-bold text-sm">¿Cómo funciona?</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">1.</span>
              <span><strong>Scoring Automatizado:</strong> Analizamos la billetera del cliente en busca de saldos promedios e historial limpio.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">2.</span>
              <span><strong>Firma Digital:</strong> Se emite un compromiso de pago vinculante mediante un smart contract de la red.</span>
            </li>
          </ul>
        </div>

        {/* Beneficios */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            📈
          </div>
          <h4 className="text-white font-bold text-sm">Beneficios Clave</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Aumento de Ventas:</strong> Permite que los clientes adquieran productos con financiamiento directo.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Monitoreo de Riesgo:</strong> La IA previene de forma autónoma el impago mediante alertas directas.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-neutral-900">
        {/* Left Column: Merchant credit dashboard config */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800">
            <h3 className="text-white text-sm font-semibold mb-4 flex items-center gap-1.5 border-b border-neutral-800 pb-2">
              <Scale className="w-4 h-4 text-red-500" />
              Configuración del Comercio
            </h3>
            <p className="text-[10px] text-neutral-400 mb-4">
              Configura las directrices de crédito directo que ofreces a tus clientes. Tú eres el acreedor; asumes el riesgo y configuras las comisiones.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-400 font-medium mb-1.5 uppercase">Límite Máximo Otorgable</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">$</span>
                  <input
                    type="number"
                    value={maxCreditLimit}
                    onChange={(e) => setMaxCreditLimit(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-12 py-1.5 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 font-mono">USD</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 font-medium mb-1.5 uppercase">Cuotas Máximas</label>
                <select
                  value={maxInstallments}
                  onChange={(e) => setMaxInstallments(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
                >
                  <option value={3}>Hasta 3 cuotas semanales/mensuales</option>
                  <option value={6}>Hasta 6 cuotas semanales/mensuales</option>
                  <option value={12}>Hasta 12 cuotas semanales/mensuales</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 font-medium mb-1.5 uppercase">Interés Recargo Mensual</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={monthlyInterest}
                    onChange={(e) => setMonthlyInterest(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-red-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-mono">%</span>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 p-3.5 rounded-lg border border-red-950/40 mt-4 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-[10px] text-neutral-400 leading-normal">
                <strong className="text-white">Riesgo Compartido:</strong> TuZonaCripto ofrece la IA de scoring de riesgo de manera gratuita, pero el capital de crédito lo aporta enteramente tu negocio.
              </p>
            </div>
          </div>
        </div>

        {/* Center Column: On-chain Credit Scoring Engine */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-6 bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
            <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
              <Cpu className="w-4 h-4 text-red-500" />
              Crypto-Credit Scoring Engine (IA)
            </h3>
            <p className="text-[10px] text-neutral-400">
              Analiza el comportamiento del cliente basándose en el historial de transacciones, edad de la wallet y fondos depositados.
            </p>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-neutral-400 font-semibold mb-1 uppercase">Antigüedad Wallet (Días)</label>
                  <input
                    type="number"
                    value={walletAgeDays}
                    onChange={(e) => setWalletAgeDays(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-neutral-400 font-semibold mb-1 uppercase">Historial Tx On-Chain</label>
                  <input
                    type="number"
                    value={onChainTxCount}
                    onChange={(e) => setOnChainTxCount(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-neutral-400 font-semibold mb-1 uppercase">Balance Promedio (USD)</label>
                  <input
                    type="number"
                    value={walletBalanceUsd}
                    onChange={(e) => setWalletBalanceUsd(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-neutral-400 font-semibold mb-1 uppercase">Créditos Pagados a tiempo</label>
                  <input
                    type="number"
                    value={repaidCreditsCount}
                    onChange={(e) => setRepaidCreditsCount(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <button
                onClick={calculateScore}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Calcular Riesgo de Impago (IA)
              </button>
            </div>

            {/* Scoring Results display */}
            {loadingScore ? (
              <div className="bg-neutral-950 p-6 rounded-lg border border-neutral-800 text-center text-xs text-neutral-400 flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-red-500" />
                Analizando logs de la blockchain Polygon...
              </div>
            ) : calculatedScore ? (
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 space-y-3 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-semibold">Score Crediticio TZC</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                    calculatedScore.riskLevel === 'Bajo' ? 'bg-emerald-950 text-emerald-400 border border-emerald-900' :
                    calculatedScore.riskLevel === 'Medio' ? 'bg-amber-950 text-amber-400 border border-amber-900' :
                    'bg-red-950 text-red-400 border border-red-900'
                  }`}>
                    Riesgo {calculatedScore.riskLevel}
                  </span>
                </div>

                <div className="flex items-end gap-3">
                  <div className="text-4xl font-mono font-black text-white">{calculatedScore.score}</div>
                  <div className="text-[10px] text-neutral-500 pb-1">puntos de 100</div>
                </div>

                <div className="w-full bg-neutral-900 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      calculatedScore.score >= 75 ? 'bg-emerald-500' :
                      calculatedScore.score >= 45 ? 'bg-amber-500' :
                      'bg-red-600'
                    }`}
                    style={{ width: `${calculatedScore.score}%` }}
                  ></div>
                </div>

                <div className="border-t border-neutral-900 pt-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Límite Recomendado</span>
                    <span className="font-bold text-white font-mono">${calculatedScore.recommendedLimitUsd} USD</span>
                  </div>
                  <div className="text-right">
                    <span className="text-neutral-500 block text-[10px]">Recomendación de Compra</span>
                    <span className={`font-bold ${
                      calculatedScore.score >= 45 ? 'text-emerald-400' : 'text-red-500'
                    }`}>
                      {calculatedScore.score >= 45 ? 'APROBACIÓN SUGERIDA' : 'RECHAZO SUGERIDO'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-neutral-950 p-6 rounded-lg border border-neutral-800 text-center text-xs text-neutral-500">
                Presiona el botón de arriba para generar la sugerencia de crédito basada en el motor de IA.
              </div>
            )}
          </div>

          {/* Interactive Repayment Calculator */}
          <div className="md:col-span-6 bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
            <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
              <Calculator className="w-4 h-4 text-red-500" />
              Calculadora de Planes de Pago
            </h3>
            <p className="text-[10px] text-neutral-400">
              Divide el costo de tu compra en plazos flexibles en base al balance sugerido.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-[10px] text-neutral-400 font-semibold mb-1 uppercase">Monto del Crédito Solicitado</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">$</span>
                  <input
                    type="number"
                    value={desiredCreditAmount}
                    onChange={(e) => setDesiredCreditAmount(Number(e.target.value))}
                    max={calculatedScore?.recommendedLimitUsd || maxCreditLimit}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-12 py-1.5 text-xs text-white focus:outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400">USD</span>
                </div>
                {calculatedScore && (
                  <p className="text-[9px] text-neutral-500 mt-1">Límite recomendado: ${calculatedScore.recommendedLimitUsd}</p>
                )}
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-semibold mb-1 uppercase">Plazo de Financiación (Cuotas)</label>
                <select
                  value={selectedInstallments}
                  onChange={(e) => setSelectedInstallments(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-neutral-300 focus:outline-none"
                >
                  {Array.from({ length: maxInstallments }).map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1} cuotas mensuales</option>
                  ))}
                </select>
              </div>

              {/* Repayment overview and dates */}
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 space-y-2 text-xs">
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Monto Principal:</span>
                  <span className="font-mono text-white">${desiredCreditAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <span>Interés total ({ (monthlyInterest * selectedInstallments).toFixed(1) }%):</span>
                  <span className="font-mono text-white">${(desiredCreditAmount * totalInterestRate).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-900 pt-2 font-bold text-white">
                  <span>Total a Pagar:</span>
                  <span className="font-mono text-red-500">${totalRepayment.toFixed(2)}</span>
                </div>

                <div className="bg-neutral-900/40 p-2.5 rounded border border-neutral-800 text-[10px] text-center text-neutral-400 font-mono">
                  Cuota Mensual: {selectedInstallments} x <strong className="text-white">${installmentFee.toFixed(2)} USD</strong>
                </div>
              </div>

              <button
                onClick={() => alert(`Contrato inteligente firmado en la blockchain Polygon. Se ha registrado un compromiso de pago de ${selectedInstallments} cuotas de $${installmentFee.toFixed(2)} USD. El comercio ha desembolsado los fondos.`)}
                className="w-full bg-neutral-950 hover:bg-neutral-900 text-white font-bold py-2 rounded-lg text-xs transition border border-neutral-800 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Firmar Contrato Digital de Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
