const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2/promise');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000', 'http://localhost:8080', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle pre-flight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Database connection
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'biscovia',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Mock data for testing
const mockProducts = [
  { id: 1, name: 'Chocolate Chip Cookie', description: 'Delicious chocolate chip cookies with premium ingredients', price: 299.99, category: 'Cookies', stock_quantity: 50, created_at: new Date().toISOString() },
  { id: 2, name: 'Oatmeal Raisin', description: 'Healthy oatmeal raisin cookies', price: 249.99, category: 'Cookies', stock_quantity: 30, created_at: new Date().toISOString() },
  { id: 3, name: 'Double Chocolate Fudge', description: 'Rich double chocolate fudge cookies', price: 349.99, category: 'Cookies', stock_quantity: 25, created_at: new Date().toISOString() }
];

const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@biskovia.com', role: 'admin', created_at: new Date().toISOString() }
];

const mockContacts = [
  { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Test Inquiry', message: 'Test message', created_at: new Date().toISOString() }
];

// Always use mock data for now since database connection is problematic
let useMockData = true;

const pool = useMockData ? null : mysql.createPool(dbConfig);

console.log('Using mock data - frontend will work with sample data');

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/orders', require('./routes/orders'));

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Biskovia API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, pool };
