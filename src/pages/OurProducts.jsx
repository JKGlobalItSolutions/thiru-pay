import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const products = [
  {
    id: 1,
    title: 'Biometric Device',
    description: 'The THIRUPAY Biometric Device delivers secure and reliable fingerprint authentication for Aadhaar Enabled Payment System (AEPS) transactions. Designed for retailers, banking correspondents, and financial service providers, it ensures fast identity verification, seamless customer onboarding, and secure digital banking operations while maintaining the highest standards of accuracy and compliance.',
    imagePosition: 'left',
    gradient: 'linear-gradient(135deg, #FF6B00, #FF8C33)',
    badgeColor: '#FF6B00',
  },
  {
    id: 2,
    title: 'Bluetooth Device',
    description: 'The THIRUPAY Bluetooth Device is a compact and efficient wireless solution built for modern businesses. With fast connectivity, stable performance, and easy integration, it enables merchants to process transactions effortlessly while ensuring convenience, mobility, and secure communication across payment operations.',
    imagePosition: 'right',
    gradient: 'linear-gradient(135deg, #1565C0, #1976D2)',
    badgeColor: '#1565C0',
  },
  {
    id: 3,
    title: 'Micro ATM',
    description: 'The THIRUPAY Micro ATM empowers merchants and banking partners to provide essential banking services anytime and anywhere. It supports cash withdrawal, balance enquiry, fund transfer, and mini statement services, helping businesses deliver a seamless banking experience while extending financial accessibility to customers.',
    imagePosition: 'left',
    gradient: 'linear-gradient(135deg, #2E7D32, #43A047)',
    badgeColor: '#2E7D32',
  },
];

function ProductImage({ product }) {
  const colors = {
    1: { primary: '#FF6B00', secondary: '#FF8C33', dark: '#CC5500' },
    2: { primary: '#1565C0', secondary: '#1976D2', dark: '#0D47A1' },
    3: { primary: '#2E7D32', secondary: '#43A047', dark: '#1B5E20' },
  };
  const c = colors[product.id];

  const svgs = {
    1: (
      <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', maxWidth: 280 }}>
        <defs>
          <linearGradient id="bg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0A1F44" /><stop offset="100%" stopColor="#163A7A" /></linearGradient>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={c.primary} /><stop offset="100%" stopColor={c.secondary} /></linearGradient>
          <filter id="shadow1"><feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={c.primary} floodOpacity="0.3" /></filter>
        </defs>
        {/* Device body */}
        <rect x="60" y="30" width="180" height="220" rx="20" fill="url(#bg1)" stroke={c.primary} strokeWidth="2" />
        {/* Screen */}
        <rect x="80" y="55" width="140" height="140" rx="10" fill="#0D2248" />
        {/* Fingerprint icon on screen */}
        <g transform="translate(135, 80)">
          <ellipse cx="15" cy="25" rx="14" ry="18" fill="none" stroke={c.primary} strokeWidth="2.5" opacity="0.6" />
          <path d="M5,15 Q15,5 25,15" fill="none" stroke={c.primary} strokeWidth="2" />
          <path d="M0,20 Q15,8 30,20" fill="none" stroke={c.secondary} strokeWidth="1.5" opacity="0.5" />
        </g>
        {/* Status bar */}
        <rect x="90" y="62" width="50" height="6" rx="3" fill={c.primary} opacity="0.7" />
        <rect x="150" y="62" width="55" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
        {/* Bottom button area */}
        <rect x="110" y="215" width="80" height="24" rx="12" fill="url(#grad1)" />
        <text x="150" y="231" fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">✓ VERIFIED</text>
        {/* LED indicator */}
        <circle cx="150" cy="15" r="6" fill={c.primary} filter="url(#shadow1)" />
        <circle cx="150" cy="15" r="3" fill="#fff" opacity="0.8" />
        {/* Side dots */}
        {[90, 130, 170].map(y => <circle key={y} cx="52" cy={y} r="2.5" fill={c.primary} opacity="0.4" />)}
        {[90, 130, 170].map(y => <circle key={y + 100} cx="248" cy={y} r="2.5" fill={c.primary} opacity="0.4" />)}
        {/* Bottom text */}
        <text x="150" y="265" fill={c.primary} fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Inter,sans-serif" opacity="0.7">STQC Certified</text>
      </svg>
    ),
    2: (
      <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', maxWidth: 280 }}>
        <defs>
          <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0A1F44" /><stop offset="100%" stopColor="#163A7A" /></linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={c.primary} /><stop offset="100%" stopColor={c.secondary} /></linearGradient>
          <filter id="shadow2"><feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={c.primary} floodOpacity="0.3" /></filter>
        </defs>
        {/* Device body */}
        <rect x="70" y="50" width="160" height="180" rx="24" fill="url(#bg2)" stroke={c.primary} strokeWidth="2" />
        {/* Screen */}
        <rect x="90" y="72" width="120" height="100" rx="12" fill="#0D2248" />
        {/* Bluetooth icon on screen */}
        <g transform="translate(128, 90)">
          <path d="M8,0 L8,36 M8,0 L20,12 L8,22 M8,36 L20,24 L8,14" fill="none" stroke={c.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* Signal waves */}
        {[115, 125, 135].map((x, i) => (
          <path key={i} d={`M${x},128 Q${x + 10 * (i + 1)},118 ${x},108`} fill="none" stroke={c.primary} strokeWidth="1.5" opacity={0.4 - i * 0.1} strokeLinecap="round" />
        ))}
        {/* Pairing button */}
        <rect x="110" y="192" width="80" height="26" rx="13" fill="url(#grad2)" />
        <text x="150" y="209" fill="#fff" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Inter,sans-serif">PAIR NOW</text>
        {/* Battery indicator */}
        <rect x="215" y="65" width="18" height="10" rx="2" fill="none" stroke={c.primary} strokeWidth="1.5" />
        <rect x="217" y="67" width="6" height="6" rx="1" fill={c.primary} opacity="0.8" />
        <rect x="224" y="67" width="6" height="6" rx="1" fill={c.primary} opacity="0.5" />
        {/* LED */}
        <circle cx="150" cy="35" r="5" fill={c.primary} filter="url(#shadow2)" />
        <circle cx="150" cy="35" r="2.5" fill="#fff" opacity="0.8" />
        {/* Bottom text */}
        <text x="150" y="265" fill={c.primary} fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Inter,sans-serif" opacity="0.7">Bluetooth 5.0 · 100m Range</text>
      </svg>
    ),
    3: (
      <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', maxWidth: 280 }}>
        <defs>
          <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0A1F44" /><stop offset="100%" stopColor="#163A7A" /></linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={c.primary} /><stop offset="100%" stopColor={c.secondary} /></linearGradient>
          <filter id="shadow3"><feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={c.primary} floodOpacity="0.3" /></filter>
        </defs>
        {/* Device body */}
        <rect x="50" y="25" width="200" height="230" rx="16" fill="url(#bg3)" stroke={c.primary} strokeWidth="2" />
        {/* Screen */}
        <rect x="70" y="45" width="160" height="120" rx="8" fill="#0D2248" />
        {/* Card icon on screen */}
        <rect x="95" y="65" width="110" height="40" rx="6" fill={c.primary} opacity="0.15" />
        <rect x="100" y="72" width="60" height="8" rx="4" fill={c.primary} opacity="0.5" />
        <rect x="100" y="84" width="80" height="6" rx="3" fill={c.primary} opacity="0.3" />
        <rect x="100" y="94" width="40" height="6" rx="3" fill={c.primary} opacity="0.3" />
        {/* Chip */}
        <rect x="175" y="70" width="20" height="18" rx="3" fill="#FFD700" opacity="0.6" />
        {/* Contactless icon */}
        <path d="M130,120 Q135,115 140,120" fill="none" stroke={c.primary} strokeWidth="2" strokeLinecap="round" />
        <path d="M126,116 Q135,108 144,116" fill="none" stroke={c.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        {/* Amount display */}
        <text x="150" y="145" fill="#fff" fontSize="14" fontWeight="800" textAnchor="middle" fontFamily="Inter,sans-serif">₹500</text>
        {/* Keypad buttons */}
        {[0, 1, 2].map(row => [0, 1, 2].map(col => {
          const kx = 85 + col * 45;
          const ky = 180 + row * 22;
          return <circle key={`${row}-${col}`} cx={kx} cy={ky} r="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />;
        }))}
        {/* Enter button */}
        <rect x="202" y="202" width="30" height="20" rx="6" fill={c.primary} />
        {/* LED */}
        <circle cx="150" cy="15" r="5" fill={c.primary} filter="url(#shadow3)" />
        <circle cx="150" cy="15" r="2.5" fill="#fff" opacity="0.8" />
        {/* Bottom text */}
        <text x="150" y="270" fill={c.primary} fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Inter,sans-serif" opacity="0.7">NPCI · AEPS Enabled</text>
      </svg>
    ),
  };

  return svgs[product.id];
}

function ProductRow({ product, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useTheme();
  const isImageLeft = product.imagePosition === 'left';

  const imageContent = (
    <motion.div
      className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-3 p-lg-4"
      initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isImageLeft ? -40 : 40 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <motion.div
        className="position-relative w-100 d-flex align-items-center justify-content-center"
        style={{ maxWidth: 340 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {/* Glow behind image */}
        <div
          className="position-absolute"
          style={{
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: `${product.badgeColor}15`,
            filter: 'blur(40px)',
          }}
        />
        {/* Image container */}
        <div
          className="position-relative d-flex align-items-center justify-content-center w-100"
          style={{
            background: t.bgCard,
            borderRadius: 24,
            border: `1px solid ${t.cardBorder}`,
            boxShadow: `0 12px 40px rgba(0,0,0,0.1)`,
            padding: '28px 20px',
          }}
        >
          <ProductImage product={product} />
        </div>
      </motion.div>
    </motion.div>
  );

  const contentContent = (
    <motion.div
      className="col-12 col-lg-6 d-flex align-items-center"
      initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isImageLeft ? 40 : -40 }}
      transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
    >
      <div className="p-3 p-lg-4 w-100">
        {/* Badge */}
        <motion.span
          className="d-inline-block fw-semibold text-uppercase mb-3"
          style={{
            color: '#fff',
            fontSize: 11,
            letterSpacing: '1.5px',
            padding: '4px 14px',
            borderRadius: 20,
            background: product.gradient,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Product 0{product.id}
        </motion.span>

        {/* Title */}
        <motion.h2
          className="fw-black mb-3"
          style={{ color: t.text, fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: 1.15 }}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          {product.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mb-4"
          style={{ color: t.textSub, fontSize: 15, lineHeight: 1.7, maxWidth: 480 }}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          {product.description}
        </motion.p>


        {/* CTA Buttons */}
        <motion.div
          className="d-flex gap-3 flex-wrap"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
        >
          <motion.button
            className="btn fw-bold px-4 py-2 border-0"
            style={{
              background: product.gradient,
              color: '#fff',
              borderRadius: 12,
              fontSize: 14,
              boxShadow: `0 4px 16px ${product.badgeColor}40`,
            }}
            whileHover={{ y: -2, boxShadow: `0 8px 24px ${product.badgeColor}50` }}
            whileTap={{ scale: 0.97 }}
          >
            Learn More <i className="bi bi-arrow-right ms-1" />
          </motion.button>
          <motion.button
            className="btn fw-bold px-4 py-2"
            style={{
              color: product.badgeColor,
              border: `2px solid ${product.badgeColor}40`,
              borderRadius: 12,
              fontSize: 14,
              background: 'transparent',
            }}
            whileHover={{ y: -2, borderColor: product.badgeColor, background: `${product.badgeColor}08` }}
            whileTap={{ scale: 0.97 }}
          >
            <i className="bi bi-chat-dots me-1" /> Enquire Now
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <div ref={ref} className="container-xl py-4 py-lg-5">
      <div className="row align-items-center g-0">
        {isImageLeft ? (
          <>
            {imageContent}
            {contentContent}
          </>
        ) : (
          <>
            {contentContent}
            {imageContent}
          </>
        )}
      </div>
    </div>
  );
}

export default function OurProducts() {
  const { t } = useTheme();
  const heroRef = useRef(null);

  return (
    <div style={{ background: t.bg, transition: 'background 0.3s' }}>
      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="position-relative d-flex align-items-center overflow-hidden"
        style={{
          minHeight: '45vh',
          background: 'linear-gradient(135deg, #0A1F44 0%, #1a237e 50%, #0A1F44 100%)',
          paddingTop: 100,
          paddingBottom: 60,
        }}
      >
        {/* Animated gradient orbs */}
        <motion.div
          className="position-absolute"
          style={{ top: '15%', left: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,0,0.12) 0%, transparent 70%)', filter: 'blur(40px)' }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="position-absolute"
          style={{ bottom: '10%', right: '15%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,50,255,0.12) 0%, transparent 70%)', filter: 'blur(50px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <div className="container-xl position-relative">
          <div className="row justify-content-center text-center">
            <div className="col-12 col-lg-8">
              <motion.span
                className="d-inline-block fw-semibold text-uppercase mb-3"
                style={{ color: '#FF8C33', fontSize: 13, letterSpacing: '2px' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                THIRUPAY PRODUCTS
              </motion.span>

              <motion.h1
                className="fw-black text-white mb-3"
                style={{ fontSize: 'clamp(36px, 5vw, 60px)', lineHeight: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Our Products
              </motion.h1>

              <motion.p
                className="text-white-50 mb-0 mx-auto"
                style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', maxWidth: 620, lineHeight: 1.7 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Empowering Businesses with Smart Payment Solutions
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Rows ── */}
      {products.map((product, index) => (
        <section
          key={product.id}
          style={{
            background: index % 2 === 0 ? t.bg : t.bgAlt,
            borderBottom: index < products.length - 1 ? `1px solid ${t.border}` : 'none',
          }}
        >
          <ProductRow product={product} index={index} />
        </section>
      ))}

      {/* ── CTA Section ── */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #0A1F44, #1a237e)' }}>
        <div className="container-xl py-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="fw-bold text-white mb-3" style={{ fontSize: 'clamp(24px, 3vw, 34px)' }}>
              Ready to Transform Your Business?
            </h2>
            <p className="text-white-50 mb-4 mx-auto" style={{ maxWidth: 520, fontSize: 16 }}>
              Get started with THIRUPAY products and join India's fastest growing merchant network.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              <motion.button
                className="btn fw-bold px-4 py-2 border-0"
                style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C33)', color: '#fff', borderRadius: 12, fontSize: 15 }}
                whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(255,107,0,0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started <i className="bi bi-arrow-right ms-1" />
              </motion.button>
              <motion.button
                className="btn fw-bold px-4 py-2"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', borderRadius: 12, fontSize: 15 }}
                whileHover={{ y: -2, background: 'rgba(255,255,255,0.18)' }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Sales <i className="bi bi-chat-dots ms-1" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}