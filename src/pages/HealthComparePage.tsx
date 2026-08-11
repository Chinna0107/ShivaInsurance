import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface Policy {
  id: string;
  name: string;
  provider: string;
  description: string;
  cover_amount: string;
  pros: string;
  cons: string;
  type: string;
  plan_type?: string;
  insurer_type?: string;
}

interface HealthComparePageProps {
  onBookCall: () => void;
}

const HealthComparePage: React.FC<HealthComparePageProps> = ({ onBookCall }) => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [leftId, setLeftId] = useState('');
  const [rightId, setRightId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/policies?type=Health`)
      .then(r => r.json())
      .then(data => {
        setPolicies(data);
        if (data.length >= 2) { setLeftId(data[0].id); setRightId(data[1].id); }
        else if (data.length === 1) { setLeftId(data[0].id); }
      })
      .catch(() => toast.error('Failed to load policies'))
      .finally(() => setLoading(false));
  }, []);

  const left = policies.find(p => p.id === leftId);
  const right = policies.find(p => p.id === rightId);

  const renderPolicyCard = (policy: Policy | undefined, side: 'left' | 'right') => {
    const color = side === 'left' ? '#059669' : '#0284c7'; // using greens and blues for health
    if (!policy) return (
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', fontSize: '0.95rem', padding: '3rem 1rem', textAlign: 'center' }}>
        Select a policy to compare
      </div>
    );
    const pros = policy.pros ? policy.pros.split('\n').filter(Boolean) : [];
    const cons = policy.cons ? policy.cons.split('\n').filter(Boolean) : [];
    return (
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ display: 'inline-block', backgroundColor: color, color: 'white', padding: '0.3rem 0.9rem', borderRadius: '1rem', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            {policy.provider}
          </span>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1f2937', fontWeight: 700 }}>{policy.name}</h3>
          
          <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center', marginTop: '0.5rem' }}>
            {policy.plan_type && (
              <span style={{ background: '#eff6ff', color: '#1d4ed8', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                {policy.plan_type}
              </span>
            )}
            {policy.insurer_type && (
              <span style={{ background: policy.insurer_type === 'Public' ? '#f0fdf4' : '#fdf4ff', color: policy.insurer_type === 'Public' ? '#15803d' : '#7e22ce', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>
                {policy.insurer_type === 'Public' ? '🏛️ Public' : '🏢 Private'}
              </span>
            )}
          </div>
        </div>

        {policy.cover_amount && (
          <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.25rem' }}>Cover Amount</div>
            <div style={{ fontWeight: 600, color: '#1f2937' }}>{policy.cover_amount}</div>
          </div>
        )}

        {policy.description && (
          <div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>About</div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.6 }}>{policy.description}</p>
          </div>
        )}

        {pros.length > 0 && (
          <div>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>✓ Pros</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {pros.map((p, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.88rem', color: '#374151' }}>
                  <span style={{ color: '#059669', flexShrink: 0 }}>✓</span>{p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {cons.length > 0 && (
          <div>
            <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>✗ Cons</div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {cons.map((c, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.88rem', color: '#374151' }}>
                  <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>{c}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={onBookCall} style={{ marginTop: 'auto', padding: '0.75rem', backgroundColor: color, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}>
          Get Quote for This Plan
        </button>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', color: '#1f2937', fontWeight: 700, marginBottom: '0.5rem' }}>Compare Health Insurance Plans</h1>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>Select two plans to see a side-by-side comparison</p>
      </div>

      {/* Selectors */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
        <select
          value={leftId}
          onChange={e => setLeftId(e.target.value)}
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '8px', border: '2px solid #059669', outline: 'none', fontSize: '0.95rem', fontWeight: 500, color: '#1f2937' }}
        >
          <option value="">Select Plan A</option>
          {policies.map(p => <option key={p.id} value={p.id}>{p.provider} — {p.name}</option>)}
        </select>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: '#f3f4f6', border: '2px solid #e5e7eb', fontWeight: 700, color: '#6b7280', flexShrink: 0, fontSize: '0.85rem' }}>
          VS
        </div>

        <select
          value={rightId}
          onChange={e => setRightId(e.target.value)}
          style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '8px', border: '2px solid #0284c7', outline: 'none', fontSize: '0.95rem', fontWeight: 500, color: '#1f2937' }}
        >
          <option value="">Select Plan B</option>
          {policies.map(p => <option key={p.id} value={p.id}>{p.provider} — {p.name}</option>)}
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>Loading policies...</div>
      ) : policies.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#6b7280' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
          <p>No health insurance plans added yet. Ask your admin to add plans.</p>
        </div>
      ) : (
        /* Compare Box */
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', background: 'white' }}>
          <div style={{ display: 'flex', minHeight: '500px' }}>
            {renderPolicyCard(left, 'left')}

            {/* Divider */}
            <div style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, #e5e7eb 20%, #e5e7eb 80%, transparent)', position: 'relative', flexShrink: 0 }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem', color: '#6b7280', zIndex: 1 }}>
                VS
              </div>
            </div>

            {renderPolicyCard(right, 'right')}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthComparePage;
