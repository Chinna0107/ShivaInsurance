import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  FiRefreshCw,
  FiEye,
  FiX,
  FiFilter,
  FiSearch,
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiTrash2,
} from 'react-icons/fi';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface ClaimRequest {
  id: number;
  policy_number: string;
  registered_name: string;
  mobile_number: string;
  email_id: string;
  claim_issue: string;
  plan_type: string;
  status: string;
  created_at: string;
}

const STATUS_OPTIONS = ['Pending', 'In Progress', 'Resolved', 'Rejected'];

const STATUS_STYLES: Record<string, { bg: string; color: string; border: string; icon: React.ReactNode }> = {
  Pending:     { bg: '#fefce8', color: '#d97706', border: '#fde68a', icon: <FiClock size={12} /> },
  'In Progress': { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe', icon: <FiRefreshCw size={12} /> },
  Resolved:    { bg: '#f0fdf4', color: '#16a34a', border: '#bbf7d0', icon: <FiCheckCircle size={12} /> },
  Rejected:    { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', icon: <FiAlertCircle size={12} /> },
};

const ClaimRequests: React.FC = () => {
  const [claims, setClaims]           = useState<ClaimRequest[]>([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPlan, setFilterPlan]   = useState('All');
  const [selectedClaim, setSelectedClaim] = useState<ClaimRequest | null>(null);
  const [updatingId, setUpdatingId]   = useState<number | null>(null);

  const fetchClaims = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/claims`);
      if (res.ok) {
        const data = await res.json();
        setClaims(Array.isArray(data) ? data : []);
      } else {
        toast.error('Failed to fetch claim requests');
      }
    } catch {
      toast.error('Network error while fetching claims');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClaims();
  }, [fetchClaims]);

  const updateStatus = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API}/api/claims/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setClaims((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        );
        if (selectedClaim?.id === id) {
          setSelectedClaim((prev) => prev ? { ...prev, status: newStatus } : prev);
        }
        toast.success(`Status updated to "${newStatus}"`);
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('Network error while updating');
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteClaim = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this claim request?')) return;
    try {
      const res = await fetch(`${API}/api/claims/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setClaims((prev) => prev.filter((c) => c.id !== id));
        if (selectedClaim?.id === id) setSelectedClaim(null);
        toast.success('Claim request deleted');
      } else {
        toast.error('Failed to delete claim request');
      }
    } catch {
      toast.error('Network error while deleting');
    }
  };

  /* ── Filtered list ── */
  const filtered = claims.filter((c) => {
    const matchSearch =
      !search ||
      c.registered_name.toLowerCase().includes(search.toLowerCase()) ||
      c.policy_number.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile_number.includes(search) ||
      c.email_id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchPlan   = filterPlan === 'All' || c.plan_type === filterPlan;
    return matchSearch && matchStatus && matchPlan;
  });

  /* ── Summary counts ── */
  const counts = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = claims.filter((c) => c.status === s).length;
    return acc;
  }, {} as Record<string, number>);

  const StatusBadge = ({ status }: { status: string }) => {
    const st = STATUS_STYLES[status] ?? STATUS_STYLES['Pending'];
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px',
          padding: '0.3rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.78rem',
          fontWeight: 700,
          background: st.bg,
          color: st.color,
          border: `1px solid ${st.border}`,
        }}
      >
        {st.icon} {status}
      </span>
    );
  };

  return (
    <div className="admin-page">
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            🗂️ Claim Requests
          </h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Manage and update submitted claim requests
          </p>
        </div>
        <button
          onClick={fetchClaims}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.6rem 1.25rem', background: 'white', border: '1.5px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, color: '#374151', transition: 'all 0.2s' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.color = 'var(--primary-color)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#374151'; }}
        >
          <FiRefreshCw size={15} /> Refresh
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[{ label: 'Total', count: claims.length, color: '#6366f1', bg: '#eef2ff' },
          { label: 'Pending', count: counts['Pending'] || 0, color: '#d97706', bg: '#fefce8' },
          { label: 'In Progress', count: counts['In Progress'] || 0, color: '#2563eb', bg: '#eff6ff' },
          { label: 'Resolved', count: counts['Resolved'] || 0, color: '#16a34a', bg: '#f0fdf4' },
          { label: 'Rejected', count: counts['Rejected'] || 0, color: '#dc2626', bg: '#fef2f2' },
        ].map((card) => (
          <div key={card.label} style={{ background: card.bg, border: `1px solid ${card.color}22`, borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: card.color }}>{card.count}</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem', fontWeight: 600 }}>{card.label}</div>
          </div>
        ))}
      </div>

      {/* ── Filters ── */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
          <FiSearch size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            placeholder="Search name, policy, mobile, email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', paddingLeft: '36px', paddingRight: '12px', paddingTop: '0.6rem', paddingBottom: '0.6rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FiFilter size={14} style={{ color: '#6b7280' }} />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ padding: '0.6rem 1rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
          >
            <option value="All">All Status</option>
            {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <select
          value={filterPlan}
          onChange={(e) => setFilterPlan(e.target.value)}
          style={{ padding: '0.6rem 1rem', border: '1.5px solid #e5e7eb', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
        >
          <option value="All">All Plans</option>
          <option value="Life">Life</option>
          <option value="Health">Health</option>
          <option value="Vehicle">Vehicle</option>
        </select>
      </div>

      {/* ── Table ── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
          Loading claim requests…
        </div>
      ) : (
        <div className="table-responsive" style={{ background: 'white', borderRadius: '14px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Policy No.</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((claim) => (
                <tr key={claim.id}>
                  <td style={{ fontWeight: 700, color: '#6366f1' }}>#{claim.id}</td>
                  <td style={{ whiteSpace: 'nowrap', color: '#6b7280', fontSize: '0.85rem' }}>
                    {new Date(claim.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ fontWeight: 600, color: '#111827' }}>{claim.registered_name}</td>
                  <td style={{ color: '#374151' }}>{claim.mobile_number}</td>
                  <td style={{ color: '#374151', fontSize: '0.85rem' }}>{claim.email_id}</td>
                  <td>
                    <code style={{ background: '#f1f5f9', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.82rem', color: '#475569' }}>
                      {claim.policy_number}
                    </code>
                  </td>
                  <td>
                    <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700,
                      background: claim.plan_type === 'Health' ? '#fdf2f8' : claim.plan_type === 'Life' ? '#eff6ff' : '#fff7ed',
                      color: claim.plan_type === 'Health' ? '#9d174d' : claim.plan_type === 'Life' ? '#1d4ed8' : '#c2410c',
                    }}>
                      {claim.plan_type === 'Health' ? '❤️' : claim.plan_type === 'Life' ? '🛡️' : '🚗'} {claim.plan_type}
                    </span>
                  </td>
                  <td>
                    <select
                      value={claim.status}
                      onChange={(e) => updateStatus(claim.id, e.target.value)}
                      disabled={updatingId === claim.id}
                      className="admin-status-select"
                      style={{ 
                        minWidth: '130px', 
                        opacity: updatingId === claim.id ? 0.6 : 1,
                        background: STATUS_STYLES[claim.status]?.bg || STATUS_STYLES['Pending'].bg,
                        color: STATUS_STYLES[claim.status]?.color || STATUS_STYLES['Pending'].color,
                        borderColor: STATUS_STYLES[claim.status]?.border || STATUS_STYLES['Pending'].border,
                      }}
                    >
                      {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="admin-actions-container">
                      <button
                        className="admin-btn-view"
                        onClick={() => setSelectedClaim(claim)}
                        title="View Details"
                      >
                        <FiEye size={15} />
                      </button>
                      <button
                        className="admin-btn-delete"
                        onClick={() => deleteClaim(claim.id)}
                        title="Delete"
                      >
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                    No claim requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selectedClaim && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={() => setSelectedClaim(null)}
        >
          <div
            style={{ background: 'white', borderRadius: '16px', maxWidth: '580px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderBottom: '1px solid #e5e7eb', background: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' }}>
              <div>
                <h3 style={{ margin: 0, fontWeight: 800, color: '#065f46' }}>Claim #{selectedClaim.id}</h3>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: '#047857' }}>
                  Submitted on {new Date(selectedClaim.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button onClick={() => setSelectedClaim(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', borderRadius: '8px', padding: '0.5rem' }}>
                <FiX size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Registered Name', value: selectedClaim.registered_name },
                { label: 'Policy Number', value: selectedClaim.policy_number },
                { label: 'Mobile Number', value: selectedClaim.mobile_number },
                { label: 'Email ID', value: selectedClaim.email_id },
                { label: 'Plan Type', value: selectedClaim.plan_type },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '0.5rem', alignItems: 'start' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', paddingTop: '0.1rem' }}>{label}</span>
                  <span style={{ fontSize: '0.95rem', color: '#111827', fontWeight: 500 }}>{value}</span>
                </div>
              ))}

              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '1rem', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>Claim Issue / Reason</div>
                <p style={{ margin: 0, color: '#374151', lineHeight: '1.6', fontSize: '0.95rem' }}>{selectedClaim.claim_issue}</p>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>Current Status</div>
                <StatusBadge status={selectedClaim.status} />
              </div>

              {/* Status Update inside modal */}
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>Update Status</div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {STATUS_OPTIONS.map((s) => {
                    const st = STATUS_STYLES[s];
                    const isActive = selectedClaim.status === s;
                    return (
                      <button
                        key={s}
                        onClick={() => updateStatus(selectedClaim.id, s)}
                        disabled={updatingId === selectedClaim.id}
                        style={{
                          padding: '0.45rem 1rem',
                          borderRadius: '8px',
                          border: `1.5px solid ${isActive ? st.color : '#e5e7eb'}`,
                          background: isActive ? st.bg : 'white',
                          color: isActive ? st.color : '#6b7280',
                          fontWeight: isActive ? 700 : 500,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          opacity: updatingId === selectedClaim.id ? 0.6 : 1,
                        }}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => { deleteClaim(selectedClaim.id); }}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.6rem 1.2rem', background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '10px', color: '#dc2626', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
              >
                <FiTrash2 size={14} /> Delete
              </button>
              <button
                onClick={() => setSelectedClaim(null)}
                style={{ padding: '0.6rem 1.5rem', background: 'var(--primary-color,#2e9f68)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimRequests;
