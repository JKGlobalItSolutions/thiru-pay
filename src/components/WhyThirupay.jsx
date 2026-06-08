import { useEffect, useRef, useState } from 'react';
import { TrendingUp, IndianRupee, Zap, LayoutGrid, UserCheck, Globe } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Zero Investment Setup',
    desc: 'Start earning without large upfront investments. Get onboarded with minimal documentation.',
    color: 'from-orange-brand to-orange-light',
  },
  {
    icon: IndianRupee,
    title: 'High Commission Income',
    desc: 'Earn attractive commissions on every transaction — AEPS, transfers, recharges and more.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    desc: 'T+0 wallet settlements mean your earnings are available immediately after every transaction.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: LayoutGrid,
    title: 'Multiple Income Sources',
    desc: 'One platform, 20+ services. Maximize revenue from banking, recharges, travel and insurance.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: UserCheck,
    title: 'Easy KYC Activation',
    desc: 'Simple onboarding process with quick KYC verification. Go live within 24 hours.',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Globe,
    title: 'Regional Language Support',
    desc: 'Full support in Tamil, English and Hindi with dedicated regional support agents.',
    color: 'from-cyan-500 to-cyan-600',
  },
];

export default function WhyThirupay() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 bg-navy-royal/30 relative overflow-hidden" id="products">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="orb w-96 h-96 bg-orange-brand/8 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef}>
          <div
            className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <p className="text-orange-brand text-sm font-semibold uppercase tracking-widest mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Retailers Choose{' '}
              <span className="gradient-text">Thirupay</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto text-base">
              Everything you need to run a profitable digital banking outlet from your existing shop.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <div
                key={title}
                className={`glass rounded-2xl p-6 card-hover border border-white/5 hover:border-orange-brand/20 transition-all duration-500 group ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-orange-sm group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={26} className="text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}