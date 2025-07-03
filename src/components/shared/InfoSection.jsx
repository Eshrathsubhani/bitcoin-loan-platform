// src/components/shared/InfoSection.jsx
import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  section: {
    marginBottom: '15px',
    fontSize: '1.05rem',
    color: '#444',
    background: '#f7f7f7',
    padding: '12px 18px',
    borderRadius: '10px',
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#000',
  },
};

const InfoSection = ({ label, value }) => (
  <div style={styles.section}>
    <span style={styles.label}>{label}</span>
    <span>{value}</span>
  </div>
);

InfoSection.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default InfoSection;
