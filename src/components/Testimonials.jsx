import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Murugan Selvam',
    role: 'Kirana Store Owner, Chennai',
    avatar: 'MS',
    rating: 5,
    quote: 'Using Thirupay AEPS services, I now earn over ₹70,000 every month. It has completely transformed my small shop into a banking hub. My customers trust me more than ever.',
    earnings: '₹70,000/mo',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: 'Priya Krishnamurthy',
    role: 'Medical Store Owner, Coimbatore',
    avatar: 'PK',
    rating: 5,
    quote: 'Customer footfall increased significantly after adding banking services. People now visit my store daily for money transfers and bill payments. Extra income every single day.',
    earnings: '₹45,000/mo',
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    name: 'Rajesh Patel',
    role: 'Mobile Shop Owner, Madurai',
    avatar: 'RP',
    rating: 5,
    quote: 'Easy onboarding and excellent support team. The Tamil language support made everything so comfortable. Thirupay team helped me set up everything within one day.',
    earnings: '₹55,000/mo',
    photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export default function Testimonials() {
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
    <section className="py-20 bg-navy-deep relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="orb w-80 h-80 bg-orange-brand/8 top-0 right-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef}>
          <div className={`text-center mb-14 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-orange-brand text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Success Stories from Our{' '}
              <span className="gradient-text">Partners</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Real merchants, real earnings, real impact across India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, rating, quote, earnings, photo }, i) => (
              <div
                key={name}
                className={`glass rounded-2xl p-6 card-hover border border-white/5 hover:border-orange-brand/20 flex flex-col transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                {/* Quote icon */}
                <Quote size={28} className="text-orange-brand/40 mb-4" />

                {/* Quote text */}
                <p className="text-white/75 text-sm leading-relaxed flex-1 mb-5">
                  "{quote}"
                </p>

                {/* Earnings badge */}
                <div className="inline-flex items-center gap-1.5 bg-orange-brand/15 border border-orange-brand/30 rounded-full px-3 py-1.5 mb-5 self-start">
                  <span className="text-orange-brand text-xs font-bold">{earnings}</span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={photo}
                    alt={name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-orange-brand/30"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = 'none';
                      if (el.nextElementSibling) el.nextElementSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-10 h-10 rounded-full bg-orange-gradient items-center justify-center text-white font-bold text-sm hidden flex-shrink-0">
                    {name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{name}</p>
                    <p className="text-white/45 text-xs">{role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: rating }).map((_, j) => (
                      <Star key={j} size={12} className="text-orange-brand fill-orange-brand" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}