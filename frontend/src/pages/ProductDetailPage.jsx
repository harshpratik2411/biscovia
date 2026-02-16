import { useParams, useNavigate } from 'react-router-dom'
import { Cookie, ShoppingBag, ShieldCheck } from 'lucide-react'
import { products } from '../data/products'

function ProductDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.slug === slug)

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5e4cf] text-[#3d2510]">
        <p className="text-sm">Cookie not found. Please go back to the menu.</p>
      </div>
    )
  }

  const originalPrice = Math.round(product.price / (1 - product.discountPercent / 100))

  return (
    <div className="min-h-screen bg-[#f5e4cf] text-[#3d2510]">
      <header className="border-b border-[#e0c8a3] bg-[#d3a971]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d2510] text-[#f5e4cf]">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[0.18em] text-[#3d2510]">Cookie Detail</p>
              <p className="text-xs text-[#5d3b1a]">Zoom into a single crumble favourite</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-xs font-semibold text-[#3d2510] underline underline-offset-4 hover:text-[#2b180b]"
          >
            Back
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="grid gap-8 rounded-[2rem] bg-[#f9e7cf] px-8 py-8 shadow-[0_18px_40px_rgba(61,37,16,0.18)] md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="relative h-72 overflow-hidden rounded-3xl">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 rounded-full bg-[#3d2510]/85 px-4 py-1 text-xs font-semibold text-[#fbead0]">
                {product.discountPercent}% launch discount
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-[#3d2510]">{product.name}</h1>
              <p className="text-sm text-[#5d3b1a]">{product.description}</p>
            </div>
          </div>
          <div className="space-y-4 rounded-3xl bg-[#3d2510] px-6 py-6 text-[#f5e4cf]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f7d7a3]">
              Box details
            </p>
            <div className="flex items-baseline gap-3">
              <p className="text-3xl font-semibold">₹{product.price}</p>
              <p className="text-xs text-[#f7d7a3] line-through">₹{originalPrice}</p>
            </div>
            <p className="text-xs text-[#fbead0]">
              Inclusive of all taxes. Each box contains freshly baked cookies made on the day of
              dispatch.
            </p>
            <ul className="mt-3 space-y-1 text-xs text-[#fbead0]">
              <li>• Small batch baked for every order.</li>
              <li>• Ships in a crush-safe crumble box.</li>
              <li>• Best enjoyed within 3 days of delivery.</li>
            </ul>
            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5e4cf] px-5 py-3 text-sm font-semibold text-[#3d2510] hover:bg-white"
                onClick={() =>
                  navigate('/booking', {
                    state: {
                      productSlug: product.slug,
                    },
                  })
                }
              >
                <ShoppingBag className="h-4 w-4" />
                Book this box
              </button>
              <div className="inline-flex items-center gap-2 text-xs text-[#fbead0]">
                <ShieldCheck className="h-4 w-4 text-[#f7d7a3]" />
                <span>24 hour freshness promise on all cookie boxes.</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProductDetailPage

