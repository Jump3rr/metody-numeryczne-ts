import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Interpolation } from './components/Interpolation';
import Approximation1 from './components/Approximation1';
import Euler from './components/Euler';
import Approximation2 from './components/Approximation2';
import Approximation3 from './components/Approximation3';
import RungeKutta from './components/RungeKutta';
import NavigationBar from './components/NavBar/NavBar';
import HomePage from './components/Home/Home';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/interpolation' element={<Interpolation />} />
          <Route path='/approximation1' element={<Approximation1 />} />
          <Route path='/approximation2' element={<Approximation2 />} />
          <Route path='/approximation3' element={<Approximation3 />} />
          <Route path='/euler' element={<Euler />} />
          <Route path='/rungekutta' element={<RungeKutta />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
