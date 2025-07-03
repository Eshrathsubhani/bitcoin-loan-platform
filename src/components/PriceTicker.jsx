// ✅ PriceTicker.jsx
import React, { useEffect, useState } from 'react';

const styles = {
  ticker: {
    background: '#4a00e0',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '10px',
    marginBottom: '20px',
    fontSize: '1rem',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
};

const PriceTicker = () => {
  const [btcPrice, setBtcPrice] = useState('');

  useEffect(() => {
    // Simulated BTC price fetch
    const interval = setInterval(() => {
      const price = (30000 + Math.random() * 5000).toFixed(2);
      setBtcPrice(`$${price}`);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <div style={styles.ticker}>📈 BTC Price: {btcPrice}</div>;
};

export default PriceTicker;

