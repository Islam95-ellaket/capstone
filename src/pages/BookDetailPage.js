import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById } from '../api/api';

const BookDetailPage = ({ cart, setCart, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const data = await getBookById(id);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  const addToCart = () => {
    const existingBook = cart.find(item => item._id === book._id);

    if (existingBook) {
      setCart(cart.map(item =>
        item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    if (window.confirm('Sei sicuro di voler eliminare questo libro?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/books/${book._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          alert('Libro eliminato con successo!');
          navigate('/'); // Torna alla home
        } else {
          alert('Errore durante la cancellazione');
        }
      } catch (error) {
        console.error('Errore:', error);
        alert('Errore durante la cancellazione');
      }
    }
  };

  if (!book) return <div className="container mt-5">Caricamento...</div>;

  return (
    <div className="container mt-5">
      <h1>{book.title}</h1>
      <h4 className="text-muted">{book.author}</h4>
      <img
        src={book.coverImage}
        alt={book.title}
        className="img-fluid my-3"
        style={{ maxHeight: '500px', objectFit: 'contain' }}
      />
      <p className="lead">{book.description}</p>
      <p className="fw-bold">{book.price} €</p>

      <button className="btn btn-success me-3" onClick={addToCart}>
        Aggiungi al Carrello
      </button>

      {user && book.createdBy === user.id && (
        <button className="btn btn-danger" onClick={handleDelete}>
          Elimina Libro
        </button>
      )}
    </div>
  );
};

export default BookDetailPage;
