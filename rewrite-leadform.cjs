const fs = require('fs');
const content = `
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './LeadForm.css';

interface LeadFormProps {
  onComplete?: () => void;
  onStepChange?: (step: number) => void;
}

const LeadForm: React.FC<LeadFormProps> = ({ onComplete, onStepChange }) => {
  const [step, setStep] = useState(1);
  const [insuranceType, setInsuranceType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Health Specific State
  const [healthStep, setHealthStep] = useState(1);
  const [policyMode, setPolicyMode] = useState<'Family' | 'Individual'>('Individual');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [ages, setAges] = useState('');
  const [medicalConditions, setMedicalConditions] = useState<string[]>([]);
  const [otherDiseaseName, setOtherDiseaseName] = useState('');
  const [healthCover, setHealthCover] = useState('');
  const [smoker, setSmoker] = useState('');

  // Life & Vehicle Placeholders to prevent breaking
  const [lifeCover, setLifeCover] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  useEffect(() => {
    if (onStepChange) onStepChange(step);
  }, [step, onStepChange]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(\`\${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/leads\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: mobile,
          email,
          type: insuranceType.toLowerCase() || 'health',
          smoker,
          medicalHistory: medicalConditions.includes('Other Diseases') 
            ? [...medicalConditions.filter(c => c !== 'Other Diseases'), otherDiseaseName]
            : medicalConditions,
          specificPlan: healthCover,
          members: [policyMode, ages],
          date: new Date().toISOString().split('T')[0],
          lifeCover,
          vehicleNumber
        })
      });

      if (response.ok) {
        toast.success('Your application was submitted successfully!');
        sessionStorage.setItem('lead_submitted_token', 'true');
        if(onComplete) onComplete(); 
      } else {
        toast.error('Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderInsuranceSelection = () => (
    <div className="step-container" style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '2rem' }}>What type of insurance are you looking for?</h2>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <div className="insurance-card" onClick={() => { setInsuranceType('Health'); setStep(2); }} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px', cursor: 'pointer', width: '250px' }}>
          <h3>HEALTH INSURANCE</h3>
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.9rem' }}>Family / Individual<br/>Medical details<br/>Cover selection</p>
        </div>
        <div className="insurance-card" onClick={() => { setInsuranceType('Life'); setStep(2); }} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px', cursor: 'pointer', width: '250px' }}>
          <h3>LIFE INSURANCE</h3>
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.9rem' }}>Term / Savings / Market Linked<br/>Profile & income<br/>Cover selection</p>
        </div>
        <div className="insurance-card" onClick={() => { setInsuranceType('Vehicle'); setStep(2); }} style={{ padding: '2rem', border: '1px solid #eee', borderRadius: '12px', cursor: 'pointer', width: '250px' }}>
          <h3>VEHICLE INSURANCE</h3>
          <p style={{ color: '#666', marginTop: '0.5rem', fontSize: '0.9rem' }}>Vehicle details<br/>Eligibility<br/>Cover type</p>
        </div>
      </div>
    </div>
  );

  const renderHealthSteps = () => {
    return (
      <div className="step-container">
        <div className="progress-bar-container" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', fontSize: '0.85rem', color: '#666' }}>
          <span style={{ fontWeight: healthStep === 1 ? 'bold' : 'normal', color: healthStep === 1 ? '#000' : '#666' }}>1. Members</span>
          <span style={{ fontWeight: healthStep === 2 ? 'bold' : 'normal', color: healthStep === 2 ? '#000' : '#666' }}>2. Medical</span>
          <span style={{ fontWeight: healthStep === 3 ? 'bold' : 'normal', color: healthStep === 3 ? '#000' : '#666' }}>3. Cover</span>
          <span style={{ fontWeight: healthStep === 4 ? 'bold' : 'normal', color: healthStep === 4 ? '#000' : '#666' }}>4. Lifestyle</span>
          <span style={{ fontWeight: healthStep === 5 ? 'bold' : 'normal', color: healthStep === 5 ? '#000' : '#666' }}>5. Confirm</span>
        </div>

        {healthStep === 1 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Health Insurance - Family / Individual</h3>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              <button className={\`btn \${policyMode === 'Family' ? 'btn-primary' : 'btn-outline'}\`} onClick={() => setPolicyMode('Family')}>FAMILY</button>
              <button className={\`btn \${policyMode === 'Individual' ? 'btn-primary' : 'btn-outline'}\`} onClick={() => setPolicyMode('Individual')}>INDIVIDUAL</button>
            </div>
            <div className="form-group-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Proposer Name</label>
                <input type="text" placeholder="Enter / Select" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Email Address</label>
                <input type="email" placeholder="Enter / Select" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Mobile Number</label>
                <input type="tel" placeholder="Enter / Select" value={mobile} onChange={e => setMobile(e.target.value)} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Age / Family Members Ages</label>
                <input type="text" placeholder="Husband, Wife, Children, Father, Mother" value={ages} onChange={e => setAges(e.target.value)} />
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={() => setHealthStep(2)}>NEXT - MEDICAL DETAILS</button>
            </div>
          </div>
        )}

        {healthStep === 2 && (
          <div>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Medical Details</h3>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>For family cover, capture conditions member-wise (Member 1 to Member 8).</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {['Diabetes', 'Blood Pressure', 'Asthma', 'Cholesterol', 'Other Diseases', 'None of These'].map(condition => (
                <label key={condition} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f9f9f9', padding: '1rem', borderRadius: '8px', cursor: 'pointer', border: medicalConditions.includes(condition) ? '1px solid var(--primary-color)' : '1px solid transparent' }}>
                  <input 
                    type="checkbox" 
                    checked={medicalConditions.includes(condition)}
                    onChange={(e) => {
                      if(condition === 'None of These') {
                        setMedicalConditions(['None of These']);
                      } else {
                        const newArr = e.target.checked 
                          ? [...medicalConditions.filter(c => c !== 'None of These'), condition]
                          : medicalConditions.filter(c => c !== condition);
                        setMedicalConditions(newArr);
                      }
                    }} 
                  />
                  {condition}
                </label>
              ))}
            </div>

            {medicalConditions.includes('Other Diseases') && (
              <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto', marginBottom: '2rem' }}>
                <label>Disease Name</label>
                <input type="text" placeholder="If Other Diseases selected" value={otherDiseaseName} onChange={e => setOtherDiseaseName(e.target.value)} />
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setHealthStep(1)}>BACK</button>
              <button className="btn btn-primary" onClick={() => setHealthStep(3)}>NEXT - COVER AMOUNT</button>
            </div>
          </div>
        )}

        {healthStep === 3 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Choose Health Cover Amount</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}>
              {['5 Lakh', '10 Lakh', '15 Lakh', '20 Lakh', '25 Lakh', '50 Lakh', '1 Crore', '2 Crore', '3 Crore'].map(amount => (
                <button 
                  key={amount}
                  className={\`btn \${healthCover === amount ? 'btn-primary' : 'btn-outline'}\`}
                  style={{ width: '120px' }}
                  onClick={() => setHealthCover(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setHealthStep(2)}>BACK</button>
              <button className="btn btn-primary" onClick={() => setHealthStep(4)}>NEXT</button>
            </div>
          </div>
        )}

        {healthStep === 4 && (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Lifestyle Question</h3>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Do you smoke or chew tobacco?</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              <button className={\`btn \${smoker === 'Yes' ? 'btn-primary' : 'btn-outline'}\`} style={{ width: '100px' }} onClick={() => setSmoker('Yes')}>YES</button>
              <button className={\`btn \${smoker === 'No' ? 'btn-primary' : 'btn-outline'}\`} style={{ width: '100px' }} onClick={() => setSmoker('No')}>NO</button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setHealthStep(3)}>BACK</button>
              <button className="btn btn-primary" onClick={() => setHealthStep(5)}>REVIEW & CONFIRM</button>
            </div>
          </div>
        )}

        {healthStep === 5 && (
          <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Review & Confirm</h3>
            <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Mobile:</strong> {mobile}</p>
              <p><strong>Mode:</strong> {policyMode}</p>
              <p><strong>Ages:</strong> {ages}</p>
              <p><strong>Cover:</strong> {healthCover}</p>
              <p><strong>Smoker:</strong> {smoker}</p>
              <p><strong>Conditions:</strong> {medicalConditions.join(', ') || 'None'}</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setHealthStep(4)}>BACK</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : 'CONFIRM & SUBMIT'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOtherSteps = () => (
    <div className="step-container" style={{ textAlign: 'center' }}>
      <h3 style={{ marginBottom: '2rem' }}>{insuranceType} Insurance Application</h3>
      <p style={{ color: '#666', marginBottom: '2rem' }}>This flow is under construction. Let's submit your basic info.</p>
      
      <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto 1rem', textAlign: 'left' }}>
        <label>Name</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto 1rem', textAlign: 'left' }}>
        <label>Mobile</label>
        <input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} />
      </div>
      <div className="form-group" style={{ maxWidth: '400px', margin: '0 auto 2rem', textAlign: 'left' }}>
        <label>Email</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <button className="btn btn-outline" onClick={() => setStep(1)}>BACK</button>
        <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>SUBMIT</button>
      </div>
    </div>
  );

  return (
    <div className="lead-form-wrapper">
      {step === 1 && renderInsuranceSelection()}
      {step === 2 && insuranceType === 'Health' && renderHealthSteps()}
      {step === 2 && (insuranceType === 'Life' || insuranceType === 'Vehicle') && renderOtherSteps()}
    </div>
  );
};

export default LeadForm;
`;
fs.writeFileSync('src/components/LeadForm.tsx', content, 'utf8');
console.log('LeadForm.tsx rewritten');
