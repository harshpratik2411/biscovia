const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();
const { pool } = require('../server');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret'
});

// Create a new order
router.post('/create', async (req, res) => {
  try {
    const { amount, items, userId, address, lat, lng } = req.body;
    
    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // If using real DB, save pending order
    if (pool) {
      const [result] = await pool.execute(
        'INSERT INTO orders (user_id, total_amount, status, razorpay_order_id, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, amount, 'pending', razorpayOrder.id, address, lat, lng]
      );
      
      const orderId = result.insertId;
      
      // Save order items
      for (const item of items) {
        await pool.execute(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.id, item.quantity, item.price]
        );
      }
    }

    res.json({
      success: true,
      order: razorpayOrder
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret')
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment verified
      if (pool) {
        await pool.execute(
          'UPDATE orders SET status = ?, razorpay_payment_id = ? WHERE razorpay_order_id = ?',
          ['paid', razorpay_payment_id, razorpay_order_id]
        );
      }
      return res.json({ success: true, message: "Payment verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
});

module.exports = router;
