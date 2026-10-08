import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCallModal from '../components/BookCallModal';
import NeedHelpBanner from '../components/article/NeedHelpBanner';
import './ClaimSupportPage.css';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const planTypeOptions = [
  { value: 'Life', label: '🛡️ Life' },
  { value: 'Health', label: '❤️ Health' },
  { value: 'Vehicle', label: '🚗 Vehicle' },
];

const ClaimSupportPage: React.FC = () => {
  const [isBookCallOpen, setIsBookCallOpen] = useState(false);
  const [formData, setFormData] = useState({
    policy_number: '',
    registered_name: '',
    mobile_number: '',
    email_id: '',
    claim_issue: '',
    plan_type: 'Health',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${API}/api/claims`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          policy_number: '',
          registered_name: '',
          mobile_number: '',
          email_id: '',
          claim_issue: '',
          plan_type: 'Health',
        });
      } else {
        setError('Failed to submit claim request. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app">
      <Header onBookCall={() => setIsBookCallOpen(true)} />
      <div className="claim-support-page">
        {/* ── Hero ── */}
        <div className="claim-support-hero">
          <div className="container">
            <div className="breadcrumbs" style={{ marginBottom: '1.5rem' }}>
              <span>Home</span> &gt; <span className="current">Claims Support</span>
            </div>
            <div className="claim-support-hero-content">
              <div className="claim-hero-badge">🛡️ Claims Support</div>
              <h1>Submit Your Claim Request</h1>
              <p>
                Our dedicated claims team is available 24×7 to assist you. Fill in
                your details below and we'll get back to you within 2 hours.
              </p>
            </div>

            <div className="claim-stats-row">
              <div className="claim-stat">
                <span className="claim-stat-number">2 hrs</span>
                <span className="claim-stat-label">Average Response Time</span>
              </div>
              <div className="claim-stat">
                <span className="claim-stat-number">98%</span>
                <span className="claim-stat-label">Claim Settlement Rate</span>
              </div>
              <div className="claim-stat">
                <span className="claim-stat-number">24×7</span>
                <span className="claim-stat-label">Support Available</span>
              </div>
              <div className="claim-stat">
                <span className="claim-stat-number">10K+</span>
                <span className="claim-stat-label">Claims Resolved</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="container claim-support-body">
          <div className="claim-support-layout">
            {/* ── Form Card ── */}
            <div className="claim-form-card">
              <div className="claim-form-header">
                <div className="claim-form-icon">📋</div>
                <div>
                  <h2>Claims Support</h2>
                  <p>Please fill out all details to initiate your claim request.</p>
                </div>
              </div>

              {submitted ? (
                <div className="claim-success">
                  <div className="claim-success-icon">✅</div>
                  <h3>Claim Request Submitted!</h3>
                  <p>
                    Thank you! Our claims specialist will review your request and
                    contact you within 2 hours on your registered mobile / email.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form className="claim-support-form" onSubmit={handleSubmit}>
                  {/* Row 1 */}
                  <div className="csf-row">
                    <div className="csf-group">
                      <label htmlFor="claim-policy-number">Policy Number</label>
                      <input
                        id="claim-policy-number"
                        name="policy_number"
                        type="text"
                        required
                        placeholder="Enter / Select"
                        value={formData.policy_number}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="csf-group">
                      <label htmlFor="claim-registered-name">Registered Name</label>
                      <input
                        id="claim-registered-name"
                        name="registered_name"
                        type="text"
                        required
                        placeholder="Enter / Select"
                        value={formData.registered_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Row 2 */}
                  <div className="csf-row">
                    <div className="csf-group">
                      <label htmlFor="claim-mobile">Registered Mobile Number</label>
                      <input
                        id="claim-mobile"
                        name="mobile_number"
                        type="tel"
                        required
                        placeholder="Enter / Select"
                        pattern="[6-9][0-9]{9}"
                        title="Enter a valid 10-digit Indian mobile number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="csf-group">
                      <label htmlFor="claim-email">Registered Email ID</label>
                      <input
                        id="claim-email"
                        name="email_id"
                        type="email"
                        required
                        placeholder="Enter / Select"
                        value={formData.email_id}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Row 3 — Issue + Plan Type */}
                  <div className="csf-row csf-row-issue">
                    <div className="csf-group csf-grow">
                      <label htmlFor="claim-issue">Claim Issue / Reason</label>
                      <textarea
                        id="claim-issue"
                        name="claim_issue"
                        required
                        rows={5}
                        placeholder="Describe the issue"
                        value={formData.claim_issue}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="csf-group">
                      <label>Plan Type</label>
                      <div className="plan-type-options">
                        {planTypeOptions.map((opt) => (
                          <label
                            key={opt.value}
                            className={`plan-type-option ${formData.plan_type === opt.value ? 'selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="plan_type"
                              value={opt.value}
                              checked={formData.plan_type === opt.value}
                              onChange={handleChange}
                            />
                            {opt.label}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {error && <div className="csf-error">{error}</div>}

                  <button
                    type="submit"
                    className="csf-submit-btn"
                    disabled={submitting}
                    id="submit-claim-request"
                  >
                    {submitting ? '⏳ Submitting...' : '🚀 SUBMIT CLAIM REQUEST'}
                  </button>
                </form>
              )}
            </div>

            {/* ── Sidebar ── */}
            <aside className="claim-support-sidebar">
              <div className="sidebar-info-card">
                <h4>📞 Claims Helpline</h4>
                <p>
                  Our specialized claim support desk helps with disputes, ombudsman
                  filing, and legal actions.
                </p>
                <div className="sidebar-actions">
                  <a
                    href="mailto:claims@shivainsurance.org"
                    className="btn btn-outline sidebar-btn"
                  >
                    ✉️ Email Claims Desk
                  </a>
                  <button
                    className="btn btn-primary sidebar-btn"
                    onClick={() => setIsBookCallOpen(true)}
                  >
                    📞 Request Free Advisory Call
                  </button>
                </div>
              </div>

              <div className="sidebar-info-card sidebar-checklist">
                <h4>📄 Documents Required</h4>
                <ul>
                  <li>📋 Duly signed claim form</li>
                  <li>🏥 Original discharge summary</li>
                  <li>🧾 Hospital bills &amp; receipts</li>
                  <li>🔬 Medical reports &amp; prescriptions</li>
                  <li>🪪 ID proof of the claimant</li>
                  <li>🏦 Cancelled cheque for bank transfer</li>
                </ul>
              </div>

              <div className="sidebar-info-card sidebar-tips">
                <h4>💡 Pro Tips</h4>
                <ul>
                  <li>Intimate your insurer within 24 hrs of hospitalisation</li>
                  <li>Keep all original bills safely</li>
                  <li>Note the claim reference number</li>
                  <li>Follow up every 7 days</li>
                </ul>
              </div>
            </aside>
          </div>

          <div style={{ marginTop: '4rem' }}>
            <NeedHelpBanner onBookCall={() => setIsBookCallOpen(true)} />
          </div>
        </div>
      </div>
      <Footer onBookCall={() => setIsBookCallOpen(true)} />
      <BookCallModal isOpen={isBookCallOpen} onClose={() => setIsBookCallOpen(false)} />
    </div>
  );
};

export default ClaimSupportPage;
