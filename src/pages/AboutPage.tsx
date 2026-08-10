import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCallModal from '../components/BookCallModal';
import { useNavigate } from 'react-router-dom';

// ── Typewriter hook ──────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let delay = deleting ? speed / 2 : speed;

    if (!deleting && charIdx === current.length) {
      delay = pause;
      const t = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setWordIdx(i => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplayed(current.slice(0, charIdx + (deleting ? -1 : 1)));
      setCharIdx(i => i + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayed;
}

// ── Animated counter hook ────────────────────────────────────────
function useCountUp(target: number, duration = 2, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          gsap.to({ val: 0 }, {
            val: target,
            duration,
            ease: 'power2.out',
            onUpdate: function () {
              setCount(parseFloat(this.targets()[0].val.toFixed(decimals)));
            },
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals]);

  return { count, ref };
}

// ── Stat item ────────────────────────────────────────────────────
interface StatConfig { prefix?: string; target: number; suffix: string; decimals?: number; label: string }

const StatItem: React.FC<StatConfig> = ({ prefix = '', target, suffix, decimals = 0, label }) => {
  const { count, ref } = useCountUp(target, 2, decimals);
  return (
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2.4rem', fontWeight: 900, color: '#1f2937', lineHeight: 1 }}>
        {prefix}{decimals ? count.toFixed(decimals) : count.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '0.5rem', fontWeight: 500 }}>{label}</div>
    </div>
  );
};

// ── Data ─────────────────────────────────────────────────────────
const TYPEWRITER_WORDS = [
  'Unbiased Insurance Advice',
  'Lifetime Claims Support',
  'Zero Commission Guidance',
  'India\'s Trusted Advisors',
];

const statsConfig: StatConfig[] = [
  { target: 50000, suffix: '+', label: 'Families Protected' },
  { prefix: '₹', target: 500, suffix: 'Cr+', label: 'Claims Settled' },
  { target: 4.9, suffix: '★', decimals: 1, label: 'Customer Rating' },
  { target: 100, suffix: '%', label: 'Unbiased Advice' },
];

const values = [
  { icon: '🎯', title: 'Unbiased Advice', desc: 'We earn zero commission from insurers. Our only goal is your best interest.' },
  { icon: '🤝', title: 'Lifetime Support', desc: 'Your advisor stays with you forever — from purchase to every claim.' },
  { icon: '🔒', title: 'Privacy First', desc: 'Your data is never sold or shared with third parties. Ever.' },
  { icon: '💡', title: 'Education Over Sales', desc: 'We help you understand insurance, not just sell you a policy.' },
  { icon: '⚡', title: 'Fast & Transparent', desc: 'No jargon, no hidden fees, no spam calls. Just clear, honest guidance.' },
  { icon: '🏆', title: 'Top 5% Advisors', desc: 'Every advisor on our platform is rigorously vetted and certified.' },
];

const team = [
  { name: 'Shiva Reddy', role: 'Founder', img: '/advisor-hero.png' },
  { name: 'Susmitha', role: 'Team Member', img: '/advisor-hero.png' },
  { name: 'Akhila', role: 'Team Member', img: '/advisor-hero.png' },
  { name: 'Pujitha', role: 'Team Member', img: '/advisor-hero.png' },
  { name: 'Madhu Mitha', role: 'Team Member', img: '/advisor-hero.png' },
];

// ── Page ─────────────────────────────────────────────────────────
const AboutPage: React.FC = () => {
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const navigate = useNavigate();
  const typed = useTypewriter(TYPEWRITER_WORDS);

  return (
    <>
      <Header onBookCall={() => setBookCallOpen(true)} />

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a3350 100%)', paddingTop: '110px', paddingBottom: '5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', padding: '0 1.5rem' }}>
          <span style={{ display: 'inline-block', background: 'rgba(46,159,104,0.15)', border: '1px solid rgba(46,159,104,0.4)', color: '#4ade80', padding: '0.3rem 1rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>
            Our Story
          </span>

          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 900, color: 'white', lineHeight: 1.15, marginBottom: '1rem' }}>
            India's First 100%<br />
            <span style={{ color: '#4ade80' }}>Unbiased Insurance Platform</span>
          </h1>

          {/* Typewriter line */}
          <div style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 700, color: '#e2e8f0', minHeight: '2.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0' }}>
            <span>{typed}</span>
            <span style={{ display: 'inline-block', width: '2px', height: '1.3em', background: '#4ade80', marginLeft: '3px', animation: 'blink 1s step-end infinite', verticalAlign: 'middle' }} />
          </div>

          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.8, maxWidth: '580px', margin: '0 auto' }}>
            InsuranceShiva was born from a simple frustration — every insurance platform was secretly working for the insurer, not the customer. We changed that.
          </p>
        </div>
      </div>

      {/* Blink keyframe */}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

      {/* Stats — animated counters */}
      <div style={{ background: 'white', padding: '3.5rem 1.5rem', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem' }}>
          {statsConfig.map(s => <StatItem key={s.label} {...s} />)}
        </div>
      </div>

      {/* Story */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2e9f68', marginBottom: '0.75rem' }}>Why We Exist</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#1f2937', marginBottom: '1.25rem', lineHeight: 1.2 }}>
            We got tired of watching families get the wrong insurance
          </h2>
          <p style={{ color: '#4b5563', lineHeight: 1.85, marginBottom: '1rem' }}>
            In 2019, our founder Shiva Reddy watched his own family struggle with a rejected health insurance claim — a policy sold by a commission-hungry agent who never explained the exclusions.
          </p>
          <p style={{ color: '#4b5563', lineHeight: 1.85, marginBottom: '1.75rem' }}>
            That moment sparked InsuranceShiva. A platform where every recommendation is driven purely by what's best for the customer — not what earns the highest commission.
          </p>
          <button onClick={() => setBookCallOpen(true)} style={{ padding: '0.85rem 2rem', background: '#2e9f68', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
            Talk to Our Team →
          </button>
        </div>
        <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.12)' }}>
          <img src="/advisor-hero.png" alt="InsuranceShiva Team" style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '4/3' }} />
        </div>
      </div>

      {/* Values */}
      <div style={{ background: '#f9fafb', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2e9f68', marginBottom: '0.5rem' }}>What We Stand For</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#1f2937' }}>Our Core Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {values.map(v => (
              <div key={v.title} style={{ background: 'white', borderRadius: '14px', padding: '1.75rem', border: '1px solid #e5e7eb', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{v.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#1f2937', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.88rem', color: '#6b7280', lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2e9f68', marginBottom: '0.5rem' }}>The People Behind It</p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#1f2937' }}>Meet Our Team</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {team.map(m => (
            <div key={m.name} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <img src={m.img} alt={m.name} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ margin: '0 0 0.25rem', fontSize: '1.05rem', fontWeight: 700, color: '#1f2937' }}>{m.name}</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#2e9f68', fontWeight: 600 }}>{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1a3350)', padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: 'white', marginBottom: '1rem' }}>Want to join our mission?</h2>
          <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.7 }}>We're always looking for passionate people who want to make insurance simple and honest for every Indian family.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/careers')} style={{ padding: '0.9rem 2rem', background: '#2e9f68', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
              View Open Positions →
            </button>
            <button onClick={() => setBookCallOpen(true)} style={{ padding: '0.9rem 2rem', background: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}>
              Talk to Us
            </button>
          </div>
        </div>
      </div>

      <Footer onBookCall={() => setBookCallOpen(true)} />
      <BookCallModal isOpen={bookCallOpen} onClose={() => setBookCallOpen(false)} />
    </>
  );
};

export default AboutPage;
