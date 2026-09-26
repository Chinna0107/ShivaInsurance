const fs = require('fs');
const path = require('path');

const DIRS = [
  path.join(__dirname, 'src/pages/admin'),
  path.join(__dirname, 'src/pages/employee')
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace Reminder Inputs
  content = content.replace(/<input\s+type="text"[^>]*defaultValue=\{req\.reminder[^}]*\}[^>]*style=\{\{[^}]*\}\}\s*\/>/g, (match) => {
    return match.replace(/style=\{\{[^}]*\}\}/, 'className="admin-reminder-input"');
  });
  content = content.replace(/<input\s+type="text"[^>]*defaultValue=\{lead\.reminder[^}]*\}[^>]*style=\{\{[^}]*\}\}\s*\/>/g, (match) => {
    return match.replace(/style=\{\{[^}]*\}\}/, 'className="admin-reminder-input"');
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated inputs:', filePath);
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
console.log('Done replacing CSS inline styles in inputs!');
