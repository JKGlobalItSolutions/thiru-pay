import { useEffect, useRef, useState } from 'react';
import { Calculator, IndianRupee, TrendingUp } from 'lucide-react';

const shopTypes = ['Kirana Store', 'Medical Store', 'Mobile Store', 'Retail Store'];

const earningsData = {
  'Kirana Store': { aeps: 25000, transfer: 30000, recharge: 10000, bills: 8000, travel: 12000 },
  'Medical Store': { aeps: 20000, transfer: 15000, recharge: 5000, bills: 12000, travel: 8000 },
  'Mobile Store': { aeps: 15000, transfer: 25000, recharge: 18000, bills: 5000, travel: 10000 },
  'Retail Store': { aeps: 22000, transfer: 28000, recharge: 12000, bills: 10000, travel: 14000 },
};

const earningItems = [
  { key: 'aeps', label: 'AEPS Income', color: 'bg-blue-500' },
  { key: 'transfer', label: 'Money Transfer', color: 'bg-emerald-500' },
  { key: 'recharge', label: 'Recharge', color: 'bg-purple-500' },
  { key: 'bills', label: 'Bill Payments', color: 'bg-orange-brand' },
  { key: 'travel', label: 'Travel Bookings', color: 'bg-cyan-500' },
];

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

export default function EarningsCalculator() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState('Kirana Store');

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

  const data = earningsData[selectedShop];
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const maxVal = Math.max(...Object.values(data));

  return (
    <section className="py-20 bg-navy-deep relative overflow-hidden" id="partner">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="orb w-96 h-96 bg-orange-brand/10 bottom-0 right-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef}>
          <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-orange-brand text-sm font-semibold uppercase tracking-widest mb-3">Earnings Potential</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Calculate Your{' '}
              <span className="gradient-text">Monthly Income</span>
            </h2>
            <p className="text-white/50 max-w-lg mx-auto">
              Select your shop type to see estimated monthly earnings across all services.
            </p>
          </div>

          <div className={`glass rounded-3xl p-6 sm:p-8 border border-white/10 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Shop type selector */}
            <div className="mb-8">
              <p className="text-white/60 text-sm mb-3 font-medium">Select your shop type:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {shopTypes.map((shop) => (
                  <button
                    key={shop}
                    onClick={() => setSelectedShop(shop)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      selectedShop === shop
                        ? 'bg-orange-gradient text-white shadow-orange-sm'
                        : 'glass text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {shop}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {/* Breakdown bars */}
              <div className="space-y-4">
                <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <Calculator size={16} className="text-orange-brand" />
                  Monthly Breakdown
                </h4>
                {earningItems.map(({ key, label, color }) => {
                  const val = data[key];
                  const pct = Math.round((val / maxVal) * 100);
                  return (
                    <div key={key}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-white/70 text-xs font-medium">{label}</span>
                        <span className="text-white text-xs font-bold">{formatINR(val)}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-2 ${color} rounded-full transition-all duration-700`}
                          style={{ width: visible ? `${pct}%` : '0%' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total card */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-orange-brand/20 rounded-3xl blur-[30px]" />
                  <div className="relative bg-orange-gradient rounded-3xl p-8 text-center shadow-orange-glow">
                    <IndianRupee size={32} className="text-white/80 mx-auto mb-2" />
                    <p className="text-white/80 text-sm mb-1">Potential Monthly Income</p>
                    <p className="text-white font-black text-5xl leading-none">
                      {formatINR(total)}
                    </p>
                    <p className="text-white/70 text-sm mt-2">+</p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <TrendingUp size={16} className="text-white/80" />
                      <span className="text-white/80 text-xs">Grows with your network</span>
                    </div>
                  </div>
                </div>

                <p className="text-white/40 text-xs text-center mt-4 max-w-[200px]">
                  Estimates based on average merchant performance. Actual earnings may vary.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}