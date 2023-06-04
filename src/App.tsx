import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Interpolation } from './components/Interpolation';
import Approximation1 from './components/Approximation1';
import Euler from './components/Euler';
import Approximation2 from './components/Approximation2';
import Approximation3 from './components/Approximation3';
import RungeKutta from './components/RungeKutta';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <div>Hello world!</div>,
    },
    {
      path: '/interpolation',
      element: <Interpolation />,
    },
    {
      path: '/approximation1',
      element: <Approximation1 />,
    },
    {
      path: '/approximation2',
      element: <Approximation2 />,
    },
    {
      path: '/approximation3',
      element: <Approximation3 />,
    },
    {
      path: '/euler',
      element: <Euler />,
    },
    {
      path: '/rungekutta',
      element: <RungeKutta />,
    },
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
