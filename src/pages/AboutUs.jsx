import { useTheme } from '../context/ThemeContext';
import { Phone, Mail } from 'lucide-react';

const milestones = [
  { year: '2018', title: 'Founded', desc: 'ThiruPay established in Chennai to empower Tamil Nadu merchants with digital banking.' },
  { year: '2019', title: 'AEPS Launch', desc: 'Launched Aadhaar Enabled Payment Services. Onboarded first 10,000 agents.' },
  { year: '2021', title: 'Pan-India', desc: 'Expanded to all states. Crossed 1 lakh merchant outlets milestone.' },
  { year: '2023', title: '500K Agents', desc: 'Reached 500,000 active merchant outlets across India with 24x7 support.' },
];

export default function AboutUs({ navigate }) {
  const { t } = useTheme();
  const Badge = ({ label }) => (
    <span style={{ display: 'inline-block', background: t.sectionBadgeBg, color: t.sectionBadgeColor, fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 14px', borderRadius: 20, marginBottom: 12 }}>{label}</span>
  );

  return (
    <div style={{ background: t.bg, transition: 'background 0.3s' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', padding: '60px 0 72px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,107,0,0.1)' }} />
        <div className="container-xl" style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
          <Badge label="About ThiruPay" />
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', marginBottom: 16 }}>India's Trusted Digital Banking Network</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: 600, margin: '0 auto', fontSize: 17, lineHeight: 1.7 }}>
            ThiruPay is a leading fintech platform empowering retailers across India to provide essential financial services and earn additional income from their existing shops.
          </p>
        </div>
      </div>

      {/* Mission / Vision */}
      <section style={{ background: t.bgAlt, padding: '64px 0', transition: 'background 0.3s' }}>
        <div className="container-xl">
          <div className="row g-4">
            {[
              { icon: '🎯', title: 'Our Mission', desc: 'To create a financial ecosystem where every shop owner in India can become a mini bank, earning through secure digital banking services.', accent: '#FF6B00' },
              { icon: '👁️', title: 'Our Vision', desc: 'We strive to make digital banking services easy, convenient, and accessible in every village and rural area of India.', accent: '#163A7A' },
              { icon: '🏆', title: 'Our Values', desc: 'Transparency, Trust, and Technology. We build every product around the needs of small merchants and their customers.', accent: '#22C55E' },
            ].map(({ icon, title, desc, accent }) => (
              <div key={title} className="col-12 col-md-4">
                <div style={{ background: t.bgCard, borderRadius: 20, padding: '32px 28px', height: '100%', boxShadow: t.cardShadow, borderTop: `4px solid ${accent}`, border: `1px solid ${t.cardBorder}`, borderTopColor: accent, textAlign: 'center', transition: 'all 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                  <h4 style={{ fontWeight: 700, color: t.text, marginBottom: 12 }}>{title}</h4>
                  <p style={{ color: t.textSub, lineHeight: 1.7, margin: 0, fontSize: 15 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Timeline */}
      <section style={{ background: t.bg, padding: '64px 0', transition: 'background 0.3s' }}>
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <Badge label="Our Story" />
              <h2 style={{ fontWeight: 800, color: t.text, fontSize: 'clamp(24px,3vw,36px)', marginTop: 8, marginBottom: 16 }}>Making Digital Bharat a Reality</h2>
              <p style={{ color: t.textSub, lineHeight: 1.8, marginBottom: 16 }}>
                ThiruPay was founded with a simple mission: to put the power of a full-service bank in the hands of every kirana store, medical shop and mobile retailer across Tamil Nadu and beyond.
              </p>
              <p style={{ color: t.textSub, lineHeight: 1.8, marginBottom: 24 }}>
                Today, we operate across all states of India, serving 500,000+ active merchants who provide AEPS, money transfers, insurance, travel bookings and more to millions of underserved customers.
              </p>
              <div className="row g-3">
                {[['500K+', 'Active Agents'], ['10K+', 'Distributors'], ['60+', 'Services'], ['24x7', 'Support']].map(([n, l]) => (
                  <div key={l} className="col-6 col-sm-3">
                    <div style={{ textAlign: 'center', background: t.bgAlt, borderRadius: 14, padding: '20px 12px', border: `1px solid ${t.border}` }}>
                      <div style={{ fontWeight: 800, color: '#FF6B00', fontSize: 24 }}>{n}</div>
                      <div style={{ color: t.textMuted, fontSize: 13, marginTop: 4 }}>{l}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div style={{ position: 'relative', paddingLeft: 40 }}>
                <div style={{ position: 'absolute', left: 14, top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom,#FF6B00,#163A7A)' }} />
                {milestones.map(({ year, title, desc }, i) => (
                  <div key={year} style={{ position: 'relative', marginBottom: i < milestones.length - 1 ? 32 : 0 }}>
                    <div style={{ position: 'absolute', left: -33, top: 6, width: 18, height: 18, borderRadius: '50%', background: i % 2 === 0 ? '#FF6B00' : '#163A7A', border: '3px solid ' + t.bg, boxShadow: '0 0 0 3px ' + (i % 2 === 0 ? '#FF6B0030' : '#163A7A30') }} />
                    <div style={{ background: t.bgCard, borderRadius: 14, padding: '18px 20px', boxShadow: t.cardShadow, border: `1px solid ${t.cardBorder}` }}>
                      <div style={{ fontWeight: 700, color: '#FF6B00', fontSize: 13, marginBottom: 4 }}>{year}</div>
                      <div style={{ fontWeight: 700, color: t.text, marginBottom: 6 }}>{title}</div>
                      <div style={{ color: t.textSub, fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section style={{ background: t.bgAlt, padding: '64px 0', transition: 'background 0.3s' }}>
        <div className="container-xl">
          <div style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', borderRadius: 20, padding: '40px 32px', textAlign: 'center', color: '#fff' }}>
            <h3 style={{ fontWeight: 700, marginBottom: 12 }}>Get In Touch</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 24 }}>Have questions? Our team is ready to help you get started.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+919205621622" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 20px' }}>
                <Phone size={16} /> 8608600778
              </a>
              <a href="mailto:support@thirupay.in" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 20px' }}>
                <Mail size={16} /> support@thirupay.in
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}