import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiBook, FiMessageCircle, FiUser } from 'react-icons/fi';
import './NavigationBar.css';

const NavigationBar = () => {
  return (
    <nav className="nav-bar">
      <NavLink to="/home" activeClassName="active">
        <FiHome className="nav-icon" />
      </NavLink>
      <NavLink to="/journal" activeClassName="active">
        <FiBook className="nav-icon" />
      </NavLink>
      <NavLink to="/chat" activeClassName="active">
        <FiMessageCircle className="nav-icon" />
      </NavLink>
      <NavLink to="/profile" activeClassName="active">
        <FiUser className="nav-icon" />
      </NavLink>
    </nav>
  );
};

export default NavigationBar;
