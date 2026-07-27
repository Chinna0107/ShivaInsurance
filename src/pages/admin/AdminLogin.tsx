import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        toast.success('Login Successful!');
        navigate('/admin/dashboard');
      } else {
        const data = await response.json();
        toast.error(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      backgroundColor: 'var(--background-light, #f4f7f6)', color: 'var(--text-dark, #1f2937)'
    }}>
      <div style={{
        background: 'white',
        padding: '3rem', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
        width: '100%', maxWidth: '400px', border: '1px solid var(--border-color, #e5e7eb)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1rem' }}>
            <img src="/logo-icon.png" alt="Icon" className="site-logo-icon" style={{ height: '40px' }} />
          </div>
          <h1 style={{ fontSize: '1.8rem', margin: '0 0 0.5rem', color: 'var(--text-dark, #1f2937)' }}>Admin Login</h1>
          <p style={{ margin: 0, color: '#6b7280' }}>Sign in to manage your dashboard</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Username</label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#9ca3af' }} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                style={{
                  width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px',
                  border: '1px solid var(--border-color, #e5e7eb)', background: '#f9fafb',
                  color: 'var(--text-dark, #1f2937)', fontSize: '1rem', outline: 'none'
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#4b5563', fontWeight: 500 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <FiLock style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: '#9ca3af' }} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                style={{
                  width: '100%', padding: '0.75rem 1rem 0.75rem 2.5rem', borderRadius: '8px',
                  border: '1px solid var(--border-color, #e5e7eb)', background: '#f9fafb',
                  color: 'var(--text-dark, #1f2937)', fontSize: '1rem', outline: 'none'
                }}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '0.875rem', borderRadius: '8px', border: 'none',
              backgroundColor: 'var(--primary-color, #2e9f68)', color: 'white',
              fontSize: '1rem', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.5rem',
              boxShadow: '0 4px 15px rgba(46, 159, 104, 0.3)', transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--primary-hover, #238052)')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--primary-color, #2e9f68)')}
          >
            {loading ? 'Signing in...' : <>Sign In <FiArrowRight /></>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
