const Book = require('../models/book');

//Crea un nuovo libro collegato all'utente loggato
exports.createBook = async (req, res) => {
  try {
    console.log('Richiesta ricevuta per creare un libro:', req.body);
    
    const newBook = new Book({
      ...req.body,
      createdBy: req.user.id 
    });

    const saved = await newBook.save();
    console.log('Libro salvato correttamente:', saved);
    res.status(201).json(saved);
  } catch (err) {
    console.error('Errore nella creazione del libro:', err.message);
    res.status(400).json({ msg: 'Errore nella creazione', error: err.message });
  }
};


// Ottieni tutti i libri
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error('Errore nel recupero dei libri:', err.message);
    res.status(500).json({ msg: 'Errore nel recupero dei libri', error: err.message });
  }
};

// Ottieni un singolo libro
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ msg: 'Libro non trovato' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ msg: 'ID non valido' });
  }
};

// Aggiorna un libro (opzionale: puoi aggiungere controllo proprietà utente)
exports.updateBook = async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ msg: 'Errore nell\'aggiornamento' });
  }
};

// Elimina un libro SOLO se è stato creato dall'utente loggato
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: 'Libro non trovato' });
    }

    // Verifica se l'utente loggato è il creatore del libro
    if (book.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Non sei autorizzato a eliminare questo libro' });
    }

    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Libro eliminato' });
  } catch (err) {
    res.status(400).json({ msg: 'Errore nella cancellazione' });
  }
};

