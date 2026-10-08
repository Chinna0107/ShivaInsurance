const fs = require('fs');

// Fix LeadForm unused vars
let lf = fs.readFileSync('src/components/LeadForm.tsx', 'utf8');
lf = lf.replace("import { useNavigate } from 'react-router-dom';", "");
lf = lf.replace("const [lifeCover, setLifeCover] = useState('');", "const [lifeCover] = useState('');");
lf = lf.replace("const [vehicleNumber, setVehicleNumber] = useState('');", "const [vehicleNumber] = useState('');");
fs.writeFileSync('src/components/LeadForm.tsx', lf, 'utf8');

// Fix ClaimsPage
let cp = fs.readFileSync('src/pages/ClaimsPage.tsx', 'utf8');
const missingFields = `
          name: '',
          phone: '',
          policyNo: '',
          claimType: 'health',
          hospitalName: '',
          reason: ''`;
cp = cp.replace(/planType: 'Health'\n\s+\}\);/, "planType: 'Health'," + missingFields + "\n        });");
fs.writeFileSync('src/pages/ClaimsPage.tsx', cp, 'utf8');

// Fix axios in admin
let ar = fs.readFileSync('src/pages/admin/ClaimRequests.tsx', 'utf8');
ar = ar.replace("import axios from 'axios';", "");
ar = ar.replace(/await axios\.get\('([^']+)'\);/g, "await (await fetch('$1')).json();");
ar = ar.replace(/setClaims\(response\.data\);/g, "setClaims(response);");
ar = ar.replace(/await axios\.put\(`([^`]+)`,\s*\{\s*status:\s*newStatus\s*\}\);/g, "await fetch(`$1`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ status: newStatus }) });");
fs.writeFileSync('src/pages/admin/ClaimRequests.tsx', ar, 'utf8');

// Fix axios in employee
let er = fs.readFileSync('src/pages/employee/EmployeeClaimRequests.tsx', 'utf8');
er = er.replace("import axios from 'axios';", "");
er = er.replace(/await axios\.get\('([^']+)'\);/g, "await (await fetch('$1')).json();");
er = er.replace(/setClaims\(response\.data\);/g, "setClaims(response);");
er = er.replace(/await axios\.put\(`([^`]+)`,\s*\{\s*status:\s*newStatus\s*\}\);/g, "await fetch(`$1`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ status: newStatus }) });");
fs.writeFileSync('src/pages/employee/EmployeeClaimRequests.tsx', er, 'utf8');

console.log('fixed');
