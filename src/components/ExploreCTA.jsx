import { useState } from 'react';
import { motion } from 'framer-motion';
import EnquiryModal from './EnquiryModal';

export default function ExploreCTA({ navigate }) {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <section className="position-relative py-5" style={{ background: 'transparent' }}>
      <div className="container-xl">
        <motion.div
          className="row justify-content-center text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="col-12">
            <motion.button
              onClick={() => setEnquiryOpen(true)}
              className="btn fw-bold px-5 py-3 border-0 d-inline-flex align-items-center gap-2"
              style={{
                background: 'linear-gradient(135deg, #FF6B00, #FF8C33)',
                color: '#fff',
                borderRadius: 14,
                fontSize: 16,
                boxShadow: '0 6px 24px rgba(255,107,0,0.35)',
              }}
              whileHover={{ y: -3, boxShadow: '0 10px 32px rgba(255,107,0,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              Explore More <i className="bi bi-arrow-right" />
            </motion.button>
          </div>
        </motion.div>
      </div>
      <EnquiryModal isOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </section>
  );
}