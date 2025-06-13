const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook
} = require('../controllers/bookController');

router.post('/', authMiddleware, createBook); // crea 
router.get('/', getBooks);  //tutti i libri 
router.get('/:id', getBookById);  // un libro 
router.put('/:id', authMiddleware, updateBook);  // modifica
router.delete('/:id', authMiddleware, deleteBook); // elimina

module.exports = router;
