const fs = require('fs');

let content = fs.readFileSync('src/pages/admin/LeadManagement.tsx', 'utf8');

// 1. Audio and SetSearchParams
content = content.replace("const [searchParams] = useSearchParams();", "const [searchParams, setSearchParams] = useSearchParams();");

const audioState = `
  const [uploadingPdf, setUploadingPdf] = useState(false);

  // Audio for ring sound
  const ringSound = useMemo(() => new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg'), []);
`;
content = content.replace("  const [uploadingPdf, setUploadingPdf] = useState(false);", audioState);

const ringEvent = `
    const handleNewLeadEvent = (e: any) => {
      const newLead = e.detail;
      // Play mandatory ring sound
      ringSound.play().catch(e => console.log('Audio play blocked by browser', e));
      toast.success(\`New \${newLead.type} lead received!\`);
      
      // Only add to table if it matches current type filter
      if (newLead.type === typeFilter) {
        setLeads(prev => [newLead, ...prev]);
      }
    };

    leadEventEmitter.addEventListener('new-lead', handleNewLeadEvent);
    return () => leadEventEmitter.removeEventListener('new-lead', handleNewLeadEvent);
  }, [typeFilter, ringSound]);
`;
content = content.replace(/const handleNewLeadEvent = \(e: any\) => \{[\s\S]*?\}, \[typeFilter\]\);/g, ringEvent);

// 2. Tabs
const oldHeader = `    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--text-dark, #1f2937)', margin: 0, textTransform: 'capitalize' }}>
          {typeFilter} Insurance Leads
        </h1>`;

const newHeader = `    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--text-dark, #1f2937)', margin: 0, textTransform: 'capitalize' }}>
          Lead Management
        </h1>`;

content = content.replace(oldHeader, newHeader);

const tabsHtml = `
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '2px solid #e5e7eb' }}>
        {['health', 'life', 'vehicle'].map(tab => (
          <button
            key={tab}
            onClick={() => setSearchParams({ type: tab })}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: typeFilter === tab ? '3px solid var(--primary-color, #2e9f68)' : '3px solid transparent',
              color: typeFilter === tab ? 'var(--primary-color, #2e9f68)' : '#6b7280',
              fontWeight: typeFilter === tab ? 700 : 500,
              fontSize: '1rem',
              textTransform: 'capitalize',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            {tab} Insurance
          </button>
        ))}
      </div>

      {/* Filters */}`;

content = content.replace("{/* Filters */}", tabsHtml);

fs.writeFileSync('src/pages/admin/LeadManagement.tsx', content, 'utf8');
