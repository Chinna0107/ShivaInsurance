const fs = require('fs');
const path = require('path');

const backendPath = '/Users/hemanthkancharla/insurancebe';

// 1. Create routes/claimRatios.js
const routesPath = path.join(backendPath, 'routes');
if (!fs.existsSync(routesPath)) {
  fs.mkdirSync(routesPath, { recursive: true });
}

const claimRatiosCode = `const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM claim_ratios ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching claim ratios:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { category, company, story } = req.body;
    const imageUrl = req.file ? \`/uploads/\${req.file.filename}\` : null;
    
    const result = await pool.query(
      'INSERT INTO claim_ratios (category, company, story, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [category, company, story, imageUrl]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating claim ratio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { category, company, story } = req.body;
    
    let query = 'UPDATE claim_ratios SET category = $1, company = $2, story = $3';
    const values = [category, company, story];
    let queryIndex = 4;
    
    if (req.file) {
      query += \`, image_url = $\${queryIndex}\`;
      values.push(\`/uploads/\${req.file.filename}\`);
      queryIndex++;
    }
    
    query += \` WHERE id = $\${queryIndex} RETURNING *\`;
    values.push(id);
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Claim ratio not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating claim ratio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM claim_ratios WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Claim ratio not found' });
    }
    
    res.json({ message: 'Claim ratio deleted successfully' });
  } catch (error) {
    console.error('Error deleting claim ratio:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
`;

fs.writeFileSync(path.join(routesPath, 'claimRatios.js'), claimRatiosCode);
console.log('Created routes/claimRatios.js');

// 2. Update index.js
const indexPath = path.join(backendPath, 'index.js');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  
  if (!indexContent.includes('/api/claim-ratios')) {
    // Attempt to insert the route near other routes
    const claimRatiosRouteCode = \`
const claimRatiosRoutes = require('./routes/claimRatios');
app.use('/api/claim-ratios', claimRatiosRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
\`;

    // Try to find app.listen or last app.use
    const appListenMatch = indexContent.match(/app\\.listen\\(/);
    if (appListenMatch) {
      indexContent = indexContent.substring(0, appListenMatch.index) + claimRatiosRouteCode + indexContent.substring(appListenMatch.index);
    } else {
      indexContent += claimRatiosRouteCode;
    }
    
    fs.writeFileSync(indexPath, indexContent);
    console.log('Updated index.js');
  } else {
    console.log('index.js already contains claim-ratios route');
  }
}

// 3. Update db-init.js (if exists)
const dbInitPath = path.join(backendPath, 'db-init.js');
if (fs.existsSync(dbInitPath)) {
  let dbInitContent = fs.readFileSync(dbInitPath, 'utf8');
  
  if (!dbInitContent.includes('claim_ratios')) {
    const tableCreationQuery = \`
  await pool.query(\\\`
    CREATE TABLE IF NOT EXISTS claim_ratios (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      category VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      story TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  \\\`);
  console.log('Claim Ratios table ensured.');
\`;

    // Try to insert it before the catch block or at the end of the try block
    const catchMatch = dbInitContent.match(/catch\\s*\\(/);
    if (catchMatch) {
      dbInitContent = dbInitContent.substring(0, catchMatch.index - 1) + tableCreationQuery + dbInitContent.substring(catchMatch.index - 1);
      fs.writeFileSync(dbInitPath, dbInitContent);
      console.log('Updated db-init.js');
    } else {
      console.log('Could not find where to inject into db-init.js');
    }
  } else {
    console.log('db-init.js already contains claim_ratios table creation');
  }
}

console.log('Backend update script finished.');
