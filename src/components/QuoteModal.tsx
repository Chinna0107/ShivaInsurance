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
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  // Generate ages from 18 to 90
  const ages = Array.from({ length: 90 - 18 + 1 }, (_, i) => i + 18);
  
  // Generate cover amounts 5 Lakhs to 1 Cr in steps of 5 Lakhs
  const coverAmounts = [];
  for (let i = 5; i <= 100; i += 5) {
    if (i === 100) {
      coverAmounts.push('1 Crore');
    } else {
      coverAmounts.push(`${i} Lakhs`);
    }
  }

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      return toast.error('Please enter a valid email address.');
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/premium-requests/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });
      if (response.ok) {
        toast.success('OTP sent to your email!');
        setOtpSent(true);
      } else {
        toast.error('Failed to send OTP. Try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return toast.error('Please enter the OTP.');
    setLoading(true);
    
    try {
      // 1. Verify OTP
      const verifyRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/premium-requests/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      
      if (!verifyRes.ok) {
        const errorData = await verifyRes.json();
        toast.error(errorData.error || 'Invalid OTP');
        setLoading(false);
        return;
      }
      
      // 2. Submit Request
      const payload = {
        ...formData,
        policy_name: planName || formData.policy_name
      };

      const submitRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/premium-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (submitRes.ok) {
        setSuccess(true);
      } else {
        toast.error('Failed to submit premium request. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
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
        
        {!otpSent ? (
          <form className="modal-form" onSubmit={handleSendOtp}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <label>Your Age</label>
                <select required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})}>
                  {ages.map(a => (
                    <option key={a} value={a}>{a} Years</option>
                  ))}
                </select>
              </div>
              <div className="form-group half">
                <label>Cover Amount</label>
                <select required value={formData.cover_amount} onChange={e => setFormData({...formData, cover_amount: e.target.value})}>
                  {coverAmounts.map(ca => (
                    <option key={ca} value={ca}>{ca}</option>
                  ))}
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
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form className="modal-form" onSubmit={handleVerifyAndSubmit}>
            <div className="form-group">
              <label>Enter OTP sent to {formData.email}</label>
              <input 
                type="text" 
                placeholder="6-digit OTP" 
                required 
                maxLength={6}
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
                style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.2rem' }}
              />
            </div>
            <button type="submit" className="btn btn-primary modal-submit-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & View Quotes'}
            </button>
            <button 
              type="button" 
              onClick={() => { setOtpSent(false); setOtp(''); }}
              style={{ background: 'none', border: 'none', color: '#6b7280', width: '100%', marginTop: '1rem', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              ← Back to Details
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuoteModal;
