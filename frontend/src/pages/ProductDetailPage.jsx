import { useParams, useNavigate } from 'react-router-dom'
import { Cookie, ShoppingBag, ShieldCheck, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { products } from '../data/products'

const MotionHeader = motion.header
const MotionSection = motion.section
const MotionDiv = motion.div
const MotionButton = motion.button

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
    <div className="min-h-screen bg-gradient-to-br from-[#f5e4cf] via-[#f7e0c0] to-[#e7c090] text-[#3d2510]">
      <MotionHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-[#e0c8a3]/60 bg-[#f8e4c3]/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d2510] text-[#f5e4cf]">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[0.18em] text-[#3d2510]">Biskovia</p>
              <p className="text-xs text-[#5d3b1a]">Premium cookie studio</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-full border border-[#3d2510]/40 px-4 py-1.5 text-xs font-semibold text-[#3d2510] hover:bg-[#3d2510] hover:text-[#f5e4cf]"
          >
            Back
          </button>
        </div>
      </MotionHeader>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <MotionSection
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid gap-8 rounded-[2.4rem] bg-[#f9e7cf]/95 px-8 py-8 shadow-[0_24px_60px_rgba(61,37,16,0.24)] md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-5">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative h-80 overflow-hidden rounded-[2rem] border border-[#e0c8a3]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-[#3d2510]/90 px-4 py-1 text-xs font-semibold text-[#fbead0]">
                <Star className="h-3 w-3 text-[#f7d7a3]" />
                <span>{product.discountPercent}% launch discount</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent px-6 pb-4 pt-10 text-xs text-[#fbead0]">
                Small-batch baked, photographed from your actual Biskovia cookie tray.
              </div>
            </MotionDiv>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c0633a]">
                Signature cookie box
              </p>
              <h1 className="text-3xl font-semibold text-[#3d2510] sm:text-4xl">{product.name}</h1>
              <p className="text-sm text-[#5d3b1a]">{product.description}</p>
            </div>
          </div>
          <MotionDiv
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="space-y-4 rounded-3xl bg-[#3d2510] px-6 py-6 text-[#f5e4cf]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f7d7a3]">
                  Box details
                </p>
                <div className="mt-2 flex items-baseline gap-3">
                  <p className="text-3xl font-semibold">₹{product.price}</p>
                  <p className="text-xs text-[#f7d7a3] line-through">₹{originalPrice}</p>
                </div>
              </div>
              <div className="rounded-2xl bg-[#f5e4cf]/10 px-3 py-2 text-[11px] text-[#fbead0]">
                <p className="font-semibold">Today&apos;s oven slot</p>
                <p>Fresh batch every 3 hours</p>
              </div>
            </div>

            <p className="text-xs text-[#fbead0]">
              Inclusive of all taxes. Each box contains freshly baked cookies made on the day of
              dispatch.
            </p>

            <div className="grid gap-3 rounded-2xl bg-[#2b180b] px-4 py-3 text-xs text-[#fbead0] sm:grid-cols-2">
              <div>
                <p className="font-semibold">Inside your box</p>
                <ul className="mt-1 space-y-1">
                  <li>• 6 handcrafted cookies</li>
                  <li>• Tasting card with pairing notes</li>
                  <li>• Reusable crumble tin</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Freshness & storage</p>
                <ul className="mt-1 space-y-1">
                  <li>• Best within 72 hours</li>
                  <li>• Store in airtight container</li>
                  <li>• Warm 8–10s in microwave</li>
                </ul>
              </div>
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <MotionButton
                whileTap={{ scale: 0.97 }}
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
              </MotionButton>
              <div className="inline-flex items-center gap-2 text-xs text-[#fbead0]">
                <ShieldCheck className="h-4 w-4 text-[#f7d7a3]" />
                <span>24 hour freshness promise on all cookie boxes.</span>
              </div>
            </div>
          </MotionDiv>
        </MotionSection>
      </main>
    </div>
  )
}

export default ProductDetailPage
