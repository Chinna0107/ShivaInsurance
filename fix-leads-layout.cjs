const fs = require('fs');
const file = 'src/pages/admin/LeadManagement.tsx';
let content = fs.readFileSync(file, 'utf8');

// Container
content = content.replace(
  '<div className="table-responsive-wrapper" style={{ backgroundColor: \'white\', borderRadius: \'12px\', boxShadow: \'0 4px 20px rgba(0,0,0,0.02)\', border: \'1px solid var(--border-color, #e5e7eb)\' }}>',
  '<div className="table-responsive-wrapper" style={{ backgroundColor: \'white\', borderRadius: \'12px\', boxShadow: \'0 4px 20px rgba(0,0,0,0.02)\', border: \'1px solid #e5e7eb\', width: \'100%\', overflowX: \'auto\', display: \'block\' }}>'
);

// Table min-width
content = content.replace(
  '<table style={{ width: \'100%\', borderCollapse: \'collapse\', whiteSpace: \'nowrap\', textAlign: \'left\' }}>',
  '<table style={{ width: \'100%\', borderCollapse: \'collapse\', whiteSpace: \'nowrap\', textAlign: \'left\', minWidth: \'900px\' }}>'
);

// Padding replacements
content = content.replace(/padding: '1rem 1.5rem'/g, 'padding: \'0.75rem 1rem\'');
content = content.replace(/fontSize: '0\.85rem'/g, 'fontSize: \'0.8rem\'');

// Badge tweaks
content = content.replace(
  /padding: '0\.25rem 0\.75rem', borderRadius: '9999px', fontSize: '0\.8rem', fontWeight: 500,/g,
  'padding: \'0.125rem 0.625rem\', borderRadius: \'9999px\', fontSize: \'0.75rem\', fontWeight: 500, display: \'inline-block\','
);

// Input alignment
content = content.replace(
  `style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '6px', width: '100%', minWidth: '220px', outline: 'none', color: '#1f2937', backgroundColor: '#f9fafb' }}`,
  `style={{ padding: '0.4rem 0.5rem', fontSize: '0.8rem', border: '1px solid #e5e7eb', borderRadius: '6px', width: '100%', minWidth: '150px', maxWidth: '220px', outline: 'none', color: '#1f2937', backgroundColor: '#f9fafb' }}`
);

// Contact Info specific replacement
const oldContactInfo = `<td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle' }}>
                    <div style={{ color: 'var(--text-dark, #1f2937)', fontWeight: 500 }}>{lead.email}</div>
                    <div style={{ color: '#6b7280' }}>
                      <a href={\`tel:\${lead.phone}\`} style={{ textDecoration: 'none', color: 'inherit' }} title="Click to Call">
                        {lead.phone}
                      </a>
                    </div>
                  </td>`;

const newContactInfo = `<td style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', whiteSpace: 'normal', wordBreak: 'break-all', maxWidth: '250px' }}>
                    <div style={{ color: '#1f2937', fontWeight: 500 }}>{lead.email}</div>
                    <div style={{ color: '#6b7280', marginTop: '0.2rem' }}>
                      <a href={\`tel:\${lead.phone}\`} style={{ color: '#2e9f68', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', wordBreak: 'break-all' }} title="Click to Call">
                        <FiPhoneCall size={12} style={{ flexShrink: 0 }} /> <span>{lead.phone}</span>
                      </a>
                    </div>
                  </td>`;

content = content.replace(oldContactInfo, newContactInfo);

// Name column replacement to prevent wrapping too aggressively
const oldNameInfo = `<td
                    onClick={() => setSelectedLead(lead)}
                    style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', cursor: 'pointer' }}
                  >`;
const newNameInfo = `<td
                    onClick={() => setSelectedLead(lead)}
                    style={{ padding: '0.75rem 1rem', verticalAlign: 'middle', cursor: 'pointer', whiteSpace: 'normal', minWidth: '120px' }}
                  >`;

content = content.replace(oldNameInfo, newNameInfo);

fs.writeFileSync(file, content, 'utf8');
console.log('LeadManagement layout fixed');
