const fs = require('fs');

let content = fs.readFileSync('src/components/LeadForm.tsx', 'utf8');

const oldRender = content.substring(
  content.indexOf('const renderVehicleSteps = () => {'),
  content.indexOf('return (', content.indexOf('  const renderOtherSteps = () => (')) // Stop before renderOtherSteps returns
);

// We'll just replace the entire renderVehicleSteps definition!
const newRenderVehicleSteps = `const renderVehicleSteps = () => {
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
              <div className={\`insurance-card \${vehicleCover === 'NIL DEP' ? 'selected' : ''}\`} onClick={() => setVehicleCover('NIL DEP')}>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>NIL DEP</h4>
                <p style={{ fontSize: '0.8rem' }}>Meets configured eligibility rule for new vehicles.</p>
              </div>
              <div className={\`insurance-card \${vehicleCover === 'FULL' ? 'selected' : ''}\`} onClick={() => setVehicleCover('FULL')}>
                <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>FULL / COMPREHENSIVE</h4>
                <p style={{ fontSize: '0.8rem' }}>Meets configured eligibility rule for standard cover.</p>
              </div>
              <div className={\`insurance-card \${vehicleCover === 'THIRD PARTY' ? 'selected' : ''}\`} onClick={() => setVehicleCover('THIRD PARTY')}>
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
                  className={\`btn \${vehicleCoverAmount === amount ? 'btn-primary' : 'btn-outline'}\`}
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
`;

const newContent = content.substring(0, content.indexOf('const renderVehicleSteps = () => {')) + newRenderVehicleSteps + '\n\n  const renderOtherSteps = () => (' + content.substring(content.indexOf('  const renderOtherSteps = () => (') + '  const renderOtherSteps = () => ('.length);

fs.writeFileSync('src/components/LeadForm.tsx', newContent, 'utf8');
