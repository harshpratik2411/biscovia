import { useState, useEffect } from 'react'
import { Cookie, ShoppingBag, Star, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'

function MenuPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/products')
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300'
    if (imagePath.startsWith('http')) return imagePath
    return `http://localhost:5001/uploads/${imagePath}`
  }

  return (
    <div className="min-h-screen bg-[#f5e4cf] text-[#3d2510]">
      <header className="border-b border-[#e0c8a3] bg-[#d3a971]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d2510] text-[#f5e4cf]">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[0.18em] text-[#3d2510]">
                Biskovia Menu
              </p>
              <p className="text-xs text-[#5d3b1a]">Explore our biscuit and cookie crumble boxes</p>
            </div>
          </div>
          <a
            href="/"
            className="text-xs font-semibold text-[#3d2510] underline underline-offset-4 hover:text-[#2b180b]"
          >
            Back to home
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-[#3d2510]">Cookie and Biscuit Boxes</h1>
            <p className="text-sm text-[#5d3b1a]">
              Pick your favourite box of crumble-ready biscuits and soft-centre cookies.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-[#3d2510] px-4 py-2 text-xs text-[#f5e4cf]">
            <Star className="h-3 w-3 text-[#f7d7a3]" />
            Freshly baked for every order
          </div>
        </div>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {loading ? (
            <div className="col-span-full py-20 text-center text-[#3d2510]">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#3d2510] border-t-transparent"></div>
              <p className="mt-4">Loading the menu...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full py-20 text-center text-[#3d2510]">
              No items in the menu yet.
            </div>
          ) : (
            products.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl bg-[#f9e7cf] shadow-[0_18px_40px_rgba(61,37,16,0.18)]"
              >
                <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="relative h-56 overflow-hidden md:h-full">
                    <img
                      src={getImageUrl(item.image_url)}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-[#f5e4cf]/90 px-3 py-1 text-[11px] font-semibold text-[#3d2510]">
                      {item.category || 'Classic'}
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-3 px-5 py-5">
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold text-[#3d2510]">{item.name}</h2>
                      <p className="text-xs text-[#5d3b1a]">{item.description}</p>
                      <p className="text-xs font-semibold text-[#c0633a]">
                        {item.stock_quantity > 0 ? 'Baked fresh daily' : 'Out of stock'}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <p className="text-xl font-semibold text-[#3d2510]">₹{item.price}</p>
                      <button
                        type="button"
                        disabled={item.stock_quantity <= 0}
                        onClick={() => addToCart(item)}
                        className="inline-flex items-center gap-2 rounded-full bg-[#3d2510] px-4 py-2 text-xs font-semibold text-[#f5e4cf] hover:bg-[#2b180b] disabled:opacity-50"
                      >
                        <Plus className="h-4 w-4" />
                        Add to Box
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
    </div>
  )
}

export default MenuPage

