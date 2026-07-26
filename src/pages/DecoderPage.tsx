import React from 'react';
import type { DecoderPageData } from '../data/pageContent';
import NeedHelpBanner from '../components/article/NeedHelpBanner';
import './Pages.css';

interface DecoderPageProps {
  data: DecoderPageData;
  onBookCall?: () => void;
  onGetQuote?: () => void;
}

const DecoderPage: React.FC<DecoderPageProps> = ({ data, onBookCall, onGetQuote }) => {
  return (
    <div className="article-page decoder-page">
      <div className="container">
        {/* Header Hero */}
        <div className="article-hero" style={{ marginBottom: '2rem' }}>
          <div className="breadcrumbs">
            <span>Home</span> &gt; <span>Decoders</span> &gt; <span className="current">{data.planName}</span>
          </div>
          
          <div 
            className="decoder-header-badge" 
            style={{ backgroundColor: data.brandColor }}
          >
            {data.brand}
          </div>
          
          <h1 className="article-main-title">{data.planName}</h1>
          <p className="article-subtitle-text">{data.tagline}</p>

          <div className="article-meta">
            <div className="article-stats">
              <div className="stat">
                <span className="stat-value">{data.rating} / 5</span>
                <span className="stat-label">Shiva Rating</span>
              </div>
              <div className="stat">
                <span className="stat-value">{data.claimRatio}</span>
                <span className="stat-label">Claim Ratio</span>
              </div>
              {data.networkHospitals && (
                <div className="stat">
                  <span className="stat-value">{data.networkHospitals}</span>
                  <span className="stat-label">Cashless Hospitals</span>
                </div>
              )}
              <div className="stat">
                <span className="stat-value">{data.premiumRange}</span>
                <span className="stat-label">Est. Premium</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decoder Content */}
        <div className="decoder-flex-layout">
          <div>
            <section className="content-section">
              <h2>Plan Overview & Verdict</h2>
              <p>{data.expertVerdict}</p>
            </section>

            {/* Pros and Cons */}
            <div className="pros-cons-grid">
              <div className="pros-card">
                <h3>🟢 What We Liked (Pros)</h3>
                <ul className="pros-cons-list">
                  {data.pros.map((pro, i) => (
                    <li key={i}>✅ {pro}</li>
                  ))}
                </ul>
              </div>
              <div className="cons-card">
                <h3>🔴 What to Watch Out For (Cons)</h3>
                <ul className="pros-cons-list">
                  {data.cons.map((con, i) => (
                    <li key={i}>⚠️ {con}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <aside className="decoder-sidebar">
            <div className="table-of-contents" style={{ position: 'sticky', top: '120px' }}>
              <h4 style={{ marginBottom: '1.5rem', color: '#111827' }}>Key Plan Features</h4>
              <ul className="decoder-features-sidebar-list" style={{ listStyle: 'none', padding: 0 }}>
                {data.keyFeatures.map((kf, i) => (
                  <li 
                    key={i} 
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '0.75rem 0', 
                      borderBottom: '1px solid var(--border-color)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <span style={{ color: 'var(--text-gray)' }}>{kf.feature}</span>
                    <span style={{ fontWeight: '700', color: kf.good ? '#047857' : '#b91c1c' }}>
                      {kf.value}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={onGetQuote}>
                  Calculate Premium
                </button>
                <button className="btn btn-outline" style={{ width: '100%' }} onClick={onBookCall}>
                  Talk to Expert (Free)
                </button>
              </div>
            </div>
          </aside>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <NeedHelpBanner onBookCall={onBookCall} />
        </div>
      </div>
    </div>
  );
};

export default DecoderPage;
