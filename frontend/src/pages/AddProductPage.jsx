import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, X, Plus, Minus } from 'lucide-react'
import { Cookie } from 'lucide-react'

const MotionDiv = motion.div

function AddProductPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    stock_quantity: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const categories = [
    'Cookies',
    'Biscuits',
    'Chocolate',
    'Pastries',
    'Cakes',
    'Other'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleStockChange = (increment) => {
    setFormData(prev => ({
      ...prev,
      stock_quantity: Math.max(0, prev.stock_quantity + increment)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('http://localhost:5001/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock_quantity: parseInt(formData.stock_quantity)
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to create product')
      }

      const data = await response.json()
      setSuccess('Product created successfully!')
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          image_url: '',
          stock_quantity: 0
        })
        setSuccess('')
        navigate('/admin')
      }, 2000)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5e4cf] text-[#3d2510]">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-black/70 via-black/30 to-transparent"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-[#f5e4cf]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="flex items-center gap-2 rounded-full bg-[#f5e4cf]/20 px-4 py-2 text-sm font-semibold text-[#f5e4cf] hover:bg-[#f5e4cf]/30"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5e4cf] text-[#3d2510]">
                <Cookie className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-[0.18em]">Biskovia</p>
                <p className="text-xs text-[#fbead0]">Add New Product</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-6 pt-24 pb-12">
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <div className="rounded-[2.5rem] bg-[#f9e7cf] p-8 shadow-[0_18px_40px_rgba(61,37,16,0.16)]">
            <h1 className="mb-6 text-3xl font-bold text-[#3d2510]">Add New Product</h1>
            
            {/* Success Message */}
            {success && (
              <div className="mb-6 rounded-2xl bg-green-100 border border-green-300 p-4 text-green-800">
                <p className="font-semibold">{success}</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 rounded-2xl bg-red-100 border border-red-300 p-4 text-red-800">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-[#3d2510] mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#d3a971] bg-[#f5e4cf] px-4 py-3 text-[#3d2510] outline-none focus:border-[#c0633a] placeholder:text-[#b38854]"
                  placeholder="Enter product name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#3d2510] mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full rounded-2xl border border-[#d3a971] bg-[#f5e4cf] px-4 py-3 text-[#3d2510] outline-none focus:border-[#c0633a] placeholder:text-[#b38854] resize-none"
                  placeholder="Enter product description"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-[#3d2510] mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full rounded-2xl border border-[#d3a971] bg-[#f5e4cf] px-4 py-3 text-[#3d2510] outline-none focus:border-[#c0633a] placeholder:text-[#b38854]"
                    placeholder="0.00"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-[#3d2510] mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#d3a971] bg-[#f5e4cf] px-4 py-3 text-[#3d2510] outline-none focus:border-[#c0633a]"
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-[#3d2510] mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#d3a971] bg-[#f5e4cf] px-4 py-3 text-[#3d2510] outline-none focus:border-[#c0633a] placeholder:text-[#b38854]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="block text-sm font-semibold text-[#3d2510] mb-2">
                  Stock Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => handleStockChange(-1)}
                    className="rounded-full bg-[#3d2510] p-2 text-[#f5e4cf] hover:bg-[#2b180b]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <div className="flex-1 rounded-2xl border border-[#d3a971] bg-[#f5e4cf] px-4 py-3 text-center text-[#3d2510] font-semibold">
                    {formData.stock_quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleStockChange(1)}
                    className="rounded-full bg-[#3d2510] p-2 text-[#f5e4cf] hover:bg-[#2b180b]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-full bg-[#3d2510] px-6 py-3 text-sm font-semibold text-[#f5e4cf] shadow-md hover:bg-[#2b180b] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#f5e4cf] border-t-transparent"></div>
                      Creating Product...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Save className="h-4 w-4" />
                      Create Product
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin')}
                  className="rounded-full border border-[#3d2510] px-6 py-3 text-sm font-semibold text-[#3d2510] hover:bg-[#3d2510]/10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </MotionDiv>
      </main>
    </div>
  )
}

export default AddProductPage
