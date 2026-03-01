'use client';

import { useState } from 'react';

interface FormData {
    Age: string;
    Income: string;
    LoanAmount: string;
    CreditScore: string;
    MonthsEmployed: string;
    NumCreditLines: string;
    InterestRate: string;
    LoanTerm: string;
    DTIRatio: string;
    Education: string;
    EmploymentType: string;
    MaritalStatus: string;
    HasMortgage: string;
    HasDependents: string;
    LoanPurpose: string;
    HasCoSigner: string;
}

interface PredictionResult {
    eligible: boolean;
    confidence: number;
    message: string;
}

const initialForm: FormData = {
    Age: '',
    Income: '',
    LoanAmount: '',
    CreditScore: '',
    MonthsEmployed: '',
    NumCreditLines: '',
    InterestRate: '',
    LoanTerm: '',
    DTIRatio: '',
    Education: '',
    EmploymentType: '',
    MaritalStatus: '',
    HasMortgage: '',
    HasDependents: '',
    LoanPurpose: '',
    HasCoSigner: '',
};

export default function PredictPage() {
    const [form, setForm] = useState<FormData>(initialForm);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<PredictionResult | null>(null);
    const [step, setStep] = useState(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Prediction request failed');
            }

            const prediction: PredictionResult = await response.json();
            setResult(prediction);
        } catch (error) {
            console.error('Prediction failed:', error);
            setResult({
                eligible: false,
                confidence: 0,
                message: 'Something went wrong while processing your request. Please try again later.',
            });
        }
        setLoading(false);
    };

    const handleReset = () => {
        setForm(initialForm);
        setResult(null);
        setStep(1);
    };

    const isFormComplete = Object.values(form).every((v) => v !== '');

    const isStep1Valid = form.Age && form.Education && form.EmploymentType && form.MaritalStatus && form.HasDependents;
    const isStep2Valid = form.Income && form.CreditScore && form.MonthsEmployed && form.NumCreditLines && form.DTIRatio && form.HasMortgage;

    return (
        <main className="page-container">
            <div className="hero">
                <div className="hero-badge">
                    <span className="dot"></span>
                    AI-Powered Prediction
                </div>
                <h1 className="hero-title">Loan Eligibility Predictor</h1>
                <p className="hero-subtitle">
                    Complete the 3-step application below for an instant AI-driven eligibility assessment.
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', gap: '1rem', position: 'relative' }}>
                {[1, 2, 3].map((s) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 2 }}>
                        <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: step >= s ? 'var(--gradient-primary)' : 'var(--bg-card)',
                            border: '1px solid var(--border-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            color: step >= s ? 'white' : 'var(--text-muted)',
                            transition: 'all 0.3s ease'
                        }}>
                            {s}
                        </div>
                        <span style={{
                            fontSize: '0.85rem',
                            fontWeight: step === s ? '600' : '500',
                            color: step === s ? 'var(--text-primary)' : 'var(--text-muted)',
                            display: typeof window !== 'undefined' && window.outerWidth < 600 && step !== s ? 'none' : 'block'
                        }}>
                            {s === 1 ? 'Personal' : s === 2 ? 'Financial' : 'Loan Details'}
                        </span>
                    </div>
                ))}
                <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '20%',
                    right: '25%',
                    height: '2px',
                    background: 'var(--border-color)',
                    zIndex: 1
                }} />
            </div>

            <form onSubmit={handleSubmit}>
                {step === 1 && (
                    <div className="card glass-card" style={{ animation: 'slideRight 0.4s easeOut' }}>
                        <div className="card-header">
                            <div className="card-icon purple">👤</div>
                            <div>
                                <div className="card-title">Step 1: Personal Information</div>
                                <div className="card-subtitle">Basic applicant background</div>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label" htmlFor="Age">Age</label>
                                <input id="Age" name="Age" type="number" className="form-input" placeholder="e.g. 32" min={18} max={80} value={form.Age} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="Education">Education</label>
                                <select id="Education" name="Education" className="form-select" value={form.Education} onChange={handleChange} required>
                                    <option value="">Select education</option>
                                    <option value="High School">High School</option>
                                    <option value="Bachelor's">Bachelor's</option>
                                    <option value="Master's">Master's</option>
                                    <option value="PhD">PhD</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="EmploymentType">Employment Type</label>
                                <select id="EmploymentType" name="EmploymentType" className="form-select" value={form.EmploymentType} onChange={handleChange} required>
                                    <option value="">Select type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Self-employed">Self-employed</option>
                                    <option value="Unemployed">Unemployed</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="MaritalStatus">Marital Status</label>
                                <select id="MaritalStatus" name="MaritalStatus" className="form-select" value={form.MaritalStatus} onChange={handleChange} required>
                                    <option value="">Select status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="HasDependents">Has Dependents?</label>
                                <select id="HasDependents" name="HasDependents" className="form-select" value={form.HasDependents} onChange={handleChange} required>
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="button" className="btn-predict" onClick={nextStep} style={{ minWidth: '140px' }} disabled={!isStep1Valid}>
                                Next Step →
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="card glass-card" style={{ animation: 'slideRight 0.4s easeOut' }}>
                        <div className="card-header">
                            <div className="card-icon cyan">💰</div>
                            <div>
                                <div className="card-title">Step 2: Financial Profile</div>
                                <div className="card-subtitle">Income & credit history</div>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label" htmlFor="Income">Annual Income <span className="label-badge">USD</span></label>
                                <input id="Income" name="Income" type="number" className="form-input" placeholder="e.g. 60000" min={0} value={form.Income} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="CreditScore">Credit Score</label>
                                <input id="CreditScore" name="CreditScore" type="number" className="form-input" placeholder="300 – 850" min={300} max={850} value={form.CreditScore} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="MonthsEmployed">Months Employed</label>
                                <input id="MonthsEmployed" name="MonthsEmployed" type="number" className="form-input" placeholder="e.g. 24" min={0} value={form.MonthsEmployed} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="NumCreditLines">Num. Credit Lines</label>
                                <input id="NumCreditLines" name="NumCreditLines" type="number" className="form-input" placeholder="e.g. 3" min={0} max={20} value={form.NumCreditLines} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="DTIRatio">DTI Ratio <span className="label-badge">0–1</span></label>
                                <input id="DTIRatio" name="DTIRatio" type="number" className="form-input" placeholder="e.g. 0.35" step="0.01" min={0} max={1} value={form.DTIRatio} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="HasMortgage">Has Mortgage?</label>
                                <select id="HasMortgage" name="HasMortgage" className="form-select" value={form.HasMortgage} onChange={handleChange} required>
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                            <button type="button" className="btn-reset" onClick={prevStep}>
                                ← Back
                            </button>
                            <button type="button" className="btn-predict" onClick={nextStep} style={{ minWidth: '140px' }} disabled={!isStep2Valid}>
                                Next Step →
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="card glass-card" style={{ animation: 'slideRight 0.4s easeOut' }}>
                        <div className="card-header">
                            <div className="card-icon green">📋</div>
                            <div>
                                <div className="card-title">Step 3: Loan Details</div>
                                <div className="card-subtitle">Requested loan specifics</div>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label" htmlFor="LoanAmount">Loan Amount <span className="label-badge">USD</span></label>
                                <input id="LoanAmount" name="LoanAmount" type="number" className="form-input" placeholder="e.g. 15000" min={0} value={form.LoanAmount} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="InterestRate">Interest Rate <span className="label-badge">%</span></label>
                                <input id="InterestRate" name="InterestRate" type="number" className="form-input" placeholder="e.g. 7.5" step="0.1" min={0} max={35} value={form.InterestRate} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="LoanTerm">Loan Term <span className="label-badge">Months</span></label>
                                <input id="LoanTerm" name="LoanTerm" type="number" className="form-input" placeholder="e.g. 36" min={6} max={360} value={form.LoanTerm} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="LoanPurpose">Loan Purpose</label>
                                <select id="LoanPurpose" name="LoanPurpose" className="form-select" value={form.LoanPurpose} onChange={handleChange} required>
                                    <option value="">Select purpose</option>
                                    <option value="Home">Home</option>
                                    <option value="Auto">Auto</option>
                                    <option value="Education">Education</option>
                                    <option value="Business">Business</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="HasCoSigner">Has Co-Signer?</label>
                                <select id="HasCoSigner" name="HasCoSigner" className="form-select" value={form.HasCoSigner} onChange={handleChange} required>
                                    <option value="">Select option</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
                            <button type="button" className="btn-reset" onClick={prevStep}>
                                ← Back
                            </button>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button type="button" className="btn-reset" onClick={handleReset}>
                                    Reset
                                </button>
                                <button type="submit" className="btn-predict" disabled={loading || !isFormComplete} style={{ minWidth: '180px' }}>
                                    {loading ? <div className="spinner"></div> : '⚡ Predict Results'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>

            {result && (
                <div className="result-overlay" onClick={() => setResult(null)}>
                    <div className="result-card" onClick={(e) => e.stopPropagation()}>
                        <div className={`result-icon ${result.eligible ? 'approved' : 'rejected'}`}>
                            {result.eligible ? '✅' : '❌'}
                        </div>
                        <div className={`result-status ${result.eligible ? 'approved' : 'rejected'}`}>
                            {result.eligible ? 'Loan Approved!' : 'Not Eligible'}
                        </div>
                        <p className="result-message">{result.message}</p>
                        <div className="result-confidence">
                            <span className="result-confidence-label">Model Confidence Score</span>
                            <span className="result-confidence-value">{result.confidence}%</span>
                        </div>
                        <button className="btn-close-result" onClick={() => setResult(null)}>
                            Close Result
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
