import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './Modal.css';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, planName }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '25',
    cover_amount: '50 Lakhs',
    gender: 'male',
    phone: '',
    email: '',
    policy_name: planName || ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const ages = Array.from({ length: 73 }, (_, i) => i + 18);
  const coverAmounts = [];
  for (let i = 5; i <= 100; i += 5) {
    coverAmounts.push(i === 100 ? '1 Crore' : `${i} Lakhs`);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/premium-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, policy_name: planName || formData.policy_name }),
      });
      if (res.ok) {
        setSuccess(true);
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch {
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="global-modal-overlay" onClick={onClose}>
        <div className="global-modal quote-modal" onClick={e => e.stopPropagation()} style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <button className="global-modal-close" onClick={onClose}>✕</button>
          <div style={{ fontSize: '3rem', color: 'var(--success-color, #10b981)', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ marginBottom: '1rem' }}>Thanks for Choosing us!</h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Our team will get back to you soon with the best personalized plans.</p>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="global-modal-overlay" onClick={onClose}>
      <div className="global-modal quote-modal" onClick={e => e.stopPropagation()}>
        <button className="global-modal-close" onClick={onClose}>✕</button>
        <div className="modal-header">
          <h2>Check Your Premium</h2>
          <p>Find the best plan tailored to your needs in seconds.</p>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-row">
            <div className="form-group half">
              <label>Your Age</label>
              <select required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})}>
                {ages.map(a => <option key={a} value={a}>{a} Years</option>)}
              </select>
            </div>
            <div className="form-group half">
              <label>Cover Amount</label>
              <select required value={formData.cover_amount} onChange={e => setFormData({...formData, cover_amount: e.target.value})}>
                {coverAmounts.map(ca => <option key={ca} value={ca}>{ca}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <div className="gender-toggle-modal">
              <label className="radio-label">
                <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={e => setFormData({...formData, gender: e.target.value})} /> Male
              </label>
              <label className="radio-label">
                <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={e => setFormData({...formData, gender: e.target.value})} /> Female
              </label>
            </div>
          </div>
          <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Mobile Number</label>
              <input type="tel" placeholder="+91 98765 43210" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          <p className="helper-text" style={{ marginTop: '-0.5rem', marginBottom: '1rem' }}>We won't spam you. Promise.</p>
          <button type="submit" className="btn btn-primary modal-submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Get Quotes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
