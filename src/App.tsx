import React, { useState } from 'react';
import { Merchant, Transaction, DeliveryItem } from './types';
import { INITIAL_MERCHANTS } from './data/merchants';

// Import our custom modules
import CriptoMap from './components/CriptoMap';
import CriptoFlow from './components/CriptoFlow';
import CriptoPay from './components/CriptoPay';
import CriptoRides from './components/CriptoRides';
import CriptoGo from './components/CriptoGo';
import CriptoLab from './components/CriptoLab';
import CriptoSafe from './components/CriptoSafe';
import Tokenomics from './components/Tokenomics';
import AboutProject from './components/AboutProject';
import CryptoTicker from './components/CryptoTicker';

// Import icons
import {
  MapPin,
  CreditCard,
  Car,
  Truck,
  GraduationCap,
  Shield,
  Coins,
  Compass,
  Wallet,
  Bell,
  Menu,
  X,
  Plus,
  Instagram,
  Facebook,
  MessageCircle,
  Music
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'flow' | 'pay' | 'rides' | 'go' | 'lab' | 'safe' | 'tokenomics' | 'about'>('map');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Core Global Reactive State
  const [userTzcBalance, setUserTzcBalance] = useState<number>(350.00); // Starter balance in $TZC tokens
  const [prefilledPayment, setPrefilledPayment] = useState<{
    merchantId: string;
    merchantName: string;
    amountUsd: number;
    itemName: string;
  } | null>(null);

  const [deliveryItem, setDeliveryItem] = useState<DeliveryItem | null>(null);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-0',
      hash: '0x2f91b7d...6f92c',
      type: 'Reward',
      amount: 50,
      token: 'TZC',
      destination: 'Bono de Registro Académico',
      status: 'Success',
      date: '2026-07-13',
      feeTzc: 0
    }
  ]);

  const [merchantsList, setMerchantsList] = useState<Merchant[]>(INITIAL_MERCHANTS);

  // State modification helper actions
  const addUserTzc = (amount: number) => {
    setUserTzcBalance(prev => Math.max(0, prev + amount));
  };

  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  // Triggered when clicking "Pagar" on any merchant item
  const handleSelectPayment = (payment: { merchantId: string; merchantName: string; amountUsd: number; itemName: string }) => {
    setPrefilledPayment(payment);
    setActiveTab('pay');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Triggered when ordering a physical product in directory
  const handleSelectDelivery = (delivery: { merchantName: string; items: string[]; amountUsd: number }) => {
    const newDelivery: DeliveryItem = {
      id: 'DEL-' + Math.floor(1000 + Math.random() * 9000),
      merchantName: delivery.merchantName,
      items: delivery.items,
      totalUsd: delivery.amountUsd,
      status: 'preparando',
      address: 'Avenida Francisco de Miranda, Altamira, Caracas, Venezuela',
      estimateMin: 15
    };
    setDeliveryItem(newDelivery);
    setActiveTab('go');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const menuItems = [
    { id: 'map', label: 'CriptoMap (Directorio)', icon: <MapPin className="w-4 h-4" /> },
    { id: 'flow', label: 'CriptoFlow (Créditos)', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'pay', label: 'CriptoPay (Pasarela)', icon: <Coins className="w-4 h-4" /> },
    { id: 'rides', label: 'CriptoRides (Movilidad)', icon: <Car className="w-4 h-4" /> },
    { id: 'go', label: 'CriptoGo (Envíos)', icon: <Truck className="w-4 h-4" /> },
    { id: 'lab', label: 'CriptoLab (Academia)', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'safe', label: 'CriptoSafe & LA/FT', icon: <Shield className="w-4 h-4" /> },
    { id: 'tokenomics', label: 'Tokenomics & Staking', icon: <Coins className="w-4 h-4 text-red-500" /> },
    { id: 'about', label: 'Nosotros & Finanzas', icon: <Compass className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-red-600 selection:text-white flex flex-col">
      
      {/* Real-time Crypto Price Ticker */}
      <CryptoTicker />
      
      {/* Top sticky Navigation Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-900 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-5 shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Brand Logo design: Red shield badge */}
            <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-red-950/40 shrink-0">
              TZC
            </div>
            <div>
              <h1 className="text-white font-bold text-sm md:text-base tracking-tight flex items-center gap-1.5">
                TuZonaCripto
                <span className="text-[9px] md:text-[10px] bg-red-950 text-red-500 border border-red-900/30 px-1.5 py-0.5 rounded font-mono shrink-0">
                  BETA v1.2
                </span>
              </h1>
              <p className="text-[9px] md:text-[10px] text-neutral-500 font-medium whitespace-nowrap">Directorio Inteligente & Economía Real</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-2.5 md:gap-3.5 border-l border-neutral-900 pl-3 md:pl-5 py-1">
            <a
              href="https://instagram.com/tuzonacripto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition duration-200"
              title="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com/tuzonacripto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition duration-200"
              title="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com/@tuzonacripto"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-white transition duration-200 flex items-center gap-1"
              title="TikTok"
            >
              <Music className="w-4 h-4 text-neutral-500" />
              <span className="text-[9px] font-bold text-neutral-500 hover:text-white hidden lg:inline">TikTok</span>
            </a>
            <a
              href="https://wa.me/584121516082" // Provide a real or professional WhatsApp contact link based on TuZonaCripto
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white border border-emerald-900/40 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all duration-200 flex items-center gap-1.5 shrink-0 ml-1"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-500/10" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Global Web3 wallet and tokens widget */}
        <div className="hidden md:flex items-center gap-4">
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-1.5 text-right">
            <span className="text-[9px] text-neutral-500 block font-bold uppercase tracking-wider">Tu Wallet no-custodial</span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-white">0x7Fa8B50...9dF</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-1.5 text-right flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-950/40 border border-red-900/30 flex items-center justify-center text-red-500 text-sm">
              🛡️
            </div>
            <div>
              <span className="text-[9px] text-neutral-500 block font-bold uppercase tracking-wider">Balance $TZC</span>
              <span className="text-sm font-mono font-black text-white">{userTzcBalance.toFixed(2)} TZC</span>
            </div>
          </div>
        </div>

        {/* Mobile menu and wallet widget */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1 text-center">
            <span className="text-[8px] text-neutral-500 block font-bold">TZC Balance</span>
            <span className="text-xs font-mono font-black text-white">{userTzcBalance.toFixed(0)}</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-neutral-400 hover:text-white bg-neutral-900 rounded-lg border border-neutral-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Body container */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Navigation Sidebar (Desktop) */}
        <aside className="hidden lg:block w-64 bg-black border-r border-neutral-900 p-5 space-y-6">
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-3 mb-2">Módulos del Ecosistema</p>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      if (item.id === 'pay' && !prefilledPayment) {
                        setPrefilledPayment(null);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition cursor-pointer ${
                      isActive
                        ? 'bg-neutral-900 text-white border-l-2 border-red-600'
                        : 'text-neutral-400 hover:text-white hover:bg-neutral-900/40'
                    }`}
                  >
                    <span className={isActive ? 'text-red-500' : 'text-neutral-500'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick legal disclaimer */}
          <div className="bg-neutral-900/40 p-4 rounded-xl border border-neutral-900 text-[10px] text-neutral-500 leading-relaxed">
            <p className="font-semibold text-neutral-400">Adoptado en América Latina</p>
            <p className="mt-1">Incentivando la inclusión financiera digital de forma compliance y descentralizada.</p>
          </div>
        </aside>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-neutral-950 border-b border-neutral-900 p-4 space-y-2 z-40">
            <nav className="grid grid-cols-1 gap-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setMobileMenuOpen(false);
                      if (item.id === 'pay' && !prefilledPayment) {
                        setPrefilledPayment(null);
                      }
                    }}
                    className={`flex items-center gap-3 p-2.5 rounded-lg text-xs font-semibold text-left transition ${
                      isActive ? 'bg-neutral-900 text-white' : 'text-neutral-400'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}

        {/* Central Content Canvas */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {activeTab === 'map' && (
            <CriptoMap
              onSelectPayment={handleSelectPayment}
              onSelectDelivery={handleSelectDelivery}
              merchantsList={merchantsList}
              setMerchantsList={setMerchantsList}
            />
          )}

          {activeTab === 'flow' && (
            <CriptoFlow />
          )}

          {activeTab === 'pay' && (
            <CriptoPay
              prefilledPayment={prefilledPayment}
              onPaymentSuccess={(hash) => {
                setPrefilledPayment(null);
                alert(`Pago exitoso registrado. Hash de Tx: ${hash}`);
              }}
              userTzcBalance={userTzcBalance}
              addUserTzc={addUserTzc}
              addTransaction={addTransaction}
              transactions={transactions}
            />
          )}

          {activeTab === 'rides' && (
            <CriptoRides
              onSelectPayment={handleSelectPayment}
              userTzcBalance={userTzcBalance}
            />
          )}

          {activeTab === 'go' && (
            <CriptoGo
              deliveryItem={deliveryItem}
              onClearDelivery={() => setDeliveryItem(null)}
            />
          )}

          {activeTab === 'lab' && (
            <CriptoLab
              onEarnTzc={addUserTzc}
              userTzcBalance={userTzcBalance}
            />
          )}

          {activeTab === 'safe' && (
            <CriptoSafe
              userTzcBalance={userTzcBalance}
              addUserTzc={addUserTzc}
            />
          )}

          {activeTab === 'tokenomics' && (
            <Tokenomics
              userTzcBalance={userTzcBalance}
              addUserTzc={addUserTzc}
            />
          )}

          {activeTab === 'about' && (
            <AboutProject />
          )}
        </main>
      </div>

      {/* Footer bar */}
      <footer className="bg-black border-t border-neutral-900 py-4 px-6 text-center text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 TuZonaCripto. Desarrollado por Darwin Giraud & Carolina Sibulo.</p>
          <div className="flex gap-4 font-mono text-[10px]">
            <span>tuzonacripto@gmail.com</span>
            <span>Tel: 04123268864</span>
            <span className="text-red-600">Polygon Mainnet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
