import { ArrowRight, Download } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden" id="download">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-brand via-orange-light to-orange-brand" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(10,31,68,0.3) 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Decorative orbs */}
      <div className="orb w-64 h-64 bg-white/15 -top-16 -left-16" />
      <div className="orb w-48 h-48 bg-navy-deep/20 bottom-0 right-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-white text-sm font-medium">Join India's Fastest Growing Network</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
          Ready to Start Your Digital
          <br />
          Banking Business?
        </h2>

        <p className="text-white/85 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
          Join India's fastest growing merchant banking network and unlock a powerful new income stream for your existing shop.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#partner"
            className="flex items-center justify-center gap-2 bg-navy-deep hover:bg-navy-royal text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:shadow-[0_8px_30px_rgba(10,31,68,0.5)] hover:-translate-y-0.5"
          >
            Become a Partner
            <ArrowRight size={18} />
          </a>
          <a
            href="#download"
            className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border-2 border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:-translate-y-0.5"
          >
            <Download size={18} />
            Download App
          </a>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/70 text-sm">
          {['No Hidden Charges', 'Instant Activation', '24x7 Support', 'Secure Platform'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}