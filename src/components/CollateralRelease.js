// ✅ CollateralRelease.jsx
import React, { useState } from 'react';

const styles = {
  section: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
    maxWidth: '500px',
    margin: 'auto',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '1.5rem',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  item: {
    background: '#f7f7f7',
    padding: '12px',
    borderRadius: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4a00e0',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

const mockReleasedLoans = [
  { loanId: 'LN20345XYZ', amount: '0.05 BTC', txHash: '0xabc123' },
];

const CollateralRelease = () => {
  const [released, setReleased] = useState([]);

  const handleRelease = (loanId) => {
    setReleased([...released, loanId]);
    // Simulate backend release logic
    alert(`Collateral released for Loan ${loanId}`);
  };

  return (
    <div style={styles.section}>
      <h3 style={styles.heading}>🔓 Collateral Release</h3>
      {mockReleasedLoans.map((loan) => (
        <div style={styles.item} key={loan.loanId}>
          <span>
            {loan.loanId} – {loan.amount}
          </span>
          <button
            style={styles.button}
            onClick={() => handleRelease(loan.loanId)}
            disabled={released.includes(loan.loanId)}
          >
            {released.includes(loan.loanId) ? 'Released ✅' : 'Release'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CollateralRelease;
