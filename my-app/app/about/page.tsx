'use client';

import { useEffect, useState } from 'react';

interface MetricBarProps {
    label: string;
    value: number;
    color?: string;
}

function MetricBar({ label, value, color }: MetricBarProps) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setWidth(value), 300);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div className="metric-bar-container">
            <div className="metric-bar-header">
                <span className="metric-bar-label">{label}</span>
                <span className="metric-bar-value">{value}%</span>
            </div>
            <div className="metric-bar-track">
                <div
                    className={`metric-bar-fill ${color || ''}`}
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    );
}

const features = [
    { name: 'Age', desc: 'Applicant age (18–80). Older, stable applicants tend to have better repayment histories.', icon: '🎂' },
    { name: 'Income', desc: 'Annual income in USD. Higher income signals greater repayment capacity.', icon: '💵' },
    { name: 'LoanAmount', desc: 'Total loan amount requested. Evaluated relative to income for affordability.', icon: '🏦' },
    { name: 'CreditScore', desc: 'Credit score (300–850). The single most predictive feature for loan default risk.', icon: '⭐' },
    { name: 'MonthsEmployed', desc: 'Duration of current employment. Longer tenure indicates job stability.', icon: '📅' },
    { name: 'NumCreditLines', desc: 'Active credit lines. Indicates credit management behaviour.', icon: '💳' },
    { name: 'InterestRate', desc: 'Proposed interest rate percentage. Higher rates correlate with higher risk profiles.', icon: '📈' },
    { name: 'LoanTerm', desc: 'Repayment period in months (6–360). Longer terms reduce monthly burden.', icon: '⏳' },
    { name: 'DTIRatio', desc: 'Debt-to-Income ratio (0–1). Values above 0.4 significantly increase default risk.', icon: '⚖️' },
    { name: 'Education', desc: 'Highest education level. Correlates with earning potential and financial literacy.', icon: '🎓' },
    { name: 'EmploymentType', desc: 'Nature of employment — Full-time, Part-time, Self-employed, or Unemployed.', icon: '💼' },
    { name: 'MaritalStatus', desc: 'Marital status of applicant — Single, Married, or Divorced.', icon: '💍' },
    { name: 'HasMortgage', desc: 'Whether the applicant currently holds a mortgage. Indicates existing financial commitments.', icon: '🏠' },
    { name: 'HasDependents', desc: 'Whether the applicant has financial dependents, affecting disposable income.', icon: '👨‍👩‍👧' },
    { name: 'LoanPurpose', desc: 'Purpose of the loan — Home, Auto, Education, Business, Personal, or Other.', icon: '🎯' },
    { name: 'HasCoSigner', desc: 'Whether a co-signer is present, which reduces lender risk significantly.', icon: '🤝' },
];

const techStack = [
    { label: 'Python 3.10+', icon: '🐍' },
    { label: 'Scikit-learn', icon: '⚙️' },
    { label: 'Pandas', icon: '🐼' },
    { label: 'NumPy', icon: '🔢' },
    { label: 'Matplotlib', icon: '📊' },
    { label: 'Seaborn', icon: '🎨' },
    { label: 'Next.js 14', icon: '▲' },
    { label: 'TypeScript', icon: '🔷' },
    { label: 'Flask / FastAPI', icon: '🌐' },
    { label: 'Joblib', icon: '💾' },
];

export default function AboutPage() {
    return (
        <main className="page-container">
            <div className="about-hero">
                <div className="hero-badge">
                    <span className="dot" />
                    Model Documentation
                </div>
                <h1 className="hero-title">Model Information</h1>
                <p className="hero-subtitle">
                    A deep dive into our Loan Eligibility ML model — its architecture, training data,
                    performance metrics, and the features it uses to make predictions.
                </p>
            </div>

            <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                <div className="stat-card">
                    <div className="stat-value">88.5%</div>
                    <div className="stat-label">Accuracy</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">0.1860</div>
                    <div className="stat-label">Decision Threshold</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">F1-Score</div>
                    <div className="stat-label">Optimized metric</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">16</div>
                    <div className="stat-label">Input Features</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">255K</div>
                    <div className="stat-label">Training Samples</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">0.84</div>
                    <div className="stat-label">AUC-ROC Score</div>
                </div>
            </div>

            <div className="about-two-col" style={{ marginBottom: '1.5rem' }}>

                <div className="card">
                    <div className="card-header">
                        <div className="card-icon purple">🧠</div>
                        <div>
                            <div className="card-title">Model Overview</div>
                            <div className="card-subtitle">Architecture & training details</div>
                        </div>
                    </div>
                    <div className="feature-list">
                        <div className="feature-item">
                            <div className="feature-num">1</div>
                            <div>
                                <div className="feature-name">Algorithm</div>
                                <div className="feature-desc">Logistic Regression model, selected for its reliability and balance between performance and explainability.</div>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-num">2</div>
                            <div>
                                <div className="feature-name">Dataset</div>
                                <div className="feature-desc">255,347 loan records from the "Loan Default Dataset" on Kaggle, providing a comprehensive diversity of financial profiles.</div>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-num">3</div>
                            <div>
                                <div className="feature-name">Preprocessing</div>
                                <div className="feature-desc">Dynamic One-Hot Encoding for categorical features and direct numeric mapping to preserve the underlying distribution weighting.</div>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-num">4</div>
                            <div>
                                <div className="feature-name">Target Variable</div>
                                <div className="feature-desc">Binary classification — <strong style={{ color: 'var(--success)' }}>0 = No Default (Eligible)</strong>, <strong style={{ color: 'var(--danger)' }}>1 = Default (Not Eligible)</strong>.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="card-icon cyan">📊</div>
                        <div>
                            <div className="card-title">Performance Metrics</div>
                            <div className="card-subtitle">Optimized for Default Detection</div>
                        </div>
                    </div>
                    <MetricBar label="Accuracy" value={88.5} />
                    <MetricBar label="Decision Threshold" value={18.6} color="cyan" />
                    <MetricBar label="Precision (Class 1)" value={58.0} color="green" />
                    <MetricBar label="F1-Score" value={35.8} color="orange" />
                    <MetricBar label="AUC-ROC" value={84.0} />
                    <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '10px' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            The model threshold (0.1860) is specifically tuned to maximize F1-score, ensuring we catch as many default risks as possible while remaining fair.
                        </p>
                    </div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '1.5rem' }}>
                <div className="card-header">
                    <div className="card-icon green">📋</div>
                    <div>
                        <div className="card-title">Input Features</div>
                        <div className="card-subtitle">All 16 features used for prediction — their meaning and impact</div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '0.75rem',
                    }}
                >
                    {features.map((f, i) => (
                        <div key={f.name} className="feature-item">
                            <div className="feature-num">{f.icon}</div>
                            <div>
                                <div className="feature-name">{f.name}</div>
                                <div className="feature-desc">{f.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-two-col" style={{ marginBottom: '1.5rem' }}>

                <div className="card">
                    <div className="card-header">
                        <div className="card-icon orange">🏆</div>
                        <div>
                            <div className="card-title">Top Feature Importances</div>
                            <div className="card-subtitle">Inferred importance from Logistic coefficients</div>
                        </div>
                    </div>
                    <MetricBar label="CreditScore" value={35} />
                    <MetricBar label="DTIRatio" value={25} color="cyan" />
                    <MetricBar label="InterestRate" value={15} color="green" />
                    <MetricBar label="Income" value={10} color="orange" />
                    <MetricBar label="Age" value={6} />
                    <MetricBar label="EmploymentType" value={4} color="cyan" />
                    <MetricBar label="LoanPurpose" value={3} color="green" />
                    <MetricBar label="Other Features" value={2} color="orange" />
                </div>

                <div className="card">
                    <div className="card-header">
                        <div className="card-icon purple">🔬</div>
                        <div>
                            <div className="card-title">How Prediction Works</div>
                            <div className="card-subtitle">Backend Processing Pipeline</div>
                        </div>
                    </div>
                    <div className="feature-list">
                        <div className="feature-item">
                            <div className="feature-num">1</div>
                            <div>
                                <div className="feature-name">Data Capture</div>
                                <div className="feature-desc">Raw form data is structured into a record and sent to the Python serverless backend.</div>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-num">2</div>
                            <div>
                                <div className="feature-name">Preprocessing</div>
                                <div className="feature-desc">Categorical strings are converted via One-Hot Encoding to match the model's 16+ input nodes.</div>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-num">3</div>
                            <div>
                                <div className="feature-name">Inference</div>
                                <div className="feature-desc">The Logistic Regression model calculates a probability score for loan default risk.</div>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-num">4</div>
                            <div>
                                <div className="feature-name">Threshold Mapping</div>
                                <div className="feature-desc">If the probability is &lt; 0.1860, the application is approved. This specific threshold optimizes for the best F1-Score balance.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <div className="card-icon cyan">⚙️</div>
                    <div>
                        <div className="card-title">Technology Stack</div>
                        <div className="card-subtitle">Tools &amp; libraries powering this solution</div>
                    </div>
                </div>
                <div className="tech-grid">
                    {techStack.map((t) => (
                        <div key={t.label} className="tech-badge">
                            <span>{t.icon}</span>
                            <span>{t.label}</span>
                        </div>
                    ))}
                </div>
                <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '12px' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        <strong style={{ color: 'var(--text-primary)' }}>⚠️ Disclaimer:</strong> This tool is intended for educational and demonstrational purposes only.
                        Predictions are generated by a machine learning model and should not be used as a substitute
                        for official financial or credit evaluation by a licensed institution.
                    </p>
                </div>
            </div>
        </main>
    );
}
