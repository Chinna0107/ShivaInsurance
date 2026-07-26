import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './CtaBanner.css';

gsap.registerPlugin(ScrollTrigger);

interface CtaBannerProps {
  onBookCall?: () => void;
}

const CtaBanner: React.FC<CtaBannerProps> = ({ onBookCall }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.cta-banner', 
      { scale: 0.95, y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'back.out(1.2)'
      }
    );
  }, { scope: containerRef });

  return (
    <section className="cta-banner-section" ref={containerRef}>
      <div className="container">
        <div className="cta-banner">
          <div className="cta-content">
            <h2 className="cta-title">Questions? Confused? Need Recommendations?</h2>
            <p className="cta-subtitle">
              Talk to our experts. Free 1-to-1 advice. No spam, no pushy sales.
            </p>
            <div className="cta-action">
              <button className="btn btn-primary cta-btn" onClick={onBookCall}>
                <span className="calendar-icon">📅</span>
                Book a consultation call for Free
              </button>
            </div>
          </div>
          <div className="cta-video-thumb">
            <img src="/claims_support.png" alt="Expert advisor" className="video-img" />
            <div className="play-button">▶</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
