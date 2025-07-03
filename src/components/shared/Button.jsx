// src/components/shared/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const buttonStyle = {
  padding: '12px 20px',
  backgroundColor: '#4a00e0',
  color: '#fff',
  border: 'none',
  borderRadius: '10px',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.3s',
  margin: '10px 0',
  width: '100%',
};

const Button = ({ onClick, children, disabled, style }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{ ...buttonStyle, ...style }}
    aria-disabled={disabled}
  >
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  style: {},
};

export default Button;
