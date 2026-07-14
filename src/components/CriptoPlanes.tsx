import React, { useState } from 'react';
import { Merchant, Transaction } from '../types';
import { 
  Sparkles, 
  Check, 
  Store, 
  ArrowRight, 
  HelpCircle, 
  CreditCard, 
  ShieldCheck, 
  Coins, 
  Calendar, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  Image, 
  Plus, 
  Trash2,
  AlertCircle
} from 'lucide-react';

interface CriptoPlanesProps {
  userTzcBalance: number;
  addUserTzc: (amount: number) => void;
  addTransaction: (tx: Transaction) => void;
  onAddMerchant: (merchant: Merchant) => void;
  setActiveTab: (tab: any) => void;
}

export default function CriptoPlanes({ 
  userTzcBalance, 
  addUserTzc, 
  addTransaction, 
  onAddMerchant,
  setActiveTab 
}: CriptoPlanesProps) {
  // Wizard steps: 'plans' | 'form' | 'success'
  const [step, setStep] = useState<'plans' | 'form' | 'success'>('plans');
  
  // Selected Plan state
  const [selectedPlanId, setSelectedPlanId] = useState<'free' | 'pro' | 'premium'>('pro');

  // Form State
  const [merchantName, setMerchantName] = useState('');
  const [category, setCategory] = useState<'gastronomy' | 'services' | 'retail' | 'health' | 'education' | 'technology' | 'travel'>('retail');
  const [subcategory, setSubcategory] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [logo, setLogo] = useState('🛍️');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  
  // Featured Products inside registration
  const [products, setProducts] = useState<{ name: string; priceUsd: number; image: string }[]>([
    { name: 'Servicio / Producto Principal', priceUsd: 15.00, image: '🎁' }
  ]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductEmoji, setNewProductEmoji] = useState('📦');

  // Interactive Web3 Payment state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentToken, setPaymentToken] = useState<'TZC' | 'USDT'>('TZC');
  const [createdMerchantName, setCreatedMerchantName] = useState('');

  const plans = [
    {
      id: 'free',
      name: 'Plan Básico',
      tagline: 'Presencia básica para nuevos emprendimientos',
      priceUsd: 0,
      priceTzc: 0,
      badge: 'Gratuito',
      badgeColor: 'bg-neutral-800 text-neutral-400 border-neutral-700',
      features: [
        'Aparición en el mapa interactivo (CriptoMap)',
        'Ficha técnica con datos de contacto básicos',
        'Hasta 1 producto/servicio listado',
        'Ícono o emoji de comercio genérico',
        'Soporte comunitario estándar'
      ],
      notIncluded: [
        'Insignia de Comercio Verificado on-chain',
        'Botones de pago express CriptoPay',
        'Integración de despachos con CriptoGo',
        'Estadísticas de visitas y transacciones',
        'Banner personalizado y reseñas destacadas'
      ]
    },
    {
      id: 'pro',
      name: 'Plan CriptoPro',
      tagline: 'Ideal para comercios consolidados y activos',
      priceUsd: 15,
      priceTzc: 12, // Cheaper if paid with TZC!
      badge: 'Más Vendido',
      badgeColor: 'bg-red-950 text-red-500 border-red-900/30',
      features: [
        'Aparición en CriptoMap con pin destacado',
        'Insignia Oficial de "Comercio Verificado" ⭐',
        'Hasta 3 productos/servicios en el Marketplace',
        'Botones integrados de CriptoPay y CriptoGo',
        'Enlace express a WhatsApp del comercio',
        'Banner de portada personalizado (Unsplash)',
        'Aceptación de valoraciones de la comunidad'
      ],
      notIncluded: [
        'Anuncios promocionales en el ticker superior',
        'Prioridad absoluta en motores de búsqueda',
        'Notificaciones push a la comunidad'
      ]
    },
    {
      id: 'premium',
      name: 'Plan Élite Web3',
      tagline: 'Exposición máxima y herramientas avanzadas',
      priceUsd: 35,
      priceTzc: 28, // Cheaper in TZC
      badge: 'Máxima Exposición',
      badgeColor: 'bg-amber-950 text-amber-500 border-amber-900/30',
      features: [
        'Todo lo incluido en el Plan CriptoPro',
        'Productos y servicios ILIMITADOS en el menú',
        'Prioridad máxima de posicionamiento en el directorio',
        'Anuncio exclusivo en el banner superior (Ticker)',
        'Notificaciones push mensuales a usuarios locales',
        'Estadísticas avanzadas de analítica on-chain',
        'Soporte prioritario 24/7 y asesoría fiscal Web3'
      ],
      notIncluded: []
    }
  ];

  const handleAddProduct = () => {
    if (!newProductName || !newProductPrice) return;
    setProducts([
      ...products,
      {
        name: newProductName,
        priceUsd: parseFloat(newProductPrice) || 5,
        image: newProductEmoji || '📦'
      }
    ]);
    setNewProductName('');
    setNewProductPrice('');
    setNewProductEmoji('📦');
  };

  const handleRemoveProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleRegisterPlan = (planId: 'free' | 'pro' | 'premium') => {
    setSelectedPlanId(planId);
    setStep('form');
  };

  const getPrice = (planId: 'free' | 'pro' | 'premium', token: 'TZC' | 'USDT') => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return 0;
    return token === 'TZC' ? plan.priceTzc : plan.priceUsd;
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantName || !subcategory || !description || !address) {
      alert('Por favor complete todos los campos obligatorios (*)');
      return;
    }

    const price = getPrice(selectedPlanId, paymentToken);
    if (paymentToken === 'TZC' && userTzcBalance < price) {
      alert(`Balance de $TZC insuficiente. Necesitas ${price} TZC pero tienes ${userTzcBalance.toFixed(2)} TZC.`);
      return;
    }

    setIsSubmitting(true);

    // Simulate blockchain confirmation
    setTimeout(() => {
      // Create random coordinates around Caracas financial zones (Chacao, Las Mercedes, Altamira, Campo Alegre)
      const latCenters = [10.4850, 10.4910, 10.4830, 10.4780];
      const lngCenters = [-66.8610, -66.8245, -66.8520, -66.8850];
      const randIdx = Math.floor(Math.random() * latCenters.length);
      const randomOffsetLat = (Math.random() - 0.5) * 0.015;
      const randomOffsetLng = (Math.random() - 0.5) * 0.015;
      
      const newLat = latCenters[randIdx] + randomOffsetLat;
      const newLng = lngCenters[randIdx] + randomOffsetLng;

      const randomBannerImages = [
        'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600', // Cafeteria
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600', // Retail shop
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600', // Office
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600', // Tech
      ];
      
      const chosenBanner = bannerUrl || randomBannerImages[Math.floor(Math.random() * randomBannerImages.length)];
      
      const newMerchant: Merchant = {
        id: 'm-' + Math.floor(100 + Math.random() * 900),
        name: merchantName,
        category: category,
        subcategory: subcategory,
        rating: 5.0, // High starting rating
        description: description,
        lat: Number(newLat.toFixed(5)),
        lng: Number(newLng.toFixed(5)),
        logo: logo || '🏪',
        address: address,
        acceptedCryptos: ['USDT', 'TZC', 'BTC'],
        isVerified: selectedPlanId !== 'free',
        phone: phone || '+58 412-555-0100',
        email: email || 'contacto@comercio.ve',
        website: website || 'tuzonacripto.com/comercio',
        bannerImage: chosenBanner,
        featuredProducts: products.length > 0 ? products : undefined,
        reviews: []
      };

      // Add merchant to active directory
      onAddMerchant(newMerchant);

      // Charge user if applicable
      if (price > 0 && paymentToken === 'TZC') {
        addUserTzc(-price);
        
        // Add transaction
        const tx: Transaction = {
          id: 'tx-' + Math.floor(10000 + Math.random() * 90000),
          hash: '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
          type: 'Payment',
          amount: price,
          token: 'TZC',
          destination: `Suscripción ${plans.find(p => p.id === selectedPlanId)?.name}`,
          status: 'Success',
          date: new Date().toISOString().split('T')[0],
          feeTzc: 0.1
        };
        addTransaction(tx);
      } else if (price > 0 && paymentToken === 'USDT') {
        // Mock transaction for USDT
        const tx: Transaction = {
          id: 'tx-' + Math.floor(10000 + Math.random() * 90000),
          hash: '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
          type: 'Payment',
          amount: price,
          token: 'USDT',
          destination: `Suscripción ${plans.find(p => p.id === selectedPlanId)?.name}`,
          status: 'Success',
          date: new Date().toISOString().split('T')[0],
          feeTzc: 0
        };
        addTransaction(tx);
      }

      setCreatedMerchantName(merchantName);
      setIsSubmitting(false);
      setStep('success');
      
      // Clean up fields
      setMerchantName('');
      setSubcategory('');
      setDescription('');
      setAddress('');
      setLogo('🛍️');
      setPhone('');
      setEmail('');
      setWebsite('');
      setBannerUrl('');
      setProducts([{ name: 'Servicio / Producto Principal', priceUsd: 15.00, image: '🎁' }]);
    }, 2000);
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'gastronomy': return 'Gastronomía & Restaurantes';
      case 'services': return 'Servicios Profesionales';
      case 'retail': return 'Tiendas & Ventas al Detalle';
      case 'health': return 'Salud & Bienestar';
      case 'education': return 'Educación & Cursos';
      case 'technology': return 'Tecnología & Hardware';
      case 'travel': return 'Turismo & Hospedaje';
      default: return cat;
    }
  };

  return (
    <div className="space-y-6" id="cripto_planes_module">
      
      {/* Module Title Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-neutral-950 p-6 rounded-2xl border border-neutral-900 shadow-md">
        <div className="space-y-1">
          <span className="text-xs font-bold text-red-500 uppercase tracking-wider block">Registra tu Comercio en Caracas</span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Planes de Suscripción & Inscripción
          </h2>
          <p className="text-xs text-neutral-400">
            Forma parte de la economía cripto de Venezuela. Registra tu tienda, consultorio, posada o agencia de servicios y comienza a facturar con la pasarela integrada CriptoPay.
          </p>
        </div>
        <div className="flex items-center gap-2.5 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-xs font-mono">
          <Coins className="w-4 h-4 text-amber-500" />
          <span className="text-neutral-400">Descuento de Pago en TZC:</span>
          <span className="text-emerald-400 font-bold">-20%</span>
        </div>
      </div>

      {step === 'plans' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Main Plan Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const isPro = plan.id === 'pro';
              const isPremium = plan.id === 'premium';
              
              return (
                <div 
                  key={plan.id}
                  className={`rounded-2xl border flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isPro 
                      ? 'bg-neutral-950 border-red-900/60 shadow-xl shadow-red-950/5 ring-1 ring-red-950' 
                      : 'bg-neutral-950 border-neutral-900 hover:border-neutral-800'
                  }`}
                >
                  {/* Visual premium decorations */}
                  {isPro && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600"></div>
                  )}
                  {isPremium && (
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"></div>
                  )}

                  <div className="p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1 leading-snug">{plan.tagline}</p>
                      </div>
                      <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${plan.badgeColor}`}>
                        {plan.badge}
                      </span>
                    </div>

                    {/* Price Matrix */}
                    <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-900 space-y-1.5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white font-mono">
                          {plan.priceUsd === 0 ? 'Gratis' : `$${plan.priceUsd}`}
                        </span>
                        {plan.priceUsd > 0 && <span className="text-xs text-neutral-500 font-medium">/ mes en USDT</span>}
                      </div>
                      {plan.priceTzc > 0 && (
                        <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold font-mono">
                          <Sparkles className="w-3 h-3 text-emerald-400" />
                          <span>O solo {plan.priceTzc} TZC / mes (-20%)</span>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="space-y-3.5 pt-2">
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">¿Qué incluye este plan?</p>
                      <ul className="space-y-2.5">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                            <Check className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {plan.notIncluded.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-600 line-through">
                            <span className="w-3.5 h-3.5 text-neutral-700 mt-0.5 shrink-0 font-bold text-[10px] text-center select-none">✕</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-6 border-t border-neutral-900/50 bg-neutral-900/10">
                    <button
                      onClick={() => handleRegisterPlan(plan.id as any)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 ${
                        isPro 
                          ? 'bg-red-600 hover:bg-red-700 text-white shadow-md' 
                          : isPremium 
                          ? 'bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-md'
                          : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300'
                      }`}
                    >
                      <span>Inscribir mi Comercio</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick FAQ / Info block for investors */}
          <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-red-500" />
                ¿Cómo funciona la inscripción Web3?
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Nuestra plataforma automatiza el registro de comercios mediante contratos inteligentes en Polygon. El pago del plan (ya sea en TZC o USDT) genera de forma autónoma la metadata geográfica en nuestra base de datos descentralizada. 
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">Zero-Paperwork</span>
                <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">Instant-Launch</span>
                <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">Polygon POS</span>
              </div>
            </div>
            <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-850 space-y-2 text-xs">
              <h5 className="font-bold text-neutral-200">Ventajas de Suscribirse con $TZC:</h5>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Utilizando el token de utilidad de la comunidad ($TZC) obtienes un 20% de descuento directo en tu tarifa de inscripción. Esto fomenta la liquidez y la circulación real del token dentro de los comercios de Caracas.
              </p>
            </div>
          </div>
        </div>
      )}

      {step === 'form' && (
        <form onSubmit={handleSubmitRegistration} className="bg-neutral-950 rounded-2xl border border-neutral-900 overflow-hidden shadow-lg animate-fadeIn">
          {/* Header */}
          <div className="bg-neutral-900/60 p-5 border-b border-neutral-900 flex justify-between items-center">
            <div>
              <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">Paso 2 of 2</span>
              <h3 className="text-base font-bold text-white">Configuración Técnica de tu Comercio</h3>
            </div>
            <button
              type="button"
              onClick={() => setStep('plans')}
              className="text-xs text-neutral-400 hover:text-white bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-lg cursor-pointer transition"
            >
              Volver a Planes
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Plan Alert Box */}
            <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Store className="w-5 h-5 text-red-500" />
                <div>
                  <span className="text-neutral-400">Suscripción Seleccionada: </span>
                  <span className="font-bold text-white uppercase">{plans.find(p => p.id === selectedPlanId)?.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] text-neutral-500 block">Forma de Pago</span>
                  <div className="flex gap-2 mt-0.5">
                    <button
                      type="button"
                      onClick={() => setPaymentToken('TZC')}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold transition ${paymentToken === 'TZC' ? 'bg-red-600 text-white' : 'bg-neutral-950 text-neutral-400 border border-neutral-800'}`}
                    >
                      Pagar con TZC
                    </button>
                    {selectedPlanId !== 'free' && (
                      <button
                        type="button"
                        onClick={() => setPaymentToken('USDT')}
                        className={`px-2.5 py-1 rounded text-[10px] font-bold transition ${paymentToken === 'USDT' ? 'bg-emerald-600 text-white' : 'bg-neutral-950 text-neutral-400 border border-neutral-800'}`}
                      >
                        Pagar con USDT
                      </button>
                    )}
                  </div>
                </div>
                <div className="font-mono text-right shrink-0 border-l border-neutral-800 pl-4">
                  <span className="text-[10px] text-neutral-500 block">Total a Pagar</span>
                  <span className="text-sm font-extrabold text-white">
                    {getPrice(selectedPlanId, paymentToken)} {paymentToken}
                  </span>
                </div>
              </div>
            </div>

            {/* Field Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Nombre del Comercio *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Burguer Cripto Las Mercedes"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Categoría General *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
                    >
                      <option value="gastronomy">Gastronomía</option>
                      <option value="retail">Tienda / Retail</option>
                      <option value="services">Servicios</option>
                      <option value="health">Salud</option>
                      <option value="education">Educación</option>
                      <option value="technology">Tecnología</option>
                      <option value="travel">Turismo / Viajes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Especialidad / Subtítulo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Hamburguesería & Food Truck"
                      value={subcategory}
                      onChange={(e) => setSubcategory(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Descripción de Actividad *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe los productos que ofreces, horarios y por qué aceptas criptoactivos..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition resize-none"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Logo Emoji / Ícono *</label>
                    <select
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
                    >
                      <option value="🍔">🍔 Gastronomía (Hamburguesa)</option>
                      <option value="☕">☕ Café / Postres</option>
                      <option value="🍕">🍕 Pizzería</option>
                      <option value="🛍️">🛍️ Tienda / Moda</option>
                      <option value="🏨">🏨 Hotel / Hospedaje</option>
                      <option value="🦷">🦷 Consultorio / Odonto</option>
                      <option value="⚖️">⚖️ Legal / Servicios</option>
                      <option value="💻">💻 Computadoras / Tech</option>
                      <option value="👟">👟 Calzado / Zapatos</option>
                      <option value="🚗">🚗 Taller / Autos</option>
                      <option value="💈">💈 Barbería / Belleza</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Imagen de Banner (Opcional URL)</label>
                    <input
                      type="text"
                      placeholder="Ej. https://images.unsplash..."
                      value={bannerUrl}
                      onChange={(e) => setBannerUrl(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Address and Marketplace Menu products */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Dirección Física Completa *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Calle Madrid, CC Las Mercedes, Local 4, Caracas"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition"
                  />
                  <p className="text-[9px] text-neutral-500 mt-1">Nuestra inteligencia geoespacial asignará automáticamente coordenadas de despacho dentro de Caracas.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Teléfono Celular *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. +58 412-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Email Administrativo</label>
                    <input
                      type="email"
                      placeholder="Ej. admin@burguercripto.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-1.5">Sitio Web / Cuenta Instagram</label>
                  <input
                    type="text"
                    placeholder="Ej. instagram.com/burguercripto"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 transition"
                  />
                </div>

                {/* Marketplace items configurations */}
                {selectedPlanId !== 'free' && (
                  <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-900 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Productos / Menú Express (Marketplace)</span>
                      <span className="text-[10px] text-red-500 font-bold">{products.length} / 3 Items</span>
                    </div>

                    {/* Product List */}
                    <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                      {products.map((p, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-neutral-950 p-2 rounded-lg border border-neutral-800 text-xs">
                          <div className="flex items-center gap-2">
                            <span>{p.image}</span>
                            <span className="font-bold text-white line-clamp-1">{p.name}</span>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="font-mono text-neutral-300 font-bold">${p.priceUsd.toFixed(2)}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveProduct(idx)}
                              className="text-neutral-500 hover:text-red-500 cursor-pointer p-0.5 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Item inputs */}
                    {products.length < 3 && (
                      <div className="space-y-2 pt-2 border-t border-neutral-850">
                        <div className="grid grid-cols-12 gap-2">
                          <div className="col-span-2">
                            <select
                              value={newProductEmoji}
                              onChange={(e) => setNewProductEmoji(e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-2 text-xs focus:outline-none"
                            >
                              <option value="🍔">🍔</option>
                              <option value="🍕">🍕</option>
                              <option value="☕">☕</option>
                              <option value="🍹">🍹</option>
                              <option value="👟">👟</option>
                              <option value="💻">💻</option>
                              <option value="🎁">🎁</option>
                              <option value="🎟️">🎟️</option>
                            </select>
                          </div>
                          <div className="col-span-6">
                            <input
                              type="text"
                              placeholder="Nombre del plato/item"
                              value={newProductName}
                              onChange={(e) => setNewProductName(e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none text-white"
                            />
                          </div>
                          <div className="col-span-4">
                            <input
                              type="number"
                              placeholder="Precio USD"
                              value={newProductPrice}
                              onChange={(e) => setNewProductPrice(e.target.value)}
                              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-2 text-xs focus:outline-none text-white font-mono"
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddProduct}
                          className="w-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-[10px] text-neutral-300 hover:text-white font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 cursor-pointer transition"
                        >
                          <Plus className="w-3 h-3" />
                          Agregar Item al Menú
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Trigger / Wallet Signature */}
          <div className="bg-neutral-900/60 p-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-xs text-neutral-400">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span>Para finalizar se requiere que apruebes la firma de transacción desde tu wallet conectada.</span>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-black px-6 py-3 rounded-xl text-xs tracking-wide uppercase transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-red-950/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Procesando Tx en Polygon...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirmar & Firmar en Wallet</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {step === 'success' && (
        <div className="bg-neutral-950 rounded-2xl border border-neutral-900 p-8 text-center max-w-xl mx-auto space-y-6 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-950/40 border border-emerald-900 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-md">
            🚀
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white">¡Comercio Inscrito Exitosamente!</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              La transacción ha sido validada e inscrita de forma persistente en Polygon Mainnet. Tu comercio <span className="font-bold text-white">"{createdMerchantName}"</span> ya está listado en tiempo real en nuestra plataforma.
            </p>
          </div>

          <div className="bg-neutral-900/50 p-4 rounded-xl border border-neutral-850 space-y-3 text-left">
            <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-wider block">Estadísticas de Registro en Bloques</span>
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-neutral-500 block text-[10px]">Identificador de ID</span>
                <span className="text-neutral-200">MC-{Math.floor(1000 + Math.random()*9000)}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">Estado de Nodo</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  Propagado OK
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => {
                setStep('plans');
                setActiveTab('map');
              }}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              Ver en CriptoMap
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setStep('plans')}
              className="flex-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 py-2.5 rounded-xl text-xs transition cursor-pointer"
            >
              Inscribir otro comercio
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
