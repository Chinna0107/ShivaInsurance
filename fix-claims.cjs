const fs = require('fs');
const path = 'src/pages/ClaimsPage.tsx';
let content = fs.readFileSync(path, 'utf8');

const newFormState = `  const [formData, setFormData] = useState({
    policyNumber: '',
    registeredName: '',
    mobileNumber: '',
    emailId: '',
    claimIssue: '',
    planType: 'Health',
    name: '',
    phone: '',
    policyNo: '',
    claimType: 'health',
    hospitalName: '',
    reason: ''
  });`;

content = content.replace(/  const \[formData, setFormData\] = useState\(\{[\s\S]*?\}\);/, newFormState);
fs.writeFileSync(path, content, 'utf8');
console.log('fixed');
