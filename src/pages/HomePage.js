import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../api/api';

const HomePage = ({ cart, setCart }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const addToCart = (book) => {
    const existingBook = cart.find(item => item._id === book._id);

    if (existingBook) {
      setCart(cart.map(item =>
        item._id === book._id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Libreria Online</h1>
      <div className="row">
        {books.map(book => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={book._id}>
            <div className="card h-100 shadow-sm" style={{ maxWidth: '250px', margin: '0 auto' }}>
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: '200px', objectFit: 'contain', padding: '10px' }}
                />
              )}
              <div className="card-body d-flex flex-column text-center">
                <h6 className="card-title">{book.title}</h6>
                <p className="card-subtitle mb-2 text-muted">{book.author}</p>
                <p className="card-text fw-bold">{book.price} €</p>
                <div className="mt-auto">
                  <button className="btn btn-primary btn-sm me-2" onClick={() => addToCart(book)}>
                    Aggiungi
                  </button>
                  <Link className="btn btn-outline-secondary btn-sm" to={`/books/${book._id}`}>
                    Dettagli
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
