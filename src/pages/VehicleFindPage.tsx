import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface VehicleFindPageProps {
  onBookCall: () => void;
}

const vehicles = [
  { label: 'Car', emoji: '🚗', desc: 'Comprehensive cover for sedans, SUVs & hatchbacks' },
  { label: 'Bike', emoji: '🏍️', desc: 'Two-wheeler plans for bikes & scooters' },
  { label: 'Truck', emoji: '🚛', desc: 'Commercial vehicle & goods carrier cover' },
  { label: 'Auto', emoji: '🛺', desc: 'Three-wheeler & auto-rickshaw insurance' },
  { label: 'Bus', emoji: '🚌', desc: 'Passenger vehicle & school bus cover' },
  { label: 'Tractor', emoji: '🚜', desc: 'Agricultural & farm vehicle insurance' },
];

const highlights = [
  { icon: '🛡️', title: 'Legally Mandatory', desc: 'Third-party insurance is required by law for all vehicles in India.' },
  { icon: '💰', title: 'Save up to 70%', desc: 'Compare plans and get the best premium for your vehicle.' },
  { icon: '🔧', title: '16,000+ Cashless Garages', desc: 'Get repairs done without paying out of pocket.' },
  { icon: '⚡', title: 'Instant Policy', desc: 'Get your policy document in minutes, 100% online.' },
];

const VehicleFindPage: React.FC<VehicleFindPageProps> = ({ onBookCall }) => {
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', email: '', preferredTime: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return toast.error('Name and phone are required');
    setSubmitting(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/calls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, notes: selectedVehicle ? `Vehicle type: ${selectedVehicle}` : undefined }),
      });
      if (res.ok) {
        toast.success('Expert call booked! We will contact you shortly.');
        setForm({ name: '', phone: '', email: '', preferredTime: '' });
        setSelectedVehicle('');
      } else {
        toast.error('Failed to book. Please try again.');
      }
    } catch {
      toast.error('Server error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#f8faff', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', color: 'white', padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚗</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>
            Find the Best Vehicle Insurance
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, margin: 0 }}>
            Compare plans, understand coverage, and get expert guidance — all for free.
          </p>
        </div>
      </div>

      {/* Highlights */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {highlights.map(h => (
            <div key={h.title} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{h.icon}</div>
              <div style={{ fontWeight: 700, color: '#1f2937', marginBottom: '0.4rem' }}>{h.title}</div>
              <div style={{ fontSize: '0.88rem', color: '#6b7280', lineHeight: 1.5 }}>{h.desc}</div>
            </div>
          ))}
        </div>

        {/* Vehicle Type Selector */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem', textAlign: 'center' }}>
            What vehicle do you want to insure?
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Select your vehicle type to get tailored recommendations</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {vehicles.map(v => (
              <button
                key={v.label}
                onClick={() => setSelectedVehicle(v.label)}
                style={{
                  background: selectedVehicle === v.label ? '#2563eb' : 'white',
                  color: selectedVehicle === v.label ? 'white' : '#1f2937',
                  border: `2px solid ${selectedVehicle === v.label ? '#2563eb' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  padding: '1.25rem 1rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  boxShadow: selectedVehicle === v.label ? '0 4px 16px rgba(37,99,235,0.25)' : 'none',
                }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{v.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{v.label}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.75, lineHeight: 1.4 }}>{v.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Book Call Form */}
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb', overflow: 'hidden', marginBottom: '3rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', padding: '1.75rem 2rem', color: 'white' }}>
            <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 700 }}>📞 Book a Free Call with an Expert</h2>
            <p style={{ margin: '0.4rem 0 0', opacity: 0.85, fontSize: '0.95rem' }}>
              Our vehicle insurance advisors will help you pick the right plan in 15 minutes.
            </p>
          </div>
          <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Full Name *</label>
                <input
                  type="text" required placeholder="John Doe"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Phone Number *</label>
                <input
                  type="tel" required placeholder="+91 98765 43210"
                  value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Email Address</label>
                <input
                  type="email" placeholder="john@example.com"
                  value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Preferred Time</label>
                <select
                  value={form.preferredTime} onChange={e => setForm({ ...form, preferredTime: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none', fontSize: '0.95rem', background: 'white', boxSizing: 'border-box' }}
                >
                  <option value="">Select a time</option>
                  <option value="morning">Morning (9AM – 12PM)</option>
                  <option value="afternoon">Afternoon (12PM – 4PM)</option>
                  <option value="evening">Evening (4PM – 7PM)</option>
                </select>
              </div>
            </div>
            {selectedVehicle && (
              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.9rem', color: '#1d4ed8' }}>
                🚗 Selected vehicle type: <strong>{selectedVehicle}</strong>
              </div>
            )}
            <button
              type="submit" disabled={submitting}
              style={{ padding: '0.9rem', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '1rem', cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1, transition: 'all 0.2s' }}
            >
              {submitting ? 'Booking...' : '📞 Book Free Expert Call'}
            </button>
            <p style={{ margin: 0, textAlign: 'center', fontSize: '0.8rem', color: '#9ca3af' }}>
              Free consultation · No spam · Our experts call within 2 hours
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleFindPage;
