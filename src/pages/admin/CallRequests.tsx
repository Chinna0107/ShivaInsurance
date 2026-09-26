import { useState, useEffect } from 'react';
import { FiPhoneCall, FiEye, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { leadEventEmitter } from '../../hooks/useRealTimeLeads';

interface CallRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferred_time: string;
  notes: string | null;
  reminder: string | null;
  status: 'Pending' | 'Contacted' | 'Closed';
  created_at: string;
}

const CallRequests = () => {
  const [requests, setRequests] = useState<CallRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<CallRequest | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    const handleNewCallEvent = (e: any) => {
      const newCall = e.detail;
      if (newCall.preferred_time) {
        setRequests(prev => [newCall, ...prev]);
      }
    };
    
    leadEventEmitter.addEventListener('new-call-request', handleNewCallEvent);
    return () => leadEventEmitter.removeEventListener('new-call-request', handleNewCallEvent);
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/calls`);
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error('Failed to fetch call requests:', err);
      toast.error('Failed to load call requests');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/calls/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Update failed');
      
      setRequests(requests.map(req => req.id === id ? { ...req, status: status as any } : req));
      if (selectedRequest && selectedRequest.id === id) {
        setSelectedRequest(prev => prev ? { ...prev, status: status as any } : null);
      }
      toast.success('Status updated successfully');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleStatusChange = async (req: CallRequest, newStatus: string) => {
    if (['health', 'life', 'vehicle'].includes(newStatus)) {
      try {
        const leadRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/leads`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: req.name,
            phone: req.phone,
            email: req.email,
            date: new Date().toISOString().split('T')[0],
            type: newStatus,
            status: 'Pending'
          })
        });
        if (leadRes.ok) {
          toast.success(`Pushed to ${newStatus} leads!`);
          await updateStatus(req.id, newStatus);
        } else {
          toast.error('Failed to push to leads');
        }
      } catch (err) {
        toast.error('Error pushing to leads');
      }
    } else {
      await updateStatus(req.id, newStatus);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this call request?')) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/calls/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setRequests(requests.filter(req => req.id !== id));
        toast.success('Call request deleted successfully');
      } else {
        toast.error('Failed to delete call request');
      }
    } catch (err) {
      toast.error('Error deleting call request');
    }
  };

  const updateReminder = async (id: string, reminder: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/calls/${id}/reminder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reminder })
      });
      if (!response.ok) throw new Error('Update failed');
      
      setRequests(requests.map(req => req.id === id ? { ...req, reminder } : req));
      toast.success('Reminder updated');
    } catch (err) {
      toast.error('Failed to update reminder');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div style={{ padding: '1.5rem', width: '100%', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPhoneCall color="#2e9f68" />
            Call Requests
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Manage and track expert consultation bookings.</p>
        </div>
        <button 
          onClick={fetchRequests}
          style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
        >
          Refresh Data
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid #e5e7eb', width: '100%', overflowX: 'auto', display: 'block' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', whiteSpace: 'nowrap', textAlign: 'left', minWidth: '900px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Requested By</th>
              <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: '200px' }}>Contact Info</th>
              <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preferred Time</th>
              <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Notes</th>
              <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', minWidth: '180px' }}>Reminder / Note</th>
              <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Request Date</th>
              <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
              <th style={{ padding: '0.75rem 1rem', color: '#6b7280', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td colSpan={8} style={{ padding: '1.5rem' }}>Loading...</td>
                </tr>
              ))
            ) : requests.length > 0 ? (
              requests.map((req) => (
              <tr 
                key={req.id} 
                style={{ borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s', backgroundColor: req.status === 'Pending' ? '#f0fdf4' : 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = req.status === 'Pending' ? '#f0fdf4' : 'transparent'}
              >
                <td style={{ padding: '0.75rem 1rem', color: '#1f2937', fontWeight: 500, verticalAlign: 'middle', whiteSpace: 'normal', minWidth: '120px' }}>
                  {req.name}
                </td>
                <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', whiteSpace: 'normal', wordBreak: 'break-all', maxWidth: '250px' }}>
                  <div style={{ color: '#1f2937', fontWeight: 500 }}>{req.email}</div>
                  <div style={{ color: '#6b7280', marginTop: '0.2rem' }}>
                    <a href={`tel:${req.phone}`} style={{ color: '#2e9f68', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', wordBreak: 'break-all' }}>
                      <FiPhoneCall size={12} style={{ flexShrink: 0 }} /> <span>{req.phone}</span>
                    </a>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', color: '#4b5563', textTransform: 'capitalize', whiteSpace: 'normal' }}>
                  {req.preferred_time || 'Anytime'}
                </td>
                <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', color: '#4b5563', whiteSpace: 'normal', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {req.notes || <span style={{ opacity: 0.4 }}>—</span>}
                </td>
                <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle' }}>
                  <input
                    type="text"
                    defaultValue={req.reminder || ''}
                    placeholder="Type a reminder..."
                    style={{ padding: '0.4rem 0.5rem', fontSize: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '6px', width: '100%', minWidth: '150px', maxWidth: '220px', outline: 'none', color: '#1f2937', backgroundColor: '#f9fafb' }}
                    onFocus={(e) => e.target.style.borderColor = '#2e9f68'}
                    onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; updateReminder(req.id, e.target.value); }}
                  />
                </td>
                <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', color: '#6b7280', whiteSpace: 'nowrap' }}>
                  {formatDate(req.created_at)}
                </td>
                <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                  <span style={{ 
                    padding: '0.125rem 0.625rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500,
                    backgroundColor: req.status === 'Closed' ? '#f3f4f6' : req.status === 'Pending' ? '#e0e7ff' : ['health', 'life', 'vehicle'].includes(req.status) ? '#dcfce7' : '#fef9c3',
                    color: req.status === 'Closed' ? '#374151' : req.status === 'Pending' ? '#4338ca' : ['health', 'life', 'vehicle'].includes(req.status) ? '#10b981' : '#d97706',
                    display: 'inline-block'
                  }}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minWidth: '160px' }}>
                    <button 
                      onClick={() => setSelectedRequest(req)}
                      title="View Full Details"
                      style={{ padding: '0.5rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #2e9f68', borderRadius: '6px', background: '#2e9f68', color: 'white', cursor: 'pointer' }}
                    >
                      <FiEye size={14} />
                    </button>
                    <select
                      value={req.status}
                      onChange={(e) => handleStatusChange(req, e.target.value)}
                      style={{
                        padding: '0.4rem 0.5rem',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        fontSize: '0.8rem',
                        color: '#374151',
                        backgroundColor: 'white',
                        outline: 'none',
                        cursor: 'pointer',
                        minWidth: '110px'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Closed">Closed</option>
                      {['health', 'life', 'vehicle'].includes(req.status) ? (
                        <option value={req.status} disabled>Moved to {req.status}</option>
                      ) : (
                        <optgroup label="Push to Leads">
                          <option value="health">Health Insurance</option>
                          <option value="life">Life Insurance</option>
                          <option value="vehicle">Vehicle Insurance</option>
                        </optgroup>
                      )}
                    </select>
                    {(req.status === 'Pending' || req.status === 'Contacted') && (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(req.id); }}
                        title="Delete Request"
                        style={{ padding: '0.5rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '6px', background: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                  <div style={{ marginBottom: '1rem' }}><FiPhoneCall size={32} opacity={0.3} /></div>
                  No call requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
              <div>
                <h2 style={{ margin: '0 0 0.25rem', color: '#1f2937', fontSize: '1.4rem' }}>Call Request: {selectedRequest.name}</h2>
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
              <div style={{ gridColumn: '1 / -1' }}>
                <h4 style={{ margin: '0 0 0.75rem', color: '#2e9f68', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Phone Number</div>
                    <a 
                      href={`tel:${selectedRequest.phone}`} 
                      style={{ color: '#2e9f68', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {selectedRequest.phone}
                    </a>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Email Address</div>
                    <a 
                      href={`mailto:${selectedRequest.email}`} 
                      style={{ color: '#1f2937', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {selectedRequest.email}
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <h4 style={{ margin: '0 0 0.75rem', color: '#2e9f68', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Requirement Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Preferred Time</div>
                    <div style={{ color: '#1f2937', fontWeight: 500, textTransform: 'capitalize' }}>{selectedRequest.preferred_time || 'Anytime'}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.25rem' }}>Notes</div>
                    <div style={{ color: '#1f2937', fontWeight: 500 }}>{selectedRequest.notes || 'None'}</div>
                  </div>
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                <h4 style={{ margin: '0 0 0.75rem', color: '#1f2937', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Update Status</h4>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {['Pending', 'Contacted', 'Closed', 'health', 'life', 'vehicle'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedRequest, status)}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '6px',
                        border: '1px solid',
                        fontWeight: 500,
                        cursor: selectedRequest.status === status ? 'default' : 'pointer',
                        borderColor: selectedRequest.status === status ? (['health', 'life', 'vehicle'].includes(status) ? '#10b981' : '#2e9f68') : '#e5e7eb',
                        backgroundColor: selectedRequest.status === status ? (['health', 'life', 'vehicle'].includes(status) ? '#dcfce7' : 'rgba(46, 159, 104, 0.1)') : 'white',
                        color: selectedRequest.status === status ? (['health', 'life', 'vehicle'].includes(status) ? '#10b981' : '#2e9f68') : '#4b5563',
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

export default CallRequests;
