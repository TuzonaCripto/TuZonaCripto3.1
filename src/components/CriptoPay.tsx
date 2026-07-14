import React, { useState, useEffect } from 'react';
import { CRYPTO_LIST } from '../data/merchants';
import { Transaction } from '../types';
import { Check, Wallet, QrCode, ShieldCheck, ArrowUpRight, Copy, Loader, HelpCircle } from 'lucide-react';

interface CriptoPayProps {
  prefilledPayment?: {
    merchantId: string;
    merchantName: string;
    amountUsd: number;
    itemName: string;
  } | null;
  onPaymentSuccess?: (txHash: string) => void;
  userTzcBalance: number;
  addUserTzc: (amount: number) => void;
  addTransaction: (tx: Transaction) => void;
  transactions: Transaction[];
}

export default function CriptoPay({
  prefilledPayment,
  onPaymentSuccess,
  userTzcBalance,
  addUserTzc,
  addTransaction,
  transactions
}: CriptoPayProps) {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('TZC');
  const [customAmountUsd, setCustomAmountUsd] = useState('10.00');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'generating' | 'waiting' | 'sending' | 'success'>('idle');
  const [currentTxHash, setCurrentTxHash] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [isCopiedAddress, setIsCopiedAddress] = useState(false);

  // Initial user balances in mock wallet
  const [userBalances, setUserBalances] = useState({
    BTC: 0.0042,
    ETH: 0.25,
    USDT: 120.00,
    USDC: 85.00,
    TZC: userTzcBalance
  });

  useEffect(() => {
    setUserBalances(prev => ({ ...prev, TZC: userTzcBalance }));
  }, [userTzcBalance]);

  // Handle mock wallet connection
  const connectWallet = () => {
    setWalletConnected(true);
    setWalletAddress('0x7Fa8B50...3c9E9dF');
  };

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
  };

  // Convert USD to selected Crypto amount
  const getCryptoAmount = (usdValue: number, cryptoCode: string) => {
    const rate = CRYPTO_LIST[cryptoCode]?.rateUsd || 1;
    return (usdValue / rate).toFixed(cryptoCode === 'BTC' ? 6 : cryptoCode === 'ETH' ? 5 : 2);
  };

  const finalAmountUsd = prefilledPayment ? prefilledPayment.amountUsd : parseFloat(customAmountUsd) || 0;
  const cryptoAmountStr = getCryptoAmount(finalAmountUsd, selectedCrypto);

  const startPayment = () => {
    if (!walletConnected) {
      alert('Por favor, conecta tu wallet primero.');
      return;
    }
    setPaymentStatus('generating');
    setTimeout(() => {
      setPaymentStatus('waiting');
    }, 1200);
  };

  const confirmPayment = () => {
    const cryptoAmount = parseFloat(cryptoAmountStr);
    // Validate balance
    if (userBalances[selectedCrypto as keyof typeof userBalances] < cryptoAmount) {
      alert(`Balance insuficiente de ${selectedCrypto} para realizar esta transacción.`);
      setPaymentStatus('idle');
      return;
    }

    setPaymentStatus('sending');
    setTimeout(() => {
      const generatedHash = '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setCurrentTxHash(generatedHash);
      setPaymentStatus('success');

      // Deduct balance
      setUserBalances(prev => ({
        ...prev,
        [selectedCrypto]: Math.max(0, prev[selectedCrypto as keyof typeof prev] - cryptoAmount)
      }));

      // If they paid with TZC, sync changes to parent state
      if (selectedCrypto === 'TZC') {
        addUserTzc(-cryptoAmount);
      }

      // Add to global transactions log
      const newTx: Transaction = {
        id: Math.random().toString(36).substring(7),
        hash: generatedHash,
        type: 'Payment',
        amount: cryptoAmount,
        token: selectedCrypto,
        destination: prefilledPayment ? prefilledPayment.merchantName : 'Pago Personalizado',
        status: 'Success',
        date: new Date().toISOString().split('T')[0],
        feeTzc: selectedCrypto === 'TZC' ? 0.05 : 0.5
      };
      addTransaction(newTx);

      // Trigger success callback
      if (onPaymentSuccess) {
        onPaymentSuccess(generatedHash);
      }
    }, 2000);
  };

  const copyToClipboard = (text: string, type: 'address' | 'hash') => {
    navigator.clipboard.writeText(text);
    if (type === 'address') {
      setIsCopiedAddress(true);
      setTimeout(() => setIsCopiedAddress(false), 2000);
    } else {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    }
  };

  return (
    <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-8" id="criptopay_module">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-5">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
            CriptoPay (Pasarela de Pagos)
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Pasarela descentralizada de pagos instantáneos en la red Polygon EVM y redes principales.
          </p>
        </div>

        {/* Wallet Connection Manager */}
        <div>
          {!walletConnected ? (
            <button
              onClick={connectWallet}
              id="btn_connect_wallet"
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2.5 rounded-xl transition duration-200 shadow-md shadow-red-900/20 text-sm cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              Conectar Wallet Non-Custodial
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <div className="text-left">
                <p className="text-xs text-neutral-400">Wallet Conectada</p>
                <p className="text-sm font-mono text-white flex items-center gap-1.5">
                  {walletAddress}
                  <button
                    onClick={() => copyToClipboard('0x7Fa8B504772222146eE78E697df0c3c9E9dF95', 'address')}
                    className="text-neutral-500 hover:text-white transition"
                    title="Copiar dirección"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {isCopiedAddress && <span className="text-[10px] text-emerald-400 font-sans">¡Copiado!</span>}
                </p>
              </div>
              <button
                onClick={disconnectWallet}
                className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-2.5 py-1.5 rounded-lg border border-neutral-700 transition cursor-pointer"
              >
                Desconectar
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Hero Visual Banner */}
      <div className="relative h-48 md:h-60 rounded-xl overflow-hidden border border-neutral-800">
        <img
          src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1200"
          alt="CriptoPay Payments Processing"
          className="w-full h-full object-cover filter brightness-45 saturate-120"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-6 text-left">
          <span className="text-[10px] bg-red-600 text-white font-bold uppercase tracking-wider px-2.5 py-1 rounded-md w-max mb-2">
            Pagos On-Chain Rápidos
          </span>
          <h3 className="text-white text-xl md:text-2xl font-black tracking-tight">
            Transacciones Peer-to-Peer a Costo Cero
          </h3>
          <p className="text-neutral-300 text-xs mt-1 max-w-xl">
            Procesa cobros comerciales con liquidación inmediata on-chain. Sin comisiones abusivas por pasarelas tradicionales y con soporte nativo de autocustodia para tokens estables y $TZC.
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
          <h4 className="text-white font-bold text-sm">¿Qué es CriptoPay?</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Es la infraestructura transaccional de pagos instantáneos de <strong className="text-white">TuZonaCripto</strong>. Permite enviar y recibir fondos on-chain mediante códigos QR y facturas inteligentes dinámicas.
          </p>
        </div>

        {/* ¿Cómo funciona? */}
        <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800/80 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 font-bold">
            🔄
          </div>
          <h4 className="text-white font-bold text-sm">¿Cómo funciona?</h4>
          <ul className="text-xs text-neutral-400 space-y-2 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">1.</span>
              <span><strong>Escanear / Facturar:</strong> El comercio genera un código QR de cobro especificando el monto en dólares o TZC.</span>
            </li>
            <li className="flex items-start gap-1.5">
              <span className="text-red-500 font-bold font-mono shrink-0">2.</span>
              <span><strong>Firma con Web3:</strong> El cliente conecta su wallet no-custodial y aprueba la firma de envío directo.</span>
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
              <span><strong>Liquidación Inmediata:</strong> Los fondos se acreditan directo en tu wallet sin tiempos de espera.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span><strong>Ahorros del 100%:</strong> Sin comisiones por devolución de cargo o fees de mantenimiento mensual.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-neutral-900">
        {/* Left Side: Set Up and Configuration */}
        <div className="lg:col-span-7 space-y-6">
          {/* User Wallet Balances */}
          <div className="bg-neutral-900/60 p-5 rounded-xl border border-neutral-800">
            <h3 className="text-white text-sm font-semibold mb-3 flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-red-500" />
              Balances de tu Wallet
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {Object.keys(CRYPTO_LIST).map((key) => {
                const c = CRYPTO_LIST[key];
                return (
                  <div key={key} className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 text-center">
                    <div className="text-xl mb-1">{c.logo}</div>
                    <div className="text-xs font-mono font-semibold text-white">{key}</div>
                    <div className="text-sm font-bold text-neutral-200 mt-1">
                      {userBalances[key as keyof typeof userBalances]?.toFixed(key === 'BTC' ? 4 : key === 'ETH' ? 3 : 2)}
                    </div>
                    <div className="text-[10px] text-neutral-500">
                      ${(userBalances[key as keyof typeof userBalances] * c.rateUsd).toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Setup Form */}
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800">
            <h3 className="text-white text-sm font-semibold mb-4">Detalles del Envío de Pago</h3>

            {prefilledPayment ? (
              // Prefilled invoice from CriptoMap purchase or Ride
              <div className="bg-neutral-950 p-4 rounded-lg border border-red-950/40 mb-4 flex items-start gap-3">
                <div className="p-2.5 bg-red-950/40 border border-red-900/30 rounded-lg text-red-500">
                  <QrCode className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs bg-red-900/20 text-red-400 font-bold px-2 py-0.5 rounded inline-block mb-1.5">
                    Factura Inteligente Generada
                  </div>
                  <h4 className="font-semibold text-white text-sm">{prefilledPayment.merchantName}</h4>
                  <p className="text-xs text-neutral-400 mt-0.5">Concepto: {prefilledPayment.itemName}</p>
                  <div className="text-xl font-bold text-white mt-1.5">${prefilledPayment.amountUsd.toFixed(2)} USD</div>
                </div>
              </div>
            ) : (
              // Custom invoice form
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase">Destinatario / Comercio</label>
                  <input
                    type="text"
                    defaultValue="Pagar a Dirección Manual / Recarga TZC"
                    disabled
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5 uppercase">Monto en USD</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                    <input
                      type="number"
                      value={customAmountUsd}
                      onChange={(e) => setCustomAmountUsd(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-8 pr-16 py-2 text-sm text-white font-semibold focus:outline-none focus:border-red-600"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-mono">USD</span>
                  </div>
                </div>
              </div>
            )}

            {/* Select crypto */}
            <div>
              <label className="block text-xs font-semibold text-neutral-400 mb-2 uppercase">Seleccionar Criptomoneda de Pago</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.keys(CRYPTO_LIST).map((key) => {
                  const active = selectedCrypto === key;
                  const c = CRYPTO_LIST[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCrypto(key)}
                      className={`p-2 rounded-lg border text-center transition cursor-pointer ${
                        active
                          ? 'bg-red-950/20 border-red-600 text-white'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-base mr-1">{c.logo}</span>
                      <span className="font-semibold font-mono text-xs text-white">{key}</span>
                      <div className="text-[10px] text-neutral-500 font-mono mt-0.5">1 = ${c.rateUsd >= 1 ? c.rateUsd : c.rateUsd.toFixed(2)}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Preview */}
            <div className="bg-neutral-950 p-4 rounded-lg border border-neutral-800 mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-500 font-medium">Equivalente Estimado en {selectedCrypto}</p>
                <p className="text-xl font-mono font-bold text-white mt-1">
                  {cryptoAmountStr} {selectedCrypto}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-neutral-500">Red Seleccionada</p>
                <p className="text-xs font-mono font-semibold text-red-500 mt-1">
                  {CRYPTO_LIST[selectedCrypto]?.network}
                </p>
              </div>
            </div>

            {/* Pay Button / Actions */}
            <div className="mt-5">
              {paymentStatus === 'idle' && (
                <button
                  onClick={startPayment}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition duration-200 shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Iniciar Pago Descentralizado
                </button>
              )}

              {paymentStatus === 'generating' && (
                <div className="w-full bg-neutral-900 border border-neutral-800 py-3 rounded-xl flex items-center justify-center gap-2 text-neutral-400">
                  <Loader className="w-5 h-5 animate-spin text-red-500" />
                  Generando Smart Contract Invoice...
                </div>
              )}

              {paymentStatus === 'waiting' && (
                <div className="space-y-3">
                  <div className="bg-neutral-950 p-4 rounded-lg border border-red-950 text-center">
                    <p className="text-sm text-neutral-300">Confirma la transacción Web3 de forma directa:</p>
                    <p className="text-xs text-neutral-500 mt-1">Monto: {cryptoAmountStr} {selectedCrypto} (~${finalAmountUsd.toFixed(2)} USD)</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPaymentStatus('idle')}
                      className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold py-2.5 rounded-lg border border-neutral-700 transition cursor-pointer text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={confirmPayment}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-lg transition cursor-pointer text-sm"
                    >
                      Firmar & Pagar
                    </button>
                  </div>
                </div>
              )}

              {paymentStatus === 'sending' && (
                <div className="w-full bg-neutral-900 border border-neutral-800 py-3 rounded-xl flex items-center justify-center gap-2 text-neutral-400">
                  <Loader className="w-5 h-5 animate-spin text-red-500" />
                  Procesando transacción en blockchain Polygon PoS...
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="bg-emerald-950/30 border border-emerald-500/40 p-4 rounded-xl text-center space-y-2">
                  <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white">¡Transacción Completada Exitosamente!</h4>
                  <p className="text-xs text-neutral-400">
                    El pago ha sido recibido de forma directa y peer-to-peer por el comercio.
                  </p>
                  <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 text-left mt-2 flex items-center justify-between">
                    <div className="font-mono text-[10px] text-neutral-400 overflow-hidden text-ellipsis whitespace-nowrap mr-3">
                      Tx: {currentTxHash}
                    </div>
                    <button
                      onClick={() => copyToClipboard(currentTxHash, 'hash')}
                      className="text-neutral-500 hover:text-neutral-200 p-1 transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {showCopied && <div className="text-[10px] text-emerald-400 mt-1">¡Hash de Tx copiado al portapapeles!</div>}
                  <button
                    onClick={() => setPaymentStatus('idle')}
                    className="mt-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Realizar otro Pago
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: QR Code scan mock & Blockchain Live Stats */}
        <div className="lg:col-span-5 space-y-6">
          {/* Simulated QR Code for Peer-To-Peer App */}
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800 text-center flex flex-col items-center justify-center">
            <h3 className="text-white text-sm font-semibold mb-3">Escanear QR para Pago Directo</h3>
            <p className="text-xs text-neutral-400 mb-4">
              Acepta pagos directos en tu local. Muestra este código para recibir {cryptoAmountStr} {selectedCrypto}.
            </p>

            <div className="bg-white p-4 rounded-xl inline-block border-4 border-red-600 mb-3 shadow-lg">
              {/* Responsive SVG QR Code pattern mock */}
              <svg className="w-36 h-36" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="white" />
                <g fill="black">
                  {/* Outer corners */}
                  <rect x="5" y="5" width="25" height="25" />
                  <rect x="8" y="8" width="19" height="19" fill="white" />
                  <rect x="12" y="12" width="11" height="11" />

                  <rect x="70" y="5" width="25" height="25" />
                  <rect x="73" y="8" width="19" height="19" fill="white" />
                  <rect x="77" y="12" width="11" height="11" />

                  <rect x="5" y="70" width="25" height="25" />
                  <rect x="8" y="73" width="19" height="19" fill="white" />
                  <rect x="12" y="77" width="11" height="11" />

                  {/* Random pixels */}
                  <rect x="35" y="15" width="5" height="5" />
                  <rect x="45" y="5" width="10" height="5" />
                  <rect x="55" y="20" width="5" height="15" />
                  <rect x="40" y="40" width="15" height="15" />
                  <rect x="15" y="45" width="10" height="5" />
                  <rect x="10" y="55" width="5" height="10" />
                  <rect x="45" y="60" width="10" height="5" />
                  <rect x="65" y="45" width="5" height="10" />
                  <rect x="75" y="35" width="10" height="5" />
                  <rect x="85" y="50" width="5" height="15" />
                  <rect x="60" y="70" width="15" height="5" />
                  <rect x="80" y="80" width="15" height="15" />
                  <rect x="50" y="85" width="10" height="5" />
                  <rect x="35" y="75" width="5" height="15" />
                </g>
              </svg>
            </div>

            <div className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded-lg border border-neutral-800 inline-flex items-center gap-2">
              <span>Monto: {cryptoAmountStr} {selectedCrypto}</span>
            </div>
          </div>

          {/* Transactions Log */}
          <div className="bg-neutral-900 p-5 rounded-xl border border-neutral-800">
            <h3 className="text-white text-sm font-semibold mb-3 flex items-center justify-between">
              <span>Historial Reciente (Simulado)</span>
              <span className="text-[10px] bg-red-950/40 text-red-400 border border-red-900/30 px-2 py-0.5 rounded-full font-mono">
                P2P Ledger
              </span>
            </h3>

            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {transactions.filter(t => t.type === 'Payment').length === 0 ? (
                <p className="text-xs text-neutral-500 text-center py-4">No hay pagos recientes aún.</p>
              ) : (
                transactions.filter(t => t.type === 'Payment').map((tx) => (
                  <div key={tx.id} className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-white">{tx.destination}</p>
                      <p className="text-[10px] text-neutral-500 font-mono mt-0.5">Hash: {tx.hash.substring(0, 10)}...</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-bold text-white">-{tx.amount} {tx.token}</p>
                      <span className="text-[9px] bg-emerald-950/40 text-emerald-400 px-1.5 py-0.5 rounded inline-block mt-0.5">
                        {tx.status}
                      </span>
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
