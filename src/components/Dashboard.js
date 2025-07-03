import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import InfoSection from '../components/shared/InfoSection';
import PriceTicker from '../components/PriceTicker';
import Notification from '../components/Notification';
import CollateralRelease from '../components/CollateralRelease';
import TransactionHistory from '../components/TransactionHistory';

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #1f1c2c, #928dab)',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333',
    padding: '40px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  header: {
    textAlign: 'center',
    color: '#fff',
    fontSize: '2.2rem',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '30px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
  infoGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '10px',
  },
  button: {
    padding: '12px 18px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#4a00e0',
    color: '#fff',
    flex: '1 1 auto',
    minWidth: '120px',
  },
  buttonAlt: {
    backgroundColor: '#928dab',
  },
  sectionTitle: {
    fontSize: '1.3rem',
    marginBottom: '15px',
    fontWeight: 'bold',
  },
  empty: {
    color: '#888',
    fontStyle: 'italic',
  },
  '@media(min-width: 768px)': {
    grid: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
};

const Dashboard = ({ loanData, loading }) => {
  const navigate = useNavigate();

  const sampleLoan = {
    loanId: 'LN20345XYZ',
    btcCollateral: '0.05 BTC',
    usdValue: '$1,250',
    dueDate: '15 Aug 2025',
  };

  const data = loanData || sampleLoan;

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.header}>📊 DeFi Loan Dashboard</h1>

      <Notification />
      <PriceTicker />

      <div style={styles.grid}>
        {/* Loan Overview Card */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Loan Overview</div>

          {loading ? (
            <div>🔄 Loading loan data...</div>
          ) : loanData ? (
            <>
              <div style={styles.infoGroup}>
                <InfoSection label="Loan ID" value={data.loanId} />
                <InfoSection label="BTC Collateral" value={data.btcCollateral} />
                <InfoSection label="Loan Amount" value={data.usdValue} />
                <InfoSection label="Due Date" value={data.dueDate} />
              </div>

              <div style={styles.buttonGroup}>
                <button style={styles.button} onClick={() => navigate('/loan')}>
                  📝 Request Loan
                </button>
                <button
                  style={{ ...styles.button, ...styles.buttonAlt }}
                  onClick={() => navigate('/repay')}
                >
                  💵 Repay Loan
                </button>
              </div>
            </>
          ) : (
            <div>
              <p style={styles.empty}>No active loans found.</p>
              <button style={styles.button} onClick={() => navigate('/loan')}>
                📝 Request Your First Loan
              </button>
            </div>
          )}
        </div>

        {/* Collateral Release Card */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Collateral Management</div>
          <CollateralRelease />
        </div>

        {/* Transaction History Card */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Transaction History</div>
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  loanData: PropTypes.shape({
    loanId: PropTypes.string,
    btcCollateral: PropTypes.string,
    usdValue: PropTypes.string,
    dueDate: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

Dashboard.defaultProps = {
  loanData: null,
  loading: false,
};

export default Dashboard;
