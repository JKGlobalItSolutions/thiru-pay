import { useState } from 'react';
import { Menu, X, ChevronDown, Download, LogIn, Sun, Moon } from 'lucide-react';
import ThiruPayLogo from './ThiruPayLogo';
import { useTheme } from '../context/ThemeContext';
import MegaMenu from './MegaMenu';

const productMenuItems = [
  { label: 'Banking Services', category: 'banking', desc: 'UPI, Digital Accounts, Cards, Loans & more' },
  { label: 'Insurance', category: 'insurance', desc: 'Health, Motor, Shop & Device Insurance' },
  { label: 'Travel Services', category: 'travel', desc: 'IRCTC, Flights, Bus & Hotel Booking' },
  { label: 'Utility & Bill Payments', category: 'utility', desc: 'Mobile, DTH Recharge & Bills' },
];

export default function Navbar({ currentPage, navigate }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileMega, setMobileMega] = useState(false);

  const handleNav = (page, cat) => {
    navigate(page, cat);
    setMobileOpen(false);
    setProductsOpen(false);
    setMegaOpen(false);
    setMobileMega(false);
  };

  const handleMegaItem = (serviceId) => {
    navigate('products', `service:${serviceId}`);
    setMegaOpen(false);
    setProductsOpen(false);
    setMobileOpen(false);
    setMobileMega(false);
  };

  const navBg = '#FFFFFF';

  return (
    <nav style={{ background: navBg, position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', transition: 'background 0.3s' }}>
      <div className="container-xl">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
          {/* Logo */}
          <div style={{ cursor: 'pointer', flexShrink: 0 }} onClick={() => handleNav('home')}>
            <ThiruPayLogo height={70} onDark />
          </div>

          {/* Desktop Nav */}
          <div className="d-none d-lg-flex" style={{ alignItems: 'center', gap: 4 }}>
            {[['home', 'Home'], ['about', 'About Us']].map(([page, label]) => (
              <span
                key={page}
                onClick={() => handleNav(page)}
                style={{
                  padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 500, fontSize: 14,
                  color: currentPage === page ? '#FF6B00' : '#0A2E6D',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { if (currentPage !== page) e.currentTarget.style.color = '#FF6B00'; }}
                onMouseLeave={e => { if (currentPage !== page) e.currentTarget.style.color = '#0A2E6D'; }}
              >
                {label}
              </span>
            ))}

            {/* Products & Solutions — triggers Mega Menu */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => { setProductsOpen(true); setMegaOpen(true); }}
              onMouseLeave={() => { setProductsOpen(false); setMegaOpen(false); }}
            >
              <span style={{
                padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 500, fontSize: 14,
                color: currentPage?.startsWith('service:') || currentPage === 'products' ? '#FF6B00' : '#0A2E6D',
                display: 'flex', alignItems: 'center', gap: 4, transition: 'color 0.2s',
              }}>
                Products & Solutions
                <ChevronDown size={13} style={{ transition: 'transform 0.2s', transform: megaOpen ? 'rotate(180deg)' : 'none' }} />
              </span>
            </div>

            <span
              onClick={() => handleNav('download')}
              style={{
                padding: '8px 14px', borderRadius: 8, cursor: 'pointer', fontWeight: 500, fontSize: 14,
                color: currentPage === 'download' ? '#FF6B00' : '#0A2E6D',
                transition: 'color 0.2s',
              }}
            >
              Download App
            </span>
          </div>

          {/* Right CTA */}
          <div className="d-none d-lg-flex" style={{ alignItems: 'center', gap: 10 }}>
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              style={{
                width: 38, height: 38, borderRadius: 10, background: 'rgba(10,46,109,0.06)',
                border: '1px solid rgba(10,46,109,0.12)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(10,46,109,0.12)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,46,109,0.06)')}
            >
              {theme === 'dark' ? <Sun size={16} color="#FFD700" /> : <Moon size={16} color="#0A2E6D" />}
            </button>

            <button onClick={() => handleNav('login')} style={{ background: currentPage === 'login' ? '#FF6B00' : 'transparent', color: currentPage === 'login' ? '#fff' : '#0A2E6D', border: '2px solid rgba(10,46,109,0.25)', borderRadius: 10, padding: '8px 18px', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.background = '#FF6B00'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { if (currentPage !== 'login') { e.currentTarget.style.borderColor = 'rgba(10,46,109,0.25)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0A2E6D'; } }}
            >
              <LogIn size={15} /> Agent Login
            </button>
            <button onClick={() => handleNav('download')} style={{ background: '#FF6B00', color: '#fff', border: 'none', borderRadius: 10, padding: '8px 18px', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#e55f00')}
              onMouseLeave={e => (e.currentTarget.style.background = '#FF6B00')}
            >
              <Download size={15} /> Download App
            </button>
          </div>

          {/* Mobile row */}
          <div className="d-lg-none" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={toggleTheme} style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(10,46,109,0.06)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {theme === 'dark' ? <Sun size={15} color="#FFD700" /> : <Moon size={15} color="#0A2E6D" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: '#0A2E6D', padding: 4, cursor: 'pointer' }}>
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu — white panel directly under the navbar */}
      <div
        style={{ position: 'relative' }}
        onMouseEnter={() => setMegaOpen(true)}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <MegaMenu isOpen={megaOpen} onClose={() => setMegaOpen(false)} onItemClick={handleMegaItem} />
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid rgba(10,46,109,0.1)', padding: '8px 0 16px', maxHeight: '80vh', overflowY: 'auto' }}>
          <div className="container-xl">
            {[['home', 'Home'], ['about', 'About Us'], ['download', 'Download App'], ['login', 'Agent Login']].map(([page, label]) => (
              <div key={page} onClick={() => handleNav(page)} style={{ padding: '12px 16px', color: currentPage === page ? '#FF6B00' : '#0A2E6D', fontWeight: 500, cursor: 'pointer', borderRadius: 8 }}>
                {label}
              </div>
            ))}
            <div onClick={() => setMobileMega(!mobileMega)} style={{ padding: '8px 16px', fontWeight: 700, color: '#0A2E6D', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1, marginTop: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Products & Solutions</span>
              <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: mobileMega ? 'rotate(180deg)' : 'none' }} />
            </div>
            {mobileMega && (
              <div style={{ paddingLeft: 16, paddingTop: 4, paddingBottom: 8 }}>
                {productMenuItems.map((item) => (
                  <div key={item.category} onClick={() => handleNav('products', item.category)} style={{ padding: '8px 16px', color: '#0A2E6D', fontSize: 14, cursor: 'pointer' }}>
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}