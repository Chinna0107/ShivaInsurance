const db = require('../insurancebe/db.js');

async function addColumn() {
  try {
    console.log('Adding reminder column to premium_requests...');
    await db.query(`ALTER TABLE premium_requests ADD COLUMN IF NOT EXISTS reminder TEXT;`);
    console.log('Successfully added reminder column.');
    process.exit(0);
  } catch (err) {
    console.error('Error adding column:', err);
    process.exit(1);
  }
}

addColumn();
