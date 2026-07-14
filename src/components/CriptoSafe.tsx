import React, { useState, useEffect } from 'react';
import { Shield, Sparkles, Terminal, ShieldAlert, Heart, GraduationCap, Plane, Plus, Coins, Play, Square, Loader } from 'lucide-react';

interface CriptoSafeProps {
  userTzcBalance: number;
  addUserTzc: (amount: number) => void;
}

export default function CriptoSafe({ userTzcBalance, addUserTzc }: CriptoSafeProps) {
  // Vault state
  const [safeBalance, setSafeBalance] = useState(150);
  const [depositAmount, setDepositAmount] = useState('50');
  const [savingsCategory, setSavingsCategory] = useState<'health' | 'education' | 'general'>('general');

  // AML Scanner simulation states
  const [isScanning, setIsScanning] = useState(true);
  const [scanLogs, setScanLogs] = useState<string[]>([
    '[INIT] AML/KYC Real-time transaction scanner initialized.',
    '[INFO] Synced with global OFAC sanctioned addresses ledger.',
    '[SCAN] Block #1945102 - 14 transactions processed.',
    '[SCAN] Tx 0x4fa...9d3: Low risk profile (score: 98/100).',
    '[SCAN] Tx 0xb73...a41: Verified Merchant payment (Cafe Grano Digital) approved.'
  ]);

  // Savings Goal details
  const savingsGoals = {
    general: { label: 'Ahorro General', icon: <Coins className="w-4 h-4 text-amber-500" />, yieldApy: 8 },
    health: { label: 'Fondo Médico / Prepagos de Salud', icon: <Heart className="w-4 h-4 text-red-500" />, yieldApy: 12 },
    education: { label: 'Inscripciones Educativas TZC', icon: <GraduationCap className="w-4 h-4 text-cyan-500" />, yieldApy: 10 }
  };

  // Run AML mock scanner
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning) {
      timer = setInterval(() => {
        const timestamp = new Date().toLocaleTimeString();
        const randomTx = '0x' + Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        const score = Math.floor(Math.random() * 50) + 50;

        let riskStatus = 'Low Risk';
        if (score < 65) {
          riskStatus = 'SUSPICIOUS - GENERATING AUTONOMOUS RAS REPORT';
        }

        const logMessage = `[${timestamp}] [SCAN] Tx ${randomTx}... - Score: ${score}/100 - Status: ${riskStatus}`;

        setScanLogs(prev => {
          const updated = [logMessage, ...prev];
          return updated.slice(0, 15); // keep max 15
        });
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isScanning]);

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor introduce un monto válido.');
      return;
    }
    if (userTzcBalance < amount) {
      alert('Balance insuficiente en tu wallet para guardar en el cofre.');
      return;
    }

    addUserTzc(-amount);
    setSafeBalance(prev => prev + amount);
    setDepositAmount('');
    alert(`Depósito exitoso. Has resguardado ${amount} $TZC en el cofre de seguridad CriptoSafe (${savingsGoals[savingsCategory].label}).`);
  };

  const handleWithdraw = () => {
    if (safeBalance <= 0) {
      alert('No tienes saldo en el cofre.');
      return;
    }
    const amount = safeBalance;
    setSafeBalance(0);
    addUserTzc(amount);
    alert(`Retiro exitoso. Se han liberado ${amount.toFixed(2)} $TZC de vuelta a tu wallet.`);
  };

  return (
    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-8" id="criptosafe_module">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
          CriptoSafe & Cumplimiento LA/FT
        </h2>
        <p className="text-neutral-400 text-sm mt-1">
          Billetera fría con resguardo de ahorro prepago contra inflación y motor autónomo de monitoreo contra lavado de activos.
        </p>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative h-48 md:h-60 rounded-xl overflow-hidden border border-neutral-800">
        <img
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200"
          alt="CriptoSafe Cyber Protection"
          className="w-full h-full object-cover filter brightness-45 saturate-120"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
          <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
            Seguridad & Cumplimiento
          </span>
          <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
            Resguardo Patrimonial e Inteligencia Financiera Anti-Lavado
          </h3>
          <p className="text-neutral-300 text-xs mt-1 max-w-xl">
            Ahorra en criptoactivos estables y tokens de utilidad mientras nuestro motor automatizado de cumplimiento en vivo garantiza la legalidad de cada transacción.
          </p>
        </div>
      </div>

      {/* Program Details: What, How, Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* ¿Qué es? */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            🛡️
          </div>
          <h4 className="text-white font-bold text-sm">¿Qué es CriptoSafe?</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Es la infraestructura integrada de seguridad y cumplimiento normativo de <strong className="text-white">TuZonaCripto</strong>. Ofrece un sistema de resguardo de ahorro prepago contra la inflación y un escáner autónomo de transacciones.
          </p>
        </div>

        {/* ¿Cómo funciona? */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            ⚙️
          </div>
          <h4 className="text-white font-bold text-sm">¿Cómo funciona?</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">1.</span>
              <span><strong>Cofres de Propósito:</strong> Deposita tus tokens en bóvedas de rendimiento para propósitos específicos (salud, educación).</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">2.</span>
              <span><strong>Monitoreo LA/FT:</strong> El algoritmo analiza firmas de transacciones on-chain y genera alertas de riesgo.</span>
            </li>
          </ul>
        </div>

        {/* Beneficios */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            🌟
          </div>
          <h4 className="text-white font-bold text-sm">Beneficios Clave</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Mitigación Inflacionaria:</strong> Tasas de rendimiento de hasta el 12% APY.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Ecosistema Limpio:</strong> Minimiza el riesgo de interactuar con fondos de origen dudoso.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Garantía de Custodia:</strong> Billetera fría y resguardo inteligente de los fondos bloqueados.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-neutral-900">
        {/* Left column: CriptoSafe Savings Vault */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4 text-left">
            <h3 className="text-white text-sm font-semibold flex items-center gap-2 border-b border-neutral-800 pb-2">
              <Shield className="w-4 h-4 text-red-500" />
              Billetera de Ahorro / Prepago (CriptoSafe)
            </h3>
            <p className="text-[10px] text-neutral-400">
              Mitiga la devaluación local resguardando tus tokens $TZC en bóvedas de rendimiento especializado para cubrir servicios futuros.
            </p>

            {/* Balances card */}
            <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 text-center space-y-1">
              <span className="text-[10px] text-neutral-500 font-bold uppercase block">Balance Total Protegido</span>
              <p className="text-3xl font-mono font-black text-white">{safeBalance.toFixed(2)} $TZC</p>
              <p className="text-xs text-neutral-400 font-medium">(~${(safeBalance * 0.12).toFixed(2)} USD)</p>
            </div>

            {/* Savings form */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-[10px] text-neutral-400 font-semibold mb-1 uppercase">Propósito del Cofre</label>
                <select
                  value={savingsCategory}
                  onChange={(e) => setSavingsCategory(e.target.value as 'health' | 'education' | 'general')}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-300"
                >
                  <option value="general">Ahorro Flexible General (8% APY)</option>
                  <option value="health">Resguardo para Seguros y Salud (12% APY)</option>
                  <option value="education">Ahorro para Colegios e Inscripciones (10% APY)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-semibold mb-1 uppercase">Monto a Depositar</label>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Monto en TZC"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white font-mono"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-500 font-mono">TZC</span>
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">Tu wallet posee: {userTzcBalance.toFixed(2)} $TZC</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleWithdraw}
                  className="flex-1 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 border border-neutral-800 py-2 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Liberar Cofre
                </button>
                <button
                  onClick={handleDeposit}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Guardar
                </button>
              </div>
            </div>

            {/* Yield estimator */}
            <div className="bg-neutral-950/60 p-3 rounded-lg border border-neutral-900 text-xs text-neutral-400 space-y-1">
              <span className="text-[10px] font-bold text-white block">Estimado a un año (Fórmula de Interés Compuesto):</span>
              <p className="font-mono">
                Rendimiento: <strong className="text-emerald-400">+{ (safeBalance * (savingsGoals[savingsCategory].yieldApy / 100)).toFixed(2) } TZC</strong> por año ({ savingsGoals[savingsCategory].yieldApy }% APY).
              </p>
            </div>
          </div>
        </div>

        {/* Right column: LA/FT AML Scanner */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-900 p-5 rounded-xl border border-neutral-800 min-h-[380px] h-full text-left">
          <div className="space-y-2 border-b border-neutral-800 pb-3 mb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-sm font-semibold flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-red-500" />
                Módulo LA/FT: Escáner de Cumplimiento en Vivo
              </h3>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setIsScanning(true)}
                  disabled={isScanning}
                  className={`p-1 rounded transition ${isScanning ? 'text-red-500' : 'text-neutral-500 hover:text-neutral-300'}`}
                  title="Iniciar escáner"
                >
                  <Play className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsScanning(false)}
                  disabled={!isScanning}
                  className={`p-1 rounded transition ${!isScanning ? 'text-red-500' : 'text-neutral-500 hover:text-neutral-300'}`}
                  title="Detener escáner"
                >
                  <Square className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-[10px] text-neutral-400 leading-normal">
              Sistema inteligente de prevención de lavado de activos y financiamiento al terrorismo. Analiza redes de transacciones on-chain de forma automática en busca de anomalías financieras.
            </p>
          </div>

          {/* Terminal log logs */}
          <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-900 flex-1 font-mono text-[10px] text-neutral-300 space-y-1.5 overflow-y-auto max-h-56 pr-2 mb-4 scrollbar-thin scrollbar-thumb-neutral-800">
            {scanLogs.map((log, idx) => {
              let textClass = 'text-neutral-400';
              if (log.includes('SUSPICIOUS')) textClass = 'text-red-500 font-bold';
              else if (log.includes('INIT')) textClass = 'text-emerald-400 font-semibold';
              else if (log.includes('Score: 9')) textClass = 'text-neutral-300';

              return (
                <div key={idx} className={`${textClass} leading-relaxed`}>
                  {log}
                </div>
              );
            })}
            {isScanning && (
              <div className="text-[9px] text-red-500/80 italic flex items-center gap-1.5 pt-1">
                <Loader className="w-3 h-3 animate-spin" /> Escaneando firmas de transacciones en la red...
              </div>
            )}
          </div>

          <div className="bg-neutral-950 p-3 rounded-lg border border-red-950/40 text-[10px] text-neutral-400 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <p className="leading-normal">
              <strong className="text-white">Reporte de Actividad Sospechosa (RAS):</strong> En caso de que el algoritmo asigne un score menor a 65%, el software genera automáticamente una firma cifrada enviada directamente a los entes de control regulatorio locales para cumplimiento normativo estricto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
