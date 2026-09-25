import { useState, useEffect } from 'react';
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
import { useRealTimeLeads, leadEventEmitter } from '../../hooks/useRealTimeLeads';

const EmployeeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [counts, setCounts] = useState({ health: 0, life: 0, vehicle: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const [health, life, vehicle] = await Promise.all([
          fetch(`${API}/api/leads?type=health`).then(res => res.json()),
          fetch(`${API}/api/leads?type=life`).then(res => res.json()),
          fetch(`${API}/api/leads?type=vehicle`).then(res => res.json()),
        ]);
        setCounts({
          health: Array.isArray(health) ? health.filter((l: any) => l.status === 'Pending').length : 0,
          life: Array.isArray(life) ? life.filter((l: any) => l.status === 'Pending').length : 0,
          vehicle: Array.isArray(vehicle) ? vehicle.filter((l: any) => l.status === 'Pending').length : 0,
        });
      } catch (err) {
        console.error('Failed to fetch lead counts', err);
      }
    };
    fetchCounts();

    const handleNewLeadEvent = (e: any) => {
      const newLead = e.detail;
      if (newLead.status === 'Pending') {
        if (newLead.type === 'health') setCounts(prev => ({ ...prev, health: prev.health + 1 }));
        if (newLead.type === 'life') setCounts(prev => ({ ...prev, life: prev.life + 1 }));
        if (newLead.type === 'vehicle') setCounts(prev => ({ ...prev, vehicle: prev.vehicle + 1 }));
      }
    };
    
    leadEventEmitter.addEventListener('new-lead', handleNewLeadEvent);
    return () => leadEventEmitter.removeEventListener('new-lead', handleNewLeadEvent);
  }, []);

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
            <FiHeart size={20} /> <span className="nav-text" style={{ flex: 1 }}>Health Insurance</span>
            {counts.health > 0 && (
              <span style={{ background: isHealthActive ? 'var(--primary-color, #2e9f68)' : '#e5e7eb', color: isHealthActive ? 'white' : '#4b5563', padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                {counts.health}
              </span>
            )}
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
            <FiShield size={20} /> <span className="nav-text" style={{ flex: 1 }}>Life Insurance</span>
            {counts.life > 0 && (
              <span style={{ background: isLifeActive ? 'var(--primary-color, #2e9f68)' : '#e5e7eb', color: isLifeActive ? 'white' : '#4b5563', padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                {counts.life}
              </span>
            )}
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
            <FiTruck size={20} /> <span className="nav-text" style={{ flex: 1 }}>Vehicle Insurance</span>
            {counts.vehicle > 0 && (
              <span style={{ background: isVehicleActive ? '#d97706' : '#e5e7eb', color: isVehicleActive ? 'white' : '#4b5563', padding: '0.1rem 0.5rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                {counts.vehicle}
              </span>
            )}
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
