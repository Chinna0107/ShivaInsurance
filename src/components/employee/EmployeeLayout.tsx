import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FiHeart, 
  FiShield, 
  FiTruck,
  FiPhoneCall,
  FiFileText,
  FiLogOut,
  FiMenu
} from 'react-icons/fi';
import { useRealTimeLeads } from '../../hooks/useRealTimeLeads';

const EmployeeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const typeFilter = searchParams.get('type');
  const isHealthActive = location.pathname.includes('/leads') && (!typeFilter || typeFilter === 'health');
  const isLifeActive = location.pathname.includes('/leads') && typeFilter === 'life';
  const isVehicleActive = location.pathname.includes('/leads') && typeFilter === 'vehicle';

  useRealTimeLeads();

  const handleLogout = () => {
    // Clear auth context
    localStorage.removeItem('employeeData');
    navigate('/employee/login');
  };

  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background-light, #f4f7f6)' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: '260px', backgroundColor: 'white', color: 'var(--text-dark, #1f2937)', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-color, #e5e7eb)' }}>
        <div className="sidebar-header" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
          <div className="site-logo-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo-icon.png" alt="Icon" className="site-logo-icon" style={{ height: '28px' }} />
            <div>
              <div className="site-logo-text" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                Insurance<span style={{ color: '#f1592a' }}>Shiva</span>
              </div>
              <div style={{ marginTop: '0.1rem', fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>
                Employee Portal
              </div>
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
            to="/employee/dashboard/leads?type=health"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={() => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isHealthActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isHealthActive ? 600 : 400,
              backgroundColor: isHealthActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isHealthActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiHeart size={20} /> <span className="nav-text">Health Insurance</span>
          </NavLink>

          {/* Life Insurance Link */}
          <NavLink 
            to="/employee/dashboard/leads?type=life"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={() => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isLifeActive ? 'var(--primary-color, #2e9f68)' : '#6b7280', textDecoration: 'none', fontWeight: isLifeActive ? 600 : 400,
              backgroundColor: isLifeActive ? 'rgba(46, 159, 104, 0.1)' : 'transparent',
              borderLeft: isLifeActive ? '4px solid var(--primary-color, #2e9f68)' : '4px solid transparent'
            })}
          >
            <FiShield size={20} /> <span className="nav-text">Life Insurance</span>
          </NavLink>

          {/* Vehicle Insurance Link */}
          <NavLink 
            to="/employee/dashboard/leads?type=vehicle"
            className="nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
            style={() => ({
              padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
              color: isVehicleActive ? '#d97706' : '#6b7280', textDecoration: 'none', fontWeight: isVehicleActive ? 600 : 400,
              backgroundColor: isVehicleActive ? 'rgba(217,119,6,0.1)' : 'transparent',
              borderLeft: isVehicleActive ? '4px solid #d97706' : '4px solid transparent'
            })}
          >
            <FiTruck size={20} /> <span className="nav-text">Vehicle Insurance</span>
          </NavLink>
          
          {/* Call Requests Link */}
          <NavLink 
            to="/employee/dashboard/call-requests"
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

          {/* Quote Requests Link */}
          <NavLink 
            to="/employee/dashboard/quote-requests"
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
            to="/employee/dashboard/premium-requests"
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
          </nav>

          {/* Logout */}
          <div className="logout-container" style={{ padding: '1rem', borderTop: '1px solid var(--border-color, #e5e7eb)' }}>
            <button 
              onClick={handleLogout}
              style={{
                width: '100%', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
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

export default EmployeeLayout;
