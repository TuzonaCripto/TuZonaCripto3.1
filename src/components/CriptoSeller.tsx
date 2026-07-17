import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Percent, 
  FileText, 
  Award, 
  CheckCircle, 
  Copy, 
  Share2, 
  Download, 
  ArrowRight, 
  Sparkles, 
  DollarSign, 
  BookOpen, 
  Check, 
  Briefcase, 
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Handshake,
  UserPlus,
  Compass
} from 'lucide-react';

export default function CriptoSeller() {
  // Navigation inside the module: 'program' | 'dashboard'
  const [isRegistered, setIsRegistered] = useState(false);
  
  // Registration Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [telegram, setTelegram] = useState('');
  const [caracasZone, setCaracasZone] = useState('Chacao');
  const [payoutMethod, setPayoutMethod] = useState<'USDT' | 'VES'>('USDT');
  const [walletAddress, setWalletAddress] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Calculator State
  const [proSales, setProSales] = useState<number>(5);
  const [premiumSales, setPremiumSales] = useState<number>(2);
  const [annualSalesCount, setAnnualSalesCount] = useState<number>(1);

  // Accordion state for FAQs/Sales Protocol
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Copied toast state
  const [copiedText, setCopiedText] = useState(false);

  // Withdraw simulation state
  const [withdrawStatus, setWithdrawStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  // Sales protocol objections
  const objections = [
    {
      q: 'El comerciante dice: "Las criptomonedas son inestables y muy volátiles."',
      a: 'Respuesta clave: Explícale que el directorio prioriza el uso de USDT (Tether), una stablecoin anclada 1:1 al dólar estadounidense. Al vender, reciben USDT y no hay riesgo de fluctuación. Además, la pasarela de TuZonaCripto permite liquidaciones rápidas.'
    },
    {
      q: 'El comerciante dice: "No sé cómo usar una wallet ni cobrar."',
      a: 'Respuesta clave: TuZonaCripto ofrece capacitación express gratuita. Como TZC-Seller, puedes guiarlo a crear su wallet (por ejemplo, Trust Wallet o MetaMask) y mostrarle la interfaz simplificada del botón CriptoPay. Es tan fácil como escanear un código QR.'
    },
    {
      q: 'El comerciante dice: "¿Por qué debería pagar por estar listado?"',
      a: 'Respuesta clave: El Plan Básico es 100% gratuito para que prueben el tráfico. Los planes de pago (Pro y Premium) no solo los posicionan mejor en el mapa de Caracas, sino que les dan acceso a herramientas comerciales reales: botones de pago express CriptoPay, integración de despachos rápidos con CriptoGo y exhibición de su menú de productos.'
    },
    {
      q: 'El comerciante dice: "¿Qué tan legal es cobrar en cripto en Venezuela?"',
      a: 'Respuesta clave: El uso de criptoactivos está regulado y permitido en el comercio como método de pago alternativo según convenios vigentes, siempre que se registre adecuadamente. TuZonaCripto promueve el cumplimiento normativo con el módulo CriptoSafe (LA/FT).'
    }
  ];

  // Calculations for commission
  const totalSalesCount = proSales + premiumSales;
  let commissionRate = 0.10; // 10% standard
  let currentLevel = 'Nivel 1';
  
  if (totalSalesCount >= 6 && totalSalesCount <= 15) {
    commissionRate = 0.15; // 15%
    currentLevel = 'Nivel 2';
  } else if (totalSalesCount >= 16) {
    commissionRate = 0.20; // 20%
    currentLevel = 'Nivel 3';
  }

  // Plan values: Pro is $15/mo, Premium is $35/mo. Annual is treated as Pro or Premium but has a 5% bonus.
  // Let's assume average annual plan is $180 ($15/mo * 12).
  const proRevenue = proSales * 15;
  const premiumRevenue = premiumSales * 35;
  const standardRevenue = proRevenue + premiumRevenue;
  
  // Base Commission
  const baseCommission = standardRevenue * commissionRate;
  
  // Bonus: Let's assume $180 annual plan sold has 5% extra bonus. Let's calculate 5% on annual sales (value $180 each)
  const annualBonus = annualSalesCount * 180 * 0.05;
  
  const estimatedMonthlyEarnings = baseCommission + annualBonus;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) {
      alert('Por favor complete los campos obligatorios.');
      return;
    }
    if (!acceptedTerms) {
      alert('Debe aceptar los términos y condiciones del programa.');
      return;
    }

    setIsRegistering(true);
    setTimeout(() => {
      setIsRegistering(false);
      setIsRegistered(true);
    }, 1500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://tuzonacripto.com/ref/tzc-${fullName.toLowerCase().replace(/\s+/g, '-') || 'agente'}`);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleWithdraw = () => {
    setWithdrawStatus('processing');
    setTimeout(() => {
      setWithdrawStatus('success');
      setTimeout(() => setWithdrawStatus('idle'), 4000);
    }, 2500);
  };

  return (
    <div className="space-y-6" id="tzc_seller_module">
      
      {/* Hero Banner TZC-Seller */}
      <div className="relative h-56 md:h-64 rounded-2xl overflow-hidden border border-neutral-900 shadow-md bg-gradient-to-r from-neutral-950 via-red-950/20 to-neutral-950">
        <img
          src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=1200"
          alt="Equipo TZC-Seller Fuerza de Ventas"
          className="w-full h-full object-cover filter brightness-30 saturate-120 absolute inset-0"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Si falla la descarga por políticas de red o sandbox del iframe, ocultamos el img
            // y se conservará el hermoso fondo degradado negro/rojo
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent flex flex-col md:flex-row md:items-end justify-between p-6 gap-4 z-10">
          <div className="space-y-1 text-left">
            <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-1.5 block">
              Fuerza de Ventas Externa Web3
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Programa TZC-Seller
            </h2>
            <p className="text-neutral-300 text-xs mt-1 max-w-xl leading-relaxed">
              Conviértete en un agente de ventas autónomo y genera ingresos ilimitados integrando negocios caraqueños a la plataforma cripto líder en Venezuela.
            </p>
          </div>
          
          <div className="flex items-center shrink-0">
            {!isRegistered ? (
              <a 
                href="#register-section"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-3 rounded-xl text-xs transition duration-200 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-red-950/40 hover:scale-102 transform duration-150"
              >
                <UserPlus className="w-4 h-4" />
                <span>Inscribirse como Agente</span>
              </a>
            ) : (
              <span className="bg-emerald-950/80 border border-emerald-800 text-emerald-400 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 backdrop-blur-sm">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></span>
                Agente TZC Activo
              </span>
            )}
          </div>
        </div>
      </div>

      {!isRegistered ? (
        // Visitor/Applicant View
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Value Proposition */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-red-500" />
                Propuesta de Valor para el Vendedor
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-900 space-y-1.5">
                  <div className="w-8 h-8 bg-emerald-950/50 border border-emerald-900 rounded-lg flex items-center justify-center text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Ingresos flexibles</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Potencial ilimitado, cobrando comisiones de hasta el 20% más bonos por cada comercio que registre un plan de pago.
                  </p>
                </div>

                <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-900 space-y-1.5">
                  <div className="w-8 h-8 bg-red-950/50 border border-red-900 rounded-lg flex items-center justify-center text-red-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Sin inversión inicial</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    No necesitas aportar capital. Te proporcionamos las herramientas digitales, folletos y el manual de capacitación.
                  </p>
                </div>

                <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-900 space-y-1.5">
                  <div className="w-8 h-8 bg-blue-950/50 border border-blue-900 rounded-lg flex items-center justify-center text-blue-400">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Producto innovador</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Ofrece soluciones reales de alta demanda: posicionamiento geoespacial, pasarela de pago CriptoPay y CriptoGo logístico.
                  </p>
                </div>

                <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-900 space-y-1.5">
                  <div className="w-8 h-8 bg-purple-950/50 border border-purple-900 rounded-lg flex items-center justify-center text-purple-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-white">Soporte de Marketing</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Accede de forma gratuita a flyers comerciales, logos imprimibles de "Aceptamos Cripto" y guiones de venta presencial.
                  </p>
                </div>
              </div>
            </div>

            {/* Commission Levels */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Percent className="w-5 h-5 text-red-500" />
                  Estructura de Comisiones Escalonada
                </h3>
                <p className="text-xs text-neutral-400 mt-1">Calculado sobre el valor mensual neto de la primera suscripción cobrada.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850 space-y-2 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-neutral-850 rounded-bl-full flex items-center justify-center text-[10px] font-bold text-neutral-500">Lv1</div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Nivel Básico</span>
                  <span className="text-2xl font-black text-white font-mono">10%</span>
                  <p className="text-[10px] text-neutral-400 leading-snug">Para agentes con 0 a 5 suscripciones vendidas al mes.</p>
                </div>

                <div className="bg-neutral-900 p-4 rounded-xl border-red-900/40 border space-y-2 relative overflow-hidden ring-1 ring-red-950/30">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-red-950/30 rounded-bl-full flex items-center justify-center text-[10px] font-bold text-red-500">Lv2</div>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider block">Nivel Intermedio</span>
                  <span className="text-2xl font-black text-red-500 font-mono">15%</span>
                  <p className="text-[10px] text-neutral-400 leading-snug">Para agentes con 6 a 15 suscripciones vendidas al mes.</p>
                </div>

                <div className="bg-neutral-900 p-4 rounded-xl border-amber-900/40 border space-y-2 relative overflow-hidden ring-1 ring-amber-950/30">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-amber-950/30 rounded-bl-full flex items-center justify-center text-[10px] font-bold text-amber-500">Lv3</div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Nivel Líder</span>
                  <span className="text-2xl font-black text-amber-400 font-mono">20%</span>
                  <p className="text-[10px] text-neutral-400 leading-snug">Para agentes con más de 16 suscripciones vendidas al mes.</p>
                </div>
              </div>

              {/* Extra Bonuses */}
              <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-850 flex items-start gap-3 text-xs">
                <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-white block">Bonificación Adicional por Planes Anuales</span>
                  <p className="text-neutral-400 leading-relaxed text-[11px]">
                    Para incentivar la venta de suscripciones de largo plazo, recibirás un bono del <span className="text-amber-400 font-extrabold">+5% adicional</span> sobre el total neto del primer cobro de planes de suscripción anuales.
                  </p>
                </div>
              </div>
            </div>

            {/* Sales objections Accordion */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-red-500" />
                Protocolo de Ventas: Manejo de Objeciones
              </h3>
              <p className="text-xs text-neutral-400">Te capacitamos para el éxito. Aquí tienes las objeciones comerciales más frecuentes de comercios caraqueños y cómo superarlas:</p>
              
              <div className="space-y-2.5">
                {objections.map((obj, idx) => {
                  const isOpen = expandedFAQ === idx;
                  return (
                    <div key={idx} className="border border-neutral-900 rounded-xl bg-neutral-900/20 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setExpandedFAQ(isOpen ? null : idx)}
                        className="w-full text-left p-3.5 flex justify-between items-center text-xs font-bold text-white hover:bg-neutral-900/40 transition cursor-pointer"
                      >
                        <span className="pr-4">{obj.q}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-neutral-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-neutral-500 shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="p-4 bg-neutral-950 border-t border-neutral-900 text-[11px] text-neutral-400 leading-relaxed">
                          {obj.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Commission Calculator & Registration Form */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Interactive Calculator */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">Simulador Financiero</span>
                <h3 className="text-base font-bold text-white">Calculadora de Comisiones</h3>
                <p className="text-xs text-neutral-400">Ajusta los sliders para proyectar tu ganancia mensual estimada de forma transparente.</p>
              </div>

              <div className="space-y-4 pt-2">
                {/* Slider for Pro Sales */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400 font-medium">Planes CriptoPro vendidos ($15/mes)</span>
                    <span className="font-bold text-white font-mono">{proSales} Comercios</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={proSales}
                    onChange={(e) => setProSales(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                {/* Slider for Premium Sales */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400 font-medium">Planes Élite Web3 vendidos ($35/mes)</span>
                    <span className="font-bold text-white font-mono">{premiumSales} Comercios</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={premiumSales}
                    onChange={(e) => setPremiumSales(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                {/* Slider for Annual Sales (Extra Bonus) */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400 font-medium">Planes Anuales colocados ($180 promedio)</span>
                    <span className="font-bold text-amber-400 font-mono">{annualSalesCount} Planes</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={annualSalesCount}
                    onChange={(e) => setAnnualSalesCount(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>

              {/* Calculator Summary */}
              <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850 space-y-3 font-mono">
                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>Comercios Totales:</span>
                  <span className="text-white font-bold">{totalSalesCount}</span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>Rango de Comisión:</span>
                  <span className="text-red-500 font-bold uppercase">{currentLevel} ({Math.round(commissionRate * 100)}%)</span>
                </div>
                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>Bono por Anuales (+5%):</span>
                  <span className="text-amber-400 font-bold">${annualBonus.toFixed(2)} USDT</span>
                </div>

                <div className="border-t border-neutral-800 pt-3 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-neutral-300">Ingreso Mensual Estimado:</span>
                  <span className="text-xl font-extrabold text-emerald-400">
                    ${estimatedMonthlyEarnings.toFixed(2)} <span className="text-xs text-neutral-400">USDT</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-4" id="register-section">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">Únete al Equipo</span>
                <h3 className="text-base font-bold text-white">Formulario de Registro</h3>
                <p className="text-xs text-neutral-400">Completa tus datos personales para habilitar tu código de referidos y manual técnico de TZC-Seller.</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Juan Pérez"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Teléfono Móvil *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. +58 412-5550100"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Usuario Telegram / WhatsApp</label>
                    <input
                      type="text"
                      placeholder="Ej. @juanperez"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    placeholder="Ej. juanperez@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Zona Primaria (Caracas) *</label>
                    <select
                      value={caracasZone}
                      onChange={(e) => setCaracasZone(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-2 py-2 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
                    >
                      <option value="Chacao">Chacao</option>
                      <option value="Baruta">Baruta (Las Mercedes/Prados)</option>
                      <option value="El Hatillo">El Hatillo</option>
                      <option value="Libertador">Libertador (Centro/Oeste)</option>
                      <option value="Sucre">Sucre (Leoncio Martínez/Petare)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Canal de Pago Comisiones *</label>
                    <select
                      value={payoutMethod}
                      onChange={(e) => setPayoutMethod(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-2 py-2 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
                    >
                      <option value="USDT">USDT (Polygon Network)</option>
                      <option value="VES">Bolívares (Pago Móvil / VES)</option>
                    </select>
                  </div>
                </div>

                {payoutMethod === 'USDT' ? (
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Dirección de Wallet USDT Polygon (0x...) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. 0x71C...B29"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 font-mono"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1">Datos de Pago Móvil (Cédula, Banco, Celular) *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Banesco, CI 12.345.678, 0412-1234567"
                      value={bankDetails}
                      onChange={(e) => setBankDetails(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600"
                    />
                  </div>
                )}

                <div className="flex items-start gap-2 pt-1 text-xs">
                  <input
                    type="checkbox"
                    id="terms_check"
                    required
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 bg-neutral-900 border-neutral-800 rounded text-red-600 focus:ring-red-600"
                  />
                  <label htmlFor="terms_check" className="text-neutral-400 text-[11px] select-none leading-relaxed">
                    Acepto que actúo como agente independiente (no empleado directo) y que mis honorarios se basan 100% en las comisiones de planes efectivos cobrados.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/20 mt-2"
                >
                  {isRegistering ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Procesando Credenciales...</span>
                    </>
                  ) : (
                    <>
                      <Handshake className="w-4 h-4" />
                      <span>Registrarme como TZC-Seller</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      ) : (
        // Active TZC-Seller Dashboard View
        <div className="space-y-6 animate-fadeIn">
          
          {/* Welcome Dashboard metrics block */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Metric 1 */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-900 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Agente Autorizado</span>
                <p className="text-sm font-extrabold text-white line-clamp-1">{fullName || 'Juan Pérez'}</p>
                <span className="text-[9px] bg-red-950 text-red-500 border border-red-900/40 px-1.5 py-0.5 rounded font-mono font-bold uppercase">TZC-ID: {Math.floor(1000 + Math.random()*9000)}</span>
              </div>
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-red-500 font-bold border border-neutral-850">
                👨‍💼
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-900 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Rango Comisión</span>
                <p className="text-lg font-black text-red-500 font-mono">15% <span className="text-xs text-neutral-400 font-sans font-bold">(Nivel 2)</span></p>
                <span className="text-[9px] text-neutral-400">8 de 15 ventas para Nivel 3 (20%)</span>
              </div>
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-red-500 font-bold border border-neutral-850">
                <Percent className="w-4 h-4" />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-900 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Comisiones Acumuladas</span>
                <p className="text-xl font-black text-emerald-400 font-mono">$105.00 <span className="text-xs text-neutral-400 font-sans font-bold">USDT</span></p>
                <span className="text-[9px] text-emerald-500 font-bold">✓ Disponibles para retirar</span>
              </div>
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-emerald-400 font-bold border border-neutral-850">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-900 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Comercios Afiliados</span>
                <p className="text-lg font-black text-white font-mono">8 Registros</p>
                <span className="text-[9px] text-neutral-400">6 Activos, 2 Pendientes Pago</span>
              </div>
              <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-neutral-400 font-bold border border-neutral-850">
                <Briefcase className="w-4 h-4 text-amber-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Content Area: Affiliate link & Referred Merchants */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Affiliate Link card */}
              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-red-500" />
                    Tu Enlace de Referido Único
                  </h3>
                  <p className="text-xs text-neutral-400">Comparte este enlace con los comercios caraqueños. El sistema rastreará su registro automáticamente y te asignará la comisión de por vida.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-xs text-white font-mono flex items-center justify-between overflow-x-auto">
                    <span>https://tuzonacripto.com/ref/tzc-{(fullName || 'agente').toLowerCase().replace(/\s+/g, '-')}</span>
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-bold px-5 py-3 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{copiedText ? '¡Copiado!' : 'Copiar Enlace'}</span>
                  </button>
                </div>
              </div>

              {/* Referred Merchants List */}
              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-red-500" />
                    Historial de Comercios Referidos
                  </h3>
                  <span className="text-[10px] bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400 font-mono">Últimos 4 Registros</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-900 text-neutral-500 font-bold">
                        <th className="py-2.5">Comercio</th>
                        <th className="py-2.5">Fecha</th>
                        <th className="py-2.5">Plan</th>
                        <th className="py-2.5">Comisión TZC</th>
                        <th className="py-2.5 text-right">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-900">
                      <tr>
                        <td className="py-3 font-bold text-white flex items-center gap-2">
                          <span>🍔</span>
                          <span>Burguer Cripto Las Mercedes</span>
                        </td>
                        <td className="py-3 text-neutral-400">2026-07-15</td>
                        <td className="py-3"><span className="text-[10px] bg-red-950 text-red-400 border border-red-900/30 px-1.5 py-0.5 rounded font-bold font-mono">Plan Pro</span></td>
                        <td className="py-3 font-mono text-emerald-400 font-bold">$2.25 USDT</td>
                        <td className="py-3 text-right">
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900/30 px-2 py-0.5 rounded-full font-bold">Activo</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="py-3 font-bold text-white flex items-center gap-2">
                          <span>🦷</span>
                          <span>Clínica Dental Chacao</span>
                        </td>
                        <td className="py-3 text-neutral-400">2026-07-12</td>
                        <td className="py-3"><span className="text-[10px] bg-amber-950 text-amber-400 border border-amber-900/30 px-1.5 py-0.5 rounded font-bold font-mono">Plan Élite</span></td>
                        <td className="py-3 font-mono text-emerald-400 font-bold">$7.00 USDT</td>
                        <td className="py-3 text-right">
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900/30 px-2 py-0.5 rounded-full font-bold">Activo</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="py-3 font-bold text-white flex items-center gap-2">
                          <span>🛍️</span>
                          <span>Boutique Cripto Sambil</span>
                        </td>
                        <td className="py-3 text-neutral-400">2026-07-10</td>
                        <td className="py-3"><span className="text-[10px] bg-red-950 text-red-400 border border-red-900/30 px-1.5 py-0.5 rounded font-bold font-mono">Plan Pro</span></td>
                        <td className="py-3 font-mono text-amber-500 font-bold">$2.25 USDT</td>
                        <td className="py-3 text-right">
                          <span className="text-[10px] bg-amber-950/40 text-amber-400 border border-amber-900/30 px-2 py-0.5 rounded-full font-bold">Pendiente Pago</span>
                        </td>
                      </tr>

                      <tr>
                        <td className="py-3 font-bold text-white flex items-center gap-2">
                          <span>☕</span>
                          <span>Cacao & Cripto Altamira</span>
                        </td>
                        <td className="py-3 text-neutral-400">2026-07-06</td>
                        <td className="py-3"><span className="text-[10px] bg-neutral-900 text-neutral-400 border border-neutral-800 px-1.5 py-0.5 rounded font-bold font-mono">Plan Libre</span></td>
                        <td className="py-3 font-mono text-neutral-500 font-bold">$0.00 USDT</td>
                        <td className="py-3 text-right">
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-900/30 px-2 py-0.5 rounded-full font-bold">Activo</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Right Content Area: Withdraw & Resources */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Withdraw Commissions Box */}
              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-4">
                <h3 className="text-sm font-bold text-white">Retirar tus Comisiones</h3>
                <p className="text-xs text-neutral-400">Retira tus fondos generados hacia tu canal de pago configurado en tiempo real.</p>
                
                <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850 space-y-3 font-mono">
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Monto Disponible:</span>
                    <span className="text-emerald-400 font-bold">$105.00 USDT</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-neutral-400">Método de Retiro:</span>
                    <span className="text-white font-bold">{payoutMethod === 'USDT' ? 'USDT (Polygon)' : 'VES (Pago Móvil)'}</span>
                  </div>
                  <div className="text-[10px] text-neutral-500 truncate">
                    Destino: {payoutMethod === 'USDT' ? (walletAddress || '0x71C83...F29') : (bankDetails || 'Pago Móvil Activo')}
                  </div>
                </div>

                {withdrawStatus === 'idle' && (
                  <button
                    onClick={handleWithdraw}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                  >
                    Solicitar Retiro Express
                  </button>
                )}

                {withdrawStatus === 'processing' && (
                  <div className="flex items-center justify-center gap-2 py-2.5 bg-neutral-900 border border-neutral-850 rounded-xl text-xs text-neutral-400">
                    <div className="w-4 h-4 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                    <span>Procesando pago en bloque Polygon...</span>
                  </div>
                )}

                {withdrawStatus === 'success' && (
                  <div className="p-3 bg-emerald-950/40 border border-emerald-900 text-emerald-400 rounded-xl text-xs text-center font-bold font-mono">
                    ✓ Retiro Exitoso. TXID: 0x8a91...bc9
                  </div>
                )}
              </div>

              {/* Marketing Material Downloads */}
              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-red-500" />
                  Kit Digital de Marketing
                </h3>
                <p className="text-xs text-neutral-400">Descarga materiales para apoyar tu proceso de prospección presencial:</p>
                
                <div className="space-y-2">
                  {/* File 1 */}
                  <div className="flex items-center justify-between p-2.5 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-850 transition text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📄</span>
                      <div>
                        <span className="text-white font-bold block">Folleto de Ventas Comercios</span>
                        <span className="text-[9px] text-neutral-500 font-mono">PDF • 2.4 MB</span>
                      </div>
                    </div>
                    <button type="button" className="text-neutral-400 hover:text-white p-1" title="Descargar">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* File 2 */}
                  <div className="flex items-center justify-between p-2.5 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-850 transition text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🖼️</span>
                      <div>
                        <span className="text-white font-bold block">Adhesivo QR "Aceptamos Cripto"</span>
                        <span className="text-[9px] text-neutral-500 font-mono">PNG • 1.1 MB</span>
                      </div>
                    </div>
                    <button type="button" className="text-neutral-400 hover:text-white p-1" title="Descargar">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  {/* File 3 */}
                  <div className="flex items-center justify-between p-2.5 bg-neutral-900 hover:bg-neutral-850 rounded-xl border border-neutral-850 transition text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📊</span>
                      <div>
                        <span className="text-white font-bold block">Presentación Pitch para Inversores</span>
                        <span className="text-[9px] text-neutral-500 font-mono">PPTX • 5.8 MB</span>
                      </div>
                    </div>
                    <button type="button" className="text-neutral-400 hover:text-white p-1" title="Descargar">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Partners section credit */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-900 text-center space-y-2">
                <p className="text-[10px] text-neutral-500 leading-relaxed font-medium">
                  Este programa es supervisado por los fundadores de TuZonaCripto:
                </p>
                <div className="text-xs font-bold text-neutral-200">
                  Darwin Giraud & Carolina Sibulo
                </div>
                <div className="text-[9px] font-mono text-red-500 uppercase font-bold tracking-wider">
                  Fundadores, TuZonaCripto
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
