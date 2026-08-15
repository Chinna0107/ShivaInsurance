import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LeadForm from './components/LeadForm';

const steps = [
  { num: '1', icon: '🎯', title: 'Talk to a Professional', text: 'Connect with certified advisors — not call centers. Real humans, real expertise.' },
  { num: '2', icon: '📋', title: 'Get Your Report', text: 'Receive a personalized recommendation report tailored to your exact needs and budget.' },
  { num: '3', icon: '🛡️', title: 'Lifetime Claims Support', text: 'Your advisor stays with you for life — helping you file and win every claim.' },
];

const compareRows = [
  { feature: 'Type of platform', us: '100% Unbiased', them: 'Sales Platform' },
  { feature: 'Revenue model', us: 'Zero commission, zero ad revenue', them: 'Commission from Insurers' },
  { feature: 'Plan comparison', us: 'All online plans', them: 'Limited plans only' },
  { feature: 'Recommendation', us: 'Personalized for your needs', them: 'Raw comparison of plans' },
  { feature: 'Buy insurance from', us: 'Top 5% Advisors in India', them: 'Call Centre Agents' },
  { feature: 'Calls', us: 'Only scheduled calls', them: 'Spam Calls & SMS' },
  { feature: 'Claims support', us: 'Lifetime personal support', them: 'On toll-free number' },
  { feature: 'Charges', us: 'Zero', them: 'Zero' },
  { feature: 'Expert Community', us: 'Yes', them: 'No' },
];

const stats = [
  { value: 50000, suffix: '+', label: 'Families Protected', format: (n: number) => `${new Intl.NumberFormat('en-IN').format(Math.round(n))}+` },
  { value: 4.9, suffix: '★', label: 'Customer Rating', format: (n: number) => n.toFixed(1) },
  { value: 24, suffix: 'hrs', label: 'Response Time', format: (n: number) => `${Math.round(n)}hrs` },
  { value: 100, suffix: '%', label: 'Unbiased Advice', format: (n: number) => `${Math.round(n)}%` },
];

function StatNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let start: number | null = null;
    const duration = 1200;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = value * eased;
      const formatted = format(current);
      node.textContent = formatted;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        node.textContent = format(value);
      }
    };

    requestAnimationFrame(animate);
  }, [value, format]);

  return <div ref={ref} className="lf-stat-v" />;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
  * { box-sizing: border-box; }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

  /* STAGE WRAPPERS */
  .stage { animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }

  /* NAVBAR — white for stage 1 */
  .lf-nav { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(18px); border-bottom: 1px solid #e5e7eb; padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 1px 12px rgba(0,0,0,0.06); }
  @media(min-width:768px) { .lf-nav { padding: 1rem 2rem; } }
  .lf-logo { display: flex; align-items: center; gap: 0.5rem; }
  @media(min-width:768px) { .lf-logo { gap: 0.75rem; } }
  .lf-logo img { width: 36px; height: 36px; border-radius: 10px; padding: 2px; box-shadow: 0 2px 10px rgba(0,0,0,0.12); }
  @media(min-width:768px) { .lf-logo img { width: 48px; height: 48px; border-radius: 12px; padding: 3px; } }
  .lf-logo-text { font-size: 1.15rem; font-weight: 800; color: #111827; letter-spacing: -0.5px; }
  @media(min-width:768px) { .lf-logo-text { font-size: 1.35rem; } }
  .lf-logo-text span { color: #f1592a; }
  .lf-nav-badge { display: none; background: #ecfdf5; border: 1px solid #6ee7b7; color: #059669; padding: 0.3rem 0.85rem; border-radius: 99px; font-size: 0.7rem; font-weight: 700; }
  @media(min-width:600px) { .lf-nav-badge { display: inline-block; } }
  .lf-nav-cta { background: linear-gradient(135deg,#22c55e,#16a34a); color: white; font-weight: 800; font-size: 0.8rem; padding: 0.5rem 1rem; border-radius: 10px; border: none; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 14px rgba(22,163,74,0.3); }
  @media(min-width:600px) { .lf-nav-cta { font-size: 0.85rem; padding: 0.6rem 1.4rem; } }
  .lf-nav-cta:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(22,163,74,0.4); }
  .lf-nav-back { background: #f9fafb; border: 1px solid #e5e7eb; color: #374151; padding: 0.45rem 1rem; border-radius: 8px; font-size: 0.82rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.4rem; font-family: inherit; font-weight: 600; }
  .lf-nav-back:hover { background: #f3f4f6; color: #111827; }

  /* HERO */
  .lf-hero { padding: 3rem 1.25rem 3rem; position: relative; overflow: hidden; background: white; }
  @media(min-width:900px){ .lf-hero { padding: 6.5rem 6rem 5.5rem; } }
  .blob { position: absolute; border-radius: 50%; pointer-events: none; }
  .blob-1 { width: 500px; height: 500px; top: -150px; left: -150px; background: radial-gradient(circle,rgba(22,163,74,0.07) 0%,transparent 70%); }
  .blob-2 { width: 600px; height: 600px; bottom: -200px; right: -200px; background: radial-gradient(circle,rgba(59,130,246,0.06) 0%,transparent 70%); }
  .lf-hero-grid { position: relative; z-index: 1; max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: center; }
  @media(min-width:900px){ .lf-hero-grid { grid-template-columns: 1fr 400px; gap: 5rem; } }
  .lf-tag { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #16a34a; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; font-family: 'IBM Plex Mono', 'SFMono-Regular', monospace; }
  .lf-tag::before { content: ''; display: block; width: 22px; height: 2px; background: #16a34a; border-radius: 2px; }
  .lf-tag::after {
    content: ''; display: inline-block; width: 0.7ch; height: 1em; background: #16a34a; border-radius: 2px; margin-left: 0.15rem; animation: blink 1s step-end infinite;
  }
  @keyframes blink { 50% { opacity: 0; } }
  .lf-h1 { font-size: clamp(2rem,4.5vw,3.4rem); font-weight: 900; line-height: 1.1; letter-spacing: -1.5px; color: #0f172a; margin-bottom: 1.25rem; }
  .lf-h1 .hl { background: linear-gradient(135deg,#16a34a,#0891b2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .lf-sub { font-size: 0.95rem; color: #4b5563; line-height: 1.6; margin-bottom: 2rem; max-width: 500px; }
  @media(min-width:768px) {
    .lf-h1 { font-size: clamp(2.2rem,4.5vw,3.4rem); line-height: 1.07; letter-spacing: -2px; }
    .lf-sub { font-size: 1rem; line-height: 1.7; }
  }
  .lf-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 1.25rem 1rem; margin-bottom: 1.75rem; width: 100%; }
  @media(min-width:600px){ .lf-stats { grid-template-columns: repeat(4,auto); gap: 1.25rem 2rem; width: fit-content; } }
  .lf-stat-v { font-size: 1.35rem; font-weight: 900; color: #111827; line-height: 1; font-family: 'IBM Plex Mono', 'SFMono-Regular', monospace; letter-spacing: -0.04em; }
  @media(min-width:600px){ .lf-stat-v { font-size: 1.6rem; } }
  .lf-stat-l { font-size: 0.71rem; color: #9ca3af; margin-top: 0.2rem; font-weight: 500; }
  .lf-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2rem; }
  .lf-badge { background: #f9fafb; border: 1px solid #e5e7eb; color: #374151; padding: 0.34rem 0.85rem; border-radius: 99px; font-size: 0.74rem; font-weight: 600; }
  .lf-cta-row { display: flex; gap: 0.75rem; flex-wrap: wrap; flex-direction: column; width: 100%; }
  @media(min-width:600px) { .lf-cta-row { flex-direction: row; width: auto; } }
  .lf-cta { display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem; background: linear-gradient(135deg,#22c55e,#16a34a); color: white; font-weight: 800; font-size: 1rem; padding: 0.95rem 2.2rem; border-radius: 14px; border: none; cursor: pointer; transition: all 0.25s; box-shadow: 0 8px 28px rgba(22,163,74,0.3); font-family: inherit; width: 100%; }
  @media(min-width:600px) { .lf-cta { width: auto; } }
  .lf-cta:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(22,163,74,0.42); }
  .lf-ghost { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; background: white; border: 1.5px solid #d1d5db; color: #374151; font-weight: 700; font-size: 0.95rem; padding: 0.95rem 2rem; border-radius: 14px; cursor: pointer; transition: all 0.2s; font-family: inherit; box-shadow: 0 2px 8px rgba(0,0,0,0.06); width: 100%; }
  @media(min-width:600px) { .lf-ghost { width: auto; } }
  .lf-ghost:hover { background: #f9fafb; border-color: #9ca3af; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.1); }

  /* BANNER */
  .lf-banner { background: linear-gradient(160deg,#0f2a4a,#0b3d2e); border-radius: 22px; overflow: hidden; box-shadow: 0 28px 70px rgba(0,0,0,0.2), 0 0 0 1px #e5e7eb; position: relative; }
  .lf-banner img { width: 100%; aspect-ratio: 4/3; object-fit: cover; display: block; }
  .lf-banner-ov { position: absolute; inset: 0; background: linear-gradient(to top,rgba(6,13,31,0.93) 0%,rgba(6,13,31,0.25) 50%,transparent 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 1.4rem 1.6rem; }
  .lf-banner-tag { display: inline-flex; align-items: center; gap: 0.35rem; background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.35); color: #4ade80; padding: 0.28rem 0.72rem; border-radius: 99px; font-size: 0.7rem; font-weight: 700; margin-bottom: 0.6rem; width: fit-content; }
  .lf-banner-cap h4 { font-size: 0.95rem; font-weight: 700; color: white; margin-bottom: 0.2rem; }
  .lf-banner-cap p { font-size: 0.77rem; color: #94a3b8; }
  .lf-banner-pills { display: flex; gap: 0.45rem; flex-wrap: wrap; margin-top: 0.85rem; }
  .lf-banner-pill { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: #e2e8f0; padding: 0.22rem 0.6rem; border-radius: 99px; font-size: 0.7rem; font-weight: 500; }
  .lf-banner-rating { position: absolute; top: 1rem; right: 1rem; background: rgba(6,13,31,0.82); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; padding: 0.4rem 0.8rem; font-size: 0.77rem; font-weight: 700; color: white; }

  /* DIVIDER */
  .lf-div { height: 1px; background: #f3f4f6; }

  /* INSURANCE TYPES SHOWCASE */
  .lf-ins-section { padding: 4rem 1.25rem; background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); }
  @media(min-width:900px){ .lf-ins-section { padding: 5.5rem 4rem; } }
  .lf-ins-inner { max-width: 1160px; margin: 0 auto; }
  .lf-ins-header { text-align: center; margin-bottom: 3rem; }
  .lf-ins-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #16a34a; margin-bottom: 0.6rem; display: inline-flex; align-items: center; gap: 0.45rem; font-family: 'IBM Plex Mono', monospace; }
  .lf-ins-tag::before, .lf-ins-tag::after { content: '—'; opacity: 0.4; }
  .lf-ins-h2 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 900; letter-spacing: -1.5px; color: #0f172a; margin-bottom: 0.75rem; line-height: 1.1; }
  .lf-ins-h2 .hl2 { background: linear-gradient(135deg,#f1592a,#e11d48); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .lf-ins-desc { font-size: 0.97rem; color: #6b7280; max-width: 540px; margin: 0 auto; line-height: 1.7; }
  .lf-ins-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
  @media(min-width:700px){ .lf-ins-grid { grid-template-columns: repeat(3, 1fr); } }
  .lf-ins-card { position: relative; border-radius: 24px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 20px rgba(0,0,0,0.07); transition: all 0.35s cubic-bezier(.22,1,.36,1); cursor: pointer; background: white; }
  .lf-ins-card:hover { transform: translateY(-8px); box-shadow: 0 20px 56px rgba(0,0,0,0.13); }
  .lf-ins-card-top { padding: 2.25rem 2rem 1.75rem; position: relative; overflow: hidden; }
  .lf-ins-card-top::before { content: ''; position: absolute; inset: 0; opacity: 0.08; background: var(--card-bg); transition: opacity 0.3s; }
  .lf-ins-card:hover .lf-ins-card-top::before { opacity: 0.14; }
  .lf-ins-card-glow { position: absolute; width: 180px; height: 180px; border-radius: 50%; top: -60px; right: -40px; background: var(--card-glow); opacity: 0.18; filter: blur(30px); transition: opacity 0.3s; pointer-events: none; }
  .lf-ins-card:hover .lf-ins-card-glow { opacity: 0.3; }
  .lf-ins-icon-wrap { width: 64px; height: 64px; border-radius: 18px; background: var(--card-bg); display: flex; align-items: center; justify-content: center; font-size: 1.9rem; margin-bottom: 1.25rem; box-shadow: 0 6px 20px var(--card-shadow); transition: transform 0.3s; }
  .lf-ins-card:hover .lf-ins-icon-wrap { transform: scale(1.1) rotate(-3deg); }
  .lf-ins-card-name { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin-bottom: 0.35rem; letter-spacing: -0.5px; }
  .lf-ins-card-tagline { font-size: 0.82rem; color: #6b7280; margin-bottom: 1.25rem; line-height: 1.5; }
  .lf-ins-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; }
  .lf-ins-feature { display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.81rem; color: #374151; line-height: 1.5; }
  .lf-ins-check { width: 18px; height: 18px; border-radius: 50%; background: var(--card-bg); display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 0.05rem; }
  .lf-ins-check svg { width: 10px; height: 10px; stroke: white; stroke-width: 3; fill: none; }
  .lf-ins-card-foot { padding: 1.5rem 2rem; border-top: 1px solid #f3f4f6; display: flex; align-items: center; justify-content: space-between; }
  .lf-ins-explore { font-size: 0.83rem; font-weight: 700; color: var(--card-accent); display: flex; align-items: center; gap: 0.35rem; transition: gap 0.2s; }
  .lf-ins-card:hover .lf-ins-explore { gap: 0.6rem; }
  .lf-ins-plans { font-size: 0.74rem; color: #9ca3af; font-weight: 500; }
  .lf-ins-bottom-cta { text-align: center; margin-top: 3rem; }
  .lf-ins-bottom-cta p { font-size: 0.88rem; color: #6b7280; margin-bottom: 1.25rem; }

  /* SECTIONS */
  .lf-sec { padding: 3.5rem 1.25rem; max-width: 1160px; margin: 0 auto; }
  @media(min-width:900px){ .lf-sec { padding: 6rem 4rem; } }
  .lf-sec-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #16a34a; margin-bottom: 0.6rem; display: flex; align-items: center; gap: 0.45rem; }
  .lf-sec-tag::before { content: ''; display: block; width: 14px; height: 2px; background: #16a34a; border-radius: 2px; }
  .lf-sec-h2 { font-size: clamp(1.7rem,3vw,2.4rem); font-weight: 900; letter-spacing: -1px; color: #0f172a; margin-bottom: 0.7rem; line-height: 1.15; }
  .lf-sec-sub { font-size: 0.94rem; color: #6b7280; max-width: 520px; line-height: 1.65; }

  /* STEPS */
  .lf-steps-g { display: grid; grid-template-columns: 1fr; gap: 1.25rem; margin-top: 2.75rem; }
  @media(min-width:700px){ .lf-steps-g { grid-template-columns: repeat(3,1fr); } }
  .lf-step-card { background: #ffffff; border: 1px solid #e5e7eb; border-radius: 18px; padding: 2rem 1.75rem; transition: all 0.3s; position: relative; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
  .lf-step-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#22c55e,#0891b2); transform: scaleX(0); transform-origin: left; transition: transform 0.3s; }
  .lf-step-card:hover { transform: translateY(-5px); border-color: #d1fae5; box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
  .lf-step-card:hover::after { transform: scaleX(1); }
  .lf-step-n { width: 42px; height: 42px; border-radius: 12px; background: linear-gradient(135deg,#22c55e,#0891b2); color: white; font-weight: 900; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; box-shadow: 0 5px 18px rgba(22,163,74,0.28); }
  .lf-step-title { font-size: 0.97rem; font-weight: 700; color: #111827; margin-bottom: 0.55rem; }
  .lf-step-text { font-size: 0.84rem; color: #6b7280; line-height: 1.6; }

  /* COMPARE */
  .lf-compare-wrap { margin-top: 2.75rem; border-radius: 18px; overflow-x: auto; border: 1px solid #e5e7eb; box-shadow: 0 2px 16px rgba(0,0,0,0.06); -webkit-overflow-scrolling: touch; }
  .lf-ct { width: 100%; border-collapse: collapse; background: white; min-width: 600px; }
  .lf-ct thead tr { background: #f9fafb; }
  .lf-ct th { padding: 0.9rem 1.2rem; text-align: left; font-size: 0.7rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #9ca3af; border-bottom: 1px solid #e5e7eb; }
  .lf-ct th:nth-child(2) { color: #16a34a; }
  .lf-ct th:nth-child(3) { color: #ef4444; }
  .lf-ct td { padding: 0.82rem 1.2rem; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 0.83rem; }
  .lf-ct td:first-child { color: #374151; font-weight: 600; }
  .lf-ct td:nth-child(2) { color: #111827; font-weight: 500; }
  .lf-ct tbody tr:last-child td { border-bottom: none; }
  .lf-ct tbody tr:hover td { background: #f9fafb; }
  .chk { color: #16a34a; font-weight: 800; margin-right: 5px; }
  .crs { color: #ef4444; margin-right: 5px; }

  /* FORM STAGE */
  .lf-form-stage { min-height: 100vh; background: #f4f6fb; display: flex; align-items: flex-start; justify-content: center; padding: 2.5rem 1.5rem 5rem; }
  .lf-form-wrap { width: 100%; max-width: 440px; }
  .lf-form-header { background: linear-gradient(135deg,#0f172a,#1a3350); border-radius: 16px 16px 0 0; padding: 1.25rem 1.5rem; display: flex; align-items: center; gap: 0.85rem; border-bottom: 2px solid #22c55e; }
  .lf-form-avatar { width: 46px; height: 46px; border-radius: 11px; overflow: hidden; flex-shrink: 0; border: 2px solid rgba(34,197,94,0.45); }
  .lf-form-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .lf-form-title { font-size: 0.95rem; font-weight: 700; color: white; }
  .lf-form-sub { font-size: 0.73rem; color: #94a3b8; margin-top: 0.15rem; }
  .lf-live { width: 9px; height: 9px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 8px #22c55e; animation: pulse 2s infinite; margin-left: auto; flex-shrink: 0; }
  .lf-form-body { background: white; border-radius: 0 0 16px 16px; box-shadow: 0 12px 40px rgba(0,0,0,0.1); overflow: hidden; }
  .lf-trust { display: flex; justify-content: center; gap: 1.4rem; flex-wrap: wrap; margin-top: 1.2rem; }
  .lf-trust-item { font-size: 0.72rem; color: #9ca3af; font-weight: 500; }

  /* FOOTER */
  .lf-footer { text-align: center; padding: 1.5rem; border-top: 1px solid #f3f4f6; font-size: 0.7rem; color: #9ca3af; background: white; }
`;


function MainSite() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<1 | 2>(1);
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    const hasSubmitted = localStorage.getItem('lead_submitted_token') === 'true';
    if (hasSubmitted) navigate('/', { replace: true });
  }, [navigate]);

  const handleComplete = () => navigate('/');
  const goToForm = () => { setStage(2); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  // ─── STAGE 2: Only the form ───────────────────────────────────
  if (stage === 2) {
    return (
      <div key="s2" className="stage" style={{ fontFamily: "'Inter','Segoe UI',sans-serif", backgroundColor: '#f4f6fb', color: '#1f2937', minHeight: '100vh' }}>
        <style>{CSS}</style>
        <nav className="lf-nav" style={{ background: 'rgba(255,255,255,0.92)', borderBottom: '1px solid #e5e7eb' }}>
          <div className="lf-logo">
            <img src="/logo-icon.png" alt="InsuranceShiva" />
            <div className="lf-logo-text">Insurance<span>Shiva</span></div>
          </div>
          <button className="lf-nav-back" style={{ color: '#4b5563', background: '#f3f4f6', border: '1px solid #e5e7eb' }} onClick={() => setStage(1)}>← Back</button>
        </nav>

        <div className="lf-form-stage">
          <div className="lf-form-wrap">
            {formStep === 1 && (
              <div className="lf-form-header">
                <div className="lf-form-avatar">
                  <img src="/advisor-hero.png" alt="Advisor" />
                </div>
                <div>
                  <div className="lf-form-title">Talk to an Expert</div>
                  <div className="lf-form-sub">Free personalized plan in 24 hrs</div>
                </div>
                <div className="lf-live" title="Advisors online now" />
              </div>
            )}
            <div className="lf-form-body" style={{ borderRadius: formStep === 1 ? '0 0 16px 16px' : '16px' }}>
              <LeadForm onComplete={handleComplete} onStepChange={setFormStep} />
            </div>
            <div className="lf-trust">
              {['🔒 Secure & Private', '🚫 No Spam', '✅ Free Service', '⭐ 4.9 Rated'].map(t => (
                <span key={t} className="lf-trust-item">{t}</span>
              ))}
            </div>
          </div>
        </div>
        <Toaster position="top-center" />
      </div>
    );
  }

  // ─── STAGE 1: Full landing page ──────────────────────────────
  return (
    <div key="s1" className="stage" style={{ fontFamily: "'Inter','Segoe UI',sans-serif", backgroundColor: '#ffffff', color: '#111827' }}>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="lf-nav">
        <div className="lf-logo">
          <img src="/logo-icon.png" alt="InsuranceShiva" />
          <div className="lf-logo-text">Insurance<span>Shiva</span></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <span className="lf-nav-badge">#1 Unbiased</span>
          <button className="lf-nav-cta" onClick={goToForm}>Talk to Expert</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="lf-hero">
        <div className="blob blob-1" /><div className="blob blob-2" />
        <div className="lf-hero-grid">
          <div>
            <p className="lf-tag">Sacha Advice. Acha Advisor.</p>
            <h1 className="lf-h1">Make the right<br /><span className="hl">insurance decisions</span><br />in 24 hrs</h1>
            <p className="lf-sub">Get unbiased, personalized insurance advice from India's top 5% professional advisors — not call centers. Zero commission, zero conflict of interest.</p>
            <div className="lf-stats">
              {stats.map(s => (
                <div key={s.label}>
                  <StatNumber value={s.value} format={s.format} />
                  <div className="lf-stat-l">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="lf-badges">
              {['🚫 No charges', '🚫 No spam', '✅ 100% Unbiased', '🏆 Top Advisors'].map(b => (<span key={b} className="lf-badge">{b}</span>))}
            </div>
            <div className="lf-cta-row">
              <button className="lf-cta" onClick={goToForm}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.8 19.79 19.79 0 0 1 1.61 3.19 2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> */}
                Check Premium
              </button>
              <button className="lf-ghost" onClick={goToForm}>Talk to Expert →</button>
            </div>
          </div>
          <div className="lf-banner">
            <img src="/advisor-hero.png" alt="Professional Insurance Advisor" />
            <div className="lf-banner-ov">
              <div className="lf-banner-tag">⭐ Top Rated Advisor</div>
              <div className="lf-banner-cap">
                <h4>Your Personal Insurance Advisor</h4>
                <p>Top 5% certified professionals in India</p>
              </div>
              <div className="lf-banner-pills">
                {['🚫 No spam', '✅ Free service', '🛡️ Claims support'].map(p => (<span key={p} className="lf-banner-pill">{p}</span>))}
              </div>
            </div>
            <div className="lf-banner-rating">⭐ 4.9 / 5.0</div>
          </div>
        </div>
      </section>

      <div className="lf-div" />

      {/* INSURANCE TYPES SHOWCASE */}
      <section className="lf-ins-section">
        <div className="lf-ins-inner">
          <div className="lf-ins-header">
            <div className="lf-ins-tag">What We Cover</div>
            <h2 className="lf-ins-h2">All types of insurance,<br /><span className="hl2">one trusted advisor</span></h2>
            <p className="lf-ins-desc">Whether it's your health, your family's future, or your vehicle — get expert, unbiased advice across every major insurance category.</p>
          </div>
          <div className="lf-ins-grid">

            {/* Health Insurance */}
            <div className="lf-ins-card" style={{'--card-bg':'linear-gradient(135deg,#22c55e,#16a34a)', '--card-glow':'#22c55e', '--card-shadow':'rgba(22,163,74,0.25)', '--card-accent':'#16a34a'} as React.CSSProperties} onClick={goToForm}>
              <div className="lf-ins-card-top">
                <div className="lf-ins-card-glow" />
                <div className="lf-ins-icon-wrap">🏥</div>
                <div className="lf-ins-card-name">Health Insurance</div>
                <div className="lf-ins-card-tagline">Comprehensive coverage for medical expenses, hospitalisation & critical illness.</div>
                <ul className="lf-ins-features">
                  {['Individual & Family Floater plans', 'Critical illness & super top-ups', 'Cashless hospitalisation at 5000+ hospitals', 'No-claim bonus up to 100%'].map(f => (
                    <li key={f} className="lf-ins-feature">
                      <span className="lf-ins-check" style={{background:'linear-gradient(135deg,#22c55e,#16a34a)'}}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lf-ins-card-foot">
                <span className="lf-ins-explore">Explore Plans <span>→</span></span>
                <span className="lf-ins-plans">50+ plans compared</span>
              </div>
            </div>

            {/* Life Insurance */}
            <div className="lf-ins-card" style={{'--card-bg':'linear-gradient(135deg,#6366f1,#4f46e5)', '--card-glow':'#6366f1', '--card-shadow':'rgba(99,102,241,0.25)', '--card-accent':'#4f46e5'} as React.CSSProperties} onClick={goToForm}>
              <div className="lf-ins-card-top">
                <div className="lf-ins-card-glow" />
                <div className="lf-ins-icon-wrap">🛡️</div>
                <div className="lf-ins-card-name">Life Insurance</div>
                <div className="lf-ins-card-tagline">Protect your family's financial future with the right term or investment-linked plan.</div>
                <ul className="lf-ins-features">
                  {['Pure term plans at lowest premiums', 'ULIPs & endowment policies', 'Whole life & retirement plans', 'Rider add-ons for extra protection'].map(f => (
                    <li key={f} className="lf-ins-feature">
                      <span className="lf-ins-check" style={{background:'linear-gradient(135deg,#6366f1,#4f46e5)'}}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lf-ins-card-foot">
                <span className="lf-ins-explore">Explore Plans <span>→</span></span>
                <span className="lf-ins-plans">40+ plans compared</span>
              </div>
            </div>

            {/* Vehicle Insurance */}
            <div className="lf-ins-card" style={{'--card-bg':'linear-gradient(135deg,#f59e0b,#d97706)', '--card-glow':'#f59e0b', '--card-shadow':'rgba(245,158,11,0.25)', '--card-accent':'#d97706'} as React.CSSProperties} onClick={goToForm}>
              <div className="lf-ins-card-top">
                <div className="lf-ins-card-glow" />
                <div className="lf-ins-icon-wrap">🚗</div>
                <div className="lf-ins-card-name">Vehicle Insurance</div>
                <div className="lf-ins-card-tagline">Complete protection for your car, bike and commercial vehicles against all risks.</div>
                <ul className="lf-ins-features">
                  {['Comprehensive & third-party cover', 'Zero depreciation add-on', 'Instant policy issuance online', 'Cashless repairs at 4000+ garages'].map(f => (
                    <li key={f} className="lf-ins-feature">
                      <span className="lf-ins-check" style={{background:'linear-gradient(135deg,#f59e0b,#d97706)'}}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lf-ins-card-foot">
                <span className="lf-ins-explore">Explore Plans <span>→</span></span>
                <span className="lf-ins-plans">30+ plans compared</span>
              </div>
            </div>

          </div>
          <div className="lf-ins-bottom-cta">
            <p>Not sure which insurance you need? Our advisors will guide you — for free.</p>
            <div className="lf-cta-row" style={{justifyContent:'center'}}>
              <button className="lf-cta" onClick={goToForm}>Get Free Expert Advice →</button>
            </div>
          </div>
        </div>
      </section>

      <div className="lf-div" />

      {/* STEPS */}
      <div className="lf-sec">
        <p className="lf-sec-tag">How it works</p>
        <h2 className="lf-sec-h2">Simple 3 Step Process</h2>
        <p className="lf-sec-sub">From first conversation to claim settlement — we're with you at every step.</p>
        <div className="lf-steps-g">
          {steps.map(s => (
            <div className="lf-step-card" key={s.num}>
              <div className="lf-step-n">{s.num}</div>
              <div className="lf-step-title">{s.icon} {s.title}</div>
              <div className="lf-step-text">{s.text}</div>
            </div>
          ))}
        </div>
        <div className="lf-cta-row" style={{ marginTop: '2.25rem' }}>
          <button className="lf-cta" onClick={goToForm}>Get Started Free →</button>
          <button className="lf-ghost" onClick={goToForm}>Get My Report</button>
        </div>
      </div>

      <div className="lf-div" />

      {/* COMPARISON */}
      <div className="lf-sec">
        <p className="lf-sec-tag">Why choose us</p>
        <h2 className="lf-sec-h2">Services you won't find elsewhere</h2>
        <p className="lf-sec-sub">Unlike popular insurance comparison platforms, InsuranceShiva is 100% on your side.</p>
        <div className="lf-compare-wrap">
          <table className="lf-ct">
            <thead>
              <tr>
                <th>Feature</th>
                <th>InsuranceShiva</th>
                <th>Other Platforms</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map(row => (
                <tr key={row.feature}>
                  <td>{row.feature}</td>
                  <td><span className="chk">✓</span>{row.us}</td>
                  <td><span className="crs">✗</span>{row.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lf-cta-row" style={{ marginTop: '2.25rem' }}>
          <button className="lf-cta" onClick={goToForm}>
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11.8 19.79 19.79 0 0 1 1.61 3.19 2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Talk to an Expert Now
          </button>
        </div>
      </div>

      <div className="lf-footer">© {new Date().getFullYear()} InsuranceShiva · 100% Unbiased · Zero Commission · All rights reserved</div>
      <Toaster position="top-center" />
    </div>
  );
}

export default MainSite;
