
import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';
import './LeadForm.css';
import { Shield, Heart, Car, User, Mail, Phone, Calendar, Hash, Factory, CarFront, FileText, MapPin } from 'lucide-react';


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
  const [selfAge, setSelfAge] = useState('');
  const [wifeAge, setWifeAge] = useState('');
  const [sonCount, setSonCount] = useState<number>(0);
  const [sonAges, setSonAges] = useState<string[]>([]);
  const [daughterCount, setDaughterCount] = useState<number>(0);
  const [daughterAges, setDaughterAges] = useState<string[]>([]);
  const [ages, setAges] = useState('');
  const [memberConditions, setMemberConditions] = useState<Record<string, string[]>>({});
  const [memberOtherDisease, setMemberOtherDisease] = useState<Record<string, string>>({});
  const [selectedMemberTab, setSelectedMemberTab] = useState<string>('Self');
  const [healthCover, setHealthCover] = useState('');
  const [policyIntent, setPolicyIntent] = useState<'Buy new policy' | 'Already have health insurance' | ''>('');
  const [homeVisit, setHomeVisit] = useState<'Yes' | 'No' | 'I will do later' | ''>('');
  const [homeVisitDate, setHomeVisitDate] = useState('');
  const [homeVisitTime, setHomeVisitTime] = useState('');
  const [smoker, setSmoker] = useState('');

  // Life Specific State
  const [lifeStep, setLifeStep] = useState(2);
  const [lifePlanType, setLifePlanType] = useState<'Term' | 'Savings' | ''>('');
  const [lifeSubType, setLifeSubType] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [lifeAge, setLifeAge] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [education, setEducation] = useState('');
  const [income, setIncome] = useState('');
  const [lifeCoverAmount, setLifeCoverAmount] = useState('');
  const [lifeSmoker, setLifeSmoker] = useState<'Yes' | 'No' | ''>('');

  // Vehicle Specific State
  const [vehicleStep, setVehicleStep] = useState(1);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [vehicleCover, setVehicleCover] = useState('');
  const [vehicleCoverAmount, setVehicleCoverAmount] = useState('');

  const handleSonCountChange = (delta: number) => {
    const newCount = Math.max(0, Math.min(5, sonCount + delta));
    setSonCount(newCount);
    setSonAges(prev => {
      const next = [...prev];
      if (newCount > next.length) {
        while (next.length < newCount) next.push('');
      } else {
        return next.slice(0, newCount);
      }
      return next;
    });
  };

  const handleDaughterCountChange = (delta: number) => {
    const newCount = Math.max(0, Math.min(5, daughterCount + delta));
    setDaughterCount(newCount);
    setDaughterAges(prev => {
      const next = [...prev];
      if (newCount > next.length) {
        while (next.length < newCount) next.push('');
      } else {
        return next.slice(0, newCount);
      }
      return next;
    });
  };

  const handleLifeNext2 = () => {
    if (!lifePlanType) return toast.error('Please select Term or Savings');
    if (!lifeSubType) return toast.error('Please select a specific plan');
    setLifeStep(3);
  };

  const handleLifeNext3 = () => {
    if (!name.trim()) return toast.error('Please enter Proposer Name');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Please enter a valid email address');
    if (!mobile.trim() || !/^[0-9]{10}$/.test(mobile)) return toast.error('Please enter a valid 10-digit mobile number');
    if (!lifeAge.trim()) return toast.error('Please enter Age');
    if (!pinCode.trim()) return toast.error('Please enter Pincode');
    setLifeStep(4);
  };

  const handleLifeNext4 = () => {
    if (!education) return toast.error('Please select Qualification');
    if (!income) return toast.error('Please select Annual Income');
    setLifeStep(5);
  };

  const handleLifeNext5 = () => {
    if (!lifeCoverAmount) return toast.error('Please select Coverage Amount');
    setLifeStep(6);
  };

  const handleLifeNext6 = () => {
    if (!lifeSmoker) return toast.error('Please select Smoke option');
    setLifeStep(7);
  };
  const handleVehicleNext1 = () => {
    if (!name.trim()) return toast.error('Please enter Proposer Name');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Please enter a valid email address');
    if (!mobile.trim() || !/^[0-9]{10}$/.test(mobile)) return toast.error('Please enter a valid 10-digit mobile number');
    if (!vehicleNumber.trim()) return toast.error('Please enter Vehicle Number');
    if (!vehicleType) return toast.error('Please select Vehicle Type');
    if (!manufacturer) return toast.error('Please select Manufacturer');
    if (!model) return toast.error('Please select Model');
    if (!registrationDate) return toast.error('Please select Registration Date');
    setVehicleStep(2);
  };


  useEffect(() => {
    if (onStepChange) onStepChange(step);
  }, [step, onStepChange]);

  
  const handleNextStep1 = () => {
    if (!name.trim()) return toast.error('Please enter Proposer Name');
    if (!mobile.trim() || !/^[0-9]{10}$/.test(mobile)) return toast.error('Please enter a valid 10-digit mobile number');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Please enter a valid email address');
    if (!pinCode.trim() || pinCode.trim().length < 6) return toast.error('Please enter a valid 6-digit Pincode');

    if (policyMode === 'Individual') {
      if (!selfAge.trim()) return toast.error('Please enter Self Age');
      setAges(`Self: ${selfAge}`);
    } else {
      if (!selfAge.trim()) return toast.error('Please enter Self Age');
      if (!wifeAge.trim()) return toast.error('Please enter Wife/Spouse Age');
      for (let i = 0; i < sonCount; i++) {
        if (!sonAges[i] || !sonAges[i].trim()) return toast.error(`Please enter age for Son ${i + 1}`);
      }
      for (let i = 0; i < daughterCount; i++) {
        if (!daughterAges[i] || !daughterAges[i].trim()) return toast.error(`Please enter age for Daughter ${i + 1}`);
      }
      const parts = [`Self: ${selfAge}`, `Wife: ${wifeAge}`];
      if (sonCount > 0) parts.push(`Son (${sonCount}): ${sonAges.join(', ')}`);
      if (daughterCount > 0) parts.push(`Daughter (${daughterCount}): ${daughterAges.join(', ')}`);
      setAges(parts.join(' | '));
    }

    setHealthStep(2);
  };

  const getCoveredMemberList = () => {
    if (policyMode === 'Individual') return ['Self'];
    const list = ['Self', 'Wife'];
    for (let i = 0; i < sonCount; i++) list.push(`Son ${i + 1}`);
    for (let i = 0; i < daughterCount; i++) list.push(`Daughter ${i + 1}`);
    return list;
  };

  const getMemberConditionList = (m: string) => {
    return memberConditions[m] || [];
  };

  const handleMemberConditionToggle = (member: string, condition: string) => {
    setMemberConditions(prev => {
      const current = prev[member] || [];
      if (condition === 'None of these') {
        return {
          ...prev,
          [member]: current.includes('None of these') ? [] : ['None of these']
        };
      }
      let next: string[];
      if (current.includes(condition)) {
        next = current.filter(c => c !== condition);
      } else {
        next = [...current.filter(c => c !== 'None of these'), condition];
      }
      return {
        ...prev,
        [member]: next
      };
    });
  };

  const handleNextStep2 = () => {
    const members = getCoveredMemberList();
    for (const m of members) {
      const conds = memberConditions[m] || [];
      if (conds.length === 0) {
        setSelectedMemberTab(m);
        return toast.error(`Please select health condition for ${m}`);
      }
      if (conds.includes('Other disease') && !(memberOtherDisease[m] || '').trim()) {
        setSelectedMemberTab(m);
        return toast.error(`Please enter other disease name for ${m}`);
      }
    }
    setHealthStep(3);
  };

  const buildMedicalHistorySummary = () => {
    const members = getCoveredMemberList();
    const parts: string[] = [];
    members.forEach(m => {
      const conds = memberConditions[m] || [];
      if (conds.includes('Other disease') && memberOtherDisease[m]) {
        const cleaned = conds.filter(c => c !== 'Other disease');
        parts.push(`${m}: ${[...cleaned, `Other: ${memberOtherDisease[m].trim()}`].join(', ')}`);
      } else if (conds.length > 0) {
        parts.push(`${m}: ${conds.join(', ')}`);
      } else {
        parts.push(`${m}: None of these`);
      }
    });
    return parts.join(' | ');
  };

  const handleNextStep3 = () => {
    if (!healthCover) return toast.error('Please select a cover amount');
    setHealthStep(4);
  };

  const handleNextStep4 = () => {
    if (!policyIntent) return toast.error('Please choose an option to see the best plan');
    setHealthStep(5);
  };

  const handleNextStep5 = () => {
    if (!homeVisit) return toast.error('Please choose whether you want to book a free home visit');
    if (homeVisit === 'Yes' && (!homeVisitDate || !homeVisitTime)) {
      return toast.error('Please select visit date and time');
    }
    setHealthStep(6);
  };

  const handleNextStep6 = () => {
    if (!smoker) return toast.error('Please select an option');
    setHealthStep(7);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const homeVisitDateTimeStr = homeVisit === 'Yes' ? `${homeVisitDate} ${homeVisitTime}`.trim() : undefined;
      const healthMedicalHistory = buildMedicalHistorySummary();
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: mobile,
          email,
          type: insuranceType.toLowerCase() || 'health',
          gender: insuranceType === 'Life' ? gender : undefined,
          location: pinCode || undefined,
          smoker: insuranceType === 'Health' ? smoker : (insuranceType === 'Life' ? lifeSmoker : undefined),
          medicalHistory: insuranceType === 'Health' ? [healthMedicalHistory] : [],
          specificPlan: insuranceType === 'Vehicle' ? `${vehicleCover} - ${vehicleCoverAmount}` : (insuranceType === 'Health' ? healthCover : (lifeSubType ? `${lifePlanType}: ${lifeSubType} (${lifeCoverAmount})` : lifeCoverAmount)),
          members: [insuranceType === 'Health' ? policyMode : 'Individual', insuranceType === 'Life' ? lifeAge : ages],
          date: new Date().toISOString().split('T')[0],
          policyIntent: insuranceType === 'Health' ? policyIntent : undefined,
          homeVisit: insuranceType === 'Health' ? homeVisit : undefined,
          homeVisitDateTime: insuranceType === 'Health' ? homeVisitDateTimeStr : undefined,
          vehicleNumber,
          vehicleType: insuranceType === 'Vehicle' ? vehicleType : undefined,
          vehicleManufacturer: insuranceType === 'Vehicle' ? manufacturer : undefined,
          vehicleModel: insuranceType === 'Vehicle' ? model : undefined,
          vehicleFuelType: insuranceType === 'Vehicle' ? fuelType : undefined,
          vehicleRegDate: insuranceType === 'Vehicle' ? registrationDate : undefined,
          vehiclePincode: insuranceType === 'Vehicle' ? pinCode : undefined,
          education: insuranceType === 'Life' ? education : undefined,
          annualIncome: insuranceType === 'Life' ? income : undefined,
          lifeCover: insuranceType === 'Life' ? (lifeSubType ? `${lifePlanType} - ${lifeSubType} - ${lifeCoverAmount}` : lifeCoverAmount) : undefined,
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
      <div className="insurance-cards-container">
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
    </div>
  );

  const renderHealthSteps = () => {
    return (
      <div className="step-container">
        <div className="progress-bar-container" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem', fontSize: '0.82rem', color: '#666', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: healthStep === 1 ? 'bold' : 'normal', color: healthStep === 1 ? '#000' : '#666' }}>1. Proposer</span>
          <span style={{ fontWeight: healthStep === 2 ? 'bold' : 'normal', color: healthStep === 2 ? '#000' : '#666' }}>2. Age & Health</span>
          <span style={{ fontWeight: healthStep === 3 ? 'bold' : 'normal', color: healthStep === 3 ? '#000' : '#666' }}>3. Coverage</span>
          <span style={{ fontWeight: healthStep === 4 ? 'bold' : 'normal', color: healthStep === 4 ? '#000' : '#666' }}>4. Plan Option</span>
          <span style={{ fontWeight: healthStep === 5 ? 'bold' : 'normal', color: healthStep === 5 ? '#000' : '#666' }}>5. Home Visit</span>
          <span style={{ fontWeight: healthStep === 6 ? 'bold' : 'normal', color: healthStep === 6 ? '#000' : '#666' }}>6. Smoke</span>
          <span style={{ fontWeight: healthStep === 7 ? 'bold' : 'normal', color: healthStep === 7 ? '#000' : '#666' }}>7. Confirm</span>
        </div>

        {/* Step 1 (Sketch Step-2): Health Insurance Proposer & Family Details */}
        {healthStep === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ display: 'inline-block', background: '#ecfdf5', color: '#059669', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Step 2 · Health
              </span>
              <h3 style={{ margin: 0 }}>Proposer &amp; Member Details</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Choose plan type and enter proposer &amp; insured member details
              </p>
            </div>

            {/* Individual vs Family Toggle */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              <button 
                type="button" 
                className={`btn ${policyMode === 'Individual' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '150px', fontWeight: 700, padding: '0.85rem' }}
                onClick={() => setPolicyMode('Individual')}
              >
                INDIVIDUAL
              </button>
              <button 
                type="button" 
                className={`btn ${policyMode === 'Family' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '150px', fontWeight: 700, padding: '0.85rem' }}
                onClick={() => setPolicyMode('Family')}
              >
                FAMILY
              </button>
            </div>

            {/* Core Details Grid: Propose name, Mobile no, Mail id, Pincode */}
            <div className="form-group-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="required">Propose Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input type="text" placeholder="Enter Full Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="required">Mobile No</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input type="tel" maxLength={10} placeholder="10-digit mobile number" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>
            </div>

            <div className="form-group-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="required">Mail Id</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input type="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="required">Pincode</label>
                <div className="input-with-icon">
                  <MapPin size={18} className="input-icon" />
                  <input type="text" maxLength={6} placeholder="e.g. 500081" value={pinCode} onChange={e => setPinCode(e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>
            </div>

            {/* Member Age Details as specified in sketch */}
            <div className="family-card-wrapper">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem' }}>
                <div>
                  <h4 style={{ margin: 0, color: '#0f172a', fontSize: '1.05rem', fontWeight: 700 }}>
                    {policyMode === 'Individual' ? 'Member Age' : 'Family Member Ages'}
                  </h4>
                  <p style={{ margin: '0.2rem 0 0', color: '#64748b', fontSize: '0.82rem' }}>
                    {policyMode === 'Individual' ? 'Enter age of the insured person' : 'Specify ages for you and your family members'}
                  </p>
                </div>
                <span style={{ background: '#eff6ff', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700 }}>
                  {policyMode}
                </span>
              </div>

              {/* Self Row */}
              <div className="family-member-row">
                <div className="member-label">
                  <div className="member-avatar">👤</div>
                  <div>
                    <div className="member-title">Self</div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Primary Insured</div>
                  </div>
                </div>
                <div className="age-tag-input">
                  <input 
                    type="number" 
                    placeholder="Age" 
                    value={selfAge} 
                    onChange={e => setSelfAge(e.target.value)} 
                    min={18} 
                    max={100}
                  />
                  <span className="age-tag-suffix">yrs</span>
                </div>
              </div>

              {/* Family Members: Wife, Son, Daughter */}
              {policyMode === 'Family' && (
                <>
                  {/* Wife Row */}
                  <div className="family-member-row">
                    <div className="member-label">
                      <div className="member-avatar" style={{ background: '#fdf2f8', color: '#db2777' }}>👰</div>
                      <div>
                        <div className="member-title">Wife</div>
                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Spouse</div>
                      </div>
                    </div>
                    <div className="age-tag-input">
                      <input 
                        type="number" 
                        placeholder="Age" 
                        value={wifeAge} 
                        onChange={e => setWifeAge(e.target.value)} 
                        min={18} 
                        max={100}
                      />
                      <span className="age-tag-suffix">yrs</span>
                    </div>
                  </div>

                  {/* Son Row */}
                  <div style={{ padding: '1rem 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div className="family-member-row" style={{ padding: 0, border: 'none' }}>
                      <div className="member-label">
                        <div className="member-avatar" style={{ background: '#ecfdf5', color: '#059669' }}>👦</div>
                        <div>
                          <div className="member-title">Son</div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Number of sons</div>
                        </div>
                      </div>
                      <div className="member-counter">
                        <button 
                          type="button" 
                          className="member-counter-btn"
                          onClick={() => handleSonCountChange(-1)}
                          title="Decrease"
                        >
                          −
                        </button>
                        <span className="member-counter-value">{sonCount}</span>
                        <button 
                          type="button" 
                          className="member-counter-btn"
                          onClick={() => handleSonCountChange(1)}
                          title="Increase"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {sonCount > 0 && (
                      <div className="child-age-grid">
                        {Array.from({ length: sonCount }).map((_, idx) => (
                          <div key={idx} className="age-tag-input child-age-item">
                            <input 
                              type="number" 
                              placeholder={`Son ${idx + 1} Age`} 
                              value={sonAges[idx] || ''} 
                              onChange={e => {
                                const newAges = [...sonAges];
                                newAges[idx] = e.target.value;
                                setSonAges(newAges);
                              }}
                              min={0}
                              max={30}
                            />
                            <span className="age-tag-suffix">yrs</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Daughter Row */}
                  <div style={{ padding: '1rem 0 0.5rem' }}>
                    <div className="family-member-row" style={{ padding: 0, border: 'none' }}>
                      <div className="member-label">
                        <div className="member-avatar" style={{ background: '#fef3c7', color: '#d97706' }}>👧</div>
                        <div>
                          <div className="member-title">Daughter</div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Number of daughters</div>
                        </div>
                      </div>
                      <div className="member-counter">
                        <button 
                          type="button" 
                          className="member-counter-btn"
                          onClick={() => handleDaughterCountChange(-1)}
                          title="Decrease"
                        >
                          −
                        </button>
                        <span className="member-counter-value">{daughterCount}</span>
                        <button 
                          type="button" 
                          className="member-counter-btn"
                          onClick={() => handleDaughterCountChange(1)}
                          title="Increase"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {daughterCount > 0 && (
                      <div className="child-age-grid">
                        {Array.from({ length: daughterCount }).map((_, idx) => (
                          <div key={idx} className="age-tag-input child-age-item">
                            <input 
                              type="number" 
                              placeholder={`Daughter ${idx + 1} Age`} 
                              value={daughterAges[idx] || ''} 
                              onChange={e => {
                                const newAges = [...daughterAges];
                                newAges[idx] = e.target.value;
                                setDaughterAges(newAges);
                              }}
                              min={0}
                              max={30}
                            />
                            <span className="age-tag-suffix">yrs</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button type="button" className="btn btn-primary" onClick={handleNextStep1}>NEXT - MEDICAL CONDITIONS</button>
            </div>
          </div>
        )}

        {/* Step 2 (Sketch Step 3): Select Conditions / Illnesses Per Member */}
        {healthStep === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ display: 'inline-block', background: '#ecfdf5', color: '#059669', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Step 3 · Health
              </span>
              <h3 style={{ margin: 0 }}>Existing Conditions &amp; Illnesses</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Select medical conditions for <strong>each covered member</strong>
              </p>
            </div>

            {/* Member Selection Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', maxWidth: '650px', margin: '0 auto 1.5rem' }}>
              {getCoveredMemberList().map(m => {
                const isActive = selectedMemberTab === m;
                const conds = getMemberConditionList(m);
                const hasSelected = conds.length > 0;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMemberTab(m)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.15rem',
                      borderRadius: '99px',
                      border: isActive ? '2px solid #2563eb' : '1.5px solid #cbd5e1',
                      background: isActive ? '#eff6ff' : '#ffffff',
                      color: isActive ? '#1d4ed8' : '#334155',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      boxShadow: isActive ? '0 2px 8px rgba(37, 99, 235, 0.15)' : 'none'
                    }}
                  >
                    <span>{m === 'Self' ? '👤' : m === 'Wife' ? '👰' : m.startsWith('Son') ? '👦' : '👧'}</span>
                    <span>{m}</span>
                    {hasSelected ? (
                      <span style={{ background: '#22c55e', color: '#fff', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '99px', fontWeight: 700 }}>
                        ✓
                      </span>
                    ) : (
                      <span style={{ background: '#f59e0b', color: '#fff', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '99px', fontWeight: 700 }}>
                        !
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Currently Active Member Card */}
            <div style={{ background: '#f8fafc', padding: '1.25rem 1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', maxWidth: '650px', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Active Member</span>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                  Conditions for {selectedMemberTab}
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                Selected: <strong style={{ color: getMemberConditionList(selectedMemberTab).length > 0 ? '#15803d' : '#94a3b8' }}>
                  {getMemberConditionList(selectedMemberTab).join(', ') || 'None selected'}
                </strong>
              </div>
            </div>

            {/* Disease checklist for active member */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem', maxWidth: '650px', margin: '0 auto 2rem' }}>
              {[
                'Depression',
                'Diabetes',
                'Asthma',
                'Hypertension',
                'Thyroid',
                'Heart disease',
                'Other disease',
                'None of these'
              ].map(condition => {
                const currentMemberConds = getMemberConditionList(selectedMemberTab);
                const isSelected = currentMemberConds.includes(condition);
                return (
                  <label 
                    key={condition} 
                    className="medical-condition-label" 
                    style={{ 
                      border: isSelected ? "2px solid #2e9f68" : "1px solid #e2e8f0",
                      backgroundColor: isSelected ? "#f0fdf4" : "white",
                      color: isSelected ? "#15803d" : "#334155",
                      fontWeight: isSelected ? 600 : 500
                    }}
                  >
                    <input 
                      type="checkbox" 
                      checked={isSelected}
                      onChange={() => handleMemberConditionToggle(selectedMemberTab, condition)} 
                    />
                    {condition}
                  </label>
                );
              })}
            </div>

            {getMemberConditionList(selectedMemberTab).includes('Other disease') && (
              <div className="form-group" style={{ maxWidth: '420px', margin: '0 auto 2rem' }}>
                <label className="required">Other Disease Name for {selectedMemberTab}</label>
                <input 
                  type="text" 
                  placeholder={`Enter condition name for ${selectedMemberTab}`} 
                  value={memberOtherDisease[selectedMemberTab] || ''} 
                  onChange={e => {
                    const val = e.target.value;
                    setMemberOtherDisease(prev => ({ ...prev, [selectedMemberTab]: val }));
                  }} 
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setHealthStep(1)}>BACK</button>
              <button type="button" className="btn btn-primary" onClick={handleNextStep2}>NEXT - COVERAGE DETAILS</button>
            </div>
          </div>
        )}

        {/* Step 3 (Sketch Step 4): Coverage Details */}
        {healthStep === 3 && (
          <div>
            <h3 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Coverage Details</h3>
            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Select the sum insured cover amount required
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '600px', margin: '0 auto', marginBottom: '2.5rem' }}>
              {['5 Lakh', '10 Lakh', '15 Lakh', '20 Lakh', '25 Lakh', '50 Lakh', '1 Crore', '2 Crore', '3 Crore'].map(amount => (
                <button 
                  type="button"
                  key={amount}
                  className={`btn ${healthCover === amount ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '130px', padding: '0.85rem 0.5rem' }}
                  onClick={() => setHealthCover(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setHealthStep(2)}>BACK</button>
              <button type="button" className="btn btn-primary" onClick={handleNextStep3}>NEXT</button>
            </div>
          </div>
        )}

        {/* Step 4 (Sketch Step 5): Choose Option to See Best Plan */}
        {healthStep === 4 && (
          <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Choose an Option to See the Best Plan</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>
              Let us know your current insurance status so we can personalize plans for you
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', textAlign: 'left' }}>
              {[
                { key: 'Buy new policy', label: 'Buy new policy', desc: 'I want to purchase a fresh health policy' },
                { key: 'Already have health insurance', label: 'Already have health insurance', desc: 'Looking for better coverage, porting, or family top-up' }
              ].map(opt => (
                <label 
                  key={opt.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '16px',
                    border: policyIntent === opt.key ? '2px solid #2e9f68' : '1px solid #e2e8f0',
                    background: policyIntent === opt.key ? '#f0fdf4' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setPolicyIntent(opt.key as any)}
                >
                  <input 
                    type="radio" 
                    name="policyIntent" 
                    checked={policyIntent === opt.key} 
                    onChange={() => setPolicyIntent(opt.key as any)}
                    style={{ width: '1.2rem', height: '1.2rem', accentColor: '#2e9f68' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '1.05rem' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.2rem' }}>{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setHealthStep(3)}>BACK</button>
              <button type="button" className="btn btn-primary" onClick={handleNextStep4}>NEXT - HOME VISIT</button>
            </div>
          </div>
        )}

        {/* Step 5 (Sketch Step 6): Free Home Visit Booking */}
        {healthStep === 5 && (
          <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Do you want to book a free home visit?</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '2rem' }}>
              A certified advisor will visit your location to explain plans and assist with paperwork.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem', textAlign: 'left' }}>
              {[
                { val: 'Yes', label: 'Yes', desc: 'Schedule an advisor visit to my doorstep' },
                { val: 'No', label: 'No', desc: 'I prefer online & telephonic consultation only' },
                { val: 'I will do later', label: 'I will do later', desc: 'Decide after comparing the plans' }
              ].map(opt => (
                <label 
                  key={opt.val}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.1rem 1.25rem',
                    borderRadius: '14px',
                    border: homeVisit === opt.val ? '2px solid #2e9f68' : '1px solid #e2e8f0',
                    background: homeVisit === opt.val ? '#f0fdf4' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onClick={() => setHomeVisit(opt.val as any)}
                >
                  <input 
                    type="radio" 
                    name="homeVisit" 
                    checked={homeVisit === opt.val} 
                    onChange={() => setHomeVisit(opt.val as any)}
                    style={{ width: '1.15rem', height: '1.15rem', accentColor: '#2e9f68' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: '#1f2937', fontSize: '0.95rem' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{opt.desc}</div>
                  </div>
                </label>
              ))}
            </div>

            {homeVisit === 'Yes' && (
              <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '2rem', textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '0.95rem', marginBottom: '1rem' }}>
                  Select Visit Date and Time:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="required" style={{ fontSize: '0.85rem' }}>Visit Date</label>
                    <input 
                      type="date" 
                      min={new Date().toISOString().split('T')[0]} 
                      value={homeVisitDate} 
                      onChange={e => setHomeVisitDate(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="required" style={{ fontSize: '0.85rem' }}>Visit Time</label>
                    <select value={homeVisitTime} onChange={e => setHomeVisitTime(e.target.value)}>
                      <option value="">Select Time Slot</option>
                      <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                      <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                      <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                      <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setHealthStep(4)}>BACK</button>
              <button type="button" className="btn btn-primary" onClick={handleNextStep5}>NEXT - LIFESTYLE</button>
            </div>
          </div>
        )}

        {/* Step 6 (Sketch Step 7): Smoke Question */}
        {healthStep === 6 && (
          <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Smoke / Tobacco</h3>
            <p style={{ marginBottom: '2rem', fontSize: '1.05rem', color: '#4b5563' }}>Do you smoke or chew tobacco?</p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <button 
                type="button"
                className={`btn ${smoker === 'Yes' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '130px', padding: '0.9rem', fontSize: '1rem', fontWeight: 700 }} 
                onClick={() => setSmoker('Yes')}
              >
                YES
              </button>
              <button 
                type="button"
                className={`btn ${smoker === 'No' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '130px', padding: '0.9rem', fontSize: '1rem', fontWeight: 700 }} 
                onClick={() => setSmoker('No')}
              >
                NO
              </button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setHealthStep(5)}>BACK</button>
              <button type="button" className="btn btn-primary" onClick={handleNextStep6}>PREVIEW &amp; CONFIRM</button>
            </div>
          </div>
        )}

        {/* Step 7 (Sketch Step 8): Preview and Confirm */}
        {healthStep === 7 && (
          <div style={{ maxWidth: '540px', margin: '0 auto', textAlign: 'left' }}>
            <h3 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>Preview and Confirm</h3>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1.5rem' }}>
              Please review your details before submitting your request
            </p>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Proposer Name:</span>
                <strong>{name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Mobile:</span>
                <strong>{mobile}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Email:</span>
                <strong>{email}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Mode &amp; Age(s):</span>
                <strong>{policyMode} ({ages})</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Coverage Details:</span>
                <strong style={{ color: '#059669' }}>{healthCover}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Plan Option:</span>
                <strong>{policyIntent}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Home Visit:</span>
                <strong>
                  {homeVisit === 'Yes' ? `Yes (${homeVisitDate} ${homeVisitTime})` : homeVisit}
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Smoke / Tobacco:</span>
                <strong>{smoker}</strong>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', paddingTop: '0.4rem', borderTop: '1px solid #f1f5f9' }}>
                <span style={{ color: '#64748b', fontWeight: 600 }}>Member Medical Conditions:</span>
                <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.88rem' }}>
                  {getCoveredMemberList().map(m => {
                    const conds = getMemberConditionList(m);
                    const other = memberOtherDisease[m];
                    const displayConds = conds.includes('Other disease') && other
                      ? [...conds.filter(c => c !== 'Other disease'), `Other: ${other}`].join(', ')
                      : (conds.join(', ') || 'None of these');
                    return (
                      <div key={m} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.2rem 0', borderBottom: '1px dashed #f1f5f9' }}>
                        <span style={{ fontWeight: 600, color: '#334155' }}>{m}:</span>
                        <span style={{ color: '#1e293b', textAlign: 'right', maxWidth: '300px' }}>{displayConds}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setHealthStep(6)}>BACK</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : 'CONFIRM & SUBMIT'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  
  const renderLifeSteps = () => {
    return (
      <div className="step-container">
        <div className="progress-bar-container" style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', marginBottom: '2rem', fontSize: '0.85rem', color: '#666', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: lifeStep === 2 ? 'bold' : 'normal', color: lifeStep === 2 ? '#000' : '#666' }}>Step 2. Plan Type</span>
          <span style={{ fontWeight: lifeStep === 3 ? 'bold' : 'normal', color: lifeStep === 3 ? '#000' : '#666' }}>Step 3. Customer Details</span>
          <span style={{ fontWeight: lifeStep === 4 ? 'bold' : 'normal', color: lifeStep === 4 ? '#000' : '#666' }}>Step 4. Qualification &amp; Income</span>
          <span style={{ fontWeight: lifeStep === 5 ? 'bold' : 'normal', color: lifeStep === 5 ? '#000' : '#666' }}>Step 5. Coverage</span>
          <span style={{ fontWeight: lifeStep === 6 ? 'bold' : 'normal', color: lifeStep === 6 ? '#000' : '#666' }}>Step 6. Smoke</span>
          <span style={{ fontWeight: lifeStep === 7 ? 'bold' : 'normal', color: lifeStep === 7 ? '#000' : '#666' }}>Step 7. Confirm</span>
        </div>

        {/* Step 2 (Sketch Step-2): Life Insurance Plan Selection */}
        {lifeStep === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <span style={{ display: 'inline-block', background: '#eff6ff', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Step 2 · Life Insurance
              </span>
              <h3 style={{ margin: 0 }}>Select Life Insurance Plan</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Choose between Term Insurance and Savings Plans
              </p>
            </div>

            {/* Term vs Savings Selection */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
              {/* Term Column */}
              <div 
                style={{ 
                  background: lifePlanType === 'Term' ? '#f0fdf4' : '#ffffff', 
                  border: lifePlanType === 'Term' ? '2px solid #22c55e' : '1px solid #e2e8f0', 
                  borderRadius: '16px', 
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: lifePlanType === 'Term' ? '0 8px 20px rgba(34, 197, 94, 0.12)' : 'none'
                }}
                onClick={() => {
                  setLifePlanType('Term');
                  if (lifeSubType !== 'Term + Investment' && lifeSubType !== 'Pure Term') {
                    setLifeSubType('Term + Investment');
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid', borderColor: lifePlanType === 'Term' ? '#22c55e' : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {lifePlanType === 'Term' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }} />}
                  </div>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>Term</h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                  {['Term + Investment', 'Pure Term'].map(option => (
                    <button
                      type="button"
                      key={option}
                      className={`btn ${lifePlanType === 'Term' && lifeSubType === option ? 'btn-primary' : 'btn-outline'}`}
                      style={{ 
                        padding: '0.75rem 1rem', 
                        fontSize: '0.9rem', 
                        fontWeight: 600, 
                        textAlign: 'left',
                        justifyContent: 'flex-start'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLifePlanType('Term');
                        setLifeSubType(option);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Savings Column */}
              <div 
                style={{ 
                  background: lifePlanType === 'Savings' ? '#eff6ff' : '#ffffff', 
                  border: lifePlanType === 'Savings' ? '2px solid #3b82f6' : '1px solid #e2e8f0', 
                  borderRadius: '16px', 
                  padding: '1.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: lifePlanType === 'Savings' ? '0 8px 20px rgba(59, 130, 246, 0.12)' : 'none'
                }}
                onClick={() => {
                  setLifePlanType('Savings');
                  if (!['Guaranteed', 'Non Guaranteed', 'Unit Linked Investment Plan'].includes(lifeSubType)) {
                    setLifeSubType('Guaranteed');
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', border: '2px solid', borderColor: lifePlanType === 'Savings' ? '#3b82f6' : '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {lifePlanType === 'Savings' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }} />}
                  </div>
                  <h4 style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>Savings</h4>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                  {['Guaranteed', 'Non Guaranteed', 'Unit Linked Investment Plan'].map(option => (
                    <button
                      type="button"
                      key={option}
                      className={`btn ${lifePlanType === 'Savings' && lifeSubType === option ? 'btn-primary' : 'btn-outline'}`}
                      style={{ 
                        padding: '0.75rem 1rem', 
                        fontSize: '0.9rem', 
                        fontWeight: 600, 
                        textAlign: 'left',
                        justifyContent: 'flex-start'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setLifePlanType('Savings');
                        setLifeSubType(option);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button type="button" className="btn btn-primary" onClick={handleLifeNext2}>
                NEXT - CUSTOMER DETAILS (STEP 3)
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Life - Customer Details (Male/Female, Name, Mobile, Age, Pincode) */}
        {lifeStep === 3 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ display: 'inline-block', background: '#eff6ff', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Step 3 · Life Insurance
              </span>
              <h3 style={{ margin: 0 }}>Customer Details</h3>
            </div>

            {/* Selected Plan Badge */}
            {lifePlanType && (
              <div style={{ maxWidth: '420px', margin: '0 auto 1.5rem', background: '#f8fafc', padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center', fontSize: '0.88rem', color: '#475569' }}>
                Plan: <strong style={{ color: '#2563eb' }}>{lifePlanType} ({lifeSubType})</strong>
              </div>
            )}

            {/* Gender Toggle: Male / Female */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              <button 
                type="button" 
                className={`btn ${gender === 'Male' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '130px', fontWeight: 700 }}
                onClick={() => setGender('Male')}
              >
                MALE
              </button>
              <button 
                type="button" 
                className={`btn ${gender === 'Female' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '130px', fontWeight: 700 }}
                onClick={() => setGender('Female')}
              >
                FEMALE
              </button>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label className="required">Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input type="text" placeholder="Enter Full Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="required">Mobile No</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input type="tel" maxLength={10} placeholder="10-digit mobile number" value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label className="required">Age</label>
                <div className="input-with-icon">
                  <Calendar size={18} className="input-icon" />
                  <input type="text" placeholder="e.g. 28" value={lifeAge} onChange={e => setLifeAge(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="required">Pincode</label>
                <div className="input-with-icon">
                  <MapPin size={18} className="input-icon" />
                  <input type="text" maxLength={6} placeholder="e.g. 500081" value={pinCode} onChange={e => setPinCode(e.target.value.replace(/\D/g, ''))} />
                </div>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="required">Email Address</label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input type="email" placeholder="Enter Email Address" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
              <button type="button" className="btn btn-outline" onClick={() => setLifeStep(2)}>BACK (STEP 2)</button>
              <button type="button" className="btn btn-primary" onClick={handleLifeNext3}>NEXT - QUALIFICATION (STEP 4)</button>
            </div>
          </div>
        )}

        {/* Step 4: Qualification & Annual Income */}
        {lifeStep === 4 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ display: 'inline-block', background: '#eff6ff', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Step 4
              </span>
              <h3 style={{ margin: 0 }}>Qualification &amp; Annual Income</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>Select your qualification and income bracket</p>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '1rem', textAlign: 'center' }}>
                Qualification <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                {['Graduate & above', '12th pass', '10th pass', 'below 10th'].map(q => (
                  <button
                    type="button"
                    key={q}
                    className={`btn ${education === q ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '0.9rem', fontWeight: 600, fontSize: '0.95rem' }}
                    onClick={() => setEducation(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '1rem', textAlign: 'center' }}>
                Annual Income <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', justifyContent: 'center', maxWidth: '620px', margin: '0 auto' }}>
                {['Less than 2L', '2L - 3L', '3L - 5L', '5L - 7L', '7L - 10L', '10L - 15L', '15L & Above'].map(inc => (
                  <button 
                    type="button"
                    key={inc}
                    className={`btn ${income === inc ? 'btn-primary' : 'btn-outline'}`}
                    style={{ padding: '0.75rem 1.25rem', fontSize: '0.9rem' }}
                    onClick={() => setIncome(inc)}
                  >
                    {inc}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setLifeStep(3)}>BACK (STEP 3)</button>
              <button type="button" className="btn btn-primary" onClick={handleLifeNext4}>NEXT - COVERAGE (STEP 5)</button>
            </div>
          </div>
        )}

        {/* Step 5: Coverage Details */}
        {lifeStep === 5 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ display: 'inline-block', background: '#eff6ff', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Step 5
              </span>
              <h3 style={{ margin: 0 }}>Coverage Details</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>Select the life cover amount required</p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              {['25 Lakh', '50 Lakh', '1 Crore', '2 Crore', '3 Crore', 'Up to 50 Crore'].map(amount => (
                <button 
                  type="button"
                  key={amount}
                  className={`btn ${lifeCoverAmount === amount ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '140px', padding: '0.9rem 0.5rem', fontWeight: 600 }}
                  onClick={() => setLifeCoverAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setLifeStep(4)}>BACK (STEP 4)</button>
              <button type="button" className="btn btn-primary" onClick={handleLifeNext5}>NEXT - SMOKE (STEP 6)</button>
            </div>
          </div>
        )}

        {/* Step 6: Smoke (Yes or No) */}
        {lifeStep === 6 && (
          <div style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
            <span style={{ display: 'inline-block', background: '#eff6ff', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
              Step 6
            </span>
            <h3 style={{ marginBottom: '0.5rem' }}>Smoke / Tobacco</h3>
            <p style={{ marginBottom: '2rem', fontSize: '1.05rem', color: '#4b5563' }}>Do you smoke or chew tobacco?</p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <button 
                type="button"
                className={`btn ${lifeSmoker === 'Yes' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '130px', padding: '0.9rem', fontSize: '1rem', fontWeight: 700 }} 
                onClick={() => setLifeSmoker('Yes')}
              >
                YES
              </button>
              <button 
                type="button"
                className={`btn ${lifeSmoker === 'No' ? 'btn-primary' : 'btn-outline'}`} 
                style={{ width: '130px', padding: '0.9rem', fontSize: '1rem', fontWeight: 700 }} 
                onClick={() => setLifeSmoker('No')}
              >
                NO
              </button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setLifeStep(5)}>BACK (STEP 5)</button>
              <button type="button" className="btn btn-primary" onClick={handleLifeNext6}>PREVIEW &amp; CONFIRM (STEP 7)</button>
            </div>
          </div>
        )}

        {/* Step 7: Preview and Confirm */}
        {lifeStep === 7 && (
          <div style={{ maxWidth: '540px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <span style={{ display: 'inline-block', background: '#eff6ff', color: '#2563eb', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Step 7
              </span>
              <h3 style={{ margin: 0 }}>Preview and Confirm</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Please review your life insurance request details before submitting
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Plan Type:</span>
                <strong style={{ color: '#2563eb' }}>{lifePlanType ? `${lifePlanType} (${lifeSubType})` : 'Term Insurance'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Proposer Name:</span>
                <strong>{name}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Gender:</span>
                <strong>{gender}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Mobile:</span>
                <strong>{mobile}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Email:</span>
                <strong>{email}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Age:</span>
                <strong>{lifeAge}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Pincode:</span>
                <strong>{pinCode}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Qualification:</span>
                <strong>{education}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Annual Income:</span>
                <strong>{income}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#64748b' }}>Coverage Details:</span>
                <strong style={{ color: '#2563eb' }}>{lifeCoverAmount}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.2rem' }}>
                <span style={{ color: '#64748b' }}>Smoke / Tobacco:</span>
                <strong>{lifeSmoker}</strong>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-outline" onClick={() => setLifeStep(6)}>BACK (STEP 6)</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : 'CONFIRM & SUBMIT'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderVehicleSteps = () => {
    if (vehicleStep === 5) {
      return (
        <div className="step-container" style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <span style={{ fontSize: '40px', color: '#10b981' }}>✓</span>
          </div>
          <h2 style={{ color: '#0f172a', marginBottom: '1rem' }}>Booking Confirmed</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Your insurance consultation request has been submitted successfully.</p>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', display: 'inline-block', textAlign: 'left', minWidth: '300px', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Request ID</span>
              <span style={{ fontWeight: 'bold' }}>IS-{Math.floor(Math.random() * 900000) + 100000}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Status</span>
              <span style={{ color: '#10b981', fontWeight: 'bold' }}>Confirmed</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#64748b' }}>Support</span>
              <span style={{ fontWeight: 'bold' }}>Call to Expert</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-outline" onClick={() => toast.success('Connecting to expert...')}>CALL TO EXPERT</button>
            <button className="btn btn-primary" onClick={() => window.location.href = '/'}>GO TO MY ACCOUNT</button>
          </div>
        </div>
      );
    }

    return (
      <div className="step-container">
        <div className="progress-bar-container">
          <span style={{ fontWeight: vehicleStep === 1 ? 'bold' : 'normal', color: vehicleStep === 1 ? '#000' : '#666' }}>1. Details</span>
          <span style={{ fontWeight: vehicleStep === 2 ? 'bold' : 'normal', color: vehicleStep === 2 ? '#000' : '#666' }}>2. Eligibility</span>
          <span style={{ fontWeight: vehicleStep === 3 ? 'bold' : 'normal', color: vehicleStep === 3 ? '#000' : '#666' }}>3. Cover Type</span>
          <span style={{ fontWeight: vehicleStep === 4 ? 'bold' : 'normal', color: vehicleStep === 4 ? '#000' : '#666' }}>4. Review</span>
        </div>

        {vehicleStep === 1 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Customer Details</h3>
            <div className="form-group-row">
              <div className="form-group">
                <label className="required">Proposer Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input type="text" placeholder="Enter / Select" value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="required">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input type="email" placeholder="Enter / Select" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="form-group" style={{ maxWidth: '50%', marginBottom: '2rem' }}>
              <label className="required">Mobile Number</label>
              <div className="input-with-icon">
                <Phone size={18} className="input-icon" />
                <input type="tel" placeholder="Enter / Select" value={mobile} onChange={e => setMobile(e.target.value)} />
              </div>
            </div>

            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Vehicle Details</h3>
            <div className="form-group-row">
              <div className="form-group">
                <label className="required">Vehicle Number</label>
                <div className="input-with-icon">
                  <Hash size={18} className="input-icon" />
                  <input type="text" placeholder="MH 01 AB 1234" value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="required">Vehicle Type</label>
                <div className="input-with-icon">
                  <CarFront size={18} className="input-icon" />
                  <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="2-Wheeler">2-Wheeler</option>
                  <option value="4-Wheeler">4-Wheeler</option>
                  <option value="Commercial">Commercial</option>
                </select>
                </div>
              </div>
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label className="required">Manufacturer</label>
                <div className="input-with-icon">
                  <Factory size={18} className="input-icon" />
                  <input type="text" placeholder="e.g. Honda, Maruti" value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="required">Model</label>
                <div className="input-with-icon">
                  <Car size={18} className="input-icon" />
                  <input type="text" placeholder="e.g. City, Swift" value={model} onChange={e => setModel(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label className="required">Registration Date</label>
                <div className="input-with-icon">
                  <Calendar size={18} className="input-icon" />
                  <input type="date" value={registrationDate} onChange={e => setRegistrationDate(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Fuel Type</label>
                <div className="input-with-icon">
                  <FileText size={18} className="input-icon" />
                  <select value={fuelType} onChange={e => setFuelType(e.target.value)}>
                  <option value="">Select Fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="EV">EV</option>
                  <option value="CNG">CNG</option>
                </select>
                </div>
              </div>
            </div>
            <div className="form-group" style={{ maxWidth: '50%', margin: '0 auto 2rem' }}>
              <label>PIN Code</label>
              <div className="input-with-icon">
                  <MapPin size={18} className="input-icon" />
                  <input type="text" placeholder="Enter PIN" value={pinCode} onChange={e => setPinCode(e.target.value)} />
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={handleVehicleNext1}>CHECK ELIGIBILITY</button>
            </div>
          </div>
        )}

        {vehicleStep === 2 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Vehicle Insurance Options</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div className={`insurance-card ${vehicleCover === 'NIL DEP' ? 'selected' : ''}`} onClick={() => setVehicleCover('NIL DEP')}>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>NIL DEP</h4>
                <p style={{ fontSize: '0.8rem' }}>Meets configured eligibility rule for new vehicles.</p>
              </div>
              <div className={`insurance-card ${vehicleCover === 'FULL' ? 'selected' : ''}`} onClick={() => setVehicleCover('FULL')}>
                <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>FULL / COMPREHENSIVE</h4>
                <p style={{ fontSize: '0.8rem' }}>Meets configured eligibility rule for standard cover.</p>
              </div>
              <div className={`insurance-card ${vehicleCover === 'THIRD PARTY' ? 'selected' : ''}`} onClick={() => setVehicleCover('THIRD PARTY')}>
                <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>THIRD PARTY</h4>
                <p style={{ fontSize: '0.8rem' }}>Available as the baseline mandatory option.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setVehicleStep(1)}>BACK</button>
              <button className="btn btn-primary" onClick={() => {
                if (!vehicleCover) return toast.error('Please select an option');
                setVehicleStep(3);
              }}>CONTINUE</button>
            </div>
          </div>
        )}

        {vehicleStep === 3 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Choose Coverage Amount</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {['1 Lakh', '3 Lakh', '5 Lakh', '10 Lakh', '15 Lakh', '20 Lakh+'].map(amount => (
                <button 
                  key={amount}
                  className={`btn ${vehicleCoverAmount === amount ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setVehicleCoverAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setVehicleStep(2)}>BACK</button>
              <button className="btn btn-primary" onClick={() => {
                if (!vehicleCoverAmount) return toast.error('Please select a coverage amount');
                setVehicleStep(4);
              }}>NEXT - REVIEW</button>
            </div>
          </div>
        )}

        {vehicleStep === 4 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Review Your Request</h3>
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Insurance Type</span>
                <span style={{ fontWeight: 'bold' }}>Vehicle Insurance</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Vehicle Info</span>
                <span style={{ fontWeight: 'bold' }}>{manufacturer} {model} ({vehicleNumber})</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#64748b' }}>Plan Preference</span>
                <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{vehicleCover} - {vehicleCoverAmount}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Next Action</span>
                <span style={{ fontWeight: 'bold' }}>Expert Assistance</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-outline" onClick={() => setVehicleStep(3)}>BACK</button>
              <button className="btn btn-outline" onClick={() => toast.success('Connecting to expert...')}>CALL TO EXPERT</button>
              <button className="btn btn-primary" onClick={async () => {
                await handleSubmit();
                setVehicleStep(5);
              }} disabled={isSubmitting}>
                {isSubmitting ? 'CONFIRMING...' : 'CONFIRM BOOKING'}
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
      {step === 2 && insuranceType === 'Life' && renderLifeSteps()}
      {step === 2 && insuranceType === 'Vehicle' && renderVehicleSteps()}
      {step === 2 && insuranceType !== 'Life' && insuranceType !== 'Vehicle' && insuranceType !== 'Health' && renderOtherSteps()}
    </div>
  );
};

export default LeadForm;
