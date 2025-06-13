import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ToastNotification from '../components/ToastNotification';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      setLoading(false);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg);
      }

      setShowToast(true); // ✅ Mostra il toast
      setTimeout(() => navigate('/login'), 1500); // Dopo 1,5 sec vai al login
    } catch (err) {
      console.error('Errore durante la registrazione:', err);
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrazione</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {showToast && (
        <ToastNotification
          message="Registrazione completata! Ora effettua il login."
          onClose={() => setShowToast(false)}
        />
      )}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Nome:</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Attendere...' : 'Registrati'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
