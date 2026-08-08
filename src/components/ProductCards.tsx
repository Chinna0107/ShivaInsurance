import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ProductCards.css';

gsap.registerPlugin(ScrollTrigger);

interface ProductCardsProps {
  onViewHealthPlans?: () => void;
  onViewTermPlans?: () => void;
  onViewVehiclePlans?: () => void;
  onLearnMore?: () => void;
  onLearnMoreVehicle?: () => void;
}

const products = [
  {
    id: 'health',
    title: 'Health Insurance',
    description: 'Find the best mediclaim policy for you and your family.',
    icon: '❤️',
    color: '#fee2e2',
    image: '/health_insurance.png',
    tag: 'Most Popular'
  },
  {
    id: 'term',
    title: 'Term Life Insurance',
    description: 'Secure your family\'s future with pure protection plans.',
    icon: '☂️',
    color: '#e0e7ff',
    image: '/term_insurance.png',
    tag: 'Best Value'
  },
  {
    id: 'vehicle',
    title: 'Vehicle Insurance',
    description: 'Protect your car or bike with the right motor insurance plan.',
    icon: '🚗',
    color: '#fef3c7',
    image: '/plans_compare.png',
    tag: 'Smart Choice'
  }
];

const ProductCards: React.FC<ProductCardsProps> = ({ onViewHealthPlans, onViewTermPlans, onViewVehiclePlans, onLearnMore, onLearnMoreVehicle }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.section-header-animate', 
      { y: 30, opacity: 0 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out'
      }
    );

    gsap.fromTo('.product-card', 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: {
          trigger: '.cards-grid',
          start: 'top 85%',
        },
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );
  }, { scope: containerRef });

  return (
    <section className="product-cards-section" ref={containerRef}>
      <div className="container">
        <div className="section-header section-header-animate">
          <h2>Explore Insurance Categories</h2>
          <p>Compare features, read reviews, and make the right choice.</p>
        </div>
        
        <div className="cards-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-card-image">
                <img src={product.image} alt={product.title} />
                <span className="product-tag" style={{ backgroundColor: product.color, color: '#374151' }}>{product.tag}</span>
              </div>
              <div className="product-card-body">
                <div className="product-icon-wrapper" style={{ backgroundColor: product.color }}>
                  <span className="product-icon">{product.icon}</span>
                </div>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-actions">
                  <button className="btn btn-outline product-btn" onClick={
                    product.id === 'health' ? onViewHealthPlans :
                    product.id === 'term' ? onViewTermPlans :
                    onViewVehiclePlans
                  }>View Plans &rarr;</button>
                  <button className="btn btn-outline product-btn" onClick={
                    product.id === 'vehicle' ? onLearnMoreVehicle : onLearnMore
                  }>Learn More</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;
