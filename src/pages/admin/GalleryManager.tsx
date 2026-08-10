import React, { useState, useEffect } from 'react';
import { FiImage, FiPlus, FiTrash2, FiFilter } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  caption: string | null;
  created_at: string;
}

const CATEGORIES = ['Success Story', 'Health Insurance', 'Life Insurance', 'Vehicle Insurance', 'Team', 'Events', 'Other'];

const GalleryManager = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const [form, setForm] = useState({ category: 'Success Story', caption: '' });
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/gallery`);
      setItems(await res.json());
    } catch { toast.error('Failed to load gallery'); }
    finally { setLoading(false); }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setPreviews(selected.map(f => URL.createObjectURL(f)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.length) return toast.error('Please select at least one image');
    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('category', form.category);
      data.append('caption', form.caption);
      files.forEach(f => data.append('images', f));
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/gallery`, { method: 'POST', body: data });
      if (!res.ok) throw new Error();
      toast.success('Images uploaded successfully');
      setIsModalOpen(false);
      setFiles([]); setPreviews([]); setForm({ category: 'Success Story', caption: '' });
      fetchItems();
    } catch { toast.error('Upload failed'); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this image?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/gallery/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success('Deleted');
    } catch { toast.error('Delete failed'); }
    finally { setDeletingId(null); }
  };

  const filtered = filterCat === 'All' ? items : items.filter(i => i.category === filterCat);

  const catColors: Record<string, string> = {
    'Success Story': '#dcfce7',
    'Health Insurance': '#fee2e2',
    'Life Insurance': '#e0e7ff',
    'Vehicle Insurance': '#fef3c7',
    'Team': '#dbeafe',
    'Events': '#fce7f3',
    'Other': '#f3f4f6',
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiImage /> Gallery Manager
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.25rem' }}>Upload and manage success stories and event photos.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: 'var(--primary-color, #2e9f68)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
        >
          <FiPlus /> Upload Images
        </button>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
        <FiFilter color="#6b7280" />
        {['All', ...CATEGORIES].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCat(cat)}
            style={{
              padding: '0.35rem 0.9rem', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
              border: `1.5px solid ${filterCat === cat ? 'var(--primary-color, #2e9f68)' : '#e5e7eb'}`,
              background: filterCat === cat ? 'var(--primary-color, #2e9f68)' : 'white',
              color: filterCat === cat ? 'white' : '#4b5563',
            }}
          >{cat}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#9ca3af' }}>{filtered.length} image{filtered.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton-box" style={{ height: '180px', borderRadius: '12px' }} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem', color: '#9ca3af' }}>
          <FiImage size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
          <p>No images in this category yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {filtered.map(item => (
            <div key={item.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', background: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer' }}
              onClick={() => setLightbox(item.image_url)}
            >
              <img src={item.image_url} alt={item.caption || item.category} style={{ width: '100%', height: '180px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '0.6rem 0.75rem' }}>
                <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, background: catColors[item.category] || '#f3f4f6', color: '#374151' }}>
                  {item.category}
                </span>
                {item.caption && <p style={{ margin: '0.4rem 0 0', fontSize: '0.8rem', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.caption}</p>}
              </div>
              <button
                onClick={e => { e.stopPropagation(); handleDelete(item.id); }}
                disabled={deletingId === item.id}
                style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(239,68,68,0.9)', border: 'none', borderRadius: '6px', padding: '0.35rem', cursor: 'pointer', color: 'white', display: 'flex' }}
              >
                <FiTrash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '12px', width: '100%', maxWidth: '480px', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ margin: '0 0 1.5rem', color: '#1f2937' }}>Upload Gallery Images</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: 500, color: '#4b5563' }}>Category *</label>
                <select
                  value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb', outline: 'none', background: 'white' }}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: 500, color: '#4b5563' }}>Caption (Optional)</label>
                <input
                  type="text" placeholder="e.g. Claim settled in 3 days!"
                  value={form.caption} onChange={e => setForm({ ...form, caption: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: 500, color: '#4b5563' }}>Images * (multiple allowed)</label>
                <input type="file" multiple accept="image/*" onChange={handleFiles}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px dashed #e5e7eb' }}
                />
              </div>
              {previews.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: '0.5rem' }}>
                  {previews.map((p, i) => (
                    <img key={i} src={p} alt="" style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e5e7eb' }} />
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => { setIsModalOpen(false); setFiles([]); setPreviews([]); }}
                  style={{ padding: '0.75rem 1.5rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', color: '#4b5563' }}>
                  Cancel
                </button>
                <button type="submit" disabled={submitting}
                  style={{ padding: '0.75rem 1.5rem', background: 'var(--primary-color, #2e9f68)', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'Uploading...' : 'Upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, cursor: 'zoom-out' }}>
          <img src={lightbox} alt="" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} />
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
