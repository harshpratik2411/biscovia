const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { pool } = require('../server');

// Mock data for testing
const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@biskovia.com', password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', role: 'admin', created_at: new Date().toISOString() }
];

// Get all users (admin only)
router.get('/', async (req, res) => {
  try {
    if (!pool) {
      // Use mock data - return users without password
      const usersWithoutPassword = mockUsers.map(({ password, ...user }) => user);
      return res.json(usersWithoutPassword);
    }
    
    const [rows] = await pool.execute('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Get single user by ID
router.get('/:id', async (req, res) => {
  try {
    if (!pool) {
      // Use mock data
      const user = mockUsers.find(u => u.id == req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const { password, ...userWithoutPassword } = user;
      return res.json(userWithoutPassword);
    }
    
    const [rows] = await pool.execute(
      'SELECT id, name, email, role, created_at FROM users WHERE id = ?', 
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Register new user
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role = 'user' } = req.body;
    
    if (!pool) {
      // Use mock data
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Hash password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        password: hashedPassword,
        role,
        created_at: new Date().toISOString()
      };
      
      mockUsers.push(newUser);
      
      return res.status(201).json({ 
        message: 'User registered successfully', 
        id: newUser.id 
      });
    }
    
    // Check if user already exists
    const [existingUser] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    
    res.status(201).json({ 
      message: 'User registered successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login user
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    if (!pool) {
      // Use mock data
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'your_jwt_secret_key',
        { expiresIn: '24h' }
      );
      
      return res.json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    }
    
    // Find user by email
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = users[0];
    
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret_key',
      { expiresIn: '24h' }
    );
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Update user
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, role } = req.body;
    const userId = req.params.id;

    if (!pool) {
      // Use mock data
      const userIndex = mockUsers.findIndex(u => u.id == userId);
      if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (email) {
        const emailCheck = mockUsers.find(u => u.email === email && u.id != userId);
        if (emailCheck) {
          return res.status(400).json({ message: 'Email is already taken by another user' });
        }
      }

      if (name !== undefined) mockUsers[userIndex].name = name;
      if (email !== undefined) mockUsers[userIndex].email = email;
      if (role !== undefined) mockUsers[userIndex].role = role;

      return res.json({ message: 'User updated successfully' });
    }

    // Check if user exists
    const [existingUser] = await pool.execute('SELECT id FROM users WHERE id = ?', [userId]);
    if (existingUser.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If email is being updated, check if it's already taken by another user
    if (email) {
      const [emailCheck] = await pool.execute('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId]);
      if (emailCheck.length > 0) {
        return res.status(400).json({ message: 'Email is already taken by another user' });
      }
    }

    // Build dynamic update query
    const updateFields = [];
    const updateValues = [];
    
    if (name !== undefined) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (role !== undefined) {
      updateFields.push('role = ?');
      updateValues.push(role);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    updateValues.push(userId);
    
    const [result] = await pool.execute(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );
    
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});

module.exports = router;
