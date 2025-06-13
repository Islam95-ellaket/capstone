const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Rotta protetta
router.get('/protected', authMiddleware, (req, res) => {
  res.json({
    msg: 'Accesso autorizzato!',
    user: req.user // Mostra i dati contenuti nel token
  });
});

module.exports = router;
