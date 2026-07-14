import React, { useState, useMemo, useEffect, useRef } from 'react';
import { INITIAL_MERCHANTS, CRYPTO_LIST } from '../data/merchants';
import { Merchant, Review } from '../types';
import { Search, MapPin, Star, ShieldCheck, Phone, Mail, Globe, ExternalLink, ArrowRight, StarHalf, PlusCircle, X } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface CriptoMapProps {
  onSelectPayment: (payment: { merchantId: string; merchantName: string; amountUsd: number; itemName: string }) => void;
  onSelectDelivery: (delivery: { merchantName: string; items: string[]; amountUsd: number }) => void;
  merchantsList: Merchant[];
  setMerchantsList: React.Dispatch<React.SetStateAction<Merchant[]>>;
}

export default function CriptoMap({
  onSelectPayment,
  onSelectDelivery,
  merchantsList,
  setMerchantsList
}: CriptoMapProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCrypto, setSelectedCrypto] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>('m1');
  const [showMobileDetail, setShowMobileDetail] = useState<boolean>(false);

  // Map Container & Instance Refs
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  // Filtered merchants
  const filteredMerchants = useMemo(() => {
    return merchantsList.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            m.subcategory.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
      const matchesCrypto = selectedCrypto === 'all' || m.acceptedCryptos.includes(selectedCrypto);
      const matchesRating = m.rating >= minRating;
      const matchesVerified = !onlyVerified || m.isVerified;

      return matchesSearch && matchesCategory && matchesCrypto && matchesRating && matchesVerified;
    });
  }, [merchantsList, searchQuery, selectedCategory, selectedCrypto, minRating, onlyVerified]);

  // Map limits based on merchant coordinates for stylized SVG bounds
  const mapCoordinates = useMemo(() => {
    return filteredMerchants.map(m => ({
      id: m.id,
      name: m.name,
      x: Math.max(5, Math.min(95, ((m.lng - (-66.920)) / ( -66.810 - (-66.920) )) * 100)),
      y: Math.max(5, Math.min(95, (1 - (m.lat - 10.450) / (10.510 - 10.450)) * 100)),
      category: m.category,
      logo: m.logo,
      isVerified: m.isVerified
    }));
  }, [filteredMerchants]);

  // Selected merchant
  const selectedMerchant = useMemo(() => {
    return merchantsList.find(m => m.id === selectedMerchantId) || merchantsList[0];
  }, [selectedMerchantId, merchantsList]);

  // Leaflet Map Initialization Effect
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Centered on Caracas valley
      const map = L.map(mapContainerRef.current, {
        center: [10.4850, -66.8650],
        zoom: 13,
        zoomControl: true,
      });

      // Free CartoDB Dark Matter tile layer matches the TuZonaCripto style
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
      markersLayerRef.current = L.layerGroup().addTo(map);

      // Force size recalculation to prevent display glitch in React tabs/Vite
      setTimeout(() => {
        map.invalidateSize();
      }, 350);
    }
  }, []);

  // Update Map Markers Effect
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();

    filteredMerchants.forEach((m) => {
      const isSelected = m.id === selectedMerchantId;
      
      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div class="relative flex items-center justify-center">
            ${isSelected ? '<span class="absolute -inset-3.5 rounded-full bg-red-600/30 animate-pulse"></span>' : ''}
            <div class="w-8.5 h-8.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 shadow-lg ${
              isSelected 
                ? 'bg-neutral-900 border-red-500 scale-120 shadow-red-950/40 z-50' 
                : 'bg-neutral-950 border-neutral-800 hover:border-neutral-600'
            }">
              <span class="text-sm select-none">${m.logo}</span>
            </div>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker([m.lat, m.lng], { icon: customIcon });

      marker.on('click', () => {
        setSelectedMerchantId(m.id);
        setShowMobileDetail(true);
      });

      marker.bindTooltip(
        `<div class="text-left font-sans text-xs">
          <p class="font-bold text-white">${m.name}</p>
          <p class="text-[10px] text-neutral-400 font-semibold">${m.subcategory}</p>
          <div class="flex items-center gap-1 mt-1 text-[9px] text-amber-500 font-bold">
            <span>⭐ ${m.rating}</span>
            <span class="text-neutral-500">•</span>
            <span class="text-neutral-300 font-mono">${m.acceptedCryptos.join(', ')}</span>
          </div>
         </div>`,
        {
          permanent: false,
          direction: 'top',
          opacity: 0.95,
          offset: [0, -10]
        }
      );

      marker.addTo(markersLayer);
    });

    // If there's a search, auto-adjust bounds to encompass results
    if (filteredMerchants.length > 0 && searchQuery) {
      const bounds = L.latLngBounds(filteredMerchants.map(m => [m.lat, m.lng]));
      map.fitBounds(bounds.pad(0.15));
    }
  }, [filteredMerchants, selectedMerchantId]);

  // Center/Pan Map on selected merchant
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !selectedMerchant) return;

    map.setView([selectedMerchant.lat, selectedMerchant.lng], 14, {
      animate: true,
      duration: 1.2
    });
  }, [selectedMerchantId, selectedMerchant]);

  // Map Cleanup Effect
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);



  // Handle review submit
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) {
      alert('Por favor, rellene todos los campos.');
      return;
    }

    const newReview: Review = {
      id: Math.random().toString(36).substring(7),
      author: reviewAuthor,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      transactionHash: '0x' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    };

    // Calculate new average rating
    const updatedMerchants = merchantsList.map(m => {
      if (m.id === selectedMerchantId) {
        const allReviews = [newReview, ...m.reviews];
        const avgRating = parseFloat((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length).toFixed(1));
        return {
          ...m,
          reviews: allReviews,
          rating: avgRating
        };
      }
      return m;
    });

    setMerchantsList(updatedMerchants);
    setReviewAuthor('');
    setReviewComment('');
    setReviewRating(5);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'gastronomy': return 'bg-amber-600';
      case 'technology': return 'bg-cyan-600';
      case 'retail': return 'bg-emerald-600';
      case 'health': return 'bg-rose-600';
      case 'services': return 'bg-violet-600';
      case 'education': return 'bg-indigo-600';
      case 'travel': return 'bg-red-600';
      default: return 'bg-neutral-600';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'gastronomy': return 'Gastronomía';
      case 'technology': return 'Tecnología';
      case 'retail': return 'Comercio / Retail';
      case 'health': return 'Salud & Bienestar';
      case 'services': return 'Servicios Profesionales';
      case 'education': return 'Educación';
      case 'travel': return 'Turismo & Hospedaje';
      default: return cat;
    }
  };

  // Render the detailed merchant information card
  const renderMerchantDetails = (isMobile: boolean = false) => {
    if (!selectedMerchant) {
      return (
        <div className="bg-neutral-950 p-8 rounded-xl border border-neutral-800 text-center flex flex-col items-center justify-center h-full">
          <MapPin className="w-12 h-12 text-neutral-700 mb-2" />
          <p className="text-neutral-500 text-sm">Selecciona un comercio de la lista o mapa para ver los detalles.</p>
        </div>
      );
    }

    return (
      <div className={`bg-neutral-950 rounded-xl overflow-hidden flex flex-col justify-between h-full ${isMobile ? 'border-none' : 'border border-neutral-800'}`}>
        {/* Banner and basic info */}
        <div>
          <div className="h-28 relative overflow-hidden bg-neutral-900">
            <img
              src={selectedMerchant.bannerImage}
              alt={selectedMerchant.name}
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent"></div>
            <span className={`absolute top-3 left-3 text-[10px] font-bold text-white px-2 py-0.5 rounded-md shadow ${getCategoryColor(selectedMerchant.category)}`}>
              {getCategoryLabel(selectedMerchant.category)}
            </span>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex items-start justify-between gap-3 -mt-10 relative z-10">
              <div className="w-14 h-14 bg-neutral-900 border-2 border-neutral-800 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                {selectedMerchant.logo}
              </div>
              <div className="flex items-center gap-1.5 bg-neutral-950/95 border border-neutral-800 px-2 py-1 rounded-lg text-amber-500 font-bold text-xs mt-6">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{selectedMerchant.rating}</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                {selectedMerchant.name}
                {selectedMerchant.isVerified && (
                  <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 text-[9px] px-1.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3 h-3 fill-emerald-400/10" />
                    Verificado
                  </span>
                )}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 text-left">{selectedMerchant.description}</p>
            </div>

            {/* Contact detail block */}
            <div className="bg-neutral-900/60 p-3 rounded-lg border border-neutral-900 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="text-neutral-200 text-left">{selectedMerchant.address}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-mono text-neutral-200">{selectedMerchant.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span className="font-mono text-neutral-200">{selectedMerchant.email}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Globe className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <a href={`https://${selectedMerchant.website}`} target="_blank" rel="noreferrer" className="text-neutral-200 hover:text-red-500 flex items-center gap-1 font-mono">
                  {selectedMerchant.website}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Marketplace: Featured Products */}
            {selectedMerchant.featuredProducts && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wide text-left">Productos del Comercio</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedMerchant.featuredProducts.map((product, idx) => (
                    <div key={idx} className="bg-neutral-900 p-2.5 rounded-lg border border-neutral-800 text-center flex flex-col justify-between">
                      <div>
                        <span className="text-2xl block mb-1">{product.image}</span>
                        <h5 className="text-[11px] font-bold text-white line-clamp-1">{product.name}</h5>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs font-mono font-bold text-neutral-200 block">${product.priceUsd.toFixed(2)} USD</span>
                        <button
                          onClick={() => {
                            if (isMobile) {
                              setShowMobileDetail(false);
                            }
                            onSelectPayment({
                              merchantId: selectedMerchant.id,
                              merchantName: selectedMerchant.name,
                              amountUsd: product.priceUsd,
                              itemName: product.name
                            });
                          }}
                          className="w-full mt-1.5 bg-red-600 hover:bg-red-700 text-white text-[9px] font-bold py-1.5 rounded transition cursor-pointer flex items-center justify-center gap-1"
                        >
                          Pagar Cripto
                          <ArrowRight className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews section */}
            <div className="border-t border-neutral-900 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wide text-left">Valoraciones de la Comunidad</h4>

              {/* Add Review Form */}
              <form onSubmit={handleAddReview} className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 space-y-3">
                <p className="text-[10px] text-red-500 font-semibold uppercase text-left">Escribir una Valoración</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Tu Nombre"
                    value={reviewAuthor}
                    onChange={(e) => setReviewAuthor(e.target.value)}
                    required
                    className="bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600"
                  />
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(parseInt(e.target.value))}
                    className="bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5/5)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5)</option>
                    <option value="3">⭐⭐⭐ (3/5)</option>
                    <option value="2">⭐⭐ (2/5)</option>
                    <option value="1">⭐ (1/5)</option>
                  </select>
                </div>
                <textarea
                  placeholder="Tu opinión sincera acerca de este comercio..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                  rows={2}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-red-600 resize-none text-left"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 rounded text-xs transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Publicar Valoración On-Chain
                </button>
              </form>

              {/* Review List */}
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedMerchant.reviews.length === 0 ? (
                  <p className="text-[10px] text-neutral-500 text-center py-2">No hay valoraciones escritas todavía.</p>
                ) : (
                  selectedMerchant.reviews.map((rev) => (
                    <div key={rev.id} className="bg-neutral-900/40 p-3 rounded-lg border border-neutral-900 space-y-1.5 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{rev.author}</span>
                        <div className="flex items-center gap-1 text-amber-500 text-[10px]">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                          ))}
                          <span className="font-mono font-bold text-neutral-400 ml-1">{rev.date}</span>
                        </div>
                      </div>
                      <p className="text-xs text-neutral-300">{rev.comment}</p>
                      {rev.verifiedPurchase && (
                        <div className="flex items-center gap-1.5 pt-1.5 border-t border-neutral-900 text-[9px] text-emerald-400 font-mono">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>Compra verificada on-chain</span>
                          {rev.transactionHash && (
                            <span className="text-neutral-500">({rev.transactionHash})</span>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Direct quick action buttons */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex gap-2">
          <button
            onClick={() => {
              if (isMobile) {
                setShowMobileDetail(false);
              }
              onSelectDelivery({
                merchantName: selectedMerchant.name,
                items: selectedMerchant.featuredProducts ? [selectedMerchant.featuredProducts[0].name] : ['Pedido General'],
                amountUsd: selectedMerchant.featuredProducts ? selectedMerchant.featuredProducts[0].priceUsd : 10.00
              });
            }}
            className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-semibold py-2 rounded-lg transition cursor-pointer text-xs"
          >
            Pedir Delivery con CriptoGo
          </button>
          <button
            onClick={() => {
              if (isMobile) {
                setShowMobileDetail(false);
              }
              onSelectPayment({
                merchantId: selectedMerchant.id,
                merchantName: selectedMerchant.name,
                amountUsd: 15.00,
                itemName: 'Pago Libre / Consumo en Local'
              });
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition cursor-pointer text-xs flex items-center justify-center gap-1"
          >
            Hacer Pago con CriptoPay
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6" id="criptomap_module">
      {/* Header filter options */}
      <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block"></span>
              CriptoMap: Directorio Inteligente
            </h2>
            <p className="text-xs text-neutral-400">
              Encuentra y filtra comercios verificados con geolocalización avanzada que aceptan activos digitales.
            </p>
          </div>
          {/* Quick Stats */}
          <div className="flex items-center gap-3">
            <div className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-center">
              <p className="text-[10px] text-neutral-400 font-medium">Registrados</p>
              <p className="text-sm font-bold text-white font-mono">{merchantsList.length}</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-center">
              <p className="text-[10px] text-neutral-400 font-medium">Filtrados</p>
              <p className="text-sm font-bold text-red-500 font-mono">{filteredMerchants.length}</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-center">
              <p className="text-[10px] text-neutral-400 font-medium">Verificados</p>
              <p className="text-sm font-bold text-emerald-500 font-mono">
                {merchantsList.filter(m => m.isVerified).length}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Quick filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2">
          {/* Search bar */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nombre, categoría o producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
            />
          </div>

          {/* Category selection */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
            >
              <option value="all">Todas las Categorías</option>
              <option value="gastronomy">Gastronomía</option>
              <option value="technology">Tecnología</option>
              <option value="retail">Comercio / Retail</option>
              <option value="health">Salud & Bienestar</option>
              <option value="services">Servicios Profesionales</option>
              <option value="education">Educación</option>
              <option value="travel">Turismo, Hoteles & Viajes</option>
            </select>
          </div>

          {/* Crypto accepted selection */}
          <div className="md:col-span-2">
            <select
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-300 focus:outline-none focus:border-red-600"
            >
              <option value="all">Todas las Cripto</option>
              {Object.keys(CRYPTO_LIST).map(key => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>

          {/* Rating filter */}
          <div className="md:col-span-2 flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2">
            <span className="text-[10px] text-neutral-400 font-semibold uppercase whitespace-nowrap">Rating:</span>
            <input
              type="range"
              min="0"
              max="4.8"
              step="0.5"
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full accent-red-600"
            />
            <span className="text-xs font-bold text-white font-mono">{minRating}+</span>
          </div>

          {/* Verified toggle */}
          <div className="md:col-span-1 flex items-center justify-center">
            <button
              onClick={() => setOnlyVerified(!onlyVerified)}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                onlyVerified
                  ? 'bg-emerald-950/20 border-emerald-600 text-emerald-400'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verificados
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column: List of filtered merchants */}
        <div className="lg:col-span-4 space-y-3 max-h-[640px] overflow-y-auto pr-2">
          <p className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-1">
            Comercios Encontrados ({filteredMerchants.length})
          </p>

          {filteredMerchants.length === 0 ? (
            <div className="bg-neutral-950 border border-neutral-800 p-8 rounded-xl text-center space-y-2">
              <p className="text-neutral-500 text-sm">No se encontraron comercios que coincidan con los filtros.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedCrypto('all');
                  setMinRating(0);
                  setOnlyVerified(false);
                }}
                className="text-xs text-red-500 font-bold hover:underline"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            filteredMerchants.map((merchant) => {
              const isSelected = merchant.id === selectedMerchantId;
              return (
                <div
                  key={merchant.id}
                  onClick={() => {
                    setSelectedMerchantId(merchant.id);
                    setShowMobileDetail(true);
                  }}
                  className={`p-4 rounded-xl border transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-neutral-900 border-red-600/60 shadow-lg shadow-red-950/10'
                      : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{merchant.logo}</span>
                      <div>
                        <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                          {merchant.name}
                          {merchant.isVerified && (
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 inline fill-emerald-500/10" title="Verificado por IA" />
                          )}
                        </h4>
                        <span className="text-[10px] text-neutral-400 font-semibold">{merchant.subcategory}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-neutral-900 px-1.5 py-0.5 rounded text-amber-500 font-bold text-xs">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{merchant.rating}</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 mt-2.5 line-clamp-2">
                    {merchant.description}
                  </p>

                  <div className="mt-3.5 pt-3 border-t border-neutral-900 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-neutral-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-500" />
                      {merchant.address.split(',')[1] || merchant.address}
                    </span>
                    <div className="flex items-center gap-1">
                      {merchant.acceptedCryptos.map(crypto => (
                        <span key={crypto} className="text-[9px] bg-neutral-900 text-neutral-300 font-mono font-bold px-1.5 py-0.5 rounded border border-neutral-800">
                          {crypto}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Center/Right column: Interactive Vector Map + Merchant detailed page */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Detailed Merchant Information Page (Placed in the center) */}
          <div className="md:col-span-6 space-y-4">
            {renderMerchantDetails(false)}
          </div>

          {/* Stylized Vector Map (Real Leaflet Integration) (Placed on the right) */}
          <div className="md:col-span-6 bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex flex-col justify-between h-[360px] md:h-auto min-h-[380px]">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2.5">
              <div>
                <h3 className="text-white text-xs font-bold uppercase tracking-wide">Mapa Satelital Interactivo</h3>
                <p className="text-[10px] text-neutral-500">Región Metropolitana de Caracas</p>
              </div>
              <span className="text-[9px] bg-emerald-900/30 text-emerald-400 border border-emerald-900/40 px-2 py-0.5 rounded-full font-mono">
                OpenStreetMap Libre
              </span>
            </div>

            {/* Real leaflet map container */}
            <div 
              ref={mapContainerRef} 
              className="relative flex-1 my-3 bg-neutral-950 rounded-lg overflow-hidden border border-neutral-900/80 min-h-[250px] z-10"
            />

            <div className="text-[9px] text-neutral-500 flex items-center justify-between border-t border-neutral-900 pt-2.5">
              <span>Navega, haz zoom o haz clic en los pines para ver perfiles</span>
              <span className="font-mono text-[8px]">OSM & CartoDB Dark Matter</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Details Modal Overlay */}
      {showMobileDetail && selectedMerchant && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4 lg:hidden">
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-neutral-950/90 backdrop-blur-sm z-30 p-4 border-b border-neutral-900 flex justify-between items-center">
              <h3 className="font-bold text-white text-sm">Detalles del Comercio</h3>
              <button 
                onClick={() => setShowMobileDetail(false)}
                className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white p-1.5 rounded-full cursor-pointer transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-1">
              {renderMerchantDetails(true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
