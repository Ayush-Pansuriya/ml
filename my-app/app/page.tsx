'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendUp?: boolean;
  icon: string;
  color: string;
}

function StatCard({ title, value, trend, trendUp, icon, color }: StatCardProps) {
  return (
    <div className="card glass-card">
      <div className="card-header" style={{ marginBottom: '0.5rem' }}>
        <div className={`card-icon ${color}`}>{icon}</div>
        <div className="stat-label" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{title}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <div className="stat-value" style={{ fontSize: '1.8rem', fontWeight: '700' }}>{value}</div>
        {trend && (
          <div style={{ fontSize: '0.8rem', color: trendUp ? '#10b981' : '#ef4444', fontWeight: '600' }}>
            {trendUp ? '↑' : '↓'} {trend}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const mockHistory = [
    { id: '1092', user: 'Alex J.', score: 742, amount: '$45,000', status: 'Approved', date: '2 mins ago' },
    { id: '1091', user: 'Sarah M.', score: 580, amount: '$12,000', status: 'Rejected', date: '15 mins ago' },
    { id: '1090', user: 'James L.', score: 695, amount: '$25,000', status: 'Approved', date: '45 mins ago' },
    { id: '1089', user: 'Elena R.', score: 810, amount: '$60,000', status: 'Approved', date: '1 hour ago' },
    { id: '1088', user: 'Robert K.', score: 420, amount: '$5,000', status: 'Rejected', date: '3 hours ago' },
  ];

  return (
    <main className="page-container">
      <div className="hero" style={{ marginBottom: '2rem' }}>
        <div className="hero-badge">
          <span className="dot"></span>
          Analytics Dashboard
        </div>
        <h1 className="hero-title">System Overview</h1>
        <p className="hero-subtitle">
          Real-time insights into loan eligibility predictions, risk distribution, and AI model performance.
        </p>
      </div>

      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <StatCard title="Approval Rate" value="68.4%" trend="2.1%" trendUp={true} icon="✅" color="green" />
        <StatCard title="Avg. Credit Score" value="692" trend="4pts" trendUp={true} icon="⭐" color="purple" />
        <StatCard title="Total Predictions" value="1,284" trend="12%" trendUp={true} icon="📊" color="cyan" />
        <StatCard title="System Confidence" value="88.5%" trend="Stable" trendUp={true} icon="🛡️" color="orange" />
      </div>

      <div className="about-two-col" style={{ marginBottom: '2rem' }}>
        <div className="card glass-card">
          <div className="card-header">
            <div className="card-icon purple">📉</div>
            <div>
              <div className="card-title">Risk Distribution</div>
              <div className="card-subtitle">AI risk classification split</div>
            </div>
          </div>

          <div style={{ padding: '1rem 0' }}>
            <div style={{ display: 'flex', gap: '4px', height: '32px', marginBottom: '1rem', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={{ width: '45%', background: '#10b981', opacity: 0.8 }} title="Low Risk"></div>
              <div style={{ width: '25%', background: '#6366f1', opacity: 0.8 }} title="Medium Risk"></div>
              <div style={{ width: '20%', background: '#f59e0b', opacity: 0.8 }} title="High Risk"></div>
              <div style={{ width: '10%', background: '#ef4444', opacity: 0.8 }} title="Critical"></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="feature-item" style={{ padding: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                <div style={{ fontSize: '0.85rem' }}><strong>Low Risk:</strong> 45%</div>
              </div>
              <div className="feature-item" style={{ padding: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1' }}></div>
                <div style={{ fontSize: '0.85rem' }}><strong>Medium Risk:</strong> 25%</div>
              </div>
              <div className="feature-item" style={{ padding: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }}></div>
                <div style={{ fontSize: '0.85rem' }}><strong>High Risk:</strong> 20%</div>
              </div>
              <div className="feature-item" style={{ padding: '0.5rem' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div style={{ fontSize: '0.85rem' }}><strong>Critical:</strong> 10%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card glass-card">
          <div className="card-header">
            <div className="card-icon cyan">🚀</div>
            <div>
              <div className="card-title">Quick Actions</div>
              <div className="card-subtitle">Direct access to core features</div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: '1rem', paddingTop: '1rem' }}>
            <Link href="/predict" className="btn-predict" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
              New Prediction ⚡
            </Link>
            <Link href="/about" className="btn-reset" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px' }}>
              Model Details 📖
            </Link>
          </div>
        </div>
      </div>

      <div className="card glass-card">
        <div className="card-header">
          <div className="card-icon green">🕒</div>
          <div>
            <div className="card-title">Recent Activity</div>
            <div className="card-subtitle">Latest prediction logs and decisions</div>
          </div>
        </div>
        <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <th style={{ padding: '1rem 0.5rem' }}>ID</th>
                <th style={{ padding: '1rem 0.5rem' }}>Applicant</th>
                <th style={{ padding: '1rem 0.5rem' }}>Credit Score</th>
                <th style={{ padding: '1rem 0.5rem' }}>Loan Amount</th>
                <th style={{ padding: '1rem 0.5rem' }}>Status</th>
                <th style={{ padding: '1rem 0.5rem' }}>Time</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)' }}>#{item.id}</td>
                  <td style={{ padding: '1rem 0.5rem', fontWeight: '600' }}>{item.user}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>{item.score}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>{item.amount}</td>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '20px',
                      backgroundColor: item.status === 'Approved' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: item.status === 'Approved' ? '#10b981' : '#ef4444',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)' }}>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
