import React from 'react';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h2>Accesso Negato</h2>
        <p>Devi prima <a href="/login" className="text-success">loggarti</a> per poter accedere al carrello.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
