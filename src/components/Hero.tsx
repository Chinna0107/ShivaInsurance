import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Hero.css';

interface HeroProps {
  onBookCall?: () => void;
  onGetQuote?: () => void;
}

const WORDS = [
  'Buy Insurance',
  'Protect Your Family',
  'Compare Plans',
  'File Claims Easily',
];

function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplayed(current.slice(0, charIdx + (deleting ? -1 : 1)));
      setCharIdx(i => i + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

const Hero: React.FC<HeroProps> = ({ onBookCall, onGetQuote }) => {
  const containerRef = useRef<HTMLElement>(null);
  const typed = useTypewriter(WORDS);
  const [reelUrl, setReelUrl] = useState('https://www.instagram.com/reel/DZMN0ptzWh5/embed/');
  const [reelOrigUrl, setReelOrigUrl] = useState('https://www.instagram.com/reel/DZMN0ptzWh5/');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/reels/active`)
      .then(r => r.json())
      .then(data => {
        if (data?.embed_url) setReelUrl(data.embed_url);
        if (data?.url) setReelOrigUrl(data.url);
      })
      .catch(() => {});
  }, []);

  useGSAP(() => {
    gsap.from('.hero-animate', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
    
    gsap.from('.hero-image-wrapper', {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  return (
    <section className="hero" ref={containerRef}>
      <style>{`@keyframes hero-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-badge hero-animate">
            <span className="hero-badge-dot"></span>
            Trusted by 50,000+ Indians
          </div>
          <h1 className="hero-title hero-animate">
            The Most Satisfying Way To{' '}
            <span style={{ color: 'var(--primary-color, #10b981)', whiteSpace: 'nowrap' }}>
              {typed}<span style={{ display: 'inline-block', width: '3px', height: '0.85em', background: 'var(--primary-color, #10b981)', marginLeft: '2px', verticalAlign: 'middle', animation: 'hero-blink 1s step-end infinite' }} />
            </span>
          </h1>
          <p className="hero-subtitle hero-animate">
            Unbiased advice. Transparent comparison. Smooth claims.
          </p>
          
          <div className="hero-rating hero-animate">
            <span className="stars">★★★★★</span>
            <span className="rating-text">4.9/5 on Google · 1200+ Reviews</span>
          </div>

          <div className="hero-actions hero-animate">
            <button className="btn btn-primary btn-lg" onClick={onGetQuote}>Check your premium</button>
            <button className="btn btn-outline btn-lg" onClick={onBookCall}>Talk to an expert</button>
          </div>
          
          <div className="hero-features hero-animate">
            <a href="#term" className="hero-feature-link">
              <span className="feature-icon">🛡️</span> Life Insurance
            </a>
            <a href="#health" className="hero-feature-link">
              <span className="feature-icon">❤️</span> Health Insurance
            </a>
            <a href="#group" className="hero-feature-link">
              <span className="feature-icon">👥</span> Group Insurance
            </a>
            <a href="#all" className="hero-feature-link">
              <span className="feature-icon">📋</span> All products
            </a>
          </div>
        </div>
        
        <div className="hero-image-wrapper">
          <div className="hero-floating-elements">
            <div className="node node-1"></div>
            <div className="node node-2"></div>
            <div className="node node-3"></div>
            <div className="node node-4"></div>
          </div>
          {/* Floating stat badges */}
          <div className="hero-stat-badge hero-stat-badge-1">
            <span className="stat-icon">🛡️</span>
            <div>
              <strong>₹1 Cr</strong>
              <small>Cover from ₹400/month</small>
            </div>
          </div>
          <div className="hero-stat-badge hero-stat-badge-2">
            <span className="stat-icon">⚡</span>
            <div>
              <strong>Fast Claims</strong>
              <small>Settled in 24 hrs</small>
            </div>
          </div>
          {/* Instagram Reel in phone frame */}
          <div className="hero-person-placeholder">
            <div className="reel-phone-frame">
              <div className="reel-phone-notch" />
              <div className="reel-embed-wrap" style={{ position: 'relative' }}>
                {/* Blurred preview iframe — non-interactive */}
                <iframe
                  src={reelUrl}
                  className="reel-iframe"
                  style={{ filter: 'blur(1px)', pointerEvents: 'none' }}
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                />
                {/* Overlay with play button */}
                <div
                  onClick={() => setModalOpen(true)}
                  style={{
                    position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    background: 'rgba(0,0,0,0.25)', borderRadius: '24px',
                  }}
                >
                  <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.95)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    transition: 'transform 0.2s',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#e1306c"><polygon points="5,3 19,12 5,21" /></svg>
                  </div>
                  <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.6rem', letterSpacing: '0.05em', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>TAP TO PLAY</span>
                </div>
              </div>
              <div className="reel-phone-home" />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen reel modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 9999, padding: '1rem',
          }}
        >
          <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            {/* Phone frame in modal */}
            <div style={{
              background: '#0f0f0f', borderRadius: '40px', padding: '14px 10px 20px',
              boxShadow: '0 0 0 2px #2a2a2a, 0 30px 80px rgba(0,0,0,0.6)',
            }}>
              <div style={{ width: '80px', height: '10px', background: '#1a1a1a', borderRadius: '999px', margin: '0 auto 10px' }} />
              <div style={{ width: '100%', aspectRatio: '9/16', borderRadius: '24px', overflow: 'hidden', background: '#000' }}>
                <iframe
                  src={reelUrl}
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div style={{ width: '36px', height: '5px', background: '#2a2a2a', borderRadius: '999px', margin: '10px auto 0' }} />
            </div>
            {/* Close + open in instagram */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', gap: '0.75rem' }}>
              <button
                onClick={() => setModalOpen(false)}
                style={{ flex: 1, padding: '0.65rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem' }}
              >
                ✕ Close
              </button>
              <a
                href={reelOrigUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, padding: '0.65rem', background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', textAlign: 'center', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Open in Instagram
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
