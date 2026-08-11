import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface Policy {
  id: string;
  name: string;
  provider: string;
  description: string;
  cover_amount: string;
  pros: string;
  cons: string;
  images: string;
  type: string;
  plan_type?: string;
  insurer_type?: string;
}

interface PlansPageProps {
  type: 'Health' | 'Term' | 'Vehicle';
  provider?: string;
  onBookCall: () => void;
  onGetQuote: (planName?: string) => void;
}

const config = {
  Health: {
    icon: '❤️',
    gradient: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
    accent: '#059669',
    accentLight: '#ecfdf5',
    accentText: '#065f46',
    badgeBg: '#059669',
    title: 'Health Insurance Plans',
    subtitle: 'Compare all available mediclaim and health insurance plans for you and your family.',
    compareRoute: '/compare-health',
    compareLabel: '⚖️ Compare Plans',
    emptyIcon: '❤️',
    emptyMsg: 'Our team is adding health insurance plans. Talk to an expert for personalized recommendations.',
    stats: [
      { icon: '🏥', label: '10,000+ Hospitals', sub: 'Cashless network across India' },
      { icon: '💊', label: 'Covers 541+', sub: 'Daycare procedures' },
      { icon: '🔄', label: 'Unlimited Restore', sub: 'Sum insured resets after claim' },
      { icon: '✅', label: '0% Co-pay', sub: 'Best plans have zero co-payment' },
    ],
  },
  Term: {
    icon: '☂️',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 100%)',
    accent: '#4f46e5',
    accentLight: '#eff6ff',
    accentText: '#1e1b4b',
    badgeBg: '#4f46e5',
    title: 'Life Insurance Plans',
    subtitle: 'Secure your family\'s future with pure protection plans at the lowest premiums.',
    compareRoute: '/compare-term',
    compareLabel: '⚖️ Compare Plans',
    emptyIcon: '☂️',
    emptyMsg: 'Our team is adding life insurance plans. Talk to an expert for personalized recommendations.',
    stats: [
      { icon: '💰', label: '₹1 Cr from ₹450/mo', sub: 'Lowest premiums in India' },
      { icon: '📊', label: '99.5% Claim Ratio', sub: 'Best insurers pay almost all claims' },
      { icon: '🛡️', label: 'Up to Age 99', sub: 'Whole life cover available' },
      { icon: '🎯', label: '30+ Insurers', sub: 'Compare all in one place' },
    ],
  },
  Vehicle: {
    icon: '🚗',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
    accent: '#2563eb',
    accentLight: '#eff6ff',
    accentText: '#1e3a8a',
    badgeBg: '#2563eb',
    title: 'Vehicle Insurance Plans',
    subtitle: 'Compare all available vehicle insurance plans for your car, bike, or commercial vehicle.',
    compareRoute: '/vehicle-compare',
    compareLabel: '⚖️ Compare Plans',
    emptyIcon: '🚗',
    emptyMsg: 'Our team is adding vehicle insurance plans. Talk to an expert for personalized recommendations.',
    stats: [
      { icon: '🛡️', label: 'Legally Mandatory', sub: 'Third-party cover required by law' },
      { icon: '💰', label: 'Save up to 70%', sub: 'Compare & get the best premium' },
      { icon: '🔧', label: '16,000+ Garages', sub: 'Cashless repair network' },
      { icon: '⚡', label: 'Instant Policy', sub: 'Get your document in minutes' },
    ],
  },
};

const PlansPage: React.FC<PlansPageProps> = ({ type, provider, onBookCall, onGetQuote }) => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPlanType, setFilterPlanType] = useState<string>('All');
  const [filterInsurerType, setFilterInsurerType] = useState<string>('All');
  const c = config[type];

  useEffect(() => {
    const url = new URL(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/policies`);
    url.searchParams.set('type', type);
    if (provider) url.searchParams.set('provider', provider);
    fetch(url.toString())
      .then(r => r.json())
      .then(data => setPolicies(data))
      .catch(() => toast.error(`Failed to load ${type} plans`))
      .finally(() => setLoading(false));
  }, [type, provider]);

  const getImages = (raw: string): string[] => {
    try { return raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : []; }
    catch { return []; }
  };

  const filteredPolicies = policies.filter(p => {
    const matchPlan = filterPlanType === 'All' || (p.plan_type || 'Individual') === filterPlanType;
    const matchInsurer = filterInsurerType === 'All' || (p.insurer_type || 'Private') === filterInsurerType;
    return matchPlan && matchInsurer;
  });

  return (
    <div style={{ background: '#f8faff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ background: c.gradient, color: 'white', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{c.icon}</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 0.5rem', lineHeight: 1.2 }}>{c.title}</h1>
          {provider && (
            <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', padding: '0.3rem 1rem', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              {provider}
            </div>
          )}
          <p style={{ fontSize: '1.05rem', opacity: 0.85, margin: '0 0 1.5rem' }}>{c.subtitle}</p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(c.compareRoute)}
              style={{ padding: '0.75rem 1.5rem', background: 'white', color: c.accentText, border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
            >
              {c.compareLabel}
            </button>
            <button
              onClick={onBookCall}
              style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
            >
              📞 Talk to Expert
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {c.stats.map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.9rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '0.25rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>
            All {type} Plans {!loading && `(${filteredPolicies.length})`}
          </h2>
          
          {!loading && policies.length > 0 && (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4b5563' }}>Plan Type:</label>
                <select 
                  value={filterPlanType} 
                  onChange={e => setFilterPlanType(e.target.value)}
                  style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '0.85rem', outline: 'none', background: 'white', color: '#1f2937' }}
                >
                  <option value="All">All Types</option>
                  <option value="Individual">Individual</option>
                  <option value="Family">Family Plan</option>
                  <option value="Senior Citizen">Senior Citizen</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#4b5563' }}>Insurer:</label>
                <select 
                  value={filterInsurerType} 
                  onChange={e => setFilterInsurerType(e.target.value)}
                  style={{ padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '0.85rem', outline: 'none', background: 'white', color: '#1f2937' }}
                >
                  <option value="All">All Insurers</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Skeleton */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div className="skeleton-box" style={{ height: '180px', width: '100%', borderRadius: 0 }} />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="skeleton-box" style={{ height: '20px', width: '60%' }} />
                  <div className="skeleton-box" style={{ height: '14px', width: '40%' }} />
                  <div className="skeleton-box" style={{ height: '14px', width: '80%' }} />
                  <div className="skeleton-box" style={{ height: '14px', width: '70%' }} />
                </div>
              </div>
            ))}
          </div>

        ) : filteredPolicies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{c.emptyIcon}</div>
            <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>No {type} Plans Found</h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>We couldn't find any plans matching your selected filters.</p>
            <button onClick={() => { setFilterPlanType('All'); setFilterInsurerType('All'); }} style={{ padding: '0.75rem 1.5rem', background: c.accent, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
              Clear Filters
            </button>
          </div>

        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredPolicies.map(policy => {
              const images = getImages(policy.images);
              const pros = policy.pros ? policy.pros.split('\n').filter(Boolean) : [];
              return (
                <div
                  key={policy.id}
                  style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'; }}
                >
                  {/* Image */}
                  <div style={{ height: '180px', overflow: 'hidden', background: '#f1f5f9', position: 'relative', flexShrink: 0 }}>
                    {images.length > 0 ? (
                      <img src={images[0]} alt={policy.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>{c.icon}</div>
                    )}
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: c.badgeBg, color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {type}
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', margin: '0 0 0.25rem' }}>{policy.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>by {policy.provider}</p>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          {policy.plan_type && (
                            <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                              {policy.plan_type}
                            </span>
                          )}
                          {policy.insurer_type && (
                            <span style={{ background: policy.insurer_type === 'Public' ? '#f0fdf4' : '#fdf4ff', color: policy.insurer_type === 'Public' ? '#15803d' : '#7e22ce', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                              {policy.insurer_type}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {policy.cover_amount && (
                      <div style={{ background: c.accentLight, borderRadius: '8px', padding: '0.6rem 0.9rem' }}>
                        <div style={{ fontSize: '0.72rem', color: c.accent, fontWeight: 600, textTransform: 'uppercase' }}>Cover Amount</div>
                        <div style={{ fontWeight: 700, color: c.accentText, fontSize: '0.95rem' }}>{policy.cover_amount}</div>
                      </div>
                    )}

                    {policy.description && (
                      <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>{policy.description}</p>
                    )}

                    {pros.length > 0 && (
                      <div>
                        <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>✓ Key Benefits</div>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                          {pros.slice(0, 3).map((p, i) => (
                            <li key={i} style={{ display: 'flex', gap: '0.4rem', fontSize: '0.83rem', color: '#374151' }}>
                              <span style={{ color: '#059669', flexShrink: 0 }}>✓</span>{p}
                            </li>
                          ))}
                          {pros.length > 3 && <li style={{ fontSize: '0.78rem', color: '#9ca3af' }}>+{pros.length - 3} more benefits</li>}
                        </ul>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                      <button
                        onClick={() => navigate(`/policy/${policy.id}`)}
                        style={{ flex: 1, padding: '0.7rem', background: c.accent, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onGetQuote(policy.name)}
                        style={{ flex: 1, padding: '0.7rem', background: 'white', color: c.accent, border: `1px solid ${c.accent}`, borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}
                      >
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        {!loading && (
          <div style={{ marginTop: '3rem', background: c.gradient, borderRadius: '16px', padding: '2.5rem', color: 'white', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.5rem', fontWeight: 700 }}>Not sure which plan to pick?</h2>
            <p style={{ margin: '0 0 1.5rem', opacity: 0.85 }}>Our {type.toLowerCase()} insurance experts will help you choose the right plan in 15 minutes — for free.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={onBookCall} style={{ padding: '0.8rem 1.75rem', background: 'white', color: c.accentText, border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                📞 Book Free Expert Call
              </button>
              <button onClick={() => navigate(c.compareRoute)} style={{ padding: '0.8rem 1.75rem', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                {c.compareLabel} Side by Side
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansPage;
