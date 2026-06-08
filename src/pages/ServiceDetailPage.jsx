import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { allServices, allServiceIds } from '../data/menuData';
import ServiceIcon from '../components/illustrations/ServiceIcon';
import EnquiryModal from '../components/EnquiryModal';

export default function ServiceDetailPage({ serviceId, navigate }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const { t } = useTheme();
  const safeId = allServiceIds.includes(serviceId) ? serviceId : 'aeps';
  const service = allServices[safeId];
  const index = allServiceIds.indexOf(safeId);
  const isImageLeft = index % 2 === 0;

  return (
    <div style={{ background: t.bg, minHeight: '100vh', transition: 'background 0.3s' }}>
      {/* Hero header */}
      <section style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', padding: '52px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,107,0,0.1)' }} />
        <div className="container-xl">
          <div className="row align-items-center">
            <div className="col-12 text-center" style={{ color: '#fff' }}>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="d-inline-block fw-semibold text-uppercase mb-3"
                style={{ color: '#FF8C33', fontSize: 12, letterSpacing: '1.5px', padding: '4px 14px', borderRadius: 20, background: 'rgba(255,107,0,0.15)' }}
              >
                Services
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="fw-black mb-2"
                style={{ fontSize: 'clamp(28px,4vw,42px)' }}
              >
                {service.title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-0 mx-auto"
                style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 560 }}
              >
                {service.subtitle}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Image + Content showcase */}
      <section className="py-5">
        <div className="container-xl">
          <div className="row align-items-center g-0">
            <motion.div
              key={`img-${safeId}`}
              className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-3 p-lg-4"
              initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                className="position-relative w-100 d-flex align-items-center justify-content-center"
                style={{ maxWidth: 380 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <div className="position-absolute" style={{ width: 280, height: 280, borderRadius: '50%', background: `${service.accent}18`, filter: 'blur(50px)' }} />
                <div className="position-relative d-flex align-items-center justify-content-center w-100" style={{ background: t.bgCard, borderRadius: 28, border: `1px solid ${t.cardBorder}`, boxShadow: '0 12px 40px rgba(0,0,0,0.1)', padding: '56px 32px' }}>
                  <ServiceIcon id={safeId} size={120} />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              key={`content-${safeId}`}
              className="col-12 col-lg-6 d-flex align-items-center"
              initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="p-3 p-lg-4 w-100">
                <motion.span
                  className="d-inline-block fw-semibold text-uppercase mb-3"
                  style={{ color: '#fff', fontSize: 11, letterSpacing: '1.5px', padding: '4px 14px', borderRadius: 20, background: service.gradient }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  ThiruPay Service
                </motion.span>
                <motion.h2
                  className="fw-black mb-3"
                  style={{ color: t.text, fontSize: 'clamp(28px, 3vw, 38px)', lineHeight: 1.15 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  {service.title}
                </motion.h2>
                <motion.p
                  className="mb-4"
                  style={{ color: t.textSub, fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  {service.desc}
                </motion.p>
                <motion.div
                  className="d-flex gap-3 flex-wrap"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.button
                    className="btn fw-bold px-4 py-2 border-0 d-inline-flex align-items-center gap-2"
                    style={{ background: service.gradient, color: '#fff', borderRadius: 12, fontSize: 14, boxShadow: `0 4px 16px ${service.accent}40` }}
                    whileHover={{ y: -2, boxShadow: `0 8px 24px ${service.accent}50` }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setEnquiryOpen(true)}
                  >
                    Explore Now <i className="bi bi-arrow-right" />
                  </motion.button>
                  <motion.button
                    className="btn fw-bold px-4 py-2"
                    style={{ color: service.accent, border: `2px solid ${service.accent}40`, borderRadius: 12, fontSize: 14, background: 'transparent' }}
                    whileHover={{ y: -2, borderColor: service.accent, background: `${service.accent}08` }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate && navigate('about')}
                  >
                    <i className="bi bi-chat-dots me-1" /> Contact Us
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Related services */}
          <div style={{ marginTop: 56 }}>
            <h3 className="fw-bold text-center mb-4" style={{ color: t.text, fontSize: 22 }}>Explore More Services</h3>
            <div className="row g-3">
              {allServiceIds.filter(id => id !== safeId).slice(0, 6).map((id) => {
                const s = allServices[id];
                return (
                  <div key={id} className="col-6 col-md-4 col-lg-2">
                    <div
                      onClick={() => navigate && navigate(`service:${id}`)}
                      style={{ background: t.bgCard, border: `1px solid ${t.cardBorder}`, borderRadius: 16, padding: '20px 12px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = s.accent; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = t.cardBorder; }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
                        <ServiceIcon id={id} size={48} />
                      </div>
                      <div style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>{s.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} preselectedServiceId={safeId} />
    </div>
  );
}
