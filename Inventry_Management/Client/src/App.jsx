import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Auth/Register';
import Login from './Auth/Login';
import { useAuth, AuthProvider } from './Contexts/AuthContext';
import Product from './Product';
//import Navbar from './Components/Navbar';
import useBodyClass from './Customs/useBodyClass';



const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  useBodyClass('auth-page-body');

  return (
    <Routes>
      <Route path='/' element={!isAuthenticated ? <Register /> : <Navigate to='/dashboard' />} />
      <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path='/dashboard/*' element={isAuthenticated ? <Product /> : <Login />} />
    </Routes>
  );
}

const App = () => {
  return (
    <AuthProvider>
        <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}
export default App;
