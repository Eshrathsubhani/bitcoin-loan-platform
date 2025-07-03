import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/shared/Button'; 

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
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
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
    marginTop: '12px',
  },
  successMsg: {
    color: 'green',
    textAlign: 'center',
    marginTop: '12px',
  },
};

// 🔁 Mock loan data for demo/testing
const mockLoans = [
  { loanId: 'LN20345XYZ', outstanding: 800 },
  { loanId: 'LN20346ABC', outstanding: 1200 },
];

const RepayLoan = () => {
  const [loanId, setLoanId] = useState('');
  const [amount, setAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const selectedLoan = mockLoans.find((loan) => loan.loanId === loanId);

  const handleSubmit = (e) => {
    e.preventDefault();

    const repayAmount = parseFloat(amount);

    if (!loanId) {
      setError('Please select a loan to repay.');
      return;
    }

    if (!repayAmount || repayAmount <= 0) {
      setError('Enter a valid repayment amount.');
      return;
    }

    if (selectedLoan && repayAmount > selectedLoan.outstanding) {
      setError('Repayment amount exceeds outstanding balance.');
      return;
    }

    setError('');
    setProcessing(true);
    console.log('✅ Repayment Submitted:', { loanId, amount });

    setTimeout(() => {
      setSubmitted(true);
      setProcessing(false);
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.formCard} onSubmit={handleSubmit} aria-label="Repay Loan Form">
        <h2 style={styles.heading}>💵 Repay Loan</h2>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="loan-id">Select Loan</label>
          <select
            id="loan-id"
            style={styles.input}
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            required
            aria-required="true"
          >
            <option value="">-- Choose your loan --</option>
            {mockLoans.map((loan) => (
              <option key={loan.loanId} value={loan.loanId}>
                {loan.loanId} (O/S: ${loan.outstanding})
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="repay-amount">Repayment Amount (USD)</label>
          <input
            id="repay-amount"
            type="number"
            step="0.01"
            min="0"
            style={styles.input}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={
              loanId ? `Max: $${selectedLoan?.outstanding}` : 'Select a loan first'
            }
            required
            disabled={!loanId}
            aria-required="true"
          />
        </div>

        {/* 🟣 You can use shared Button or keep default */}
        <button
          type="submit"
          style={styles.button}
          disabled={processing}
          aria-disabled={processing}
        >
          {processing ? 'Processing...' : 'Submit Repayment'}
        </button>

        {error && <div style={styles.errorMsg}>{error}</div>}
        {submitted && !error && (
          <div style={styles.successMsg}>✔️ Repayment submitted successfully!</div>
        )}
      </form>
    </div>
  );
};

export default RepayLoan;
