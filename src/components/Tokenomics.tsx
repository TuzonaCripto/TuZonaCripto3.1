import React, { useState } from 'react';
import { Coins, Flame, ArrowUpRight, Lock, TrendingUp, Info, Vote, ChevronRight } from 'lucide-react';

interface TokenomicsProps {
  userTzcBalance: number;
  addUserTzc: (amount: number) => void;
}

export default function Tokenomics({ userTzcBalance, addUserTzc }: TokenomicsProps) {
  // Staking inputs
  const [stakeAmount, setStakeAmount] = useState('100');
  const [stakeDays, setStakeDays] = useState(180); // 30, 90, 180, 365
  const [lockedStakes, setLockedStakes] = useState<{ id: string; amount: number; reward: number; unlockDate: string }[]>([
    { id: 'st-1', amount: 250, reward: 22.50, unlockDate: '2026-09-15' }
  ]);

  // Burns simulator
  const [totalBurned, setTotalBurned] = useState(1245080);

  // Staking reward calculations:
  // Base rates: 30d -> 6% APY, 90d -> 8% APY, 180d -> 12% APY, 365d -> 18% APY
  const getApyByDays = (days: number) => {
    if (days <= 30) return 6;
    if (days <= 90) return 8;
    if (days <= 180) return 12;
    return 18;
  };

  const selectedApy = getApyByDays(stakeDays);
  const estimatedReward = (parseFloat(stakeAmount) || 0) * (selectedApy / 100) * (stakeDays / 365);

  const handleStake = () => {
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor introduce un monto válido.');
      return;
    }
    if (userTzcBalance < amount) {
      alert('Balance insuficiente en tu wallet para realizar este staking.');
      return;
    }

    addUserTzc(-amount);

    const unlock = new Date();
    unlock.setDate(unlock.getDate() + stakeDays);

    const newStake = {
      id: 'st-' + Math.random().toString(36).substring(7),
      amount,
      reward: parseFloat(estimatedReward.toFixed(2)),
      unlockDate: unlock.toISOString().split('T')[0]
    };

    setLockedStakes(prev => [newStake, ...prev]);
    setStakeAmount('');
    alert(`¡Staking Exitoso! Has bloqueado ${amount} $TZC por ${stakeDays} días al ${selectedApy}% APY.`);
  };

  const handleClaimStake = (id: string, refundAmount: number, reward: number) => {
    // Return capital + rewards to wallet
    addUserTzc(refundAmount + reward);
    setLockedStakes(prev => prev.filter(st => st.id !== id));
    alert(`Reclamo Exitoso. Has recibido de vuelta tus ${refundAmount} $TZC principales más ${reward} $TZC de recompensas acumuladas.`);
  };

  return (
    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-8" id="tokenomics_module">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
          Tokenomics $TZC & Staking
        </h2>
        <p className="text-neutral-400 text-sm mt-1">
          Métricas de distribución de valor de la moneda de utilidad y simulación descentralizada de bloqueo de liquidez.
        </p>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative h-48 md:h-60 rounded-xl overflow-hidden border border-neutral-800">
        <img
          src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1200"
          alt="Tokenomics Crypto Economy"
          className="w-full h-full object-cover filter brightness-45 saturate-120"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
          <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
            Economía de Red
          </span>
          <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
            Arquitectura de Utilidad, Quema Deflacionaria y Staking APY
          </h3>
          <p className="text-neutral-300 text-xs mt-1 max-w-xl">
            La moneda nativa del ecosistema TuZonaCripto ($TZC) está configurada bajo rigurosos principios matemáticos para asegurar la escasez, incentivar el ahorro a largo plazo y potenciar la gobernanza comunitaria.
          </p>
        </div>
      </div>

      {/* Program Details: What, How, Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* ¿Qué es? */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            🪙
          </div>
          <h4 className="text-white font-bold text-sm">¿Qué es el Token $TZC?</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Es el activo digital de utilidad (<strong className="text-white">utility token</strong>) que sirve como combustible transaccional de todos los módulos del holding de empresas TuZonaCripto.
          </p>
        </div>

        {/* ¿Cómo funciona? */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            📈
          </div>
          <h4 className="text-white font-bold text-sm">¿Cómo funciona?</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">1.</span>
              <span><strong>Flujo de Utilidad:</strong> Úsalo para obtener hasta un 15% de descuento en el directorio y pagar servicios.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">2.</span>
              <span><strong>Mecanismo de Quema:</strong> El 20% de las comisiones cobradas en CriptoPay se queman sacándose de circulación permanentemente.</span>
            </li>
          </ul>
        </div>

        {/* Beneficios */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            📊
          </div>
          <h4 className="text-white font-bold text-sm">Beneficios Clave</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Rendimiento Pasivo:</strong> Gana hasta 18% APY bloqueando liquidez en staking.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Escasez Programada:</strong> Deflación constante que incentiva la apreciación orgánica.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Gobernanza Directa:</strong> Participa con voto en las decisiones del DAO del ecosistema.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-neutral-900">
        {/* Token allocation and metrics info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4 text-left">
            <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
              <Coins className="w-4 h-4 text-red-500" />
              Especificaciones de Utilidad del Token
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-red-500 font-bold block">01 / Pago Directo</span>
                <p className="text-[10px] text-neutral-400 leading-normal">Paga tus facturas y obtén descuentos de hasta 15% en CriptoMap y CriptoRides.</p>
              </div>

              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-red-500 font-bold block">02 / Staking APY</span>
                <p className="text-[10px] text-neutral-400 leading-normal">Bloquea liquidez de red y genera hasta un 18% anualizado de rendimiento garantizado.</p>
              </div>

              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-red-500 font-bold block">03 / Gobernanza</span>
                <p className="text-[10px] text-neutral-400 leading-normal">Vota en propuestas comunitarias clave para la expansión y listados del directorio.</p>
              </div>

              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-1">
                <span className="text-red-500 font-bold block">04 / Cursos Premium</span>
                <p className="text-[10px] text-neutral-400 leading-normal">Accede a webinars avanzados de desarrollo Solidity y Rust en CriptoLab.</p>
              </div>
            </div>

            {/* Deflation burn display */}
            <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 font-semibold uppercase block">Mecanismo Deflacionario</span>
                <p className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-500" />
                  Quemados: {totalBurned.toLocaleString()} $TZC
                </p>
                <p className="text-[9px] text-neutral-500">Quema periódica del 20% de comisiones por transacciones de CriptoPay.</p>
              </div>
              <button
                onClick={() => {
                  setTotalBurned(prev => prev + 100);
                  alert('Has desencadenado la quema de comisiones acumuladas. ¡100 $TZC quemados en vivo de las comisiones recolectadas!');
                }}
                className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-900/40 hover:border-red-600 text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
              >
                Quemar
              </button>
            </div>
          </div>

          {/* Allocation Breakdown */}
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-3 text-left">
            <h3 className="text-white text-sm font-semibold border-b border-neutral-800 pb-2">Distribución de Tokenomics</h3>
            <div className="space-y-2.5 pt-1.5">
              {[
                { label: 'Venta Pública/Privada', pct: 40, color: 'bg-red-600' },
                { label: 'Equipo & Advisors (Vesting 4 Años)', pct: 20, color: 'bg-neutral-400' },
                { label: 'Reserva para Ecosistema', pct: 15, color: 'bg-neutral-600' },
                { label: 'Desarrollo Comunitario y Marketing', pct: 15, color: 'bg-neutral-700' },
                { label: 'Liquidez DEXs / CEXs', pct: 10, color: 'bg-neutral-800' }
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-300 font-medium">{item.label}</span>
                    <span className="font-mono font-bold text-white">{item.pct}%</span>
                  </div>
                  <div className="w-full bg-neutral-950 h-2.5 rounded-full overflow-hidden border border-neutral-900">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Interactive Staking Calculator */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4 text-left">
            <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
              <Lock className="w-4 h-4 text-red-500" />
              Calculadora de Rendimiento Staking $TZC
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] text-neutral-400 font-bold uppercase mb-1.5">Monto de Tokens a Bloquear</label>
                <div className="relative">
                  <input
                    type="number"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none"
                    placeholder="Monto en TZC"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-500">TZC</span>
                </div>
                <p className="text-[10px] text-neutral-500 mt-1">Wallet disponible: {userTzcBalance.toFixed(2)} $TZC</p>
              </div>

              <div>
                <label className="block text-[10px] text-neutral-400 font-bold uppercase mb-1.5">Periodo de Bloqueo de Liquidez</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { days: 30, label: '30 Días', apy: 6 },
                    { days: 90, label: '90 Días', apy: 8 },
                    { days: 180, label: '180 Días', apy: 12 },
                    { days: 365, label: '365 Días', apy: 18 }
                  ].map((period) => {
                    const active = stakeDays === period.days;
                    return (
                      <button
                        key={period.days}
                        onClick={() => setStakeDays(period.days)}
                        className={`p-2.5 rounded-lg border text-center transition cursor-pointer ${
                          active
                            ? 'bg-red-950/20 border-red-600 text-white'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <span className="block font-bold text-xs text-white">{period.label}</span>
                        <span className="block text-[9px] text-red-500 font-mono mt-0.5">{period.apy}% APY</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reward calculation outputs */}
              <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 block">Rendimiento Estimado Acumulado</span>
                  <span className="text-lg font-mono font-black text-emerald-400 mt-0.5">
                    +{estimatedReward.toFixed(2)} $TZC
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-500 block">Tasa APY</span>
                  <span className="text-xs font-bold text-white font-mono">{selectedApy}% Anualizado</span>
                </div>
              </div>

              <button
                onClick={handleStake}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Lock className="w-4 h-4" /> Activar Bloqueo de Staking
              </button>
            </div>
          </div>

          {/* Staked Positions */}
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-3 text-left">
            <h3 className="text-white text-sm font-semibold border-b border-neutral-800 pb-2 flex justify-between items-center">
              <span>Tus Depósitos Bloqueados</span>
              <span className="text-[10px] bg-red-950/30 text-red-400 border border-red-900/30 px-2 py-0.5 rounded-full font-mono">
                Smart Escrow Contracts
              </span>
            </h3>

            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {lockedStakes.length === 0 ? (
                <p className="text-xs text-neutral-500 text-center py-4">No posees tokens en staking actualmente.</p>
              ) : (
                lockedStakes.map((stake) => (
                  <div key={stake.id} className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-white">{stake.amount} TZC</span>
                        <span className="text-[9px] bg-red-950/30 text-red-400 px-1.5 py-0.5 rounded-full">Bloqueado</span>
                      </div>
                      <p className="text-[9px] text-neutral-500 font-mono mt-1">Expira: {stake.unlockDate}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-[9px] text-neutral-500 block">Interés acumulado</span>
                      <span className="font-mono text-emerald-400 font-bold">+{stake.reward} TZC</span>
                      <button
                        onClick={() => handleClaimStake(stake.id, stake.amount, stake.reward)}
                        className="block mt-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 text-[9px] px-2 py-1 rounded cursor-pointer"
                      >
                        Reclamar e Importar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
