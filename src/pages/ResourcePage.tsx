import React from 'react';
import type { ResourcePageData } from '../data/pageContent';
import NeedHelpBanner from '../components/article/NeedHelpBanner';
import './Pages.css';

interface ResourcePageProps {
  data: ResourcePageData;
  onBookCall?: () => void;
}

const ResourcePage: React.FC<ResourcePageProps> = ({ data, onBookCall }) => {
  return (
    <div className="article-page resource-page">
      <div className="container">
        {/* Hero Area */}
        <div className="article-hero" style={{ marginBottom: '2rem' }}>
          <div className="breadcrumbs">
            <span>Home</span> &gt; <span>{data.category}</span> &gt; <span className="current">{data.title}</span>
          </div>
          
          <div className="article-tag">{data.type.toUpperCase()}</div>
          
          <h1 className="article-main-title">{data.title}</h1>
          <p className="article-subtitle-text">{data.subtitle}</p>
        </div>

        {/* Resources Grid */}
        <div className="resource-grid triple">
          {data.items.map((item, idx) => (
            <div className="resource-card" key={idx}>
              <div className="resource-card-img">
                <img src={item.image} alt={item.title} />
                <span className="resource-card-tag">{item.tag}</span>
              </div>
              <div className="resource-card-body">
                <h3 className="resource-card-title">{item.title}</h3>
                <p className="resource-card-desc">{item.description}</p>
                <div className="resource-card-footer">
                  <span>{item.readTime}</span>
                  {data.type === 'expert' ? (
                    <button className="resource-action-btn" onClick={onBookCall}>
                      Book Free Call &rarr;
                    </button>
                  ) : (
                    <span className="resource-action-btn" style={{ cursor: 'pointer' }}>
                      {data.type === 'videos' ? 'Watch Now' : 'Read Article'} &rarr;
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem' }}>
          <NeedHelpBanner onBookCall={onBookCall} />
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
