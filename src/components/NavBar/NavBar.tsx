import React from 'react';
import './NavigationBar.css';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className='navbar'>
      <ul className='navbar-list'>
        <li className='navbar-item'>
          <Link to='/'>Home</Link>
        </li>
      </ul>
      <span>Made by Patryk Kamusiński</span>
    </nav>
  );
};

export default NavigationBar;
