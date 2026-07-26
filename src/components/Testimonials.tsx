import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

interface TestimonialsProps {
  onNavigate?: () => void;
}

const Testimonials: React.FC<TestimonialsProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.testi-text-animate', 
      { x: -50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      }
    );

    gsap.fromTo('.phone-mockup', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
      }
    );
  }, { scope: containerRef });

  return (
    <section className="testimonials-section" ref={containerRef}>
      <div className="container">
        <div className="testimonials-content">
          <div className="testimonials-left">
            <h2 className="section-title text-left testi-text-animate">What people think about InsuranceShiva</h2>
            <div className="ratings-grid testi-text-animate">
              <div className="rating-item">
                <span className="rating-score">4.9/5</span>
                <span className="rating-label">Google Ratings</span>
              </div>
              <div className="rating-item">
                <span className="rating-score">50K+</span>
                <span className="rating-label">Community</span>
              </div>
            </div>
            <div className="read-all-link" onClick={onNavigate}>
              Read all 1200+ reviews
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </div>
            <button className="btn btn-primary testi-text-animate" onClick={() => alert("Redirecting to Community WhatsApp/Telegram...")}>Join Community</button>
          </div>
          <div className="testimonials-right">
            {/* We simulate the screenshot graphic here */}
            <div className="graphic-container">
              <div className="phone-mockup">
                <div className="phone-logo">shiva</div>
                <div className="phone-circle">
                  <div className="inner-circle"></div>
                </div>
                <div className="phone-badges">
                  <span>👍 Reliable</span>
                  <span>⚡ Fast</span>
                </div>
              </div>
              
              <div className="floating-review review-1">
                <div className="reviewer-info">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Rohit" />
                  <div>
                    <strong>Rohit Sharma</strong>
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
                <p>Absolutely the best place to get unbiased advice. Loved it!</p>
              </div>

              <div className="floating-review review-2">
                <div className="reviewer-info">
                  <img src="https://i.pravatar.cc/150?img=5" alt="Priya" />
                  <div>
                    <strong>Priya M.</strong>
                    <span className="stars">★★★★★</span>
                  </div>
                </div>
                <p>Saved me from a bad policy. Highly recommended platform.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
