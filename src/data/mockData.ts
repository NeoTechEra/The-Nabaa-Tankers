import { TankerModel, Promotion, DriverProfile, AdminStats, OrderRecord, FAQItem } from '../types';

export const TANKER_MODELS: TankerModel[] = [
  {
    id: '10t',
    name: 'Small Tanker',
    capacityTons: 10,
    capacityLiters: 10000,
    priceSAR: 120,
    hoseReach: '40–60 m hose reach',
    pumpSpeed: '1,200 L/min pumping',
    idealFor: ['Villas', 'Emergency top-ups', 'Gardens', 'Smaller residential requirements'],
    description: 'Agile maneuverability for residential alleys and rapid emergency refills.'
  },
  {
    id: '19t',
    name: 'Medium Tanker',
    capacityTons: 19,
    capacityLiters: 19000,
    priceSAR: 200,
    badge: 'MOST POPULAR',
    hoseReach: '40–60 m hose reach',
    pumpSpeed: '1,200 L/min pumping',
    idealFor: ['Residential compounds', 'Commercial facilities', 'Swimming pools', 'Medium-sized requirements'],
    description: 'The optimal balance of volume and accessibility for compounds and clinics.'
  },
  {
    id: '32t',
    name: 'Large Tanker',
    capacityTons: 32,
    capacityLiters: 32000,
    priceSAR: 320,
    hoseReach: '40–60 m hose reach',
    pumpSpeed: '1,200 L/min pumping',
    idealFor: ['Commercial buildings', 'Construction sites', 'Farms & agricultural lands', 'Industrial reservoirs'],
    description: 'Heavy-duty volume delivery engineered for maximum throughput and site efficiency.'
  }
];

export const DEMO_DRIVER: DriverProfile = {
  name: 'Tariq Al-Mansoor',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  tankerNumber: '#402',
  tankerCapacity: '19 Tons',
  rating: 4.95,
  tripsCompleted: 1428,
  status: 'online',
  etaMinutes: 6,
  phone: '+966 53 043 4010'
};

export const AUTO_PROMOTIONS: Promotion[] = [
  {
    id: 'seasonal',
    title: 'Seasonal Water Offer',
    discountType: 'percentage',
    value: 15,
    maxDiscount: 30,
    description: '15% OFF capped at 30 SAR on all medium & large orders.',
    tag: 'AUTOMATIC AT CHECKOUT'
  },
  {
    id: 'welcome',
    title: 'First Order Welcome',
    discountType: 'fixed',
    value: 25,
    minOrder: 120,
    description: '25 SAR OFF for new registered customers on initial delivery.',
    tag: 'NEW CUSTOMERS'
  }
];

export const PROMO_CODES: Record<string, { discountType: 'fixed' | 'percentage'; value: number; label: string }> = {
  WATERFAST: { discountType: 'fixed', value: 15, label: '15 SAR OFF Instant' },
  SUMMER10: { discountType: 'fixed', value: 10, label: '10 SAR OFF Tanker Refill' }
};

export const SAMPLE_ADMIN_STATS: AdminStats = {
  todayOrders: 342,
  activeDeliveries: 48,
  dailyRevenueSAR: 68400,
  fleetAvailable: 84,
  fleetBusy: 48,
  fleetOffline: 12,
  driversOnline: 132,
  driversOffline: 18,
  scheduledDeliveries: 64
};

export const SAMPLE_ADMIN_ORDERS: OrderRecord[] = [
  {
    id: 'NB-9481',
    customerName: 'Al-Nakheel Compound',
    address: 'Gate 4, Ground Reservoir A, Riyadh',
    tankerType: '19 Tons (Medium)',
    status: 'On the Way',
    driver: 'Tariq Al-Mansoor (#402)',
    amountSAR: 170,
    time: '11:42 AM',
    type: 'Immediate'
  },
  {
    id: 'NB-9480',
    customerName: 'Sultan Bin Fahad Villa',
    address: 'Al-Malqa, Rooftop Tank #2',
    tankerType: '10 Tons (Small)',
    status: 'Delivered',
    driver: 'Hamza Al-Otaibi (#118)',
    amountSAR: 120,
    time: '11:15 AM',
    type: 'Immediate'
  },
  {
    id: 'NB-9479',
    customerName: 'Red Sea Contracting Site 4',
    address: 'North District Industrial Zone',
    tankerType: '32 Tons (Large)',
    status: 'Arrived',
    driver: 'Rashid Al-Harbi (#305)',
    amountSAR: 320,
    time: '10:50 AM',
    type: 'Immediate'
  },
  {
    id: 'NB-9478',
    customerName: 'Green Palm Oasis Farm',
    address: 'Al-Ammariyah Road, Plot 14',
    tankerType: '32 Tons (Large)',
    status: 'Scheduled',
    driver: 'Pending Assignment',
    amountSAR: 320,
    time: 'Tomorrow, 08:00 AM',
    type: 'Scheduled'
  },
  {
    id: 'NB-9477',
    customerName: 'Olayan Medical Complex',
    address: 'Main Supply Tower, Basement Tank',
    tankerType: '19 Tons (Medium)',
    status: 'Searching',
    driver: 'Dispatching Nearby...',
    amountSAR: 200,
    time: '11:58 AM',
    type: 'Immediate'
  }
];

export const FAQ_LIST: FAQItem[] = [
  {
    question: 'What is The Nabaa?',
    answer: 'The Nabaa is a specialized digital water tanker delivery and fleet management platform connecting residential & commercial customers, tanker drivers, and operations teams into one unified ecosystem.'
  },
  {
    question: 'Can customers order water immediately?',
    answer: 'Yes. The "Order Now" experience is designed for immediate on-demand water delivery requests, dispatching nearby available drivers and tankers in real time subject to fleet availability.'
  },
  {
    question: 'Can customers schedule deliveries?',
    answer: 'Yes. Customers can select a future delivery date, time slot, destination tank type, and tanker volume to plan recurring or upcoming water replenishment with full calendar visibility.'
  },
  {
    question: 'Can customers use promo codes?',
    answer: 'Yes. The checkout supports both automated promotions (such as seasonal offers or new account credits) and custom promotional codes (like WATERFAST or SUMMER10) with instant calculation.'
  },
  {
    question: 'How do drivers receive orders?',
    answer: 'Drivers receive optimized incoming requests directly via the dedicated Driver App with customer details, tank location, hose requirements, distance, and estimated earnings with intuitive Accept/Decline actions.'
  },
  {
    question: 'Can drivers track their earnings?',
    answer: 'Yes. The Driver App features an integrated digital wallet, detailed commission history per delivery, and straightforward payout request management.'
  },
  {
    question: 'Can businesses manage multiple tankers?',
    answer: 'The platform is natively architected for fleet and tanker operations, allowing dispatchers to register, monitor, track compliance, and assign drivers across 10T, 19T, and 32T vehicles from the Admin Dashboard.'
  },
  {
    question: 'Can administrators create promotions?',
    answer: 'Yes. Business administrators can configure discount types (percentage or fixed), caps, minimum orders, validity dates, and customer segment eligibility directly from the central dashboard.'
  }
];
