import { useEffect, useRef, useState } from 'react';
import { Store, Users, Award, Activity, Clock, Zap } from 'lucide-react';

const badges = [
  { icon: Store, value: '500,000+', label: 'Merchant Outlets', color: 'from-orange-brand to-orange-light' },
  { icon: Users, value: '10,000+', label: 'Distributors', color: 'from-blue-500 to-blue-600' },
  { icon: Award, value: '2,490+', label: 'Super Distributors', color: 'from-emerald-500 to-emerald-600' },
  { icon: Activity, value: 'Millions+', label: 'Monthly Transactions', color: 'from-purple-500 to-purple-600' },
  { icon: Clock, value: '24x7', label: 'Service Availability', color: 'from-orange-brand to-orange-light' },
  { icon: Zap, value: 'T+0', label: 'Fast Settlement System', color: 'from-cyan-500 to-cyan-600' },
];

export default function TrustBadges() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-navy-deep relative overflow-hidden" id="about">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="text-center mb-10">
            <p className="text-orange-brand text-sm font-semibold uppercase tracking-widest mb-2">Our Reach</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Trusted Across <span className="gradient-text">India</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map(({ icon: Icon, value, label, color }, i) => (
              <div
                key={label}
                className={`glass rounded-2xl p-5 text-center card-hover transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-orange-sm`}>
                  <Icon size={22} className="text-white" />
                </div>
                <p className="text-white font-black text-xl leading-none mb-1">{value}</p>
                <p className="text-white/50 text-xs leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}