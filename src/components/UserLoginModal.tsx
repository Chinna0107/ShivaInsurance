import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface UserLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

const UserLoginModal: React.FC<UserLoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter your email');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      toast.success('OTP sent to your email');
      setStep('otp');
    } catch (err: any) {
      toast.error(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return toast.error('Please enter the OTP');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/users/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      
      toast.success('Login successful!');
      onLoginSuccess(email);
    } catch (err: any) {
      toast.error(err.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: '16px', width: '90%', maxWidth: '400px', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6b7280' }}
        >
          &times;
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#1f2937', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
            {step === 'email' ? 'Enter your email to login to your dashboard' : 'Enter the 6-digit OTP sent to your email'}
          </p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSendOtp}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Email Address</label>
              <input 
                type="email" required
                value={email} onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
                placeholder="you@example.com"
              />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Sending OTP...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>OTP</label>
              <input 
                type="text" required maxLength={6}
                value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', letterSpacing: '4px', fontSize: '1.25rem', textAlign: 'center' }}
                placeholder="000000"
              />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.8rem', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Verifying...' : 'Login'}
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <button type="button" onClick={() => setStep('email')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 500 }}>
                Use a different email
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserLoginModal;
