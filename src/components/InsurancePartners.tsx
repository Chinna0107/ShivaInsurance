import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { companies } from '../data/companies';

type Tab = 'Health' | 'Term' | 'Vehicle';

const tabs: { id: Tab; label: string; icon: string; color: string }[] = [
  { id: 'Health',  label: 'Health Insurance',  icon: '❤️', color: '#059669' },
  { id: 'Term',    label: 'Life Insurance',     icon: '☂️', color: '#4f46e5' },
  { id: 'Vehicle', label: 'Vehicle Insurance',  icon: '🚗', color: '#2563eb' },
];

const InsurancePartners: React.FC = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState<Tab>('Health');
  const activeColor = tabs.find(t => t.id === active)!.color;

  return (
    <section style={{ padding: '5rem 0', background: '#f8faff' }}>
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', marginBottom: '0.5rem' }}>
            Our Insurance Partners
          </h2>
          <p style={{ color: '#6b7280', fontSize: '1.05rem' }}>
            We have tie-ups with India's most trusted insurers. Click any company to explore their plans.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                padding: '0.6rem 1.4rem',
                borderRadius: '999px',
                border: `2px solid ${active === tab.id ? tab.color : '#e5e7eb'}`,
                background: active === tab.id ? tab.color : 'white',
                color: active === tab.id ? 'white' : '#4b5563',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                transition: 'all 0.2s',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Company Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {companies[active].map(company => (
            <button
              key={company.name}
              onClick={() => navigate(`/plans/${active}/${encodeURIComponent(company.name)}`)}
              style={{
                background: 'white',
                border: '1.5px solid #e5e7eb',
                borderRadius: '14px',
                padding: '1.5rem 1rem',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(-4px)';
                el.style.borderColor = activeColor;
                el.style.boxShadow = `0 8px 24px rgba(0,0,0,0.1)`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget;
                el.style.transform = 'translateY(0)';
                el.style.borderColor = '#e5e7eb';
                el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
              }}
            >
              <div style={{
                width: '72px', height: '48px', borderRadius: '10px',
                background: company.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', padding: '6px',
              }}>
                <img
                  src={company.logo}
                  alt={company.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  onError={e => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    (e.currentTarget.parentElement as HTMLDivElement).innerText = company.name[0];
                  }}
                />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1f2937', lineHeight: 1.3 }}>
                {company.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: activeColor, fontWeight: 600 }}>
                View Plans →
              </span>
            </button>
          ))}
        </div>

        {/* View all link */}
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            onClick={() => navigate(`/${active.toLowerCase()}-plans`)}
            style={{
              background: 'none', border: `1.5px solid ${activeColor}`,
              color: activeColor, padding: '0.6rem 1.5rem',
              borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
            }}
          >
            View All {active} Plans →
          </button>
        </div>

      </div>
    </section>
  );
};

export default InsurancePartners;
