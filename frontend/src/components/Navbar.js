import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ 
          background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-success))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '28px',
          fontWeight: '700'
        }}>
          Task Tracker
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <ThemeToggle />
          <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>
            Welcome, {user?.name}
          </span>
          <button className="btn btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
