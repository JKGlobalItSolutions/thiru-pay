const STORAGE_KEY = 'thirupay_partner_leads';

const getLeads = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveLeads = (leads) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  } catch (e) {
    console.error('Failed to save leads:', e);
  }
};

export const partnerLeadsService = {
  getAll: () => getLeads(),

  add: (lead) => {
    const leads = getLeads();
    const newLead = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      city: lead.city,
      date: new Date().toISOString(),
      status: 'New',
    };
    leads.unshift(newLead);
    saveLeads(leads);
    return newLead;
  },

  updateStatus: (id, status) => {
    const leads = getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index !== -1) { leads[index].status = status; saveLeads(leads); return leads[index]; }
    return null;
  },

  delete: (id) => {
    const leads = getLeads();
    const filtered = leads.filter(l => l.id !== id);
    saveLeads(filtered);
    return filtered;
  },

  search: (query) => {
    const leads = getLeads();
    const q = query.toLowerCase();
    return leads.filter(l =>
      l.name.toLowerCase().includes(q) ||
      l.phone.includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q)
    );
  },

  filterByStatus: (status) => {
    const leads = getLeads();
    if (!status || status === 'All') return leads;
    return leads.filter(l => l.status === status);
  },
};