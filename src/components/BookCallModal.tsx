import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './Modal.css';

interface BookCallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BookCallModal: React.FC<BookCallModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredTime: ''
  });
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/calls/request-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send OTP');
      
      toast.success('OTP sent to your email!');
      setStep(2);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/calls/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          otp
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to verify OTP');
      
      toast.success('Call requested successfully! We will contact you soon.');
      
      // Reset and close
      setStep(1);
      setFormData({ name: '', phone: '', email: '', preferredTime: '' });
      setOtp('');
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
          <h2>{step === 1 ? 'Talk to an Expert' : 'Verify Your Email'}</h2>
          <p>
            {step === 1 
              ? 'Schedule a free 15-minute consultation with our unbiased advisors.'
              : `We sent a 6-digit OTP to ${formData.email}. Please enter it below.`
            }
          </p>
        </div>
        
        {step === 1 ? (
          <form className="modal-form" onSubmit={handleRequestOTP}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                placeholder="+91 98765 43210" 
                required 
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Preferred Time</label>
              <select 
                required
                value={formData.preferredTime}
                onChange={e => setFormData({...formData, preferredTime: e.target.value})}
              >
                <option value="">Select a time</option>
                <option value="morning">Morning (9AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 4PM)</option>
                <option value="evening">Evening (4PM - 7PM)</option>
              </select>
            </div>
            <button type="submit" className="btn btn-purple modal-submit-btn" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Request OTP'}
            </button>
          </form>
        ) : (
          <form className="modal-form" onSubmit={handleVerifyOTP}>
            <div className="form-group">
              <label>Enter 6-digit OTP</label>
              <input 
                type="text" 
                placeholder="123456"
                maxLength={6}
                required 
                value={otp}
                onChange={e => setOtp(e.target.value)}
                style={{ textAlign: 'center', fontSize: '1.25rem', letterSpacing: '0.2em' }}
              />
            </div>
            <button type="submit" className="btn btn-purple modal-submit-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Book Call'}
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              style={{ marginTop: '1rem', width: '100%', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Go Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BookCallModal;
