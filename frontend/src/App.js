import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import BookDetailPage from './pages/BookDetailPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterPage from './pages/RegisterPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import AddBookPage from './pages/AddBookPage';

function AppContent() {
  const [cart, setCart] = useState([]);

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return { name: decoded.name };
      } catch (error) {
        console.error('Token non valido', error);
        return null;
      }
    }
    return null;
  });

  const { darkMode } = useTheme();

  return (
    <div className={darkMode ? 'bg-dark text-white min-vh-100' : 'bg-light text-dark min-vh-100'}>
      <Router>
        <Navbar cart={cart} user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
          <Route path="/cart" element={<ProtectedRoute user={user}><CartPage cart={cart} setCart={setCart} /></ProtectedRoute>} />
          <Route path="/books/:id" element={<BookDetailPage cart={cart} setCart={setCart} />} />
          <Route path="/add-book" element={<ProtectedRoute user={user}><AddBookPage /></ProtectedRoute>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
