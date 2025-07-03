// ✅ Notification.jsx
import React from 'react';

const styles = {
  banner: {
    padding: '10px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '0.95rem',
    color: '#fff',
    textAlign: 'center',
  },
  success: { backgroundColor: '#28a745' },
  error: { backgroundColor: '#dc3545' },
  info: { backgroundColor: '#17a2b8' },
};

const Notification = ({ type = 'info', message }) => {
  return <div style={{ ...styles.banner, ...styles[type] }}>{message}</div>;
};

export default Notification;
