const fs = require('fs');

const file = 'src/pages/admin/LeadManagement.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Table opening tags
content = content.replace(
  '<table className="admin-table">',
  '<table style={{ width: \'100%\', borderCollapse: \'collapse\', whiteSpace: \'nowrap\', textAlign: \'left\' }}>'
);
content = content.replace(
  /<thead>\s*<tr>/,
  `<thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>`
);

// 2. Table Headers (th)
content = content.replace(
  /<th >/g,
  '<th style={{ padding: \'1rem 1.5rem\', color: \'#6b7280\', fontWeight: 600, fontSize: \'0.85rem\', textTransform: \'uppercase\', letterSpacing: \'0.05em\' }}>'
);
content = content.replace(
  /<th>/g,
  '<th style={{ padding: \'1rem 1.5rem\', color: \'#6b7280\', fontWeight: 600, fontSize: \'0.85rem\', textTransform: \'uppercase\', letterSpacing: \'0.05em\' }}>'
);

// 3. Table row (tr)
content = content.replace(
  /<tr key=\{lead\.id\}>/,
  `<tr 
                key={lead.id} 
                style={{ borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s', backgroundColor: lead.status === 'Pending' ? '#f0fdf4' : 'transparent' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = lead.status === 'Pending' ? '#f0fdf4' : 'transparent'}
              >`
);

// 4. Table cells (td)
content = content.replace(/<td\s*>/g, '<td style={{ padding: \'1rem 1.5rem\', verticalAlign: \'middle\' }}>');
content = content.replace(/<td>/g, '<td style={{ padding: \'1rem 1.5rem\', verticalAlign: \'middle\' }}>');
content = content.replace(
  /<td\s*\n\s*onClick=\{\(\) => setSelectedLead\(lead\)\}\s*>/,
  '<td onClick={() => setSelectedLead(lead)} style={{ padding: \'1rem 1.5rem\', verticalAlign: \'middle\', cursor: \'pointer\' }}>'
);

// 5. Input Reminder
content = content.replace(
  /className="admin-reminder-input"/,
  `style={{ padding: '0.5rem 0.75rem', fontSize: '0.85rem', border: '1px solid #e5e7eb', borderRadius: '6px', width: '100%', minWidth: '220px', outline: 'none', color: '#1f2937', backgroundColor: '#f9fafb' }}
                      onFocus={(e) => e.target.style.borderColor = '#2e9f68'}
                      onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; handleUpdateReminder(lead.id, e.target.value); }}`
);

// 6. Actions Column
const oldActionsStr = `<div className="admin-actions-container" style={{ justifyContent: 'center' }}>
                      <button
                        onClick={() => setSelectedLead(lead)}
                        title="View Full Details"
                        className="admin-btn-view"
                      >
                        <FiEye size={16} />
                      </button>

                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as 'Pending' | 'Contacted' | 'Agreed' | 'Closed')}
                        className={\`admin-status-select \${
                          lead.status === 'Agreed' ? 'status-agreed' :
                          lead.status === 'Contacted' ? 'status-contacted' :
                          lead.status === 'Closed' ? 'status-closed' : 'status-pending'
                        }\`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Agreed">Agreed</option>
                        <option value="Closed">Closed</option>
                      </select>

                      {(lead.status === 'Pending' || lead.status === 'Contacted') && (
                        <button
                          onClick={() => handleDelete(lead.id)}
                          title="Delete Lead"
                          className="admin-btn-delete"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      )}
                    </div>`;

const newActionsStr = `<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', minWidth: '160px' }}>
                      <button 
                        onClick={() => setSelectedLead(lead)}
                        title="View Full Details"
                        style={{ padding: '0.5rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #2e9f68', borderRadius: '6px', background: '#2e9f68', color: 'white', cursor: 'pointer' }}
                      >
                        <FiEye size={14} />
                      </button>
                      {lead.status === 'Pending' && (
                        <button 
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', borderRadius: '6px', color: '#4338ca', border: '1px solid #4338ca', background: 'transparent', cursor: 'pointer' }}
                          onClick={() => updateStatus(lead.id, 'Contacted')}
                        >
                          <FiPhoneCall size={12} /> Contacted
                        </button>
                      )}
                      {lead.status === 'Contacted' && (
                        <button 
                          style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.35rem', borderRadius: '6px', color: '#059669', border: '1px solid #059669', background: 'transparent', cursor: 'pointer' }}
                          onClick={() => updateStatus(lead.id, 'Agreed')}
                        >
                          <FiCheckCircle size={12} /> Agreed
                        </button>
                      )}
                      {(lead.status === 'Pending' || lead.status === 'Contacted') && (
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(lead.id); }}
                          title="Delete Lead"
                          style={{ padding: '0.5rem', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: '6px', background: '#fef2f2', color: '#ef4444', cursor: 'pointer' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                      )}
                    </div>`;

content = content.replace(oldActionsStr, newActionsStr);

// 7. Modal Status Updates
const oldModalBottom = `<div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color, #e5e7eb)', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedLead(null)}
                style={{ padding: '0.75rem 1.5rem', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
              >
                Close Details
              </button>
            </div>`;

const newModalBottom = `<div style={{ padding: '1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
              <h4 style={{ margin: '0 0 0.75rem', color: '#1f2937', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Update Status</h4>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {['Pending', 'Contacted', 'Agreed', 'Closed'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(selectedLead.id, status as 'Pending' | 'Contacted' | 'Agreed' | 'Closed')}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '6px',
                        border: '1px solid',
                        fontWeight: 500,
                        cursor: selectedLead.status === status ? 'default' : 'pointer',
                        borderColor: selectedLead.status === status ? (status === 'Agreed' ? '#10b981' : '#2e9f68') : '#e5e7eb',
                        backgroundColor: selectedLead.status === status ? (status === 'Agreed' ? '#dcfce7' : 'rgba(46, 159, 104, 0.1)') : 'white',
                        color: selectedLead.status === status ? (status === 'Agreed' ? '#10b981' : '#2e9f68') : '#4b5563',
                        transition: 'all 0.2s',
                      }}
                      disabled={selectedLead.status === status}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  style={{ padding: '0.5rem 1.5rem', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Close
                </button>
              </div>
            </div>`;

content = content.replace(oldModalBottom, newModalBottom);

// Make sure updateStatus updates selectedLead as well!
content = content.replace(
  `setLeads(leads.map(lead => lead.id === id ? { ...lead, status } : lead));`,
  `setLeads(leads.map(lead => lead.id === id ? { ...lead, status } : lead));
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status });
      }`
);

// Add missing icons
if (!content.includes('FiPhoneCall')) {
  content = content.replace('FiDownload, FiFilter, FiEye, FiX, FiSearch', 'FiDownload, FiFilter, FiEye, FiX, FiSearch, FiPhoneCall, FiCheckCircle');
}


fs.writeFileSync(file, content, 'utf8');
console.log('LeadManagement rewritten!');
