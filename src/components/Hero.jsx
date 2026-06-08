import { motion } from 'framer-motion';
import { ArrowRight, Download, Shield, Zap, Users, Headphones } from 'lucide-react';

const trustItems = [
  { icon: Shield, label: 'Secure Transactions' },
  { icon: Zap, label: 'Instant Settlement' },
  { icon: Users, label: '500,000+ Merchants' },
  { icon: Headphones, label: 'Dedicated Tamil Support' },
];

/* ── Floating card data ── */
const floatingCards = [
  {
    id: 1,
    position: 'absolute top-8 -left-4 lg:-left-16',
    width: 'w-36',
    label: 'Monthly Commission',
    value: '₹85,000+',
    valueClass: 'text-orange-brand font-bold text-base',
    extra: (
      <div className="mt-1.5 h-1 bg-white/10 rounded-full">
        <div className="h-1 bg-orange-gradient rounded-full w-4/5" />
      </div>
    ),
    animate: { y: [0, -15, 0] },
    duration: 4,
  },
  {
    id: 2,
    position: 'absolute top-24 -right-4 lg:-right-16',
    width: 'w-32',
    label: 'Transactions Today',
    value: '1,248',
    valueClass: 'text-white font-bold text-sm',
    extra: <p className="text-green-400 text-[9px] mt-0.5">+12.4% vs yesterday</p>,
    animate: { y: [0, 10, 0] },
    duration: 5,
  },
  {
    id: 3,
    position: 'absolute bottom-28 -left-4 lg:-left-14',
    width: 'w-36',
    label: 'Live AEPS',
    labelExtra: (
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <p className="text-white/50 text-[9px]">Live AEPS</p>
      </div>
    ),
    value: '₹12,400',
    valueClass: 'text-white font-bold text-sm',
    extra: <p className="text-white/40 text-[9px]">Active now</p>,
    animate: { y: [0, -20, 0] },
    duration: 6,
  },
  {
    id: 4,
    position: 'absolute bottom-16 -right-4 lg:-right-12',
    width: 'w-32',
    label: 'Settlement',
    value: null,
    valueClass: '',
    extra: (
      <>
        <div className="flex items-center gap-1 mt-1">
          <Zap size={10} className="text-orange-brand" />
          <p className="text-green-400 text-[10px] font-semibold">Instant</p>
        </div>
        <p className="text-white/60 text-[9px] mt-0.5">T+0 Guarantee</p>
      </>
    ),
    animate: { y: [0, 12, 0] },
    duration: 7,
  },
];

/* ── Phone Mockup with Framer Motion ── */
function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Background glow orbs — premium fintech atmosphere */}
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,0,0.15) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(22,58,122,0.3) 0%, transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Subtle floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-orange-brand/20"
          style={{
            width: 4 + i * 1.5,
            height: 4 + i * 1.5,
            left: `${15 + i * 14}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -(10 + i * 5), 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Phone frame with Framer Motion float + hover */}
      <motion.div
        className="relative z-10 w-64 h-[520px] bg-gradient-to-b from-navy-royal to-navy-deep rounded-[44px] border-2 border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col cursor-pointer"
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.03, transition: { duration: 0.4, ease: 'easeOut' } }}
        style={{ willChange: 'transform' }}
      >
        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <span className="text-white/60 text-xs">9:41</span>
          <div className="w-20 h-5 bg-black rounded-full" />
          <div className="flex gap-1">
            <div className="w-3 h-1.5 bg-white/60 rounded-sm" />
            <div className="w-1 h-1.5 bg-white/60 rounded-sm" />
          </div>
        </div>

        {/* App header */}
        <div className="px-4 pb-3 pt-1 flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs">Welcome back</p>
            <p className="text-white font-bold text-sm">Rajan Kumar</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-orange-brand/30 border border-orange-brand/50 flex items-center justify-center">
            <span className="text-orange-brand font-bold text-xs">RK</span>
          </div>
        </div>

        {/* Wallet balance card */}
        <div className="mx-3 rounded-2xl bg-orange-gradient p-4 shadow-orange-sm">
          <p className="text-white/80 text-xs mb-1">Wallet Balance</p>
          <p className="text-white font-bold text-2xl">₹1,24,850</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-white/70 text-xs">Today's Earnings:</span>
            <span className="text-white text-xs font-semibold">+₹3,240</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="px-3 mt-3 grid grid-cols-4 gap-2">
          {[
            { label: 'AEPS', color: 'bg-blue-500/20', dot: 'bg-blue-400' },
            { label: 'Transfer', color: 'bg-green-500/20', dot: 'bg-green-400' },
            { label: 'Recharge', color: 'bg-purple-500/20', dot: 'bg-purple-400' },
            { label: 'Bills', color: 'bg-orange-brand/20', dot: 'bg-orange-brand' },
          ].map((item) => (
            <div key={item.label} className={`${item.color} rounded-xl p-2 flex flex-col items-center gap-1`}>
              <div className={`w-2 h-2 rounded-full ${item.dot}`} />
              <span className="text-white/70 text-[9px] text-center leading-tight">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Recent transactions */}
        <div className="px-3 mt-3 flex-1">
          <p className="text-white/50 text-xs mb-2 font-medium">Recent Transactions</p>
          <div className="space-y-2">
            {[
              { name: 'AEPS Withdrawal', amt: '+₹850', time: '2 min', color: 'text-green-400' },
              { name: 'Mobile Recharge', amt: '+₹15', time: '8 min', color: 'text-green-400' },
              { name: 'Bill Payment', amt: '+₹28', time: '15 min', color: 'text-green-400' },
            ].map((tx) => (
              <div key={tx.name} className="flex items-center justify-between glass rounded-lg px-3 py-2">
                <div>
                  <p className="text-white/80 text-[10px] font-medium">{tx.name}</p>
                  <p className="text-white/40 text-[9px]">{tx.time} ago</p>
                </div>
                <span className={`${tx.color} text-xs font-bold`}>{tx.amt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom nav */}
        <div className="flex items-center justify-around px-4 py-3 border-t border-white/10 mt-2">
          {['Home', 'History', 'Earn', 'Profile'].map((item, i) => (
            <div key={item} className="flex flex-col items-center gap-0.5">
              <div className={`w-4 h-4 rounded-sm ${i === 0 ? 'bg-orange-brand' : 'bg-white/20'}`} />
              <span className={`text-[8px] ${i === 0 ? 'text-orange-brand' : 'text-white/40'}`}>{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating fintech cards with Framer Motion */}
      {floatingCards.map((card) => (
        <motion.div
          key={card.id}
          className={`${card.position} z-20`}
          animate={card.animate}
          transition={{
            duration: card.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          whileHover={{
            y: -6,
            boxShadow: '0 12px 40px rgba(255, 107, 0, 0.25)',
            transition: { duration: 0.3, ease: 'easeOut' },
          }}
          style={{ willChange: 'transform' }}
        >
          <div className={`glass rounded-2xl p-3 shadow-glass-dark ${card.width} transition-shadow duration-300`}>
            {card.labelExtra ? card.labelExtra : <p className="text-white/50 text-[9px] mb-1">{card.label}</p>}
            {card.value && <p className={card.valueClass}>{card.value}</p>}
            {card.extra}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-hero-gradient bg-grid-pattern flex items-center pt-20 pb-16 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-orange-brand/10 -top-32 -right-32" />
      <div className="orb w-[400px] h-[400px] bg-navy-royal/80 bottom-0 -left-32" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass border border-orange-brand/30 rounded-full px-4 py-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-orange-brand animate-pulse" />
              <span className="text-orange-light text-sm font-medium">
                India's Trusted Digital Banking Network
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Make Your Shop a{' '}
              <span className="gradient-text">Mini ATM</span>{' '}
              with Thirupay
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-white/70 leading-relaxed mb-5 max-w-xl mx-auto lg:mx-0">
              Transform your existing retail shop into a complete digital banking center and earn additional income through AEPS, Money Transfer, Recharge, Bill Payments and Financial Services.
            </p>

            {/* Tamil tagline banner */}
            <div className="inline-block glass border border-orange-brand/20 rounded-xl px-5 py-3 mb-6">
              <p className="text-orange-light font-semibold text-sm tracking-wide">
                "Thirupay Karo, Namma Kadaiyai Bank Aakkungo!"
              </p>
            </div>

            <p className="text-white/60 text-sm mb-8 max-w-lg mx-auto lg:mx-0">
              Join India's rapidly growing merchant network and provide secure banking services directly from your Kirana Store, Medical Shop, Mobile Shop or Retail Outlet.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
              <a
                href="#partner"
                className="btn-primary flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                Become a Partner
                <ArrowRight size={18} />
              </a>
              <a
                href="#download"
                className="btn-secondary flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                <Download size={18} />
                Download App
              </a>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-brand/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={11} className="text-orange-brand" />
                  </div>
                  <span className="text-white/70 text-xs font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Phone mockup */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative lg:pr-8">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-white text-xs">Scroll to explore</span>
        <div className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}