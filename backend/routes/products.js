const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { pool } = require('../server');

// Mock data for testing
const mockProducts = [
  { id: 1, name: 'Chocolate Chip Cookie', description: 'Delicious chocolate chip cookies with premium ingredients', price: 299.99, category: 'Cookies', stock_quantity: 50, created_at: new Date().toISOString() },
  { id: 2, name: 'Oatmeal Raisin', description: 'Healthy oatmeal raisin cookies', price: 249.99, category: 'Cookies', stock_quantity: 30, created_at: new Date().toISOString() },
  { id: 3, name: 'Double Chocolate Fudge', description: 'Rich double chocolate fudge cookies', price: 349.99, category: 'Cookies', stock_quantity: 25, created_at: new Date().toISOString() }
];

let nextId = 4;

// Get all products
router.get('/', async (req, res) => {
  try {
    if (!pool) {
      // Use mock data
      return res.json(mockProducts);
    }
    
    const [rows] = await pool.execute('SELECT * FROM products ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    if (!pool) {
      // Use mock data
      const product = mockProducts.find(p => p.id == req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.json(product);
    }
    
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// Create new product
router.post('/', [
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('description').optional().isString(),
  body('category').optional().isString(),
  body('stock_quantity').optional().isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, category, image_url, stock_quantity } = req.body;
    
    if (!pool) {
      // Use mock data
      const newProduct = {
        id: nextId++,
        name,
        description,
        price: parseFloat(price),
        category,
        image_url,
        stock_quantity: parseInt(stock_quantity) || 0,
        created_at: new Date().toISOString()
      };
      mockProducts.push(newProduct);
      return res.status(201).json({ 
        message: 'Product created successfully', 
        id: newProduct.id 
      });
    }
    
    const [result] = await pool.execute(
      'INSERT INTO products (name, description, price, category, image_url, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, category, image_url || null, stock_quantity || 0]
    );
    
    res.status(201).json({ 
      message: 'Product created successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// Update product
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('stock_quantity').optional().isInt({ min: 0 }).withMessage('Stock quantity must be a non-negative integer')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, category, image_url, stock_quantity } = req.body;
    const productId = req.params.id;

    // Check if product exists
    const [existingProduct] = await pool.execute('SELECT id FROM products WHERE id = ?', [productId]);
    if (existingProduct.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];
    
    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }
    if (price !== undefined) {
      updateFields.push('price = ?');
      updateValues.push(price);
    }
    if (category !== undefined) {
      updateFields.push('category = ?');
      updateValues.push(category);
    }
    if (image_url !== undefined) {
      updateFields.push('image_url = ?');
      updateValues.push(image_url);
    }
    if (stock_quantity !== undefined) {
      updateFields.push('stock_quantity = ?');
      updateValues.push(stock_quantity);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateValues.push(productId);
    
    const [result] = await pool.execute(
      `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    if (!pool) {
      // Use mock data
      const index = mockProducts.findIndex(p => p.id == req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
      }
      mockProducts.splice(index, 1);
      return res.json({ message: 'Product deleted successfully' });
    }
    
    const [result] = await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

module.exports = router;
