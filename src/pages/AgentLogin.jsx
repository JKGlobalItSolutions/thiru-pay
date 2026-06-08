import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogIn, Eye, EyeOff, Shield, Lock, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ThiruPayLogo from '../components/ThiruPayLogo';
import PartnerLeadModal from '../components/PartnerLeadModal';

export default function AgentLogin({ navigate }) {
  const { theme, t } = useTheme();
  const isDark = theme === 'dark';
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!userId.trim() || !password.trim()) { setError('Please enter both User ID and Password.'); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setError('Invalid User ID or Password. Please try again.'); }, 1400);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ minHeight: '100vh', background: isDark ? 'linear-gradient(135deg,#020812 0%,#0A1F44 50%,#060D1F 100%)' : 'linear-gradient(135deg,#0A1F44 0%,#163A7A 50%,#0A1F44 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px', position: 'relative', overflow: 'hidden' }}
    >
      <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,107,0,0.08)' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

      <motion.div
        style={{ width: '100%', maxWidth: 460, position: 'relative' }}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          style={{ background: t.bgCard, borderRadius: 28, overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,0.35)', border: `1px solid ${t.cardBorder}` }}
          animate={{ boxShadow: ['0 32px 80px rgba(0,0,0,0.35)', '0 40px 100px rgba(0,0,0,0.4)', '0 32px 80px rgba(0,0,0,0.35)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', padding: '36px 36px 32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,107,0,0.1)' }} />
            <motion.div
              style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ThiruPayLogo height={46} onDark />
            </motion.div>
            <motion.h2
              style={{ color: '#fff', fontWeight: 800, fontSize: 24, marginBottom: 6 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Agent Login
            </motion.h2>
            <motion.p
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, margin: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Sign in to your ThiruPay agent portal
            </motion.p>
          </div>

          {/* Form */}
          <div style={{ padding: '36px 36px 32px' }}>
            <form onSubmit={handleSubmit}>
              {/* User ID */}
              <motion.div
                style={{ marginBottom: 20 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <label style={{ fontWeight: 600, color: t.text, fontSize: 14, display: 'block', marginBottom: 8 }}>User ID</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                    <User size={18} color={t.textMuted} />
                  </div>
                  <input type="text" value={userId} onChange={e => setUserId(e.target.value)} placeholder="Enter your User ID" autoComplete="username"
                    style={{ width: '100%', padding: '13px 14px 13px 44px', borderRadius: 12, border: `1.5px solid ${t.inputBorder}`, fontSize: 15, outline: 'none', background: t.inputBg, color: t.text, transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,0,0.12)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = t.inputBorder; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div
                style={{ marginBottom: 8 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <label style={{ fontWeight: 600, color: t.text, fontSize: 14, display: 'block', marginBottom: 8 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
                    <Lock size={18} color={t.textMuted} />
                  </div>
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your Password" autoComplete="current-password"
                    style={{ width: '100%', padding: '13px 46px 13px 44px', borderRadius: 12, border: `1.5px solid ${t.inputBorder}`, fontSize: 15, outline: 'none', background: t.inputBg, color: t.text, transition: 'border-color 0.2s, box-shadow 0.2s', boxSizing: 'border-box' }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255,107,0,0.12)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = t.inputBorder; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    {showPw ? <EyeOff size={18} color={t.textMuted} /> : <Eye size={18} color={t.textMuted} />}
                  </button>
                </div>
              </motion.div>

              <motion.div
                style={{ textAlign: 'right', marginBottom: 20 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.55 }}
              >
                <span style={{ color: '#FF6B00', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Forgot Password?</span>
              </motion.div>

              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: '#FFEBEE', border: '1px solid #EF9A9A', borderRadius: 10, padding: '10px 14px', marginBottom: 16, color: '#C62828', fontSize: 14, overflow: 'hidden' }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={loading ? {} : { y: -2, boxShadow: '0 6px 24px rgba(255,107,0,0.45)' }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  style={{ width: '100%', background: loading ? '#ccc' : 'linear-gradient(135deg,#FF6B00,#FF8C33)', color: '#fff', border: 'none', borderRadius: 14, padding: '15px 0', fontWeight: 700, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 16px rgba(255,107,0,0.35)' }}
                >
                  {loading
                    ? <><motion.div
                        style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
                      />Signing in...</>
                    : <><LogIn size={18} /> Sign In to Portal</>
                  }
                </motion.button>
              </motion.div>
            </form>

            <motion.div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, padding: '12px 16px', background: t.bgAlt, borderRadius: 10, border: `1px solid ${t.border}` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
            >
              <Shield size={15} color="#2E7D32" />
              <span style={{ color: t.textSub, fontSize: 13 }}>256-bit SSL · RBI Compliant · ISO 27001</span>
            </motion.div>

            <motion.div
              style={{ textAlign: 'center', marginTop: 20 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <span style={{ color: t.textMuted, fontSize: 14 }}>Not an agent yet? </span>
              <span onClick={() => setPartnerModalOpen(true)} style={{ color: '#FF6B00', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>Become a Partner →</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.p
          style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 13, marginTop: 20 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          For support, call <a href="tel:+919205621622" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600 }}>+91 9205621622</a>
        </motion.p>
      </motion.div>
      <PartnerLeadModal isOpen={partnerModalOpen} onClose={() => setPartnerModalOpen(false)} />
    </motion.div>
  );
}
