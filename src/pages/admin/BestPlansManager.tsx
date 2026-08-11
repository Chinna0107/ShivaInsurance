import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaStar, FaShieldAlt, FaPiggyBank } from 'react-icons/fa';
import './BestPlansManager.css';

interface BestPlan {
  id: number;
  category: string;
  rank: number;
  name: string;
  badge: string;
  premium: string;
  cover: string;
  claim_ratio: string;
  highlight: string;
  plan_type: string;
  insurer_type: string;
}

const BestPlansManager: React.FC = () => {
  const [plans, setPlans] = useState<BestPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'term' | 'health' | 'savings'>('term');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<BestPlan | null>(null);

  const [formData, setFormData] = useState({
    category: 'term', rank: 1, name: '', badge: '', premium: '', cover: '',
    claim_ratio: '', highlight: '', plan_type: 'Individual', insurer_type: 'Private'
  });

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/best-plans?category=${activeCategory}`);
      if (response.ok) setPlans(await response.json());
    } catch { toast.error('Failed to fetch plans'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPlans(); }, [activeCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'rank' ? parseInt(value) || 0 : value });
  };

  const handleOpenModal = (plan?: BestPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        category: plan.category, rank: plan.rank, name: plan.name, badge: plan.badge || '',
        premium: plan.premium || '', cover: plan.cover || '', claim_ratio: plan.claim_ratio || '',
        highlight: plan.highlight || '', plan_type: plan.plan_type || 'Individual', insurer_type: plan.insurer_type || 'Private'
      });
    } else {
      setEditingPlan(null);
      setFormData({ category: activeCategory, rank: plans.length + 1, name: '', badge: '', premium: '', cover: '', claim_ratio: '', highlight: '', plan_type: 'Individual', insurer_type: 'Private' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingPlan
        ? `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/best-plans/${editingPlan.id}`
        : `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/best-plans`;
      const response = await fetch(url, { method: editingPlan ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (response.ok) { toast.success(editingPlan ? 'Plan updated!' : 'Plan added!'); setIsModalOpen(false); fetchPlans(); }
      else { const err = await response.json(); toast.error(err.error || 'Operation failed'); }
    } catch { toast.error('An error occurred'); }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this plan?')) return;
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/best-plans/${id}`, { method: 'DELETE' });
      if (response.ok) { toast.success('Plan deleted'); fetchPlans(); }
      else toast.error('Failed to delete plan');
    } catch { toast.error('An error occurred'); }
  };

  const getRankClass = (rank: number) =>
    rank === 1 ? 'rank-badge rank-1' : rank === 2 ? 'rank-badge rank-2' : rank === 3 ? 'rank-badge rank-3' : 'rank-badge rank-other';

  return (
    <div className="admin-page">
      <div className="bpm-header">
        <div className="bpm-header-text">
          <h2>Best Plans Manager</h2>
          <p>Manage the top recommended plans displayed on the main site</p>
        </div>
        <button className="bpm-add-btn" onClick={() => handleOpenModal()}>
          <FaPlus /> Add New Plan
        </button>
      </div>

      <div className="bpm-tabs">
        <button className={`bpm-tab ${activeCategory === 'term' ? 'active' : ''}`} onClick={() => setActiveCategory('term')}><FaShieldAlt /> Life Plans</button>
        <button className={`bpm-tab ${activeCategory === 'health' ? 'active' : ''}`} onClick={() => setActiveCategory('health')}><FaStar /> Health Plans</button>
        <button className={`bpm-tab ${activeCategory === 'savings' ? 'active' : ''}`} onClick={() => setActiveCategory('savings')}><FaPiggyBank /> Savings Plans</button>
      </div>

      <div className="bpm-table-wrapper">
        <table className="bpm-table">
          <thead>
            <tr>
              <th>Rank</th><th>Product Name</th><th>Plan Type</th><th>Insurer</th>
              <th>Badge</th><th>Premium</th><th>Cover</th><th>Claim Metric</th><th>Highlight</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="bpm-loading">
                  {Array.from({ length: 10 }).map((_, j) => (
                    <td key={j}><div className="skeleton-box" style={{ height: '20px', width: j === 1 ? '120px' : '60px' }} /></td>
                  ))}
                </tr>
              ))
            ) : plans.length === 0 ? (
              <tr><td colSpan={10}><div className="bpm-empty"><div className="bpm-empty-icon">📋</div><p>No plans found. Click <strong>Add New Plan</strong> to get started.</p></div></td></tr>
            ) : plans.map(plan => (
              <tr key={plan.id}>
                <td><span className={getRankClass(plan.rank)}>#{plan.rank}</span></td>
                <td><span style={{ fontWeight: 600, color: '#111827' }}>{plan.name}</span></td>
                <td><span className="pill pill-blue">{plan.plan_type || 'Individual'}</span></td>
                <td><span className={`pill ${plan.insurer_type === 'Public' ? 'pill-green' : 'pill-purple'}`}>{plan.insurer_type === 'Public' ? '🏛️' : '🏢'} {plan.insurer_type || 'Private'}</span></td>
                <td>{plan.badge ? <span className="pill pill-gold">⭐ {plan.badge}</span> : <span style={{ color: '#9ca3af' }}>—</span>}</td>
                <td style={{ fontWeight: 500 }}>{plan.premium || <span style={{ color: '#9ca3af' }}>—</span>}</td>
                <td>{plan.cover || <span style={{ color: '#9ca3af' }}>—</span>}</td>
                <td style={{ fontWeight: 700, color: '#2e9f68' }}>{plan.claim_ratio || '—'}</td>
                <td><div style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#6b7280', fontSize: '0.85rem' }}>{plan.highlight || '—'}</div></td>
                <td>
                  <div className="bpm-actions">
                    <button className="bpm-btn-edit" onClick={() => handleOpenModal(plan)} title="Edit"><FaEdit size={13} /></button>
                    <button className="bpm-btn-delete" onClick={() => handleDelete(plan.id)} title="Delete"><FaTrash size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="bpm-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}>
          <div className="bpm-modal">
            <div className="bpm-modal-header">
              <h3>{editingPlan ? '✏️ Edit Plan' : '➕ Add New Plan'}</h3>
              <button className="bpm-modal-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="bpm-modal-body">
                <div className="bpm-form-group">
                  <label>Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} required className="bpm-form-control">
                    <option value="term">Life Insurance</option>
                    <option value="health">Health Insurance</option>
                    <option value="savings">Savings Plans</option>
                  </select>
                </div>
                <div className="bpm-form-grid-2">
                  <div className="bpm-form-group">
                    <label>Plan Type</label>
                    <select name="plan_type" value={formData.plan_type} onChange={handleInputChange} className="bpm-form-control">
                      <option value="Individual">Individual</option>
                      <option value="Family">Family Plan</option>
                      <option value="Senior Citizen">Senior Citizen</option>
                    </select>
                  </div>
                  <div className="bpm-form-group">
                    <label>Insurer Type</label>
                    <select name="insurer_type" value={formData.insurer_type} onChange={handleInputChange} className="bpm-form-control">
                      <option value="Public">🏛️ Public</option>
                      <option value="Private">🏢 Private</option>
                    </select>
                  </div>
                </div>
                <div className="bpm-form-grid-1-3">
                  <div className="bpm-form-group">
                    <label>Rank</label>
                    <input type="number" name="rank" value={formData.rank} onChange={handleInputChange} required className="bpm-form-control" min="1" />
                  </div>
                  <div className="bpm-form-group">
                    <label>Product Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="bpm-form-control" placeholder="e.g. HDFC Life Click 2 Protect" />
                  </div>
                </div>
                <div className="bpm-form-grid-2">
                  <div className="bpm-form-group">
                    <label>Badge</label>
                    <input type="text" name="badge" value={formData.badge} onChange={handleInputChange} className="bpm-form-control" placeholder="e.g. Editor's Choice" />
                  </div>
                  <div className="bpm-form-group">
                    <label>Claim Metric / IRR</label>
                    <input type="text" name="claim_ratio" value={formData.claim_ratio} onChange={handleInputChange} className="bpm-form-control" placeholder="e.g. 99.5%" />
                  </div>
                </div>
                <div className="bpm-form-grid-2">
                  <div className="bpm-form-group">
                    <label>Avg. Premium / Value</label>
                    <input type="text" name="premium" value={formData.premium} onChange={handleInputChange} className="bpm-form-control" placeholder="e.g. ₹450/month" />
                  </div>
                  <div className="bpm-form-group">
                    <label>Cover</label>
                    <input type="text" name="cover" value={formData.cover} onChange={handleInputChange} className="bpm-form-control" placeholder="e.g. ₹1 Crore" />
                  </div>
                </div>
                <div className="bpm-form-group">
                  <label>Key Highlight</label>
                  <textarea name="highlight" value={formData.highlight} onChange={handleInputChange} className="bpm-form-control" rows={2} placeholder="What makes this plan stand out..." />
                </div>
              </div>
              <div className="bpm-modal-footer">
                <button type="button" className="bpm-btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="bpm-btn-submit">{editingPlan ? '✓ Update Plan' : '+ Add Plan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestPlansManager;

