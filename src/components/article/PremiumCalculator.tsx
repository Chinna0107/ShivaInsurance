import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './PremiumCalculator.css';

interface PremiumCalculatorProps {
  onGetQuote?: () => void;
  planName?: string;
}

const PremiumCalculator: React.FC<PremiumCalculatorProps> = ({ planName }) => {
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
      <div className="premium-calc-box" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
        <div style={{ fontSize: '3rem', color: 'var(--success-color, #10b981)', marginBottom: '1rem' }}>✅</div>
        <h2 style={{ marginBottom: '1rem' }}>Thanks for Choosing us!</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Our team will get back to you soon with the best personalized plans.</p>
        <button onClick={() => { setSuccess(false); setOtpSent(false); setOtp(''); setFormData({...formData, name: '', phone: '', email: ''}); }} className="btn btn-primary" style={{ padding: '0.75rem 2rem' }}>Check Another</button>
      </div>
    );
  }

  return (
    <div className="premium-calc-container">
      <div className="premium-calc-image-side">
        <div className="calc-header-overlay">
          <h3>Find the best plan for you</h3>
          <p>Get unbiased advice from our experts</p>
        </div>
      </div>
      <div className="premium-calc-box">
      
      {!otpSent ? (
        <form className="calc-form" onSubmit={handleSendOtp}>
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
          
          <div className="form-row">
            <div className="form-group half">
              <label>Your Age</label>
              <select 
                required 
                value={formData.age} 
                onChange={e => setFormData({...formData, age: e.target.value})}
              >
                {ages.map(a => (
                  <option key={a} value={a}>{a} Years</option>
                ))}
              </select>
            </div>
            <div className="form-group half">
              <label>Cover Amount</label>
              <select 
                required 
                value={formData.cover_amount} 
                onChange={e => setFormData({...formData, cover_amount: e.target.value})}
              >
                {coverAmounts.map(ca => (
                  <option key={ca} value={ca}>{ca}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Gender</label>
            <div className="gender-toggle-inline">
              <label className="radio-label">
                <input type="radio" name="calc_gender" value="male" checked={formData.gender === 'male'} onChange={e => setFormData({...formData, gender: e.target.value})} /> Male
              </label>
              <label className="radio-label">
                <input type="radio" name="calc_gender" value="female" checked={formData.gender === 'female'} onChange={e => setFormData({...formData, gender: e.target.value})} /> Female
              </label>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label>Mobile</label>
              <input 
                type="tel" 
                placeholder="9876543210" 
                required 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div className="form-group half">
              <label>Email</label>
              <input 
                type="email" 
                placeholder="you@example.com" 
                required 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-purple check-premium-btn" 
            disabled={loading}
          >
            {loading ? 'Sending OTP...' : 'Check Premium'}
          </button>
        </form>
      ) : (
        <form className="calc-form" onSubmit={handleVerifyAndSubmit}>
          <div className="form-group" style={{ textAlign: 'center' }}>
            <label style={{ textAlign: 'center', display: 'block' }}>Enter OTP sent to {formData.email}</label>
            <input 
              type="text" 
              placeholder="6-digit OTP" 
              required 
              maxLength={6}
              value={otp} 
              onChange={e => setOtp(e.target.value)} 
              className="otp-input"
            />
          </div>
          <button 
            type="submit" 
            className="btn btn-purple check-premium-btn" 
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify & Check Premium'}
          </button>
          <button 
            type="button" 
            onClick={() => { setOtpSent(false); setOtp(''); }}
            className="back-btn"
          >
            ← Back to Details
          </button>
        </form>
      )}
      </div>
    </div>
  );
};

export default PremiumCalculator;
