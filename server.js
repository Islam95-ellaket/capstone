require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;


// autenticazion
app.use(cors());
app.use(express.json());



// rotte 
app.get('/', (req, res) => {
  res.send('Backend attivo e funzionante!');
});

app.use('/api/auth', require('./routes/auth'));

const protectedRoutes = require('./routes/protectedRoutes');
app.use('/', protectedRoutes);

const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/cart', cartRoutes);





mongoose.connect(process.env.MONGO_URI, { /* opzioni */ })
  .then(() => console.log('MongoDB connesso'))
  .catch(err => console.error(err));



  app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
