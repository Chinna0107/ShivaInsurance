import React from 'react';
import PremiumCalculator from './PremiumCalculator';
import NeedHelpBanner from './NeedHelpBanner';
import './ArticleContent.css';

interface ArticleContentProps {
  onBookCall?: () => void;
  onGetQuote?: () => void;
  topic?: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ onBookCall, onGetQuote, topic = 'Term Insurance' }) => {
  return (
    <div className="article-main-content">
      <section id="what-is" className="content-section">
        <h2>What is {topic}?</h2>
        <p>
          {topic} is the purest and most cost-effective form of life insurance... company where you pay a regular premium, and in return, the insurer pays for your medical expenses if you fall ill or get injured. It is a financial safety net that ensures you don't burn through your savings during medical emergencies.
        </p>
        <div className="content-highlight">
          <strong>Key takeaway:</strong> Having health insurance is no longer a luxury; it is a necessity given the rising medical inflation in India.
        </div>
      </section>

      <section id="why-need" className="content-section">
        <h2>Why do you need Health Insurance?</h2>
        <p>Medical inflation in India is rising at double digits. A single hospitalization can cost anywhere from a few lakhs to over a crore. Here are the main reasons to buy health insurance:</p>
        <ul className="content-list">
          <li><strong>Financial Protection:</strong> Protects your hard-earned savings from being depleted by hospital bills.</li>
          <li><strong>Cashless Treatment:</strong> Get treated at network hospitals without worrying about arranging cash immediately.</li>
          <li><strong>Quality Healthcare:</strong> Afford the best medical facilities and doctors without compromising due to cost.</li>
          <li><strong>Tax Benefits:</strong> Save tax under Section 80D of the Income Tax Act.</li>
        </ul>
        <div className="in-content-widget">
          <PremiumCalculator onGetQuote={onGetQuote} planName={topic} />
        </div>
      </section>

      <section id="types" className="content-section">
        <h2>Types of Health Insurance Plans</h2>
        <div className="info-grid">
          <div className="info-card">
            <h4>Individual Health Insurance</h4>
            <p>Covers a single individual. The entire sum insured is available for that person alone.</p>
          </div>
          <div className="info-card">
            <h4>Family Floater Plan</h4>
            <p>Covers the entire family under a single sum insured. Any family member can use the cover.</p>
          </div>
          <div className="info-card">
            <h4>Senior Citizen Plan</h4>
            <p>Designed specifically for people above 60 years of age, catering to their specific medical needs.</p>
          </div>
          <div className="info-card">
            <h4>Critical Illness Cover</h4>
            <p>Pays a lump sum amount upon diagnosis of specific critical illnesses like cancer or heart attack.</p>
          </div>
        </div>
      </section>

      <NeedHelpBanner onBookCall={onBookCall} />

      <section id="coverage" className="content-section">
        <h2>What does it cover?</h2>
        <p>A comprehensive health insurance policy usually covers the following:</p>
        <ul className="content-list check-list">
          <li>In-patient hospitalization (room rent, ICU, doctor fees, nursing charges)</li>
          <li>Pre and post-hospitalization expenses (30-60 days before and 60-90 days after)</li>
          <li>Daycare procedures (surgeries that take less than 24 hours, like cataract)</li>
          <li>Ambulance charges</li>
          <li>Domiciliary treatment (treatment taken at home under medical supervision)</li>
          <li>Annual health check-ups</li>
        </ul>
        <div className="chart-placeholder">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Coverage Data" />
          <p className="caption">Typical utilization of health insurance coverage</p>
        </div>
      </section>

      <section id="faq" className="content-section">
        <h2>Frequently Asked Questions</h2>
        <div className="article-faq">
          <div className="faq-item">
            <h4>Is a medical test required before buying a policy?</h4>
            <p>It depends on your age and the sum insured. Many insurers waive off medical tests for individuals below 45 years of age.</p>
          </div>
          <div className="faq-item">
            <h4>What is a waiting period?</h4>
            <p>It is the time you have to wait before certain diseases or conditions are covered. Pre-existing diseases usually have a waiting period of 2-4 years.</p>
          </div>
          <div className="faq-item">
            <h4>Can I increase my sum insured later?</h4>
            <p>Yes, you can request an increase in your sum insured at the time of policy renewal, subject to the insurer's underwriting guidelines.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleContent;
