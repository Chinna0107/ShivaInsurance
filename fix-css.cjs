const fs = require('fs');
let ar = fs.readFileSync('src/pages/admin/ClaimRequests.tsx', 'utf8');
ar = ar.replace("import './Admin.css';", "");
fs.writeFileSync('src/pages/admin/ClaimRequests.tsx', ar, 'utf8');
console.log('fixed css');
