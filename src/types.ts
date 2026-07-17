export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  transactionHash?: string;
  verifiedPurchase: boolean;
}

export interface Merchant {
  id: string;
  name: string;
  category: 'gastronomy' | 'services' | 'retail' | 'health' | 'education' | 'technology' | 'travel';
  subcategory: string;
  rating: number;
  description: string;
  lat: number; // For advanced geospatial simulation
  lng: number; // For advanced geospatial simulation
  logo: string;
  address: string;
  acceptedCryptos: string[]; // ['BTC', 'ETH', 'USDT', 'USDC', 'TZC']
  isVerified: boolean;
  reviews: Review[];
  bannerImage: string;
  phone: string;
  email: string;
  website: string;
  featuredProducts?: { name: string; priceUsd: number; image: string }[];
}

export interface CryptoCurrency {
  code: string;
  name: string;
  network: string;
  rateUsd: number;
  color: string;
}

export interface CreditScore {
  score: number;
  riskLevel: 'Bajo' | 'Medio' | 'Alto';
  onChainHistoryCount: number;
  walletBalanceUsd: number;
  recommendedLimitUsd: number;
}

export interface Ride {
  id: string;
  driverName: string;
  driverAvatar: string;
  rating: number;
  vehicle: string;
  priceTzc: number;
  pickup: string;
  destination: string;
  status: 'searching' | 'matched' | 'ongoing' | 'completed';
  durationMin: number;
  etaSec?: number;
}

export interface DeliveryItem {
  id: string;
  merchantName: string;
  items: string[];
  totalUsd: number;
  status: 'preparando' | 'en_camino' | 'entregado';
  address: string;
  estimateMin: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: 'Blockchain' | 'Seguridad' | 'DeFi' | 'Web3';
  pointsReward: number;
  completed: boolean;
  questions: QuizQuestion[];
}

export interface Transaction {
  id: string;
  hash: string;
  type: 'Payment' | 'Staking' | 'Credit' | 'Reward' | 'SafeDeposit' | 'Transfer' | 'Savings';
  amount: number;
  token: string;
  destination: string;
  status: 'Success' | 'Pending' | 'Failed';
  date: string;
  feeTzc: number;
}
