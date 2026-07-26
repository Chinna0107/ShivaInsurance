import React from 'react';
import type { InfoPageData } from '../data/pageContent';
import PremiumCalculator from '../components/article/PremiumCalculator';
import NeedHelpBanner from '../components/article/NeedHelpBanner';
import './Pages.css';

interface InfoPageProps {
  data: InfoPageData;
  onBookCall?: () => void;
  onGetQuote?: () => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ data, onBookCall, onGetQuote }) => {
  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="article-page info-page">
      <div className="container article-container">
        {/* Hero Section */}
        <div className="article-hero">
          <div className="breadcrumbs">
            <span>Home</span> &gt; <span>{data.category}</span> &gt; <span className="current">{data.title}</span>
          </div>
          
          <div className="article-tag">{data.tag}</div>
          
          <h1 className="article-main-title">{data.title}</h1>
          <p className="article-subtitle-text">{data.subtitle}</p>
          
          <div className="article-meta">
            <div className="authors">
              <div className="author">
                <img src="https://ui-avatars.com/api/?name=Shiva+Team&background=2e9f68&color=fff" alt="Shiva Team" className="author-img" />
                <div className="author-info">
                  <span className="author-name">Shiva Editorial</span>
                  <span className="author-role">Research Team</span>
                </div>
              </div>
            </div>
            
            <div className="article-stats">
              {data.keyStats.map((stat, i) => (
                <div className="stat" key={i}>
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
              <div className="stat">
                <span className="stat-value">{data.readTime}</span>
                <span className="stat-label">Read time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="article-layout">
          <aside className="article-sidebar">
            <div className="table-of-contents">
              <h4>Table of Contents</h4>
              <ul>
                {data.tocItems.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => handleScroll(item.id)} className="toc-btn">
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          
          <main className="article-body">
            <div className="article-main-content">
              {data.sections.map((section) => (
                <section id={section.id} className="content-section" key={section.id}>
                  <h2>{section.heading}</h2>
                  <p>{section.content}</p>
                  
                  {section.highlight && (
                    <div className="content-highlight">
                      <strong>💡 Pro Tip:</strong> {section.highlight}
                    </div>
                  )}

                  {section.bullets && (
                    <ul className="content-list check-list">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx}>
                          <strong>{bullet.label}:</strong> {bullet.desc}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}

              <div className="in-content-widget">
                <PremiumCalculator onGetQuote={onGetQuote} />
              </div>

              <NeedHelpBanner onBookCall={onBookCall} />

              {/* FAQs Section */}
              <section id="faq" className="content-section">
                <h2>Frequently Asked Questions</h2>
                <div className="article-faq">
                  {data.faqs.map((faq, idx) => (
                    <div className="faq-item" key={idx}>
                      <h4>{faq.q}</h4>
                      <p>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InfoPage;
