import React from 'react';
import './MediaMentions.css';

const MediaMentions: React.FC = () => {
  return (
    <section className="media-section">
      <div className="container text-center">
        <h2 className="section-title">Driving awareness through media, 200+ mentions!</h2>
        
        <div className="media-logos">
          <div className="logo-placeholder">BBC</div>
          <div className="logo-placeholder">ET</div>
          <div className="logo-placeholder">Mint</div>
          <div className="logo-placeholder">Google</div>
        </div>
        
        <div className="media-articles">
          <div className="article-card">
            <h4>BBC</h4>
            <p>"InsuranceShiva is bringing a much needed transparency to the opaque world of Indian insurance. It's an essential tool before buying any policy."</p>
          </div>
          <div className="article-card">
            <h4>Economic Times</h4>
            <p>"By removing the commission bias, this platform ensures that users finally get recommendations tailored to their actual needs, not agent profits."</p>
          </div>
          <div className="article-card">
            <h4>Mint</h4>
            <p>"The community driven aspect of InsuranceShiva sets it apart. Real people sharing real claim experiences is a game changer for buyers."</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaMentions;
