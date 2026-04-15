import React from 'react';

const Header: React.FC = () => {
  const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">MFE Dashboard</h1>
      </div>
      <div className="header-right">
        <button className="theme-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
          🌙
        </button>
      </div>
    </header>
  );
};

export default Header;

