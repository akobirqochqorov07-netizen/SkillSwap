'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div className="glass animate-fade-in" style={{ padding: '4rem', borderRadius: 'var(--radius)', maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--text), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Exchange Skills.<br />Grow Together.
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
          SkillSwap.uz is the first platform in Uzbekistan where students trade knowledge.
          No money involved. Just pure learning and growth.
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <button className="btn-primary" onClick={() => router.push('/register')} style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
            Get Started
          </button>
          <button className="glass" onClick={() => router.push('/login')} style={{ fontSize: '1.1rem', padding: '1rem 2rem', borderRadius: '8px', color: 'white', border: '1px solid var(--border)' }}>
            Sign In
          </button>
        </div>

        <div style={{ marginTop: '4rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--secondary)' }}>100% Free</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Swap skills with other students without any costs.</p>
          </div>
          <div>
            <h3 style={{ color: 'var(--primary)' }}>Verified Skills</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Get your skills verified by our AI for better matching.</p>
          </div>
          <div>
            <h3 style={{ color: 'var(--accent)' }}>Fast Growth</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Learn twice as fast by teaching others what you know.</p>
          </div>
        </div >
      </div >
    </div >
  );
}
