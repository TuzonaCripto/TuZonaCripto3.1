import React, { useState, useEffect } from 'react';
import { Ride } from '../types';
import { Navigation, Map, Car, Star, RefreshCw, Compass, ShieldAlert, ArrowRight, Loader } from 'lucide-react';

interface CriptoRidesProps {
  onSelectPayment: (payment: { merchantId: string; merchantName: string; amountUsd: number; itemName: string }) => void;
  userTzcBalance: number;
}

export default function CriptoRides({ onSelectPayment, userTzcBalance }: CriptoRidesProps) {
  const [pickup, setPickup] = useState('Centro Comercial Sambil, Chacao');
  const [destination, setDestination] = useState('Edificio Galipán, El Rosal');
  const [gasolinePriceUsd, setGasolinePriceUsd] = useState(1.15); // Dynamic oracle value
  const [rideStatus, setRideStatus] = useState<'idle' | 'searching' | 'matched' | 'ongoing' | 'completed'>('idle');
  const [selectedDriver, setSelectedDriver] = useState<Ride | null>(null);
  const [eta, setEta] = useState(0);

  // Hardcoded verified drivers accepting crypto
  const MOCK_DRIVERS: Ride[] = [
    {
      id: 'd1',
      driverName: 'Carlos Mendoza',
      driverAvatar: '👨‍✈️',
      rating: 4.9,
      vehicle: 'Toyota Corolla 2018 (Rojo)',
      priceTzc: 45, // Base price in TZC
      pickup: '',
      destination: '',
      status: 'searching',
      durationMin: 12
    },
    {
      id: 'd2',
      driverName: 'Alejandro Rojas',
      driverAvatar: '👨',
      rating: 4.8,
      vehicle: 'Chevrolet Aveo 2015 (Gris)',
      priceTzc: 35, // Base price in TZC
      pickup: '',
      destination: '',
      status: 'searching',
      durationMin: 15
    },
    {
      id: 'd3',
      driverName: 'Mariana Silva',
      driverAvatar: '👩‍✈️',
      rating: 4.95,
      vehicle: 'Ford Explorer 2016 (Negro)',
      priceTzc: 75, // Base price in TZC (VIP)
      pickup: '',
      destination: '',
      status: 'searching',
      durationMin: 10
    }
  ];

  // Dynamically calculate price based on fuel oracle rate:
  // Base price in TZC * (gasoline price / 1.00 base rate)
  const getDynamicPrice = (basePriceTzc: number) => {
    const rateFactor = gasolinePriceUsd / 1.00;
    return Math.round(basePriceTzc * rateFactor);
  };

  const getPriceUsd = (tzcAmount: number) => {
    return (tzcAmount * 0.12); // TZC rate is $0.12 USD
  };

  const startRideSearch = () => {
    if (!pickup || !destination) {
      alert('Por favor introduce origen y destino.');
      return;
    }
    setRideStatus('searching');
    setTimeout(() => {
      // Pick a random driver
      const randomDriver = MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)];
      setSelectedDriver({
        ...randomDriver,
        pickup,
        destination,
        priceTzc: getDynamicPrice(randomDriver.priceTzc),
        status: 'matched'
      });
      setRideStatus('matched');
      setEta(25); // seconds countdown for driver arrival mockup
    }, 2500);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (rideStatus === 'matched' && eta > 0) {
      timer = setTimeout(() => setEta(prev => prev - 1), 1000);
    } else if (rideStatus === 'matched' && eta === 0 && selectedDriver) {
      setRideStatus('ongoing');
      setEta(40); // flight duration simulator
    } else if (rideStatus === 'ongoing' && eta > 0) {
      timer = setTimeout(() => setEta(prev => prev - 1), 1000);
    } else if (rideStatus === 'ongoing' && eta === 0) {
      setRideStatus('completed');
    }
    return () => clearTimeout(timer);
  }, [rideStatus, eta, selectedDriver]);

  const handlePayRide = () => {
    if (!selectedDriver) return;
    const finalPriceUsd = getPriceUsd(selectedDriver.priceTzc);
    onSelectPayment({
      merchantId: 'criptorides',
      merchantName: `CriptoRides: Viaje con ${selectedDriver.driverName}`,
      amountUsd: finalPriceUsd,
      itemName: `Servicio de Movilidad desde ${pickup} hasta ${destination}`
    });
  };

  return (
    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-8" id="criptorides_module">
      {/* Header */}
      <div className="border-b border-neutral-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
            CriptoRides (Movilidad Urbana)
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Plataforma descentralizada de movilidad urbana que te conecta con conductores que aceptan activos.
          </p>
        </div>

        {/* Dynamic gasoline oracle simulation */}
        <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex items-center gap-3">
          <div className="text-left">
            <span className="text-[9px] text-red-500 font-bold uppercase block tracking-wider">Oracle Feed (Chainlink)</span>
            <span className="text-xs font-mono font-bold text-white">Combustible: ${gasolinePriceUsd.toFixed(2)} USD/galón</span>
          </div>
          <input
            type="range"
            min="0.50"
            max="3.00"
            step="0.05"
            value={gasolinePriceUsd}
            onChange={(e) => setGasolinePriceUsd(parseFloat(e.target.value))}
            className="w-24 sm:w-32 accent-red-600"
            title="Ajusta el precio del combustible para simular tarifas dinámicas"
          />
        </div>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative h-48 md:h-60 rounded-xl overflow-hidden border border-neutral-800">
        <img
          src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1200"
          alt="CriptoRides Mobility"
          className="w-full h-full object-cover filter brightness-45 saturate-120"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
          <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
            Movilidad Descentralizada
          </span>
          <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
            Viajes Urbanos Directos con Tarifas Dinámicas Basadas en Combustible
          </h3>
          <p className="text-neutral-300 text-xs mt-1 max-w-xl">
            Conectamos pasajeros con conductores calificados y verificados sin comisiones abusivas para intermediarios transnacionales. El precio del viaje se liquida de forma justa on-chain.
          </p>
        </div>
      </div>

      {/* Program Details: What, How, Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* ¿Qué es? */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            🚗
          </div>
          <h4 className="text-white font-bold text-sm">¿Qué es CriptoRides?</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Es la primera red descentralizada de transporte urbano de <strong className="text-white">TuZonaCripto</strong>. Vincula de forma directa a usuarios con prestadores de servicios de traslado sin retener altos porcentajes de ganancia.
          </p>
        </div>

        {/* ¿Cómo funciona? */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            🗺️
          </div>
          <h4 className="text-white font-bold text-sm">¿Cómo funciona?</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">1.</span>
              <span><strong>Fijación de Destinos:</strong> Introduce tu origen y destino para cotizar viajes con conductores cercanos.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">2.</span>
              <span><strong>Tarifa Justa Dinámica:</strong> Las cotizaciones se calculan mediante un oráculo Chainlink en base al combustible actual.</span>
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
              <span><strong>Mejores Ganancias:</strong> El 90% de la tarifa va directo e inmediato al conductor.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Seguridad P2P:</strong> Conductores verificados con KYC riguroso y calificación transparente.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-neutral-900">
        {/* Left Form: Booking inputs */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
            <h3 className="text-white text-sm font-semibold flex items-center gap-1.5 border-b border-neutral-800 pb-2">
              <Compass className="w-4 h-4 text-red-500" />
              Solicitar un Viaje
            </h3>

            {rideStatus === 'idle' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-neutral-400 font-medium mb-1 uppercase">Punto de Origen</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500"></span>
                    <input
                      type="text"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="Ubicación de partida"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 font-medium mb-1 uppercase">Destino Final</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-red-600"></span>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="¿A dónde vas?"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Rates simulation */}
                <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 space-y-2">
                  <h4 className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Tarifas Estimadas en Red</h4>
                  <div className="space-y-1.5">
                    {MOCK_DRIVERS.map((dr) => {
                      const finalTzc = getDynamicPrice(dr.priceTzc);
                      return (
                        <div key={dr.id} className="flex justify-between items-center text-xs font-mono">
                          <span className="text-neutral-400">{dr.vehicle.split(' ')[0]} ({dr.driverName.split(' ')[0]}):</span>
                          <span className="text-white font-bold">
                            {finalTzc} TZC <span className="text-[10px] text-neutral-500 font-sans font-normal">(~${getPriceUsd(finalTzc).toFixed(2)} USD)</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={startRideSearch}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl transition duration-200 shadow-md flex items-center justify-center gap-1.5 text-xs cursor-pointer"
                >
                  <Car className="w-4 h-4" />
                  Buscar Conductor Cripto Cercano
                </button>
              </div>
            )}

            {rideStatus === 'searching' && (
              <div className="text-center py-12 space-y-4">
                <Loader className="w-12 h-12 text-red-500 animate-spin mx-auto" />
                <div>
                  <h4 className="font-bold text-white text-sm">Emparejando con Conductores...</h4>
                  <p className="text-xs text-neutral-500 mt-1">Calculando tarifas dinámicas y buscando el mejor viaje en {pickup}</p>
                </div>
                <button
                  onClick={() => setRideStatus('idle')}
                  className="bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 px-4 py-2 rounded-lg text-xs"
                >
                  Cancelar Búsqueda
                </button>
              </div>
            )}

            {rideStatus === 'matched' && selectedDriver && (
              <div className="space-y-4 text-left">
                <div className="bg-neutral-950 border border-red-950/40 p-4 rounded-lg flex items-center gap-3">
                  <span className="text-4xl bg-red-950/30 w-12 h-12 rounded-full border border-red-900/40 flex items-center justify-center shadow">
                    {selectedDriver.driverAvatar}
                  </span>
                  <div>
                    <h4 className="font-bold text-white text-sm">{selectedDriver.driverName}</h4>
                    <p className="text-xs text-neutral-400">{selectedDriver.vehicle}</p>
                    <div className="flex items-center gap-1 mt-1 text-amber-500 font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      <span>{selectedDriver.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Origen:</span>
                    <span className="text-white font-semibold line-clamp-1">{selectedDriver.pickup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Destino:</span>
                    <span className="text-white font-semibold line-clamp-1">{selectedDriver.destination}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-neutral-900 mt-1.5 text-sm font-bold">
                    <span className="text-neutral-400">Precio del Viaje:</span>
                    <span className="text-red-500 font-mono">
                      {selectedDriver.priceTzc} TZC (~${getPriceUsd(selectedDriver.priceTzc).toFixed(2)} USD)
                    </span>
                  </div>
                </div>

                <div className="bg-neutral-950 p-3 rounded-lg border border-amber-900/30 text-center">
                  <p className="text-xs text-amber-500 font-semibold animate-pulse">
                    El conductor llegará en {eta} segundos
                  </p>
                </div>

                <button
                  onClick={() => setRideStatus('idle')}
                  className="w-full bg-neutral-950 border border-neutral-800 text-neutral-400 py-2 rounded-lg text-xs"
                >
                  Cancelar viaje
                </button>
              </div>
            )}

            {rideStatus === 'ongoing' && selectedDriver && (
              <div className="text-center py-8 space-y-4">
                <span className="text-4xl bg-neutral-950 w-14 h-14 rounded-full border border-neutral-800 inline-flex items-center justify-center animate-bounce">
                  🚕
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm">Viaje en Curso</h4>
                  <p className="text-xs text-neutral-400">A bordo del vehículo de {selectedDriver.driverName}</p>
                  <p className="text-xs text-red-500 font-mono mt-3 animate-pulse">Destino estimado en {eta} segundos</p>
                </div>
              </div>
            )}

            {rideStatus === 'completed' && selectedDriver && (
              <div className="space-y-4 text-center py-4">
                <span className="text-4xl">🏁</span>
                <div>
                  <h4 className="font-bold text-white text-sm">¡Has llegado a tu destino!</h4>
                  <p className="text-xs text-neutral-400">Total a liquidar: {selectedDriver.priceTzc} TZC</p>
                </div>

                <button
                  onClick={handlePayRide}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Pagar Viaje con CriptoPay
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Dynamic 2D vector Map simulation representing car moving */}
        <div className="lg:col-span-7 bg-neutral-900 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between h-[360px] lg:h-auto min-h-[360px]">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
            <div>
              <h3 className="text-white text-xs font-bold uppercase tracking-wide">Monitoreo de Movilidad (En Vivo)</h3>
              <p className="text-[10px] text-neutral-500">Vectores de geolocalización</p>
            </div>
            {rideStatus === 'ongoing' && (
              <span className="text-[9px] bg-red-950 text-red-400 border border-red-900/40 px-2 py-0.5 rounded-full font-mono animate-pulse">
                SATÉLITE ACTIVO
              </span>
            )}
          </div>

          <div className="relative flex-1 bg-neutral-950 rounded-lg overflow-hidden border border-neutral-900 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:20px_20px]">
            {/* Simulation of road lines */}
            <svg className="absolute inset-0 w-full h-full" pointerEvents="none">
              <path d="M 50,0 L 50,300" stroke="#262626" strokeWidth="6" strokeDasharray="5 5" />
              <path d="M 0,150 L 500,150" stroke="#262626" strokeWidth="6" strokeDasharray="5 5" />
              {/* Ride Route highlighted during search/matched/ongoing */}
              {(rideStatus === 'matched' || rideStatus === 'ongoing' || rideStatus === 'completed') && (
                <path d="M 40,80 L 150,150 L 320,150 L 380,240" fill="none" stroke="#dc2626" strokeWidth="4" className="animate-pulse" />
              )}
            </svg>

            {/* Start / End flags */}
            {(rideStatus === 'matched' || rideStatus === 'ongoing' || rideStatus === 'completed') && (
              <>
                <div className="absolute left-[40px] top-[80px] -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-900/60 px-1.5 py-0.5 rounded shadow">A</span>
                  <span className="block text-[8px] text-neutral-500 mt-1">Origen</span>
                </div>
                <div className="absolute left-[380px] top-[240px] -translate-x-1/2 -translate-y-1/2 text-center">
                  <span className="text-xs bg-red-950 text-red-400 border border-red-900/60 px-1.5 py-0.5 rounded shadow">B</span>
                  <span className="block text-[8px] text-neutral-500 mt-1">Destino</span>
                </div>
              </>
            )}

            {/* Vehicle location marker */}
            {rideStatus === 'ongoing' && (
              // Simple calculation to move marker based on eta seconds
              <div
                className="absolute text-2xl transition-all duration-1000 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${150 + ((40 - eta) / 40) * 170}px`,
                  top: `150px`
                }}
              >
                🚗
              </div>
            )}

            {/* Waiting for order indicator */}
            {rideStatus === 'idle' && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/40">
                <p className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">Esperando Solicitud de Viaje</p>
              </div>
            )}
          </div>

          <div className="border-t border-neutral-800 pt-2.5 flex justify-between text-[10px] text-neutral-500">
            <span>Ubicación estimada en base a red celular y GPS del terminal</span>
            <span>Est. Error: &lt; 5m</span>
          </div>
        </div>
      </div>
    </div>
  );
}
