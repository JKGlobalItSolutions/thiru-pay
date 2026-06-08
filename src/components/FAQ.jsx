import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'What is AEPS (Aadhaar Enabled Payment System)?',
    a: 'AEPS is a bank-led model that allows online interoperable financial transactions at Point of Sale (PoS) through the Business Correspondent using Aadhaar authentication. Customers can withdraw cash, check balance, and perform mini statements using only their Aadhaar number and fingerprint.',
  },
  {
    q: 'How much can I earn as a Thirupay partner?',
    a: 'Earnings depend on your transaction volume and service mix. On average, our merchants earn between ₹25,000 to ₹1,00,000+ per month. AEPS commissions, money transfer fees, and utility bill commissions are the primary income sources. Use our earnings calculator to estimate your potential.',
  },
  {
    q: 'Is any investment required to become a partner?',
    a: 'No large upfront investment is required. You only need a working smartphone or computer, a biometric device for AEPS services, and a small initial wallet deposit to start transactions. The onboarding process is minimal and the device cost is modest.',
  },
  {
    q: 'How long does the onboarding process take?',
    a: 'The onboarding process typically takes 24-48 hours after successful KYC verification. You submit your documents online, our team verifies them, and your account is activated with full transaction capabilities within the same day in most cases.',
  },
  {
    q: 'What documents are required to become a partner?',
    a: 'You need: Aadhaar Card, PAN Card, a recent passport-size photograph, a cancelled cheque or bank statement, and your shop address proof. All documents can be submitted digitally through our app or partner portal.',
  },
  {
    q: 'Is Tamil language support available?',
    a: 'Yes! Thirupay provides full support in Tamil, Hindi, and English. Our customer support team includes Tamil-speaking agents who can assist you with onboarding, technical issues, and transaction queries. The app itself supports Tamil interface for local merchants.',
  },
];

export default function FAQ() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

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
    <section className="py-20 bg-navy-royal/20 relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-grid-pattern" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef}>
          <div className={`text-center mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-orange-brand text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked{' '}
              <span className="gradient-text">Questions</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div
                key={i}
                className={`glass rounded-2xl border border-white/10 overflow-hidden transition-all duration-500 ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                } ${openIndex === i ? 'border-orange-brand/30' : 'hover:border-white/20'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left group"
                >
                  <span className={`font-semibold text-sm pr-4 transition-colors ${openIndex === i ? 'text-orange-light' : 'text-white/90 group-hover:text-white'}`}>
                    {q}
                  </span>
                  <span className="flex-shrink-0">
                    {openIndex === i ? (
                      <ChevronUp size={18} className="text-orange-brand" />
                    ) : (
                      <ChevronDown size={18} className="text-white/40 group-hover:text-white/70" />
                    )}
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}