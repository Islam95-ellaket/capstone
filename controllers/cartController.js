const Cart = require('../models/cart');

const getCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.user.id }).populate('items.bookId');
    res.json(cart || { items: [] });
};

const addItem = async (req, res) => {
    const { bookId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

    const idx = cart.items.findIndex(i => i.bookId.equals(bookId));
    if (idx >= 0) cart.items[idx].quantity += quantity;
    else cart.items.push({ bookId, quantity });

    await cart.save();
    res.json(cart);
};

const removeItem = async (req, res) => {
    const { bookId } = req.body;
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cartella non trovata" });

    cart.items = cart.items.filter(i => !i.bookId.equals(bookId));
    await cart.save();
    res.json({ message: 'Libro rimosso dal carrello' });
};

const placeOrder = async (req, res) => {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.json({ "message": "Carrello svuotato con successo." }
    );
};

module.exports = { getCart, addItem, removeItem, placeOrder };
