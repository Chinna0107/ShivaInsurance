const fs = require('fs');

let content = fs.readFileSync('src/components/LeadForm.tsx', 'utf8');

// 1. Add Vehicle States
const vehicleStates = `
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

  const handleVehicleNext1 = () => {
    if (!vehicleNumber.trim()) return toast.error('Please enter Vehicle Number');
    if (!vehicleType) return toast.error('Please select Vehicle Type');
    if (!manufacturer) return toast.error('Please select Manufacturer');
    if (!model) return toast.error('Please select Model');
    if (!registrationDate) return toast.error('Please select Registration Date');
    setVehicleStep(2);
  };
`;

content = content.replace("const [vehicleNumber] = useState('');", vehicleStates);

// Add vehicle details to handleSubmit
content = content.replace(
  "vehicleNumber",
  "vehicleNumber, vehicleType, manufacturer, model, fuelType, registrationDate, pinCode, specificPlan: insuranceType === 'Vehicle' ? vehicleCover : (insuranceType === 'Health' ? healthCover : (lifePlanCat + ' - ' + lifePlanDetail))"
);
// Wait, specificPlan was already replaced. 
// Let's use a robust replace for the handleSubmit payload
const payloadStart = "specificPlan: insuranceType === 'Health' ? healthCover : (lifePlanCat + ' - ' + lifePlanDetail)";
const payloadEnd = "specificPlan: insuranceType === 'Vehicle' ? vehicleCover : (insuranceType === 'Health' ? healthCover : (lifePlanCat + ' - ' + lifePlanDetail))";
content = content.replace(payloadStart, payloadEnd);

const payloadVehStart = "vehicleNumber\n        })";
const payloadVehEnd = "vehicleNumber, vehicleDetails: { type: vehicleType, manufacturer, model, fuelType, registrationDate, pinCode }\n        })";
content = content.replace(payloadVehStart, payloadVehEnd);


// 2. Build the renderVehicleSteps function
const renderVehicleSteps = `
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
            <button className="btn btn-outline">CALL TO EXPERT</button>
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
              <button className="btn btn-outline">CALL TO EXPERT</button>
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

content = content.replace("const renderOtherSteps = () => (", renderVehicleSteps + "\n\n  const renderOtherSteps = () => (");

// 3. Mount renderVehicleSteps for Vehicle insurance
content = content.replace(
  "{step === 2 && insuranceType === 'Vehicle' && renderOtherSteps()}",
  "{step === 2 && insuranceType === 'Vehicle' && renderVehicleSteps()}"
);

fs.writeFileSync('src/components/LeadForm.tsx', content, 'utf8');
console.log('Vehicle steps injected');
