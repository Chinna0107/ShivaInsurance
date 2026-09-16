const fs = require('fs');
const routePath = '../insurancebe/routes/leads.js';
let code = fs.readFileSync(routePath, 'utf8');

code = code.replace(
  "const result = await db.query('UPDATE leads SET reminder =  WHERE id =  RETURNING *', [reminder, id]);",
  "const result = await db.query('UPDATE leads SET reminder = $1 WHERE id = $2 RETURNING *', [reminder, id]);"
);

fs.writeFileSync(routePath, code);
console.log('Fixed leads route');
