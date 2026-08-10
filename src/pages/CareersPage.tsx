import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCallModal from '../components/BookCallModal';
import toast from 'react-hot-toast';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string;
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const typeColors: Record<string, { bg: string; text: string }> = {
  'Full-time':  { bg: '#dcfce7', text: '#166534' },
  'Part-time':  { bg: '#e0e7ff', text: '#3730a3' },
  'Internship': { bg: '#fef3c7', text: '#92400e' },
  'Remote':     { bg: '#dbeafe', text: '#1e40af' },
  'Contract':   { bg: '#fce7f3', text: '#9d174d' },
};

const CareersPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [filterDept, setFilterDept] = useState('All');
  const [applyForm, setApplyForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/careers?active=true`)
      .then(r => r.json())
      .then(data => { setJobs(data); if (data.length > 0) setActiveJob(data[0]); })
      .catch(() => toast.error('Failed to load jobs'))
      .finally(() => setLoading(false));
  }, []);

  const departments = ['All', ...Array.from(new Set(jobs.map(j => j.department)))];
  const filtered = filterDept === 'All' ? jobs : jobs.filter(j => j.department === filterDept);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyJob) return;
    setApplying(true);
    try {
      const res = await fetch(`${API}/api/careers/${applyJob.id}/apply`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applyForm),
      });
      if (!res.ok) throw new Error();
      toast.success('Application submitted! We\'ll be in touch soon.');
      setApplyJob(null);
      setApplyForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.error('Failed to submit. Please try again.');
    } finally { setApplying(false); }
  };

  return (
    <>
      <Header onBookCall={() => setBookCallOpen(true)} />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a3350 100%)', paddingTop: '100px', paddingBottom: '4rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem' }}>
          <span style={{ display: 'inline-block', background: 'rgba(46,159,104,0.15)', border: '1px solid rgba(46,159,104,0.4)', color: '#4ade80', padding: '0.3rem 1rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.25rem' }}>
            We're Hiring
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: 'white', marginBottom: '1rem', lineHeight: 1.15 }}>
            Build Your Career at<br /><span style={{ color: '#4ade80' }}>InsuranceShiva</span>
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7 }}>
            Join India's most trusted insurance advisory platform. Help millions of families make smarter financial decisions.
          </p>
        </div>
      </div>

      {/* Perks */}
      <div style={{ background: '#f9fafb', padding: '3rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          {[
            { icon: '🚀', title: 'Fast Growth', desc: 'Clear career paths and rapid promotions' },
            { icon: '💰', title: 'Great Pay', desc: 'Competitive salaries + performance bonuses' },
            { icon: '🏠', title: 'Flexible Work', desc: 'Remote & hybrid options available' },
            { icon: '🎓', title: 'Learning', desc: 'Certifications and training sponsored' },
          ].map(p => (
            <div key={p.title} style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{p.icon}</div>
              <div style={{ fontWeight: 700, color: '#1f2937', marginBottom: '0.35rem' }}>{p.title}</div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs Section */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1f2937', marginBottom: '0.5rem' }}>Open Positions</h2>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{jobs.length} position{jobs.length !== 1 ? 's' : ''} available</p>

        {/* Dept filter */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {departments.map(d => (
            <button key={d} onClick={() => setFilterDept(d)} style={{ padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', border: `1.5px solid ${filterDept === d ? '#2e9f68' : '#e5e7eb'}`, background: filterDept === d ? '#2e9f68' : 'white', color: filterDept === d ? 'white' : '#4b5563', transition: 'all 0.2s' }}>{d}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton-box" style={{ height: '90px', borderRadius: '12px' }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', color: '#9ca3af' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💼</div>
            <p>No open positions in this department right now. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
            {filtered.map(job => (
              <div key={job.id} onClick={() => setActiveJob(activeJob?.id === job.id ? null : job)}
                style={{ background: 'white', borderRadius: '12px', border: `2px solid ${activeJob?.id === job.id ? '#2e9f68' : '#e5e7eb'}`, padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: activeJob?.id === job.id ? '0 4px 20px rgba(46,159,104,0.15)' : '0 2px 8px rgba(0,0,0,0.04)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: '#1f2937' }}>{job.title}</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>🏢 {job.department}</span>
                      <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>📍 {job.location}</span>
                      {job.experience && <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>⏱ {job.experience}</span>}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, background: typeColors[job.type]?.bg || '#f3f4f6', color: typeColors[job.type]?.text || '#374151' }}>{job.type}</span>
                    <button onClick={e => { e.stopPropagation(); setApplyJob(job); }} style={{ padding: '0.5rem 1.25rem', background: '#2e9f68', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>Apply Now</button>
                  </div>
                </div>

                {activeJob?.id === job.id && (
                  <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid #f3f4f6' }}>
                    <p style={{ color: '#4b5563', lineHeight: 1.7, marginBottom: '1rem' }}>{job.description}</p>
                    {job.requirements && (
                      <>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>Requirements</h4>
                        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                          {job.requirements.split('\n').filter(r => r.trim()).map((r, i) => (
                            <li key={i} style={{ display: 'flex', gap: '0.5rem', color: '#4b5563', fontSize: '0.9rem' }}>
                              <span style={{ color: '#2e9f68', flexShrink: 0 }}>✓</span> {r}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {applyJob && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '14px', width: '100%', maxWidth: '480px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 0.25rem', color: '#1f2937' }}>Apply for</h2>
            <p style={{ margin: '0 0 1.5rem', color: '#2e9f68', fontWeight: 700, fontSize: '1.1rem' }}>{applyJob.title}</p>
            <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={lbl}>Full Name *</label>
                <input required value={applyForm.name} onChange={e => setApplyForm({ ...applyForm, name: e.target.value })} placeholder="Your name" style={inp} />
              </div>
              <div>
                <label style={lbl}>Email *</label>
                <input required type="email" value={applyForm.email} onChange={e => setApplyForm({ ...applyForm, email: e.target.value })} placeholder="you@example.com" style={inp} />
              </div>
              <div>
                <label style={lbl}>Phone *</label>
                <input required value={applyForm.phone} onChange={e => setApplyForm({ ...applyForm, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" style={inp} />
              </div>
              <div>
                <label style={lbl}>Why do you want to join? (Optional)</label>
                <textarea rows={3} value={applyForm.message} onChange={e => setApplyForm({ ...applyForm, message: e.target.value })} placeholder="Tell us a bit about yourself..." style={{ ...inp, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setApplyJob(null)} style={{ padding: '0.75rem 1.5rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', color: '#4b5563' }}>Cancel</button>
                <button type="submit" disabled={applying} style={{ padding: '0.75rem 1.5rem', background: '#2e9f68', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: applying ? 'not-allowed' : 'pointer', opacity: applying ? 0.7 : 1 }}>
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer onBookCall={() => setBookCallOpen(true)} />
      <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </>
  );
};

const lbl: React.CSSProperties = { display: 'block', marginBottom: '0.25rem', fontSize: '0.88rem', fontWeight: 500, color: '#4b5563' };
const inp: React.CSSProperties = { width: '100%', padding: '0.7rem 0.85rem', borderRadius: '6px', border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' };

export default CareersPage;
