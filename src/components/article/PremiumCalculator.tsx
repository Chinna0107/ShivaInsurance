import React from 'react';
import './PremiumCalculator.css';

interface PremiumCalculatorProps {
  onGetQuote?: () => void;
}

const PremiumCalculator: React.FC<PremiumCalculatorProps> = ({ onGetQuote }) => {
  return (
    <div className="premium-calc-box">
      <div className="calc-header">
        <h3>Find the best plan for you</h3>
        <p>Get unbiased advice from our experts</p>
      </div>
      <div className="calc-form">
        <div className="form-group">
          <label>Your Age</label>
          <select>
            <option>25 Years</option>
            <option>30 Years</option>
            <option>35 Years</option>
          </select>
        </div>
        <div className="form-group">
          <label>Cover Amount</label>
          <select>
            <option>1 Crore</option>
            <option>2 Crore</option>
          </select>
        </div>
        <div className="form-group">
          <label>Gender</label>
          <div className="gender-toggle">
            <button className="active">Male</button>
            <button>Female</button>
          </div>
        </div>
        <button className="btn btn-purple check-premium-btn" onClick={onGetQuote}>Check Premium</button>
      </div>
    </div>
  );
};

export default PremiumCalculator;
