import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCallModal from '../components/BookCallModal';
import PDFViewerModal from '../components/PDFViewerModal';
import { FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { Shield, Heart, Activity, CheckCircle, Clock, Search, LogOut } from 'lucide-react';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem('userEmail');
  const [activeTab, setActiveTab] = useState<'profile' | 'applications' | 'policies'>('applications');
  const [leads, setLeads] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const [viewPdfUrl, setViewPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      navigate('/');
      return;
    }
    
    const fetchData = async () => {
      try {
        const [leadsRes, policiesRes] = await Promise.all([
          fetch(`http://localhost:3000/api/users/${email}/leads`),
          fetch('http://localhost:3000/api/policies')
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
      <Header onBookCall={() => setIsBookCallModalOpen(true)} />
      <div style={{ backgroundColor: '#f9fafb', minHeight: 'calc(100vh - 100px)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="dashboard-container">
          
          <div className="dashboard-header">
            <div className="dashboard-title">
              <h1>My Dashboard</h1>
              <p>Welcome back, {email}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>

          <div>
            {/* Tabs */}
            <div className="dashboard-tabs">
              <button 
                onClick={() => setActiveTab('applications')}
                className={`tab-btn ${activeTab === 'applications' ? 'active' : ''}`}
              >
                My Applications
              </button>
              <button 
                onClick={() => setActiveTab('policies')}
                className={`tab-btn ${activeTab === 'policies' ? 'active' : ''}`}
              >
                All Policies
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              >
                My Profile
              </button>
            </div>

            {/* Content */}
            <div style={{ minHeight: '400px' }}>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>Loading your dashboard...</div>
              ) : (
                <>
                  {activeTab === 'applications' && (
                    <div>
                      {leads.length > 0 ? (
                        <div className="applications-grid">
                          {leads.map(lead => {
                            let Icon = Shield;
                            if (lead.type?.toLowerCase().includes('health')) Icon = Heart;
                            if (lead.type?.toLowerCase().includes('ulip') || lead.type?.toLowerCase().includes('life')) Icon = Activity;
                            
                            const statusClass = lead.status === 'Agreed' ? 'status-agreed' : lead.status === 'Pending' ? 'status-pending' : 'status-default';
                            
                            return (
                              <div key={lead.id} className="app-card">
                                <div className="app-header">
                                  <div className="app-icon-wrapper">
                                    <Icon size={24} />
                                  </div>
                                  <span className={`app-status ${statusClass}`}>
                                    {lead.status || 'Pending'}
                                  </span>
                                </div>
                                
                                <div className="app-info">
                                  <h3>{lead.type} Insurance</h3>
                                  <p><Clock size={14} /> Applied {new Date(lead.date || lead.created_at).toLocaleDateString()}</p>
                                </div>
                                
                                <div className="app-details">
                                  <div className="app-details-grid">
                                    <div className="app-detail-item">
                                      <span className="app-detail-label">Name</span>
                                      <span className="app-detail-value">{lead.name || 'N/A'}</span>
                                    </div>
                                    <div className="app-detail-item">
                                      <span className="app-detail-label">Cover</span>
                                      <span className="app-detail-value">{lead.coverAmount || 'N/A'}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="app-actions">
                                  {lead.policy_document_url ? (
                                    <button onClick={() => setViewPdfUrl(lead.policy_document_url)} className="btn-policy">
                                      <FiFileText size={18} /> View Policy PDF
                                    </button>
                                  ) : (
                                    <button disabled style={{ opacity: 0.5, cursor: 'not-allowed' }} className="btn-policy">
                                      <Search size={18} /> Under Review
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="empty-state">
                          <Shield size={48} color="#d1d5db" style={{ margin: '0 auto 1rem' }} />
                          <h3>No applications yet</h3>
                          <p>You haven't applied for any insurance policies. Explore our products to get started.</p>
                          <button onClick={() => setActiveTab('policies')} className="btn-policy" style={{ width: 'auto', margin: '0 auto' }}>Explore Policies</button>
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
                    <div className="profile-card">
                      <div className="profile-header">
                        <div className="profile-avatar">
                          {email ? email.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="profile-info">
                          <h2>{leads.length > 0 && leads[0].name ? leads[0].name : 'User'}</h2>
                          <p>{email}</p>
                        </div>
                      </div>
                      
                      <div className="profile-stats">
                        <div className="stat-box">
                          <h4>Total Applications</h4>
                          <p>{leads.length}</p>
                        </div>
                        <div className="stat-box">
                          <h4>Active Policies</h4>
                          <p>{leads.filter(l => l.status === 'Agreed').length}</p>
                        </div>
                      </div>

                      {leads.length > 0 && leads[0].phone && (
                        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
                          <span style={{ display: 'block', fontSize: '0.85rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase' }}>Contact Number</span>
                          <span style={{ fontSize: '1.1rem', color: '#1f2937', fontWeight: 500 }}>{leads[0].phone}</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </div>
      <Footer onBookCall={() => setIsBookCallModalOpen(true)} />
      <BookCallModal isOpen={isBookCallModalOpen} onClose={() => setIsBookCallModalOpen(false)} />
      
      {viewPdfUrl && (
        <PDFViewerModal
          isOpen={!!viewPdfUrl}
          onClose={() => setViewPdfUrl(null)}
          title="Your Policy Document"
          fileUrl={viewPdfUrl}
        />
      )}
    </>
  );
};

export default UserDashboard;
