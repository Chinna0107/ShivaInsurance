import React, { useState } from 'react';
import type { ClaimsPageData } from '../data/pageContent';
import NeedHelpBanner from '../components/article/NeedHelpBanner';
import './Pages.css';

interface ClaimsPageProps {
  data: ClaimsPageData;
  onBookCall?: () => void;
}

const ClaimsPage: React.FC<ClaimsPageProps> = ({ data, onBookCall }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    policyNo: '',
    claimType: 'health',
    hospitalName: '',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      alert("Claim initiation received! InsuranceShiva claim support officer will call you in 15 minutes.");
      setFormData({
        name: '',
        phone: '',
        policyNo: '',
        claimType: 'health',
        hospitalName: '',
        reason: ''
      });
    }, 500);
  };

  return (
    <div className="article-page claims-page">
      <div className="container">
        {/* Header Hero */}
        <div className="article-hero" style={{ marginBottom: '2rem' }}>
          <div className="breadcrumbs">
            <span>Home</span> &gt; <span>Claims</span> &gt; <span className="current">{data.title}</span>
          </div>
          
          <div className="article-tag">Claims support</div>
          
          <h1 className="article-main-title">{data.title}</h1>
          <p className="article-subtitle-text">{data.subtitle}</p>
        </div>

        {/* Dynamic section by type */}
        {data.type === 'understand' && (
          <div className="decoder-flex-layout">
            <div>
              <h2>Step-by-Step Claim Flow</h2>
              <div className="claims-steps-container">
                <div className="claim-timeline">
                  {data.steps.map((step) => (
                    <div className="claim-timeline-item" key={step.step}>
                      <span className="claim-timeline-dot">{step.step}</span>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        <span>{step.icon}</span> {step.title}
                      </h4>
                      <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="decoder-sidebar">
              <div className="table-of-contents">
                <h4>Claim Filing Pro Tips</h4>
                <ul style={{ paddingLeft: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {data.tips.map((tip, i) => (
                    <li key={i} style={{ color: 'var(--text-gray)', fontSize: '0.9rem', lineHeight: '1.4' }}>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        )}

        {data.type === 'intimate' && (
          <div className="decoder-flex-layout">
            <div>
              <h2>Submit Your Claim Intimation</h2>
              <p style={{ color: 'var(--text-gray)', marginTop: '0.5rem' }}>
                Fill this simple form to trigger our 24x7 Claims Assistance. Our claims specialist will review your details, connect with your insurer, and manage the documentation for you.
              </p>
              
              <form className="claims-form" onSubmit={handleSubmit}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Enter claimant name" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="Enter 10-digit mobile" 
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label>Policy Number (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. POL123456" 
                      value={formData.policyNo}
                      onChange={e => setFormData({ ...formData, policyNo: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Claim Category</label>
                    <select 
                      value={formData.claimType}
                      onChange={e => setFormData({ ...formData, claimType: e.target.value })}
                    >
                      <option value="health">Health Insurance Cashless</option>
                      <option value="reimburse">Health Insurance Reimbursement</option>
                      <option value="life">Life Insurance Death Claim</option>
                      <option value="accident">Accidental Claim</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Hospital / Clinic Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter hospital name & city" 
                    value={formData.hospitalName}
                    onChange={e => setFormData({ ...formData, hospitalName: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label>Brief Reason / Diagnosis</label>
                  <textarea 
                    rows={4} 
                    placeholder="Describe the medical condition or reason for claim"
                    value={formData.reason}
                    onChange={e => setFormData({ ...formData, reason: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Intimation Call Request
                </button>
              </form>
            </div>

            <aside className="decoder-sidebar">
              <div className="table-of-contents">
                <h4>Required Documents Checklist</h4>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-gray)' }}>
                  <li>📄 Duly signed claim form (Part A & B)</li>
                  <li>🏥 Original discharge summary</li>
                  <li>🧾 Original final hospital bill & payment receipts</li>
                  <li>🔬 All medical reports & lab prescriptions</li>
                  <li>🪪 ID proof of the patient / claimant</li>
                  <li>🏦 Cancelled cheque for bank transfer</li>
                </ul>
              </div>
            </aside>
          </div>
        )}

        {data.type === 'support' && (
          <div className="decoder-flex-layout">
            <div>
              <h2>Escalation Matrix</h2>
              <p style={{ color: 'var(--text-gray)', marginTop: '0.5rem' }}>
                If your claim has been delayed, partially approved, or rejected, follow this escalation structure to protect your rights:
              </p>
              
              <div className="claims-steps-container">
                <div className="claim-timeline">
                  {data.steps.map((step) => (
                    <div className="claim-timeline-item" key={step.step}>
                      <span className="claim-timeline-dot">{step.step}</span>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                        <span>{step.icon}</span> {step.title}
                      </h4>
                      <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="decoder-sidebar">
              <div className="table-of-contents">
                <h4>Shiva Claims Helpline</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', lineHeight: '1.5', marginTop: '0.75rem' }}>
                  Our specialized claim support desk helps with disputes, ombudsman filing, and legal actions.
                </p>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a href="mailto:claims@shivainsurance.org" className="btn btn-outline" style={{ display: 'flex', gap: '6px' }}>
                    ✉️ Email Claims Desk
                  </a>
                  <button className="btn btn-primary" onClick={onBookCall}>
                    📞 Request Free Advisory Call
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}

        <div style={{ marginTop: '4rem' }}>
          <NeedHelpBanner onBookCall={onBookCall} />
        </div>
      </div>
    </div>
  );
};

export default ClaimsPage;
