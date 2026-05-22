import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Applications from './pages/Applications';

const App = () => {
  return React.createElement(
    Routes,
    null,
    React.createElement(Route, { path: '/login', element: React.createElement(Login) }),
    React.createElement(Route, { path: '/signup', element: React.createElement(Signup) }),
    React.createElement(
      Route,
      { element: React.createElement(ProtectedRoute) },
      React.createElement(
        Route,
        { element: React.createElement(AppLayout) },
        React.createElement(Route, { path: '/dashboard', element: React.createElement(Dashboard) }),
        React.createElement(Route, { path: '/applications', element: React.createElement(Applications) }),
        React.createElement(Route, {
          path: '/',
          element: React.createElement(Navigate, { to: '/dashboard', replace: true })
        })
      )
    ),
    React.createElement(Route, {
      path: '*',
      element: React.createElement(Navigate, { to: '/', replace: true })
    })
  );
};

export default App;
