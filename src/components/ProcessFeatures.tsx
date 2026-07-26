import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ProcessFeatures.css';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: '01',
    title: 'Book a consultation. Free!',
    description: "Insurance terms and fine print can feel overwhelming. That's why we advise you to book a free consultation with our expert at a time that works for you.",
    color: 'var(--primary-light)',
    mockupImg: '/consultation.png'
  },
  {
    id: '02',
    title: 'Discover the Right Plan',
    description: 'With an expert by your side, answer a few quick questions about yourself and your family. Based on your needs and goals, the expert recommends you the most suitable plans with all their terms and conditions.',
    color: '#fdfaee',
    mockupImg: '/plans_compare.png'
  },
  {
    id: '03',
    title: 'Take Time & Discuss Again',
    description: 'Discuss the plan with your loved ones, and bring all your questions, concerns, and constraints to the expert in the second call. Your advisor will patiently guide you, simplify the jargon, and help you make the best choice.',
    color: '#fdeff2',
    mockupImg: '/health_insurance.png'
  },
  {
    id: '04',
    title: 'Buy and Stay Supported',
    description: "Once you buy your plan, our support doesn't stop there. Your InsuranceShiva Advisor will stand by you for life - guiding you one-on-one whenever you need to make a claim.",
    color: '#f3effe',
    mockupImg: '/claims_support.png'
  }
];

interface ProcessFeaturesProps {
  onNavigate?: () => void;
}

const ProcessFeatures: React.FC<ProcessFeaturesProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.section-title-animate', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });

    gsap.utils.toArray('.feature-card-animate').forEach((card: any) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out'
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section className="process-features" ref={containerRef}>
      <div className="container">
        <h2 className="section-title text-center section-title-animate">
          The Most Satisfying Way To Buy Insurance
        </h2>
        
        <div className="features-list">
          {features.map((feature) => (
            <div className="feature-card feature-card-animate" key={feature.id} style={{ backgroundColor: feature.color }}>
              <div className="feature-content">
                <span className="feature-number">{feature.id}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
                <button className="btn btn-primary" style={{ marginTop: '1.5rem', backgroundColor: '#10b981' }} onClick={onNavigate}>
                  Explore Feature <span style={{ marginLeft: '8px' }}>→</span>
                </button>
              </div>
              <div className="feature-mockup">
                <img src={feature.mockupImg} alt={feature.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessFeatures;
