import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';
import ToastNotification from '../components/ToastNotification';

const LoginPage = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      setUser({ name: data.name });
      setShowToast(true); // Mostra il toast

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Errore nel login:', error);
      setError('Login fallito. Controlla le credenziali.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {showToast && (
        <ToastNotification message="Login effettuato con successo!" onClose={() => setShowToast(false)} />
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading && (
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          )}
          {loading ? 'Attendere...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
