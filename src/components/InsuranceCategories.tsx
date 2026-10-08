import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InsuranceCategories.css';
import { FiShield, FiHeart, FiTruck, FiCheckCircle, FiChevronRight, FiArrowRight } from 'react-icons/fi';

const InsuranceCategories: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'LIFE INSURANCE',
      basePath: '/term-plans',
      icon: <FiShield className="category-icon life-icon" />,
      items: [
        'Term',
        'Savings',
        'Market Linked Plans'
      ],
      colorClass: 'life-category'
    },
    {
      title: 'HEALTH INSURANCE',
      basePath: '/health-plans',
      icon: <FiHeart className="category-icon health-icon" />,
      items: [
        'Family Floater',
        'Multi Individual',
        'Individual',
        'Maternity Plan'
      ],
      colorClass: 'health-category'
    },
    {
      title: 'VEHICLE INSURANCE',
      basePath: '/vehicle-plans',
      icon: <FiTruck className="category-icon vehicle-icon" />,
      items: [
        'Nil Dep',
        'Comprehensive / Full Insurance',
        'Third Party Insurance'
      ],
      colorClass: 'vehicle-category'
    }
  ];

  return (
    <section className="insurance-categories-section">
      <div className="categories-container">
        <div className="categories-header">
          <h2>Comprehensive Protection Plans</h2>
          <p>Explore our wide range of insurance products designed to secure every aspect of your life.</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((cat, index) => (
            <div key={index} className={`category-card ${cat.colorClass}`}>
              <div className="category-card-header">
                <div className="icon-wrapper">
                  {cat.icon}
                </div>
                <h3>{cat.title}</h3>
              </div>
              <ul className="category-list">
                {cat.items.map((item, i) => (
                  <li 
                    key={i} 
                    onClick={() => navigate(`${cat.basePath}?plan_type=${encodeURIComponent(item)}`)}
                    className="clickable-item"
                  >
                    <div className="item-left">
                      <FiCheckCircle className="list-icon" />
                      <span>{item}</span>
                    </div>
                    <FiChevronRight className="chevron-icon" />
                  </li>
                ))}
              </ul>
              
              <div 
                className="explore-all-btn"
                onClick={() => navigate(cat.basePath)}
              >
                <span>Explore All {cat.title.split(' ')[0]} Plans</span>
                <FiArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InsuranceCategories;
