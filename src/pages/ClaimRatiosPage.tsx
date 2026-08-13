import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NeedHelpBanner from '../components/article/NeedHelpBanner';
import './Pages.css';

interface ClaimRatio {
  id: string;
  category: string;
  company: string;
  story: string;
  image_url: string;
}

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const ClaimRatiosPage: React.FC = () => {
  const [claimRatios, setClaimRatios] = useState<ClaimRatio[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRatio, setSelectedRatio] = useState<ClaimRatio | null>(null);

  useEffect(() => {
    fetchClaimRatios();
  }, []);

  const fetchClaimRatios = async () => {
    try {
      const response = await fetch(`${API}/api/claim-ratios`);
      if (response.ok) {
        const data = await response.json();
        setClaimRatios(data);
      }
    } catch (error) {
      console.error('Failed to fetch claim ratios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (ratio: ClaimRatio) => {
    setSelectedRatio(ratio);
  };

  const closeModal = () => {
    setSelectedRatio(null);
  };

  return (
    <div className="page-wrapper">
      <Header />
      
      <main className="page-content">
        <section className="page-header" style={{ padding: '60px 0', backgroundColor: '#f9fafb', textAlign: 'center' }}>
          <div className="container">
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1f2937', marginBottom: '16px' }}>
              Claim <span style={{ color: '#f1592a' }}>Ratios & Stories</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '800px', margin: '0 auto' }}>
              Discover real claim settlement stories and performance ratios of top insurance providers. We stand by you during your claims.
            </p>
          </div>
        </section>

        <section className="claim-ratios-section" style={{ padding: '60px 0' }}>
          <div className="container">
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid #f3f3f3', borderTop: '3px solid #f1592a', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
              </div>
            ) : claimRatios.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#374151', marginBottom: '10px' }}>No claim stories available yet</h3>
                <p style={{ color: '#6b7280' }}>Check back later for real customer claim experiences.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                {claimRatios.map((ratio) => (
                  <div key={ratio.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease', display: 'flex', flexDirection: 'column' }}>
                    <div 
                      style={{ position: 'relative', height: '200px', backgroundColor: '#f3f4f6', cursor: 'pointer' }}
                      onClick={() => handleImageClick(ratio)}
                    >
                      {ratio.image_url ? (
                        <img src={ratio.image_url} alt={ratio.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e7eb', color: '#9ca3af' }}>
                          No Image
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: '16px', right: '16px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, color: '#f1592a', backdropFilter: 'blur(4px)' }}>
                        {ratio.category}
                      </div>
                    </div>
                    
                    <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 16px 0' }}>{ratio.company}</h3>
                      <p style={{ color: '#4b5563', lineHeight: 1.6, flex: 1, margin: 0, fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {ratio.story}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Modal for displaying story and image */}
        {selectedRatio && (
          <div 
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
            onClick={closeModal}
          >
            <div 
              style={{ backgroundColor: 'white', borderRadius: '12px', padding: '30px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={closeModal}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6b7280' }}
              >
                &times;
              </button>
              
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginBottom: '8px', paddingRight: '30px' }}>
                {selectedRatio.company}
              </h2>
              <div style={{ display: 'inline-block', backgroundColor: '#fff7ed', color: '#c2410c', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '20px' }}>
                {selectedRatio.category}
              </div>

              {/* Story displayed before image */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#374151', marginBottom: '12px' }}>Claim Story</h4>
                <p style={{ color: '#4b5563', lineHeight: 1.7, fontSize: '1rem', whiteSpace: 'pre-wrap' }}>
                  {selectedRatio.story}
                </p>
              </div>

              {selectedRatio.image_url && (
                <div style={{ borderRadius: '8px', overflow: 'hidden', marginTop: '20px' }}>
                  <img src={selectedRatio.image_url} alt={selectedRatio.company} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              )}
            </div>
          </div>
        )}

        <NeedHelpBanner />
      </main>

      <Footer />
    </div>
  );
};

export default ClaimRatiosPage;
