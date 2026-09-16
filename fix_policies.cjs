const fs = require('fs');
const filePath = '/Users/hemanthkancharla/Documents/zewotech/insurancebe/routes/policies.js';
let code = fs.readFileSync(filePath, 'utf8');

code = code.replace(
  'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
  'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *'
);
code = code.replace(
  'plan_type, insurer_type) VALUES',
  'plan_type, insurer_type, policy_link) VALUES'
);

code = code.replace(
  'insurer_type = $10 WHERE id = $11 RETURNING *',
  'insurer_type = $10, policy_link = $11 WHERE id = $12 RETURNING *'
);

code = code.replace(
  'insurer_type = $9 WHERE id = $10 RETURNING *',
  'insurer_type = $9, policy_link = $10 WHERE id = $11 RETURNING *'
);

fs.writeFileSync(filePath, code);
console.log('Fixed policies.js successfully!');
