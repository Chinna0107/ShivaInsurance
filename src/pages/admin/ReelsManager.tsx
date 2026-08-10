import React, { useState, useEffect } from 'react';
import { FiInstagram, FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface Reel {
  id: string;
  url: string;
  label: string;
  is_active: boolean;
  created_at: string;
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function toEmbedUrl(url: string) {
  // Extract reel ID from any instagram reel URL format
  const match = url.match(/reel\/([A-Za-z0-9_-]+)/);
  return match ? `https://www.instagram.com/reel/${match[1]}/embed/` : '';
}

const ReelsManager = () => {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ url: '', label: '' });
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [preview, setPreview] = useState('');

  useEffect(() => { fetchReels(); }, []);

  const fetchReels = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/reels`);
      setReels(await res.json());
    } catch { toast.error('Failed to load reels'); }
    finally { setLoading(false); }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const embedUrl = toEmbedUrl(form.url);
    if (!embedUrl) return toast.error('Invalid Instagram reel URL');
    setAdding(true);
    try {
      const res = await fetch(`${API}/api/reels`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: form.url, label: form.label }),
      });
      if (!res.ok) throw new Error();
      toast.success('Reel added');
      setForm({ url: '', label: '' });
      setPreview('');
      fetchReels();
    } catch { toast.error('Failed to add reel'); }
    finally { setAdding(false); }
  };

  const handleSetActive = async (id: string) => {
    setActivatingId(id);
    try {
      const res = await fetch(`${API}/api/reels/${id}/activate`, { method: 'PUT' });
      if (!res.ok) throw new Error();
      toast.success('Active reel updated — hero section will now show this reel');
      fetchReels();
    } catch { toast.error('Failed to set active reel'); }
    finally { setActivatingId(null); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this reel?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API}/api/reels/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setReels(prev => prev.filter(r => r.id !== id));
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
    finally { setDeletingId(null); }
  };

  const handleUrlChange = (url: string) => {
    setForm(f => ({ ...f, url }));
    setPreview(toEmbedUrl(url));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <FiInstagram /> Instagram Reels
        </h1>
        <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Manage the Instagram reel shown in the home page hero section.</p>
      </div>

      {/* Add form + preview side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: preview ? '1fr 280px' : '1fr', gap: '1.5rem', marginBottom: '2rem', alignItems: 'start' }}>
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiPlus /> Add New Reel
          </h2>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={lbl}>Instagram Reel URL *</label>
              <input
                required
                value={form.url}
                onChange={e => handleUrlChange(e.target.value)}
                placeholder="https://www.instagram.com/reel/XXXXXXX/"
                style={inp}
              />
              {preview && (
                <p style={{ margin: '0.35rem 0 0', fontSize: '0.8rem', color: '#2e9f68' }}>
                  ✓ Valid reel URL detected
                </p>
              )}
            </div>
            <div>
              <label style={lbl}>Label (Optional)</label>
              <input
                value={form.label}
                onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                placeholder="e.g. June Campaign Reel"
                style={inp}
              />
            </div>
            <button
              type="submit"
              disabled={adding}
              style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', background: 'var(--primary-color, #2e9f68)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: adding ? 'not-allowed' : 'pointer', opacity: adding ? 0.7 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FiPlus /> {adding ? 'Adding...' : 'Add Reel'}
            </button>
          </form>
        </div>

        {/* Live preview */}
        {preview && (
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6b7280', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preview</p>
            <div style={{ background: '#0f0f0f', borderRadius: '28px', padding: '10px 8px 16px', boxShadow: '0 0 0 2px #2a2a2a, 0 20px 40px rgba(0,0,0,0.3)', display: 'inline-block' }}>
              <div style={{ width: '6px', height: '6px', background: '#2a2a2a', borderRadius: '50%', margin: '0 auto 8px' }} />
              <div style={{ width: '200px', aspectRatio: '9/16', borderRadius: '18px', overflow: 'hidden', background: '#000' }}>
                <iframe src={preview} style={{ width: '100%', height: '100%', border: 'none' }} allowTransparency allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" />
              </div>
              <div style={{ width: '28px', height: '4px', background: '#2a2a2a', borderRadius: '999px', margin: '8px auto 0' }} />
            </div>
          </div>
        )}
      </div>

      {/* Reels list */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>All Reels</h2>
          <span style={{ fontSize: '0.82rem', color: '#9ca3af' }}>{reels.length} reel{reels.length !== 1 ? 's' : ''}</span>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2].map(i => <div key={i} className="skeleton-box" style={{ height: '72px', borderRadius: '8px' }} />)}
          </div>
        ) : reels.length === 0 ? (
          <div style={{ padding: '4rem', textAlign: 'center', color: '#9ca3af' }}>
            <FiInstagram size={40} style={{ opacity: 0.3, marginBottom: '0.75rem', display: 'block', margin: '0 auto 0.75rem' }} />
            <p>No reels added yet. Add one above.</p>
          </div>
        ) : (
          <div>
            {reels.map(reel => (
              <div key={reel.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderBottom: '1px solid #f9fafb', background: reel.is_active ? 'rgba(46,159,104,0.04)' : 'white' }}>
                {/* Thumbnail */}
                <div style={{ width: '48px', height: '72px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#000', border: '1px solid #e5e7eb' }}>
                  <iframe src={toEmbedUrl(reel.url)} style={{ width: '300%', height: '300%', border: 'none', transform: 'scale(0.33)', transformOrigin: '0 0', pointerEvents: 'none' }} />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.9rem', marginBottom: '0.2rem' }}>
                    {reel.label || 'Untitled Reel'}
                    {reel.is_active && (
                      <span style={{ marginLeft: '0.5rem', padding: '0.15rem 0.6rem', background: '#dcfce7', color: '#166534', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>
                        ● Active
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#9ca3af', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{reel.url}</div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  {!reel.is_active && (
                    <button
                      onClick={() => handleSetActive(reel.id)}
                      disabled={activatingId === reel.id}
                      title="Set as active"
                      style={{ padding: '0.45rem 0.85rem', border: '1px solid #2e9f68', borderRadius: '6px', background: 'white', color: '#2e9f68', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem', opacity: activatingId === reel.id ? 0.5 : 1 }}
                    >
                      <FiCheck size={14} /> Set Active
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(reel.id)}
                    disabled={deletingId === reel.id}
                    style={{ padding: '0.45rem', border: '1px solid #fee2e2', borderRadius: '6px', background: '#fef2f2', color: '#ef4444', cursor: 'pointer', opacity: deletingId === reel.id ? 0.5 : 1 }}
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const lbl: React.CSSProperties = { display: 'block', marginBottom: '0.25rem', fontSize: '0.88rem', fontWeight: 500, color: '#4b5563' };
const inp: React.CSSProperties = { width: '100%', padding: '0.7rem 0.85rem', borderRadius: '6px', border: '1px solid #e5e7eb', outline: 'none', fontSize: '0.9rem', boxSizing: 'border-box' };

export default ReelsManager;
