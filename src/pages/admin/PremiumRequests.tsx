import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiUsers, FiClock, FiCheckCircle, FiPhoneCall, FiFilter, FiEye, FiX } from 'react-icons/fi';
import { leadEventEmitter } from '../../hooks/useRealTimeLeads';
interface PremiumRequest {
  id: number;
  name: string;
  age: string;
  cover_amount: string;
  gender: string;
  phone: string;
  email: string;
  policy_name: string;
  status: string;
  reminder?: string;
  created_at: string;
}

const PremiumRequests: React.FC = () => {
  const [requests, setRequests] = useState<PremiumRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<PremiumRequest | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/premium-requests`);
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      toast.error('Failed to fetch premium requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    
    // Auto refresh on new request
    const handleNewRequest = () => {
      fetchRequests();
    };
    
    leadEventEmitter.addEventListener('new-premium-request', handleNewRequest as EventListener);
    
    return () => {
      leadEventEmitter.removeEventListener('new-premium-request', handleNewRequest as EventListener);
    };
  }, []);

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    if (['health', 'life', 'vehicle'].includes(newStatus)) {
      const reqDetails = requests.find(r => r.id === id);
      if (!reqDetails) return;
      try {
        const leadRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: reqDetails.name,
            phone: reqDetails.phone,
            email: reqDetails.email,
            date: new Date().toISOString().split('T')[0],
            type: newStatus,
            status: 'Pending'
          })
        });
        if (leadRes.ok) {
          toast.success(`Pushed to ${newStatus} leads!`);
        } else {
          toast.error('Failed to push to leads');
          return;
        }
      } catch (err) {
        toast.error('Error pushing to leads');
        return;
      }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/premium-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (response.ok) {
        toast.success('Status updated successfully');
        fetchRequests();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this premium request?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/premium-requests/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast.success('Request deleted successfully');
        setRequests(requests.filter(req => req.id !== id));
      } else {
        toast.error('Failed to delete request');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
    }
  };

  const handleUpdateReminder = async (id: number, reminder: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/premium-requests/${id}/reminder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reminder })
      });
      
      if (response.ok) {
        toast.success('Reminder updated');
        setRequests(requests.map(r => r.id === id ? { ...r, reminder } : r));
      } else {
        toast.error('Failed to update reminder');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const contactedRequests = requests.filter(r => r.status === 'Contacted').length;
  const closedRequests = requests.filter(r => r.status === 'Closed').length;

  return (
    <div className="admin-page">
      <div className="page-header" style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>Premium Requests</h2>
          <p style={{ color: '#6b7280' }}>Manage customer requests for customized premium quotes</p>
        </div>
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FiFilter size={16} /> Filter
        </button>
      </div>
      <style>{`
        .stats-grid {
          display: grid;
          gap: 1.5rem;
          margin-bottom: 2rem;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>

      <div className="stats-grid">
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#6b7280', margin: 0 }}>Total Requests</h3>
            <div style={{ backgroundColor: '#f3f4f6', padding: '0.5rem', borderRadius: '8px', color: '#4b5563' }}><FiUsers size={20} /></div>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{totalRequests}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #e0e7ff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4338ca', margin: 0 }}>Pending</h3>
            <div style={{ backgroundColor: '#e0e7ff', padding: '0.5rem', borderRadius: '8px', color: '#4338ca' }}><FiClock size={20} /></div>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{pendingRequests}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #fef3c7' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#d97706', margin: 0 }}>Contacted</h3>
            <div style={{ backgroundColor: '#fef3c7', padding: '0.5rem', borderRadius: '8px', color: '#d97706' }}><FiPhoneCall size={20} /></div>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{contactedRequests}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #d1fae5' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#059669', margin: 0 }}>Closed</h3>
            <div style={{ backgroundColor: '#d1fae5', padding: '0.5rem', borderRadius: '8px', color: '#059669' }}><FiCheckCircle size={20} /></div>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{closedRequests}</p>
        </div>
      </div>

      <div className="table-container" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', border: '1px solid #f3f4f6', overflowX: 'auto' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading requests...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Policy Name</th>
                <th>Reminder</th>
                <th>Status</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={8} >No premium requests found.</td>
                </tr>
              ) : (
                requests.map(req => (
                  <tr key={req.id}>
                    <td onClick={() => setSelectedRequest(req)} style={{ cursor: 'pointer', fontWeight: 500, color: 'var(--text-dark, #1f2937)' }}>#{req.id}</td>
                    <td >{new Date(req.created_at).toLocaleDateString()}</td>
                    <td >{req.name}</td>
                    <td >{req.email}</td>
                    <td >
                      <a href={`tel:${req.phone}`} style={{ color: 'var(--primary-color, #2e9f68)', textDecoration: 'none' }}>
                        {req.phone}
                      </a>
                    </td>
                    <td >{req.policy_name || <span style={{ color: '#9ca3af' }}>N/A</span>}</td>
                    <td>
                      <input
                        type="text"
                        defaultValue={req.reminder || ''}
                        onBlur={(e) => handleUpdateReminder(req.id, e.target.value)}
                        placeholder="Type a reminder..."
                        className="admin-reminder-input"
                      />
                    </td>
                    <td>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 500,
                        backgroundColor: req.status === 'Closed' ? '#f3f4f6' : req.status === 'Pending' ? '#e0e7ff' : ['health', 'life', 'vehicle'].includes(req.status) ? '#dcfce7' : '#fef9c3',
                        color: req.status === 'Closed' ? '#374151' : req.status === 'Pending' ? '#4338ca' : ['health', 'life', 'vehicle'].includes(req.status) ? '#10b981' : '#d97706'
                      }}>
                        {req.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions-container" style={{ justifyContent: 'center' }}>
                        <button 
                          onClick={() => setSelectedRequest(req)}
                          title="View Full Details"
                          className="admin-btn-view"
                        >
                          <FiEye size={16} />
                        </button>
                        {req.status === 'Pending' && (
                          <button 
                            className="btn btn-outline" 
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', borderRadius: '6px', color: '#4338ca', borderColor: '#4338ca' }}
                            onClick={() => handleUpdateStatus(req.id, 'Contacted')}
                          >
                            <FiPhoneCall size={14} /> Contacted
                          </button>
                        )}
                        {req.status === 'Contacted' && (
                          <button 
                            className="btn btn-outline" 
                            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', borderRadius: '6px', color: '#059669', borderColor: '#059669' }}
                            onClick={() => handleUpdateStatus(req.id, 'Closed')}
                          >
                            <FiCheckCircle size={14} /> Close
                          </button>
                        )}
                        {(req.status === 'Pending' || req.status === 'Contacted') && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(req.id); }}
                            title="Delete Request"
                            className="admin-btn-delete"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* View Request Details Modal */}
      {selectedRequest && (
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
                <h2 style={{ margin: '0 0 0.25rem', color: 'var(--text-dark, #1f2937)', fontSize: '1.4rem' }}>Premium Request: {selectedRequest.name}</h2>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>Submitted: {new Date(selectedRequest.created_at).toLocaleString()} | #{selectedRequest.id}</div>
              </div>
              <button 
                onClick={() => setSelectedRequest(null)}
                style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', padding: '0.5rem' }}
              >
                <FiX size={24} />
              </button>
            </div>
            
            <div style={{ padding: '1.5rem', overflowY: 'auto', WebkitOverflowScrolling: 'touch', flex: 1, minHeight: 0, display: 'grid', gap: '1.5rem' }}>
              {/* Contact Info */}
              <div style={{ gridColumn: '1 / -1' }}>
                <h4 style={{ margin: '0 0 0.75rem', color: 'var(--primary-color, #2e9f68)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Phone Number</div>
                    <a 
                      href={`tel:${selectedRequest.phone}`} 
                      style={{ color: 'var(--primary-color, #2e9f68)', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {selectedRequest.phone}
                    </a>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Email Address</div>
                    <a 
                      href={`mailto:${selectedRequest.email}`} 
                      style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {selectedRequest.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Requirement Details */}
              <div style={{ gridColumn: '1 / -1' }}>
                <h4 style={{ margin: '0 0 0.75rem', color: 'var(--primary-color, #2e9f68)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Requirement Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Policy Interested In</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{selectedRequest.policy_name || 'General Quote'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Cover Needed</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{selectedRequest.cover_amount}</div>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div style={{ gridColumn: '1 / -1' }}>
                <h4 style={{ margin: '0 0 0.75rem', color: 'var(--primary-color, #2e9f68)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Gender</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500, textTransform: 'capitalize' }}>{selectedRequest.gender}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Age</div>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{selectedRequest.age} Years</div>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div style={{ gridColumn: '1 / -1', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color, #e5e7eb)' }}>
                <h4 style={{ margin: '0 0 0.75rem', color: '#1f2937', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Update Status</h4>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {['Pending', 'Contacted', 'Closed', 'health', 'life', 'vehicle'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleUpdateStatus(selectedRequest.id, status)}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '6px',
                        border: '1px solid',
                        fontWeight: 500,
                        cursor: selectedRequest.status === status ? 'default' : 'pointer',
                        borderColor: selectedRequest.status === status ? (['health', 'life', 'vehicle'].includes(status) ? '#10b981' : 'var(--primary-color, #2e9f68)') : '#e5e7eb',
                        backgroundColor: selectedRequest.status === status ? (['health', 'life', 'vehicle'].includes(status) ? '#dcfce7' : 'rgba(46, 159, 104, 0.1)') : 'white',
                        color: selectedRequest.status === status ? (['health', 'life', 'vehicle'].includes(status) ? '#10b981' : 'var(--primary-color, #2e9f68)') : '#4b5563',
                        transition: 'all 0.2s',
                        textTransform: ['health', 'life', 'vehicle'].includes(status) ? 'capitalize' : 'none'
                      }}
                      disabled={selectedRequest.status === status}
                    >
                      {['health', 'life', 'vehicle'].includes(status) ? `Push to ${status}` : status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumRequests;
