import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaClock } from 'react-icons/fa';
import './ContactPage.css';
import BookCallModal from '../components/BookCallModal';

const ContactPage: React.FC = () => {
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to the backend
    alert('Thank you for contacting us! We will get back to you shortly.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <>
      <Header onBookCall={() => setIsBookCallModalOpen(true)} />
      
      <div className="contact-page-container">
        {/* Hero Section */}
        <div className="contact-hero">
          <div className="container">
            <div className="contact-hero-content">
              <h1>We're Here to Help You</h1>
              <p>Got questions about your policy? Need help filing a claim? Our experts are ready to assist you every step of the way.</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container contact-main">
          <div className="contact-grid">
            
            {/* Left Side: Contact Details */}
            <div className="contact-details-section">
              <div className="details-card">
                <h2>Get in Touch</h2>
                <p className="details-subtitle">Reach out to us directly through any of these channels.</p>
                
                <div className="info-list">
                  <div className="info-item">
                    <div className="info-icon phone"><FaPhoneAlt /></div>
                    <div className="info-content">
                      <h4>Call Us Directly</h4>
                      <p>+91 88855 53249</p>
                      <span>Mon - Sat, 9:00 AM - 7:00 PM</span>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon whatsapp"><FaWhatsapp /></div>
                    <div className="info-content">
                      <h4>WhatsApp Support</h4>
                      <p>+91 88855 53249</p>
                      <span>Instant replies for quick queries</span>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon email"><FaEnvelope /></div>
                    <div className="info-content">
                      <h4>Email Us</h4>
                      <p>support@insuranceshiva.com</p>
                      <span>We aim to reply within 2 hours</span>
                    </div>
                  </div>
                  
                  <div className="info-item">
                    <div className="info-icon address"><FaMapMarkerAlt /></div>
                    <div className="info-content">
                      <h4>Visit Our Office</h4>
                      <p>Y Junction<br/>Kadapa 516001<br/>Andhra Pradesh, India</p>
                    </div>
                  </div>
                </div>

                <div className="support-badge">
                  <div className="badge-icon"><FaClock /></div>
                  <div className="badge-text">
                    <strong>24/7 Claim Support</strong>
                    <p>In case of emergency hospitalization, call our dedicated toll-free number: 1800-123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="contact-form-section">
              <div className="form-card">
                <h2>Send a Message</h2>
                <p>Fill out the form below and our insurance experts will contact you.</p>
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input type="text" id="name" name="name" required placeholder="John Doe" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input type="tel" id="phone" name="phone" required placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={handleChange} />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">How can we help? *</label>
                    <select id="subject" name="subject" required value={formData.subject} onChange={handleChange}>
                      <option value="" disabled>Select an option</option>
                      <option value="buy_policy">I want to buy a new policy</option>
                      <option value="claim_support">I need help with a claim</option>
                      <option value="policy_renewal">I want to renew my policy</option>
                      <option value="general_query">General inquiry</option>
                      <option value="feedback">Feedback / Complaint</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" name="message" rows={4} placeholder="Tell us more about your requirement..." value={formData.message} onChange={handleChange}></textarea>
                  </div>
                  
                  <button type="submit" className="btn-submit">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer onBookCall={() => setIsBookCallModalOpen(true)} />
      <BookCallModal isOpen={isBookCallModalOpen} onClose={() => setIsBookCallModalOpen(false)} />
    </>
  );
};

export default ContactPage;
