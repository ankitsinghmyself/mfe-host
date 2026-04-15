import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <ul className="nav-list">
        <li>
          <Link to="/dashboard" className="nav-link">
            📊 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/profile" className="nav-link">
            👤 Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;

