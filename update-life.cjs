const fs = require('fs');

let content = fs.readFileSync('src/components/LeadForm.tsx', 'utf8');

// 1. Add Life States
const lifeStates = `
  // Life Specific State
  const [lifeStep, setLifeStep] = useState(1);
  const [lifeAge, setLifeAge] = useState('');
  const [lifePlanCat, setLifePlanCat] = useState('');
  const [lifePlanDetail, setLifePlanDetail] = useState('');
  const [education, setEducation] = useState('');
  const [employment, setEmployment] = useState('');
  const [income, setIncome] = useState('');
  const [lifeCoverAmount, setLifeCoverAmount] = useState('');

  // Life Validation
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
`;

content = content.replace("const [lifeCover] = useState('');", lifeStates);

// Update handleSubmit to pass life details
content = content.replace(
  "lifeCover,",
  "lifeCover: insuranceType === 'Life' ? lifeCoverAmount : '', specificPlan: insuranceType === 'Health' ? healthCover : (lifePlanCat + ' - ' + lifePlanDetail), education, employmentType: employment, annualIncome: income,"
);

// 2. Build the renderLifeSteps function
const renderLifeSteps = `
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
              
              {/* Term */}
              <div className="insurance-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#3b82f6' }}>TERM</h4>
                {['Pure Term', 'Term + Investment'].map(plan => (
                   <label key={plan} className="medical-condition-label" style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left', border: lifePlanDetail === plan ? '1px solid #3b82f6' : '1px solid #e2e8f0' }}>
                     <input type="radio" name="lifeplan" checked={lifePlanDetail === plan} onChange={() => { setLifePlanCat('Term'); setLifePlanDetail(plan); }} style={{ display: 'none' }} />
                     {plan}
                   </label>
                ))}
              </div>

              {/* Savings */}
              <div className="insurance-card" style={{ padding: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', color: '#10b981' }}>SAVINGS</h4>
                {['Guaranteed Plans', 'Non-Guaranteed Plans'].map(plan => (
                   <label key={plan} className="medical-condition-label" style={{ display: 'block', marginBottom: '0.5rem', textAlign: 'left', border: lifePlanDetail === plan ? '1px solid #3b82f6' : '1px solid #e2e8f0' }}>
                     <input type="radio" name="lifeplan" checked={lifePlanDetail === plan} onChange={() => { setLifePlanCat('Savings'); setLifePlanDetail(plan); }} style={{ display: 'none' }} />
                     {plan}
                   </label>
                ))}
              </div>

              {/* Market Linked */}
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
`;

content = content.replace("const renderOtherSteps = () => (", renderLifeSteps + "\n\n  const renderOtherSteps = () => (");

// 3. Mount renderLifeSteps for Life insurance
content = content.replace(
  "{step === 2 && (insuranceType === 'Life' || insuranceType === 'Vehicle') && renderOtherSteps()}",
  "{step === 2 && insuranceType === 'Life' && renderLifeSteps()}\n      {step === 2 && insuranceType === 'Vehicle' && renderOtherSteps()}"
);

fs.writeFileSync('src/components/LeadForm.tsx', content, 'utf8');
console.log('Life steps injected');
