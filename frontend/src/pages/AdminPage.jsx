import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, ShieldCheck, LogOut, Plus, Edit, Trash2, Package, Users, MessageSquare } from 'lucide-react'

function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('products')

  useEffect(() => {
    if (isLoggedIn) {
      fetchData()
    }
  }, [isLoggedIn])

  const fetchData = async () => {
    try {
      const [productsRes, usersRes, contactsRes] = await Promise.all([
        fetch('http://localhost:5001/api/products'),
        fetch('http://localhost:5001/api/users'),
        fetch('http://localhost:5001/api/contacts')
      ])

      const productsData = await productsRes.json()
      const usersData = await usersRes.json()
      const contactsData = await contactsRes.json()

      setProducts(productsData)
      setUsers(usersData)
      setContacts(contactsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('http://localhost:5001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: event.target.email.value,
          password: event.target.password.value,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        if (data.user.role !== 'admin') {
          alert('Access denied. Admin only.')
          return
        }
        localStorage.setItem('adminToken', data.token)
        setIsLoggedIn(true)
      } else {
        alert(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) setIsLoggedIn(true)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setIsLoggedIn(false)
  }

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const response = await fetch(`http://localhost:5001/api/products/${productId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setProducts(products.filter(p => p.id !== productId))
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete product')
    }
  }

  const handleDeleteContact = async (contactId) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return

    try {
      const response = await fetch(`http://localhost:5001/api/contacts/${contactId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== contactId))
      } else {
        alert('Failed to delete contact')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete contact')
    }
  }
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/100'
    if (imagePath.startsWith('http')) return imagePath
    return `http://localhost:5001/uploads/${imagePath}`
  }

  return (
    <div className="min-h-screen bg-[#3d2510] text-[#f5e4cf]">
      <header className="border-b border-[#f5e4cf]/20 bg-[#2b180b]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5e4cf] text-[#3d2510]">
              <Cookie className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase">Biskovia Admin</p>
              <p className="text-xs text-[#f5e4cf]/80">Staff access only</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn && (
              <Link
                to="/admin/add-product"
                className="flex items-center gap-2 rounded-full bg-[#f5e4cf] px-4 py-2 text-sm font-semibold text-[#3d2510] hover:bg-white"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Link>
            )}
            <button
              onClick={isLoggedIn ? handleLogout : () => window.location.href = '/'}
              className="text-xs font-semibold text-[#f5e4cf] underline underline-offset-4 hover:text-[#f7d7a3]"
            >
              {isLoggedIn ? 'Logout' : 'Back to site'}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {!isLoggedIn ? (
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md bg-[#2b180b] rounded-[2.5rem] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-[#f5e4cf]/10">
              <div className="text-center mb-10">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#f5e4cf] text-[#3d2510] mb-6 shadow-xl">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-[#f5e4cf]">Admin Dashboard</h1>
                <p className="text-[#f5e4cf]/60 text-sm mt-2 font-medium uppercase tracking-[0.1em]">Internal Access Only</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#f5e4cf]/80 ml-1 uppercase tracking-wider">Email</label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[#3d2510] border border-[#f5e4cf]/10 rounded-2xl py-4 px-5 text-sm text-[#f5e4cf] focus:outline-none focus:border-[#f5e4cf]/40 transition-all placeholder:text-[#f5e4cf]/20"
                    placeholder="admin@biskovia.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#f5e4cf]/80 ml-1 uppercase tracking-wider">Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-[#3d2510] border border-[#f5e4cf]/10 rounded-2xl py-4 px-5 text-sm text-[#f5e4cf] focus:outline-none focus:border-[#f5e4cf]/40 transition-all placeholder:text-[#f5e4cf]/20"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#f5e4cf] text-[#3d2510] rounded-2xl py-4 font-bold text-sm shadow-2xl shadow-black/40 hover:bg-white active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-8"
                >
                  <ShieldCheck className="h-5 w-5" />
                  {loading ? 'Authenticating...' : 'Login to Dashboard'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex gap-4 border-b border-[#f5e4cf]/20">
              <button
                onClick={() => setActiveTab('products')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'products'
                    ? 'border-[#f5e4cf] text-[#f5e4cf]'
                    : 'border-transparent text-[#f5e4cf]/60 hover:text-[#f5e4cf]'
                }`}
              >
                <Package className="h-4 w-4" />
                Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'users'
                    ? 'border-[#f5e4cf] text-[#f5e4cf]'
                    : 'border-transparent text-[#f5e4cf]/60 hover:text-[#f5e4cf]'
                }`}
              >
                <Users className="h-4 w-4" />
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === 'contacts'
                    ? 'border-[#f5e4cf] text-[#f5e4cf]'
                    : 'border-transparent text-[#f5e4cf]/60 hover:text-[#f5e4cf]'
                }`}
              >
                <MessageSquare className="h-4 w-4" />
                Contacts ({contacts.length})
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'products' && (
              <div className="rounded-2xl bg-[#2b180b] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Products Management</h3>
                  <Link
                    to="/admin/add-product"
                    className="flex items-center gap-2 rounded-full bg-[#f5e4cf] px-4 py-2 text-sm font-semibold text-[#3d2510] hover:bg-white"
                  >
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#f5e4cf]/20">
                        <th className="px-4 py-3 text-left font-semibold">Image</th>
                        <th className="px-4 py-3 text-left font-semibold">Name</th>
                        <th className="px-4 py-3 text-left font-semibold">Price</th>
                        <th className="px-4 py-3 text-left font-semibold">Category</th>
                        <th className="px-4 py-3 text-left font-semibold">Stock</th>
                        <th className="px-4 py-3 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b border-[#f5e4cf]/10">
                          <td className="px-4 py-3">
                            <img 
                              src={getImageUrl(product.image_url)} 
                              alt={product.name} 
                              className="h-10 w-10 rounded-lg object-cover"
                            />
                          </td>
                          <td className="px-4 py-3">{product.name}</td>
                          <td className="px-4 py-3">₹{product.price}</td>
                          <td className="px-4 py-3">{product.category || '-'}</td>
                          <td className="px-4 py-3">{product.stock_quantity}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="rounded-lg bg-[#f5e4cf]/20 p-2 text-[#f5e4cf] hover:bg-[#f5e4cf]/30">
                                <Edit className="h-3 w-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="rounded-lg bg-red-500/20 p-2 text-red-300 hover:bg-red-500/30"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="rounded-2xl bg-[#2b180b] p-6">
                <h3 className="mb-4 text-lg font-semibold">User Management</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#f5e4cf]/20">
                        <th className="px-4 py-3 text-left font-semibold">Name</th>
                        <th className="px-4 py-3 text-left font-semibold">Email</th>
                        <th className="px-4 py-3 text-left font-semibold">Role</th>
                        <th className="px-4 py-3 text-left font-semibold">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-[#f5e4cf]/10">
                          <td className="px-4 py-3">{user.name}</td>
                          <td className="px-4 py-3">{user.email}</td>
                          <td className="px-4 py-3">
                            <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              user.role === 'admin' 
                                ? 'bg-[#f5e4cf] text-[#3d2510]' 
                                : 'bg-[#3d2510]/50 text-[#f5e4cf]'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-3">{new Date(user.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="rounded-2xl bg-[#2b180b] p-6">
                <h3 className="mb-4 text-lg font-semibold">Contact Submissions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#f5e4cf]/20">
                        <th className="px-4 py-3 text-left font-semibold">Name</th>
                        <th className="px-4 py-3 text-left font-semibold">Email</th>
                        <th className="px-4 py-3 text-left font-semibold">Subject</th>
                        <th className="px-4 py-3 text-left font-semibold">Date</th>
                        <th className="px-4 py-3 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="border-b border-[#f5e4cf]/10">
                          <td className="px-4 py-3">{contact.name}</td>
                          <td className="px-4 py-3">{contact.email}</td>
                          <td className="px-4 py-3">{contact.subject}</td>
                          <td className="px-4 py-3">{new Date(contact.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              className="rounded-lg bg-red-500/20 p-2 text-red-300 hover:bg-red-500/30"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminPage

