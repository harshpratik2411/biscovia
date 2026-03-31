const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();
const { pool } = require('../server');

let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_SXmK6bu7bo4Ppc', // Provide dummy to prevent crash on init
    key_secret: process.env.RAZORPAY_KEY_SECRET || 'seXiWXaLS1Mo2Z0QgVI6cra2'
  });
} catch (err) {
  console.error('Failed to initialize Razorpay:', err.message);
}

// Get Razorpay Key ID
router.get('/key', (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
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

    let razorpayOrder;

    // Try to use real Razorpay if credentials exist
    if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
      try {
        razorpayOrder = await razorpay.orders.create(options);
        console.log('Real Razorpay order created:', razorpayOrder.id);
      } catch (rzpErr) {
        console.error('Razorpay API Error:', rzpErr);
        return res.status(400).json({ message: 'Razorpay API Error: ' + rzpErr.description });
      }
    } else {
      // Mock mode only if no keys provided
      razorpayOrder = {
        id: `order_mock_${Date.now()}`,
        amount: options.amount,
        currency: 'INR',
        receipt: options.receipt,
        status: 'created'
      };
      console.log('Mock Mode: Razorpay order created', razorpayOrder.id);
    }

    // Save to DB if pool exists
    if (pool) {
      const [result] = await pool.execute(
        'INSERT INTO orders (user_id, total_amount, status, razorpay_order_id, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [userId, amount, 'pending', razorpayOrder.id, address, lat, lng]
      );
      
      const orderId = result.insertId;
      
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
    console.error('Error creating order:', error);
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

    // If it's a mock order and we don't have keys, or it's just mock verification
    if (razorpay_order_id.startsWith('order_mock_')) {
      return res.json({ success: true, message: "Mock payment verified" });
    }

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
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
