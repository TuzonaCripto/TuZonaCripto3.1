import { Merchant } from '../types';

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'm1',
    name: 'Café Grano Digital',
    category: 'gastronomy',
    subcategory: 'Cafetería & Pastelería',
    rating: 4.8,
    description: 'Café de especialidad, postres artesanales y espacio de coworking adaptado para la comunidad cripto. Descuento exclusivo del 10% pagando con token $TZC.',
    lat: 10.4806,
    lng: -66.9036, // Caracas, El Rosal
    logo: '☕',
    address: 'Av. Francisco de Miranda, Edif. Galipán, El Rosal, Caracas',
    acceptedCryptos: ['BTC', 'USDT', 'TZC'],
    isVerified: true,
    phone: '+58 212-951-4040',
    email: 'contacto@granodigital.com',
    website: 'granodigital.com',
    bannerImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Espresso Doble + Croissant', priceUsd: 4.50, image: '🥐' },
      { name: 'Torta de Chocolate de la Casa', priceUsd: 5.00, image: '🍰' },
      { name: 'Pase Coworking Diario', priceUsd: 15.00, image: '💻' }
    ],
    reviews: [
      {
        id: 'r1_1',
        author: 'Darwin Giraud',
        rating: 5,
        comment: 'Excelente café y la transacción en TZC tardó menos de 3 segundos con CriptoPay. Recomendado.',
        date: '2026-07-10',
        verifiedPurchase: true,
        transactionHash: '0x3f5b...d72e'
      },
      {
        id: 'r1_2',
        author: 'María Delgado',
        rating: 4,
        comment: 'Buen ambiente para trabajar. Pagué con USDT en red Polygon sin comisiones altas.',
        date: '2026-07-08',
        verifiedPurchase: true,
        transactionHash: '0x91fa...e201'
      }
    ]
  },
  {
    id: 'm2',
    name: 'TecnoZone Caracas',
    category: 'technology',
    subcategory: 'Tienda de Electrónica & Computación',
    rating: 4.9,
    description: 'Hardware, laptops, tarjetas de video y wallets frías (Ledger, Trezor). Servicio técnico calificado para mineros y servidores.',
    lat: 10.4851,
    lng: -66.8624, // Caracas, Chacao
    logo: '💻',
    address: 'C.C. Sambil, Nivel Acuario, Local Chacao, Caracas',
    acceptedCryptos: ['BTC', 'ETH', 'USDT', 'USDC', 'TZC'],
    isVerified: true,
    phone: '+58 412-123-4567',
    email: 'ventas@tecnozone.ve',
    website: 'tecnozone.ve',
    bannerImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Ledger Nano X - TZC Special Edition', priceUsd: 149.00, image: '🛡️' },
      { name: 'Monitor Gamer 27" IPS 144Hz', priceUsd: 250.00, image: '🖥️' },
      { name: 'Tarjeta RTX 4070 Ti', priceUsd: 890.00, image: '⚡' }
    ],
    reviews: [
      {
        id: 'r2_1',
        author: 'Carolina Sibulo',
        rating: 5,
        comment: 'Compré una Ledger Nano. Verificación KYC ultrarrápida y pago directo sin custodios.',
        date: '2026-07-11',
        verifiedPurchase: true,
        transactionHash: '0xa72d...99b1'
      }
    ]
  },
  {
    id: 'm3',
    name: 'Supermercado CriptoExpress',
    category: 'retail',
    subcategory: 'Víveres, Alimentos & Delicateses',
    rating: 4.6,
    description: 'Tu compra diaria de víveres, charcutería y verduras frescas directo con criptomonedas. Integrado con delivery express vía CriptoGo.',
    lat: 10.4721,
    lng: -66.9115, // Caracas, Plaza Venezuela
    logo: '🛒',
    address: 'Av. Casanova, diagonal al C.C. El Recreo, Sabana Grande, Caracas',
    acceptedCryptos: ['USDT', 'USDC', 'TZC'],
    isVerified: true,
    phone: '+58 212-762-1122',
    email: 'contacto@criptoexpress.com',
    website: 'criptoexpress.com',
    bannerImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Combo Parrillero Familiar', priceUsd: 35.00, image: '🥩' },
      { name: 'Cesta Básica Familiar Alimentaria', priceUsd: 45.00, image: '📦' },
      { name: 'Aceite de Oliva Extra Virgen 1L', priceUsd: 8.50, image: '🫒' }
    ],
    reviews: [
      {
        id: 'r3_1',
        author: 'José Rondón',
        rating: 4,
        comment: 'Gran variedad de productos. El pago con CriptoPay fue directo, el delivery llegó en 20 minutos con CriptoGo.',
        date: '2026-07-12',
        verifiedPurchase: true,
        transactionHash: '0x8d51...44a7'
      }
    ]
  },
  {
    id: 'm4',
    name: 'Clínica Dental OdontoCripto',
    category: 'health',
    subcategory: 'Odontología Integral & Estética',
    rating: 4.7,
    description: 'Tratamientos odontológicos, ortodoncia, implantes y diseño de sonrisa. Ofrecemos planes de financiamiento con CriptoFlow a tasas inmejorables.',
    lat: 10.4901,
    lng: -66.8201, // Caracas, Las Mercedes
    logo: '🦷',
    address: 'Av. Principal de Las Mercedes, Torre Las Mercedes, Piso 4, Caracas',
    acceptedCryptos: ['BTC', 'USDT', 'TZC'],
    isVerified: true,
    phone: '+58 212-993-8822',
    email: 'info@odontocripto.ve',
    website: 'odontocripto.ve',
    bannerImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Limpieza Dental Ultrasónica + Diagnóstico', priceUsd: 25.00, image: '✨' },
      { name: 'Blanqueamiento Dental LED', priceUsd: 120.00, image: '🦷' },
      { name: 'Tratamiento de Caries por Unidad', priceUsd: 30.00, image: '🛠️' }
    ],
    reviews: [
      {
        id: 'r4_1',
        author: 'Valeria S.',
        rating: 5,
        comment: 'Excelente atención. Solicité crédito en CriptoFlow para mi tratamiento de ortodoncia y el score me recomendó al instante.',
        date: '2026-07-05',
        verifiedPurchase: true,
        transactionHash: '0x1c3a...0b2e'
      }
    ]
  },
  {
    id: 'm5',
    name: 'Bufete Jurídico Blockchain & Cía',
    category: 'services',
    subcategory: 'Asesoría Legal, Contratos & Impuestos',
    rating: 4.9,
    description: 'Expertos en regulación cripto, redacción de contratos inteligentes, constitución de empresas Web3, políticas LA/FT y auditoría de proyectos.',
    lat: 10.4988,
    lng: -66.8402, // Caracas, Altamira
    logo: '⚖️',
    address: 'Torre Altamira, Piso 10, Oficina 102, Altamira, Caracas',
    acceptedCryptos: ['BTC', 'ETH', 'USDT', 'USDC'],
    isVerified: true,
    phone: '+58 212-263-5599',
    email: 'legal@bufeteblockchain.com',
    website: 'bufeteblockchain.com',
    bannerImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Asesoría Inicial Regulatoria (1 Hora)', priceUsd: 100.00, image: '⏱️' },
      { name: 'Auditoría Legal de Token / Whitepaper', priceUsd: 500.00, image: '📝' },
      { name: 'Constitución de Compañía Nacional', priceUsd: 350.00, image: '🏢' }
    ],
    reviews: [
      {
        id: 'r5_1',
        author: 'Roberto Medina',
        rating: 5,
        comment: 'Súper profesionales. Me ayudaron a constituir mi SAS con objeto social adaptado a Web3.',
        date: '2026-06-28',
        verifiedPurchase: false
      }
    ]
  },
  {
    id: 'm6',
    name: 'Instituto Tech Web3 Academy',
    category: 'education',
    subcategory: 'Cursos, Postgrados & Diplomados',
    rating: 4.5,
    description: 'Aprende programación Solidity, Rust, finanzas descentralizadas y tokenomics de la mano de expertos del sector. Certificados en NFT.',
    lat: 10.4552,
    lng: -66.8901, // Caracas, Santa Mónica
    logo: '🎓',
    address: 'Av. Teresa de la Parra, Edif. Minerva, Santa Mónica, Caracas',
    acceptedCryptos: ['BTC', 'ETH', 'TZC'],
    isVerified: true,
    phone: '+58 424-999-8877',
    email: 'admisiones@web3academy.org',
    website: 'web3academy.org',
    bannerImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Curso Solidity Developer (Básico-Avanzado)', priceUsd: 199.00, image: '📜' },
      { name: 'Bootcamp Web3 Frontend con React & Ethers', priceUsd: 299.00, image: '🎓' },
      { name: 'Clase Magistral de Tokenomics Avanzados', priceUsd: 50.00, image: '📊' }
    ],
    reviews: [
      {
        id: 'r6_1',
        author: 'Marcos Toro',
        rating: 4,
        comment: 'Muy buena metodología. El proyecto final se subió a testnet Sepolia y nos dieron certificado NFT.',
        date: '2026-07-02',
        verifiedPurchase: true,
        transactionHash: '0x17fe...e491'
      }
    ]
  },
  {
    id: 'm7',
    name: 'Hotel Gran Sol Caracas',
    category: 'travel',
    subcategory: 'Hoteles & Hospedaje de Lujo',
    rating: 4.9,
    description: 'Hotel de 5 estrellas con spa, piscina infinita y vistas espectaculares al Ávila. Aceptamos criptomonedas para reservas de habitaciones, eventos corporativos y consumo en restaurantes.',
    lat: 10.4912,
    lng: -66.8725, // Caracas, Altamira / Chacao
    logo: '🏨',
    address: 'Av. Francisco de Miranda, frente a Plaza Altamira, Caracas',
    acceptedCryptos: ['BTC', 'USDT', 'USDC', 'TZC'],
    isVerified: true,
    phone: '+58 212-201-9000',
    email: 'reservas@gransolcaracas.com',
    website: 'gransolcaracas.com',
    bannerImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Estadía Ejecutiva (1 Noche con Desayuno)', priceUsd: 150.00, image: '🛌' },
      { name: 'Pase de Día Premium (Piscina + Almuerzo)', priceUsd: 45.00, image: '🏊' },
      { name: 'Cena Romántica en Terraza Alta', priceUsd: 80.00, image: '🍷' }
    ],
    reviews: [
      {
        id: 'r7_1',
        author: 'Daniel Pérez',
        rating: 5,
        comment: 'Hospedaje de primer nivel. Pagar con TZC y recibir el descuento fue automático. Un éxito total.',
        date: '2026-07-12',
        verifiedPurchase: true,
        transactionHash: '0x9b3c...11f4'
      }
    ]
  },
  {
    id: 'm8',
    name: 'Posada Ávila Azul',
    category: 'travel',
    subcategory: 'Posadas & Turismo de Montaña',
    rating: 4.8,
    description: 'Un oasis de paz en las faldas del Parque Nacional El Ávila. Habitaciones rústicas, clima de montaña, senderismo guiado y comida típica mantuana hecha a leña.',
    lat: 10.5112,
    lng: -66.8831, // Caracas, San Bernardino / Alturas
    logo: '🏡',
    address: 'Camino Real de Galipán, Sector El Ávila, Caracas',
    acceptedCryptos: ['USDT', 'TZC'],
    isVerified: true,
    phone: '+58 414-234-5678',
    email: 'contacto@avilaazul.ve',
    website: 'avilaazul.ve',
    bannerImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Fin de Semana para Parejas (Todo Incluido)', priceUsd: 180.00, image: '🏞️' },
      { name: 'Excursión Guiada + Almuerzo Criollo', priceUsd: 25.00, image: '🥾' },
      { name: 'Cesta de Picnic de Montaña', priceUsd: 20.00, image: '🧺' }
    ],
    reviews: [
      {
        id: 'r8_1',
        author: 'Sonia Blanco',
        rating: 5,
        comment: 'Desconectarse de la ciudad aquí es lo máximo. Pagué el paquete completo con USDT sin complicaciones.',
        date: '2026-07-09',
        verifiedPurchase: true,
        transactionHash: '0x43da...cb11'
      }
    ]
  },
  {
    id: 'm9',
    name: 'Agencia Destinos Cripto',
    category: 'travel',
    subcategory: 'Agencias de Viajes & Turismo',
    rating: 4.7,
    description: 'Especialistas en viajes nacionales e internacionales. Paquetes turísticos a Los Roques, Canaima, Margarita y vuelos internacionales pagaderos 100% con criptomonedas y stablecoins.',
    lat: 10.4855,
    lng: -66.8252, // Caracas, Las Mercedes
    logo: '✈️',
    address: 'Calle Orinoco, Centro Empresarial Las Mercedes, Piso 1, Caracas',
    acceptedCryptos: ['BTC', 'ETH', 'USDT', 'TZC'],
    isVerified: true,
    phone: '+58 212-991-3322',
    email: 'info@destinoscripto.com',
    website: 'destinoscripto.com',
    bannerImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Paquete Los Roques 3D/2N (Vuelo + Posada)', priceUsd: 490.00, image: '🏝️' },
      { name: 'Tour Full Day a Isla de Margarita', priceUsd: 120.00, image: '🌊' },
      { name: 'Seguro de Viaje Internacional Web3', priceUsd: 35.00, image: '🛡️' }
    ],
    reviews: [
      {
        id: 'r9_1',
        author: 'Francisco G.',
        rating: 4,
        comment: 'Compré mis boletos a Los Roques pagando con Bitcoin. El soporte por WhatsApp fue impecable.',
        date: '2026-07-06',
        verifiedPurchase: true,
        transactionHash: '0x88ff...9a3c'
      }
    ]
  },
  {
    id: 'm10',
    name: 'Dr. Arrieta Cripto-Salud',
    category: 'health',
    subcategory: 'Consultas Médicas & Especialistas',
    rating: 4.9,
    description: 'Consulta de medicina general y cardiología con tecnología de punta. Creemos en la inclusión financiera, por lo que facilitamos el pago de honorarios y exámenes con tus tokens favoritos.',
    lat: 10.4811,
    lng: -66.8644, // Caracas, Chacao
    logo: '👨‍⚕️',
    address: 'Av. Libertador, Edif. Centro Clínico, Consultorio 304, Chacao, Caracas',
    acceptedCryptos: ['USDT', 'USDC', 'TZC'],
    isVerified: true,
    phone: '+58 424-111-2233',
    email: 'dr.arrieta@criptosalud.ve',
    website: 'dr-arrieta.ve',
    bannerImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Consulta Médica General + Electro', priceUsd: 35.00, image: '🩺' },
      { name: 'Evaluación Cardiovascular Completa', priceUsd: 60.00, image: '❤️' },
      { name: 'Monitoreo de Presión Holter 24h', priceUsd: 50.00, image: '📊' }
    ],
    reviews: [
      {
        id: 'r10_1',
        author: 'Carmen López',
        rating: 5,
        comment: 'Un doctor excelente y súper empático. Pagar mi consulta con $TZC fue sumamente cómodo.',
        date: '2026-07-11',
        verifiedPurchase: true,
        transactionHash: '0xf72a...22d1'
      }
    ]
  },
  {
    id: 'm11',
    name: 'Inversiones Ferre-Cripto',
    category: 'retail',
    subcategory: 'Ferretería & Materiales de Construcción',
    rating: 4.6,
    description: 'Todo en ferretería, herramientas de marcas internacionales, pintura y materiales de construcción para tus remodelaciones. Descuentos pagando en $TZC.',
    lat: 10.4788,
    lng: -66.8920, // Caracas, Plaza Venezuela
    logo: '🛠️',
    address: 'Av. Las Acacias, Edif. Ferretero, Sabana Grande, Caracas',
    acceptedCryptos: ['USDT', 'TZC'],
    isVerified: false,
    phone: '+58 212-781-4455',
    email: 'contacto@ferrecipto.com',
    website: 'ferrecipto.com',
    bannerImage: 'https://images.unsplash.com/photo-1581781894090-2139f743f5d7?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Taladro Percutor Inalámbrico 20V', priceUsd: 85.00, image: '🔨' },
      { name: 'Juego de Destornilladores de Precisión 42 pzas', priceUsd: 15.00, image: '🪛' },
      { name: 'Pintura de Caucho Premium Blanco (1 Galón)', priceUsd: 22.00, image: '🎨' }
    ],
    reviews: []
  },
  {
    id: 'm12',
    name: 'Cripto-Artesanos Carpintería',
    category: 'services',
    subcategory: 'Ebanistería, Carpintería & Mobiliario',
    rating: 4.8,
    description: 'Diseño y fabricación de muebles a medida, cocinas empotradas y closets utilizando maderas nobles nacionales. Recibimos USDT y TZC con financiamiento opcional.',
    lat: 10.4725,
    lng: -66.8451, // Caracas, Chuao
    logo: '🪚',
    address: 'Zona Industrial de Chuao, Calle Los Artesanos, Galpón C-4, Caracas',
    acceptedCryptos: ['BTC', 'USDT', 'TZC'],
    isVerified: true,
    phone: '+58 212-985-2211',
    email: 'muebles@criptoartesanos.com',
    website: 'criptoartesanos.com',
    bannerImage: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Mesa de Centro de Roble Macizo', priceUsd: 120.00, image: '🪵' },
      { name: 'Estante Modular Tipo Biblioteca', priceUsd: 95.00, image: '📚' },
      { name: 'Repisa Flotante Minimalista', priceUsd: 15.00, image: '📐' }
    ],
    reviews: [
      {
        id: 'r12_1',
        author: 'Geraldo M.',
        rating: 5,
        comment: 'Excelente calidad de los acabados de madera. El pago con TZC por el anticipo fue súper fluido.',
        date: '2026-07-04',
        verifiedPurchase: true,
        transactionHash: '0x1c4a...77e9'
      }
    ]
  },
  {
    id: 'm13',
    name: 'Hotel EuroCripto Suites',
    category: 'travel',
    subcategory: 'Hotel de Lujo & Centro de Convenciones',
    rating: 4.9,
    description: 'Hospedaje de 5 estrellas en el corazón financiero de Caracas. Habitaciones ejecutivas, piscina templada, helipuerto y salones de conferencia. Aceptamos pagos directos en $TZC, BTC, y USDT con check-in express.',
    lat: 10.4912,
    lng: -66.8245, // Las Mercedes / Campo Alegre
    logo: '🏨',
    address: 'Av. Tamanaco, Centro Financiero EuroCripto, Campo Alegre, Caracas',
    acceptedCryptos: ['BTC', 'ETH', 'USDT', 'USDC', 'TZC'],
    isVerified: true,
    phone: '+58 212-901-5000',
    email: 'reservas@eurocriptosuites.com',
    website: 'eurocriptosuites.com',
    bannerImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Noche Suite Ejecutiva + Desayuno', priceUsd: 140.00, image: '🛌' },
      { name: 'Pase de Día (Piscina + Gym + Sauna)', priceUsd: 30.00, image: '🏊' },
      { name: 'Almuerzo Buffet Ejecutivo Premium', priceUsd: 25.00, image: '🍽️' }
    ],
    reviews: [
      {
        id: 'r13_1',
        author: 'Ricardo Falcon',
        rating: 5,
        comment: 'Una joya en Caracas. Pagar la suite con TZC fue sumamente fácil y obtuve un 15% de descuento en el restaurante del hotel.',
        date: '2026-07-12',
        verifiedPurchase: true,
        transactionHash: '0xab22...44f9'
      }
    ]
  },
  {
    id: 'm14',
    name: 'Posada Turística Bahía Cripto',
    category: 'travel',
    subcategory: 'Hospedaje Playero & Escuela de Windsurf',
    rating: 4.8,
    description: 'Hermosa posada boutique a metros de la playa. Cómodas cabañas de madera, restaurante con mariscos frescos, coctelería tropical y excursiones en bote. Tu rincón paradisíaco Web3.',
    lat: 10.5050,
    lng: -66.8520, // Zona costera cercana / Chuspa / Higuerote / Los Roques ref
    logo: '🏖️',
    address: 'Paseo Costanera, Sector Playa Grande, Chuspa, Estado La Guaira',
    acceptedCryptos: ['USDT', 'TZC'],
    isVerified: true,
    phone: '+58 412-555-9876',
    email: 'contacto@bahiacripto.com',
    website: 'bahiacripto.com',
    bannerImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Full Day Playero Todo Incluido', priceUsd: 40.00, image: '🍹' },
      { name: 'Estadía 3 Días / 2 Noches p/ Pareja', priceUsd: 180.00, image: '🌅' },
      { name: 'Curso de Windsurf Iniciación (2h)', priceUsd: 35.00, image: '🏄' }
    ],
    reviews: [
      {
        id: 'r14_1',
        author: 'Daniela G.',
        rating: 5,
        comment: 'La mejor desconexión frente al mar. Excelente comida costera, se puede pagar absolutamente todo con CriptoPay de TuZonaCripto.',
        date: '2026-07-09',
        verifiedPurchase: true,
        transactionHash: '0xef01...dd12'
      }
    ]
  },
  {
    id: 'm15',
    name: 'Agencia de Viajes CriptoFly',
    category: 'travel',
    subcategory: 'Pasajes Aéreos, Tours & Paquetes Turísticos',
    rating: 4.7,
    description: 'Vuelos nacionales e internacionales, cruceros, alquiler de autos y asesoría de visas. Especialistas en expediciones a Los Roques, Canaima y Morrocoy con pagos multi-cripto.',
    lat: 10.4850,
    lng: -66.8850, // Sabana Grande / Plaza Venezuela
    logo: '✈️',
    address: 'Av. Casanova, Torre CriptoFly, Piso 3, Ofic. 32, Caracas',
    acceptedCryptos: ['BTC', 'ETH', 'USDT', 'USDC', 'TZC'],
    isVerified: true,
    phone: '+58 212-781-9090',
    email: 'ventas@criptofly.travel',
    website: 'criptofly.travel',
    bannerImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Paquete de Lujo Los Roques (3D/2N)', priceUsd: 499.00, image: '🏝️' },
      { name: 'Tour Exclusivo al Salto Ángel (Canaima)', priceUsd: 750.00, image: '🚁' },
      { name: 'Boleto Ida y Vuelta Caracas - Porlamar', priceUsd: 110.00, image: '🛫' }
    ],
    reviews: []
  },
  {
    id: 'm16',
    name: 'Dra. Elena Rossi - Odontología Cripto',
    category: 'health',
    subcategory: 'Clínica Odontológica Especializada',
    rating: 4.9,
    description: 'Servicio odontológico integral y estética dental de última generación. Diseño de sonrisa, implantes dentales, blanqueamiento láser y ortodoncia invisible en un ambiente relajado.',
    lat: 10.4812,
    lng: -66.8950, // Chacao / El Rosal
    logo: '🦷',
    address: 'Av. Francisco de Miranda, Multicentro Empresarial del Este, Torre B, Piso 5, Chacao',
    acceptedCryptos: ['USDT', 'USDC', 'TZC'],
    isVerified: true,
    phone: '+58 424-987-6543',
    email: 'dra.rossiodontologia@gmail.com',
    website: 'elenarossiodonto.ve',
    bannerImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Limpieza Dental Ultrasónica + Diagnóstico', priceUsd: 25.00, image: '🪥' },
      { name: 'Blanqueamiento Dental Profesional Láser', priceUsd: 120.00, image: '✨' },
      { name: 'Evaluación de Ortodoncia Invisible', priceUsd: 30.00, image: '🦷' }
    ],
    reviews: [
      {
        id: 'r16_1',
        author: 'Guillermo Pérez',
        rating: 5,
        comment: 'La atención de la Dra. Rossi es impecable. El consultorio es sumamente moderno y me encantó pagar mi limpieza directamente escaneando el código QR de CriptoPay.',
        date: '2026-07-06',
        verifiedPurchase: true,
        transactionHash: '0xc552...ef42'
      }
    ]
  },
  {
    id: 'm17',
    name: 'Criptolex Abogados Web3',
    category: 'services',
    subcategory: 'Asesoría Legal, Corporativa & Contratos Inteligentes',
    rating: 4.8,
    description: 'Bufete de abogados especializado en derecho mercantil, marcas, constitución de empresas nacionales y extranjeras, asesoría fiscal y redacción de contratos legales adaptados para proyectos blockchain/tokenización.',
    lat: 10.4780,
    lng: -66.8610, // Chacao
    logo: '⚖️',
    address: 'Av. Tamanaco, Torre Mercantil, Piso 12, Ofic. A, Chacao, Caracas',
    acceptedCryptos: ['BTC', 'USDT', 'TZC'],
    isVerified: true,
    phone: '+58 212-263-8080',
    email: 'contacto@criptolex.ve',
    website: 'criptolex.ve',
    bannerImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600',
    featuredProducts: [
      { name: 'Constitución de Empresa S.A. en Venezuela', priceUsd: 450.00, image: '🏢' },
      { name: 'Asesoría Legal por Hora (Cripto/Web3)', priceUsd: 60.00, image: '🗣️' },
      { name: 'Redacción de Contrato de Servicios', priceUsd: 80.00, image: '📝' }
    ],
    reviews: []
  }
];

export const CRYPTO_LIST: { [key: string]: { name: string; network: string; rateUsd: number; logo: string; color: string } } = {
  BTC: { name: 'Bitcoin', network: 'Bitcoin Network', rateUsd: 91500, logo: '🪙', color: '#F7931A' },
  ETH: { name: 'Ethereum', network: 'Ethereum Mainnet (Polygon PoS)', rateUsd: 3450, logo: '🔷', color: '#627EEA' },
  USDT: { name: 'Tether', network: 'TRON / Polygon / BSC', rateUsd: 1.00, logo: '💵', color: '#26A17B' },
  USDC: { name: 'USD Coin', network: 'Ethereum / Polygon', rateUsd: 1.00, logo: '🔵', color: '#2775CA' },
  TZC: { name: 'TuZonaCripto Token', network: 'Polygon PoS (EVM)', rateUsd: 0.12, logo: '🛡️', color: '#DC2626' } // ROJO de la marca
};
