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
    age: '25',
    cover_amount: '50L',
    gender: 'male',
    phone: '',
    policy_name: planName || ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        policy_name: planName || formData.policy_name
      };

      const response = await fetch('https://shiva-be.vercel.app/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Your request has been received! Our team will contact you shortly.');
        onClose();
      } else {
        toast.error('Failed to submit quote request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="global-modal-overlay" onClick={onClose}>
      <div className="global-modal quote-modal" onClick={e => e.stopPropagation()}>
        <button className="global-modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <h2>Check Your Premium</h2>
          <p>Find the best plan tailored to your needs in seconds.</p>
        </div>
        
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half">
              <label>Your Age</label>
              <select required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})}>
                <option value="25">25 Years</option>
                <option value="30">30 Years</option>
                <option value="35">35 Years</option>
                <option value="40">40 Years</option>
              </select>
            </div>
            <div className="form-group half">
              <label>Cover Amount</label>
              <select required value={formData.cover_amount} onChange={e => setFormData({...formData, cover_amount: e.target.value})}>
                <option value="50L">50 Lakhs</option>
                <option value="1Cr">1 Crore</option>
                <option value="2Cr">2 Crore</option>
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
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" placeholder="+91 98765 43210" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            <span className="helper-text">We won't spam you. Promise.</span>
          </div>
          <button type="submit" className="btn btn-primary modal-submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'View Quotes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
