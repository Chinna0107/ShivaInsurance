import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserLoginModal from './UserLoginModal';
import './Header.css';

interface HeaderProps {
  onBookCall?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBookCall }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [policies, setPolicies] = useState<any[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dynamic policies added by Admin
    fetch('http://localhost:3000/api/policies')
      .then(res => res.json())
      .then(data => setPolicies(data))
      .catch(err => console.error('Failed to load policies in header:', err));
  }, []);

  const healthPolicies = policies.filter(p => p.type === 'Health');
  const lifePolicies = policies.filter(p => p.type === 'Life');

  const handleSubOptionClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    
    if (page.startsWith('term-') || page.startsWith('health-')) {
      const id = page.split('-')[1];
      navigate(`/policy/${id}`);
    } else {
      navigate(`/${page}`);
    }
  };

  const handleMyAccountClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      navigate('/dashboard');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <header className="header" onMouseLeave={() => setActiveDropdown(null)}>
        <div className="container header-container" style={{position: 'relative'}}>
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setActiveDropdown(null); }}>
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
            <a href="/" className="logo site-logo-container" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigate('/'); }} style={{ textDecoration: 'none' }}>
              <img src="/logo-icon.png" alt="Icon" className="site-logo-icon" />
              <div className="site-logo-text">Insurance<span>Shiva</span></div>
            </a>
            <nav className={`desktop-nav ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
              <ul className="nav-links">
                <li 
                  onMouseEnter={() => setActiveDropdown('term')}
                  className={activeDropdown === 'term' ? 'active-nav-item' : ''}
                >
                  <a href="#term" onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'term' ? null : 'term'); }}>Term <span className="dropdown-arrow"></span></a>
                  {activeDropdown === 'term' && (
                    <div className="mega-menu" style={{ width: '400px', left: '-50px' }}>
                      <div className="mega-menu-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <h3 className="mega-menu-title">Top Term Policies</h3>
                          <ul className="decoder-list">
                            {lifePolicies.length > 0 ? lifePolicies.map(policy => (
                              <li key={policy.id} onClick={(e) => handleSubOptionClick(e, `term-${policy.id}`)} style={{cursor: 'pointer'}}>
                                <span className="brand-placeholder" style={{backgroundColor: '#2563eb', color: 'white'}}>{policy.provider}</span> {policy.name}
                              </li>
                            )) : (
                              <li style={{color: '#6b7280', fontStyle: 'italic', padding: '0.5rem 0'}}>No term plans added yet.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                <li 
                  onMouseEnter={() => setActiveDropdown('health')}
                  className={activeDropdown === 'health' ? 'active-nav-item' : ''}
                >
                  <a href="#health" onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'health' ? null : 'health'); }}>Health <span className="dropdown-arrow"></span></a>
                  {activeDropdown === 'health' && (
                    <div className="mega-menu" style={{ width: '400px', left: '-50px' }}>
                      <div className="mega-menu-grid" style={{ gridTemplateColumns: '1fr' }}>
                        <div>
                          <h3 className="mega-menu-title">Top Health Policies</h3>
                          <ul className="decoder-list">
                            {healthPolicies.length > 0 ? healthPolicies.map(policy => (
                              <li key={policy.id} onClick={(e) => handleSubOptionClick(e, `health-${policy.id}`)} style={{cursor: 'pointer'}}>
                                <span className="brand-placeholder" style={{backgroundColor: '#059669', color: 'white'}}>{policy.provider}</span> {policy.name}
                              </li>
                            )) : (
                              <li style={{color: '#6b7280', fontStyle: 'italic', padding: '0.5rem 0'}}>No health plans added yet.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
                
                <li><a href="#best-plans" onClick={(e) => handleSubOptionClick(e, 'best-plans')}>Best Plans</a></li>
                
                <li 
                  onMouseEnter={() => setActiveDropdown('decode')}
                  className={activeDropdown === 'decode' ? 'active-nav-item' : ''}
                  style={{ position: 'static' }}
                >
                  <a href="#decode-plans" onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'decode' ? null : 'decode'); }}>Decode Plans <span className="dropdown-arrow"></span></a>
                  {activeDropdown === 'decode' && (
                    <div className="mega-menu" style={{ width: '900px', left: '50%', transform: 'translateX(-50%)' }}>
                      <div className="mega-menu-grid">
                        <div>
                          <h3 className="mega-menu-title">Health Insurance Decoder</h3>
                          <ul className="decoder-list">
                            {healthPolicies.length > 0 ? healthPolicies.map(policy => (
                              <li key={policy.id} onClick={(e) => handleSubOptionClick(e, `decode-${policy.id}`)} style={{cursor: 'pointer'}}>
                                <span className="brand-placeholder" style={{backgroundColor: '#059669', color: 'white'}}>{policy.provider}</span> {policy.name}
                              </li>
                            )) : (
                              <li style={{color: '#6b7280', fontStyle: 'italic', padding: '0.5rem 0'}}>No health plans added yet.</li>
                            )}
                          </ul>
                          <button className="btn-view-all" onClick={(e) => handleSubOptionClick(e, 'compare-health')}>View All <span style={{marginLeft: '4px'}}>→</span></button>
                        </div>
                        <div>
                          <h3 className="mega-menu-title">Life / Term Plan Decoder</h3>
                          <ul className="decoder-list">
                            {lifePolicies.length > 0 ? lifePolicies.map(policy => (
                              <li key={policy.id} onClick={(e) => handleSubOptionClick(e, `decode-${policy.id}`)} style={{cursor: 'pointer'}}>
                                <span className="brand-placeholder" style={{backgroundColor: '#2563eb', color: 'white'}}>{policy.provider}</span> {policy.name}
                              </li>
                            )) : (
                              <li style={{color: '#6b7280', fontStyle: 'italic', padding: '0.5rem 0'}}>No life plans added yet.</li>
                            )}
                          </ul>
                          <button className="btn-view-all" onClick={(e) => handleSubOptionClick(e, 'best-plans')}>View All <span style={{marginLeft: '4px'}}>→</span></button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                <li 
                  onMouseEnter={() => setActiveDropdown('claims')}
                  className={activeDropdown === 'claims' ? 'active-nav-item' : ''}
                  style={{ position: 'relative' }}
                >
                  <a href="#claims" onClick={(e) => { e.preventDefault(); setActiveDropdown(activeDropdown === 'claims' ? null : 'claims'); }}>Claims <span className="dropdown-arrow"></span></a>
                  {activeDropdown === 'claims' && (
                    <div className="mega-menu small-dropdown" style={{ right: 0, left: 'auto', transform: 'none' }}>
                      <div className="dropdown-section">
                        <h4 className="dropdown-heading">New to InsuranceShiva?</h4>
                        <a href="#understand" className="dropdown-link-item" onClick={(e) => handleSubOptionClick(e, 'claims-understand')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><circle cx="10" cy="13" r="2"></circle><path d="M10 15v1"></path></svg>
                          Understand the Claim Process
                        </a>
                      </div>
                      <div className="dropdown-divider"></div>
                      <div className="dropdown-section">
                        <h4 className="dropdown-heading">Existing User?</h4>
                        <a href="#intimate" className="dropdown-link-item" onClick={(e) => handleSubOptionClick(e, 'claims-intimate')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                          Intimate a Claim
                        </a>
                        <a href="#support" className="dropdown-link-item" onClick={(e) => handleSubOptionClick(e, 'claims-support')}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                          Support/Escalations
                        </a>
                      </div>
                    </div>
                  )}
                </li>
                
                {/* Mobile only links */}
                <li className="mobile-only-link" style={{ marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                  <a href="/contact" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); navigate('/contact'); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    Need Help
                  </a>
                </li>
                <li className="mobile-only-link">
                  <a href="#account" onClick={(e) => { setIsMobileMenuOpen(false); handleMyAccountClick(e); }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    My Account
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-right">
            <div className="search-bar" onClick={() => setIsSearchOpen(true)} style={{cursor: 'pointer'}}>
              <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Search..." readOnly style={{cursor: 'pointer'}} />
            </div>
            
            <div className="divider"></div>
            
            <a href="/contact" className="help-link" onClick={(e) => { e.preventDefault(); navigate('/contact'); }}>Need Help</a>
            <a href="#account" className="account-link" onClick={handleMyAccountClick}>My Account</a>
            
            <button className="btn btn-purple book-call-btn" onClick={onBookCall}>
              <svg className="book-call-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              <span className="book-call-text">Book Call with Expert</span>
            </button>
          </div>
        </div>
      </header>

      <UserLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={(email) => {
          localStorage.setItem('userEmail', email);
          setIsLoginModalOpen(false);
          navigate('/dashboard');
        }}
      />

      {/* Search Modal Overlay */}
      {isSearchOpen && (
        <div className="search-modal-overlay" onClick={() => setIsSearchOpen(false)}>
          <div className="search-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setIsSearchOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <h2 className="search-modal-title">Get instant answers to your insurance queries</h2>
            
            <div className="search-modal-input-wrapper">
              <svg className="search-modal-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Get instant answers to your insurance queries" autoFocus />
            </div>
            
            <div className="search-modal-content">
              <div className="search-categories">
                <h3>Top Categories</h3>
                <ul>
                  <li><a href="#term-life" onClick={(e) => { setIsSearchOpen(false); handleSubOptionClick(e, 'know-term'); }}># Term Life Insurance</a></li>
                  <li><a href="#health-insurance" onClick={(e) => { setIsSearchOpen(false); handleSubOptionClick(e, 'know-health'); }}># Health Insurance</a></li>
                  <li><a href="#parents-health" onClick={(e) => { setIsSearchOpen(false); handleSubOptionClick(e, 'compare-health'); }}># Parent's Health</a></li>
                </ul>
              </div>
              <div className="search-illustration">
                <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Search Illustration" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
