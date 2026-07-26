import React, { useState } from 'react';
import './FAQ.css';

const faqs = [
  { question: 'What is InsuranceShiva?', answer: 'InsuranceShiva is an independent, unbiased insurance platform that helps you find the right insurance through expert advice and community insights, without taking any commissions.' },
  { question: 'Do you sell insurance?', answer: 'No, we do not sell insurance directly, which allows us to remain 100% neutral. We help you choose the best plan and guide you to the official provider to purchase.' },
  { question: 'How do you make money?', answer: 'We offer premium advisory services for users who need personalized 1-on-1 guidance, and we have a subscription model for our detailed research reports.' },
  { question: 'Is my data safe with you?', answer: 'Yes. Unlike aggregator sites, we will never sell your phone number to agents. You will never receive spam calls from us.' },
  { question: 'Can you help with claims?', answer: 'Absolutely. Our premium members get dedicated support during the claims process to ensure a smooth settlement.' }
];

interface FAQProps {
  onBookCall?: () => void;
}

const FAQ: React.FC<FAQProps> = ({ onBookCall }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <h2 className="section-title text-center">Frequently Asked Questions</h2>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div className={`faq-item ${openIndex === index ? 'open' : ''}`} key={index}>
              <button 
                className="faq-question" 
                onClick={() => toggleAccordion(index)}
                aria-expanded={openIndex === index}
              >
                {faq.question}
                <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center" style={{ marginTop: '2rem' }}>
          <button className="btn btn-outline" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary-hover)', border: 'none' }} onClick={onBookCall}>
            Ask an Expert
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
