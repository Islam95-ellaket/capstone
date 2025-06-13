import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState(''); // ✅ Nuovo stato
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3001/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, author, description, price, coverImage: image, category }),
      });

      if (!response.ok) {
        throw new Error('Errore durante l\'aggiunta del libro');
      }

      setMessage('Libro aggiunto con successo!');
      setTimeout(() => navigate('/'), 2000);

    } catch (error) {
      console.error(error);
      setMessage('Errore: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Aggiungi un nuovo libro</h2>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Titolo:</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Autore:</label>
          <input type="text" className="form-control" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Descrizione:</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Prezzo:</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Immagine (URL):</label>
          <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        
        <div className="mb-3">
          <label>Categoria:</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Seleziona una categoria</option>
            <option value="Romanzo">Romanzo</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Thriller">Thriller</option>
            <option value="Saggio">Saggio</option>
            <option value="Saggio">Motivazionale</option>
            <option value="Altro">Altro</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? 'Attendere...' : 'Aggiungi Libro'}
        </button>
      </form>
    </div>
  );
};

export default AddBookPage;
