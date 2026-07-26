import React from 'react';
import './TableOfContents.css';

const TableOfContents: React.FC = () => {
  return (
    <div className="toc-sidebar">
      <h3 className="toc-title">In this article</h3>
      <ul className="toc-list">
        <li className="toc-item active"><a href="#what-is">What is Health Insurance?</a></li>
        <li className="toc-item"><a href="#why-need">Why do you need Health Insurance?</a></li>
        <li className="toc-item"><a href="#types">Types of Health Insurance Plans</a></li>
        <li className="toc-item"><a href="#coverage">What does it cover?</a></li>
        <li className="toc-item"><a href="#exclusions">What is not covered?</a></li>
        <li className="toc-item"><a href="#how-to-choose">How to choose the right plan</a></li>
        <li className="toc-item"><a href="#faq">Frequently Asked Questions</a></li>
      </ul>
    </div>
  );
};

export default TableOfContents;
