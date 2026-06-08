import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 500000, suffix: '+', label: 'Merchant Outlets', color: 'text-orange-brand' },
  { value: 10000, suffix: '+', label: 'Distributors', color: 'text-blue-400' },
  { value: 2490, suffix: '+', label: 'Super Distributors', color: 'text-emerald-400' },
  { value: 50, suffix: 'M+', label: 'Transactions Processed', color: 'text-purple-400' },
];

function StatCard({ value, suffix, label, color, start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    const duration = 2000;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [value, start]);

  function formatCount(n) {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(0) + 'K';
    return n.toLocaleString('en-IN');
  }

  return (
    <div className="glass rounded-2xl p-8 text-center card-hover border border-white/5 hover:border-orange-brand/20">
      <p className={`font-black text-5xl mb-3 ${color}`}>
        {formatCount(count)}{suffix}
      </p>
      <p className="text-white/60 font-medium">{label}</p>
    </div>
  );
}

export default function GrowthStats() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 bg-navy-royal/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="orb w-96 h-96 bg-blue-600/10 top-0 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef}>
          <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-orange-brand text-sm font-semibold uppercase tracking-widest mb-3">Our Impact</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              India's Fast Growing{' '}
              <span className="gradient-text">Digital Banking Network</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <StatCard {...stat} start={visible} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}