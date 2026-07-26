import { useState, useEffect } from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { leadEventEmitter } from '../../hooks/useRealTimeLeads';

interface CallRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  preferred_time: string;
  status: 'Pending' | 'Contacted' | 'Closed';
  created_at: string;
}

const CallRequests = () => {
  const [requests, setRequests] = useState<CallRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    const handleNewCallEvent = (e: any) => {
      const newCall = e.detail;
      // If it has preferred_time, it's a call request
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
      const response = await fetch('http://localhost:3000/api/calls');
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error('Failed to fetch call requests:', err);
      toast.error('Failed to load call requests');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'Pending' | 'Contacted' | 'Closed') => {
    try {
      const response = await fetch(`http://localhost:3000/api/calls/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Update failed');
      
      setRequests(requests.map(req => req.id === id ? { ...req, status } : req));
      toast.success('Status updated successfully');
    } catch (err) {
      toast.error('Failed to update status');
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
    <div className="call-requests">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-dark, #1f2937)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiPhoneCall /> Call Requests
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Manage and track expert consultation bookings.</p>
        </div>
        <button 
          onClick={fetchRequests}
          style={{ padding: '0.5rem 1rem', background: 'white', border: '1px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
        >
          Refresh Data
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive-wrapper" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid var(--border-color, #e5e7eb)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color, #e5e7eb)', textAlign: 'left' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase' }}>Requested By</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase' }}>Contact Info</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase' }}>Preferred Time</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase' }}>Request Date</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '120px', height: '20px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div className="skeleton-box" style={{ width: '180px', height: '16px', marginBottom: '8px' }}></div>
                    <div className="skeleton-box" style={{ width: '100px', height: '14px' }}></div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '100px', height: '20px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '140px', height: '20px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '100px', height: '32px', margin: '0 auto' }}></div></td>
                </tr>
              ))
            ) : requests.length > 0 ? (
              requests.map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-dark, #1f2937)' }}>
                  {req.name}
                </td>
                <td style={{ padding: '1rem 1.5rem', fontSize: '0.9rem' }}>
                  <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{req.email}</div>
                  <div style={{ color: '#6b7280', marginTop: '0.2rem' }}>
                    <a href={`tel:${req.phone}`} style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <FiPhoneCall size={12} /> {req.phone}
                    </a>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: '#4b5563', textTransform: 'capitalize' }}>
                  {req.preferred_time}
                </td>
                <td style={{ padding: '1rem 1.5rem', color: '#6b7280', fontSize: '0.9rem' }}>
                  {formatDate(req.created_at)}
                </td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'center' }}>
                  <select
                    value={req.status}
                    onChange={(e) => updateStatus(req.id, e.target.value as 'Pending' | 'Contacted' | 'Closed')}
                    style={{
                      padding: '0.4rem 2rem 0.4rem 0.75rem',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      border: `1px solid ${
                        req.status === 'Contacted' ? '#3b82f6' : 
                        req.status === 'Closed' ? '#9ca3af' : '#d97706'
                      }`,
                      borderRadius: '6px',
                      backgroundColor: req.status === 'Contacted' ? '#eff6ff' : req.status === 'Closed' ? '#f9fafb' : '#fefce8',
                      color: req.status === 'Contacted' ? '#3b82f6' : req.status === 'Closed' ? '#4b5563' : '#d97706',
                      cursor: 'pointer',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))) : (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                  <div style={{ marginBottom: '1rem' }}><FiPhoneCall size={32} opacity={0.3} /></div>
                  No call requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CallRequests;
