const fs = require('fs');

let lf = fs.readFileSync('src/components/LeadForm.tsx', 'utf8');

// Inject icons
const iconsImport = `import { Shield, Heart, Car } from 'lucide-react';\n`;
lf = lf.replace("import './LeadForm.css';", "import './LeadForm.css';\n" + iconsImport);

// Replace the insurance selection cards to include icons
const cardsRegex = /<div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>([\s\S]*?)<\/div>\n    <\/div>/;

const newCards = `<div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div className="insurance-card" onClick={() => { setInsuranceType('Health'); setStep(2); }}>
          <div className="icon-wrapper">
            <Heart size={32} />
          </div>
          <h3>HEALTH INSURANCE</h3>
          <p>Family / Individual<br/>Medical details<br/>Cover selection</p>
        </div>
        <div className="insurance-card" onClick={() => { setInsuranceType('Life'); setStep(2); }}>
          <div className="icon-wrapper">
            <Shield size={32} />
          </div>
          <h3>LIFE INSURANCE</h3>
          <p>Term / Savings / Market Linked<br/>Profile & income<br/>Cover selection</p>
        </div>
        <div className="insurance-card" onClick={() => { setInsuranceType('Vehicle'); setStep(2); }}>
          <div className="icon-wrapper">
            <Car size={32} />
          </div>
          <h3>VEHICLE INSURANCE</h3>
          <p>Vehicle details<br/>Eligibility<br/>Cover type</p>
        </div>
      </div>
    </div>`;

lf = lf.replace(cardsRegex, newCards);

// Update medical condition labels to use the new class
lf = lf.replace(/<label key={condition} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px', cursor: 'pointer', border: medicalConditions\.includes\(condition\) \? '1px solid var\(--primary-color\)' : '1px solid transparent' }}>/g,
  '<label key={condition} className="medical-condition-label" style={{ border: medicalConditions.includes(condition) ? "1px solid #3b82f6" : "1px solid #e2e8f0" }}>'
);

fs.writeFileSync('src/components/LeadForm.tsx', lf, 'utf8');
console.log('LeadForm.tsx updated with icons and new classes');
