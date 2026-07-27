import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import './Footer.css';

interface FooterProps {
  onBookCall?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onBookCall }) => {
  return (
    <footer className="footer">
      <div className="footer-cta-bar">
        <div className="container cta-bar-container">
          <div className="cta-bar-left">
            <img src="https://i.pravatar.cc/150?img=11" alt="Advisor" className="cta-advisor-img" />
            <div className="cta-text-wrap">
              <strong>Need help finding the right plan?</strong>
              <p>Book a free 1-to-1 call with a certified expert.</p>
            </div>
          </div>
          <div className="cta-bar-right">
            <button className="btn btn-outline" style={{ backgroundColor: 'white' }} onClick={onBookCall}>Book a Call</button>
            <button className="btn btn-primary" style={{ backgroundColor: '#25d366', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => window.open('https://wa.me/918885553249?text=Hello%20InsuranceShiva%20Team%20%2C', '_blank')}>
              <FaWhatsapp size={18} /> WhatsApp Us
            </button>
          </div>
        </div>
      </div>

      <div className="container footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="site-logo-container" style={{ marginBottom: '20px', backgroundColor: 'white', padding: '12px 20px', borderRadius: '14px', display: 'inline-flex', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
              <img src="/logo-icon.png" alt="Icon" className="site-logo-icon" />
              <div className="site-logo-text" style={{ color: '#1a233a' }}>Insurance<span style={{ color: '#ea580c' }}>Shiva</span></div>
            </div>
            <p className="footer-desc">
              India's first and only neutral insurance platform. We simplify insurance for you, so you can buy with confidence.
            </p>
            <div className="social-links" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="#fb" aria-label="Facebook" className="social-icon fb">
                <FaFacebookF />
              </a>
              <a href="#tw" aria-label="Twitter" className="social-icon tw">
                <FaTwitter />
              </a>
              <a href="#ig" aria-label="Instagram" className="social-icon ig">
                <FaInstagram />
              </a>
              <a href="#yt" aria-label="YouTube" className="social-icon yt">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4>InsuranceShiva</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#media">Media</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4>Insurance</h4>
            <ul>
              <li><a href="#health">Health Insurance</a></li>
              <li><a href="#term">Term Life Insurance</a></li>
              <li><a href="#motor">Motor Insurance</a></li>
              <li><a href="#travel">Travel Insurance</a></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Contact Us</h4>
            <ul style={{ gap: '1.5rem' }}>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  <FaPhoneAlt />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Call Us</div>
                  <a href="tel:+918885553249" style={{ color: '#1f2937', fontWeight: 600, fontSize: '1.05rem', textDecoration: 'none' }}>+91 88855 53249</a>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                  <FaWhatsapp />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>WhatsApp</div>
                  <a href="https://wa.me/918885553249?text=Hello%20InsuranceShiva%20Team%20%2C" target="_blank" rel="noreferrer" style={{ color: '#1f2937', fontWeight: 600, fontSize: '1.05rem', textDecoration: 'none' }}>+91 88855 53249</a>
                </div>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Address</div>
                  <span style={{ color: '#4b5563', fontSize: '0.95rem', lineHeight: 1.5, display: 'block' }}>Y Junction<br />Kadapa 516001</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} InsuranceShiva. All rights reserved.</p>
          <div className="legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
