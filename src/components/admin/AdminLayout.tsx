import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiHeart, 
  FiShield, 
  FiUsers, 
  FiPhoneCall,
  FiLogOut,
  FiMenu,
  FiStar,
  FiFileText,
  FiImage,
  FiBriefcase,
  FiVideo
} from 'react-icons/fi';
import { useRealTimeLeads } from '../../hooks/useRealTimeLeads';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const typeFilter = searchParams.get('type');
  const isHealthActive = location.pathname.includes('/leads') && (!typeFilter || typeFilter === 'health');
  const isLifeActive = location.pathname.includes('/leads') && typeFilter === 'life';

  useRealTimeLeads();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background-light, #f4f7f6)' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: '260px', backgroundColor: 'white', color: 'var(--text-dark, #1f2937)', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color, #e5e7eb)' }}>
        <div className="sidebar-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
          <div className="site-logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo-icon.png" alt="Icon" className="site-logo-icon" style={{ height: '28px' }} />
            <div className="site-logo-text" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              Insurance<span style={{ color: '#f1592a' }}>Shiva</span>
            </div>
          </div>
          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <FiMenu />
          </button>
        </div>
        
        <div className={`admin-nav-container ${isMobileMenuOpen ? 'open' : ''}`} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <nav className="admin-nav" style={{ flex: 1, padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          
          {/* Health Insurance Link */}
          <NavLink 
            to="/admin/dashboard/leads?type=health"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={() => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isHealthActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isHealthActive ? 600 : 400,
              backgroundColor: isHealthActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isHealthActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiHeart size={20} /> <span className="nav-text">Health</span>
          </NavLink>

          {/* Life Insurance Link */}
          <NavLink 
            to="/admin/dashboard/leads?type=life"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={() => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isLifeActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isLifeActive ? 600 : 400,
              backgroundColor: isLifeActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isLifeActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiShield size={20} /> <span className="nav-text">Life</span>
          </NavLink>

          {/* Best Plans Link */}
          <NavLink 
            to="/admin/dashboard/best-plans"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={({ isActive }) => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiStar size={20} /> <span className="nav-text">Best Plans</span>
          </NavLink>

          {/* Quote Requests Link */}
          <NavLink 
            to="/admin/dashboard/quote-requests"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={({ isActive }) => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiFileText size={20} /> <span className="nav-text">Quote Requests</span>
          </NavLink>

          {/* Premium Requests Link */}
          <NavLink 
            to="/admin/dashboard/premium-requests"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={({ isActive }) => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiFileText size={20} /> <span className="nav-text">Premium Requests</span>
          </NavLink>

          {/* Manage Policies Link */}
          <NavLink 
            to="/admin/dashboard/policies" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
            style={({ isActive }) => ({ 
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.5rem', 
              color: isActive ? 'var(--primary-color, #2e9f68)' : '#4b5563', textDecoration: 'none', 
              borderLeft: isActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent', 
              backgroundColor: isActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              transition: 'all 0.2s' 
            })}
          >
            <FiShield size={20} />
            <span className="nav-text">Manage Policies</span>
          </NavLink>

          {/* Call Requests Link */}
          <NavLink 
            to="/admin/dashboard/call-requests"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={({ isActive }) => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiPhoneCall size={20} /> <span className="nav-text">Call Requests</span>
          </NavLink>

          {/* Employee Management Link */}
          <NavLink 
            to="/admin/dashboard/employees"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={({ isActive }) => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiUsers size={20} /> <span className="nav-text">Employees</span>
          </NavLink>

          {/* Gallery Link */}
          <NavLink 
            to="/admin/dashboard/gallery"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={({ isActive }) => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiImage size={20} /> <span className="nav-text">Gallery</span>
          </NavLink>

          {/* Careers Link */}
          <NavLink 
            to="/admin/dashboard/careers"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={({ isActive }) => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiBriefcase size={20} /> <span className="nav-text">Careers</span>
          </NavLink>

          {/* Reels Link */}
          <NavLink 
            to="/admin/dashboard/reels"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={({ isActive }) => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isActive ? 600 : 400,
              backgroundColor: isActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiVideo size={20} /> <span className="nav-text">Reels</span>
          </NavLink>
          </nav>

          {/* Logout */}
          <div className="logout-container" style={{ padding: '1rem', borderTop: '1px solid var(--border-color, #e5e7eb)' }}>
            <button 
              onClick={handleLogout}
              style={{
                width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', justifySelf: 'flex-end', justifyContent: 'center', gap: '0.5rem',
                backgroundColor: 'transparent', border: '1px solid #ef4444', color: '#ef4444',
                borderRadius: '6px', cursor: 'pointer', fontSize: '0.95rem', transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ef4444';
              }}
            >
              <FiLogOut size={18} /> <span className="nav-text">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
