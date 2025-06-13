const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import dei modelli e middleware
const authMiddleware = require('../middleware/authMiddleware');

// CONFIG
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
const jwtSecret = process.env.JWT_SECRET_KEY;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1d';

// REGISTRAZIONE UTENTE
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se l'email è già registrata
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email già in uso' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Creazione nuovo utente
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ msg: 'Utente registrato con successo' });
  } catch (err) {
    console.error('Errore durante la registrazione:', err);
    res.status(500).json({ msg: 'Errore server' });
  }
});


// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trova utente per email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Credenziali non valide' });

    // Verifica password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenziali non valide' });

    // Genera JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );
    res.status(200).json({ token, name: user.name });

  } catch (err) {
    console.error('Errore durante il login:', err);
    res.status(500).json({ msg: 'Errore server' });
  }
});


// ROTTA PROTETTA (per test)
router.get('/me', authMiddleware, (req, res) => {
  res.json({ msg: 'Accesso autorizzato', user: req.user });
});

module.exports = router;
