import { motion, AnimatePresence } from 'framer-motion';
import { megaMenuColumns } from '../data/menuData';

export default function MegaMenu({ isOpen, onClose, onItemClick }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            boxShadow: '0 24px 60px rgba(0,0,0,0.18)',
            borderTop: '2px solid #FF6B00',
            borderBottom: '1px solid #eee',
            zIndex: 999,
          }}
          onMouseLeave={onClose}
        >
          <div className="container-xl py-5">
            <div className="row g-4">
              {megaMenuColumns.map((col, colIdx) => (
                <motion.div
                  key={col.title}
                  className="col-12 col-md-6 col-lg-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: colIdx * 0.05 }}
                >
                  <h6
                    style={{
                      color: '#0A1F44',
                      fontWeight: 800,
                      fontSize: 14,
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px',
                      marginBottom: 18,
                      paddingBottom: 12,
                      borderBottom: '2px solid #FF6B00',
                      display: 'inline-block',
                    }}
                  >
                    {col.title}
                  </h6>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {col.items.map((item, itemIdx) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: colIdx * 0.05 + itemIdx * 0.02 }}
                      >
                        <span
                          onClick={() => onItemClick && onItemClick(item.id)}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 10,
                            padding: '8px 10px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#FFF3E0'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}
                        >
                          <i className="bi bi-arrow-right-short" style={{ color: '#FF6B00', fontSize: 16, marginTop: 2 }} />
                          <div>
                            <div style={{ color: '#0A1F44', fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                            <div style={{ color: '#888', fontSize: 12, marginTop: 2 }}>{item.desc}</div>
                          </div>
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}