import React from 'react';
import './NeedHelpBanner.css';

interface NeedHelpBannerProps {
  onBookCall?: () => void;
}

const NeedHelpBanner: React.FC<NeedHelpBannerProps> = ({ onBookCall }) => {
  return (
    <div className="need-help-banner">
      <div className="help-content">
        <h3>Still confused about which plan to buy?</h3>
        <p>Talk to our advisors. They will help you find the right insurance without spamming your inbox.</p>
        <button className="btn btn-purple" onClick={onBookCall}>Book a Free Call</button>
      </div>
      <div className="help-illustration">
        <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Consultation" />
      </div>
    </div>
  );
};

export default NeedHelpBanner;
