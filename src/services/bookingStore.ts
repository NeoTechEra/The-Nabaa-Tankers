export interface BookingRecord {
  id: string;
  type: 'demo' | 'tanker_order' | 'fleet_inquiry';
  title: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  targetEmail: string;
  status: 'sent' | 'pending' | 'failed';
  messageId?: string;
  error?: string;
  details: Record<string, any>;
  htmlContent: string;
  plainContent: string;
  createdAt: string;
}

const STORAGE_KEY = 'nabaa_bookings_records_v1';

const INITIAL_RECORDS: BookingRecord[] = [
  {
    id: 'DEMO-7419',
    type: 'demo',
    title: '[The Nabaa Tankers] Demo Booking: Hafiz Osama Arslan',
    customerName: 'Hafiz Osama Arslan',
    customerEmail: 'thenabaatankers@gmail.com',
    customerPhone: '+92 333 0717198',
    targetEmail: 'thenabaatankers@gmail.com',
    status: 'pending',
    details: {
      topic: 'Full Platform Walkthrough',
      scheduledTime: 'Tomorrow, 11:00 AM (AST)',
      meetingFormat: 'Google Meet Video Call',
      notes: 'Fleet Size: 6-20 Tankers. Central Riyadh operations.',
    },
    htmlContent: '<p>Platform Demo with Hafiz Osama Arslan scheduled for tomorrow 11:00 AM.</p>',
    plainContent: 'The Nabaa Tankers Platform Demo\nClient: Hafiz Osama Arslan\nTime: Tomorrow 11:00 AM\nFormat: Google Meet',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 'ORD-8821',
    type: 'tanker_order',
    title: '[The Nabaa Tankers] Water Order: Medium Commercial Tanker (SAR 140)',
    customerName: 'Ahmed Al-Zahrani',
    customerEmail: 'ahmed.zahrani@gmail.com',
    customerPhone: '+966 50 123 4567',
    targetEmail: 'thenabaatankers@gmail.com',
    status: 'pending',
    details: {
      tankerSize: 'Medium Commercial Tanker (19 Tons)',
      totalPrice: 140,
      deliveryDistrict: 'Al Olaya, King Fahd Road, Riyadh',
      hoseLength: '40m Standard Hose',
      notes: 'Immediate express delivery requested.',
    },
    htmlContent: '<p>19 Ton Potable Water Order for Al Olaya District.</p>',
    plainContent: 'The Nabaa Tankers Order\nTanker: 19T Medium Commercial\nPrice: SAR 140\nDistrict: Al Olaya',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: 'FLT-3042',
    type: 'fleet_inquiry',
    title: '[The Nabaa Tankers] Fleet Inquiry: Riyadh Metro Contracting LLC',
    customerName: 'Eng. Tariq Mansoor',
    customerEmail: 'procurement@riyadhmetro.sa',
    customerPhone: '+966 53 043 4010',
    targetEmail: 'thenabaatankers@gmail.com',
    status: 'pending',
    details: {
      companyName: 'Riyadh Metro Contracting LLC',
      topic: 'Fleet Onboarding & 32T Heavy Industrial Tankers',
      notes: 'Fleet: 15 tankers requiring IoT digital telemetry dispatch.',
    },
    htmlContent: '<p>Commercial Fleet Onboarding Inquiry for 15 Tankers.</p>',
    plainContent: 'The Nabaa Tankers Fleet Inquiry\nCompany: Riyadh Metro Contracting LLC\n15 Tankers',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  }
];

type Listener = (records: BookingRecord[]) => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  const records = getBookingRecords();
  listeners.forEach((fn) => fn(records));
}

export function getBookingRecords(): BookingRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RECORDS));
      return INITIAL_RECORDS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_RECORDS;
  }
}

export function addBookingRecord(data: Omit<BookingRecord, 'id' | 'createdAt'>): BookingRecord {
  const records = getBookingRecords();
  const prefix = data.type === 'demo' ? 'DEMO' : data.type === 'tanker_order' ? 'ORD' : 'FLT';
  const newRecord: BookingRecord = {
    ...data,
    id: `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
    createdAt: new Date().toISOString(),
  };

  const updated = [newRecord, ...records];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to write booking to localStorage', e);
  }
  notifyListeners();
  return newRecord;
}

export function updateBookingRecordStatus(
  id: string,
  status: 'sent' | 'pending' | 'failed',
  messageId?: string,
  error?: string
) {
  const records = getBookingRecords();
  const updated = records.map((r) => {
    if (r.id === id) {
      return {
        ...r,
        status,
        messageId: messageId || r.messageId,
        error: error || (status === 'sent' ? undefined : r.error),
      };
    }
    return r;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update booking in localStorage', e);
  }
  notifyListeners();
}

export function clearBookings() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error(e);
  }
  notifyListeners();
}

export function subscribeToBookings(fn: Listener): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
