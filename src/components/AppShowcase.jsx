import { useEffect, useRef, useState } from 'react';
import { Wallet, BarChart2, FileText, Bell, TrendingUp, Activity } from 'lucide-react';

const appFeatures = [
  { icon: Wallet, title: 'Real-Time Wallet Tracking', desc: 'Monitor your balance and earnings live as every transaction settles instantly.' },
  { icon: BarChart2, title: 'Commission Dashboard', desc: 'Visual breakdown of your earnings across all service categories.' },
  { icon: FileText, title: 'Transaction History', desc: 'Complete audit trail with filters, export options and GST reports.' },
  { icon: Bell, title: 'Instant Notifications', desc: 'Push alerts for every transaction, settlement and important update.' },
  { icon: TrendingUp, title: 'Settlement Reports', desc: 'Automated daily and monthly settlement reports directly to your app.' },
  { icon: Activity, title: 'Business Analytics', desc: 'Deep insights into peak hours, top services and growth trends.' },
];

const screens = [
  {
    label: 'Dashboard',
    color: 'from-orange-brand to-orange-light',
    rows: ['Wallet: ₹1,24,850', 'Today: +₹3,240', 'Transactions: 48', 'Commission: ₹892'],
  },
  {
    label: 'AEPS',
    color: 'from-blue-500 to-blue-700',
    rows: ['Aadhaar: ****4521', 'Amount: ₹5,000', 'Bank: SBI', 'Status: Success'],
  },
  {
    label: 'Earnings',
    color: 'from-emerald-500 to-teal-600',
    rows: ['AEPS: ₹25,000', 'Transfer: ₹30,000', 'Recharge: ₹10,000', 'Total: ₹85,000+'],
  },
];

export default function AppShowcase() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeScreen, setActiveScreen] = useState(0);

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

  useEffect(() => {
    const timer = setInterval(() => setActiveScreen((s) => (s + 1) % screens.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-navy-royal/20 relative overflow-hidden" id="products">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="orb w-96 h-96 bg-orange-brand/8 top-10 left-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef}>
          <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-orange-brand text-sm font-semibold uppercase tracking-widest mb-3">Mobile App</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything Managed from One{' '}
              <span className="gradient-text">Powerful App</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Phone display */}
            <div className={`flex justify-center transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 bg-orange-brand/25 rounded-full blur-[60px]" />
                </div>
                {/* Phone */}
                <div className="relative w-56 h-[460px] bg-gradient-to-b from-navy-royal to-navy-deep rounded-[40px] border-2 border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden">
                  <div className={`bg-gradient-to-r ${screens[activeScreen].color} px-5 pt-10 pb-6`}>
                    <div className="w-16 h-3 bg-black rounded-full mx-auto mb-4" />
                    <p className="text-white font-bold text-sm">{screens[activeScreen].label}</p>
                    <p className="text-white/70 text-xs">ThiruPay Agent</p>
                  </div>
                  <div className="p-4 space-y-3">
                    {screens[activeScreen].rows.map((row, i) => (
                      <div key={i} className="glass rounded-xl px-4 py-3">
                        <p className="text-white/80 text-xs font-medium">{row}</p>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-4">
                      {screens.map((_, i) => (
                        <div
                          key={i}
                          onClick={() => setActiveScreen(i)}
                          className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${i === activeScreen ? 'bg-orange-brand w-6' : 'bg-white/20 w-3'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature list */}
            <div className={`transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="space-y-4">
                {appFeatures.map(({ icon: Icon, title, desc }, i) => (
                  <div
                    key={title}
                    className={`flex items-start gap-4 glass rounded-2xl p-4 card-hover border border-white/5 hover:border-orange-brand/20 transition-all duration-400 ${
                      visible ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ transitionDelay: `${300 + i * 80}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-gradient flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-1">{title}</h4>
                      <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}