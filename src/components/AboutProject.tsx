import React, { useState } from 'react';
import {
  Target,
  Users,
  TrendingUp,
  Calendar,
  Compass,
  ShieldAlert,
  Code2,
  Layers,
  Briefcase,
  ChevronRight,
  Mail,
  UserPlus,
  Coins,
  DollarSign,
  BriefcaseIcon,
  Sparkles,
  ArrowUpRight,
  FileText
} from 'lucide-react';

export default function AboutProject() {
  const [activeTab, setActiveTab] = useState<'nosotros' | 'oportunidades' | 'roadmap'>('nosotros');

  // Financial calculator state (investor projection simulator)
  const [projectedUsers, setProjectedUsers] = useState(100000);

  // Application form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'dev',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const calculateSimulatedRevenue = (users: number) => {
    if (users <= 100000) {
      return (users / 100000) * 1500000;
    } else if (users <= 500000) {
      const baseRev = 1500000;
      const progress = (users - 100000) / 400000;
      return baseRev + progress * 6500000;
    } else {
      const baseRev = 8000000;
      const progress = (users - 500000) / 1000000;
      return baseRev + progress * 17000000;
    }
  };

  const simulatedRevenue = calculateSimulatedRevenue(projectedUsers);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Por favor, completa los campos requeridos de Nombre y Correo.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-8" id="about_project_module">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
          TuZonaCripto: Ecosistema & Negocios
        </h2>
        <p className="text-neutral-400 text-sm mt-1">
          La primera infraestructura integrada que fusiona comercio real, transporte logístico, capacitación on-chain y finanzas libres.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-neutral-900 gap-2 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('nosotros')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 shrink-0 cursor-pointer ${
            activeTab === 'nosotros'
              ? 'border-red-600 text-white bg-red-950/10'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          🧬 Nosotros y Ecosistema
        </button>
        <button
          onClick={() => setActiveTab('oportunidades')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 shrink-0 cursor-pointer ${
            activeTab === 'oportunidades'
              ? 'border-red-600 text-white bg-red-950/10'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          💼 Oportunidades de Inversión y Trabajo
        </button>
        <button
          onClick={() => setActiveTab('roadmap')}
          className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 shrink-0 cursor-pointer ${
            activeTab === 'roadmap'
              ? 'border-red-600 text-white bg-red-950/10'
              : 'border-transparent text-neutral-400 hover:text-neutral-200'
          }`}
        >
          📊 Roadmap & Finanzas
        </button>
      </div>

      {/* TAB Content */}
      {activeTab === 'nosotros' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Hero Banner Nosotros */}
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden border border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
              alt="TuZonaCripto Team Ecosystem"
              className="w-full h-full object-cover filter brightness-45 saturate-120"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
              <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
                Conoce el Holding
              </span>
              <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
                Impulsando la Economía Circular del Futuro
              </h3>
              <p className="text-neutral-300 text-xs mt-1 max-w-xl">
                Nuestra misión es empoderar a comercios y ciudadanos mediante soluciones financieras y logísticas directas, transparentes y de autocustodia total.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            <div className="lg:col-span-7 space-y-6">
              {/* Executive Summary */}
              <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-3">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-red-500" />
                  ¿Quiénes Somos?
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  <strong>TuZonaCripto</strong> no es solo una billetera ni un simple directorio de tiendas: es un **sistema operativo integral de comercio**. Surgimos en economías con altos índices inflacionarios para resolver de manera definitiva la devaluación monetaria y la fragmentación tecnológica. 
                </p>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  A través de siete módulos interconectados de forma nativa (CriptoMap, CriptoFlow, CriptoPay, CriptoRides, CriptoGo, CriptoLab y CriptoSafe), facilitamos que cualquier comerciante pueda automatizar su facturación cripto, otorgar o recibir microcréditos, contratar transporte logístico y resguardar su capital bajo los más estrictos esquemas de seguridad y cumplimiento normativo (Prevención LA/FT).
                </p>
              </div>

              {/* Mission & Vision */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <span className="text-lg">🎯</span>
                  <h4 className="font-bold text-white text-xs">Nuestra Misión</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Facilitar herramientas Web3 prácticas y sencillas que conecten la economía real diaria de los comercios locales con la soberanía financiera de las criptomonedas, eliminando intermediarios costosos.
                  </p>
                </div>
                <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <span className="text-lg">👁️‍🗨️</span>
                  <h4 className="font-bold text-white text-xs">Nuestra Visión</h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    Convertirnos en el estándar logístico, de pasarela de pago y crédito comercial líder en América Latina, empoderando a más de 1.5 millones de usuarios y comercios activos para 2027.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Team Leadership */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
                  <Users className="w-4 h-4 text-red-500" />
                  Liderazgo Fundador
                </h3>

                <div className="space-y-4">
                  {/* Founder 1 */}
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 flex items-start gap-3">
                    <span className="text-2xl bg-red-950/20 w-10 h-10 rounded-full border border-red-900/40 flex items-center justify-center shrink-0">
                      👨‍💻
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-xs">Darwin Giraud</h4>
                      <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider">Fundador & CEO</p>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        Ingeniero criptográfico con amplia experiencia en el desarrollo de protocolos blockchain, contratos inteligentes Solidity y arquitectura DeFi.
                      </p>
                    </div>
                  </div>

                  {/* Founder 2 */}
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 flex items-start gap-3">
                    <span className="text-2xl bg-red-950/20 w-10 h-10 rounded-full border border-red-900/40 flex items-center justify-center shrink-0">
                      👩‍💼
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-xs">Carolina Sibulo</h4>
                      <p className="text-[9px] text-red-500 font-bold uppercase tracking-wider">Co-Fundadora & COO</p>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        Especialista en desarrollo corporativo, alianzas comerciales con la banca local, y estricto cumplimiento regulatorio de prevención de lavado de activos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'oportunidades' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Hero Banner Oportunidades */}
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden border border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200"
              alt="TuZonaCripto Investment Options"
              className="w-full h-full object-cover filter brightness-45 saturate-120"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
              <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
                Únete al Crecimiento
              </span>
              <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
                Invierte o Forma Parte del Equipo de Elite
              </h3>
              <p className="text-neutral-300 text-xs mt-1 max-w-xl">
                Contribuimos activamente al desarrollo de software de punta. Explora las formas de participar en el holding financiero y expandir tu carrera on-chain.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Left: Investment Tiers & Value Prop */}
            <div className="lg:col-span-7 space-y-6">
              {/* Investment details */}
              <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
                  <Coins className="w-4 h-4 text-red-500" />
                  Oportunidades de Inversión y Capital
                </h3>
                <p className="text-xs text-neutral-400 leading-normal">
                  TuZonaCripto ofrece tres avenidas estratégicas de participación de capital para inversionistas acreditados y socios corporativos:
                </p>

                <div className="space-y-3.5">
                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-850 space-y-1">
                    <span className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded font-mono font-bold uppercase">Categoría 01</span>
                    <h4 className="text-white font-bold text-xs mt-1">Socio de Capital Directo (Equity Angel / VC Series)</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Adquiere acciones preferenciales del holding corporativo de TuZonaCripto. Acceso directo a los reportes financieros auditados y participación en el Consejo de Administración. Ideal para fondos de Venture Capital enfocados en Fintech latinoamericano.
                    </p>
                  </div>

                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-850 space-y-1">
                    <span className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded font-mono font-bold uppercase">Categoría 02</span>
                    <h4 className="text-white font-bold text-xs mt-1">Soporte Estratégico de Utilidad de Red ($TZC Liquidity)</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Adquisición de lotes preferenciales de tokens de gobernanza y utilidad $TZC bajo contratos de bloqueo gradual (<strong className="text-neutral-300">vesting de liquidez</strong>) para apoyar los fondos de crédito corporativo para microempresas en CriptoFlow.
                    </p>
                  </div>

                  <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-850 space-y-1">
                    <span className="text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded font-mono font-bold uppercase">Categoría 03</span>
                    <h4 className="text-white font-bold text-xs mt-1">Proveedores de Infraestructura & Nodos Validadores</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Financia la infraestructura de servidores locales de baja latencia y los nodos de procesamiento que respaldan nuestro software de monitoreo de transacciones LA/FT, devengando un porcentaje fijo de cada escaneo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vacantes / Trabaja con Nosotros */}
              <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
                  <Briefcase className="w-4 h-4 text-red-500" />
                  Vacantes Activas (Únete a Nuestra Empresa)
                </h3>
                <p className="text-xs text-neutral-400 leading-normal">
                  Buscamos constantemente mentes brillantes, proactivas y con pasión por construir tecnología de alto impacto.
                </p>

                <div className="space-y-3">
                  <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-850 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="text-white font-bold">Desarrollador Full-Stack Web3 (React / Solidity / Node)</h4>
                      <p className="text-[10px] text-neutral-500 mt-1">Full-time • 100% Remoto • Salario competitivo en cripto</p>
                    </div>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-1 rounded font-bold uppercase shrink-0">Activo</span>
                  </div>

                  <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-850 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="text-white font-bold">Especialista Sénior en Cumplimiento Normativo & LA/FT</h4>
                      <p className="text-[10px] text-neutral-500 mt-1">Full-time • Presencial (Caracas) / Híbrido • Auditoría legal</p>
                    </div>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-1 rounded font-bold uppercase shrink-0">Activo</span>
                  </div>

                  <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-850 flex justify-between items-center text-xs">
                    <div>
                      <h4 className="text-white font-bold">Embajadores de Marca & Marketing de Guerrilla Digital</h4>
                      <p className="text-[10px] text-neutral-500 mt-1">Part-time • Flexibilidad • Crecimiento comunitario</p>
                    </div>
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-900 px-2 py-1 rounded font-bold uppercase shrink-0">Activo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Apply / Contact Interactive Form */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
                  <UserPlus className="w-4 h-4 text-red-500" />
                  Formulario de Contacto & Postulación
                </h3>

                {!submitted ? (
                  <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-[10px] text-neutral-400 font-bold uppercase mb-1">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Juan Pérez"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-850 rounded px-2.5 py-1.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-400 font-bold uppercase mb-1">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        placeholder="Ej. juan@tuzonacripto.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-850 rounded px-2.5 py-1.5 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-400 font-bold uppercase mb-1">Área de Interés / Cargo</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-850 rounded px-2.5 py-1.5 text-neutral-300"
                      >
                        <option value="dev">Postular: Desarrollador Web3</option>
                        <option value="legal">Postular: Oficial de Cumplimiento</option>
                        <option value="marketing">Postular: Embajador de Marca</option>
                        <option value="investor">Invertir: Solicitar Pitch Deck Financiero</option>
                        <option value="node">Socio: Operador de Nodo / Servidores</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] text-neutral-400 font-bold uppercase mb-1">Mensaje o Resumen Curricular</label>
                      <textarea
                        rows={4}
                        placeholder="Describe brevemente tus intenciones, enlaces de portafolio o tu tesis de inversión..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-850 rounded p-2.5 text-white resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg text-xs transition cursor-pointer text-center block"
                    >
                      Enviar Postulación / Contactar
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-4 bg-neutral-950/60 p-5 rounded-lg border border-neutral-800">
                    <Sparkles className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
                    <div>
                      <h4 className="text-white font-bold text-sm">¡Mensaje Recibido con Éxito!</h4>
                      <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
                        Muchas gracias, <strong className="text-white">{formData.name}</strong>. Darwin y Carolina revisarán tu solicitud en un lapso no mayor a 48 horas hábiles y se comunicarán contigo vía <strong className="text-white">{formData.email}</strong>.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', role: 'dev', message: '' });
                      }}
                      className="text-[10px] text-neutral-500 hover:text-white underline block mx-auto transition"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                )}
              </div>

              {/* Legal Note */}
              <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-850 text-[10px] text-neutral-500 flex gap-2">
                <ShieldAlert className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Aviso Importante:</strong> Toda postulación de trabajo y/o propuesta de inversión pasa por un estricto filtro de debida diligencia operado bajo normativas internacionales KYC/AML para resguardar la pulcritud y transparencia de TuZonaCripto.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'roadmap' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Hero Banner Roadmap */}
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden border border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
              alt="TuZonaCripto Projections and Growth"
              className="w-full h-full object-cover filter brightness-45 saturate-120"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
              <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
                Plan de Crecimiento
              </span>
              <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
                Hoja de Ruta Estratégica & Proyecciones Financieras
              </h3>
              <p className="text-neutral-300 text-xs mt-1 max-w-xl">
                Simula el crecimiento exponencial del ecosistema comercial on-chain y conoce nuestras fases de despliegue a nivel regional.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Left: business projections & calculator */}
            <div className="lg:col-span-7 space-y-6">
              {/* Business Monetization */}
              <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-3">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1.5">
                  <BriefcaseIcon className="w-4 h-4 text-red-500" />
                  Modelo de Negocio & Monetización Diversificada
                </h3>
                <p className="text-xs text-neutral-400 leading-normal mb-2">
                  La sostenibilidad y rentabilidad a largo plazo de TuZonaCripto proviene de un flujo cuádruple de ingresos directos:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-neutral-300">
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded space-y-1">
                    <strong className="text-white block font-mono">1. CriptoMap:</strong>
                    <span className="text-neutral-400 text-[10px]">Suscripciones premium de comercios para posicionamiento y analíticas de tráfico de compradores.</span>
                  </div>
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded space-y-1">
                    <strong className="text-white block font-mono">2. CriptoFlow:</strong>
                    <span className="text-neutral-400 text-[10px]">Tarifas de suscripción SaaS mensual por el uso de terminales contables de cobro más spreads de interés crediticio.</span>
                  </div>
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded space-y-1">
                    <strong className="text-white block font-mono">3. CriptoPay:</strong>
                    <span className="text-neutral-400 text-[10px]">0.5% de comisión de pasarela en transacciones P2P procesadas comercialmente.</span>
                  </div>
                  <div className="p-3 bg-neutral-950 border border-neutral-800 rounded space-y-1">
                    <strong className="text-white block font-mono">4. CriptoRides & Go:</strong>
                    <span className="text-neutral-400 text-[10px]">Comisiones directas por trayecto de pasajero (10%) y fees fijos por servicio de despacho logístico físico.</span>
                  </div>
                </div>
              </div>

              {/* Projections calculator */}
              <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                  Calculadora Interactiva de Proyecciones Financieras
                </h3>
                <p className="text-[11px] text-neutral-400 leading-normal">
                  Desliza la barra para estimar el crecimiento de ingresos brutos del holding financiero basado en el número proyectado de usuarios activos:
                </p>

                <div className="space-y-4 pt-1">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-neutral-400">Usuarios Activos:</span>
                      <span className="font-mono font-bold text-white">{(projectedUsers / 1000).toFixed(0)}k</span>
                    </div>
                    <input
                      type="range"
                      min="100000"
                      max="1500000"
                      step="50000"
                      value={projectedUsers}
                      onChange={(e) => setProjectedUsers(Number(e.target.value))}
                      className="w-full accent-red-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-neutral-500 font-mono mt-1">
                      <span>100k (Año 1)</span>
                      <span>500k (Año 2)</span>
                      <span>1.5M (Año 3)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-center">
                      <span className="text-[9px] text-neutral-500 block">Proyección Documentada</span>
                      <p className="text-xs font-bold text-neutral-300 mt-1">
                        {projectedUsers <= 200000 ? 'Año 1: $1.5M' : projectedUsers <= 700000 ? 'Año 2: $8M' : 'Año 3: $25M'}
                      </p>
                    </div>
                    <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-center">
                      <span className="text-[9px] text-neutral-500 block">Ingreso Recaudado Estimado</span>
                      <p className="text-xs font-mono font-bold text-red-500 mt-1">
                        ${(simulatedRevenue / 1000000).toFixed(2)}M USD
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Strategic Roadmap */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
                <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
                  <Calendar className="w-4 h-4 text-red-500" />
                  Hoja de Ruta (Roadmap de Expansión)
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="border-l-2 border-red-600 pl-3.5 relative">
                    <span className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-red-600"></span>
                    <span className="text-[10px] text-red-500 font-bold font-mono">Fase 1 (Q4 2024 - Q2 2025)</span>
                    <h4 className="font-bold text-white text-xs mt-0.5">Lanzamiento del Core</h4>
                    <p className="text-[10px] text-neutral-400 mt-1">Lanzamiento oficial de CriptoMap con más de 10,000 comercios físicos verificados, pilotos privados cerrados de CriptoFlow y CriptoPay.</p>
                  </div>

                  <div className="border-l-2 border-neutral-600 pl-3.5 relative">
                    <span className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-neutral-600"></span>
                    <span className="text-[10px] text-neutral-400 font-bold font-mono">Fase 2 (Q3 2025 - Q4 2026)</span>
                    <h4 className="font-bold text-neutral-400 text-xs mt-0.5">Expansión y Optimización</h4>
                    <p className="text-[10px] text-neutral-500 mt-1">Lanzamiento público de CriptoFlow, despliegue de CriptoRides, CriptoLab, integración nacional de despachos con CriptoGo y tokenización de utilidad TZC.</p>
                  </div>

                  <div className="border-l-2 border-neutral-600 pl-3.5 relative">
                    <span className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-neutral-600"></span>
                    <span className="text-[10px] text-neutral-400 font-bold font-mono">Fase 3 (2027+)</span>
                    <h4 className="font-bold text-neutral-400 text-xs mt-0.5">Descentralización Internacional</h4>
                    <p className="text-[10px] text-neutral-500 mt-1">Expansión operativa en mercados emergentes de América Latina, migración del core transaccional a blockchain nativa L2 y comercialización del software LA/FT.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
