// ✅ TransactionHistory.jsx
import React from 'react';

const styles = {
  container: {
    maxWidth: '800px',
    margin: '30px auto',
    background: '#fff',
    borderRadius: '20px',
    padding: '30px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
  },
  th: {
    backgroundColor: '#4a00e0',
    color: '#fff',
    padding: '10px',
    borderRadius: '6px',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    textAlign: 'center',
  },
};

const mockTransactions = [
  { date: '2025-07-01', type: 'Loan', amount: '$1250', status: 'Approved', hash: '0xabc123' },
  { date: '2025-07-02', type: 'Repayment', amount: '$800', status: 'Success', hash: '0xdef456' },
  { date: '2025-07-03', type: 'Release', amount: '0.05 BTC', status: 'Completed', hash: '0xghi789' },
];

const TransactionHistory = () => {
  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>📜 Transaction History</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Hash</th>
          </tr>
        </thead>
        <tbody>
          {mockTransactions.map((tx, index) => (
            <tr key={index}>
              <td style={styles.td}>{tx.date}</td>
              <td style={styles.td}>{tx.type}</td>
              <td style={styles.td}>{tx.amount}</td>
              <td style={styles.td}>{tx.status}</td>
              <td style={styles.td}>{tx.hash}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
