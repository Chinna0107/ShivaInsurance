import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './LeadForm.css';

interface LeadFormProps {
  onComplete?: () => void;
  onStepChange?: (step: number) => void;
}

function getInitialState<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(`leadform_${key}`);
    return saved !== null ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

const LeadForm: React.FC<LeadFormProps> = ({ onComplete, onStepChange }) => {
  const [gender, setGender] = useState<'Male' | 'Female'>(getInitialState('gender', 'Male'));
  const [name, setName] = useState(getInitialState('name', ''));
  const [email, setEmail] = useState(getInitialState('email', ''));
  const [dob, setDob] = useState(getInitialState('dob', ''));
  const [mobile, setMobile] = useState(getInitialState('mobile', ''));
  const [whatsappUpdates, setWhatsappUpdates] = useState(getInitialState('whatsappUpdates', true));
  const [step, setStep] = useState(getInitialState('step', 1));
  const [insuranceType, setInsuranceType] = useState(getInitialState('insuranceType', ''));
  const [specificPlan, setSpecificPlan] = useState(getInitialState('specificPlan', ''));
  const [location, setLocation] = useState(getInitialState('location', ''));
  const [employmentType, setEmploymentType] = useState(getInitialState('employmentType', ''));
  const [annualIncome, setAnnualIncome] = useState(getInitialState('annualIncome', ''));
  const [education, setEducation] = useState(getInitialState('education', ''));
  const [smoker, setSmoker] = useState(getInitialState('smoker', ''));
  const [allowContact, setAllowContact] = useState(getInitialState('allowContact', ''));
  const [detectedCity, setDetectedCity] = useState('');
  const [isFetchingCity, setIsFetchingCity] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingLead, setIsCheckingLead] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('leadform_gender', JSON.stringify(gender));
    localStorage.setItem('leadform_name', JSON.stringify(name));
    localStorage.setItem('leadform_email', JSON.stringify(email));
    localStorage.setItem('leadform_dob', JSON.stringify(dob));
    localStorage.setItem('leadform_mobile', JSON.stringify(mobile));
    localStorage.setItem('leadform_whatsappUpdates', JSON.stringify(whatsappUpdates));
    localStorage.setItem('leadform_step', JSON.stringify(step));
    localStorage.setItem('leadform_insuranceType', JSON.stringify(insuranceType));
    localStorage.setItem('leadform_specificPlan', JSON.stringify(specificPlan));
    localStorage.setItem('leadform_location', JSON.stringify(location));
    localStorage.setItem('leadform_employmentType', JSON.stringify(employmentType));
    localStorage.setItem('leadform_annualIncome', JSON.stringify(annualIncome));
    localStorage.setItem('leadform_education', JSON.stringify(education));
    localStorage.setItem('leadform_smoker', JSON.stringify(smoker));
    localStorage.setItem('leadform_allowContact', JSON.stringify(allowContact));
    if (onStepChange) onStepChange(step);
  }, [gender, name, email, dob, mobile, whatsappUpdates, step, insuranceType, specificPlan, location, employmentType, annualIncome, education, smoker, allowContact, onStepChange]);

  useEffect(() => {
    if (/^\d{6}$/.test(location)) {
      setIsFetchingCity(true);
      fetch(`https://api.postalpincode.in/pincode/${location}`)
        .then(res => res.json())
        .then(data => {
          if (data && data[0] && data[0].Status === 'Success') {
            const postOffice = data[0].PostOffice[0];
            setDetectedCity(`${postOffice.District}, ${postOffice.State}`);
          } else {
            setDetectedCity('Invalid Pincode');
          }
        })
        .catch(() => setDetectedCity('Failed to fetch city'))
        .finally(() => setIsFetchingCity(false));
    } else {
      setDetectedCity('');
    }
  }, [location]);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(val);
  };

  const renderStep1 = () => (
    <>
      <div className="gender-toggle" style={{ marginBottom: '1.5rem' }}>
          <button 
            className={`gender-btn ${gender === 'Male' ? 'active' : ''}`}
            onClick={() => setGender('Male')}
          >
            Male
          </button>
          <button 
            className={`gender-btn ${gender === 'Female' ? 'active' : ''}`}
            onClick={() => setGender('Female')}
          >
            Female
          </button>
        </div>

        <div className="input-group floating">
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder=" " 
            className="form-input"
          />
          <label className="floating-label">Your Name</label>
        </div>

        <div className="input-group floating">
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder=" " 
            className="form-input"
          />
          <label className="floating-label">Email Address</label>
        </div>

        <div className="input-group floating dob-group">
          <input 
            type="date" 
            value={dob} 
            onChange={(e) => setDob(e.target.value)} 
            placeholder=" " 
            className="form-input"
          />
          <label className="floating-label">Date of Birth</label>
        </div>

        <div className="input-group floating mobile-group">
          <div className="mobile-prefix">
            <select className="country-select">
              <option>India</option>
            </select>
            <span className="country-code">+91</span>
          </div>
          <input 
            type="text" 
            value={mobile} 
            onChange={handleMobileChange} 
            placeholder=" " 
            className="form-input mobile-input"
          />
          <label className="floating-label">Mobile Number</label>
        </div>

        <button 
          className="submit-btn view-plans-btn"
          onClick={() => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!name.trim()) return toast.error('Please enter your name');
            if (!email.trim() || !emailRegex.test(email)) return toast.error('Please enter a valid email');
            if (!dob.trim()) return toast.error('Please enter your date of birth');
            if (mobile.length !== 10) return toast.error('Please enter a valid 10-digit mobile number');
            setStep(2);
          }}
          style={{ 
            opacity: (name.trim() && dob.trim() && mobile.length === 10 && email.trim()) ? 1 : 0.6,
            transition: 'all 0.3s ease'
          }}
        >
          View Plans
        </button>

        <button
          className="already-filled-btn"
          disabled={isCheckingLead}
          onClick={async () => {
            if (mobile.length !== 10) return toast.error('Enter your 10-digit mobile number to verify');
            setIsCheckingLead(true);
            try {
              const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/leads/check?phone=${mobile}`);
              const data = await res.json();
              if (res.ok && data.exists) {
                localStorage.setItem('lead_submitted_token', 'true');
                toast.success('Welcome back!');
                navigate('/');
              } else {
                toast.error('No existing submission found for this number.');
              }
            } catch {
              toast.error('Could not verify. Please try again.');
            } finally {
              setIsCheckingLead(false);
            }
          }}
        >
          {isCheckingLead ? 'Checking...' : 'Already Filled'}
        </button>

        <div className="expert-assist">
          <div className="expert-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="9"></line>
              <line x1="9" y1="13" x2="15" y2="13"></line>
              <line x1="9" y1="17" x2="11" y2="17"></line>
            </svg>
            <div className="badge-pb">is</div>
          </div>
          <p>Only certified InsuranceShiva expert will assist you</p>
        </div>

        <div className="whatsapp-toggle">
          <div className="whatsapp-label">
            <svg viewBox="0 0 24 24" className="wa-icon" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>Get updates on WhatsApp</span>
          </div>
          <div 
            className={`toggle-switch ${whatsappUpdates ? 'on' : 'off'}`}
            onClick={() => setWhatsappUpdates(!whatsappUpdates)}
          >
            <div className="toggle-thumb"></div>
          </div>
        </div>
    </>
  );

  const renderStep2 = () => (
    <div className="step-container">
      <button className="back-btn" onClick={() => setStep(1)}>← Previous</button>
      <h3 className="step-title">What type of insurance are you looking for?</h3>
      <div className="options-grid">
        <button 
          className="option-card" 
          onClick={() => { setInsuranceType('Health'); setStep(4); }}
        >
          <div className="option-icon">🏥</div>
          <span>Health Insurance</span>
        </button>
        <button 
          className="option-card" 
          onClick={() => { setInsuranceType('Life'); setStep(3); }}
        >
          <div className="option-icon">🛡️</div>
          <span>Life Insurance</span>
        </button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="step-container">
      <button className="back-btn" onClick={() => setStep(2)}>← Previous</button>
      <h3 className="step-title">Select specific plan type:</h3>
      <div className="options-grid">
        <button 
          className="option-card" 
          onClick={() => { setSpecificPlan('Term'); setStep(4); }}
        >
          <div className="option-icon">⏳</div>
          <span>Life Insurance</span>
        </button>
        <button 
          className="option-card" 
          onClick={() => { setSpecificPlan('Savings'); setStep(4); }}
        >
          <div className="option-icon">💰</div>
          <span>Savings Insurance</span>
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="step-container">
      <button className="back-btn" onClick={() => setStep(insuranceType === 'Health' ? 2 : 3)}>← Previous</button>
      <h3 className="step-title">Enter your Location</h3>
      <div className="input-group floating" style={{ textAlign: 'left', marginBottom: '8px' }}>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder=" " className="form-input" />
        <label className="floating-label">City or Pincode</label>
      </div>
      {detectedCity && (
        <div style={{ textAlign: 'left', fontSize: '14px', fontWeight: 500, color: detectedCity === 'Invalid Pincode' ? '#ef4444' : '#2e9f68', marginBottom: '24px', paddingLeft: '8px' }}>
          {isFetchingCity ? 'Fetching city details...' : `📍 ${detectedCity}`}
        </div>
      )}
      {!detectedCity && <div style={{ marginBottom: '24px' }}></div>}
      <button 
        className="submit-btn view-plans-btn" 
        onClick={() => {
          if(location.trim()) {
            setStep(5);
          } else {
            toast.error('Please enter your location');
          }
        }}
        style={{ opacity: location.trim() ? 1 : 0.6 }}
      >
        Next
      </button>
    </div>
  );

  const renderStep5 = () => (
    <div className="step-container">
      <button className="back-btn" onClick={() => setStep(4)}>← Previous</button>
      <h3 className="step-title">Employment Type</h3>
      <div className="options-grid">
        <button className="option-card" onClick={() => { setEmploymentType('Salaried'); setStep(6); }}>
          <span>Salaried</span>
        </button>
        <button className="option-card" onClick={() => { setEmploymentType('Self-employed'); setStep(6); }}>
          <span>Self Employed</span>
        </button>
      </div>
    </div>
  );

  const incomeOptions = [
    '25 Lac +', '15 Lac to 24.9 Lac', '10 Lac to 14.9 Lac', '8 Lac to 9.9 Lac',
    '5 Lac to 7.9 Lac', '3 Lac to 4.9 Lac', '2 Lac to 2.9 Lac', 'Less than 2 Lac'
  ];

  const renderStep6 = () => (
    <div className="step-container list-step">
      <button className="back-btn" onClick={() => setStep(5)}>← Previous</button>
      <p className="step-subtitle">Just answer 5 simple questions to get more accurate quotes</p>
      <h3 className="step-title">Select your annual income</h3>
      <div className="radio-list">
        {incomeOptions.map(opt => (
          <label key={opt} className="radio-item">
            <input type="radio" name="income" value={opt} checked={annualIncome === opt} onChange={() => { setAnnualIncome(opt); setTimeout(() => setStep(7), 300); }} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const eduOptions = ['College graduate & above', '12th Pass', '10th Pass', 'Below 10th'];

  const renderStep7 = () => (
    <div className="step-container list-step">
      <button className="back-btn" onClick={() => setStep(6)}>← Previous</button>
      <p className="step-subtitle">Just answer 4 simple questions to get more accurate quotes</p>
      <h3 className="step-title">Select Educational Qualification</h3>
      <div className="radio-list">
        {eduOptions.map(opt => (
          <label key={opt} className="radio-item">
            <input type="radio" name="edu" value={opt} checked={education === opt} onChange={() => { setEducation(opt); setTimeout(() => setStep(8), 300); }} />
            <span>{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const renderStep8 = () => (
    <div className="step-container">
      <button className="back-btn" onClick={() => setStep(7)}>← Previous</button>
      
      <h3 className="step-title">Do you smoke or Chew Tobacco?</h3>
      <div className="gender-toggle" style={{ marginBottom: '24px' }}>
        <button className={`gender-btn ${smoker === 'Yes' ? 'active' : ''}`} onClick={() => { setSmoker('Yes'); setTimeout(() => setStep(9), 300); }}>Yes</button>
        <button className={`gender-btn ${smoker === 'No' ? 'active' : ''}`} onClick={() => { setSmoker('No'); setTimeout(() => setStep(9), 300); }}>No</button>
      </div>
    </div>
  );

  const renderStep9 = () => {
    const handleSubmit = async () => {
      if(allowContact) {
        setIsSubmitting(true);
        try {
          // Submit to Backend API
          const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              phone: mobile,
              email,
              date: dob || new Date().toISOString().split('T')[0],
              type: insuranceType.toLowerCase() || 'health',
              gender,
              specificPlan,
              location,
              employmentType,
              annualIncome,
              education,
              smoker
            })
          });

          if (response.ok) {
            toast.success('Your application was submitted successfully!');
            localStorage.setItem('lead_submitted_token', 'true');
            // Clear saved form data on complete
            Object.keys(localStorage).forEach(key => {
              if(key.startsWith('leadform_')) {
                localStorage.removeItem(key);
              }
            });
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
      } else {
        toast.error('Please make a selection');
      }
    };

    return (
      <div className="step-container">
        <button className="back-btn" onClick={() => setStep(8)}>← Previous</button>
        
        <h3 className="step-title" style={{ marginTop: '24px' }}>Allow us to get in touch to explain Insurance better</h3>
        <div className="gender-toggle" style={{ marginBottom: '32px' }}>
          <button className={`gender-btn ${allowContact === 'Yes' ? 'active' : ''}`} onClick={() => setAllowContact('Yes')}>Yes</button>
          <button className={`gender-btn ${allowContact === 'Maybe later' ? 'active' : ''}`} onClick={() => setAllowContact('Maybe later')}>Maybe later</button>
        </div>

        <button 
          className="submit-btn view-plans-btn" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{ opacity: allowContact ? 1 : 0.6 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    );
  };

  const hasSubmitted = localStorage.getItem('lead_submitted_token') === 'true';

  if (hasSubmitted) {
    return (
      <div className="lead-form-wrapper" style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h2 style={{ color: 'var(--text-dark, #1f2937)', marginBottom: '1rem' }}>Request Already Submitted</h2>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          We have received your details! Our experts are reviewing your request and will contact you shortly to explain the best insurance plans.
        </p>
        <button 
          className="submit-btn" 
          onClick={onComplete}
          style={{ maxWidth: '250px', margin: '0 auto' }}
        >
          Return to Website
        </button>
      </div>
    );
  }

  return (
    <div className="lead-form-wrapper">
      {step === 1 && (
        <>
          <div className="lead-form-nav">
            <div className="site-logo-container">
              <img src="/logo-icon.png" alt="Icon" className="site-logo-icon" />
              <div className="site-logo-text">Insurance<span style={{ color: '#f1592a' }}>Shiva</span></div>
            </div>
          </div>
          <div className="lead-form-header">
            <div className="lead-form-header-content">
              <h1>
                Best Insurance to <br />
                <span className="highlight-blue" style={{ color: 'var(--primary-color)' }}>Protect your family</span> <br />
                against liability
              </h1>
              <p className="price-tag">
                Starting from <span className="price-amount">₹361</span>/month<sup className="plus-sign">+</sup>
              </p>
            </div>
            <div className="lead-form-hero-img">
              <img src="/insurance_agent.png" alt="Insurance Agent" className="agent-avatar" />
            </div>
          </div>

          <div className="savings-banner" style={{ backgroundColor: 'var(--success-color)' }}>
            <span className="savings-icon">%</span>
            <p>Compare and <strong>Save upto 72%</strong> on premiums</p>
          </div>
        </>
      )}

      <div className="lead-form-card" style={{ borderTop: '4px solid var(--primary-color)' }}>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}
        {step === 7 && renderStep7()}
        {step === 8 && renderStep8()}
        {step === 9 && renderStep9()}
      </div>
    </div>
  );
};

export default LeadForm;
