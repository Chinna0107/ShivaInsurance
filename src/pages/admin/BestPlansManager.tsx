import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaStar, FaShieldAlt, FaPiggyBank } from 'react-icons/fa';

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
}

const BestPlansManager: React.FC = () => {
  const [plans, setPlans] = useState<BestPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'term' | 'health' | 'savings'>('term');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<BestPlan | null>(null);

  const [formData, setFormData] = useState({
    category: 'term',
    rank: 1,
    name: '',
    badge: '',
    premium: '',
    cover: '',
    claim_ratio: '',
    highlight: ''
  });

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://shiva-be.vercel.app/api/best-plans?category=${activeCategory}`);
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      }
    } catch (error) {
      toast.error('Failed to fetch plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [activeCategory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'rank' ? parseInt(value) || 0 : value });
  };

  const handleOpenModal = (plan?: BestPlan) => {
    if (plan) {
      setEditingPlan(plan);
      setFormData({
        category: plan.category,
        rank: plan.rank,
        name: plan.name,
        badge: plan.badge || '',
        premium: plan.premium || '',
        cover: plan.cover || '',
        claim_ratio: plan.claim_ratio || '',
        highlight: plan.highlight || ''
      });
    } else {
      setEditingPlan(null);
      setFormData({
        category: activeCategory,
        rank: plans.length + 1,
        name: '',
        badge: '',
        premium: '',
        cover: '',
        claim_ratio: '',
        highlight: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingPlan 
        ? `https://shiva-be.vercel.app/api/best-plans/${editingPlan.id}`
        : 'https://shiva-be.vercel.app/api/best-plans';
        
      const method = editingPlan ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        toast.success(editingPlan ? 'Plan updated successfully' : 'Plan added successfully');
        setIsModalOpen(false);
        fetchPlans();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Operation failed');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this plan?')) return;
    
    try {
      const response = await fetch(`https://shiva-be.vercel.app/api/best-plans/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        toast.success('Plan deleted successfully');
        fetchPlans();
      } else {
        toast.error('Failed to delete plan');
      }
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h2>Best Plans Manager</h2>
          <p>Manage the top recommended plans displayed on the main site</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <FaPlus style={{ marginRight: '8px' }} /> Add New Plan
        </button>
      </div>

      <div className="admin-tabs" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <button 
          className={`tab-btn ${activeCategory === 'term' ? 'active' : ''}`} 
          onClick={() => setActiveCategory('term')}
          style={{ padding: '1rem 1.5rem', borderBottom: activeCategory === 'term' ? '2px solid var(--primary-color)' : 'none', color: activeCategory === 'term' ? 'var(--primary-color)' : '#6b7280', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', borderBottomStyle: 'solid', borderBottomWidth: '2px' }}
        >
          <FaShieldAlt style={{ marginRight: '8px' }} /> Term Plans
        </button>
        <button 
          className={`tab-btn ${activeCategory === 'health' ? 'active' : ''}`} 
          onClick={() => setActiveCategory('health')}
          style={{ padding: '1rem 1.5rem', borderBottom: activeCategory === 'health' ? '2px solid var(--primary-color)' : 'none', color: activeCategory === 'health' ? 'var(--primary-color)' : '#6b7280', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', borderBottomStyle: 'solid', borderBottomWidth: '2px' }}
        >
          <FaStar style={{ marginRight: '8px' }} /> Health Plans
        </button>
        <button 
          className={`tab-btn ${activeCategory === 'savings' ? 'active' : ''}`} 
          onClick={() => setActiveCategory('savings')}
          style={{ padding: '1rem 1.5rem', borderBottom: activeCategory === 'savings' ? '2px solid var(--primary-color)' : 'none', color: activeCategory === 'savings' ? 'var(--primary-color)' : '#6b7280', fontWeight: 'bold', background: 'none', border: 'none', cursor: 'pointer', borderBottomStyle: 'solid', borderBottomWidth: '2px' }}
        >
          <FaPiggyBank style={{ marginRight: '8px' }} /> Savings Plans
        </button>
      </div>

      <div className="table-container">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product Name</th>
                <th>Badge</th>
                <th>Premium</th>
                <th>Cover</th>
                <th>Claim Metric</th>
                <th>Highlight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '2rem' }}>No plans found in this category.</td>
                </tr>
              ) : (
                plans.map(plan => (
                  <tr key={plan.id}>
                    <td>#{plan.rank}</td>
                    <td style={{ fontWeight: '600' }}>{plan.name}</td>
                    <td>{plan.badge ? <span className="badge" style={{ backgroundColor: '#f3e8ff', color: '#7e22ce', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem' }}>{plan.badge}</span> : '-'}</td>
                    <td>{plan.premium || '-'}</td>
                    <td>{plan.cover || '-'}</td>
                    <td>{plan.claim_ratio || '-'}</td>
                    <td><div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{plan.highlight || '-'}</div></td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon edit" onClick={() => handleOpenModal(plan)} title="Edit"><FaEdit /></button>
                        <button className="btn-icon delete" onClick={() => handleDelete(plan.id)} title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '600px' }}>
            <div className="modal-header">
              <h3>{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} required className="form-control">
                  <option value="term">Term Insurance</option>
                  <option value="health">Health Insurance</option>
                  <option value="savings">Savings Plans</option>
                </select>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Rank (e.g. 1)</label>
                  <input type="number" name="rank" value={formData.rank} onChange={handleInputChange} required className="form-control" min="1" />
                </div>
                <div className="form-group">
                  <label>Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="form-control" />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Badge (e.g. Editor's Choice)</label>
                  <input type="text" name="badge" value={formData.badge} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="form-group">
                  <label>Claim Metric / IRR (e.g. 99.5%)</label>
                  <input type="text" name="claim_ratio" value={formData.claim_ratio} onChange={handleInputChange} className="form-control" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label>Avg. Premium / Value</label>
                  <input type="text" name="premium" value={formData.premium} onChange={handleInputChange} className="form-control" placeholder="e.g. ₹450/month" />
                </div>
                <div className="form-group">
                  <label>Cover (optional)</label>
                  <input type="text" name="cover" value={formData.cover} onChange={handleInputChange} className="form-control" placeholder="e.g. ₹1 Crore" />
                </div>
              </div>
              
              <div className="form-group">
                <label>Key Highlight (Short description)</label>
                <textarea name="highlight" value={formData.highlight} onChange={handleInputChange} className="form-control" rows={2}></textarea>
              </div>
              
              <div className="modal-footer" style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingPlan ? 'Update Plan' : 'Add Plan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestPlansManager;
