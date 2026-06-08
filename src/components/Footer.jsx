import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import ThiruPayLogo from './ThiruPayLogo';
import { useTheme } from '../context/ThemeContext';

const socials = [
  { icon: Facebook, label: 'Facebook', hoverBg: '#1877F2', href: '#' },
  { icon: Twitter, label: 'Twitter', hoverBg: '#1DA1F2', href: 'https://x.com/Thirupay' },
  { icon: Instagram, label: 'Instagram', hoverBg: '#E1306C', href: 'https://www.instagram.com/thiru_pay/?hl=en' },
  { icon: Linkedin, label: 'LinkedIn', hoverBg: '#0A66C2', href: '#' },
  { icon: Youtube, label: 'YouTube', hoverBg: '#FF0000', href: '#' },
];

export default function Footer({ navigate }) {
  const { theme } = useTheme();
  const footerBg = theme === 'dark' ? '#020812' : '#060F22';
  const textMid = 'rgba(255,255,255,0.5)';
  const textLow = 'rgba(255,255,255,0.28)';
  const borderColor = 'rgba(255,255,255,0.07)';

  return (
    <footer style={{ background: footerBg, color: '#fff', paddingTop: 56, transition: 'background 0.3s' }}>
      <div className="container-xl">
        <div className="row g-5">
          {/* Brand */}
          <div className="col-12 col-md-4">
            <div style={{ marginBottom: 16 }}>
              <ThiruPayLogo height={44} onDark />
            </div>
            <p style={{ color: textMid, fontSize: 14, lineHeight: 1.75, marginBottom: 20, maxWidth: 300 }}>
              ThiruPay is India's trusted digital banking network — empowering 500,000+ merchants with 60+ financial and utility services.
            </p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              {socials.map(({ icon: Icon, label, hoverBg, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => { e.currentTarget.style.background = hoverBg; e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <Icon size={16} color="#fff" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="col-6 col-md-2">
            <h6 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Company</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['home', 'Home'], ['about', 'About Us'], ['download', 'Download App'], ['login', 'Agent Login']].map(([page, label]) => (
                <li key={label}>
                  <span onClick={() => navigate(page)} style={{ color: textMid, fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FF8C33')}
                    onMouseLeave={e => (e.currentTarget.style.color = textMid)}
                  >{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-6 col-md-2">
            <h6 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Services</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['banking', 'Banking Services'], ['insurance', 'Insurance'], ['travel', 'Travel Services'], ['utility', 'Utility & Bills']].map(([cat, label]) => (
                <li key={label}>
                  <span onClick={() => navigate('products', cat)} style={{ color: textMid, fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FF8C33')}
                    onMouseLeave={e => (e.currentTarget.style.color = textMid)}
                  >{label}</span>
                </li>
              ))}
            </ul>
            <h6 style={{ fontWeight: 700, marginTop: 24, marginBottom: 16, fontSize: 15 }}>Legal</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Privacy Policy', 'Terms & Conditions', 'Refund Policy'].map(item => (
                <li key={item}>
                  <span style={{ color: textMid, fontSize: 14, cursor: 'pointer', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FF8C33')}
                    onMouseLeave={e => (e.currentTarget.style.color = textMid)}
                  >{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div className="col-12 col-md-4">
            <h6 style={{ fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Contact & Offices</h6>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { addr: 'No 686 Pillaiyar Kovil Street , west Deepam Nagar Vengikkal Tiruvannamalai 606604' , city: 'Tiruvannamalai'},
              ].map(({ city, addr }) => (
                <div key={city} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <MapPin size={14} color="#FF6B00" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 600, fontSize: 13 }}>{city}: </span>
                    <span style={{ color: textMid, fontSize: 13 }}>{addr}</span>
                  </div>
                </div>
              ))}
              <a href="tel:8608600778" style={{ display: 'flex', gap: 10, alignItems: 'center', color: textMid, textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF8C33')}
                onMouseLeave={e => (e.currentTarget.style.color = textMid)}
              >
                <Phone size={14} color="#FF6B00" /> +91 8608600778
              </a>
              <a href="mailto:support@thirupay.in" style={{ display: 'flex', gap: 10, alignItems: 'center', color: textMid, textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF8C33')}
                onMouseLeave={e => (e.currentTarget.style.color = textMid)}
              >
                <Mail size={14} color="#FF6B00" /> support@thirupay.in
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${borderColor}`, marginTop: 48 }}>
        <div className="container-xl" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '16px 16px' }}>
          <p style={{ color: textLow, fontSize: 13, margin: 0 }}>© 2024 ThiruPay Financial Services Pvt. Ltd. All rights reserved.</p>
          <p style={{ color: textLow, fontSize: 12, margin: 0 }}>RBI Authorized BC | NPCI Certified | ISO 27001</p>
        </div>
      </div>
    </footer>
  );
}