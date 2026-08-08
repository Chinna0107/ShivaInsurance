import { useState, useEffect } from 'react';
import React from 'react';
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
}

interface VehiclePlansPageProps {
  onBookCall: () => void;
  onGetQuote: (planName?: string) => void;
}

const VehiclePlansPage: React.FC<VehiclePlansPageProps> = ({ onBookCall, onGetQuote }) => {
  const navigate = useNavigate();
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/policies?type=Vehicle`)
      .then(r => r.json())
      .then(data => setPolicies(data))
      .catch(() => toast.error('Failed to load vehicle plans'))
      .finally(() => setLoading(false));
  }, []);

  const getImages = (raw: string): string[] => {
    try { return raw ? (typeof raw === 'string' ? JSON.parse(raw) : raw) : []; }
    catch { return []; }
  };

  return (
    <div style={{ background: '#f8faff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', color: 'white', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>
            Vehicle Insurance Plans
          </h1>
          <p style={{ fontSize: '1.05rem', opacity: 0.85, margin: '0 0 1.5rem' }}>
            Compare all available vehicle insurance plans. Pick the right cover for your car, bike, or commercial vehicle.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/vehicle-compare')}
              style={{ padding: '0.75rem 1.5rem', background: 'white', color: '#1e3a8a', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}
            >
              ⚖️ Compare Plans
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

      {/* Plans Grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Quick stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {[
            { icon: '🛡️', label: 'Legally Mandatory', sub: 'Third-party cover required by law' },
            { icon: '💰', label: 'Save up to 70%', sub: 'Compare & get the best premium' },
            { icon: '🔧', label: '16,000+ Garages', sub: 'Cashless repair network' },
            { icon: '⚡', label: 'Instant Policy', sub: 'Get your document in minutes' },
          ].map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.9rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '0.25rem' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.5rem' }}>
          All Vehicle Plans {!loading && `(${policies.length})`}
        </h2>

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
        ) : policies.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
            <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>No Vehicle Plans Yet</h3>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Our team is adding vehicle insurance plans. Talk to an expert for personalized recommendations.</p>
            <button onClick={onBookCall} style={{ padding: '0.75rem 1.5rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
              📞 Talk to an Expert
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {policies.map(policy => {
              const images = getImages(policy.images);
              const pros = policy.pros ? policy.pros.split('\n').filter(Boolean) : [];
              return (
                <div
                  key={policy.id}
                  style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 2px 16px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', transition: 'all 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.05)'; }}
                >
                  {/* Image */}
                  <div style={{ height: '180px', overflow: 'hidden', background: '#f1f5f9', position: 'relative' }}>
                    {images.length > 0 ? (
                      <img src={images[0]} alt={policy.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>🚗</div>
                    )}
                    <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#2563eb', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                      Vehicle
                    </span>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', margin: '0 0 0.25rem' }}>{policy.name}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>by {policy.provider}</p>
                    </div>

                    {policy.cover_amount && (
                      <div style={{ background: '#eff6ff', borderRadius: '8px', padding: '0.6rem 0.9rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: 600, textTransform: 'uppercase' }}>Cover Amount</span>
                        <div style={{ fontWeight: 700, color: '#1e3a8a', fontSize: '0.95rem' }}>{policy.cover_amount}</div>
                      </div>
                    )}

                    {policy.description && (
                      <p style={{ fontSize: '0.88rem', color: '#4b5563', lineHeight: 1.6, margin: 0 }}>{policy.description}</p>
                    )}

                    {pros.length > 0 && (
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.4rem' }}>✓ Key Benefits</div>
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

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '0.5rem' }}>
                      <button
                        onClick={() => navigate(`/policy/${policy.id}`)}
                        style={{ flex: 1, padding: '0.7rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onGetQuote(policy.name)}
                        style={{ flex: 1, padding: '0.7rem', background: 'white', color: '#2563eb', border: '1px solid #2563eb', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}
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

        {/* CTA Banner */}
        {!loading && (
          <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', borderRadius: '16px', padding: '2.5rem', color: 'white', textAlign: 'center' }}>
            <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.5rem', fontWeight: 700 }}>Not sure which plan to pick?</h2>
            <p style={{ margin: '0 0 1.5rem', opacity: 0.85 }}>Our vehicle insurance experts will help you choose the right plan in 15 minutes — for free.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={onBookCall} style={{ padding: '0.8rem 1.75rem', background: 'white', color: '#1e3a8a', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                📞 Book Free Expert Call
              </button>
              <button onClick={() => navigate('/vehicle-compare')} style={{ padding: '0.8rem 1.75rem', background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>
                ⚖️ Compare Plans Side by Side
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehiclePlansPage;
