const fs = require('fs');
const path = require('path');

const DIRS = [
  path.join(__dirname, 'src/pages/admin'),
  path.join(__dirname, 'src/pages/employee')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace <table style={...}> with <table className="admin-table">
  content = content.replace(/<table[^>]*style={{[^}]*}}[^>]*>/g, '<table className="admin-table">');

  // Replace <tr style={{ ... }}> with <tr>
  content = content.replace(/<tr\s+style={{[^}]*}}\s*>/g, '<tr>');
  content = content.replace(/<tr\s+style={{[^}]*}}\s*onMouseEnter[^>]*>/g, '<tr>');
  
  // Actually, tr often has keys. So <tr key={...} style={...}>
  content = content.replace(/<tr([^>]*)style={{[^}]*}}([^>]*)>/g, '<tr$1$2>');
  // Clean up empty onMouseEnter/Leave
  content = content.replace(/onMouseEnter=\{[^}]*\}\s*/g, '');
  content = content.replace(/onMouseLeave=\{[^}]*\}\s*/g, '');

  // Replace <th style={{ ... }}> with <th>
  content = content.replace(/<th([^>]*)style={{[^}]*}}([^>]*)>/g, '<th$1$2>');

  // Replace <td style={{ padding: '1rem 1.5rem', ... }}> with <td>
  // Carefully keep onClick or other properties
  content = content.replace(/<td([^>]*)style={{[^}]*}}([^>]*)>/g, '<td$1$2>');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

DIRS.forEach(walk);
console.log('Done replacing CSS inline styles in tables!');
