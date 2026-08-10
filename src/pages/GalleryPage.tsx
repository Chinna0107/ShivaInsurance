import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCallModal from '../components/BookCallModal';

interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  caption: string | null;
}

const CATEGORIES = ['All', 'Success Story', 'Health Insurance', 'Life Insurance', 'Vehicle Insurance', 'Team', 'Events', 'Other'];

const catColors: Record<string, { bg: string; text: string }> = {
  'Success Story':     { bg: '#dcfce7', text: '#166534' },
  'Health Insurance':  { bg: '#fee2e2', text: '#991b1b' },
  'Life Insurance':    { bg: '#e0e7ff', text: '#3730a3' },
  'Vehicle Insurance': { bg: '#fef3c7', text: '#92400e' },
  'Team':              { bg: '#dbeafe', text: '#1e40af' },
  'Events':            { bg: '#fce7f3', text: '#9d174d' },
  'Other':             { bg: '#f3f4f6', text: '#374151' },
};

interface GalleryGridProps {
  embedded?: boolean;
  category?: string;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ embedded = false, category }) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(category || 'All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const url = new URL(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/gallery`);
    if (category) url.searchParams.set('category', category);
    fetch(url.toString())
      .then(r => r.json())
      .then(data => setItems(data))
      .catch(() => toast.error('Failed to load gallery'))
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = active === 'All' ? items : items.filter(i => i.category === active);

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-box" style={{ height: '200px', borderRadius: '12px' }} />
        ))}
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div>
      {/* Category tabs */}
      {!category && (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem', justifyContent: embedded ? 'flex-start' : 'center' }}>
          {CATEGORIES.filter(c => c === 'All' || items.some(i => i.category === c)).map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                border: `1.5px solid ${active === cat ? '#2e9f68' : '#e5e7eb'}`,
                background: active === cat ? '#2e9f68' : 'white',
                color: active === cat ? 'white' : '#4b5563',
                transition: 'all 0.2s',
              }}
            >{cat}</button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#9ca3af', padding: '3rem' }}>No images in this category yet.</p>
      ) : (
        <div style={{ columns: embedded ? '3 180px' : '4 200px', gap: '1rem' }}>
          {filtered.map(item => (
            <div
              key={item.id}
              onClick={() => setLightbox(item)}
              style={{ breakInside: 'avoid', marginBottom: '1rem', borderRadius: '12px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
            >
              <img src={item.image_url} alt={item.caption || item.category} style={{ width: '100%', display: 'block' }} />
              <div style={{ padding: '0.6rem 0.75rem', background: 'white' }}>
                <span style={{ display: 'inline-block', padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700, background: catColors[item.category]?.bg || '#f3f4f6', color: catColors[item.category]?.text || '#374151' }}>
                  {item.category}
                </span>
                {item.caption && <p style={{ margin: '0.35rem 0 0', fontSize: '0.82rem', color: '#4b5563', lineHeight: 1.4 }}>{item.caption}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 9999, cursor: 'zoom-out', padding: '1.5rem' }}
        >
          <img src={lightbox.image_url} alt={lightbox.caption || ''} style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '10px', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} />
          {lightbox.caption && (
            <p style={{ color: 'white', marginTop: '1rem', fontSize: '1rem', fontWeight: 500, textAlign: 'center', maxWidth: '600px' }}>{lightbox.caption}</p>
          )}
          <span style={{ display: 'inline-block', marginTop: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, background: catColors[lightbox.category]?.bg || '#f3f4f6', color: catColors[lightbox.category]?.text || '#374151' }}>
            {lightbox.category}
          </span>
          <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
        </div>
      )}
    </div>
  );
};

// Standalone page with Header + Footer
const GalleryPage: React.FC = () => {
  const [bookCallOpen, setBookCallOpen] = useState(false);

  return (
    <>
      <Header onBookCall={() => setBookCallOpen(true)} />
      <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingTop: '80px', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#1f2937', marginBottom: '0.5rem' }}>Our Gallery</h1>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>Real stories, real smiles — from our happy customers and team.</p>
          </div>
          <GalleryGrid />
        </div>
      </div>
      <Footer onBookCall={() => setBookCallOpen(true)} />
      <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </>
  );
};

export default GalleryPage;
