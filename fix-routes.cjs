const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

// Insert imports
const imports = `import ClaimRequests from './pages/admin/ClaimRequests';\nimport EmployeeClaimRequests from './pages/employee/EmployeeClaimRequests';\n`;
content = content.replace(/import DynamicPage from '.\/pages\/DynamicPage';/, imports + "import DynamicPage from './pages/DynamicPage';");

// Insert admin route
content = content.replace(/<Route path="claim-ratios" element={<ClaimRatiosManager \/>} \/>/, '<Route path="claim-ratios" element={<ClaimRatiosManager />} />\n            <Route path="claims" element={<ClaimRequests />} />');

// Insert employee route
content = content.replace(/<Route path="call-requests" element={<CallRequests \/>} \/>/, '<Route path="call-requests" element={<CallRequests />} />\n            <Route path="claims" element={<EmployeeClaimRequests />} />');

fs.writeFileSync('src/App.tsx', content, 'utf8');
console.log('Routes added');
