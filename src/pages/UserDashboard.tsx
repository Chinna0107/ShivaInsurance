import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import toast from 'react-hot-toast';

const UserDashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');
  const [activeTab, setActiveTab] = useState<'profile' | 'applications' | 'policies'>('applications');
  const [leads, setLeads] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!email) {
      navigate('/');
      return;
    }
    
    const fetchData = async () => {
      try {
        const [leadsRes, policiesRes] = await Promise.all([
          fetch(`https://shiva-be.vercel.app/api/users/${email}/leads`),
          fetch('https://shiva-be.vercel.app/api/policies')
        ]);
        
        if (leadsRes.ok) setLeads(await leadsRes.json());
        if (policiesRes.ok) setPolicies(await policiesRes.json());
      } catch (err) {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    toast.success('Logged out successfully');
    navigate('/');
  };

  if (!email) return null;

  return (
    <>
      <Header />
      <div style={{ backgroundColor: '#f9fafb', minHeight: 'calc(100vh - 100px)', paddingTop: '100px', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', color: '#1f2937', marginBottom: '0.5rem' }}>My Dashboard</h1>
              <p style={{ color: '#6b7280' }}>Welcome back, {email}</p>
            </div>
            <button 
              onClick={handleLogout}
              style={{ padding: '0.6rem 1.5rem', backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Logout
            </button>
          </div>

          <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem' }}>
              <button 
                onClick={() => setActiveTab('applications')}
                style={{ padding: '0.75rem 1.5rem', border: 'none', background: activeTab === 'applications' ? 'var(--primary-color)' : 'transparent', color: activeTab === 'applications' ? 'white' : '#4b5563', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                My Applications
              </button>
              <button 
                onClick={() => setActiveTab('policies')}
                style={{ padding: '0.75rem 1.5rem', border: 'none', background: activeTab === 'policies' ? 'var(--primary-color)' : 'transparent', color: activeTab === 'policies' ? 'white' : '#4b5563', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                All Policies
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                style={{ padding: '0.75rem 1.5rem', border: 'none', background: activeTab === 'profile' ? 'var(--primary-color)' : 'transparent', color: activeTab === 'profile' ? 'white' : '#4b5563', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
              >
                My Profile
              </button>
            </div>

            {/* Content */}
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', minHeight: '400px' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>Loading your dashboard...</div>
              ) : (
                <>
                  {activeTab === 'applications' && (
                    <div>
                      <h2 style={{ fontSize: '1.25rem', color: '#1f2937', marginBottom: '1.5rem' }}>Your Applied Forms</h2>
                      {leads.length > 0 ? (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                          {leads.map(lead => (
                            <div key={lead.id} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
                              <div>
                                <h3 style={{ fontSize: '1.1rem', color: '#374151', marginBottom: '0.25rem' }}>{lead.type} Application</h3>
                                <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: 0 }}>Applied on {new Date(lead.date || lead.created_at).toLocaleDateString()}</p>
                              </div>
                              <span style={{ 
                                padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600,
                                backgroundColor: lead.status === 'Completed' ? '#dcfce7' : lead.status === 'In Progress' ? '#fef9c3' : '#f3f4f6',
                                color: lead.status === 'Completed' ? '#166534' : lead.status === 'In Progress' ? '#854d0e' : '#4b5563'
                              }}>
                                {lead.status || 'Pending'}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280', border: '1px dashed #d1d5db', borderRadius: '12px' }}>
                          You haven't submitted any applications yet.
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'policies' && (
                    <div>
                      <h2 style={{ fontSize: '1.25rem', color: '#1f2937', marginBottom: '1.5rem' }}>Explore Available Policies</h2>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {policies.map(policy => (
                          <div key={policy.id} onClick={() => navigate(`/policy/${policy.id}`)} style={{ padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s, boxShadow 0.2s' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.05)'; }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: policy.type === 'Health' ? '#ecfdf5' : '#eff6ff', color: policy.type === 'Health' ? '#059669' : '#2563eb', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: 600, marginBottom: '1rem' }}>
                              {policy.type} Insurance
                            </div>
                            <h3 style={{ fontSize: '1.1rem', color: '#1f2937', marginBottom: '0.5rem' }}>{policy.name}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '1rem' }}>By {policy.provider}</p>
                            <p style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: 600, margin: 0 }}>Cover: {policy.cover_amount || 'N/A'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'profile' && (
                    <div>
                      <h2 style={{ fontSize: '1.25rem', color: '#1f2937', marginBottom: '1.5rem' }}>Profile Information</h2>
                      <div style={{ maxWidth: '500px', padding: '2rem', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.25rem' }}>Email Address</label>
                          <div style={{ fontSize: '1.1rem', color: '#1f2937', fontWeight: 500 }}>{email}</div>
                        </div>
                        {leads.length > 0 && leads[0].name && (
                          <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.25rem' }}>Full Name (from last application)</label>
                            <div style={{ fontSize: '1.1rem', color: '#1f2937', fontWeight: 500 }}>{leads[0].name}</div>
                          </div>
                        )}
                        {leads.length > 0 && leads[0].phone && (
                          <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280', fontWeight: 500, marginBottom: '0.25rem' }}>Phone Number (from last application)</label>
                            <div style={{ fontSize: '1.1rem', color: '#1f2937', fontWeight: 500 }}>{leads[0].phone}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;
