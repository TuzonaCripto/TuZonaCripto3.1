import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Send, 
  QrCode, 
  History, 
  Lock, 
  Unlock, 
  PiggyBank, 
  Percent, 
  TrendingUp, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  Info, 
  Coins, 
  ShieldCheck, 
  User, 
  ArrowRight,
  RefreshCw,
  Clock,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { Transaction } from '../types';

interface CriptoWalletProps {
  userTzcBalance: number;
  addUserTzc: (amount: number) => void;
  addTransaction: (tx: Transaction) => void;
  transactions: Transaction[];
}

export default function CriptoWallet({ 
  userTzcBalance, 
  addUserTzc, 
  addTransaction, 
  transactions 
}: CriptoWalletProps) {
  
  // Tab within the wallet: 'transfer' | 'receive' | 'vault' | 'history'
  const [walletTab, setWalletTab] = useState<'transfer' | 'receive' | 'vault' | 'history'>('transfer');
  
  // Theme of the visual TZC Card
  const [cardTheme, setCardTheme] = useState<'dark' | 'cyberpunk' | 'gold'>('dark');

  // Recipient / Transfer state
  const [recipientAddress, setRecipientAddress] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferMemo, setTransferMemo] = useState('');
  const [transferStep, setTransferStep] = useState<'input' | 'pin' | 'success'>('input');
  const [pinCode, setPinCode] = useState('');
  const [lastTxId, setLastTxId] = useState('');
  const [lastTxHash, setLastTxHash] = useState('');
  const [isProcessingTransfer, setIsProcessingTransfer] = useState(false);
  const [copiedTxHash, setCopiedTxHash] = useState(false);

  // Receive State
  const [requestAmount, setRequestAmount] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Vault/Savings State
  const [vaultBalance, setVaultBalance] = useState<number>(100.00); // Default simulated savings
  const [vaultInputAmount, setVaultInputAmount] = useState('');
  const [vaultActionType, setVaultActionType] = useState<'deposit' | 'withdraw'>('deposit');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(false);
  const [simulatedEarned, setSimulatedEarned] = useState<number>(0.043);

  // Contacts picker
  const contacts = [
    { name: 'Darwin Giraud (Fundador)', address: '0x3a48e7...8864', avatar: '👨‍💻' },
    { name: 'Carolina Sibulo (Fundadora)', address: '0x9b12cf...4123', avatar: '👩‍💻' },
    { name: 'Burguer Cripto Las Mercedes', address: '0xf41a02...bc88', avatar: '🍔' },
    { name: 'Cacao & Cripto Altamira', address: '0xca71d2...aa99', avatar: '☕' },
    { name: 'Sambil Chacao Mall', address: '0x5b32ec...e74a', avatar: '🛍️' }
  ];

  // History states
  const [filterType, setFilterType] = useState<'all' | 'Transfer' | 'Reward' | 'Payment' | 'Staking' | 'Savings'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxDetail, setSelectedTxDetail] = useState<Transaction | null>(null);

  // Copy helper
  const handleCopy = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Live simulation of yield growth in the savings vault
  useEffect(() => {
    const interval = setInterval(() => {
      if (vaultBalance > 0) {
        // Yield grows proportionally to the vault balance (approx +8.5% APY simulated in small steps)
        setSimulatedEarned(prev => prev + (vaultBalance * 0.000001));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [vaultBalance]);

  // Execute Transfer logic
  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    
    if (!recipientAddress) {
      alert('Por favor ingrese la dirección destino.');
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      alert('Ingrese un monto válido.');
      return;
    }
    if (amount > userTzcBalance) {
      alert('Saldo de TZC insuficiente.');
      return;
    }

    // Go to PIN confirmation step
    setTransferStep('pin');
    setPinCode('');
  };

  const confirmTransfer = () => {
    if (pinCode.length < 4) {
      alert('Ingrese un código de confirmación válido de 4 dígitos.');
      return;
    }

    setIsProcessingTransfer(true);
    const amount = parseFloat(transferAmount);

    setTimeout(() => {
      // Complete transfer simulation
      addUserTzc(-amount);
      
      const newTxId = 'tx-' + Math.floor(100000 + Math.random() * 900000);
      const randomHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      const formattedHash = randomHash.substring(0, 7) + '...' + randomHash.substring(randomHash.length - 5);
      
      const newTx: Transaction = {
        id: newTxId,
        hash: formattedHash,
        type: 'Transfer',
        amount: amount,
        token: 'TZC',
        destination: recipientAddress.includes('0x') ? `Dirección ${recipientAddress.substring(0, 8)}...` : recipientAddress,
        status: 'Success',
        date: new Date().toISOString().split('T')[0],
        feeTzc: 0.1
      };

      addTransaction(newTx);
      setLastTxId(newTxId);
      setLastTxHash(randomHash);
      setIsProcessingTransfer(false);
      setTransferStep('success');
    }, 1500);
  };

  // Vault Deposit/Withdraw action
  const handleVaultAction = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(vaultInputAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Ingrese un monto válido.');
      return;
    }

    if (vaultActionType === 'deposit') {
      if (amount > userTzcBalance) {
        alert('Saldo de TZC insuficiente para ingresar a la bóveda.');
        return;
      }
      addUserTzc(-amount);
      setVaultBalance(prev => prev + amount);
      
      // Log as transaction
      addTransaction({
        id: 'tx-v-' + Math.floor(1000 + Math.random()*9000),
        hash: '0x' + Math.floor(Math.random()*10000000).toString(16) + '...v',
        type: 'Savings',
        amount: amount,
        token: 'TZC',
        destination: 'Bóveda de Ahorro TZC',
        status: 'Success',
        date: new Date().toISOString().split('T')[0],
        feeTzc: 0
      });

      alert(`¡Se han depositado $${amount.toFixed(2)} TZC en la Bóveda de Ahorro! Comienzan a generar +8% APY de inmediato.`);
    } else {
      if (amount > vaultBalance) {
        alert('No dispone de esa cantidad en la bóveda de ahorros.');
        return;
      }
      setVaultBalance(prev => prev - amount);
      addUserTzc(amount);

      // Log as transaction
      addTransaction({
        id: 'tx-v-w-' + Math.floor(1000 + Math.random()*9000),
        hash: '0x' + Math.floor(Math.random()*10000000).toString(16) + '...vw',
        type: 'Savings',
        amount: -amount,
        token: 'TZC',
        destination: 'Retiro de Bóveda TZC',
        status: 'Success',
        date: new Date().toISOString().split('T')[0],
        feeTzc: 0
      });

      alert(`¡Se han retirado $${amount.toFixed(2)} TZC de la Bóveda de Ahorro hacia tu saldo disponible!`);
    }

    setVaultInputAmount('');
  };

  // Filtering transactions list
  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = filterType === 'all' || tx.type === filterType;
    const matchesSearch = tx.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tx.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6" id="tzc_wallet_module">
      
      {/* Module Title Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-neutral-950 p-6 rounded-2xl border border-neutral-900 shadow-md">
        <div className="space-y-1">
          <span className="text-xs font-bold text-red-500 uppercase tracking-wider block">TuZonaCripto Smart Wallet</span>
          <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Wallet className="w-6 h-6 text-red-500 animate-pulse" />
            Billetera Virtual $TZC
          </h2>
          <p className="text-xs text-neutral-400">
            Administra tus tokens nativos TZC, realiza transferencias entre usuarios de Caracas sin comisiones bancarias y maximiza tus ahorros con la bóveda de interés descentralizada.
          </p>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-neutral-300">Conectado a Polygon Network</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visual Card, Balance summary & Tab selection */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* VISUAL CRYPTO CARD */}
          <div className={`relative h-56 rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 border ${
            cardTheme === 'dark' 
              ? 'bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border-neutral-800' 
              : cardTheme === 'cyberpunk' 
              ? 'bg-gradient-to-br from-red-950/60 via-black to-red-900/30 border-red-900/40' 
              : 'bg-gradient-to-br from-amber-950/60 via-zinc-950 to-amber-900/30 border-amber-900/40'
          }`}>
            
            {/* Background geometric glows */}
            <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-red-600/10 blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-emerald-500/5 blur-3xl"></div>
            
            {/* Top row: Chip and network logo */}
            <div className="flex justify-between items-start z-10">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">Tarjeta de Balance TZC</span>
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4 text-red-500" />
                  <span className="text-xs font-mono font-bold text-white">TuZonaCripto Protocol</span>
                </div>
              </div>
              
              {/* Simulated Smart Card Chip */}
              <div className="w-10 h-8 bg-amber-500/20 rounded-lg border border-amber-500/40 flex flex-col justify-around p-1">
                <div className="h-0.5 bg-amber-500/40 rounded"></div>
                <div className="h-0.5 bg-amber-500/40 rounded"></div>
                <div className="h-0.5 bg-amber-500/40 rounded"></div>
              </div>
            </div>

            {/* Middle Row: Balance display */}
            <div className="space-y-1 z-10">
              <span className="text-[10px] uppercase text-neutral-400 font-bold tracking-wider">Saldo Disponible</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-white font-mono tracking-tight">
                  ${userTzcBalance.toFixed(2)}
                </h3>
                <span className="text-sm font-bold text-red-500 font-mono">TZC</span>
              </div>
              <p className="text-[11px] text-neutral-500 font-mono">
                Equivalente aproximado: <span className="text-neutral-300 font-bold">${(userTzcBalance * 0.12).toFixed(2)} USD</span>
              </p>
            </div>

            {/* Bottom Row: Address and network */}
            <div className="flex justify-between items-end z-10 font-mono text-[11px]">
              <div className="space-y-0.5">
                <span className="text-[8px] uppercase text-neutral-500 font-bold tracking-wider block">Wallet Address</span>
                <span className="text-neutral-300 font-bold flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded border border-neutral-850">
                  0x71C...B29 
                  <Copy 
                    className="w-3.5 h-3.5 text-neutral-500 hover:text-white cursor-pointer" 
                    onClick={() => handleCopy('0x71C83ab9d9a3b290df81e8b23f27de5fb270db29', setCopiedAddress)} 
                  />
                  {copiedAddress && <span className="text-[9px] text-emerald-400 font-sans">¡Copiado!</span>}
                </span>
              </div>
              
              <div className="text-right">
                <span className="text-[9px] bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full uppercase font-bold">
                  BETA CLIENT
                </span>
              </div>
            </div>
          </div>

          {/* Visual Customizer Selector */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900 flex justify-between items-center text-xs">
            <span className="text-neutral-400 font-bold">Tema visual de tu tarjeta:</span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCardTheme('dark')}
                className={`w-5 h-5 rounded-full bg-neutral-800 border-2 transition ${cardTheme === 'dark' ? 'border-red-500 scale-110' : 'border-transparent'}`}
                title="Clásico"
              ></button>
              <button 
                onClick={() => setCardTheme('cyberpunk')}
                className={`w-5 h-5 rounded-full bg-red-900 border-2 transition ${cardTheme === 'cyberpunk' ? 'border-red-500 scale-110' : 'border-transparent'}`}
                title="Cyberpunk"
              ></button>
              <button 
                onClick={() => setCardTheme('gold')}
                className={`w-5 h-5 rounded-full bg-amber-600 border-2 transition ${cardTheme === 'gold' ? 'border-red-500 scale-110' : 'border-transparent'}`}
                title="Oro"
              ></button>
            </div>
          </div>

          {/* QUICK TRANSFERS STATISTICS / MODULES MENU */}
          <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-900 space-y-2">
            <button
              onClick={() => { setWalletTab('transfer'); setTransferStep('input'); }}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl transition font-bold text-xs cursor-pointer ${
                walletTab === 'transfer' 
                  ? 'bg-red-600/10 border border-red-500/40 text-white' 
                  : 'bg-neutral-900/40 border border-transparent text-neutral-400 hover:bg-neutral-900/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Send className="w-4.5 h-4.5" />
                <div className="text-left">
                  <span>Enviar Transferencia TZC</span>
                  <span className="text-[10px] text-neutral-500 block font-normal mt-0.5">Transfiere saldo a comercios o usuarios</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setWalletTab('receive')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl transition font-bold text-xs cursor-pointer ${
                walletTab === 'receive' 
                  ? 'bg-red-600/10 border border-red-500/40 text-white' 
                  : 'bg-neutral-900/40 border border-transparent text-neutral-400 hover:bg-neutral-900/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <QrCode className="w-4.5 h-4.5" />
                <div className="text-left">
                  <span>Recibir con Código QR</span>
                  <span className="text-[10px] text-neutral-500 block font-normal mt-0.5">Recibe aportes y cobros con tu dirección</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setWalletTab('vault')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl transition font-bold text-xs cursor-pointer ${
                walletTab === 'vault' 
                  ? 'bg-red-600/10 border border-red-500/40 text-white' 
                  : 'bg-neutral-900/40 border border-transparent text-neutral-400 hover:bg-neutral-900/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <PiggyBank className="w-4.5 h-4.5 text-amber-500" />
                <div className="text-left">
                  <span>Bóveda de Ahorros (+8.5% APY)</span>
                  <span className="text-[10px] text-neutral-500 block font-normal mt-0.5">Acumula y gana intereses pasivos</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setWalletTab('history')}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl transition font-bold text-xs cursor-pointer ${
                walletTab === 'history' 
                  ? 'bg-red-600/10 border border-red-500/40 text-white' 
                  : 'bg-neutral-900/40 border border-transparent text-neutral-400 hover:bg-neutral-900/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <History className="w-4.5 h-4.5" />
                <div className="text-left">
                  <span>Historial de Transacciones</span>
                  <span className="text-[10px] text-neutral-500 block font-normal mt-0.5">Historial on-chain completo</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Warning / Security info */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-900 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-red-500 font-bold">
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>Garantía de Seguridad Criptográfica</span>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              Las transferencias dentro de la red TuZonaCripto se liquidan en la blockchain Polygon de forma inmediata. Asegúrese de ingresar la dirección destino correcta ya que las transacciones Web3 son irreversibles.
            </p>
          </div>

        </div>

        {/* Right Column: Tab Content */}
        <div className="lg:col-span-7">
          
          {/* TAB 1: INITIATE TRANSFERS */}
          {walletTab === 'transfer' && (
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-6">
              
              {transferStep === 'input' && (
                <>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Send className="w-5 h-5 text-red-500" />
                      Enviar Transferencia Express $TZC
                    </h3>
                    <p className="text-xs text-neutral-400">Puedes enviar tokens de forma directa ingresando su clave pública o seleccionando un contacto rápido de Caracas.</p>
                  </div>

                  {/* Contacts Picker section */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">Contactos Rápidos del Directorio</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {contacts.map((contact, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRecipientAddress(contact.address)}
                          className="p-2.5 bg-neutral-900 hover:bg-neutral-850 border border-neutral-850 rounded-xl text-center space-y-1 transition text-[10px] font-bold text-neutral-300 block w-full truncate"
                        >
                          <span className="text-lg block">{contact.avatar}</span>
                          <span className="block truncate">{contact.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleTransferSubmit} className="space-y-4 pt-2">
                    {/* Recipient Address */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Dirección Destino Polygon / Alias *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. 0x3a48e7e1... u otro contacto"
                        value={recipientAddress}
                        onChange={(e) => setRecipientAddress(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 font-mono"
                      />
                    </div>

                    {/* Amount & Balance validation */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-baseline mb-1">
                        <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Monto a Transferir ($TZC) *</label>
                        <button
                          type="button"
                          onClick={() => setTransferAmount(userTzcBalance.toString())}
                          className="text-[10px] text-red-500 hover:text-red-400 font-bold"
                        >
                          Usar saldo máximo: {userTzcBalance.toFixed(2)} TZC
                        </button>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          step="any"
                          required
                          placeholder="Monto"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-4 pr-16 py-3 text-sm text-white focus:outline-none focus:border-red-600 font-mono"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-xs text-neutral-500">
                          TZC
                        </span>
                      </div>
                    </div>

                    {/* Optional memo */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Nota o Concepto de Pago (Opcional)</label>
                      <input
                        type="text"
                        placeholder="Ej. Pago de almuerzo burguer / Aporte privado"
                        value={transferMemo}
                        onChange={(e) => setTransferMemo(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-850 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600"
                      />
                    </div>

                    {/* Gas and Details calculation */}
                    <div className="bg-neutral-900/60 p-4 rounded-xl border border-neutral-850 space-y-2.5 text-xs font-mono">
                      <div className="flex justify-between text-neutral-400 text-[11px]">
                        <span>Comisión de Gas Polygon:</span>
                        <span className="text-emerald-400">0.10 TZC (Simulado)</span>
                      </div>
                      <div className="flex justify-between text-neutral-400 text-[11px]">
                        <span>Tiempo de confirmación:</span>
                        <span>~5 segundos</span>
                      </div>
                      <div className="border-t border-neutral-850 pt-2.5 flex justify-between font-bold">
                        <span className="text-neutral-300">Total a deducir:</span>
                        <span className="text-white">
                          {transferAmount ? (parseFloat(transferAmount) + 0.1).toFixed(2) : '0.00'} TZC
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-lg shadow-red-950/20 cursor-pointer mt-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Siguiente: Confirmar Firma</span>
                    </button>
                  </form>
                </>
              )}

              {transferStep === 'pin' && (
                <div className="space-y-6 text-center py-4">
                  <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-red-500 border border-neutral-800 mx-auto">
                    <Lock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white">Autorización de Seguridad</h3>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                      Para firmar digitalmente la transacción de <span className="text-white font-bold">{transferAmount} TZC</span> hacia <span className="text-white font-bold truncate block">{recipientAddress}</span>, introduzca su código PIN personal.
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto space-y-4">
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="PIN de 4 dígitos"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3.5 text-center text-xl font-bold tracking-widest text-white focus:outline-none focus:border-red-600 font-mono"
                    />
                    <p className="text-[10px] text-neutral-500">Por defecto o demostración, puede introducir cualquier PIN (Ej: 1234)</p>
                    
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setTransferStep('input')}
                        className="bg-neutral-900 hover:bg-neutral-850 text-neutral-300 font-bold py-2.5 rounded-xl text-xs transition cursor-pointer"
                      >
                        Atrás
                      </button>
                      <button
                        type="button"
                        onClick={confirmTransfer}
                        disabled={isProcessingTransfer || pinCode.length < 4}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {isProcessingTransfer ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Firmando...</span>
                          </>
                        ) : (
                          <>
                            <Unlock className="w-3.5 h-3.5" />
                            <span>Confirmar Pago</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {transferStep === 'success' && (
                <div className="space-y-6 text-center py-6 animate-fadeIn">
                  <div className="w-14 h-14 bg-emerald-950/40 border border-emerald-900 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white">¡Transferencia Enviada con Éxito!</h3>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto">
                      Se han transferido <span className="text-emerald-400 font-bold">{transferAmount} TZC</span> de forma segura a través del contrato inteligente de TuZonaCripto.
                    </p>
                  </div>

                  <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850 max-w-md mx-auto text-left space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Monto:</span>
                      <span className="text-white font-bold">{transferAmount} TZC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Destino:</span>
                      <span className="text-white truncate block max-w-[200px]" title={recipientAddress}>{recipientAddress}</span>
                    </div>
                    {transferMemo && (
                      <div className="flex justify-between">
                        <span className="text-neutral-500">Nota:</span>
                        <span className="text-neutral-300 italic">"{transferMemo}"</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Gas Polygon:</span>
                      <span className="text-neutral-400">0.1 TZC</span>
                    </div>
                    <div className="border-t border-neutral-850 pt-2">
                      <div className="flex justify-between text-[11px] items-center">
                        <span className="text-neutral-500">TX Hash:</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          {lastTxHash.substring(0, 10)}...
                          <Copy 
                            className="w-3.5 h-3.5 text-neutral-400 hover:text-white cursor-pointer" 
                            onClick={() => handleCopy(lastTxHash, setCopiedTxHash)} 
                          />
                        </span>
                      </div>
                      {copiedTxHash && <div className="text-right text-[10px] text-emerald-400">Copiado al portapapeles</div>}
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setTransferStep('input');
                        setTransferAmount('');
                        setRecipientAddress('');
                        setTransferMemo('');
                      }}
                      className="bg-neutral-900 hover:bg-neutral-850 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer"
                    >
                      Enviar Otro Pago
                    </button>
                    <button
                      type="button"
                      onClick={() => setWalletTab('history')}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer"
                    >
                      Ver en Historial
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: RECEIVE TZC (QR CODE) */}
          {walletTab === 'receive' && (
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-red-500" />
                  Recibir Fondos con Código QR
                </h3>
                <p className="text-xs text-neutral-400">Comparte tu código QR o dirección pública para que otros usuarios o comercios te transfieran tokens TZC al instante.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* QR Display box */}
                <div className="md:col-span-5 flex flex-col items-center justify-center bg-white p-4 rounded-2xl border border-neutral-800 shadow-xl max-w-[200px] mx-auto space-y-2">
                  {/* Real-looking custom SVG QR Code */}
                  <svg className="w-36 h-36 text-neutral-950" viewBox="0 0 100 100">
                    {/* Outer frame */}
                    <rect x="0" y="0" width="25" height="25" fill="currentColor" />
                    <rect x="2" y="2" width="21" height="21" fill="white" />
                    <rect x="6" y="6" width="13" height="13" fill="currentColor" />
                    
                    <rect x="75" y="0" width="25" height="25" fill="currentColor" />
                    <rect x="77" y="2" width="21" height="21" fill="white" />
                    <rect x="81" y="6" width="13" height="13" fill="currentColor" />

                    <rect x="0" y="75" width="25" height="25" fill="currentColor" />
                    <rect x="2" y="77" width="21" height="21" fill="white" />
                    <rect x="6" y="81" width="13" height="13" fill="currentColor" />

                    {/* Random generated-like QR matrix dots */}
                    <rect x="35" y="5" width="10" height="5" fill="currentColor" />
                    <rect x="50" y="0" width="5" height="15" fill="currentColor" />
                    <rect x="60" y="10" width="10" height="5" fill="currentColor" />
                    
                    <rect x="30" y="30" width="15" height="10" fill="currentColor" />
                    <rect x="55" y="35" width="25" height="5" fill="currentColor" />
                    <rect x="40" y="50" width="5" height="15" fill="currentColor" />
                    <rect x="50" y="60" width="20" height="10" fill="currentColor" />
                    <rect x="30" y="70" width="10" height="25" fill="currentColor" />

                    <rect x="85" y="30" width="10" height="15" fill="currentColor" />
                    <rect x="80" y="55" width="15" height="10" fill="currentColor" />
                    
                    {/* Small inner logo block for TZC brand look */}
                    <rect x="42" y="42" width="16" height="16" fill="white" rx="3" />
                    <rect x="45" y="45" width="10" height="10" fill="#dc2626" rx="2" />
                  </svg>
                  
                  <span className="text-[10px] text-neutral-500 font-mono text-center font-bold">
                    {requestAmount ? `Monto: ${requestAmount} TZC` : '0x71C83a...db29'}
                  </span>
                </div>

                {/* Configure payment request */}
                <div className="md:col-span-7 space-y-4">
                  <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850 space-y-1.5">
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">Herramienta Opcional</span>
                    <span className="font-bold text-white text-xs block">¿Quieres solicitar una cantidad exacta?</span>
                    <p className="text-[11px] text-neutral-400">Establece un monto para codificarlo en el código QR. Quien lo escanee pagará la cantidad exacta.</p>
                    
                    <div className="relative mt-2">
                      <input
                        type="number"
                        placeholder="Cantidad solicitada ($TZC)"
                        value={requestAmount}
                        onChange={(e) => setRequestAmount(e.target.value)}
                        className="w-full bg-black border border-neutral-850 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600 font-mono"
                      />
                      {requestAmount && (
                        <button
                          type="button"
                          onClick={() => setRequestAmount('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-neutral-400 hover:text-white"
                        >
                          Limpiar
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-neutral-300 block">Tu dirección de cobro de TuZonaCripto:</span>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-neutral-900 border border-neutral-850 rounded-xl px-3 py-2.5 text-xs text-white font-mono flex items-center justify-between overflow-x-auto">
                        <span>0x71C83ab9d9a3b290df81e8b23f27de5fb270db29</span>
                      </div>
                      <button
                        onClick={() => handleCopy('0x71C83ab9d9a3b290df81e8b23f27de5fb270db29', setCopiedAddress)}
                        className="bg-neutral-900 hover:bg-neutral-850 border border-neutral-850 px-4 rounded-xl text-xs font-bold text-white transition flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedAddress ? '¡Copiado!' : 'Copiar'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-neutral-900/40 p-3 rounded-xl border border-neutral-850 flex items-start gap-2 text-[11px] text-neutral-400 leading-relaxed">
                    <Smartphone className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                    <span>
                      Esta dirección es compatible con cualquier billetera que soporte la red Polygon. Puedes recibir TZC de forma directa desde Trust Wallet, MetaMask, Rabby o Binance Web3 Wallet.
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SAVINGS VAULT (ACUMULAR & AHORRAR) */}
          {walletTab === 'vault' && (
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-6">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <PiggyBank className="w-5 h-5 text-amber-500" />
                    Bóveda Descentralizada de Ahorros TZC
                  </h3>
                  <p className="text-xs text-neutral-400">Protege tu capital de la inflación acumulando TZC y gana intereses en tiempo real.</p>
                </div>

                <div className="bg-amber-950/40 border border-amber-900/50 text-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 shrink-0">
                  <Percent className="w-3.5 h-3.5 animate-bounce" />
                  <span>8.50% APY Fijo</span>
                </div>
              </div>

              {/* Vault Metric cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Metric 1: Total locked */}
                <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850 space-y-1">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Total en Bóveda</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold font-mono text-white">${vaultBalance.toFixed(2)}</span>
                    <span className="text-xs text-amber-400 font-bold font-mono">TZC</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 block font-mono">Eq: ${(vaultBalance * 0.12).toFixed(2)} USD</span>
                </div>

                {/* Metric 2: Estimated yield per year */}
                <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850 space-y-1">
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Rendimiento Proyectado (Anual)</span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold font-mono text-emerald-400">+${(vaultBalance * 0.085).toFixed(2)}</span>
                    <span className="text-xs text-emerald-500 font-bold font-mono">TZC</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 block">Sujeto a interés compuesto</span>
                </div>

                {/* Metric 3: Live earned widget */}
                <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-850 space-y-1 relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-8 h-8 bg-neutral-850 rounded-bl-full flex items-center justify-center text-xs animate-spin-slow">⏳</div>
                  <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block">Intereses Acumulados</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold font-mono text-amber-400">{simulatedEarned.toFixed(6)}</span>
                    <span className="text-[10px] text-neutral-400 font-mono font-bold">TZC</span>
                  </div>
                  <span className="text-[9px] text-amber-500/80 font-bold block animate-pulse">✓ Generando en vivo...</span>
                </div>
              </div>

              {/* Deposit / Withdraw Action panel */}
              <div className="bg-neutral-900/40 p-5 rounded-2xl border border-neutral-850 space-y-4">
                
                {/* Selector Deposit / Withdraw */}
                <div className="flex bg-black p-1 rounded-xl border border-neutral-850">
                  <button
                    type="button"
                    onClick={() => { setVaultActionType('deposit'); setVaultInputAmount(''); }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      vaultActionType === 'deposit' 
                        ? 'bg-neutral-900 text-white border border-neutral-800' 
                        : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
                    <span>Ingresar a Bóveda</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setVaultActionType('withdraw'); setVaultInputAmount(''); }}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      vaultActionType === 'withdraw' 
                        ? 'bg-neutral-900 text-white border border-neutral-800' 
                        : 'text-neutral-500 hover:text-white'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-red-400" />
                    <span>Retirar de Bóveda</span>
                  </button>
                </div>

                <form onSubmit={handleVaultAction} className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline mb-1">
                      <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                        {vaultActionType === 'deposit' ? 'Monto a Ingresar ($TZC)' : 'Monto a Retirar ($TZC)'} *
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          if (vaultActionType === 'deposit') {
                            setVaultInputAmount(userTzcBalance.toString());
                          } else {
                            setVaultInputAmount(vaultBalance.toString());
                          }
                        }}
                        className="text-[10px] text-red-500 hover:text-red-400 font-bold"
                      >
                        {vaultActionType === 'deposit' 
                          ? `Disponible: ${userTzcBalance.toFixed(2)} TZC` 
                          : `En Bóveda: ${vaultBalance.toFixed(2)} TZC`}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        step="any"
                        required
                        placeholder="Monto"
                        value={vaultInputAmount}
                        onChange={(e) => setVaultInputAmount(e.target.value)}
                        className="w-full bg-black border border-neutral-850 rounded-xl pl-4 pr-16 py-3 text-sm text-white focus:outline-none focus:border-red-600 font-mono"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-xs text-neutral-500">
                        TZC
                      </span>
                    </div>
                  </div>

                  {/* Scheduled auto-savings trigger */}
                  {vaultActionType === 'deposit' && (
                    <div className="flex items-center justify-between p-3 bg-black border border-neutral-850 rounded-xl">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-white block">Ahorro Programado Activo</span>
                        <span className="text-[10px] text-neutral-400 block">Depositar automáticamente el 5% de todas tus recompensas académicas.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
                        className={`w-11 h-6 rounded-full p-1 transition-all ${autoSaveEnabled ? 'bg-red-600' : 'bg-neutral-850'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoSaveEnabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-amber-950/20"
                  >
                    <PiggyBank className="w-4 h-4" />
                    <span>
                      {vaultActionType === 'deposit' ? 'Abonar a mi Bóveda' : 'Retirar Fondos a Disponible'}
                    </span>
                  </button>
                </form>

              </div>

              {/* Informative block on staking */}
              <div className="bg-neutral-900/20 p-4 rounded-xl border border-neutral-900 flex items-start gap-3 text-xs leading-relaxed">
                <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold text-white block">¿Cómo se genera el rendimiento de la Bóveda?</span>
                  <p className="text-neutral-400 text-[11px]">
                    El rendimiento del 8.50% anual no proviene de sistemas inflacionarios. Es financiado en parte por el canon tecnológico que pagan los comercios afiliados (módulo <span className="text-red-500 font-bold">CriptoPlanes</span>) y por las tasas mínimas cobradas en los envíos de <span className="text-red-500 font-bold">CriptoGo</span> y transporte de <span className="text-red-500 font-bold">CriptoRides</span>, garantizando un ecosistema sustentable.
                  </p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: TRANSACTION HISTORY FILTER */}
          {walletTab === 'history' && (
            <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <History className="w-5 h-5 text-red-500" />
                  Registro de Transacciones en Blockchain (Polygon)
                </h3>
                <p className="text-xs text-neutral-400">Verifica todas las transacciones vinculadas a tu dirección del directorio de forma transparente.</p>
              </div>

              {/* Filters toolbar */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                {/* Search query input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar por dirección, hash, concepto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-850 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600"
                  />
                </div>
                
                {/* Selector */}
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="bg-neutral-900 border border-neutral-850 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
                >
                  <option value="all">Ver todos los tipos</option>
                  <option value="Transfer">Transferencias enviadas</option>
                  <option value="Reward">Recompensas recibidas</option>
                  <option value="Payment">Pagos de productos</option>
                  <option value="Staking">Módulo Staking</option>
                  <option value="Savings">Bóveda de Ahorro</option>
                </select>
              </div>

              {/* History list */}
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                {filteredTransactions.length === 0 ? (
                  <div className="p-8 text-center bg-neutral-900/20 border border-neutral-900 rounded-xl text-neutral-500 text-xs">
                    No se encontraron transacciones que coincidan con la búsqueda.
                  </div>
                ) : (
                  filteredTransactions.map((tx, idx) => {
                    const isDebit = tx.type === 'Payment' || tx.type === 'Transfer' || (tx.type === 'Savings' && tx.amount > 0);
                    return (
                      <div
                        key={tx.id || idx}
                        onClick={() => setSelectedTxDetail(tx)}
                        className="bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-850 p-3.5 rounded-xl flex items-center justify-between gap-4 transition cursor-pointer text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 font-bold ${
                            tx.type === 'Reward' 
                              ? 'bg-emerald-950/50 border border-emerald-900 text-emerald-400' 
                              : tx.type === 'Transfer'
                              ? 'bg-blue-950/50 border border-blue-900 text-blue-400'
                              : tx.type === 'Savings'
                              ? 'bg-amber-950/50 border border-amber-900 text-amber-400'
                              : 'bg-red-950/50 border border-red-900 text-red-400'
                          }`}>
                            {tx.type === 'Reward' && <Sparkles className="w-4 h-4" />}
                            {tx.type === 'Transfer' && <ArrowUpRight className="w-4 h-4" />}
                            {tx.type === 'Savings' && <PiggyBank className="w-4 h-4" />}
                            {tx.type === 'Payment' && <ArrowDownLeft className="w-4 h-4" />}
                            {tx.type === 'Staking' && <Coins className="w-4 h-4" />}
                            {tx.type === 'Credit' && <Wallet className="w-4 h-4" />}
                          </div>

                          <div className="space-y-0.5">
                            <span className="font-bold text-white block">{tx.destination}</span>
                            <div className="flex items-center gap-2 text-[10px] text-neutral-500">
                              <span className="bg-neutral-850 px-1.5 py-0.2 rounded font-bold uppercase">{tx.type}</span>
                              <span className="font-mono">{tx.hash}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right space-y-0.5">
                          <span className={`font-mono font-bold block ${isDebit ? 'text-red-500' : 'text-emerald-400'}`}>
                            {isDebit ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)} TZC
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">{tx.date}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

        </div>

      </div>

      {/* TRANSACTION RECEIPT MODAL SIMULATOR */}
      {selectedTxDetail && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" id="tx-modal-simulator">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl animate-scaleUp">
            
            {/* Header */}
            <div className="bg-neutral-900 p-4 border-b border-neutral-850 flex justify-between items-center">
              <span className="text-xs font-bold text-neutral-400 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                Firma Blockchain Certificada
              </span>
              <button
                type="button"
                onClick={() => setSelectedTxDetail(null)}
                className="text-neutral-500 hover:text-white font-bold text-sm bg-neutral-850 w-6 h-6 rounded-full flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Receipt Body */}
            <div className="p-6 space-y-6">
              
              {/* Receipt Logo and Status */}
              <div className="text-center space-y-1.5">
                <div className="w-12 h-12 bg-emerald-950/40 border border-emerald-900 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-base font-bold text-white">Transacción Exitosa</h4>
                <p className="text-[10px] text-neutral-400 uppercase font-mono">ID de bloque: #{Math.floor(18400000 + Math.random()*90000)}</p>
              </div>

              {/* Details table */}
              <div className="space-y-3 font-mono text-xs border-y border-neutral-900 py-4">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Origen:</span>
                  <span className="text-white">0x71C83a...B29 (Tú)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Destinatario:</span>
                  <span className="text-white truncate block max-w-[180px]" title={selectedTxDetail.destination}>{selectedTxDetail.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Tipo de Tx:</span>
                  <span className="text-neutral-300 font-bold uppercase">{selectedTxDetail.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Monto Neto:</span>
                  <span className="text-white font-bold">${Math.abs(selectedTxDetail.amount).toFixed(2)} TZC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Gas Gas/Fee:</span>
                  <span className="text-emerald-500">${selectedTxDetail.feeTzc.toFixed(2)} TZC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Fecha / Hora:</span>
                  <span className="text-neutral-300">{selectedTxDetail.date} 15:32:04</span>
                </div>
              </div>

              {/* Transaction Hash link simulation */}
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase block">Hash Transaccional (PolygonScan)</span>
                <div className="flex items-center justify-between p-2.5 bg-neutral-900 rounded-xl border border-neutral-850 text-[11px] font-mono text-neutral-400">
                  <span className="truncate flex-1 pr-3">{selectedTxDetail.hash}</span>
                  <a 
                    href={`https://polygonscan.com/tx/0x${selectedTxDetail.id}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-red-500 hover:text-red-400 flex items-center gap-0.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

            {/* Footer buttons */}
            <div className="bg-neutral-900 p-4 border-t border-neutral-850 flex gap-3">
              <button
                type="button"
                onClick={() => setSelectedTxDetail(null)}
                className="flex-1 bg-neutral-850 hover:bg-neutral-800 text-neutral-300 font-bold py-2.5 rounded-xl text-xs transition text-center"
              >
                Cerrar Recibo
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
