import React, { useState, useEffect } from 'react';
import { FiBriefcase, FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Internship, Remote
  experience: string;
  description: string;
  requirements: string;
  is_active: boolean;
  created_at: string;
}

const DEPARTMENTS = ['Sales', 'Technology', 'Operations', 'Marketing', 'Finance', 'HR', 'Customer Support'];
const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Remote', 'Contract'];

const emptyForm = {
  title: '', department: 'Sales', location: '', type: 'Full-time',
  experience: '', description: '', requirements: '', is_active: true,
};

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const CareersManager = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm });

  useEffect(() => { fetchJobs(); }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/careers`);
      setJobs(await res.json());
    } catch { toast.error('Failed to load jobs'); }
    finally { setLoading(false); }
  };

  const openModal = (job?: Job) => {
    if (job) {
      setEditing(job);
      setForm({ title: job.title, department: job.department, location: job.location, type: job.type, experience: job.experience, description: job.description, requirements: job.requirements, is_active: job.is_active });
    } else {
      setEditing(null);
      setForm({ ...emptyForm });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editing ? `${API}/api/careers/${editing.id}` : `${API}/api/careers`;
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      toast.success(editing ? 'Job updated' : 'Job created');
      setIsModalOpen(false);
      fetchJobs();
    } catch { toast.error('Operation failed'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this job posting?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API}/api/careers/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setJobs(prev => prev.filter(j => j.id !== id));
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
    finally { setDeletingId(null); }
  };

  const typeColors: Record<string, string> = {
    'Full-time': '#dcfce7', 'Part-time': '#e0e7ff', 'Internship': '#fef3c7',
    'Remote': '#dbeafe', 'Contract': '#fce7f3',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiBriefcase /> Careers Manager
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Manage job postings shown on the Careers page.</p>
        </div>
        <button onClick={() => openModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: 'var(--primary-color, #2e9f68)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
          <FiPlus /> Add Job
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {['Job Title', 'Department', 'Location', 'Type', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '1rem 1.25rem', textAlign: h === 'Actions' ? 'right' : 'left', fontSize: '0.8rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} style={{ padding: '1rem 1.25rem' }}><div className="skeleton-box" style={{ height: '18px', width: j === 5 ? '60px' : '100px', marginLeft: j === 5 ? 'auto' : 0 }} /></td>
                  ))}
                </tr>
              ))
            ) : jobs.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>No jobs posted yet. Click "Add Job" to create one.</td></tr>
            ) : jobs.map(job => (
              <tr key={job.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ fontWeight: 600, color: '#1f2937' }}>{job.title}</div>
                  <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginTop: '2px' }}>{job.experience}</div>
                </td>
                <td style={{ padding: '1rem 1.25rem', color: '#4b5563' }}>{job.department}</td>
                <td style={{ padding: '1rem 1.25rem', color: '#4b5563' }}>{job.location}</td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span style={{ padding: '0.2rem 0.7rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, background: typeColors[job.type] || '#f3f4f6', color: '#374151' }}>{job.type}</span>
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span style={{ padding: '0.2rem 0.7rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600, background: job.is_active ? '#dcfce7' : '#fee2e2', color: job.is_active ? '#166534' : '#991b1b' }}>
                    {job.is_active ? 'Active' : 'Closed'}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => openModal(job)} style={{ padding: '0.45rem', border: '1px solid #e5e7eb', borderRadius: '6px', background: 'white', color: '#4b5563', cursor: 'pointer' }}><FiEdit2 size={15} /></button>
                    <button onClick={() => handleDelete(job.id)} disabled={deletingId === job.id} style={{ padding: '0.45rem', border: '1px solid #fee2e2', borderRadius: '6px', background: '#fef2f2', color: '#ef4444', cursor: 'pointer', opacity: deletingId === job.id ? 0.5 : 1 }}>
                      <FiTrash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '560px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 1.5rem', color: '#1f2937' }}>{editing ? 'Edit Job' : 'Add New Job'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

              <div>
                <label style={lbl}>Job Title *</label>
                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Insurance Sales Executive" style={inp} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={lbl}>Department *</label>
                  <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} style={inp}>
                    {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Job Type *</label>
                  <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} style={inp}>
                    {JOB_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={lbl}>Location *</label>
                  <input required value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Kadapa / Remote" style={inp} />
                </div>
                <div>
                  <label style={lbl}>Experience</label>
                  <input value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} placeholder="e.g. 1-3 years" style={inp} />
                </div>
              </div>

              <div>
                <label style={lbl}>Job Description *</label>
                <textarea required rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the role and responsibilities..." style={{ ...inp, resize: 'vertical' }} />
              </div>

              <div>
                <label style={lbl}>Requirements (one per line)</label>
                <textarea rows={4} value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} placeholder="Bachelor's degree&#10;Strong communication skills" style={{ ...inp, resize: 'vertical' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <input type="checkbox" id="is_active" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                <label htmlFor="is_active" style={{ fontSize: '0.9rem', color: '#4b5563', cursor: 'pointer' }}>Active (visible on Careers page)</label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '0.75rem 1.5rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', color: '#4b5563' }}>Cancel</button>
                <button type="submit" disabled={submitting} style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-color, #2e9f68)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Saving...' : editing ? 'Update Job' : 'Post Job'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const lbl: React.CSSProperties = { display: 'block', marginBottom: '0.25rem', fontSize: '0.88rem', fontWeight: 500, color: '#4b5563' };
const inp: React.CSSProperties = { width: '100%', padding: '0.7rem 0.85rem', borderRadius: '6px', border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.9rem', background: 'white', boxSizing: 'border-box' };

export default CareersManager;
