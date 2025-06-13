import React from 'react';

const CartPage = ({ cart, setCart }) => {
  // Funzione per aumentare la quantità
  const handleIncrease = (bookId) => {
    const updatedCart = cart.map(item =>
      item._id === bookId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  // Funzione per diminuire la quantità
  const handleDecrease = (bookId) => {
    const updatedCart = cart.map(item =>
      item._id === bookId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Funzione per rimuovere un libro
  const handleRemove = (bookId) => {
    const updatedCart = cart.filter(item => item._id !== bookId);
    setCart(updatedCart);
  };

  // Funzione per svuotare il carrello
  const handleClearCart = () => {
    setCart([]);
  };

  // Calcolo del totale
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2>Il tuo Carrello</h2>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item._id} className="d-flex justify-content-between align-items-center border p-3 mb-2">
              <div>
                <h5>{item.title}</h5>
                <p>Prezzo: {item.price} €</p>
                <p>Quantità: {item.quantity}</p>
                <button className="btn btn-success me-2" onClick={() => handleIncrease(item._id)}>+</button>
                <button className="btn btn-warning me-2" onClick={() => handleDecrease(item._id)}>-</button>
                <button className="btn btn-danger" onClick={() => handleRemove(item._id)}>Rimuovi</button>
              </div>
            </div>
          ))}
          <h4>Totale: {total.toFixed(2)} €</h4>
          <button className="btn btn-danger mt-3" onClick={handleClearCart}>Svuota Carrello</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
