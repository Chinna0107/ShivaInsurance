import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './TrustIndicators.css';

gsap.registerPlugin(ScrollTrigger);

const TrustIndicators: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.trust-item', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 90%',
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }, { scope: containerRef });

  return (
    <section className="trust-indicators" ref={containerRef}>
      <div className="container">
        <div className="trust-banner">
          <div className="trust-item">
            <div className="trust-icon">🛡️</div>
            <div className="trust-text">
              <h3>No Spam. Zero Calls.</h3>
              <p>We respect your privacy</p>
            </div>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <div className="trust-icon">💎</div>
            <div className="trust-text">
              <h3>100% Neutral</h3>
              <p>Unbiased recommendations</p>
            </div>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <div className="trust-icon">⭐</div>
            <div className="trust-text">
              <h3>Expert Verified</h3>
              <p>Checked by industry veterans</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
