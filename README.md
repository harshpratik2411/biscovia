# Biskovia - Full Stack Cookie Website

A complete full-stack web application for Biskovia cookie business with Express.js backend, MySQL database, and React frontend.

## Features

- **Product Management**: Full CRUD operations for products
- **User Management**: User registration, authentication, and role-based access
- **Contact Form**: Contact submissions stored in database
- **Admin Dashboard**: Complete admin panel for managing all data
- **Responsive Design**: Modern UI with Tailwind CSS and Framer Motion

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MySQL** database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### 1. Database Setup

Create a MySQL database and run the provided schema:

```sql
-- Run the database.sql file located in the backend folder
mysql -u root -p < backend/database.sql
```

Or manually execute the SQL commands in `backend/database.sql`.

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your database credentials
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=biskovia
JWT_SECRET=your_jwt_secret_key

# Start the backend server
npm run dev
```

The backend will be running on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The frontend will be running on `http://localhost:5173`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get single user
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Contacts
- `GET /api/contacts` - Get all contact submissions
- `GET /api/contacts/:id` - Get single contact
- `POST /api/contacts` - Create contact submission
- `DELETE /api/contacts/:id` - Delete contact

## Default Admin Account

After setting up the database, you can login with:
- Email: `admin@biskovia.com`
- Password: `password`

## Usage

1. **Browse Products**: Visit the homepage to see the product collection
2. **Admin Access**: Go to `/admin` to access the admin dashboard
3. **Add Products**: Use the "Add Product" button in admin to create new products
4. **Contact Form**: Fill out the contact form to submit inquiries
5. **User Management**: View and manage users in the admin dashboard

## Project Structure

```
biskovia/
├── backend/
│   ├── routes/
│   │   ├── products.js
│   │   ├── users.js
│   │   └── contacts.js
│   ├── server.js
│   ├── package.json
│   ├── database.sql
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   ├── package.json
│   └── public/
└── README.md
```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
