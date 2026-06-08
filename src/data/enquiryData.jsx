const STORAGE_KEY = 'thirupay_service_enquiries';

const getEnquiries = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveEnquiries = (enquiries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(enquiries));
  } catch (e) {
    console.error('Failed to save enquiries:', e);
  }
};

export const enquiryService = {
  getAll: () => getEnquiries(),

  add: (enquiry) => {
    const enquiries = getEnquiries();
    const newEnquiry = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: enquiry.name,
      phone: enquiry.phone,
      email: enquiry.email,
      category: enquiry.category,
      service: enquiry.service,
      date: new Date().toISOString(),
      status: 'New',
    };
    enquiries.unshift(newEnquiry);
    saveEnquiries(enquiries);
    return newEnquiry;
  },

  updateStatus: (id, status) => {
    const enquiries = getEnquiries();
    const index = enquiries.findIndex(e => e.id === id);
    if (index !== -1) { enquiries[index].status = status; saveEnquiries(enquiries); return enquiries[index]; }
    return null;
  },

  delete: (id) => {
    const enquiries = getEnquiries();
    const filtered = enquiries.filter(e => e.id !== id);
    saveEnquiries(filtered);
    return filtered;
  },

  search: (query) => {
    const enquiries = getEnquiries();
    const q = query.toLowerCase();
    return enquiries.filter(e =>
      e.name.toLowerCase().includes(q) ||
      e.phone.includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      e.service.toLowerCase().includes(q)
    );
  },

  filterByCategory: (category) => {
    const enquiries = getEnquiries();
    if (!category || category === 'All') return enquiries;
    return enquiries.filter(e => e.category === category);
  },

  filterByStatus: (status) => {
    const enquiries = getEnquiries();
    if (!status || status === 'All') return enquiries;
    return enquiries.filter(e => e.status === status);
  },
};

// Service-to-category mapping
export const serviceToCategory = {
  'digital-bank-account': { category: 'Banking Services', label: 'Digital Bank Account' },
  'physical-card': { category: 'Banking Services', label: 'Physical Card' },
  'upi-payment': { category: 'Banking Services', label: 'UPI Payment' },
  'loan': { category: 'Banking Services', label: 'Loan' },
  'investment': { category: 'Banking Services', label: 'Investment' },
  'soundbox': { category: 'Banking Services', label: 'SoundBox' },
  'pos-terminal': { category: 'Banking Services', label: 'Point of Sale (POS)' },
  'health-insurance': { category: 'Insurance Services', label: 'Health Insurance' },
  'motor-insurance': { category: 'Insurance Services', label: 'Motor Insurance' },
  'shop-insurance': { category: 'Insurance Services', label: 'Shop Insurance' },
  'device-insurance': { category: 'Insurance Services', label: 'Device Insurance' },
  'irctc-ticket-booking': { category: 'Travel Services', label: 'IRCTC Ticket Booking' },
  'flight-booking': { category: 'Travel Services', label: 'Flight Booking' },
  'bus-booking': { category: 'Travel Services', label: 'Bus Booking' },
  'hotel-booking': { category: 'Travel Services', label: 'Hotel Booking' },
  'mobile-dth-recharge': { category: 'Utility & Bill Payment', label: 'Mobile & DTH Recharge' },
  'bbps': { category: 'Utility & Bill Payment', label: 'BBPS' },
  'ott-recharge': { category: 'Utility & Bill Payment', label: 'OTT Recharge' },
};

export const categoryServicesMap = {
  'Banking Services': [
    { id: 'digital-bank-account', label: 'Digital Bank Account' },
    { id: 'physical-card', label: 'Physical Card' },
    { id: 'upi-payment', label: 'UPI Payment' },
    { id: 'loan', label: 'Loan' },
    { id: 'investment', label: 'Investment' },
    { id: 'soundbox', label: 'SoundBox' },
    { id: 'pos-terminal', label: 'Point of Sale (POS)' },
  ],
  'Insurance Services': [
    { id: 'health-insurance', label: 'Health Insurance' },
    { id: 'motor-insurance', label: 'Motor Insurance' },
    { id: 'shop-insurance', label: 'Shop Insurance' },
    { id: 'device-insurance', label: 'Device Insurance' },
  ],
  'Travel Services': [
    { id: 'irctc-ticket-booking', label: 'IRCTC Ticket Booking' },
    { id: 'flight-booking', label: 'Flight Booking' },
    { id: 'bus-booking', label: 'Bus Booking' },
    { id: 'hotel-booking', label: 'Hotel Booking' },
  ],
  'Utility & Bill Payment': [
    { id: 'mobile-dth-recharge', label: 'Mobile & DTH Recharge' },
    { id: 'bbps', label: 'BBPS' },
    { id: 'ott-recharge', label: 'OTT Recharge' },
  ],
};