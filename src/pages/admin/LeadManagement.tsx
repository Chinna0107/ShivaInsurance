import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiDownload, FiFilter, FiEye, FiX, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { leadEventEmitter } from '../../hooks/useRealTimeLeads';
import PDFViewerModal from '../../components/PDFViewerModal';
import { FiUpload, FiFileText } from 'react-icons/fi';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  status: 'Pending' | 'Closed' | 'Agreed';
  type: 'health' | 'life' | 'vehicle';
  gender?: string;
  specific_plan?: string;
  location?: string;
  employment_type?: string;
  annual_income?: string;
  education?: string;
  smoker?: string;
  members?: string;
  policy_document_url?: string;
  // Vehicle-specific fields
  vehicle_number?: string;
  vehicle_type?: string;
  vehicle_manufacturer?: string;
  vehicle_model?: string;
  vehicle_fuel_type?: string;
  vehicle_reg_date?: string;
  vehicle_pincode?: string;
}

const LeadManagement = () => {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get('type') || 'health';

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [search, setSearch] = useState('');

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, [typeFilter]);

  useEffect(() => {
    const handleNewLeadEvent = (e: any) => {
      const newLead = e.detail;
      // Only add to table if it matches current type filter
      if (newLead.type === typeFilter) {
        setLeads(prev => [newLead, ...prev]);
      }
    };
    
    leadEventEmitter.addEventListener('new-lead', handleNewLeadEvent);
    return () => leadEventEmitter.removeEventListener('new-lead', handleNewLeadEvent);
  }, [typeFilter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`}/api/leads?type=${typeFilter}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = useMemo(() => {
    const q = search.toLowerCase();
    return leads.filter(lead => {
      const matchStatus = statusFilter === 'All' || lead.status === statusFilter;
      const matchDate = dateFilter === '' || lead.date === dateFilter;
      const matchSearch = !q || lead.name.toLowerCase().includes(q) || lead.phone.includes(q) || (lead.email || '').toLowerCase().includes(q);
      return matchStatus && matchDate && matchSearch;
    });
  }, [leads, statusFilter, dateFilter, search]);

  const updateStatus = async (id: string, newStatus: 'Pending' | 'Closed' | 'Agreed') => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`}/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const updatedLead = leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead);
        setLeads(updatedLead);
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error('Failed to update status');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status');
    }
  };

  const handleUploadPolicy = async (id: string, file: File) => {
    if (!file || file.type !== 'application/pdf') {
      return toast.error('Please select a valid PDF file');
    }
    
    setUploadingPdf(true);
    const formData = new FormData();
    formData.append('document', file);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`}/api/leads/${id}/document`, {
        method: 'POST',
        body: formData
      });
      
      if (res.ok) {
        const updatedLead = await res.json();
        setLeads(leads.map(lead => lead.id === id ? { ...lead, policy_document_url: updatedLead.policy_document_url } : lead));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, policy_document_url: updatedLead.policy_document_url });
        }
        toast.success('Policy document uploaded successfully!');
      } else {
        toast.error('Failed to upload document');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error uploading document');
    } finally {
      setUploadingPdf(false);
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text(`${typeFilter.toUpperCase()} Insurance Leads`, 14, 15);
    
    const tableColumn = ["Name", "Phone", "Email", "Date", "Status"];
    const tableRows = filteredLeads.map(lead => [lead.name, lead.phone, lead.email, lead.date, lead.status]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: 'grid',
      headStyles: { fillColor: [46, 159, 104] } // primary-color
    });

    doc.save(`leads_${typeFilter}.pdf`);
    toast.success('PDF Exported');
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLeads.map(lead => ({
      Name: lead.name, Phone: lead.phone, Email: lead.email, Date: lead.date, Status: lead.status
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");
    XLSX.writeFile(workbook, `leads_${typeFilter}.xlsx`);
    toast.success('Excel Exported');
  };

  // removed early return for loading

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--text-dark, #1f2937)', margin: 0, textTransform: 'capitalize' }}>
          {typeFilter} Insurance Leads
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={exportToPDF} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
            backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
          }}>
            <FiDownload /> Export PDF
          </button>
          <button onClick={exportToExcel} style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem',
            backgroundColor: 'var(--success-color, #10b981)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500
          }}>
            <FiDownload /> Export Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: '1px solid var(--border-color, #e5e7eb)', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: '1 1 200px', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', padding: '0.4rem 0.75rem', backgroundColor: '#f9fafb' }}>
          <FiSearch color="#9ca3af" size={15} />
          <input
            type="text"
            placeholder="Search by name, phone or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.9rem', color: 'var(--text-dark, #1f2937)', width: '100%' }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 0 }}>
              <FiX size={14} />
            </button>
          )}
        </div>
        {/* Status filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiFilter color="#6b7280" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none', backgroundColor: 'white', color: 'var(--text-dark, #1f2937)' }}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Agreed">Agreed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        {/* Date filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Date:</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none', color: 'var(--text-dark, #1f2937)' }}
          />
          {dateFilter && (
            <button onClick={() => setDateFilter('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem' }}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive-wrapper" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid var(--border-color, #e5e7eb)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color, #e5e7eb)', textAlign: 'left' }}>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600 }}>Name</th>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600 }}>Contact Info</th>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600 }}>Date</th>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', color: '#6b7280', fontWeight: 600, textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={`skeleton-${i}`} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '120px', height: '20px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div className="skeleton-box" style={{ width: '150px', height: '16px', marginBottom: '8px' }}></div><br/>
                    <div className="skeleton-box" style={{ width: '100px', height: '14px' }}></div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '80px', height: '18px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '70px', height: '24px', borderRadius: '12px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '180px', height: '28px', margin: '0 auto', display: 'block' }}></div></td>
                </tr>
              ))
            ) : filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
              <tr key={lead.id} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td 
                  style={{ padding: '1rem 1.5rem', cursor: 'pointer' }}
                  onClick={() => setSelectedLead(lead)}
                >
                  <div style={{ fontWeight: 500, color: 'var(--text-dark, #1f2937)' }}>{lead.name}</div>
                  {lead.type === 'life' && lead.specific_plan && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary-color, #2e9f68)', marginTop: '0.25rem', fontWeight: 600 }}>
                      {lead.specific_plan} Insurance
                    </div>
                  )}
                  {lead.type === 'vehicle' && lead.vehicle_manufacturer && (
                    <div style={{ fontSize: '0.8rem', color: '#d97706', marginTop: '0.25rem', fontWeight: 600 }}>
                      {lead.vehicle_manufacturer} {lead.vehicle_model}
                    </div>
                  )}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem' }}>
                  <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{lead.email}</div>
                  <div style={{ color: '#6b7280' }}>
                    <a href={`tel:${lead.phone}`} style={{ textDecoration: 'none', color: 'inherit' }} title="Click to Call">
                      {lead.phone}
                    </a>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: '#6b7280' }}>{lead.date}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 500,
                    backgroundColor: lead.status === 'Agreed' ? '#dcfce7' : lead.status === 'Closed' ? '#f3f4f6' : '#fef9c3',
                    color: lead.status === 'Agreed' ? 'var(--success-color, #10b981)' : lead.status === 'Closed' ? '#374151' : '#d97706'
                  }}>
                    {lead.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    <button 
                      onClick={() => setSelectedLead(lead)}
                      title="View Full Details"
                      style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '6px', background: 'var(--primary-color, #2e9f68)', color: 'white', cursor: 'pointer' }}
                    >
                      <FiEye size={16} />
                    </button>
                    
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value as 'Pending' | 'Closed' | 'Agreed')}
                      style={{
                        padding: '0.4rem 2rem 0.4rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        border: `1px solid ${
                          lead.status === 'Agreed' ? 'var(--success-color, #10b981)' : 
                          lead.status === 'Closed' ? '#9ca3af' : '#d97706'
                        }`,
                        borderRadius: '6px',
                        backgroundColor: lead.status === 'Agreed' ? '#f0fdf4' : lead.status === 'Closed' ? '#f9fafb' : '#fefce8',
                        color: lead.status === 'Agreed' ? 'var(--success-color, #10b981)' : lead.status === 'Closed' ? '#4b5563' : '#d97706',
                        cursor: 'pointer',
                        outline: 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Agreed">Agreed</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                  No leads found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Lead Details Modal */}
      {selectedLead && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '600px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', overflow: 'hidden', display: 'flex', flexDirection: 'column',
            maxHeight: '90vh'
          }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color, #e5e7eb)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
              <div>
                <h2 style={{ margin: '0 0 0.25rem', color: 'var(--text-dark, #1f2937)', fontSize: '1.4rem' }}>{selectedLead.name}</h2>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Lead ID: #{selectedLead.id} • Submitted: {selectedLead.date}</div>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '0.5rem' }}
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div className="details-grid" style={{ padding: '1.5rem', overflowY: 'auto', WebkitOverflowScrolling: 'touch', flex: 1, minHeight: 0, display: 'grid', gap: '1.5rem' }}>
              {/* Contact Info */}
              <div style={{ gridColumn: '1 / -1' }}>
                <h4 style={{ margin: '0 0 0.75rem', color: 'var(--primary-color, #2e9f68)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Information</h4>
                <div className="details-grid" style={{ display: 'grid', gap: '1rem', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Email</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{selectedLead.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Phone Number</div>
                    <a 
                      href={`tel:${selectedLead.phone}`} 
                      style={{ color: 'var(--primary-color, #2e9f68)', fontWeight: 600, textDecoration: 'none' }}
                      title="Click to Call"
                    >
                      {selectedLead.phone}
                    </a>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Location / Pincode</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>
                      {selectedLead.type === 'vehicle'
                        ? (selectedLead.vehicle_pincode || 'Not provided')
                        : (selectedLead.location || 'Not provided')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details — hidden for vehicle leads */}
              {selectedLead.type !== 'vehicle' && (
              <div>
                <h4 style={{ margin: '0 0 0.75rem', color: 'var(--primary-color, #2e9f68)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Details</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Gender</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{selectedLead.gender || 'Not provided'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Smoker/Tobacco User</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{selectedLead.smoker || 'Not provided'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Education</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{selectedLead.education || 'Not provided'}</div>
                  </div>
                  {(selectedLead.type === 'health' || selectedLead.type === 'life') && selectedLead.members && (
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Members to Insure</div>
                      <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {selectedLead.members.split(',').map(m => (
                          <span key={m} style={{ background: '#eef2ff', color: '#4f46e5', padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem' }}>{m.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              )}

              {/* Financial & Insurance — hidden for vehicle leads */}
              {selectedLead.type !== 'vehicle' && (
              <div>
                <h4 style={{ margin: '0 0 0.75rem', color: 'var(--primary-color, #2e9f68)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Financial &amp; Request</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Employment Type</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{selectedLead.employment_type || 'Not provided'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Annual Income</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{selectedLead.annual_income || 'Not provided'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Plan Requested</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>
                      {selectedLead.type === 'health'
                        ? 'Health Insurance'
                        : `${selectedLead.type.charAt(0).toUpperCase() + selectedLead.type.slice(1)} Insurance${selectedLead.specific_plan ? ` (${selectedLead.specific_plan})` : ''}`}
                    </div>
                  </div>
                </div>
              </div>
              )}

              {/* Vehicle Details — shown only for vehicle leads */}
              {selectedLead.type === 'vehicle' && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <h4 style={{ margin: '0 0 0.75rem', color: '#d97706', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🚗 Vehicle Details</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '1rem', backgroundColor: '#fffbeb', padding: '1rem', borderRadius: '8px', border: '1px solid #fde68a' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Vehicle Number</div>
                      <div style={{ color: '#1f2937', fontWeight: 600, fontFamily: 'monospace', letterSpacing: '0.05em' }}>{selectedLead.vehicle_number || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Vehicle Type</div>
                      <div style={{ color: '#1f2937', fontWeight: 500 }}>{selectedLead.vehicle_type ? `${selectedLead.vehicle_type} Wheeler` : 'N/A'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Manufacturer</div>
                      <div style={{ color: '#1f2937', fontWeight: 500 }}>{selectedLead.vehicle_manufacturer || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Model</div>
                      <div style={{ color: '#1f2937', fontWeight: 500 }}>{selectedLead.vehicle_model || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Fuel Type</div>
                      <div style={{ color: '#1f2937', fontWeight: 500 }}>{selectedLead.vehicle_fuel_type || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Registration Date</div>
                      <div style={{ color: '#1f2937', fontWeight: 500 }}>{selectedLead.vehicle_reg_date || 'N/A'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Pincode</div>
                      <div style={{ color: '#1f2937', fontWeight: 600 }}>{selectedLead.vehicle_pincode || 'N/A'}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Policy Document Management */}
              {selectedLead.status === 'Agreed' && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <h4 style={{ margin: '0 0 0.75rem', color: 'var(--primary-color, #2e9f68)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Policy Document</h4>
                  <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '8px', border: '1px dashed #d1d5db', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    
                    {selectedLead.policy_document_url ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
                        <div style={{ color: 'var(--success-color, #10b981)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                          <FiFileText size={20} /> Policy PDF is active
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                          <button onClick={() => setIsPdfViewerOpen(true)} style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}>
                            <FiEye /> View Document
                          </button>
                          <a href={selectedLead.policy_document_url} target="_blank" rel="noopener noreferrer" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#e5e7eb', color: '#374151', textDecoration: 'none', borderRadius: '6px', fontWeight: 500 }}>
                            <FiDownload /> Download Original
                          </a>
                          <label style={{ cursor: 'pointer', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'transparent', border: '1px solid #d1d5db', color: '#4b5563', borderRadius: '6px', fontWeight: 500 }}>
                            <FiUpload /> {uploadingPdf ? 'Uploading...' : 'Update PDF'}
                            <input type="file" accept="application/pdf" style={{ display: 'none' }} disabled={uploadingPdf} onChange={(e) => { if (e.target.files && e.target.files[0]) handleUploadPolicy(selectedLead.id, e.target.files[0]) }} />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <div style={{ textAlign: 'center' }}>
                        <p style={{ color: '#4b5563', marginBottom: '1rem', fontSize: '0.9rem' }}>Application is agreed. Please generate and upload the final policy PDF for the customer.</p>
                        <label style={{ cursor: 'pointer', padding: '0.75rem 1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--primary-color, #2e9f68)', color: 'white', borderRadius: '6px', fontWeight: 600, transition: 'opacity 0.2s' }}>
                          <FiUpload /> {uploadingPdf ? 'Uploading...' : 'Upload Policy PDF'}
                          <input type="file" accept="application/pdf" style={{ display: 'none' }} disabled={uploadingPdf} onChange={(e) => { if (e.target.files && e.target.files[0]) handleUploadPolicy(selectedLead.id, e.target.files[0]) }} />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color, #e5e7eb)', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setSelectedLead(null)}
                style={{ padding: '0.75rem 1.5rem', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedLead && selectedLead.policy_document_url && (
        <PDFViewerModal
          isOpen={isPdfViewerOpen}
          onClose={() => setIsPdfViewerOpen(false)}
          title={`Policy PDF - ${selectedLead.name}`}
          fileUrl={selectedLead.policy_document_url}
        />
      )}
    </div>
  );
};

export default LeadManagement;
