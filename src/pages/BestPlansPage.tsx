import React, { useState, useEffect } from 'react';
import { bestPlansData } from '../data/pageContent';
import NeedHelpBanner from '../components/article/NeedHelpBanner';
import './Pages.css';

interface BestPlan {
  id: number;
  category: string;
  rank: number;
  name: string;
  badge: string;
  premium: string;
  cover: string;
  claim_ratio: string;
  highlight: string;
}

interface BestPlansPageProps {
  onBookCall?: () => void;
  onGetQuote?: (planName?: string) => void;
}

const BestPlansPage: React.FC<BestPlansPageProps> = ({ onBookCall, onGetQuote }) => {
  const [activeTab, setActiveTab] = useState<'term' | 'health' | 'savings'>('term');
  const [plans, setPlans] = useState<BestPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://shiva-be.vercel.app/api/best-plans?category=${activeTab}`);
        if (response.ok) {
          const data = await response.json();
          setPlans(data);
        }
      } catch (error) {
        console.error('Error fetching best plans:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, [activeTab]);

  return (
    <div className="article-page best-plans-page">
      <div className="container">
        {/* Header Hero */}
        <div className="article-hero" style={{ marginBottom: '2rem' }}>
          <div className="breadcrumbs">
            <span>Home</span> &gt; <span>Plans</span> &gt; <span className="current">Best Plans 2024</span>
          </div>
          
          <div className="article-tag">Curated Lists</div>
          
          <h1 className="article-main-title">{bestPlansData.title}</h1>
          <p className="article-subtitle-text">{bestPlansData.subtitle}</p>
        </div>

        {/* Tab Selection */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '1rem', 
            borderBottom: '2px solid var(--border-color)',
            marginBottom: '2rem'
          }}
        >
          {bestPlansData.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id as any)}
              style={{
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '700',
                color: activeTab === cat.id ? 'var(--primary-color)' : 'var(--text-gray)',
                borderBottom: activeTab === cat.id ? '3px solid var(--primary-color)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Plan Listings Table */}
        <div className="plans-table-container">
          <table className="plans-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Product Name</th>
                <th>Avg. Premium / Value</th>
                <th>Claim Metric / IRR</th>
                <th>Key Highlight</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                    Loading plans...
                  </td>
                </tr>
              ) : plans.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '3rem' }}>
                    No plans currently available in this category.
                  </td>
                </tr>
              ) : (
                plans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="plan-rank"># {plan.rank}</td>
                    <td className="plan-name-cell">
                      {plan.name}
                      {plan.badge && (
                        <span 
                          className="plan-badge" 
                          style={{ 
                            backgroundColor: plan.rank === 1 ? '#e6f6ed' : '#f3effe', 
                            color: plan.rank === 1 ? '#047857' : '#6b21a8' 
                          }}
                        >
                          {plan.badge}
                        </span>
                      )}
                    </td>
                    <td>{plan.premium}</td>
                    <td style={{ fontWeight: '700' }}>{plan.claim_ratio}</td>
                    <td style={{ color: 'var(--text-gray)' }}>{plan.highlight}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => onGetQuote && onGetQuote(plan.name)}>
                          Get Quote
                        </button>
                        <button className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={onBookCall}>
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '4rem' }}>
          <NeedHelpBanner onBookCall={onBookCall} />
        </div>
      </div>
    </div>
  );
};

export default BestPlansPage;
