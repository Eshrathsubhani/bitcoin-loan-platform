import React, { useEffect, useState, useRef } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { useNavigate } from 'react-router-dom';
import Button from '../components/shared/Button'; 

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [principal, setPrincipal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const authClientRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    AuthClient.create().then((authClient) => {
      authClientRef.current = authClient;
      authClient.isAuthenticated().then((authenticated) => {
        if (authenticated) {
          const identity = authClient.getIdentity();
          setPrincipal(identity.getPrincipal().toString());
          setIsAuthenticated(true);
        }
      });
    });
  }, []);

  const login = async () => {
    setLoading(true);
    setError('');
    try {
      await authClientRef.current.login({
        identityProvider: 'https://identity.ic0.app/#authorize',
        onSuccess: async () => {
          const identity = authClientRef.current.getIdentity();
          setPrincipal(identity.getPrincipal().toString());
          setIsAuthenticated(true);
          setLoading(false);
        },
        onError: () => {
          setError('Login failed. Please try again.');
          setLoading(false);
        }
      });
    } catch {
      setError('Unexpected error during login.');
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authClientRef.current.logout();
      setIsAuthenticated(false);
      setPrincipal(null);
    } catch {
      setError('Logout failed. Please try again.');
    }
  };

  const handleCopy = () => {
    if (principal) {
      navigator.clipboard.writeText(principal);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const styles = {
    container: {
      height: '100vh',
      background: 'linear-gradient(135deg, #1f1c2c, #928dab)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Segoe UI, sans-serif',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '20px',
      padding: '40px',
      textAlign: 'center',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
      maxWidth: '400px',
      width: '90%',
    },
    heading: {
      fontSize: '1.8rem',
      marginBottom: '10px',
      color: '#333',
    },
    subText: {
      fontSize: '1rem',
      marginBottom: '20px',
      color: '#555',
    },
    principal: {
      wordBreak: 'break-word',
      fontSize: '0.9rem',
      backgroundColor: '#f3f3f3',
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '10px',
    },
    button: {
      backgroundColor: '#4a00e0',
      color: '#fff',
      border: 'none',
      padding: '12px 20px',
      borderRadius: '8px',
      fontSize: '1rem',
      cursor: 'pointer',
      margin: '8px',
      width: '100%',
      maxWidth: '240px',
    },
    buttonSecondary: {
      backgroundColor: '#928dab',
    },
    error: {
      color: '#e00',
      marginBottom: '10px',
      fontWeight: '500',
    },
    copyBtn: {
      background: 'none',
      border: 'none',
      color: '#4a00e0',
      cursor: 'pointer',
      fontSize: '0.9rem',
      marginLeft: '8px',
    },
    copied: {
      color: '#4a00e0',
      marginLeft: 5,
      fontSize: '0.85rem',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>🔐 Bitcoin-Backed Loan Platform</h1>
        <p style={styles.subText}>Secure DeFi Lending with Bitcoin Collateral</p>

        {error && <div style={styles.error}>{error}</div>}

        {loading ? (
          <p style={{ fontStyle: 'italic', color: '#333' }}>Processing...</p>
        ) : isAuthenticated ? (
          <>
            <div style={styles.principal}>
              👤 Principal:<br />
              <code>{principal}</code>
              <button style={styles.copyBtn} onClick={handleCopy} aria-label="Copy Principal">
                📋
              </button>
              {copied && <span style={styles.copied}>Copied!</span>}
            </div>

            <p>Welcome! You are logged in.</p>

            <button style={styles.button} onClick={logout}>Logout</button>
            <button
              style={{ ...styles.button, ...styles.buttonSecondary }}
              onClick={goToDashboard}
            >
              Go to Dashboard
            </button>
          </>
        ) : (
          <button
            style={styles.button}
            onClick={login}
            autoFocus
            aria-label="Login with Internet Identity"
          >
            Login with Internet Identity
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;   