const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// REGISTRAZIONE
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Controlla se l'email esiste già
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email già registrata' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea nuovo utente
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Genera token JWT
    const token = jwt.sign(
      { id: savedUser._id, name: savedUser.name, email: savedUser.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      msg: 'Registrazione avvenuta con successo',
      user: { id: savedUser._id, name: savedUser.name, email: savedUser.email },
      token
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Errore nella registrazione' });
  }
};

// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Controlla se l'utente esiste
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Email o password non validi' });
    }

    // Verifica la password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Email o password non validi' });
    }

    // Genera token JWT
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      msg: 'Login effettuato con successo',
      user: { id: user._id, name: user.name, email: user.email },
      token
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Errore nel login' });
  }
};
