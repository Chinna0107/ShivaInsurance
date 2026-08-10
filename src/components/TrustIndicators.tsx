import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './TrustIndicators.css';

gsap.registerPlugin(ScrollTrigger);

function useCountUp(target: number, duration = 2, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        gsap.to({ val: 0 }, {
          val: target, duration, ease: 'power2.out',
          onUpdate: function () {
            setCount(parseFloat(this.targets()[0].val.toFixed(decimals)));
          },
        });
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals]);
  return { count, ref };
}

const Stat: React.FC<{ target: number; suffix?: string; decimals?: number }> = ({ target, suffix = '', decimals = 0 }) => {
  const { count, ref } = useCountUp(target, 2, decimals);
  return <span ref={ref}>{decimals ? count.toFixed(decimals) : count.toLocaleString()}{suffix}</span>;
};

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
              <h3><Stat target={100} suffix="%" /> Neutral</h3>
              <p>Unbiased recommendations</p>
            </div>
          </div>
          <div className="trust-divider"></div>
          <div className="trust-item">
            <div className="trust-icon">⭐</div>
            <div className="trust-text">
              <h3><Stat target={4.9} suffix="/5" decimals={1} /> Rating</h3>
              <p>Checked by industry veterans</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
