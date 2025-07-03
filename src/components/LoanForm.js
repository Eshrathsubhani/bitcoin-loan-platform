import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriceTicker from '../components/PriceTicker'; 
 import Button from '../components/shared/Button';   

const BTC_PRICE = 25000; // Replace with real-time price via API later

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1f1c2c, #928dab)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '20px',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '18px',
    textAlign: 'left',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '6px',
    color: '#000',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '14px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#4a00e0',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background 0.3s',
    marginTop: '10px',
  },
  errorMsg: {
    color: 'red',
    textAlign: 'center',
    marginTop: '10px',
  },
  successMsg: {
    color: 'green',
    textAlign: 'center',
    marginTop: '20px',
  },
  ltvBox: {
    background: '#f3f3f3',
    borderRadius: '8px',
    padding: '8px 12px',
    marginBottom: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
};

const LoanForm = () => {
  const [btcAmount, setBtcAmount] = useState('');
  const [usdAmount, setUsdAmount] = useState('');
  const [term, setTerm] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  const collateralUSD = btcAmount ? parseFloat(btcAmount) * BTC_PRICE : 0;
  const ltv = usdAmount && collateralUSD
    ? ((parseFloat(usdAmount) / collateralUSD) * 100).toFixed(2)
    : '';

  const validate = () => {
    if (!btcAmount || btcAmount <= 0) return 'BTC collateral must be greater than 0';
    if (!usdAmount || usdAmount <= 0) return 'Loan amount must be greater than 0';
    if (!term || term <= 0) return 'Loan term must be greater than 0';
    if (ltv && ltv > 80) return 'LTV exceeds safe threshold (max 80%)';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setProcessing(true);

    console.log('Loan Request Submitted:', { btcAmount, usdAmount, term });

    setSubmitted(true);
    setTimeout(() => {
      setProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.formCard} onSubmit={handleSubmit} aria-label="Loan Request Form">
        <h2 style={styles.heading}>📝 Request a Loan</h2>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="btc-collateral">BTC Collateral (e.g., 0.05)</label>
          <input
            id="btc-collateral"
            type="number"
            step="0.0001"
            min="0"
            required
            style={styles.input}
            value={btcAmount}
            onChange={(e) => setBtcAmount(e.target.value)}
            aria-required="true"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="usd-amount">Loan Amount in USD</label>
          <input
            id="usd-amount"
            type="number"
            min="0"
            required
            style={styles.input}
            value={usdAmount}
            onChange={(e) => setUsdAmount(e.target.value)}
            aria-required="true"
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="loan-term">Loan Term (in months)</label>
          <input
            id="loan-term"
            type="number"
            min="1"
            required
            style={styles.input}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            aria-required="true"
          />
        </div>

        {ltv && (
          <div style={styles.ltvBox}>
            LTV: {ltv}% {ltv > 80 ? '⚠️ (High risk)' : ''}
          </div>
        )}

        <button
          type="submit"
          style={styles.button}
          disabled={processing}
          aria-disabled={processing}
        >
          {processing ? 'Processing...' : 'Submit Request'}
        </button>

        {error && <div style={styles.errorMsg}>{error}</div>}
        {submitted && !error && (
          <div style={styles.successMsg}>✔️ Loan request submitted successfully!</div>
        )}
      </form>
    </div>
  );
};

export default LoanForm;
