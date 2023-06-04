import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Interpolation } from './components/Interpolation';
import Approximation1 from './components/Approximation1';
import Euler from './components/Euler';
import Approximation2 from './components/Approximation2';

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
      path: '/euler',
      element: <Euler />,
    },
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
