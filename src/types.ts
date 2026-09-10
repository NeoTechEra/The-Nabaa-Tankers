export interface TankerModel {
  id: string;
  name: string;
  capacityTons: number;
  capacityLiters: number;
  priceSAR: number;
  badge?: string;
  hoseReach: string;
  pumpSpeed: string;
  idealFor: string[];
  description: string;
}

export interface Promotion {
  id: string;
  title: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  maxDiscount?: number;
  minOrder?: number;
  code?: string;
  description: string;
  tag: string;
}

export interface DriverProfile {
  name: string;
  avatar: string;
  tankerNumber: string;
  tankerCapacity: string;
  rating: number;
  tripsCompleted: number;
  status: 'online' | 'offline' | 'on_trip';
  etaMinutes: number;
  phone: string;
}

export interface AdminStats {
  todayOrders: number;
  activeDeliveries: number;
  dailyRevenueSAR: number;
  fleetAvailable: number;
  fleetBusy: number;
  fleetOffline: number;
  driversOnline: number;
  driversOffline: number;
  scheduledDeliveries: number;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  address: string;
  tankerType: string;
  status: 'Searching' | 'Driver Assigned' | 'Accepted' | 'On the Way' | 'Arrived' | 'Delivered' | 'Scheduled';
  driver: string;
  amountSAR: number;
  time: string;
  type: 'Immediate' | 'Scheduled';
}

export interface FAQItem {
  question: string;
  answer: string;
}
