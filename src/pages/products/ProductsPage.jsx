import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ServiceIllustration from '../../components/illustrations/ServiceIllustration';
import ServiceIcon from '../../components/illustrations/ServiceIcon';
import { allServices, allServiceIds } from '../../data/menuData';
import {
  CreditCard, Smartphone, ArrowRightLeft,
  Heart, Car, ShoppingBag, Monitor,
  Train, Plane, Bus, Hotel,
  Phone, Tv, Zap, Droplets, Fingerprint,
  Landmark, Receipt, FileText, Wifi,
  MessageSquare, Volume2, QrCode,
  Printer, Globe,
  Repeat, Battery, CheckCircle,
  TrendingUp, Flame, Shield, Star,
  PiggyBank, Percent, BarChart2
} from 'lucide-react';
import EnquiryModal from '../../components/EnquiryModal';

// ── CATEGORY DEFINITIONS (strict parent-child) ──

const categories = [
  {
    key: 'banking',
    label: 'Banking Services',
    emoji: '🏦',
    badge: 'Banking',
    title: 'Banking Services',
    subtitle: 'Complete banking solutions — UPI, accounts, cards, loans and more.',
    illustrationType: 'banking',
    services: [
      { id: 'digital-bank-account', label: 'Digital Bank Account', emoji: '🏛️' },
      { id: 'physical-card', label: 'Physical Card', emoji: '💳' },
      { id: 'upi-payment', label: 'UPI Payment', emoji: '📲' },
      { id: 'loan', label: 'Loan', emoji: '💰' },
      { id: 'investment', label: 'Investment', emoji: '📈' },
      { id: 'soundbox', label: 'SoundBox', emoji: '🔊' },
      { id: 'pos-terminal', label: 'Point of Sale (POS)', emoji: '🖥️' },
    ],
  },
  {
    key: 'insurance',
    label: 'Insurance Services',
    emoji: '🛡️',
    badge: 'Insurance',
    title: 'Insurance Services',
    subtitle: 'Sell insurance policies and earn commissions on health, motor, shop and device coverage.',
    illustrationType: 'insurance',
    services: [
      { id: 'health-insurance', label: 'Health Insurance', emoji: '❤️' },
      { id: 'motor-insurance', label: 'Motor Insurance', emoji: '🚗' },
      { id: 'shop-insurance', label: 'Shop Insurance', emoji: '🏪' },
      { id: 'device-insurance', label: 'Device Insurance', emoji: '📱' },
    ],
  },
  {
    key: 'travel',
    label: 'Travel Services',
    emoji: '✈️',
    badge: 'Travel',
    title: 'Travel Booking',
    subtitle: 'Book tickets and accommodation for your customers and earn on every booking.',
    illustrationType: 'travel',
    services: [
      { id: 'irctc-ticket-booking', label: 'IRCTC Ticket Booking', emoji: '🚆' },
      { id: 'flight-booking', label: 'Flight Booking', emoji: '✈️' },
      { id: 'bus-booking', label: 'Bus Booking', emoji: '🚌' },
      { id: 'hotel-booking', label: 'Hotel Booking', emoji: '🏨' },
    ],
  },
  {
    key: 'utility',
    label: 'Utility & Bill Payment',
    emoji: '📱',
    badge: 'Utility',
    title: 'Utility & Bill Payments',
    subtitle: 'Pay bills and recharge for all operators — earn commission on every payment.',
    illustrationType: 'utility',
    services: [
      { id: 'mobile-dth-recharge', label: 'Mobile & DTH Recharge', emoji: '📱' },
      { id: 'bbps', label: 'BBPS', emoji: '💡' },
      { id: 'ott-recharge', label: 'OTT Recharge', emoji: '🎬' },
    ],
  },
];

// Flatten all services for quick lookup
const allServiceEntries = categories.flatMap(cat =>
  cat.services.map(s => ({ ...s, parentCategory: cat.key }))
);

// Service-to-category mapping
const serviceToCategory = {};
categories.forEach(cat => {
  cat.services.forEach(s => {
    serviceToCategory[s.id] = cat.key;
  });
});

// ── SERVICE-SPECIFIC FEATURE CARDS ──

const serviceCards = {
  'digital-bank-account': [
    { icon: CreditCard, title: 'Digital Account Opening', desc: 'Open fully functional digital bank accounts in minutes with Aadhaar eKYC and PAN verification.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Smartphone, title: 'Mobile Banking Access', desc: '24/7 mobile banking with fund transfers, balance check, mini statements and more.', color: '#0066CC', bg: '#E8F0FE' },
    { icon: ArrowRightLeft, title: 'Zero Paperwork', desc: 'Paperless account opening with instant activation and no branch visit required.', color: '#2E7D32', bg: '#E8F5E9' },
    { icon: Shield, title: 'Secure eKYC', desc: 'Aadhaar-based eKYC for fast, secure and compliant customer onboarding.', color: '#7B1FA2', bg: '#F3E5F5' },
  ],
  'physical-card': [
    { icon: CreditCard, title: 'Prepaid Card Issuance', desc: 'Issue prepaid cards directly from your outlet with instant activation.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: CreditCard, title: 'Debit Card Issuance', desc: 'Issue debit cards linked to savings accounts with secure PIN delivery.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Smartphone, title: 'Card Management', desc: 'Block, replace or reset PIN for cards instantly through the merchant portal.', color: '#0066CC', bg: '#E8F0FE' },
    { icon: Shield, title: 'Secure Delivery', desc: 'Cards delivered with tamper-proof packaging and OTP-based activation.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  'upi-payment': [
    { icon: ArrowRightLeft, title: 'Instant Transfers', desc: 'Send and receive money instantly via UPI — supports all major banking apps.', color: '#0066CC', bg: '#E8F0FE' },
    { icon: Smartphone, title: 'All UPI Apps', desc: 'Compatible with Google Pay, PhonePe, Paytm, BHIM and all UPI-enabled apps.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: BarChart2, title: 'Real-time Settlement', desc: 'Real-time transaction settlement with minimal fees and 24/7 availability.', color: '#2E7D32', bg: '#E8F5E9' },
    { icon: Shield, title: 'Secure Payments', desc: 'UPI PIN-based authentication for secure and fraud-protected transactions.', color: '#7B1FA2', bg: '#F3E5F5' },
  ],
  loan: [
    { icon: CreditCard, title: 'Personal Loans', desc: 'Facilitate instant personal loans with quick approval and fast disbursal.', color: '#2E7D32', bg: '#E8F5E9' },
    { icon: CreditCard, title: 'Business Loans', desc: 'Help small businesses access working capital and growth financing easily.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: CreditCard, title: 'Micro Loans', desc: 'Offer micro-loans to customers for everyday needs with minimal documentation.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: CreditCard, title: 'Fast Disbursal', desc: 'Loan amounts disbursed directly to bank accounts within hours of approval.', color: '#0066CC', bg: '#E8F0FE' },
  ],
  investment: [
    { icon: PiggyBank, title: 'Mutual Funds', desc: 'Help customers invest in top-performing mutual funds with zero paperwork.', color: '#7B1FA2', bg: '#F3E5F5' },
    { icon: Landmark, title: 'Fixed Deposits', desc: 'Offer competitive FD rates from leading banks with instant issuance.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: TrendingUp, title: 'Recurring Deposits', desc: 'Help customers build savings with systematic RD plans from top financial institutions.', color: '#2E7D32', bg: '#E8F5E9' },
    { icon: Percent, title: 'High Commission', desc: 'Earn attractive commissions on every successful investment product sold.', color: '#FF6B00', bg: '#FFF3E0' },
  ],
  soundbox: [
    { icon: Volume2, title: 'Voice Alerts', desc: 'Loud and clear voice payment confirmations in Tamil, Hindi, English and more.', color: '#0288D1', bg: '#E1F5FE' },
    { icon: MessageSquare, title: 'Multi-Language', desc: 'Supports Tamil, Hindi, English, Telugu, Kannada, Malayalam and other regional languages.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: CheckCircle, title: 'Fraud Prevention', desc: 'Instant audio confirmation eliminates fake payment scams and chargebacks.', color: '#2E7D32', bg: '#E8F5E9' },
    { icon: QrCode, title: 'QR Display', desc: 'Built-in QR code display for easy customer payments via any UPI app.', color: '#FF6B00', bg: '#FFF3E0' },
  ],
  'pos-terminal': [
    { icon: CreditCard, title: 'Card Payments', desc: 'Accept credit, debit and prepaid card payments via compact POS terminal.', color: '#E65100', bg: '#FFF3E0' },
    { icon: Smartphone, title: 'Contactless', desc: 'Support for tap-and-pay with NFC-enabled cards, phones and smartwatches.', color: '#0066CC', bg: '#E8F0FE' },
    { icon: Printer, title: 'Thermal Receipt', desc: 'Built-in thermal printer for instant transaction receipts and payment confirmations.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Battery, title: 'Long Battery', desc: 'All-day battery life with fast charging for uninterrupted business operations.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  'health-insurance': [
    { icon: Heart, title: 'Hospitalization Cover', desc: 'Comprehensive hospitalization coverage including room rent, ICU and surgery costs.', color: '#C62828', bg: '#FFEBEE' },
    { icon: Heart, title: 'OPD Coverage', desc: 'Outpatient consultation, diagnostic tests and pharmacy coverage included.', color: '#1565C0', bg: '#E3F2FD' },
    { icon: Heart, title: 'Critical Illness', desc: 'Coverage for major critical illnesses with lump sum benefit on diagnosis.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: Heart, title: 'Family Floater', desc: 'Cover your entire family under a single policy with shared sum insured.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  'motor-insurance': [
    { icon: Car, title: 'Third Party Cover', desc: 'Statutory third-party liability coverage for two and four wheelers.', color: '#1565C0', bg: '#E3F2FD' },
    { icon: Car, title: 'Comprehensive Cover', desc: 'Full coverage including own damage, theft, fire and natural calamities.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Car, title: 'Zero Depreciation', desc: 'Zero depreciation add-on for maximum claim value on parts replacement.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: Car, title: 'Instant Issuance', desc: 'Policy issued instantly with e-certificate delivered via email and SMS.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  'shop-insurance': [
    { icon: ShoppingBag, title: 'Fire & Theft Cover', desc: 'Protection against fire, burglary, theft and malicious damage to your shop.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: ShoppingBag, title: 'Natural Disaster', desc: 'Coverage against floods, earthquakes, storms and other natural calamities.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: ShoppingBag, title: 'Liability Cover', desc: 'Public liability insurance for accidents occurring on business premises.', color: '#1565C0', bg: '#E3F2FD' },
    { icon: ShoppingBag, title: 'Stock Insurance', desc: 'Coverage for inventory, raw materials and finished goods stored in the shop.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  'device-insurance': [
    { icon: Monitor, title: 'Accidental Damage', desc: 'Coverage against accidental drops, liquid spills and screen breakage.', color: '#2E7D32', bg: '#E8F5E9' },
    { icon: Monitor, title: 'Theft Protection', desc: 'Coverage against theft, burglary and snatching of insured devices.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Monitor, title: 'All Electronics', desc: 'Cover smartphones, laptops, tablets, smartwatches and other electronics.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: Monitor, title: 'Quick Claim', desc: 'Hassle-free claim process with quick settlement and doorstep service.', color: '#1565C0', bg: '#E3F2FD' },
  ],
  'irctc-ticket-booking': [
    { icon: Train, title: 'All Classes', desc: 'Book tickets for Sleeper, AC, Chair Car, Executive and all other classes.', color: '#1565C0', bg: '#E3F2FD' },
    { icon: Train, title: 'Tatkal Booking', desc: 'Access Tatkal and premium Tatkal quotas for urgent travel bookings.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: Train, title: 'Real-time Availability', desc: 'Real-time seat availability and PNR status for all trains across India.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Train, title: 'Instant Confirmation', desc: 'Instant ticket confirmation with e-ticket delivered via SMS and email.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  'flight-booking': [
    { icon: Plane, title: 'Domestic Flights', desc: 'Book domestic flights at competitive fares with all major airlines supported.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Globe, title: 'International Flights', desc: 'Book international flights to global destinations with best fare guarantee.', color: '#1565C0', bg: '#E3F2FD' },
    { icon: Plane, title: 'All Airlines', desc: 'Support for IndiGo, SpiceJet, Air India, Vistara, GoFirst and more.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: Plane, title: 'Fare Comparison', desc: 'Compare fares across airlines to find the best deals for your customers.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  'bus-booking': [
    { icon: Bus, title: 'AC Buses', desc: 'Book AC Volvo, Mercedes and luxury bus tickets across thousands of routes.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: Bus, title: 'Non-AC Buses', desc: 'Affordable Non-AC bus tickets for all major state road transport routes.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Bus, title: 'Seat Selection', desc: 'Real-time seat selection with visual layout for preferred seat choice.', color: '#1565C0', bg: '#E3F2FD' },
    { icon: Bus, title: 'Operator Network', desc: 'Wide network of private and government bus operators across India.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  'hotel-booking': [
    { icon: Hotel, title: 'Hotels & Resorts', desc: 'Book hotels, resorts, guesthouses and homestays across India and abroad.', color: '#2E7D32', bg: '#E8F5E9' },
    { icon: Hotel, title: 'Best Price Guarantee', desc: 'Competitive pricing with best price guarantee on all hotel bookings.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Hotel, title: 'Instant Confirmation', desc: 'Instant booking confirmation with e-voucher for hassle-free check-in.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: Hotel, title: 'Cancel Anytime', desc: 'Free cancellation on select properties with full refund processing.', color: '#1565C0', bg: '#E3F2FD' },
  ],
  'mobile-dth-recharge': [
    { icon: Phone, title: 'Prepaid Recharge', desc: 'Prepaid recharges for Jio, Airtel, BSNL, Vi and all mobile operators.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Phone, title: 'Postpaid Bills', desc: 'Pay postpaid mobile bills for all operators with instant confirmation.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: Tv, title: 'DTH Recharge', desc: 'Recharge Tata Sky, Dish TV, Airtel DTH, Sun Direct and more.', color: '#F9A825', bg: '#FFFDE7' },
    { icon: Monitor, title: 'OTT Plans', desc: 'Streaming subscription plans for Netflix, Prime, Hotstar and more.', color: '#EC4899', bg: '#FCE4EC' },
  ],
  bbps: [
    { icon: Zap, title: 'Electricity Bill', desc: 'Pay electricity bills for all state boards across India with instant confirmation.', color: '#F9A825', bg: '#FFFDE7' },
    { icon: Droplets, title: 'Water Bill', desc: 'Pay municipal water bills and earn commissions on each successful transaction.', color: '#0288D1', bg: '#E1F5FE' },
    { icon: Flame, title: 'Gas Bill', desc: 'Pay LPG and piped natural gas bills for all major providers with instant processing.', color: '#FF6B00', bg: '#FFF3E0' },
    { icon: Wifi, title: 'Broadband Bill', desc: 'Pay broadband and internet bills for all major ISPs across the country.', color: '#7B1FA2', bg: '#F3E5F5' },
  ],
  'ott-recharge': [
    { icon: Monitor, title: 'Netflix', desc: 'Netflix subscription plans from Mobile to Premium with instant activation.', color: '#C62828', bg: '#FFEBEE' },
    { icon: Monitor, title: 'Amazon Prime', desc: 'Amazon Prime Video membership with fast delivery and music benefits.', color: '#0A1F44', bg: '#E8EDF6' },
    { icon: Monitor, title: 'Disney+ Hotstar', desc: 'Disney+ Hotstar premium plans for sports, movies and shows.', color: '#1565C0', bg: '#E3F2FD' },
    { icon: Monitor, title: 'All Platforms', desc: 'Zee5, Sony LIV, Sun NXT, Aha, MX Player and more OTT subscriptions.', color: '#FF6B00', bg: '#FFF3E0' },
  ],
};

// Fallback empty cards
const fallbackCards = [
  { icon: Star, title: 'Coming Soon', desc: 'Service cards for this product are being updated.', color: '#888', bg: '#F5F5F5' },
];

// ── CATEGORY NAVIGATION CARDS (same as original bankingServices etc., for the "More in" section) ──

const categoryServiceMeta = {
  banking: [
    { id: 'digital-bank-account', icon: ArrowRightLeft, title: 'Digital Bank Account', desc: 'Open bank account instantly with Aadhaar eKYC.', color: '#0A1F44', bg: '#E8EDF6' },
    { id: 'physical-card', icon: CreditCard, title: 'Physical Card', desc: 'Issue debit & prepaid cards directly.', color: '#FF6B00', bg: '#FFF3E0' },
    { id: 'upi-payment', icon: ArrowRightLeft, title: 'UPI Payment', desc: 'Instant UPI transactions via all apps.', color: '#0066CC', bg: '#E8F0FE' },
    { id: 'loan', icon: CreditCard, title: 'Loan', desc: 'Personal & business loans fast disbursal.', color: '#2E7D32', bg: '#E8F5E9' },
    { id: 'investment', icon: CreditCard, title: 'Investment', desc: 'Mutual funds, FDs & RDs zero paperwork.', color: '#7B1FA2', bg: '#F3E5F5' },
    { id: 'soundbox', icon: Smartphone, title: 'SoundBox', desc: 'Voice payment confirmation device.', color: '#0288D1', bg: '#E1F5FE' },
    { id: 'pos-terminal', icon: CreditCard, title: 'Point of Sale (POS)', desc: 'Card swipe & digital payments terminal.', color: '#E65100', bg: '#FFF3E0' },
  ],
  insurance: [
    { id: 'health-insurance', icon: Heart, title: 'Health Insurance', desc: 'Health & mediclaim plans coverage.', color: '#C62828', bg: '#FFEBEE' },
    { id: 'motor-insurance', icon: Car, title: 'Motor Insurance', desc: 'Two & four wheeler insurance cover.', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'shop-insurance', icon: ShoppingBag, title: 'Shop Insurance', desc: 'Protect your business & inventory.', color: '#FF6B00', bg: '#FFF3E0' },
    { id: 'device-insurance', icon: Monitor, title: 'Device Insurance', desc: 'Phones & laptops damage cover.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  travel: [
    { id: 'irctc-ticket-booking', icon: Train, title: 'IRCTC Ticket Booking', desc: 'Train tickets all classes India.', color: '#1565C0', bg: '#E3F2FD' },
    { id: 'flight-booking', icon: Plane, title: 'Flight Booking', desc: 'Domestic & international flights.', color: '#0A1F44', bg: '#E8EDF6' },
    { id: 'bus-booking', icon: Bus, title: 'Bus Booking', desc: 'AC & Non-AC buses all routes.', color: '#FF6B00', bg: '#FFF3E0' },
    { id: 'hotel-booking', icon: Hotel, title: 'Hotel Booking', desc: 'Hotels across India best prices.', color: '#2E7D32', bg: '#E8F5E9' },
  ],
  utility: [
    { id: 'mobile-dth-recharge', icon: Phone, title: 'Mobile & DTH Recharge', desc: 'All operators & DTH recharge.', color: '#0A1F44', bg: '#E8EDF6' },
    { id: 'bbps', icon: Zap, title: 'BBPS', desc: 'Bharat Bill Payment System bills.', color: '#A855F7', bg: '#F3E8FF' },
    { id: 'ott-recharge', icon: Monitor, title: 'OTT Recharge', desc: 'Streaming subscriptions all platforms.', color: '#EC4899', bg: '#FCE4EC' },
  ],
};

// ── SERVICE-LEVEL MEGA MENU MAPPING ──

const serviceToCategoryKey = {};
categories.forEach(cat => {
  cat.services.forEach(s => {
    serviceToCategoryKey[s.id] = cat.key;
  });
});

export default function ProductsPage({ category, setCategory, navigate }) {
  const { theme, t } = useTheme();
  const isDark = theme === 'dark';
  const [selectedServiceId, setSelectedServiceId] = useState('digital-bank-account');
  const [showcaseId, setShowcaseId] = useState('digital-bank-account');
  const showcaseRef = useRef(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryServiceId, setEnquiryServiceId] = useState(null);

  // Determine parent category from selected service
  const getParentCategory = (serviceId) => {
    return serviceToCategoryKey[serviceId] || 'banking';
  };

  const parentCategoryKey = getParentCategory(selectedServiceId);
  const parentCategory = categories.find(c => c.key === parentCategoryKey) || categories[0];

  // When navigating from mega menu
  useEffect(() => {
    if (typeof category === 'string' && category.startsWith('service:')) {
      const id = category.split(':')[1];
      if (allServiceIds.includes(id)) {
        setSelectedServiceId(id);
        setShowcaseId(id);
        setTimeout(() => {
          if (showcaseRef.current) showcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }, [category]);

  // Handle service selection
  const handleServiceSelect = (serviceId) => {
    setSelectedServiceId(serviceId);
    setShowcaseId(serviceId);
    setTimeout(() => {
      if (showcaseRef.current) showcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Get service details
  const serviceDetail = allServices[selectedServiceId];
  const featureCards = serviceCards[selectedServiceId] || fallbackCards;
  const parentCategoryServices = categoryServiceMeta[parentCategoryKey] || categoryServiceMeta.banking;

  const showcaseIdx = showcaseId ? allServiceIds.indexOf(showcaseId) : 0;
  const isImageLeft = showcaseIdx % 2 === 0;

  return (
    <div style={{ minHeight: '100vh', background: t.bg, transition: 'background 0.3s' }}>
      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', padding: '52px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,107,0,0.1)' }} />
        <div className="container-xl">
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-7" style={{ color: '#fff' }}>
              <span style={{ display: 'inline-block', background: 'rgba(255,107,0,0.15)', color: '#FF8C33', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 14px', borderRadius: 20, marginBottom: 12 }}>
                {parentCategory.badge}
              </span>
              <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px,4vw,42px)', marginBottom: 12, marginTop: 8 }}>
                {serviceDetail ? serviceDetail.title : parentCategory.title}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 480 }}>
                {serviceDetail ? serviceDetail.desc.slice(0, 150) + '…' : parentCategory.subtitle}
              </p>
            </div>
            <div className="col-12 col-lg-5 d-none d-lg-block" style={{ maxHeight: 160, overflow: 'hidden' }}>
              <ServiceIllustration type={parentCategory.illustrationType} dark />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Service Tab Bar — shows ALL services from ALL categories */}
      <div style={{ background: t.bgCard, borderBottom: `1px solid ${t.border}`, position: 'sticky', top: 68, zIndex: 100, boxShadow: isDark ? '0 2px 12px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'all 0.3s' }}>
        <div className="container-xl">
          <div style={{ display: 'flex', gap: 6, padding: '12px 0', overflowX: 'auto' }}>
            {allServiceEntries.map(({ id, label, emoji, parentCategory }) => {
              const isSelected = selectedServiceId === id;
              const isInSameCategory = parentCategory === parentCategoryKey;
              return (
                <button
                  key={id}
                  onClick={() => handleServiceSelect(id)}
                  style={{
                    padding: '8px 16px', borderRadius: 10, border: '2px solid', cursor: 'pointer',
                    fontWeight: isInSameCategory ? 600 : 400, fontSize: 13, whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    background: isSelected ? '#FFF3E0' : 'transparent',
                    color: isSelected ? '#FF6B00' : t.textSub,
                    borderColor: isSelected ? '#FF6B00' : isInSameCategory ? `${t.border}` : 'transparent',
                    opacity: isInSameCategory || isSelected ? 1 : 0.5,
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{emoji}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-xl" style={{ padding: '48px 16px' }}>

        {/* ── SERVICE SHOWCASE SECTION ── */}
        <AnimatePresence mode="wait">
          {serviceDetail && (
            <motion.div
              ref={showcaseRef}
              key={selectedServiceId}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{ marginBottom: 56, padding: '48px 0', borderBottom: `1px solid ${t.border}` }}
            >
              <div className="row align-items-center g-0">
                <motion.div
                  className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-3 p-lg-4"
                  initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div className="position-relative w-100 d-flex align-items-center justify-content-center" style={{ maxWidth: 340 }}>
                    <div className="position-absolute" style={{ width: 260, height: 260, borderRadius: '50%', background: `${serviceDetail.accent}18`, filter: 'blur(50px)' }} />
                    <div className="position-relative d-flex align-items-center justify-content-center w-100" style={{ background: t.bgCard, borderRadius: 24, border: `1px solid ${t.cardBorder}`, boxShadow: '0 12px 40px rgba(0,0,0,0.1)', padding: '48px 24px' }}>
                      <ServiceIcon id={selectedServiceId} size={120} />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="col-12 col-lg-6 d-flex align-items-center"
                  initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                >
                  <div className="p-3 p-lg-4 w-100">
                    <motion.span
                      className="d-inline-block fw-semibold text-uppercase mb-3"
                      style={{ color: '#fff', fontSize: 11, letterSpacing: '1.5px', padding: '4px 14px', borderRadius: 20, background: serviceDetail.gradient }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      ThiruPay {parentCategory.label}
                    </motion.span>
                    <motion.h2
                      className="fw-black mb-3"
                      style={{ color: t.text, fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: 1.15 }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.25 }}
                    >
                      {serviceDetail.title}
                    </motion.h2>
                    <motion.p
                      className="mb-4"
                      style={{ color: t.textSub, fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                    >
                      {serviceDetail.desc}
                    </motion.p>
                    <motion.div
                      className="d-flex gap-3 flex-wrap"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <motion.button
                        className="btn fw-bold px-4 py-2 border-0"
                        style={{ background: serviceDetail.gradient, color: '#fff', borderRadius: 12, fontSize: 14, boxShadow: `0 4px 16px ${serviceDetail.accent}40` }}
                        whileHover={{ y: -2, boxShadow: `0 8px 24px ${serviceDetail.accent}50` }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setEnquiryServiceId(selectedServiceId); setEnquiryModalOpen(true); }}
                      >
                        Explore Now <i className="bi bi-arrow-right ms-1" />
                      </motion.button>
                      <motion.button
                        className="btn fw-bold px-4 py-2"
                        style={{ color: serviceDetail.accent, border: `2px solid ${serviceDetail.accent}40`, borderRadius: 12, fontSize: 14, background: 'transparent' }}
                        whileHover={{ y: -2, borderColor: serviceDetail.accent, background: `${serviceDetail.accent}08` }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('about')}
                      >
                        <i className="bi bi-chat-dots me-1" /> Contact Us
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SELECTED SERVICE FEATURE CARDS ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`features-${selectedServiceId}`}
            className="row g-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className="col-12 mb-3">
              <h3 style={{ color: t.text, fontWeight: 700, fontSize: 22 }}>{serviceDetail ? serviceDetail.title : ''} Features</h3>
              <p style={{ color: t.textSub, fontSize: 14 }}>Key features and benefits of {serviceDetail ? serviceDetail.title : ''}</p>
            </div>
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                  <div
                    style={{
                      background: t.bgCard, borderRadius: 18, padding: '28px 24px', height: '100%',
                      display: 'flex', flexDirection: 'column',
                      border: `2px solid ${t.cardBorder}`,
                      boxShadow: t.cardShadow,
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FF6B00'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = t.cardBorder; }}
                  >
                    <div style={{ width: 60, height: 60, borderRadius: 16, background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <Icon size={26} color={card.color} />
                    </div>
                    <h5 style={{ fontWeight: 700, color: t.text, marginBottom: 10, fontSize: 16 }}>{card.title}</h5>
                    <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.65, margin: 0, flex: 1 }}>{card.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── MORE IN [PARENT CATEGORY] NAVIGATION CARDS ── */}
        <div style={{ marginTop: 56, paddingTop: 48, borderTop: `1px solid ${t.border}` }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`nav-${parentCategoryKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="col-12 mb-4">
                <h3 style={{ color: t.text, fontWeight: 700, fontSize: 22 }}>
                  More in <span style={{ color: '#FF6B00' }}>{parentCategory.label}</span>
                </h3>
                <p style={{ color: t.textSub, fontSize: 14 }}>Explore other services in this category</p>
              </div>
              <div className="row g-4">
                {parentCategoryServices.map((service) => {
                  const Icon = service.icon;
                  const isActive = service.id === selectedServiceId;
                  return (
                    <div key={service.id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                      <div
                        onClick={() => handleServiceSelect(service.id)}
                        style={{
                          background: t.bgCard, borderRadius: 18, padding: '28px 24px', height: '100%',
                          display: 'flex', flexDirection: 'column',
                          border: `2px solid ${isActive ? '#FF6B00' : t.cardBorder}`,
                          boxShadow: isActive ? '0 4px 20px rgba(255,107,0,0.15)' : t.cardShadow,
                          cursor: 'pointer', transition: 'all 0.25s',
                        }}
                        onMouseEnter={e => { if (!isActive) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#FF6B00'; } }}
                        onMouseLeave={e => { if (!isActive) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = t.cardBorder; } }}
                      >
                        <div style={{ width: 60, height: 60, borderRadius: 16, background: service.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                          <Icon size={26} color={service.color} />
                        </div>
                        <h5 style={{ fontWeight: 700, color: t.text, marginBottom: 10, fontSize: 16 }}>{service.title}</h5>
                        <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.65, margin: 0, flex: 1 }}>{service.desc}</p>
                        <div style={{ marginTop: 16, color: '#FF6B00', fontWeight: 600, fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
                          {isActive ? 'Active' : 'View Service'} <span style={{ fontSize: 15 }}>{isActive ? '✓' : '→'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Banner */}
        <div style={{ marginTop: 56, background: 'linear-gradient(135deg,#0A1F44,#163A7A)', borderRadius: 22, padding: '44px 36px', textAlign: 'center', color: '#fff' }}>
          <h3 style={{ fontWeight: 800, marginBottom: 12, fontSize: 26 }}>Ready to start earning?</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 28, fontSize: 16 }}>Join 500,000+ merchants already earning with ThiruPay</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('login')} style={{ background: '#FF6B00', color: '#fff', border: 'none', borderRadius: 12, padding: '13px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Agent Login</button>
            <button onClick={() => navigate('download')} style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 12, padding: '13px 32px', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Download App</button>
          </div>
        </div>
      </div>
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        preselectedServiceId={enquiryServiceId}
      />
    </div>
  );
}

