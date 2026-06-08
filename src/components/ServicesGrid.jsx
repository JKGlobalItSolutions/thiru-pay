import { useEffect, useRef, useState } from 'react';
import {
  CreditCard, BarChart2, FileText, Fingerprint, ArrowRightLeft, Smartphone,
  UserPlus, Phone, Tv, Zap, Droplets, Flame, Play, Bus, Plane, Hotel,
  Shield, Banknote, TrendingUp,
} from 'lucide-react';

const categories = [
  {
    title: 'Banking Services',
    color: 'from-blue-500 to-blue-700',
    border: 'border-blue-500/20',
    glow: 'bg-blue-500/10',
    services: [
      { icon: CreditCard, name: 'AEPS Cash Withdrawal' },
      { icon: BarChart2, name: 'Balance Enquiry' },
      { icon: FileText, name: 'Mini Statement' },
      { icon: Fingerprint, name: 'Aadhaar Pay' },
      { icon: ArrowRightLeft, name: 'Money Transfer' },
      { icon: Smartphone, name: 'Micro ATM' },
      { icon: UserPlus, name: 'Account Opening' },
    ],
  },
  {
    title: 'Utility Services',
    color: 'from-emerald-500 to-teal-600',
    border: 'border-emerald-500/20',
    glow: 'bg-emerald-500/10',
    services: [
      { icon: Phone, name: 'Mobile Recharge' },
      { icon: Tv, name: 'DTH Recharge' },
      { icon: Zap, name: 'Electricity Bill' },
      { icon: Droplets, name: 'Water Bill' },
      { icon: Flame, name: 'Gas Bill Payment' },
      { icon: Play, name: 'OTT Subscription' },
    ],
  },
  {
    title: 'Travel Services',
    color: 'from-purple-500 to-purple-700',
    border: 'border-purple-500/20',
    glow: 'bg-purple-500/10',
    services: [
      { icon: Bus, name: 'Bus Booking' },
      { icon: Plane, name: 'Flight Booking' },
      { icon: Hotel, name: 'Hotel Booking' },
    ],
  },
  {
    title: 'Financial Services',
    color: 'from-orange-brand to-orange-light',
    border: 'border-orange-brand/20',
    glow: 'bg-orange-brand/10',
    services: [
      { icon: Shield, name: 'Insurance Premium' },
      { icon: Banknote, name: 'Loan Services' },
      { icon: TrendingUp, name: 'Credit Services' },
    ],
  },
];

export default function ServicesGrid() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 bg-navy-deep relative overflow-hidden" id="services">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="orb w-80 h-80 bg-blue-600/10 bottom-0 left-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef}>
          <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-orange-brand text-sm font-semibold uppercase tracking-widest mb-3">Our Services</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Complete Banking &{' '}
              <span className="gradient-text">Utility Ecosystem</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              One powerful platform delivering 20+ essential financial services to your customers.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {categories.map(({ title, color, border, glow, services }, ci) => (
              <div
                key={title}
                className={`glass rounded-2xl overflow-hidden border ${border} card-hover transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${ci * 120}ms` }}
              >
                {/* Header */}
                <div className={`bg-gradient-to-r ${color} px-5 py-4`}>
                  <h3 className="text-white font-bold text-sm">{title}</h3>
                </div>

                {/* Services list */}
                <div className="p-4 space-y-2">
                  {services.map(({ icon: Icon, name }) => (
                    <div
                      key={name}
                      className={`flex items-center gap-3 ${glow} hover:bg-white/8 rounded-xl px-3 py-2.5 transition-colors cursor-pointer group`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon size={14} className="text-white" />
                      </div>
                      <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}