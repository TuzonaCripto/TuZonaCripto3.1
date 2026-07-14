import React, { useState, useEffect } from 'react';
import { DeliveryItem } from '../types';
import { Truck, MapPin, Package, Clock, Check, Loader, Milestone } from 'lucide-react';

interface CriptoGoProps {
  deliveryItem: DeliveryItem | null;
  onClearDelivery: () => void;
}

export default function CriptoGo({ deliveryItem, onClearDelivery }: CriptoGoProps) {
  const [currentStatus, setCurrentStatus] = useState<'preparando' | 'en_camino' | 'entregado'>('preparando');
  const [eta, setEta] = useState(0);

  // Sync internal status with prop when it arrives
  useEffect(() => {
    if (deliveryItem) {
      setCurrentStatus(deliveryItem.status);
      setEta(deliveryItem.estimateMin);
    }
  }, [deliveryItem]);

  // Simulate progress
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (deliveryItem && currentStatus === 'preparando') {
      timer = setTimeout(() => {
        setCurrentStatus('en_camino');
        setEta(prev => Math.max(1, prev - 5));
      }, 7000);
    } else if (deliveryItem && currentStatus === 'en_camino') {
      timer = setTimeout(() => {
        setCurrentStatus('entregado');
        setEta(0);
      }, 12000);
    }
    return () => clearTimeout(timer);
  }, [deliveryItem, currentStatus]);

  return (
    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-8" id="criptogo_module">
      {/* Module Header */}
      <div className="border-b border-neutral-800 pb-5">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
          CriptoGo (Envíos Descentralizados)
        </h2>
        <p className="text-neutral-400 text-sm mt-1">
          Intermediación logística de última milla inteligente impulsada por contratos de custodia on-chain.
        </p>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden border border-neutral-800">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
          alt="CriptoGo Logistics"
          className="w-full h-full object-cover filter brightness-45 saturate-120"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6">
          <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
            Logística Inteligente
          </span>
          <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
            Entregas Seguras Automatizadas con Smart Escrow
          </h3>
          <p className="text-neutral-300 text-xs mt-1 max-w-xl">
            Conectamos comercios locales con repartidores independientes garantizando que cada pago se libere solo al momento de la entrega exitosa.
          </p>
        </div>
      </div>

      {/* Program Details Section: What is it, How it works, Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Concepto */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            📦
          </div>
          <h4 className="text-white font-bold text-sm">¿Qué es CriptoGo?</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Es la primera plataforma de delivery descentralizada de la región. Intermediamos la logística de última milla para las compras físicas realizadas en <strong className="text-white">CriptoMap</strong>, conectando directamente al comprador, al comercio y al repartidor.
          </p>
        </div>

        {/* Flujo de Trabajo */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            🔄
          </div>
          <h4 className="text-white font-bold text-sm">¿Cómo funciona?</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold font-mono shrink-0">1.</span>
              <span>Pides un delivery tras realizar tu compra física en el directorio de comercios afiliados.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold font-mono shrink-0">2.</span>
              <span>Tus tokens de pago se resguardan en un contrato de custodia temporal (<strong className="text-neutral-300">escrow</strong>).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold font-mono shrink-0">3.</span>
              <span>El motorizado traslada tu producto. Al recibirlo, confirmas la entrega y se liberan los fondos de forma automática.</span>
            </li>
          </ul>
        </div>

        {/* Beneficios */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            🛡️
          </div>
          <h4 className="text-white font-bold text-sm">Beneficios Clave</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Cero Comisiones Bancarias:</strong> Tarifas directas exentas de recargos.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Seguridad P2P:</strong> Si hay algún problema, tus fondos regresan a tu wallet.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Incentivos por TZC:</strong> Paga tu delivery usando $TZC y obtén hasta un 10% de descuento.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Tracker Title Banner */}
      <div className="border-t border-neutral-900 pt-6">
        <h3 className="text-white font-bold text-sm mb-4 text-left flex items-center gap-2">
          <Milestone className="w-4 h-4 text-red-500" />
          Estado de Despacho e Intermediación Logística
        </h3>
      </div>

      {!deliveryItem ? (
        <div className="bg-neutral-900 border border-neutral-800 p-12 rounded-xl text-center max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-neutral-950 text-neutral-600 border border-neutral-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base">No hay entregas activas en este momento</h3>
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
              Realiza una compra de algún producto en los comercios afiliados de <strong className="text-neutral-300">CriptoMap</strong> y selecciona la opción "Pedir Delivery" para activar el rastreador en vivo en este módulo.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Package details & timeline status */}
          <div className="lg:col-span-6 space-y-5">
            <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 space-y-4">
              <div className="flex justify-between items-start border-b border-neutral-800 pb-3">
                <div>
                  <span className="text-[9px] bg-red-950 text-red-400 border border-red-900/30 px-2 py-0.5 rounded-full font-mono">
                    ID: {deliveryItem.id}
                  </span>
                  <h3 className="text-white font-bold text-sm mt-1.5">Origen: {deliveryItem.merchantName}</h3>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-neutral-500">Estimado</p>
                  <p className="text-sm font-mono font-bold text-white flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-red-500" />
                    {eta > 0 ? `${eta} Min` : 'Entregado'}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase block">Artículos a entregar:</span>
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-1">
                  {deliveryItem.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-neutral-300">
                      <span>• {it}</span>
                      <span className="font-mono text-neutral-500">x1</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-neutral-900 mt-2 flex justify-between text-xs font-bold text-white">
                    <span>Costo total:</span>
                    <span>${deliveryItem.totalUsd.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>

              {/* Destination */}
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase block">Dirección de Destino:</span>
                <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 text-xs text-neutral-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{deliveryItem.address}</span>
                </div>
              </div>
            </div>

            <button
              onClick={onClearDelivery}
              className="w-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs py-2 rounded-lg cursor-pointer"
            >
              Cerrar Tracker
            </button>
          </div>

          {/* Graphical timeline */}
          <div className="lg:col-span-6 bg-neutral-900 p-5 rounded-xl border border-neutral-800 flex flex-col justify-between">
            <h3 className="text-white text-sm font-semibold border-b border-neutral-800 pb-2 mb-4">Línea de Tiempo del Pedido</h3>

            <div className="relative pl-8 space-y-8 flex-1 py-2">
              {/* Vertical line connector */}
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-neutral-800">
                <div
                  className="w-full bg-red-600 transition-all duration-1000"
                  style={{
                    height: currentStatus === 'preparando' ? '15%' : currentStatus === 'en_camino' ? '60%' : '100%'
                  }}
                ></div>
              </div>

              {/* Step 1: Preparing */}
              <div className="relative flex gap-3 text-left">
                <span className={`absolute -left-7 w-7 h-7 rounded-full border flex items-center justify-center text-xs transition z-10 ${
                  currentStatus === 'preparando' ? 'bg-red-950 border-red-600 text-red-500 animate-pulse' : 'bg-neutral-950 border-neutral-800 text-neutral-600'
                }`}>
                  <Package className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h4 className={`text-xs font-bold ${currentStatus === 'preparando' ? 'text-white' : 'text-neutral-500'}`}>
                    Preparación en Comercio
                  </h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">El comercio está armando el empaque de tus artículos.</p>
                </div>
              </div>

              {/* Step 2: On the road */}
              <div className="relative flex gap-3 text-left">
                <span className={`absolute -left-7 w-7 h-7 rounded-full border flex items-center justify-center text-xs transition z-10 ${
                  currentStatus === 'en_camino' ? 'bg-red-950 border-red-600 text-red-500 animate-pulse' : 'bg-neutral-950 border-neutral-800 text-neutral-600'
                }`}>
                  {currentStatus === 'en_camino' ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Truck className="w-3.5 h-3.5" />}
                </span>
                <div>
                  <h4 className={`text-xs font-bold ${currentStatus === 'en_camino' ? 'text-white' : 'text-neutral-500'}`}>
                    Despachado / En Camino
                  </h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">Asignado a socio repartidor. En tránsito hacia tu ubicación.</p>
                </div>
              </div>

              {/* Step 3: Delivered */}
              <div className="relative flex gap-3 text-left">
                <span className={`absolute -left-7 w-7 h-7 rounded-full border flex items-center justify-center text-xs transition z-10 ${
                  currentStatus === 'entregado' ? 'bg-emerald-950 border-emerald-500 text-emerald-400' : 'bg-neutral-950 border-neutral-800 text-neutral-600'
                }`}>
                  <Check className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h4 className={`text-xs font-bold ${currentStatus === 'entregado' ? 'text-emerald-400' : 'text-neutral-500'}`}>
                    Entregado Exitosamente
                  </h4>
                  <p className="text-[10px] text-neutral-500 mt-0.5">El pedido fue recibido. Transacción liberada en escrow.</p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-950 p-3.5 rounded-lg border border-neutral-800 text-center">
              <span className="text-[10px] text-neutral-500 font-semibold uppercase block">Integrador Logístico</span>
              <p className="text-xs text-neutral-300 font-bold mt-1">Socio: PedidosYa Cripto API</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
