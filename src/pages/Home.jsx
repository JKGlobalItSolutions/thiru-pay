
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Store, Shield, Zap, Users, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import HeroIllustration from '../components/illustrations/HeroIllustration';
import ServicesSection from '../components/ServicesSection';

const serviceCategories = [
  { icon: '🏦', label: 'Banking Services', cat: 'banking', color: '#3B82F6' },
  { icon: '🛡️', label: 'Insurance', cat: 'insurance', color: '#EF4444' },
  { icon: '✈️', label: 'Travel Booking', cat: 'travel', color: '#22C55E' },
  { icon: '📱', label: 'Recharge & Bills', cat: 'utility', color: '#FF6B00' },
];

const stats = [
  { value: '500,000+', label: 'Merchant Outlets', icon: Store },
  { value: '10,000+', label: 'Distributors', icon: Users },
  { value: '2,490+', label: 'Super Distributors', icon: Shield },
  { value: '24x7', label: 'Service Availability', icon: Zap },
];

const services60 = [
  'AEPS Cash Withdrawal', 'Balance Enquiry', 'Mini Statement', 'Aadhaar Pay',
  'Money Transfer', 'Micro ATM', 'Account Opening', 'Mobile Recharge',
  'DTH Recharge', 'Electricity Bill', 'Water Bill', 'Gas Bill',
  'Bus Booking', 'Flight Booking', 'Hotel Booking', 'IRCTC Booking',
  'Health Insurance', 'Motor Insurance', 'Prepaid Cards', 'UPI Payment',
  'Loan Services', 'Investment', 'Soundbox', 'POS Terminal',
];

const partnerTiers = [
  { title: 'Become An Agent', earn: '₹25,000+/mo', desc: 'Start offering 60+ services from your shop with zero working capital. Earn on every transaction instantly.', accent: '#FF6B00' },
  { title: 'Become A Distributor', earn: '₹50,000+/mo', desc: 'Build your agent network and earn commissions on all transactions made by your agents.', accent: '#3B82F6' },
  { title: 'Master Distributor', earn: '₹1,00,000+/mo', desc: 'Manage a large network of distributors and agents. Earn up to 25% commission on total investment.', accent: '#22C55E' },
  { title: 'District Franchise', earn: '₹2,00,000+/mo', desc: "Own your district's ThiruPay operations. Highest earnings with exclusive territory rights.", accent: '#A855F7' },
];

// Particle component for background
function ParticleField({ mousePos }) {
  const particleCount = 30;
  const particles = useRef([]);
  
  if (particles.current.length === 0) {
    for (let i = 0; i < particleCount; i++) {
      particles.current.push({
        id: i,
        baseX: Math.random() * 100,
        baseY: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.3 + 0.1,
        opacity: Math.random() * 0.3 + 0.1,
        delay: Math.random() * 2,
      });
    }
  }

  return (
    <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {particles.current.map((p) => {
        const dx = mousePos.x ? (mousePos.x / window.innerWidth - 0.5) * 20 : 0;
        const dy = mousePos.y ? (mousePos.y / window.innerHeight - 0.5) * 20 : 0;
        return (
          <motion.div
            key={p.id}
            className="position-absolute rounded-circle"
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: 'rgba(255, 140, 51, 0.6)',
              left: `${p.baseX}%`,
              top: `${p.baseY}%`,
            }}
            animate={{
              x: [0, dx + Math.sin(Date.now() * 0.001 + p.id) * 10],
              y: [0, dy + Math.cos(Date.now() * 0.001 + p.id) * 10],
              opacity: [p.opacity, p.opacity * 0.5, p.opacity],
            }}
            transition={{
              duration: 3 + p.speed * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        );
      })}
    </div>
  );
}

// Floating fintech icons
function FloatingIcons() {
  const icons = [
    { icon: 'bi-credit-card', x: 10, y: 20, size: 18 },
    { icon: 'bi-shield-check', x: 85, y: 15, size: 22 },
    { icon: 'bi-graph-up-arrow', x: 92, y: 75, size: 16 },
    { icon: 'bi-arrow-left-right', x: 5, y: 70, size: 20 },
    { icon: 'bi-wallet2', x: 50, y: 5, size: 24 },
    { icon: 'bi-phone', x: 50, y: 92, size: 16 },
  ];

  return (
    <div className="position-absolute w-100 h-100" style={{ top: 0, left: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {icons.map((item, i) => (
        <motion.i
          key={i}
          className={`bi ${item.icon} position-absolute`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            fontSize: item.size,
            color: 'rgba(255, 140, 51, 0.15)',
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}

export default function Home({ navigate }) {
  const { theme, t } = useTheme();
  const isDark = theme === 'dark';
  const [hoveredTag, setHoveredTag] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showTagline, setShowTagline] = useState(false);
  const heroRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowTagline(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ background: t.bg, transition: 'background 0.3s' }}>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="position-relative d-flex align-items-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0A1F44 0%, #1a237e 50%, #0A1F44 100%)',
          overflow: 'hidden',
          paddingTop: 80,
          paddingBottom: 40,
        }}
      >
        {/* Gradient overlay orbs */}
        <div className="position-absolute" style={{ top: '10%', left: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div className="position-absolute" style={{ bottom: '5%', right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,50,255,0.1) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="position-absolute" style={{ top: '40%', right: '20%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />

        {/* Particles & Floating Icons */}
        <ParticleField mousePos={mousePos} />
        <FloatingIcons />

        {/* Content */}
        <div className="container-xl position-relative w-100">
          <div className="row align-items-center min-vh-100">
            <div className="col-12 col-lg-7 text-center text-lg-start">
              {/* Main Heading */}
              <AnimatePresence>
                {showTagline && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                  >
                    <h1 className="fw-bolder text-white mb-3" style={{ lineHeight: 1.1, fontSize: 'clamp(36px, 5.5vw, 68px)' }}>
                      The Future of{' '}
                      <span style={{ color: '#FF6B00', textShadow: '0 0 20px rgba(255,107,0,0.3)' }}>Digital Payments</span>
                    </h1>
                    <p className="text-white-50 mb-4" style={{ fontSize: 'clamp(15px, 1.6vw, 19px)', maxWidth: 520, lineHeight: 1.7 }}>
                      Fast, Secure & Seamless Payment Solutions for Modern Businesses
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Buttons */}
              {showTagline && (
                <motion.div
                  className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <button
                    onClick={() => navigate('products', 'banking')}
                    className="btn d-inline-flex align-items-center gap-2 px-4 py-3 fw-bold border-0"
                    style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C33)', color: '#fff', borderRadius: 12, fontSize: 15, boxShadow: '0 4px 20px rgba(255,107,0,0.4)' }}
                  >
                    Get Started <i className="bi bi-arrow-right" />
                  </button>
                  <button
                    onClick={() => navigate('about')}
                    className="btn d-inline-flex align-items-center gap-2 px-4 py-3 fw-bold"
                    style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 12, fontSize: 15, backdropFilter: 'blur(8px)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.borderColor = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
                  >
                    Contact Us <i className="bi bi-chat-dots" />
                  </button>
                </motion.div>
              )}

              {/* Trust indicators */}
              {showTagline && (
                <motion.div
                  className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {['Secure Transactions', 'Instant Settlement', '500K+ Merchants', 'Tamil Support'].map(tx => (
                    <div key={tx} className="d-flex align-items-center gap-2">
                      <i className="bi bi-check-circle-fill text-orange" style={{ fontSize: 14, color: '#FF6B00' }} />
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500 }}>{tx}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Hero illustration */}
            <div className="col-12 col-lg-5 d-flex justify-content-center justify-content-lg-end mt-5 mt-lg-0">
              <motion.div
                style={{ width: '100%', maxWidth: 400 }}
                initial={{ opacity: 0, x: 40 }}
                animate={showTagline ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <HeroIllustration dark />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        {showTagline && (
          <motion.div
            className="position-absolute start-50 translate-middle-x d-flex flex-column align-items-center gap-2"
            style={{ bottom: 24, opacity: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-white" style={{ fontSize: 11 }}>Scroll to explore</span>
            <div style={{ width: 5, height: 20, border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: 10, display: 'flex', justifyContent: 'center', padding: '1px 0' }}>
              <motion.div
                style={{ width: 2.5, height: 6, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 3 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        )}
      </section>

      {/* ── Stats bar ── */}
      <section style={{ background: isDark ? '#0A1F44' : '#0A1F44', padding: '24px 0' }}>
        <div className="container-xl">
          <div className="row g-3">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="col-6 col-md-3">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,107,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color="#FF6B00" />
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: 16, lineHeight: 1.2 }}>{value}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>{label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── One App, Multiple Services ── */}
      <section style={{ background: t.bgAlt, padding: '64px 0', transition: 'background 0.3s' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', background: t.sectionBadgeBg, color: t.sectionBadgeColor, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 14px', borderRadius: 20, marginBottom: 12 }}>Our Services</span>
            <h2 style={{ fontWeight: 800, color: t.text, fontSize: 'clamp(24px,3vw,36px)', marginBottom: 12 }}>One App. Multiple Services.</h2>
            <p style={{ color: t.textSub, maxWidth: 540, margin: '0 auto', fontSize: 16 }}>
              A great earning potential with minimal one-time investment. Join a family of more than 500,000 agents.
            </p>
          </div>
          <div className="row g-4 justify-content-center">
            {serviceCategories.map(({ icon, label, cat, color }) => (
              <div key={cat} className="col-6 col-md-3">
                <div
                  onClick={() => navigate('products', cat)}
                  style={{ background: t.bgCard, borderRadius: 20, padding: '32px 16px', textAlign: 'center', cursor: 'pointer', border: `2px solid ${t.cardBorder}`, boxShadow: t.cardShadow, transition: 'all 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.cardBorder; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ width: 72, height: 72, borderRadius: 20, background: `${color}18`, border: `2px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 32 }}>
                    {icon}
                  </div>
                  <div style={{ fontWeight: 700, color: t.text, fontSize: 15, marginBottom: 8 }}>{label}</div>
                  <div style={{ color: '#FF6B00', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
                    View Services <ChevronRight size={13} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 60+ Services tag cloud ── */}
      <section style={{ background: t.bg, padding: '64px 0', transition: 'background 0.3s' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <span style={{ display: 'inline-block', background: t.sectionBadgeBg, color: t.sectionBadgeColor, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 14px', borderRadius: 20, marginBottom: 12 }}>Complete Ecosystem</span>
            <h2 style={{ fontWeight: 800, color: t.text, fontSize: 'clamp(24px,3vw,36px)' }}>Banking & Digital Services</h2>
            <p style={{ color: t.textSub, marginTop: 10, maxWidth: 500, margin: '10px auto 0' }}>All services fully secured and RBI compliant.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
            {services60.map(s => (
              <span key={s} style={{
                background: hoveredTag === s ? '#FFF3E0' : t.tagBg,
                border: `1px solid ${hoveredTag === s ? '#FF6B00' : t.tagBorder}`,
                borderRadius: 24, padding: '8px 18px', fontSize: 14,
                color: hoveredTag === s ? '#FF6B00' : t.tagText,
                fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={() => setHoveredTag(s)}
                onMouseLeave={() => setHoveredTag(null)}
              >{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Detail Section ── */}
      <ServicesSection />

      {/* ── Benefits ── */}
      <section style={{ background: t.bgAlt, padding: '64px 0', transition: 'background 0.3s' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', background: t.sectionBadgeBg, color: t.sectionBadgeColor, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 14px', borderRadius: 20, marginBottom: 12 }}>Why Choose Us</span>
            <h2 style={{ fontWeight: 800, color: t.text, fontSize: 'clamp(24px,3vw,36px)' }}>Benefits of Joining ThiruPay</h2>
          </div>
          <div className="row g-4">
            {[
              { icon: '💰', title: 'Minimum Investment', desc: 'Start with minimal capital. Our platform and services require no working capital from your end.', accent: '#FF6B00' },
              { icon: '📦', title: '60+ Products & Services', desc: 'Serve your customers with a complete suite of 60+ digital banking and utility services.', accent: '#3B82F6' },
              { icon: '💸', title: 'Earn on Every Transaction', desc: 'Maximum commission structure — earn on AEPS, transfers, recharges, insurance and more.', accent: '#22C55E' },
              { icon: '⭐', title: 'Prestige & Loyalty', desc: 'Join a family of 500,000+ agents trusted by millions of customers across India.', accent: '#A855F7' },
            ].map(({ icon, title, desc, accent }) => (
              <div key={title} className="col-12 col-sm-6 col-lg-3">
                <div style={{ background: t.bgCard, borderRadius: 20, padding: '32px 24px', height: '100%', boxShadow: t.cardShadow, border: `1px solid ${t.cardBorder}`, borderLeftColor: accent, transition: 'all 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{icon}</div>
                  <h5 style={{ fontWeight: 700, color: t.text, marginBottom: 10 }}>{title}</h5>
                  <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner tiers ── */}
      <section style={{ background: t.bg, padding: '64px 0', transition: 'background 0.3s' }}>
        <div className="container-xl">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ display: 'inline-block', background: t.sectionBadgeBg, color: t.sectionBadgeColor, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 14px', borderRadius: 20, marginBottom: 12 }}>Join Us</span>
            <h2 style={{ fontWeight: 800, color: t.text, fontSize: 'clamp(24px,3vw,36px)' }}>Become a Part of ThiruPay</h2>
          </div>
          <div className="row g-4">
            {partnerTiers.map(({ title, earn, desc, accent }) => (
              <div key={title} className="col-12 col-sm-6 col-xl-3">
                <div style={{ background: t.bgCard, borderRadius: 20, overflow: 'hidden', boxShadow: t.cardShadow, border: `1px solid ${t.cardBorder}`, height: '100%', display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{ background: `${accent}15`, borderBottom: `1px solid ${accent}25`, padding: '24px 24px 20px' }}>
                    <h5 style={{ fontWeight: 700, color: t.text, marginBottom: 6 }}>{title}</h5>
                    <div style={{ fontWeight: 800, color: accent, fontSize: 22 }}>{earn}</div>
                  </div>
                  <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ color: t.textSub, fontSize: 14, lineHeight: 1.65, flex: 1 }}>{desc}</p>
                    <button onClick={() => navigate('login')} style={{ background: accent, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 0', fontWeight: 600, fontSize: 14, cursor: 'pointer', width: '100%', marginTop: 16, transition: 'opacity 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ background: 'linear-gradient(135deg,#FF6B00,#FF8C33)', padding: '56px 0' }}>
        <div className="container-xl" style={{ textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontWeight: 800, fontSize: 'clamp(24px,3vw,36px)', marginBottom: 12 }}>Ready to Start Your Digital Banking Business?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: 28, fontSize: 16 }}>Join India's fastest growing merchant banking network today.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('login')} style={{ background: '#0A1F44', color: '#fff', border: 'none', borderRadius: 12, padding: '14px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 4px 20px rgba(10,31,68,0.3)', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#163A7A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0A1F44')}
            >
              Agent Login
            </button>
            <button onClick={() => navigate('download')} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: '2px solid rgba(255,255,255,0.5)', borderRadius: 12, padding: '14px 32px', fontWeight: 700, fontSize: 15, cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
            >
              Download App
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}