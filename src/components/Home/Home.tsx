import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className='home-container'>
      <div className='home-row'>
        <div className='home-column'>
          <h2>Lab1</h2>
          <p>
            <Link to='/interpolation'>Zadanie 1</Link>
          </p>
        </div>
        <div className='home-column'>
          <h2>Lab2</h2>
          <p>
            <Link to='/approximation1'>Zadanie 1</Link>
          </p>
          <p>
            <Link to='/approximation2'>Zadanie 2</Link>
          </p>
          <p>
            <Link to='/approximation3'>Zadanie 3</Link>
          </p>
        </div>
        <div className='home-column'>
          <h2>Lab3</h2>
          <p>
            <Link to='/euler'>Zadanie 1</Link>
          </p>
        </div>
        <div className='home-column'>
          <h2>Lab4</h2>
          <p>
            <Link to='/rungekutta'>Zadanie 1</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
