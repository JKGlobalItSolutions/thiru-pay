import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { partnerLeadsService } from '../data/partnerLeadsData';
import {
  Search, Filter, Trash2, CheckCircle,
  Clock, Edit3, ChevronDown, ArrowUpDown,
  FileSpreadsheet, Users, Phone, Mail, MapPin,
  Calendar, User
} from 'lucide-react';
import * as XLSX from 'xlsx';

const statusOptions = ['All', 'New', 'Contacted', 'Converted'];
const statusStyles = {
  New: { bg: '#FFF3E0', color: '#E65100', icon: Clock },
  Contacted: { bg: '#E3F2FD', color: '#1565C0', icon: Edit3 },
  Converted: { bg: '#E8F5E9', color: '#2E7D32', icon: CheckCircle },
};

export default function PartnerLeads({ navigate }) {
  const { t } = useTheme();
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showStatusDropdown, setShowStatusDropdown] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadLeads = () => {
    let data = partnerLeadsService.getAll();
    if (searchQuery) data = partnerLeadsService.search(searchQuery);
    if (filterStatus !== 'All') data = partnerLeadsService.filterByStatus(filterStatus);
    setLeads(data);
  };

  useEffect(() => { loadLeads(); }, [searchQuery, filterStatus]);

  const handleStatusChange = (id, newStatus) => {
    partnerLeadsService.updateStatus(id, newStatus);
    setShowStatusDropdown(prev => ({ ...prev, [id]: false }));
    loadLeads();
  };

  const handleDelete = (id) => {
    partnerLeadsService.delete(id);
    setConfirmDelete(null);
    loadLeads();
  };

  const exportToExcel = () => {
    const allLeads = partnerLeadsService.getAll();
    const data = allLeads.map(l => ({
      Name: l.name,
      'Phone Number': l.phone,
      Email: l.email,
      City: l.city,
      Date: new Date(l.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      Status: l.status,
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Partner Leads');
    XLSX.writeFile(wb, `ThiruPay_Partner_Leads_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const allLeads = partnerLeadsService.getAll();
  const newCount = allLeads.filter(l => l.status === 'New').length;
  const contactedCount = allLeads.filter(l => l.status === 'Contacted').length;
  const convertedCount = allLeads.filter(l => l.status === 'Converted').length;

  return (
    <div style={{ minHeight: '100vh', background: t.bg, transition: 'background 0.3s' }}>
      <div style={{ background: 'linear-gradient(135deg,#0A1F44,#163A7A)', padding: '36px 0 40px' }}>
        <div className="container-xl">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(255,107,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={26} color="#FF6B00" />
            </div>
            <div>
              <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 28, margin: 0 }}>Partner Lead Enquiries</h1>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: '4px 0 0' }}>Manage partner applications submitted from the Agent Login page</p>
            </div>
          </div>
          <button onClick={() => navigate('home')} style={{ padding: '8px 20px', borderRadius: 10, border: '2px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontWeight: 600, fontSize: 13, cursor: 'pointer', marginTop: 16 }}>
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="container-xl" style={{ padding: '28px 16px' }}>
        {/* Stats */}
        <div className="row g-3 mb-4">
          {[
            { label: 'Total', value: allLeads.length, color: '#0A1F44', bg: '#E8EDF6' },
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

        {/* Search & Filter */}
        <div style={{ background: t.bgCard, borderRadius: 18, border: `1px solid ${t.cardBorder}`, padding: '20px', boxShadow: t.cardShadow, marginBottom: 24 }}>
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-5">
              <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${t.cardBorder}`, borderRadius: 12, padding: '0 14px', background: t.bg }}>
                <Search size={18} color="#888" />
                <input type="text" placeholder="Search by name, phone, email or city..." value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ flex: 1, border: 'none', outline: 'none', padding: '11px 10px', fontSize: 14, background: 'transparent', color: t.text }} />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Filter size={16} color="#888" />
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                  style={{ flex: 1, padding: '11px 14px', borderRadius: 12, border: `2px solid ${t.cardBorder}`, background: t.bg, fontSize: 14, color: t.text, cursor: 'pointer' }}>
                  {statusOptions.map(s => <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>)}
                </select>
              </div>
            </div>
            <div className="col-6 col-md-4" style={{ textAlign: 'right' }}>
              <button onClick={exportToExcel} style={{
                padding: '11px 22px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg,#2E7D32,#43A047)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8
              }}>
                <FileSpreadsheet size={18} /> Export Excel
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: t.bgCard, borderRadius: 18, border: `1px solid ${t.cardBorder}`, overflow: 'hidden', boxShadow: t.cardShadow }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${t.border}` }}>
                  {['Name', 'Phone Number', 'Email', 'City', 'Date', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '16px 18px', textAlign: 'left', fontWeight: 700, fontSize: 12, color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{h}{h !== 'Actions' && <ArrowUpDown size={12} color="#bbb" />}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '48px 18px', textAlign: 'center' }}>
                      <div style={{ color: t.textSub, fontSize: 15 }}>
                        <Users size={40} color="#ccc" style={{ marginBottom: 12 }} />
                        <p style={{ margin: 0, fontWeight: 600 }}>No enquiries found</p>
                      </div>
                    </td>
                  </tr>
                ) : leads.map((lead, idx) => {
                  const statusStyle = statusStyles[lead.status] || statusStyles.New;
                  const StatusIcon = statusStyle.icon;
                  return (
                    <motion.tr key={lead.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.02 }}
                      style={{ borderBottom: `1px solid ${t.border}` }}
                      onMouseEnter={e => e.currentTarget.style.background = t.bgAlt}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '14px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#E8EDF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={18} color="#0A1F44" /></div>
                          <span style={{ color: t.text, fontWeight: 600, fontSize: 14 }}>{lead.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Phone size={14} color="#888" /><span style={{ color: t.text, fontSize: 14 }}>{lead.phone}</span></div></td>
                      <td style={{ padding: '14px 18px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Mail size={14} color="#888" /><span style={{ color: t.text, fontSize: 14 }}>{lead.email}</span></div></td>
                      <td style={{ padding: '14px 18px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={14} color="#888" /><span style={{ color: t.text, fontSize: 14 }}>{lead.city}</span></div></td>
                      <td style={{ padding: '14px 18px' }}><div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} color="#888" /><span style={{ color: t.text, fontSize: 13, whiteSpace: 'nowrap' }}>{formatDate(lead.date)}</span></div></td>
                      <td style={{ padding: '14px 18px', position: 'relative' }}>
                        <div style={{ position: 'relative' }}>
                          <button onClick={() => setShowStatusDropdown(prev => ({ ...prev, [lead.id]: !prev[lead.id] }))}
                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 20, border: 'none', background: statusStyle.bg, color: statusStyle.color, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}>
                            <StatusIcon size={14} />{lead.status}<ChevronDown size={12} />
                          </button>
                          {showStatusDropdown[lead.id] && (
                            <div style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, marginTop: 4, background: '#fff', borderRadius: 12, border: '1px solid #e0e0e0', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', overflow: 'hidden', minWidth: 140 }}>
                              {['New', 'Contacted', 'Converted'].map(s => {
                                const ss = statusStyles[s];
                                const Icon = ss.icon;
                                return (
                                  <button key={s} onClick={() => handleStatusChange(lead.id, s)}
                                    style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 14px', border: 'none', background: lead.status === s ? '#f5f5f5' : '#fff', color: ss.color, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>
                                    <Icon size={16} />{s}{lead.status === s && <span style={{ marginLeft: 'auto' }}>✓</span>}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <button onClick={() => setConfirmDelete(lead.id)}
                          style={{ padding: '8px 12px', borderRadius: 10, border: 'none', background: '#FFEBEE', color: '#C62828', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600 }}>
                          <Trash2 size={16} /> Delete
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