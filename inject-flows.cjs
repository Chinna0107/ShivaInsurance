const fs = require('fs');

let content = fs.readFileSync('src/components/LeadForm.tsx', 'utf8');

// 1. Add States for Life and Vehicle
const extraStates = `
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

  const handleLifeNext1 = () => {
    if (!name.trim()) return toast.error('Please enter Proposer Name');
    if (!email.trim() || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return toast.error('Please enter a valid email address');
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
    if (!vehicleNumber.trim()) return toast.error('Please enter Vehicle Number');
    if (!vehicleType) return toast.error('Please select Vehicle Type');
    if (!manufacturer) return toast.error('Please select Manufacturer');
    if (!model) return toast.error('Please select Model');
    if (!registrationDate) return toast.error('Please select Registration Date');
    setVehicleStep(2);
  };
`;
content = content.replace("const [lifeCover] = useState('');\n  const [vehicleNumber] = useState('');", extraStates);

// 2. Update Payload
// Replace the hardcoded health fields with dynamic ones based on insuranceType
const oldPayload = `        body: JSON.stringify({
          insuranceType,
          name,
          email,
          mobile,
          medicalHistory: medicalConditions.includes('Other Diseases') 
            ? [...medicalConditions.filter(c => c !== 'Other Diseases'), otherDiseaseName]
            : medicalConditions,
          specificPlan: healthCover,
          members: [policyMode, ages],
          date: new Date().toISOString().split('T')[0],
          vehicleNumber
        })`;

const newPayload = `        body: JSON.stringify({
          insuranceType,
          name,
          email,
          mobile,
          medicalHistory: insuranceType === 'Health' ? (medicalConditions.includes('Other Diseases') ? [...medicalConditions.filter(c => c !== 'Other Diseases'), otherDiseaseName] : medicalConditions) : [],
          specificPlan: insuranceType === 'Vehicle' ? vehicleCover : (insuranceType === 'Health' ? healthCover : (lifePlanCat + ' - ' + lifePlanDetail)),
          members: [policyMode, insuranceType === 'Life' ? lifeAge : ages],
          date: new Date().toISOString().split('T')[0],
          vehicleNumber,
          vehicleDetails: insuranceType === 'Vehicle' ? { type: vehicleType, manufacturer, model, fuelType, registrationDate, pinCode } : null,
          education: insuranceType === 'Life' ? education : undefined,
          employmentType: insuranceType === 'Life' ? employment : undefined,
          annualIncome: insuranceType === 'Life' ? income : undefined,
          lifeCover: insuranceType === 'Life' ? lifeCoverAmount : undefined,
        })`;
content = content.replace(oldPayload, newPayload);


// 3. Render Functions
const extraRenders = `
  const renderLifeSteps = () => {
    return (
      <div className="step-container">
        <div className="progress-bar-container">
          <span style={{ fontWeight: lifeStep === 1 ? 'bold' : 'normal', color: lifeStep === 1 ? '#000' : '#666' }}>1. Customer</span>
          <span style={{ fontWeight: lifeStep === 2 ? 'bold' : 'normal', color: lifeStep === 2 ? '#000' : '#666' }}>2. Plan Type</span>
          <span style={{ fontWeight: lifeStep === 3 ? 'bold' : 'normal', color: lifeStep === 3 ? '#000' : '#666' }}>3. Profile</span>
          <span style={{ fontWeight: lifeStep === 4 ? 'bold' : 'normal', color: lifeStep === 4 ? '#000' : '#666' }}>4. Income</span>
          <span style={{ fontWeight: lifeStep === 5 ? 'bold' : 'normal', color: lifeStep === 5 ? '#000' : '#666' }}>5. Cover</span>
        </div>

        {lifeStep === 1 && (
          <div>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Life Insurance - Customer Details</h3>
            <div className="form-group-row">
              <div className="form-group">
                <label>Proposer Name</label>
                <input type="text" placeholder="Enter / Select" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Enter / Select" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label>Mobile Number</label>
                <input type="tel" placeholder="Enter / Select" value={mobile} onChange={e => setMobile(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input type="text" placeholder="Enter / Select" value={lifeAge} onChange={e => setLifeAge(e.target.value)} />
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn btn-primary" onClick={handleLifeNext1}>NEXT - PLAN TYPE</button>
            </div>
          </div>
        )}

        {lifeStep === 2 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Select Life Insurance Plan Type</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div className="insurance-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#3b82f6' }}>TERM</h4>
                {['Pure Term', 'Term + Investment'].map(plan => (
                   <label key={plan} className="medical-condition-label" style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left', border: lifePlanDetail === plan ? '1px solid #3b82f6' : '1px solid #e2e8f0' }}>
                     <input type="radio" name="lifeplan" checked={lifePlanDetail === plan} onChange={() => { setLifePlanCat('Term'); setLifePlanDetail(plan); }} style={{ display: 'none' }} />
                     {plan}
                   </label>
                ))}
              </div>
              <div className="insurance-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#10b981' }}>SAVINGS</h4>
                {['Guaranteed Plans', 'Non-Guaranteed Plans'].map(plan => (
                   <label key={plan} className="medical-condition-label" style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left', border: lifePlanDetail === plan ? '1px solid #3b82f6' : '1px solid #e2e8f0' }}>
                     <input type="radio" name="lifeplan" checked={lifePlanDetail === plan} onChange={() => { setLifePlanCat('Savings'); setLifePlanDetail(plan); }} style={{ display: 'none' }} />
                     {plan}
                   </label>
                ))}
              </div>
              <div className="insurance-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#8b5cf6' }}>MARKET LINKED</h4>
                {['Long-Term Investment', 'Guaranteed Savings', 'Money Back Plans'].map(plan => (
                   <label key={plan} className="medical-condition-label" style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left', border: lifePlanDetail === plan ? '1px solid #3b82f6' : '1px solid #e2e8f0' }}>
                     <input type="radio" name="lifeplan" checked={lifePlanDetail === plan} onChange={() => { setLifePlanCat('Market Linked'); setLifePlanDetail(plan); }} style={{ display: 'none' }} />
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
              <label>Education</label>
              <select value={education} onChange={e => setEducation(e.target.value)}>
                <option value="">Select Education</option>
                <option value="Graduate & Above">Graduate & Above</option>
                <option value="12th Pass">12th Pass</option>
                <option value="10th Pass">10th Pass</option>
                <option value="Below 10th">Below 10th</option>
              </select>
            </div>
            <div className="form-group" style={{ marginBottom: '2rem' }}>
              <label>Employment</label>
              <select value={employment} onChange={e => setEmployment(e.target.value)}>
                <option value="">Select Employment</option>
                <option value="Salaried">Salaried</option>
                <option value="Self Employed">Self Employed</option>
              </select>
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
                  className={\`btn \${income === inc ? 'btn-primary' : 'btn-outline'}\`}
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
                  className={\`btn \${lifeCoverAmount === amount ? 'btn-primary' : 'btn-outline'}\`}
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
                handleSubmit();
              }} disabled={isSubmitting}>
                {isSubmitting ? 'SUBMITTING...' : 'REVIEW & CONFIRM'}
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
          <span style={{ fontWeight: vehicleStep === 3 ? 'bold' : 'normal', color: vehicleStep === 3 ? '#000' : '#666' }}>3. Review</span>
        </div>

        {vehicleStep === 1 && (
          <div>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Vehicle Details</h3>
            <div className="form-group-row">
              <div className="form-group">
                <label>Vehicle Number</label>
                <input type="text" placeholder="MH 01 AB 1234" value={vehicleNumber} onChange={e => setVehicleNumber(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Vehicle Type</label>
                <select value={vehicleType} onChange={e => setVehicleType(e.target.value)}>
                  <option value="">Select Type</option>
                  <option value="2-Wheeler">2-Wheeler</option>
                  <option value="4-Wheeler">4-Wheeler</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label>Manufacturer</label>
                <input type="text" placeholder="e.g. Honda, Maruti" value={manufacturer} onChange={e => setManufacturer(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input type="text" placeholder="e.g. City, Swift" value={model} onChange={e => setModel(e.target.value)} />
              </div>
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label>Registration Date</label>
                <input type="date" value={registrationDate} onChange={e => setRegistrationDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Fuel Type</label>
                <select value={fuelType} onChange={e => setFuelType(e.target.value)}>
                  <option value="">Select Fuel</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="EV">EV</option>
                  <option value="CNG">CNG</option>
                </select>
              </div>
            </div>
            <div className="form-group" style={{ maxWidth: '50%', margin: '0 auto 2rem' }}>
              <label>PIN Code</label>
              <input type="text" placeholder="Enter PIN" value={pinCode} onChange={e => setPinCode(e.target.value)} />
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
              <div className="insurance-card" onClick={() => setVehicleCover('NIL DEP')} style={{ border: vehicleCover === 'NIL DEP' ? '2px solid #3b82f6' : '2px solid transparent' }}>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>NIL DEP</h4>
                <p style={{ fontSize: '0.8rem' }}>Meets configured eligibility rule for new vehicles.</p>
              </div>
              <div className="insurance-card" onClick={() => setVehicleCover('FULL')} style={{ border: vehicleCover === 'FULL' ? '2px solid #3b82f6' : '2px solid transparent' }}>
                <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>FULL / COMPREHENSIVE</h4>
                <p style={{ fontSize: '0.8rem' }}>Meets configured eligibility rule for standard cover.</p>
              </div>
              <div className="insurance-card" onClick={() => setVehicleCover('THIRD PARTY')} style={{ border: vehicleCover === 'THIRD PARTY' ? '2px solid #3b82f6' : '2px solid transparent' }}>
                <h4 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>THIRD PARTY</h4>
                <p style={{ fontSize: '0.8rem' }}>Available as the baseline mandatory option.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button className="btn btn-outline" onClick={() => setVehicleStep(1)}>BACK</button>
              <button className="btn btn-primary" onClick={() => {
                if (!vehicleCover) return toast.error('Please select a cover type');
                setVehicleStep(3);
              }}>CONTINUE</button>
            </div>
          </div>
        )}

        {vehicleStep === 3 && (
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
                <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{vehicleCover}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Next Action</span>
                <span style={{ fontWeight: 'bold' }}>Expert Assistance</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-outline" onClick={() => setVehicleStep(2)}>BACK</button>
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
`;

content = content.replace("const renderOtherSteps = () => (", extraRenders + "\n\n  const renderOtherSteps = () => (");

content = content.replace(
  "{step === 2 && (insuranceType === 'Life' || insuranceType === 'Vehicle') && renderOtherSteps()}",
  "{step === 2 && insuranceType === 'Life' && renderLifeSteps()}\n      {step === 2 && insuranceType === 'Vehicle' && renderVehicleSteps()}\n      {step === 2 && insuranceType !== 'Life' && insuranceType !== 'Vehicle' && insuranceType !== 'Health' && renderOtherSteps()}"
);

fs.writeFileSync('src/components/LeadForm.tsx', content, 'utf8');
