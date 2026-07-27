import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCallModal from '../components/BookCallModal';
import QuoteModal from '../components/QuoteModal';
import './PolicyDescription.css';

const PolicyDescription = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [policy, setPolicy] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${import.meta.env.VITE_API_URL || `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}`}/api/policies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Policy not found');
        return res.json();
      })
      .then(data => {
        let images = [];
        try {
          if (data.images) {
            images = typeof data.images === 'string' ? JSON.parse(data.images) : data.images;
          }
        } catch (e) {
          images = [];
        }
        setPolicy({ ...data, parsedImages: images });
        if (images.length > 0) setActiveImage(images[0]);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load policy details');
        navigate('/');
      });
  }, [id, navigate]);

  if (loading) {
    return <div style={{ padding: '8rem 2rem', textAlign: 'center', minHeight: '60vh' }}>Loading policy details...</div>;
  }

  const prosList = policy.pros ? policy.pros.split('\n').filter((p: string) => p.trim()) : [];
  const consList = policy.cons ? policy.cons.split('\n').filter((c: string) => c.trim()) : [];

  return (
    <>
      <Header onBookCall={() => setIsBookCallModalOpen(true)} />
      <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingTop: '80px', paddingBottom: '4rem' }}>
        <div className="policy-desc-container">
        <div style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#6b7280' }}>
          <span style={{ cursor: 'pointer', color: 'var(--primary-color)' }} onClick={() => navigate('/')}>Home</span>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ cursor: 'pointer', color: 'var(--primary-color)' }}>{policy.type} Insurance</span>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: '#374151', fontWeight: 500 }}>{policy.name}</span>
        </div>

        <div className="policy-desc-grid">
          <div className="policy-image-gallery">
            {policy.parsedImages && policy.parsedImages.length > 0 ? (
              <>
                <div 
                  className="policy-main-image" 
                  onClick={() => setIsImageModalOpen(true)}
                  style={{ cursor: 'zoom-in' }}
                >
                  <img src={activeImage!} alt={policy.name} />
                </div>
                <div className="policy-thumbnails">
                  {policy.parsedImages.map((img: string, idx: number) => (
                    <div 
                      key={idx} 
                      className="policy-thumb"
                      onClick={() => setActiveImage(img)}
                      style={{ 
                        border: activeImage === img ? '2px solid var(--primary-color)' : '1px solid #e5e7eb',
                        opacity: activeImage === img ? 1 : 0.6
                      }}
                    >
                      <img src={img} alt={`thumbnail ${idx}`} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="policy-main-image" style={{ color: '#9ca3af', border: '1px dashed #d1d5db' }}>
                No images available for this policy
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'inline-block', padding: '0.4rem 1rem', backgroundColor: policy.type === 'Health' ? '#ecfdf5' : '#eff6ff', color: policy.type === 'Health' ? '#059669' : '#2563eb', borderRadius: '2rem', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
              {policy.type} Insurance
            </div>
            
            <h1 style={{ fontSize: '2.5rem', color: '#1f2937', marginBottom: '0.5rem', lineHeight: 1.2 }}>{policy.name}</h1>
            <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '2rem' }}>Provided by <span style={{ fontWeight: 600, color: '#374151' }}>{policy.provider}</span></p>

            <div className="policy-actions-card">
              <div className="policy-cover-amount">
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Cover Amount</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.5rem', color: '#0f172a', fontWeight: 700 }}>{policy.cover_amount || 'Not Specified'}</p>
              </div>
              <div style={{ width: '1px', height: '40px', backgroundColor: '#cbd5e1' }} className="hidden-mobile"></div>
              <div className="policy-action-buttons">
                <button 
                  style={{ padding: '0.8rem 2rem', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(46, 159, 104, 0.3)' }}
                  onClick={() => setIsQuoteModalOpen(true)}
                >
                  Check Premium
                </button>
                <button 
                  style={{ padding: '0.8rem 2rem', backgroundColor: 'white', color: 'var(--primary-color)', border: '1px solid var(--primary-color)', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => setIsBookCallModalOpen(true)}
                >
                  Talk to Expert
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#1f2937', marginBottom: '1rem', borderBottom: '2px solid #e5e7eb', paddingBottom: '0.5rem' }}>Policy Overview</h3>
              <p style={{ fontSize: '1.05rem', color: '#4b5563', lineHeight: 1.6 }}>{policy.description || 'No detailed description available for this policy.'}</p>
            </div>

            <div className="policy-pros-cons">
              <div style={{ backgroundColor: '#f0fdf4', padding: '1.5rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', backgroundColor: '#22c55e', color: 'white', borderRadius: '50%', fontSize: '14px' }}>✓</span>
                  Key Advantages
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {prosList.length > 0 ? prosList.map((pro: string, i: number) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#166534', fontSize: '0.95rem' }}>
                      <span style={{ color: '#22c55e', marginTop: '2px', flexShrink: 0 }}>✓</span> {pro}
                    </li>
                  )) : <li style={{ color: '#166534', opacity: 0.7 }}>No advantages listed.</li>}
                </ul>
              </div>

              <div style={{ backgroundColor: '#fef2f2', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fecaca' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#991b1b', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', fontSize: '14px' }}>✗</span>
                  Things to Consider
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {consList.length > 0 ? consList.map((con: string, i: number) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#991b1b', fontSize: '0.95rem' }}>
                      <span style={{ color: '#ef4444', marginTop: '2px', flexShrink: 0 }}>✗</span> {con}
                    </li>
                  )) : <li style={{ color: '#991b1b', opacity: 0.7 }}>No considerations listed.</li>}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
      <BookCallModal 
        isOpen={isBookCallModalOpen} 
        onClose={() => setIsBookCallModalOpen(false)} 
      />
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        planName={policy?.name}
      />
      
      {isImageModalOpen && activeImage && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            cursor: 'zoom-out'
          }}
          onClick={() => setIsImageModalOpen(false)}
        >
          <img src={activeImage} alt="Enlarged policy view" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }} />
          <button 
            style={{ position: 'absolute', top: '20px', right: '30px', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
            onClick={(e) => { e.stopPropagation(); setIsImageModalOpen(false); }}
          >
            &times;
          </button>
        </div>
      )}
      <Footer onBookCall={() => setIsBookCallModalOpen(true)} />
    </>
  );
};

export default PolicyDescription;
