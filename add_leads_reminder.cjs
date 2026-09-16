require('dotenv').config({ path: '../insurancebe/.env' });
const db = require('../insurancebe/db.js');
const fs = require('fs');

async function run() {
  try {
    console.log('Adding reminder column to leads...');
    await db.query(`ALTER TABLE leads ADD COLUMN IF NOT EXISTS reminder TEXT`);
    console.log('Added column successfully.');

    const routePath = '../insurancebe/routes/leads.js';
    let code = fs.readFileSync(routePath, 'utf8');
    if (!code.includes('/:id/reminder')) {
      const reminderRoute = `
// PUT update lead reminder
router.put('/:id/reminder', async (req, res) => {
  try {
    const { id } = req.params;
    const { reminder } = req.body;
    
    const result = await db.query(
      'UPDATE leads SET reminder = $1 WHERE id = $2 RETURNING *',
      [reminder, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating lead reminder:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

`;
      code = code.replace('module.exports = router;', reminderRoute + 'module.exports = router;');
      fs.writeFileSync(routePath, code);
      console.log('Added PUT /:id/reminder route to leads.js');
    }
    process.exit(0);
  } catch(e) {
    console.error(e);
    process.exit(1);
  }
}
run();
