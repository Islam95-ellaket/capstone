const express = require('express');
const router = express.Router();
const {
  getCart, addItem, removeItem, placeOrder
} = require('../controllers/cartController');
const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, getCart);
router.post('/add', verifyToken, addItem);
router.delete('/remove', verifyToken, removeItem);
router.post('/order', verifyToken, placeOrder);

module.exports = router;
