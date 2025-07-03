import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ✅ Main Pages
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import LoanForm from './components/LoanForm';
import RepayLoan from './components/RepayLoan';
import CollateralRelease from './components/CollateralRelease';
import TransactionHistory from './components/TransactionHistory';

// ✅ Shared UI
import PriceTicker from './components/PriceTicker';
import Notification from './components/Notification';

function App() {
  return (
    <Router>
      {/* Global Components (Optional): Add fixed header/ticker/notification here */}
      <PriceTicker />
      <Notification />

      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loan" element={<LoanForm />} />
        <Route path="/repay" element={<RepayLoan />} />
        <Route path="/release" element={<CollateralRelease />} />
        <Route path="/history" element={<TransactionHistory />} />

        {/* Optional 404 or Redirect */}
        <Route path="*" element={<div style={{ padding: '50px', textAlign: 'center' }}>404 – Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
