import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { enquiryService } from '../data/enquiryData';
import {
  Search, Trash2, CheckCircle,
  Clock, Edit3, ChevronDown, ArrowUpDown,
  FileSpreadsheet, Inbox, Phone, Mail,
  Calendar, User, Tag
} from 'lucide-react';
import * as XLSX from 'xlsx';

const statusOptions = ['All', 'New', 'Contacted', 'Converted'];
const statusStyles = {
  New: { bg: '#FFF3E0', color: '#E65100', icon: Clock },
  Contacted: { bg: '#E3F2FD', color: '#1565C0', icon: Edit3 },
  Converted: { bg: '#E8F5E9', color: '#2E7D32', icon: CheckCircle },
};

const allCategories = ['All', 'Banking Services', 'Insurance Services', 'Travel Services', 'Utility & Bill Payment'];

export default function ServiceEnquiries({ navigate }) {
  const { t } = useTheme();
  const [enquiries, setEnquiries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadEnquiries = () => {
    let data = enquiryService.getAll();
    if (searchQuery) data = enquiryService.search(searchQuery);
    if (filterCategory !== 'All') data = data.filter(e => e.category === filterCategory);
    if (filterStatus !== 'All') data = data.filter(e => e.status === filterStatus);
    setEnquiries(data);
  };

  useEffect(() => { loadEnquiries(); }, [searchQuery, filterCategory, filterStatus]);

  const handleStatusChange = (id, newStatus) => {
    enquiryService.updateStatus(id, newStatus);
    setShowStatusDropdown(prev => ({ ...prev, [id]: false }));
    loadEnquiries();
  };

  const handleDelete = (id) => {
    enquiryService.delete(id);
    setConfirmDelete(null);
    loadEnquiries();
  };

  const exportToExcel = () => {
    const all = enquiryService.getAll();
    const data = all.map(e => ({
      Name: e.name,
      'Phone Number': e.phone,
      Email: e.email,
      Category: e.category,
      Service: e.service,
      Date: new Date(e.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      Status: e.status,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Service Enquiries');
    XLSX.writeFile(wb, `ThiruPay_Service_Enquiries_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const allEnquiries = enquiryService.getAll();
  const newCount = allEnquiries.filter(e => e.status === 'New').length;
  const contactedCount = allEnquiries.filter(e => e.status === 'Contacted').length;
  const convertedCount = allEnquiries.filter(e => e.status === 'Converted').length;

  return (
    <div style={{ minHeight: '100vh', background: t.bg, transition: 'background 0.3s' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', padding: '36px 0 40px' }}>
        <div className="container-xl">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,107,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Inbox size={26} color="#FF6B00" />
            </div>
            <div>
              <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 28, margin: 0 }}>Service Enquiries</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: '4px 0 0' }}>Manage enquiries submitted from Explore buttons</p>
            </div>
          </div>
          <button onClick={() => navigate('home')} style={{ padding: '8px 20px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer', marginTop: 16 }}>
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="container-xl" style={{ padding: '28px 16px' }}>
        <div className="row g-3 mb-4">
          {[
            { label: 'Total', value: allEnquiries.length, color: '#0A1F44', bg: '#E8EDF6' },
            { label: 'New', value: newCount, color: '#E65100', bg: '#FFF3E0' },
            { label: 'Contacted', value: contactedCount, color: '#1565C0', bg: '#E3F2FD' },
            { label: 'Converted', value: convertedCount, color: '#2E7D32', bg: '#E8F5E9' },
          ].map(stat => (
            <div key={stat.label} className="col-6 col-sm-3">
              <div style={{ background: t.bgCard, borderRadius: 16, border: `1px solid ${t.cardBorder}`, padding: '18px 20px', boxShadow: t.cardShadow }}>
                <p style={{ color: t.textSub, fontSize: 12, fontWeight: 600, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</p>
                <p style={{ color: stat.color, fontWeight: 800, fontSize: 28, margin: 0 }}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: t.bgCard, borderRadius: 18, border: `1px solid ${t.cardBorder}`, padding: '20px', boxShadow: t.cardShadow, marginBottom: 24 }}>
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-4">
              <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${t.cardBorder}`, borderRadius: 12, padding: '0 14px', background: t.bg }}>
                <Search size={18} color="#888" />
                <input type="text" placeholder="Search by name, phone, email..." value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '11px 10px', fontSize: 14, background: 'transparent', color: t.text }} />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: `2px solid ${t.cardBorder}`, background: t.bg, fontSize: 14, color: t.text, cursor: 'pointer' }}>
                {allCategories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
              </select>
            </div>
            <div className="col-6 col-md-3">
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                style={{ width: '100%', padding: '11px 14px', borderRadius: 12, border: `2px solid ${t.cardBorder}`, background: t.bg, fontSize: 14, color: t.text, cursor: 'pointer' }}>
                {statusOptions.map(s => <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>)}
              </select>
            </div>
            <div className="col-12 col-md-2" style={{ textAlign: 'right' }}>
              <button onClick={exportToExcel} style={{
                padding: '11px 18px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg,#2E7D32,#43A047)', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 6
              }}>
                <FileSpreadsheet size={16} /> Excel
              </button>
            </div>
          </div>
        </div>

        <div style={{ background: t.bgCard, borderRadius: 18, border: `1px solid ${t.cardBorder}`, overflow: 'hidden', boxShadow: t.cardShadow }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${t.border}` }}>
                  {['Name', 'Phone', 'Email', 'Category', 'Service', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '16px 14px', textAlign: 'left', fontWeight: 700, fontSize: 12, color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{h}{h !== 'Actions' && <ArrowUpDown size={12} color="#bbb" />}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr><td colSpan={8} style={{ padding: '48px 18px', textAlign: 'center' }}>
                    <div style={{ color: t.textSub, fontSize: 15 }}>
                      <Inbox size={40} color="#ccc" style={{ marginBottom: 12 }} />
                      <p style={{ margin: 0, fontWeight: 600 }}>No enquiries found</p>
                    </div>
                  </td></tr>
                ) : enquiries.map((enq, idx) => {
                  const ss = statusStyles[enq.status] || statusStyles.New;
                  const Icon = ss.icon;
                  return (
                    <motion.tr key={enq.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.02 }}
                      style={{ borderBottom: `1px solid ${t.border}` }}
                      onMouseEnter={e => e.currentTarget.style.background = t.bgAlt}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 32, height: 32, borderRadius: 8, background: '#E8EDF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={16} color="#0A1F44" /></div>
                          <span style={{ color: t.text, fontWeight: 600, fontSize: 13 }}>{enq.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Phone size={13} color="#888" /><span style={{ color: t.text, fontSize: 13 }}>{enq.phone}</span></div></td>
                      <td style={{ padding: '12px 14px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Mail size={13} color="#888" /><span style={{ color: t.text, fontSize: 13 }}>{enq.email}</span></div></td>
                      <td style={{ padding: '12px 14px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Tag size={13} color="#888" /><span style={{ color: t.text, fontSize: 12, fontWeight: 500 }}>{enq.category}</span></div></td>
                      <td style={{ padding: '12px 14px' }}><span style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>{enq.service}</span></td>
                      <td style={{ padding: '12px 14px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={13} color="#888" /><span style={{ color: t.text, fontSize: 12, whiteSpace: 'nowrap' }}>{formatDate(enq.date)}</span></div></td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ position: 'relative' }}>
                          <button onClick={() => setShowStatusDropdown(prev => ({ ...prev, [enq.id]: !prev[enq.id] }))}
                            style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 20, border: 'none', background: ss.bg, color: ss.color, fontWeight: 600, fontSize: 11, cursor: 'pointer' }}>
                            <Icon size={12} />{enq.status}<ChevronDown size={10} />
                          </button>
                          {showStatusDropdown[enq.id] && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, marginTop: 4, background: '#fff', borderRadius: 10, border: '1px solid #e0e0e0', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', overflow: 'hidden', minWidth: 120 }}>
                              {['New', 'Contacted', 'Converted'].map(s => {
                                const ss2 = statusStyles[s];
                                const Icon2 = ss2.icon;
                                return (
                                  <button key={s} onClick={() => handleStatusChange(enq.id, s)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 6, width: '100%', padding: '8px 12px', border: 'none', background: enq.status === s ? '#f5f5f5' : '#fff', color: ss2.color, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                                    <Icon2 size={14} />{s}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <button onClick={() => setConfirmDelete(enq.id)}
                          style={{ padding: '6px 10px', borderRadius: 8, border: 'none', background: '#FFEBEE', color: '#C62828', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600 }}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {confirmDelete && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <div onClick={() => setConfirmDelete(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(10,31,68,0.5)', backdropFilter: 'blur(3px)' }} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ position: 'relative', background: '#fff', borderRadius: 20, padding: '32px', maxWidth: 400, width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#FFEBEE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><Trash2 size={28} color="#C62828" /></div>
              <h3 style={{ color: '#0A1F44', fontWeight: 700, fontSize: 18, margin: '0 0 8px' }}>Delete Enquiry?</h3>
              <p style={{ color: '#666', fontSize: 14, margin: '0 0 24px' }}>Are you sure? This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: '2px solid #e0e0e0', background: '#fff', fontWeight: 600, fontSize: 14, color: '#666', cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => handleDelete(confirmDelete)} style={{ flex: 1, padding: '12px', borderRadius: 12, border: 'none', background: '#C62828', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
