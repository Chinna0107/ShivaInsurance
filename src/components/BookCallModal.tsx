import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './Modal.css';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', preferredTime: '' });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/calls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to book call');
      toast.success('Call requested successfully! We will contact you soon.');
      setFormData({ name: '', phone: '', email: '', preferredTime: '' });
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="global-modal-overlay" onClick={onClose}>
      <div className="global-modal" onClick={e => e.stopPropagation()}>
        <button className="global-modal-close" onClick={onClose}>✕</button>
        <div className="modal-header">
          <h2>Talk to an Expert</h2>
          <p>Schedule a free 15-minute consultation with our unbiased advisors.</p>
        </div>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="john@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="+91 98765 43210" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="form-group">
            <label>Preferred Time</label>
            <select required value={formData.preferredTime} onChange={e => setFormData({...formData, preferredTime: e.target.value})}>
              <option value="">Select a time</option>
              <option value="morning">Morning (9AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 4PM)</option>
              <option value="evening">Evening (4PM - 7PM)</option>
            </select>
          </div>
          <button type="submit" className="btn btn-purple modal-submit-btn" disabled={loading}>
            {loading ? 'Booking...' : 'Book Call'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookCallModal;
