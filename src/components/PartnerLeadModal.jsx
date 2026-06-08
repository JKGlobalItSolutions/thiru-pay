import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, User, Phone, Mail, MapPin, Send } from 'lucide-react';
import { partnerLeadsService } from '../data/partnerLeadsData';

const initialForm = { name: '', phone: '', email: '', city: '' };
const initialErrors = {};

export default function PartnerLeadModal({ isOpen, onClose }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { setForm(initialForm); setErrors(initialErrors); setSubmitted(false); }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && isOpen) onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(form.phone.trim())) newErrors.phone = 'Enter valid 10-digit mobile number';
    if (!form.email.trim()) newErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) newErrors.email = 'Enter a valid email address';
    if (!form.city.trim()) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      partnerLeadsService.add({ name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim(), city: form.city.trim() });
      setSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,68,0.6)', backdropFilter: 'blur(4px)' }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{ position: 'relative', width: '100%', maxWidth: 520, background: '#fff', borderRadius: 24, boxShadow: '0 25px 80px rgba(10,31,68,0.25)', overflow: 'hidden', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', padding: '32px 28px 28px', position: 'relative' }}>
              <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              ><X size={20} /></button>

              {!submitted ? (
                <>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: 'rgba(255,107,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <User size={28} color="#FF6B00" />
                  </div>
                  <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 24, margin: 0, marginBottom: 6 }}>Become a ThiruPay Partner</h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                    Join India's growing digital financial services network and start earning with ThiruPay.
                  </p>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '12px 0' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(46,125,50,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <CheckCircle size={36} color="#2E7D32" />
                  </div>
                  <h2 style={{ color: '#fff', fontWeight: 800, fontSize: 22, margin: 0, marginBottom: 8 }}>Application Submitted!</h2>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                    Thank you for your interest. Our team will contact you shortly.
                  </p>
                </div>
              )}
            </div>

            {!submitted && (
              <form onSubmit={handleSubmit} style={{ padding: '28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#0A1F44', marginBottom: 6 }}>Full Name <span style={{ color: '#dc2626' }}>*</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${errors.name ? '#dc2626' : '#e0e0e0'}`, borderRadius: 12, padding: '0 14px', background: '#fafafa' }}>
                      <User size={18} color="#888" style={{ flexShrink: 0 }} />
                      <input type="text" placeholder="Enter your full name" value={form.name} onChange={e => handleChange('name', e.target.value)}
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 10px', fontSize: 14, background: 'transparent', color: '#0A1F44', fontFamily: 'inherit' }} />
                    </div>
                    {errors.name && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{errors.name}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#0A1F44', marginBottom: 6 }}>Phone Number <span style={{ color: '#dc2626' }}>*</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${errors.phone ? '#dc2626' : '#e0e0e0'}`, borderRadius: 12, padding: '0 14px', background: '#fafafa' }}>
                      <Phone size={18} color="#888" style={{ flexShrink: 0 }} />
                      <input type="tel" placeholder="Enter your mobile number" value={form.phone} onChange={e => handleChange('phone', e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} maxLength={10}
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 10px', fontSize: 14, background: 'transparent', color: '#0A1F44', fontFamily: 'inherit' }} />
                    </div>
                    {errors.phone && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{errors.phone}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#0A1F44', marginBottom: 6 }}>Email Address <span style={{ color: '#dc2626' }}>*</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${errors.email ? '#dc2626' : '#e0e0e0'}`, borderRadius: 12, padding: '0 14px', background: '#fafafa' }}>
                      <Mail size={18} color="#888" style={{ flexShrink: 0 }} />
                      <input type="email" placeholder="Enter your email address" value={form.email} onChange={e => handleChange('email', e.target.value)}
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 10px', fontSize: 14, background: 'transparent', color: '#0A1F44', fontFamily: 'inherit' }} />
                    </div>
                    {errors.email && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{errors.email}</p>}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 13, color: '#0A1F44', marginBottom: 6 }}>City <span style={{ color: '#dc2626' }}>*</span></label>
                    <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${errors.city ? '#dc2626' : '#e0e0e0'}`, borderRadius: 12, padding: '0 14px', background: '#fafafa' }}>
                      <MapPin size={18} color="#888" style={{ flexShrink: 0 }} />
                      <input type="text" placeholder="Enter your city" value={form.city} onChange={e => handleChange('city', e.target.value)}
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '12px 10px', fontSize: 14, background: 'transparent', color: '#0A1F44', fontFamily: 'inherit' }} />
                    </div>
                    {errors.city && <p style={{ color: '#dc2626', fontSize: 12, margin: '4px 0 0' }}>{errors.city}</p>}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
                  <button type="button" onClick={onClose} style={{ flex: 1, padding: '13px 20px', borderRadius: 12, border: '2px solid #e0e0e0', background: '#fff', fontWeight: 600, fontSize: 14, color: '#666', cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} style={{
                    flex: 1.5, padding: '13px 20px', borderRadius: 12, border: 'none',
                    background: submitting ? '#ccc' : 'linear-gradient(135deg,#FF6B00,#FF8C33)',
                    fontWeight: 700, fontSize: 14, color: '#fff', cursor: submitting ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
                  }}>
                    {submitting ? 'Submitting...' : <><Send size={16} /> Submit Application</>}
                  </button>
                </div>
              </form>
            )}

            {submitted && (
              <div style={{ padding: '0 28px 28px' }}>
                <button onClick={onClose} style={{
                  width: '100%', padding: '14px 20px', borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg,#FF6B00,#FF8C33)', fontWeight: 700, fontSize: 14, color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
                }}>
                  Done <ArrowRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}