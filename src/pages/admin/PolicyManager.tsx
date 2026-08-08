import React, { useState, useEffect } from 'react';
import { FiShield, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Policy {
  id: string;
  name: string;
  type: string;
  provider: string;
  description: string;
  cover_amount: string;
  pros: string;
  cons: string;
  created_at: string;
}

const PolicyManager = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<Policy | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    type: 'Health',
    provider: '',
    description: '',
    cover_amount: '',
    pros: '',
    cons: ''
  });
  const [images, setImages] = useState<File[]>([]);
  const [expandedPolicyId, setExpandedPolicyId] = useState<string | null>(null);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/policies`);
      const data = await response.json();
      setPolicies(data);
    } catch (err) {
      toast.error('Failed to load policies');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (policy?: Policy) => {
    if (policy) {
      setEditingPolicy(policy);
      setFormData({
        name: policy.name,
        type: policy.type,
        provider: policy.provider,
        description: policy.description || '',
        cover_amount: policy.cover_amount || '',
        pros: policy.pros || '',
        cons: policy.cons || ''
      });
    } else {
      setEditingPolicy(null);
      setFormData({ name: '', type: 'Health', provider: '', description: '', cover_amount: '', pros: '', cons: '' });
    }
    setImages([]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('type', formData.type);
      data.append('provider', formData.provider);
      data.append('description', formData.description);
      data.append('cover_amount', formData.cover_amount);
      data.append('pros', formData.pros);
      data.append('cons', formData.cons);
      images.forEach(img => data.append('images', img));

      if (editingPolicy) {
        // Update
        const response = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`}/api/policies/${editingPolicy.id}`, {
          method: 'PUT',
          body: data
        });
        if (!response.ok) throw new Error('Update failed');
        toast.success('Policy updated successfully');
      } else {
        // Create
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/policies`, {
          method: 'POST',
          body: data
        });
        if (!response.ok) throw new Error('Creation failed');
        toast.success('Policy created successfully');
      }
      handleCloseModal();
      fetchPolicies();
    } catch (err) {
      toast.error('Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this policy?')) return;
    setDeletingId(id);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`}/api/policies/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Delete failed');
      toast.success('Policy deleted');
      fetchPolicies();
    } catch (err) {
      toast.error('Failed to delete policy');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="policy-manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--text-dark, #1f2937)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiShield /> Manage Policies
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Add, edit, and configure the insurance policies displayed on your website.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: 'var(--primary-color, #2e9f68)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(46, 159, 104, 0.2)' }}
        >
          <FiPlus /> Add Policy
        </button>
      </div>

      {/* Table */}
      <div className="table-responsive-wrapper" style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', border: '1px solid var(--border-color, #e5e7eb)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border-color, #e5e7eb)', textAlign: 'left' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase' }}>Plan Name</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase' }}>Type</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase' }}>Provider</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: '#4b5563', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '150px', height: '20px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '80px', height: '20px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '100px', height: '20px' }}></div></td>
                  <td style={{ padding: '1rem 1.5rem' }}><div className="skeleton-box" style={{ width: '80px', height: '20px', marginLeft: 'auto' }}></div></td>
                </tr>
              ))
            ) : policies.length > 0 ? (
              policies.map((policy) => (
              <React.Fragment key={policy.id}>
              <tr style={{ borderBottom: expandedPolicyId === policy.id ? 'none' : '1px solid var(--border-color, #e5e7eb)' }}>
                <td style={{ padding: '1rem 1.5rem', fontWeight: 500, color: 'var(--text-dark)' }}>
                  <div>{policy.name}</div>
                  <button 
                    onClick={() => setExpandedPolicyId(expandedPolicyId === policy.id ? null : policy.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.8rem', cursor: 'pointer', padding: '0.25rem 0', marginTop: '0.25rem' }}
                  >
                    {expandedPolicyId === policy.id ? 'Hide Details' : 'View Details'}
                  </button>
                </td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.85rem', fontWeight: 500,
                    backgroundColor: policy.type === 'Health' ? '#ecfdf5' : policy.type === 'Vehicle' ? '#fef3c7' : '#eff6ff',
                    color: policy.type === 'Health' ? '#059669' : policy.type === 'Vehicle' ? '#d97706' : '#2563eb'
                  }}>
                    {policy.type}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: '#4b5563' }}>{policy.provider}</td>
                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => handleOpenModal(policy)}
                      style={{ padding: '0.5rem', border: '1px solid #e5e7eb', borderRadius: '6px', backgroundColor: 'white', color: '#4b5563', cursor: 'pointer' }}
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(policy.id)}
                      disabled={deletingId === policy.id}
                      style={{ padding: '0.5rem', border: '1px solid #fee2e2', borderRadius: '6px', backgroundColor: '#fef2f2', color: '#ef4444', cursor: deletingId === policy.id ? 'not-allowed' : 'pointer', opacity: deletingId === policy.id ? 0.5 : 1 }}
                    >
                      {deletingId === policy.id ? <span style={{ fontSize: '12px' }}>...</span> : <FiTrash2 size={16} />}
                    </button>
                  </div>
                </td>
              </tr>
              {expandedPolicyId === policy.id && (
                <tr key={`${policy.id}-details`} style={{ borderBottom: '1px solid var(--border-color, #e5e7eb)', backgroundColor: '#f9fafb' }}>
                  <td colSpan={4} style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#4b5563' }}>Cover Amount</h4>
                        <p style={{ margin: '0 0 1rem', fontWeight: 500 }}>{policy.cover_amount || 'N/A'}</p>
                        
                        <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#4b5563' }}>Description</h4>
                        <p style={{ margin: 0, fontSize: '0.9rem' }}>{policy.description || 'N/A'}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <span style={{ backgroundColor: '#ecfdf5', padding: '2px', borderRadius: '50%' }}>✓</span> Pros
                          </h4>
                          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#4b5563', listStyleType: 'none', padding: 0 }}>
                            {policy.pros ? policy.pros.split('\n').filter(p => p.trim()).map((p, i) => (
                              <li key={i} style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <span style={{ color: '#059669', marginTop: '2px' }}>✓</span> {p}
                              </li>
                            )) : <li>No pros listed</li>}
                          </ul>
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                            <span style={{ backgroundColor: '#fef2f2', padding: '2px', borderRadius: '50%' }}>✗</span> Cons
                          </h4>
                          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#4b5563', listStyleType: 'none', padding: 0 }}>
                            {policy.cons ? policy.cons.split('\n').filter(c => c.trim()).map((c, i) => (
                              <li key={i} style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                                <span style={{ color: '#ef4444', marginTop: '2px' }}>✗</span> {c}
                              </li>
                            )) : <li>No cons listed</li>}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              </React.Fragment>
            ))) : (
              <tr>
                <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                  No policies found. Click "Add Policy" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            maxHeight: '90vh', overflowY: 'auto', WebkitOverflowScrolling: 'touch'
          }}>
            <h2 style={{ margin: '0 0 1.5rem', color: 'var(--text-dark, #1f2937)' }}>
              {editingPolicy ? 'Edit Policy' : 'Add New Policy'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Plan Name</label>
                <input 
                  type="text" required placeholder="e.g. Care Supreme"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Type</label>
                  <select 
                    value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none', backgroundColor: 'white' }}
                  >
                    <option value="Health">Health Insurance</option>
                    <option value="Life">Life / Term Insurance</option>
                    <option value="Vehicle">Vehicle Insurance</option>
                  </select>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Provider</label>
                  <input 
                    type="text" required placeholder="e.g. HDFC ERGO"
                    value={formData.provider} onChange={e => setFormData({...formData, provider: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Short Description (Optional)</label>
                  <textarea 
                    rows={3} placeholder="Highlights of the plan..."
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Cover Amount</label>
                  <input 
                    type="text" placeholder="e.g. ₹5 Lakhs - ₹1 Crore"
                    value={formData.cover_amount} onChange={e => setFormData({...formData, cover_amount: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Pros (One per line)</label>
                  <textarea 
                    rows={4} placeholder="Comprehensive coverage&#10;No room rent capping"
                    value={formData.pros} onChange={e => setFormData({...formData, pros: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none', resize: 'vertical' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Cons (One per line)</label>
                  <textarea 
                    rows={4} placeholder="Higher premium&#10;Strict medical tests"
                    value={formData.cons} onChange={e => setFormData({...formData, cons: e.target.value})}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', outline: 'none', resize: 'vertical' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Policy Images (Optional)</label>
                <input 
                  type="file" multiple accept="image/*"
                  onChange={e => {
                    if (e.target.files) {
                      setImages(Array.from(e.target.files));
                    }
                  }}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px dashed var(--border-color, #e5e7eb)' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={handleCloseModal} disabled={submitting} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'white', color: '#4b5563', border: '1px solid var(--border-color, #e5e7eb)', borderRadius: '6px', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting} style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--primary-color, #2e9f68)', color: 'white', border: 'none', borderRadius: '6px', cursor: submitting ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Saving...' : (editingPolicy ? 'Update Policy' : 'Save Policy')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyManager;
