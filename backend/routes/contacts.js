const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const { pool } = require('../server');

// Mock data for testing
const mockContacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Test Inquiry', message: 'This is a test message', created_at: new Date().toISOString() }
];

let nextContactId = 2;

// Get all contact submissions
router.get('/', async (req, res) => {
  try {
    if (!pool) {
      // Use mock data
      return res.json(mockContacts);
    }
    
    const [rows] = await pool.execute('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

// Get single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM contacts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ message: 'Error fetching contact' });
  }
});

// Create new contact submission
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').notEmpty().withMessage('Message is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, subject, message } = req.body;
    
    if (!pool) {
      // Use mock data
      const newContact = {
        id: nextContactId++,
        name,
        email,
        subject,
        message,
        created_at: new Date().toISOString()
      };
      mockContacts.push(newContact);
      return res.status(201).json({ 
        message: 'Contact submission created successfully', 
        id: newContact.id 
      });
    }
    
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );
    
    res.status(201).json({ 
      message: 'Contact submission created successfully', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error creating contact submission:', error);
    res.status(500).json({ message: 'Error creating contact submission' });
  }
});

// Delete contact submission
router.delete('/:id', async (req, res) => {
  try {
    if (!pool) {
      // Use mock data
      const index = mockContacts.findIndex(c => c.id == req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      mockContacts.splice(index, 1);
      return res.json({ message: 'Contact deleted successfully' });
    }
    
    const [result] = await pool.execute('DELETE FROM contacts WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

module.exports = router;
