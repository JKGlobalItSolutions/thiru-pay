import { Smartphone, Bell, Zap, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const features = [
  { icon: Bell, text: 'Real-Time Transaction Alerts' },
  { icon: Zap, text: 'Instant Wallet Settlement' },
  { icon: Star, text: 'Commission Dashboard' },
  { icon: Smartphone, text: '60+ Services in One App' },
];

export default function DownloadApp({ navigate }) {
  const { t } = useTheme();

  return (
    <div style={{ minHeight: '100vh', background: t.bgAlt, transition: 'background 0.3s' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', padding: '60px 0 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,107,0,0.08)' }} />
        <div className="container-xl" style={{ position: 'relative', textAlign: 'center', color: '#fff' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,107,0,0.15)', color: '#FF8C33', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', padding: '4px 14px', borderRadius: 20, marginBottom: 12 }}>Mobile App</span>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', marginTop: 8, marginBottom: 12 }}>Download ThiruPay App</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 17, maxWidth: 520, margin: '0 auto' }}>Manage all transactions, track commissions, and grow your business from one powerful app.</p>
        </div>
      </div>

      <div className="container-xl" style={{ padding: '60px 16px' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div style={{ background: t.bgCard, borderRadius: 28, overflow: 'hidden', boxShadow: '0 20px 60px rgba(10,31,68,0.15)', border: `1px solid ${t.cardBorder}` }}>
              <div style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', padding: '48px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: -30, left: -30, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,107,0,0.1)' }} />
                <div style={{ width: 88, height: 88, background: 'rgba(255,107,0,0.15)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '2px solid rgba(255,107,0,0.3)' }}>
                  <Smartphone size={44} color="#FF6B00" />
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,107,0,0.15)', border: '1px solid rgba(255,107,0,0.4)', borderRadius: 24, padding: '6px 18px', marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF6B00' }} />
                  <span style={{ color: '#FF8C33', fontWeight: 600, fontSize: 13 }}>Launching Soon</span>
                </div>
                <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 'clamp(26px,4vw,40px)', margin: '0 0 12px' }}>🚀 Coming Soon!</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, margin: 0, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
                  The ThiruPay Agent App is under development. We're building something amazing — stay tuned!
                </p>
              </div>
              <div style={{ padding: '40px 32px' }}>
                <h4 style={{ fontWeight: 700, color: t.text, textAlign: 'center', marginBottom: 28 }}>App Features Coming</h4>
                <div className="row g-3 mb-4">
                  {features.map(({ icon: Icon, text }) => (
                    <div key={text} className="col-12 col-sm-6">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: t.bgAlt, borderRadius: 12, padding: '14px 18px', border: `1px solid ${t.border}` }}>
                        <div style={{ width: 40, height: 40, borderRadius: 12, background: '#FFF3E0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={18} color="#FF6B00" />
                        </div>
                        <span style={{ fontWeight: 600, color: t.text, fontSize: 14 }}>{text}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Store buttons (disabled) */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
                  {['App Store', 'Google Play'].map(store => (
                    <div key={store} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#1a1a1a', borderRadius: 14, padding: '14px 22px', opacity: 0.5, cursor: 'not-allowed' }}>
                      <Smartphone size={24} color="#fff" />
                      <div>
                        <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>{store === 'App Store' ? 'Download on the' : 'Get it on'}</div>
                        <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>{store}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notify form */}
                <div style={{ background: t.bgAlt, borderRadius: 16, padding: 24, textAlign: 'center', border: `1px solid ${t.border}` }}>
                  <h5 style={{ fontWeight: 700, color: t.text, marginBottom: 6 }}>Get Notified When We Launch</h5>
                  <p style={{ color: t.textSub, fontSize: 14, marginBottom: 16 }}>Enter your number and we'll SMS you when the app is ready.</p>
                  <div style={{ display: 'flex', gap: 10, maxWidth: 400, margin: '0 auto', flexWrap: 'wrap' }}>
                    <input type="tel" placeholder="Enter your mobile number"
                      style={{ flex: 1, padding: '12px 16px', borderRadius: 10, border: `1.5px solid ${t.inputBorder}`, fontSize: 14, outline: 'none', background: t.inputBg, color: t.text, minWidth: 180 }}
                      onFocus={e => (e.currentTarget.style.borderColor = '#FF6B00')}
                      onBlur={e => (e.currentTarget.style.borderColor = t.inputBorder)}
                    />
                    <button style={{ background: '#FF6B00', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 20px', fontWeight: 600, fontSize: 14, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      Notify Me
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <span style={{ color: t.textMuted, fontSize: 14 }}>In the meantime, </span>
                  <span style={{ color: '#FF6B00', fontWeight: 600, cursor: 'pointer', fontSize: 14 }} onClick={() => navigate('login')}>
                    use the Agent Portal →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}