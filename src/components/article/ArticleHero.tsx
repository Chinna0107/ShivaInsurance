import React from 'react';
import './ArticleHero.css';

interface ArticleHeroProps {
  topic?: string;
}

const ArticleHero: React.FC<ArticleHeroProps> = ({ topic = 'Term Insurance' }) => {
  return (
    <div className="article-hero">
      <div className="breadcrumbs">
        <span>Home</span> &gt; <span>{topic}</span> &gt; <span className="current">Know {topic}</span>
      </div>
      
      <div className="article-tag">Guide</div>
      
      <h1 className="article-main-title">
        The Ultimate Guide to Buying {topic} in India
      </h1>
      
      <div className="article-meta">
        <div className="authors">
          <div className="author">
            <img src="https://ui-avatars.com/api/?name=Mahavir+Chopra&background=0D8ABC&color=fff" alt="Mahavir Chopra" className="author-img" />
            <div className="author-info">
              <span className="author-name">Mahavir Chopra</span>
              <span className="author-role">Founder, InsuranceShiva</span>
            </div>
          </div>
          <div className="author">
            <img src="https://ui-avatars.com/api/?name=Shiva+Team&background=2e9f68&color=fff" alt="Shiva Team" className="author-img" />
            <div className="author-info">
              <span className="author-name">Shiva Editorial</span>
              <span className="author-role">Research Team</span>
            </div>
          </div>
        </div>
        
        <div className="article-stats">
          <div className="stat">
            <span className="stat-value">4.9 ★</span>
            <span className="stat-label">120+ Reviews</span>
          </div>
          <div className="stat">
            <span className="stat-value">15 min</span>
            <span className="stat-label">Read time</span>
          </div>
          <div className="stat">
            <span className="stat-value">Updated</span>
            <span className="stat-label">Oct 2023</span>
          </div>
        </div>
        
        <div className="social-share">
          <button className="share-btn twitter">𝕏</button>
          <button className="share-btn facebook">f</button>
          <button className="share-btn linkedin">in</button>
          <button className="share-btn whatsapp">💬</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleHero;
