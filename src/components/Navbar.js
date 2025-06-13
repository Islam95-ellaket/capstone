import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ShoppingCart, Home, LogIn, UserPlus, Sun, Moon, Plus } from 'lucide-react';

const Navbar = ({ cart, user, setUser }) => {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { darkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} shadow`}>
      <div className="container-fluid">

        {/* Logo / Home Link */}
        <Link className={`navbar-brand fw-bold ${darkMode ? 'text-info' : 'text-primary'} d-flex align-items-center`} to="/">
          <Home className="me-2" />
          BookStore
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex align-items-center">

            {/* Carrello */}
            <li className="nav-item me-3">
              <Link to="/cart" className="nav-link position-relative text-warning">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {user ? (
              <>
                {/* Benvenuto e Aggiungi Libro */}
                <span className={`navbar-text me-3 fw-bold ${darkMode ? 'text-warning' : 'text-success'}`}>
                  Ciao, {user.name}
                </span>

                <Link to="/add-book" className="btn btn-outline-success me-3 d-flex align-items-center">
                  <Plus className="me-1" /> Aggiungi Libro
                </Link>

                <button onClick={handleLogout} className="btn btn-outline-danger">
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login */}
                <li className="nav-item me-3">
                  <Link to="/login" className="nav-link text-success d-flex align-items-center fw-bold">
                    <LogIn className="me-1" /> Login
                  </Link>
                </li>

                {/* Register */}
                <li className="nav-item me-3">
                  <Link to="/register" className="nav-link text-info d-flex align-items-center fw-bold">
                    <UserPlus className="me-1" /> Register
                  </Link>
                </li>
              </>
            )}

            {/* Bottone Cambio Tema */}
            <li className="nav-item">
              <button onClick={toggleTheme} className="btn btn-outline-secondary d-flex align-items-center">
                {darkMode ? <Sun className="me-2" /> : <Moon className="me-2" />}
                {darkMode ? 'Chiaro' : 'Scuro'}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
