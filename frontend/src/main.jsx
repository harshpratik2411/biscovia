import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './App.jsx'
import AdminPage from './pages/AdminPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import ProductDetailPage from './pages/ProductDetailPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import AddProductPage from './pages/AddProductPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import CheckoutPage from './pages/CheckoutPage.jsx'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/add-product" element={<AddProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
