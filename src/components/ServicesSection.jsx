import { useState } from 'react';
import {
  Fingerprint, CreditCard, BarChart2, ArrowRightLeft, Banknote, Smartphone,
  Phone, Tv, Zap, Droplets, Flame, Play,
  Heart, Car, ShoppingBag, Monitor, UserCheck,
  Train, Plane, Bus, Hotel,
  FileText, Receipt, Building2, Award,
  Wallet, CircleDollarSign, TrendingUp, PiggyBank, Gem,
  Globe, BadgeCheck, Layers
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const categories = [
  {
    id: 'banking',
    emoji: '🏦',
    title: 'Banking Services',
    desc: 'Transform your retail outlet into a trusted digital banking center and earn commissions on every transaction.',
    highlight: 'Secure Banking | Instant Settlement | Daily Earnings',
    accentColor: '#1565C0',
    gradientFrom: '#1565C0',
    gradientTo: '#1976D2',
    services: [
      { icon: Fingerprint, name: 'AEPS Cash Withdrawal' },
      { icon: BarChart2, name: 'Balance Enquiry' },
      { icon: FileText, name: 'Mini Statement' },
      { icon: Smartphone, name: 'Aadhaar Pay' },
      { icon: ArrowRightLeft, name: 'Domestic Money Transfer' },
      { icon: Banknote, name: 'Micro ATM Withdrawal' },
    ],
  },
  {
    id: 'utility',
    emoji: '⚡',
    title: 'Utility & Bill Payments',
    desc: 'Offer everyday payment services to customers and generate recurring income from your shop.',
    highlight: 'Fast Payments | Multiple Operators | Real-Time Processing',
    accentColor: '#FF6B00',
    gradientFrom: '#FF6B00',
    gradientTo: '#FF8C33',
    services: [
      { icon: Phone, name: 'Mobile Recharge' },
      { icon: Tv, name: 'DTH Recharge' },
      { icon: Layers, name: 'BBPS Bill Payments' },
      { icon: Zap, name: 'Electricity Bill Payment' },
      { icon: Droplets, name: 'Water Bill Payment' },
      { icon: Flame, name: 'Gas Bill Payment' },
      { icon: Play, name: 'OTT Recharge & Subscription' },
    ],
  },
  {
    id: 'insurance',
    emoji: '🛡️',
    title: 'Insurance Services',
    desc: 'Provide affordable insurance solutions and help customers protect their health, vehicles, businesses, and devices.',
    highlight: 'Trusted Insurance Partners | Easy Policy Issuance',
    accentColor: '#C62828',
    gradientFrom: '#C62828',
    gradientTo: '#D32F2F',
    services: [
      { icon: Heart, name: 'Health Insurance' },
      { icon: Car, name: 'Motor Insurance' },
      { icon: ShoppingBag, name: 'Shop Insurance' },
      { icon: Monitor, name: 'Device Insurance' },
      { icon: UserCheck, name: 'Personal Accident Insurance' },
    ],
  },
  {
    id: 'travel',
    emoji: '✈️',
    title: 'Travel Services',
    desc: 'Become a one-stop destination for travel bookings and ticketing services while earning attractive commissions.',
    highlight: 'Instant Booking | Nationwide Travel Services',
    accentColor: '#2E7D32',
    gradientFrom: '#2E7D32',
    gradientTo: '#388E3C',
    services: [
      { icon: Train, name: 'IRCTC Train Ticket Booking' },
      { icon: Plane, name: 'Flight Booking' },
      { icon: Bus, name: 'Bus Booking' },
      { icon: Hotel, name: 'Hotel Booking' },
    ],
  },
  {
    id: 'egovernance',
    emoji: '🏛️',
    title: 'E-Governance Services',
    desc: 'Help customers access essential government and compliance services directly from your outlet.',
    highlight: 'Quick Processing | Digital Documentation Support',
    accentColor: '#6A1B9A',
    gradientFrom: '#6A1B9A',
    gradientTo: '#7B1FA2',
    services: [
      { icon: CreditCard, name: 'PAN Card Application' },
      { icon: Receipt, name: 'Income Tax Return (ITR) Filing' },
      { icon: Building2, name: 'GST Registration' },
      { icon: Award, name: 'MSME Registration' },
    ],
  },
  {
    id: 'neobanking',
    emoji: '💳',
    title: 'Neo Banking Services',
    desc: 'Deliver next-generation digital banking solutions with seamless onboarding and payment experiences.',
    highlight: 'Modern Banking | Instant Account Activation',
    accentColor: '#0288D1',
    gradientFrom: '#0288D1',
    gradientTo: '#0277BD',
    services: [
      { icon: Wallet, name: 'Digital Bank Account Opening' },
      { icon: CreditCard, name: 'Physical Debit Card' },
      { icon: Globe, name: 'UPI Payment Services' },
      { icon: Smartphone, name: 'Digital Banking Solutions' },
    ],
  },
  {
    id: 'loans',
    emoji: '💰',
    title: 'Loans & Investment Services',
    desc: 'Connect customers with trusted financial products and create additional earning opportunities.',
    highlight: 'Easy Eligibility | Fast Approval | Trusted Financial Partners',
    accentColor: '#00695C',
    gradientFrom: '#00695C',
    gradientTo: '#00796B',
    services: [
      { icon: CircleDollarSign, name: 'Personal Loans' },
      { icon: Building2, name: 'Business Loans' },
      { icon: Gem, name: 'Gold Loans' },
      { icon: TrendingUp, name: 'Investment Products' },
      { icon: PiggyBank, name: 'Wealth Building Solutions' },
    ],
  },
];

function ServiceCard({ cat, isActive, onClick }) {
  const { t } = useTheme();

  return (
    <div
      onClick={onClick}
      style={{
        background: isActive
          ? `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})`
          : t.bgCard,
        borderRadius: 20,
        padding: '28px 24px',
        border: isActive ? 'none' : `1px solid ${t.cardBorder}`,
        boxShadow: isActive
          ? `0 8px 32px ${cat.accentColor}40`
          : t.cardShadow,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.borderColor = cat.accentColor;
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = `0 12px 40px ${cat.accentColor}28`;
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.borderColor = t.cardBorder;
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = t.cardShadow;
        }
      }}
    >
      {/* Background decoration for active */}
      {isActive && (
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', pointerEvents: 'none' }} />
      )}

      {/* Emoji icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: isActive ? 'rgba(255,255,255,0.2)' : `${cat.accentColor}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 14, fontSize: 24,
      }}>
        {cat.emoji}
      </div>

      <h4 style={{
        fontWeight: 700, fontSize: 15,
        color: isActive ? '#FFFFFF' : t.text,
        marginBottom: 6, lineHeight: 1.3,
      }}>
        {cat.title}
      </h4>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 600,
          color: isActive ? 'rgba(255,255,255,0.8)' : cat.accentColor,
        }}>
          {cat.services.length} Services
        </span>
        <span style={{ color: isActive ? 'rgba(255,255,255,0.5)' : t.textMuted, fontSize: 12 }}>→</span>
      </div>
    </div>
  );
}

function ServiceDetailPanel({ cat }) {
  const { t } = useTheme();

  return (
    <div style={{
      background: t.bgCard,
      borderRadius: 24,
      border: `1px solid ${t.cardBorder}`,
      boxShadow: t.cardShadow,
      overflow: 'hidden',
      transition: 'all 0.3s',
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})`,
        padding: '32px 36px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: '40%', width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.emoji}</div>
          <h3 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(20px,2.5vw,26px)', marginBottom: 10 }}>{cat.title}</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.65, marginBottom: 16, maxWidth: 520 }}>{cat.desc}</p>
          {/* Highlight pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {cat.highlight.split(' | ').map(h => (
              <span key={h} style={{
                background: 'rgba(255,255,255,0.18)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: 12,
                color: '#fff',
                fontWeight: 600,
              }}>
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div style={{ padding: '28px 32px' }}>
        <p style={{ color: t.textMuted, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 18 }}>
          Available Services
        </p>
        <div className="row g-3">
          {cat.services.map(({ icon: Icon, name }) => (
            <div key={name} className="col-12 col-sm-6 col-lg-4">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: t.bgAlt,
                border: `1px solid ${t.border}`,
                borderRadius: 14, padding: '14px 16px',
                transition: 'all 0.2s', cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = cat.accentColor;
                  e.currentTarget.style.background = `${cat.accentColor}10`;
                  e.currentTarget.style.transform = 'translateX(3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = t.border;
                  e.currentTarget.style.background = t.bgAlt;
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 12,
                  background: `${cat.accentColor}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={18} color={cat.accentColor} />
                </div>
                <span style={{ fontWeight: 600, color: t.text, fontSize: 14, lineHeight: 1.3 }}>{name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Earn badge */}
        <div style={{
          marginTop: 24,
          background: `${cat.accentColor}10`,
          border: `1px solid ${cat.accentColor}30`,
          borderRadius: 14,
          padding: '14px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${cat.accentColor}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <BadgeCheck size={18} color={cat.accentColor} />
          </div>
          <div>
            <span style={{ color: cat.accentColor, fontWeight: 700, fontSize: 13 }}>Earn commissions </span>
            <span style={{ color: t.textSub, fontSize: 13 }}>on every {cat.title.toLowerCase()} transaction. Instant settlement to your ThiruPay wallet.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const { t } = useTheme();
  const [activeId, setActiveId] = useState(categories[0].id);
  const activeCategory = categories.find(c => c.id === activeId);

  return (
    <section style={{ background: t.bg, padding: '80px 0', transition: 'background 0.3s' }}>
      <div className="container-xl">
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            display: 'inline-block',
            background: t.sectionBadgeBg,
            color: t.sectionBadgeColor,
            fontSize: 12, fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            padding: '5px 16px', borderRadius: 20, marginBottom: 16,
          }}>
            60+ Services
          </span>
          <h2 style={{
            fontWeight: 800, color: t.text,
            fontSize: 'clamp(26px,3.5vw,40px)',
            marginBottom: 16, lineHeight: 1.2,
          }}>
            Complete Financial, Utility &{' '}
            <span style={{ color: '#FF6B00' }}>Digital Services</span> Platform
          </h2>
          <p style={{
            color: t.textSub, maxWidth: 680, margin: '0 auto',
            fontSize: 16, lineHeight: 1.75,
          }}>
            Empower your shop with banking, insurance, travel, e-governance, and financial services — all from a single ThiruPay platform while creating multiple streams of income and serving your customers better.
          </p>
        </div>

        <div className="row g-4">
          {/* Left — category selector */}
          <div className="col-12 col-lg-4">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {categories.map(cat => (
                <ServiceCard
                  key={cat.id}
                  cat={cat}
                  isActive={activeId === cat.id}
                  onClick={() => setActiveId(cat.id)}
                />
              ))}
            </div>

            {/* Total services summary */}
            <div style={{
              marginTop: 16,
              background: 'linear-gradient(135deg,#0A1F44,#163A7A)',
              borderRadius: 18, padding: '20px 22px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,107,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 22 }}>🚀</span>
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>
                  {categories.reduce((sum, c) => sum + c.services.length, 0)}+ Services
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>Across 7 categories</div>
              </div>
            </div>
          </div>

          {/* Right — detail panel */}
          <div className="col-12 col-lg-8">
            <ServiceDetailPanel cat={activeCategory} />
          </div>
        </div>
      </div>
    </section>
  );
}