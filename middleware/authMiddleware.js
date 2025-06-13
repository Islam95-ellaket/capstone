const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Token mancante o non valido' });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      _id: decoded.id,  
      name: decoded.name  
    };

    next();
  } catch (err) {
    console.error("Errore verifica token:", err.message);
    res.status(401).json({ msg: 'Token non valido' });
  }
};

module.exports = authMiddleware;
