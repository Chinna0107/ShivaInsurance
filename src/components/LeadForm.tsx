
import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';
import './LeadForm.css';
import { Shield, Heart, Car, User, Mail, Phone, Calendar, Hash, Factory, CarFront, FileText, MapPin, Briefcase, GraduationCap, PiggyBank, TrendingUp } from 'lucide-react';


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
  
  // Life Specific State
  const [lifeStep, setLifeStep] = useState(1);
  const [lifeAge, setLifeAge] = useState('');
  const [lifePlanCat, setLifePlanCat] = useState('');
  const [lifePlanDetail, setLifePlanDetail] = useState('');
  const [education, setEducation] = useState('');
  const [employment, setEmployment] = useState('');
  const [income, setIncome] = useState('');
  const [lifeCoverAmount, setLifeCoverAmount] = useState('');

  // Vehicle Specific State
  const [vehicleStep, setVehicleStep] = useState(1);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [registrationDate, setRegistrationDate] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [vehicleCover, setVehicleCover] = useState('');
  const [vehicleCoverAmount, setVehicleCoverAmount] = useState('');

  const handleLifeNext1 = () => {
    if (!name.trim()) return toast.error('Please enter Proposer Name');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Please enter a valid email address');
    if (!mobile.trim() || !/^[0-9]{10}$/.test(mobile)) return toast.error('Please enter a valid 10-digit mobile number');
    if (!lifeAge.trim()) return toast.error('Please enter Age');
    setLifeStep(2);
  };
  const handleLifeNext2 = () => {
    if (!lifePlanCat || !lifePlanDetail) return toast.error('Please select a plan type');
    setLifeStep(3);
  };
  const handleLifeNext3 = () => {
    if (!education || !employment) return toast.error('Please select education and employment');
    setLifeStep(4);
  };
  const handleLifeNext4 = () => {
    if (!income) return toast.error('Please select an income bracket');
    setLifeStep(5);
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
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error('Please enter a valid email address');
    if (!mobile.trim() || !/^[0-9]{10}$/.test(mobile)) return toast.error('Please enter a valid 10-digit mobile number');
    if (!ages.trim()) return toast.error('Please enter Ages');
    setHealthStep(2);
  };

  const handleNextStep2 = () => {
    if (medicalConditions.length === 0) return toast.error('Please select at least one medical condition');
    if (medicalConditions.includes('Other Diseases') && !otherDiseaseName.trim()) {
      return toast.error('Please enter the disease name');
    }
    setHealthStep(3);
  };

  const handleNextStep3 = () => {
    if (!healthCover) return toast.error('Please select a cover amount');
    setHealthStep(4);
  };

  const handleNextStep4 = () => {
    if (!smoker) return toast.error('Please select an option');
    setHealthStep(5);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: mobile,
          email,
          type: insuranceType.toLowerCase() || 'health',
          smoker,
          medicalHistory: insuranceType === 'Health' ? (medicalConditions.includes('Other Diseases') ? [...medicalConditions.filter(c => c !== 'Other Diseases'), otherDiseaseName] : medicalConditions) : [],
          specificPlan: insuranceType === 'Vehicle' ? `${vehicleCover} - ${vehicleCoverAmount}` : (insuranceType === 'Health' ? healthCover : (lifePlanCat + ' - ' + lifePlanDetail)),
          members: [policyMode, insuranceType === 'Life' ? lifeAge : ages],
          date: new Date().toISOString().split('T')[0],
          vehicleNumber,
          vehicleType: insuranceType === 'Vehicle' ? vehicleType : undefined,
          vehicleManufacturer: insuranceType === 'Vehicle' ? manufacturer : undefined,
          vehicleModel: insuranceType === 'Vehicle' ? model : undefined,
          vehicleFuelType: insuranceType === 'Vehicle' ? fuelType : undefined,
          vehicleRegDate: insuranceType === 'Vehicle' ? registrationDate : undefined,
          vehiclePincode: insuranceType === 'Vehicle' ? pinCode : undefined,
          education: insuranceType === 'Life' ? education : undefined,
          employmentType: insuranceType === 'Life' ? employment : undefined,
          annualIncome: insuranceType === 'Life' ? income : undefined,
          lifeCover: insuranceType === 'Life' ? lifeCoverAmount : undefined,
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
              <button className={`btn ${policyMode === 'Family' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setPolicyMode('Family')}>FAMILY</button>
              <button className={`btn ${policyMode === 'Individual' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setPolicyMode('Individual')}>INDIVIDUAL</button>
            </div>
            <div className="form-group-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="required">Proposer Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input type="text" placeholder="Enter / Select" value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="required">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input type="email" placeholder="Enter / Select" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="form-group-row" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="required">Mobile Number</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input type="tel" placeholder="Enter / Select" value={mobile} onChange={e => setMobile(e.target.value)} />
                </div>
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="required">Age / Family Members Ages</label>
                <div className="input-with-icon">
                  <Calendar size={18} className="input-icon" />
                  <input type="text" placeholder="Husband, Wife, Children, Father, Mother" value={ages} onChange={e => setAges(e.target.value)} />
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={handleNextStep1}>NEXT - MEDICAL DETAILS</button>
            </div>
          </div>
        )}

        {healthStep === 2 && (
          <div>
            <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Medical Details</h3>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>For family cover, capture conditions member-wise (Member 1 to Member 8).</p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {['Diabetes', 'Blood Pressure', 'Asthma', 'Cholesterol', 'Other Diseases', 'None of These'].map(condition => (
                <label key={condition} className="medical-condition-label" style={{ border: medicalConditions.includes(condition) ? "1px solid #3b82f6" : "1px solid #e2e8f0" }}>
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
              <button className="btn btn-primary" onClick={handleNextStep2}>NEXT - COVER AMOUNT</button>
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
                  className={`btn ${healthCover === amount ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '120px' }}
                  onClick={() => setHealthCover(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setHealthStep(2)}>BACK</button>
              <button className="btn btn-primary" onClick={handleNextStep3}>NEXT</button>
            </div>
          </div>
        )}

        {healthStep === 4 && (
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Lifestyle Question</h3>
            <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Do you smoke or chew tobacco?</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              <button className={`btn ${smoker === 'Yes' ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100px' }} onClick={() => setSmoker('Yes')}>YES</button>
              <button className={`btn ${smoker === 'No' ? 'btn-primary' : 'btn-outline'}`} style={{ width: '100px' }} onClick={() => setSmoker('No')}>NO</button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setHealthStep(3)}>BACK</button>
              <button className="btn btn-primary" onClick={handleNextStep4}>REVIEW & CONFIRM</button>
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

  
  const renderLifeSteps = () => {
    return (
      <div className="step-container">
        <div className="progress-bar-container">
          <span style={{ fontWeight: lifeStep === 1 ? 'bold' : 'normal', color: lifeStep === 1 ? '#000' : '#666' }}>1. Customer</span>
          <span style={{ fontWeight: lifeStep === 2 ? 'bold' : 'normal', color: lifeStep === 2 ? '#000' : '#666' }}>2. Plan</span>
          <span style={{ fontWeight: lifeStep === 3 ? 'bold' : 'normal', color: lifeStep === 3 ? '#000' : '#666' }}>3. Profile</span>
          <span style={{ fontWeight: lifeStep === 4 ? 'bold' : 'normal', color: lifeStep === 4 ? '#000' : '#666' }}>4. Income</span>
          <span style={{ fontWeight: lifeStep === 5 ? 'bold' : 'normal', color: lifeStep === 5 ? '#000' : '#666' }}>5. Cover</span>
          <span style={{ fontWeight: lifeStep === 6 ? 'bold' : 'normal', color: lifeStep === 6 ? '#000' : '#666' }}>6. Review</span>
        </div>

        {lifeStep === 1 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Life Insurance - Customer Details</h3>
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
            <div className="form-group-row">
              <div className="form-group">
                <label className="required">Mobile Number</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input type="tel" placeholder="Enter / Select" value={mobile} onChange={e => setMobile(e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label className="required">Age</label>
                <div className="input-with-icon">
                  <Calendar size={18} className="input-icon" />
                  <input type="text" placeholder="Enter / Select" value={lifeAge} onChange={e => setLifeAge(e.target.value)} />
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={handleLifeNext1}>NEXT - PLAN TYPE</button>
            </div>
          </div>
        )}

        {lifeStep === 2 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 600 }}>Select Life Insurance Plan Type</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              {/* Term */}
              <div className="insurance-card" style={{ padding: '1.5rem', borderTop: '4px solid #3b82f6', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#eff6ff', padding: '0.75rem', borderRadius: '50%', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Shield size={24} />
                  </div>
                  <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', fontWeight: 700 }}>TERM</h4>
                </div>
                {['Pure Term', 'Term + Investment'].map(plan => (
                   <label key={plan} className={`plan-label ${lifePlanDetail === plan ? 'selected' : ''}`} onClick={() => { setLifePlanCat('Term'); setLifePlanDetail(plan); }}>
                     <div className="radio-circle"></div>
                     {plan}
                   </label>
                ))}
              </div>

              {/* Savings */}
              <div className="insurance-card" style={{ padding: '1.5rem', borderTop: '4px solid #10b981', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#ecfdf5', padding: '0.75rem', borderRadius: '50%', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PiggyBank size={24} />
                  </div>
                  <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', fontWeight: 700 }}>SAVINGS</h4>
                </div>
                {['Guaranteed Plans', 'Non-Guaranteed Plans'].map(plan => (
                   <label key={plan} className={`plan-label ${lifePlanDetail === plan ? 'selected' : ''}`} onClick={() => { setLifePlanCat('Savings'); setLifePlanDetail(plan); }}>
                     <div className="radio-circle"></div>
                     {plan}
                   </label>
                ))}
              </div>

              {/* Market Linked */}
              <div className="insurance-card" style={{ padding: '1.5rem', borderTop: '4px solid #8b5cf6', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: '#f5f3ff', padding: '0.75rem', borderRadius: '50%', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp size={24} />
                  </div>
                  <h4 style={{ margin: 0, color: '#1e293b', fontSize: '1.2rem', fontWeight: 700 }}>MARKET LINKED</h4>
                </div>
                {['Long-Term Investment', 'Guaranteed Savings', 'Money Back Plans'].map(plan => (
                   <label key={plan} className={`plan-label ${lifePlanDetail === plan ? 'selected' : ''}`} onClick={() => { setLifePlanCat('Market Linked'); setLifePlanDetail(plan); }}>
                     <div className="radio-circle"></div>
                     {plan}
                   </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setLifeStep(1)}>BACK</button>
              <button className="btn btn-primary" onClick={handleLifeNext2}>NEXT - PROFILE</button>
            </div>
          </div>
        )}

        {lifeStep === 3 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Education & Employment Details</h3>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="required">Education</label>
              <div className="input-with-icon">
                  <GraduationCap size={18} className="input-icon" />
                  <select value={education} onChange={e => setEducation(e.target.value)}>
                <option value="">Select Education</option>
                <option value="Graduate & Above">Graduate & Above</option>
                <option value="12th Pass">12th Pass</option>
                <option value="10th Pass">10th Pass</option>
                <option value="Below 10th">Below 10th</option>
              </select>
                </div>
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label className="required">Employment</label>
              <div className="input-with-icon">
                  <Briefcase size={18} className="input-icon" />
                  <select value={employment} onChange={e => setEmployment(e.target.value)}>
                <option value="">Select Employment</option>
                <option value="Salaried">Salaried</option>
                <option value="Self Employed">Self Employed</option>
              </select>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setLifeStep(2)}>BACK</button>
              <button className="btn btn-primary" onClick={handleLifeNext3}>NEXT - INCOME</button>
            </div>
          </div>
        )}

        {lifeStep === 4 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Annual Income</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {['Less than 2L', '2L - 2.9L', '3L - 3.9L', '4L - 4.9L', '5L - 7.9L', '8L - 9.9L', '10L - 15L', '15L & Above'].map(inc => (
                <button 
                  key={inc}
                  className={`btn ${income === inc ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setIncome(inc)}
                >
                  {inc}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setLifeStep(3)}>BACK</button>
              <button className="btn btn-primary" onClick={handleLifeNext4}>NEXT - COVER</button>
            </div>
          </div>
        )}

        {lifeStep === 5 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Choose Life Cover Amount</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginBottom: '2rem' }}>
              {['25 Lakh', '50 Lakh', '1 Crore', '2 Crore', '3 Crore', 'Up to 50 Crore'].map(amount => (
                <button 
                  key={amount}
                  className={`btn ${lifeCoverAmount === amount ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setLifeCoverAmount(amount)}
                >
                  {amount}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setLifeStep(4)}>BACK</button>
              <button className="btn btn-primary" onClick={() => {
                if (!lifeCoverAmount) return toast.error('Please select a cover amount');
                setLifeStep(6);
              }}>
                REVIEW
              </button>
            </div>
          </div>
        )}

        {lifeStep === 6 && (
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Review & Confirm Your Request</h3>
            <div style={{ background: '#f5f5f5', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><strong>Name:</strong> {name}</div>
                <div><strong>Email:</strong> {email}</div>
                <div><strong>Mobile:</strong> {mobile}</div>
                <div><strong>Age:</strong> {lifeAge}</div>
                <div><strong>Plan Category:</strong> {lifePlanCat}</div>
                <div><strong>Specific Plan:</strong> {lifePlanDetail}</div>
                <div><strong>Education:</strong> {education}</div>
                <div><strong>Employment:</strong> {employment}</div>
                <div><strong>Annual Income:</strong> {income}</div>
                <div><strong>Cover Amount:</strong> {lifeCoverAmount}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setLifeStep(5)}>BACK</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
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
