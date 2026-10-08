const fs = require('fs');
let css = fs.readFileSync('src/components/LeadForm.css', 'utf8');

const newCSS = `
/* REQUIRED LABELS */
label.required::after {
  content: ' *';
  color: #ef4444;
  font-weight: bold;
}

/* INPUT ICONS */
.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #94a3b8;
  pointer-events: none;
  z-index: 10;
}

/* CIRCULAR CORNERS & MODERN INPUTS */
.form-group input, .form-group select {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem !important; /* Left padding for icons */
  border: 2px solid #e2e8f0;
  border-radius: 99px !important;
  font-size: 0.95rem;
  color: #1e293b;
  transition: all 0.3s ease;
  background: #f8fafc;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);
}

.form-group input:focus, .form-group select:focus {
  outline: none;
  border-color: #3b82f6;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
}

.btn {
  border-radius: 99px !important;
  padding: 0.875rem 2.25rem !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem !important;
}

.btn-outline {
  border: 2px solid #cbd5e1 !important;
  background: transparent;
}

.btn-outline:hover {
  background: #f1f5f9;
  border-color: #94a3b8 !important;
}

/* Remove default appearance for select to let the icon show cleanly */
.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 1.25rem top 50%;
  background-size: 0.65rem auto;
}
`;

// Replace existing .form-group input styles to avoid conflicts
css = css.replace(/\.form-group input, \.form-group select \{[\s\S]*?\}/g, '');
css = css.replace(/\.form-group input:focus, \.form-group select:focus \{[\s\S]*?\}/g, '');
css = css.replace(/\.btn \{[\s\S]*?\}/g, '');
css = css.replace(/\.btn-outline \{[\s\S]*?\}/g, '');
css = css.replace(/\.btn-outline:hover \{[\s\S]*?\}/g, '');

css += newCSS;
fs.writeFileSync('src/components/LeadForm.css', css, 'utf8');
console.log('CSS updated for circular icons.');
