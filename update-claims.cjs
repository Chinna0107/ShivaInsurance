const fs = require('fs');

const path = 'src/pages/ClaimsPage.tsx';
let content = fs.readFileSync(path, 'utf8');

const newFormState = `  const [formData, setFormData] = useState({
    policyNumber: '',
    registeredName: '',
    mobileNumber: '',
    emailId: '',
    claimIssue: '',
    planType: 'Health'
  });`;

content = content.replace(/  const \[formData, setFormData\] = useState\(\{[\s\S]*?\}\);/, newFormState);

const newSubmit = `  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        alert("Claim request received successfully! We will contact you shortly.");
        setFormData({
          policyNumber: '',
          registeredName: '',
          mobileNumber: '',
          emailId: '',
          claimIssue: '',
          planType: 'Health'
        });
      } else {
        alert("Failed to submit claim request. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the request.");
    }
  };`;

content = content.replace(/  const handleSubmit = \([\s\S]*?\}\);/, newSubmit).replace(/    \}, 500\);\n  \};\n/, '');

const newFormHTML = `
        {/* NEW TOP CLAIM SUPPORT FORM */}
        <div className="decoder-flex-layout" style={{ marginBottom: '3rem' }}>
          <div style={{ width: '100%', background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h2>Claims Support</h2>
            <p style={{ color: 'var(--text-gray)', marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Please fill out the details below to initiate a claim request.
            </p>
            
            <form className="claims-form" onSubmit={handleSubmit}>
              <div className="form-group-row">
                <div className="form-group">
                  <label>Policy Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter / Select" 
                    value={formData.policyNumber}
                    onChange={e => setFormData({ ...formData, policyNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Registered Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Enter / Select" 
                    value={formData.registeredName}
                    onChange={e => setFormData({ ...formData, registeredName: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group">
                  <label>Registered Mobile Number</label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="Enter / Select" 
                    value={formData.mobileNumber}
                    onChange={e => setFormData({ ...formData, mobileNumber: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Registered Email ID</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="Enter / Select" 
                    value={formData.emailId}
                    onChange={e => setFormData({ ...formData, emailId: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-row">
                <div className="form-group" style={{ flex: 2 }}>
                  <label>Claim Issue / Reason</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Describe the issue" 
                    value={formData.claimIssue}
                    onChange={e => setFormData({ ...formData, claimIssue: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Plan Type</label>
                  <select 
                    value={formData.planType}
                    onChange={e => setFormData({ ...formData, planType: e.target.value })}
                  >
                    <option value="Life">Life</option>
                    <option value="Health">Health</option>
                    <option value="Vehicle">Vehicle</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontWeight: 'bold' }}>
                SUBMIT CLAIM REQUEST
              </button>
            </form>
          </div>
        </div>
`;

// Insert after the Header Hero
content = content.replace(/<\/div>\n\n        \{\/\* Dynamic section by type \*\/\}/, '</div>\n' + newFormHTML + '\n        {/* Dynamic section by type */}');

fs.writeFileSync(path, content, 'utf8');
console.log('updated');
