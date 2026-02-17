import { Link } from 'react-router-dom'
import { Cookie, ShoppingBag, User, ShieldCheck, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'
import chocolateVideo from './assets/chocolate.mp4'
import { products } from './data/products'

const MotionHeader = motion.header
const MotionDiv = motion.div

function HomePage() {
  return (
    <div className="min-h-screen bg-[#f5e4cf] text-[#3d2510]">
      <section className="relative h-screen w-full overflow-hidden">
        <video
          src={chocolateVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <MotionHeader
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-[#f5e4cf]">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5e4cf] text-[#3d2510]">
                <Cookie className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold tracking-[0.18em]">Biskovia</p>
                <p className="text-xs text-[#fbead0]">Craving Cookies? We&apos;ve Got the Crumble!</p>
              </div>
            </div>
            <nav className="hidden items-center gap-8 text-sm font-semibold text-[#fbead0] md:flex">
              <Link to="/" className="border-b border-[#fbead0] pb-1">
                Home
              </Link>
              <Link to="/menu" className="pb-1 hover:border-b hover:border-[#fbead0]">
                Menu
              </Link>
              <Link to="/about" className="pb-1 hover:border-b hover:border-[#fbead0]">
                About
              </Link>
              <Link to="/contact" className="pb-1 hover:border-b hover:border-[#fbead0]">
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-4 text-[#fbead0]">
              <User className="h-5 w-5" />
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
        </MotionHeader>
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="relative z-10 -mt-40 flex h-full flex-col items-center justify-center px-6 text-center text-[#f5e4cf]"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#f7d7a3]">
            Biskovia Crumble Studio
          </p>
          <h1 className="mb-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Chocolate Crumble in Motion
          </h1>
          <button
            type="button"
            onClick={() => {
              const target = document.getElementById('home')
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#f5e4cf] px-6 py-3 text-sm font-semibold text-[#3d2510] shadow-md hover:bg-white"
          >
            <Cookie className="h-4 w-4" />
            Enter Biskovia
          </button>
        </MotionDiv>
      </section>

      <main className="mx-auto max-w-6xl px-6 pt-24">
        <section
          id="home"
          className="mt-10 grid gap-0 overflow-hidden rounded-[2.5rem] bg-[#c5873f] md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="flex flex-col justify-center gap-6 px-10 py-12">
            <h1 className="text-4xl animate-bounce font-semibold leading-tight text-[#fff7ea] sm:text-5xl">
              Craving Cookies?
              <br />
              We&apos;ve Got the Crumble!
            </h1>
            <p className="max-w-md text-sm animate-bounce text-[#fbead0] sm:text-base">
              From warm ovens to happy moments! Our cookies are made to crumble just right.
              Sweet, soft and baked with love in every batch.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="rounded-full animate-pulse bg-[#f5e4cf] px-6 py-3 text-sm font-semibold text-[#3d2510] shadow-md hover:bg-[#fff]"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="rounded-full border border-[#fbead0] px-6 py-3 text-sm font-semibold text-[#fbead0] hover:bg-[#f5e4cf]/10"
              >
                See Menu
              </button>
            </div>
          </div>
          <div className="relative bg-[#3d2510] p-10">
            <div className="absolute inset-y-0 left-0 w-8 bg-[#d3a971]" />
            <div className="flex h-full items-center justify-center">
              <div className="relative flex -ml-9 h-60 w-60 items-center justify-center rounded-full bg-[#f5e4cf]">
                <div className="absolute inset-6 animate-spin  rounded-full bg-gradient-to-br from-[#f7d7a3] to-[#c07b3f]" />
                <Cookie className="relative h-24 animate-spin w-24 text-[#3d2510]" />
              </div>
            </div>
            <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-4xl font-semibold tracking-[0.2em] text-[#f5e4cf]">
              Cookies
            </div>
          </div>
        </section>

        <section className="mt-16 mb-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#3d2510]">Cookie and Biscuit Collection</h2>
              <p className="mt-1 text-sm text-[#5d3b1a]">
                Eight handpicked crumble boxes with special launch discounts.
              </p>
            </div>
            <Link
              to="/menu"
              className="hidden rounded-full bg-[#3d2510] px-4 py-2 text-xs font-semibold text-[#f5e4cf] shadow-md hover:bg-[#2b180b] sm:inline-flex"
            >
              View full menu
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => {
              const originalPrice = Math.round(product.price / (1 - product.discountPercent / 100))
              return (
                <Link
                  key={product.id}
                  to={`/products/${product.slug}`}
                  className="group overflow-hidden rounded-3xl bg-[#f9e7cf] shadow-[0_18px_40px_rgba(61,37,16,0.16)] transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-[#3d2510]/90 px-3 py-1 text-[11px] font-semibold text-[#fbead0]">
                      {product.discountPercent}% OFF
                    </div>
                  </div>
                  <div className="space-y-2 px-4 py-4">
                    <h3 className="text-sm font-semibold text-[#3d2510]">{product.name}</h3>
                    <p className="line-clamp-2 text-xs text-[#5d3b1a]">{product.description}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <div>
                        <p className="text-lg font-semibold text-[#3d2510]">₹{product.price}</p>
                        <p className="text-[11px] text-[#b38854] line-through">₹{originalPrice}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#f5e4cf] px-3 py-1 text-[11px] font-semibold text-[#3d2510]">
                        <ShieldCheck className="h-3 w-3" />
                        Bestseller
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
