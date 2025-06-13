import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001/api',
});

// 👉 Interceptor per aggiungere il token a ogni richiesta
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Funzione per ottenere i libri
export const getBooks = async () => {
  const res = await API.get('/books');
  return res.data;
};

// Funzione per ottenere un singolo libro tramite ID
export const getBookById = async (bookId) => {
  const res = await API.get(`/books/${bookId}`);
  return res.data;
};

// // Funzione per login
// export const loginUser = async (userData) => {
//   const res = await API.post('/auth/login', userData);
//   return res.data; // il backend deve restituire solo il token
// };

// Funzione per login
export const loginUser = async (credentials) => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Credenziali non valide');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Errore nella chiamata API (loginUser):', error);
    throw error;
  }
};



// Funzione per registrazione
export const registerUser = async (userData) => {
  const res = await API.post('/auth/register', userData);
  return res.data;
};

// Funzione per creare un nuovo carrello
export const createCart = async (cartData) => {
  const res = await API.post('/cart', cartData);
  return res.data;
};

// Funzione per ottenere il carrello di un utente
export const getCart = async (userId) => {
  const res = await API.get(`/cart/${userId}`);
  return res.data;
};

// Funzione per aggiornare il carrello
export const updateCart = async (cartId, cartData) => {
  const res = await API.put(`/cart/${cartId}`, cartData);
  return res.data;
};

// Funzione per rimuovere un libro dal carrello
export const removeFromCart = async (cartId, bookId) => {
  const res = await API.delete(`/cart/${cartId}/items/${bookId}`);
  return res.data;
};

// Funzione per completare l'ordine
export const completeOrder = async (cartId) => {
  const res = await API.post(`/cart/${cartId}/order`);
  return res.data;
};
