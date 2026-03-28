import { Link } from 'react-router-dom'
import { Cookie, ShoppingBag, User, ShieldCheck, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'
import chocolateVideo from './assets/chocolate.mp4'
import chocolateVideoSecondary from './assets/chocolate1.mp4'
import img5 from  './assets/cookies/img5.jpg'
import img7 from  './assets/cookies/img7.jpg'
import homeCookie1 from './assets/cookies/img1.jpg'
import homeCookie2 from './assets/cookies/img2.jpg'
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
          <h1 className="mb-4 text-4xl font-semibold leading-tight  sm:text-5xl">
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
                className="rounded-full animate-pulse  bg-[#f5e4cf] px-6 py-3 text-sm font-semibold text-[#3d2510] shadow-md hover:bg-[#fff]"
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

        <section className="mb-16 rounded-[2.5rem] bg-[#f9e7cf] px-8 py-10 shadow-[0_18px_40px_rgba(61,37,16,0.16)]">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c0633a]">
                Why Biskovia
              </p>
              <h2 className="text-2xl font-semibold text-[#3d2510]">
                Small batch baking for big city cravings
              </h2>
              <p className="text-sm text-[#5d3b1a]">
                Every tray of cookies is baked in micro batches through the day so you never get
                shelf-stale biscuits. Just warm crumble, molten chocolate and crisp edges that crack
                in all the right places.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-[#f5e4cf] px-4 py-4 text-xs text-[#3d2510]">
                  <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c0633a]">
                    <Star className="h-3 w-3" />
                    Ingredients
                  </p>
                  <p className="mt-2 text-xs">
                    European butter, couverture chocolate and carefully sourced nuts and fruits.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f5e4cf] px-4 py-4 text-xs text-[#3d2510]">
                  <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c0633a]">
                    <ShieldCheck className="h-3 w-3" />
                    Technique
                  </p>
                  <p className="mt-2 text-xs">
                    Low and slow baking curves tuned for that perfect soft centre crumble.
                  </p>
                </div>
                <div className="rounded-2xl bg-[#f5e4cf] px-4 py-4 text-xs text-[#3d2510]">
                  <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c0633a]">
                    <Cookie className="h-3 w-3" />
                    Finish
                  </p>
                  <p className="mt-2 text-xs">
                    Each box is hand-finished with crumble dusting and a tasting note card.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-sm">
                <div className="grid gap-3">
                  <div className="relative h-40 overflow-hidden rounded-3xl">
                    <img
                      src={img5}
                      alt="Fresh cookie tray"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute left-3 top-3 rounded-full bg-[#3d2510]/85 px-3 py-1 text-[11px] font-semibold text-[#fbead0]">
                      Fresh out of the oven
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative h-28 overflow-hidden rounded-3xl">
                      <img
                        src={homeCookie1}
                        alt="Cookie closeup"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="relative h-28 overflow-hidden rounded-3xl">
                      <img
                        src={homeCookie2}
                        alt="Biscuit stack"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 grid gap-10 rounded-[2.5rem] bg-[#3d2510] px-8 py-10 text-[#f5e4cf] md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f7d7a3]">
              Crumble stories
            </p>
            <h2 className="text-2xl font-semibold">What city cookie lovers are saying</h2>
            <p className="text-sm text-[#fbead0]">
              Late night projects, weekend binges, coffee catch-ups or solo movie marathons. Biskovia
              boxes have quietly become the cookie of choice across town.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-[#2b180b] px-5 py-4 text-xs text-[#fbead0]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7d7a3]">
                  4.9 average rating
                </p>
                <p className="mt-2">
                  Super soft centre with just enough edge crunch. Tastes like a cookie bar dessert but
                  in a box.
                </p>
                <p className="mt-3 text-[11px] text-[#f7d7a3]">– Ananya, midnight snacker</p>
              </div>
              <div className="rounded-2xl bg-[#2b180b] px-5 py-4 text-xs text-[#fbead0]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7d7a3]">
                  Office favourite
                </p>
                <p className="mt-2">
                  We order the assorted box every Friday. There are never any leftovers. Only crumbs.
                </p>
                <p className="mt-3 text-[11px] text-[#f7d7a3]">– Rohit, team lead</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm overflow-hidden rounded-[1rem] bg-[#2b180b]">
              <img
                src={img7}
                alt="Cookie box illustration"
                className="absolute inset-0 h-full w-full object-cover opacity-80"
              />
              <div className="relative px-6 py-6 text-xs text-[#fbead0]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#f7d7a3]">
                  Pairing notes
                </p>
                <ul className="mt-3 space-y-2">
                  <li>• Choco Chip Crumble with a flat white or cold brew.</li>
                  <li>• Red Velvet Swish with vanilla milk or hot chocolate.</li>
                  <li>• Espresso Crunch Disc with a double shot espresso.</li>
                </ul>
                <p className="mt-4 text-[11px]">
                  Turn your cookie box into a mini dessert tasting session at home.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="mb-24 grid gap-10 rounded-[2.5rem] bg-[#fef3e0] px-8 py-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c0633a]">
              Stay crumble-connected
            </p>
            <h2 className="text-2xl font-semibold text-[#3d2510]">Be first in line for new drops</h2>
            <p className="text-sm text-[#5d3b1a]">
              Limited edition festival boxes, midnight cookie drops and seasonal flavours disappear in
              hours. Add your email to get early access links before social media sees them.
            </p>
            <form
              className="mt-2 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <input
                type="email"
                required
                placeholder="you@biskovia.com"
                className="w-full rounded-full border border-[#d3a971] bg-[#f5e4cf] px-4 py-3 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]"
              />
              <button
                type="submit"
                className="rounded-full bg-[#3d2510] px-6 py-3 text-sm font-semibold text-[#f5e4cf] hover:bg-[#2b180b]"
              >
                Get early access
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[#d3a971] shadow-md">
              <img
                src={cookiePack2}
                alt="Studio cookie counter"
                className="absolute inset-0 h-full w-full object-cover opacity-60"
              />
              <div className="relative px-6 py-5 text-sm text-[#3d2510]">
                <p className="font-semibold">Visit the crumble studio</p>
                <p className="mt-1 text-xs">Open daily · 11am – 11pm</p>
                <p className="mt-3 text-xs">Biskovia Crumble Studio, High Street, Bengaluru</p>
                <p className="mt-1 text-xs">WhatsApp: +91-90000-00000</p>
                <p className="text-xs">Email: hello@biskovia.com</p>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <section className="w-full overflow-hidden bg-black">
        <video
          src={chocolateVideoSecondary}
          autoPlay
          loop
          muted
          playsInline
          className="h-64 w-full object-cover  sm:h-80 md:h-[40rem]"
        />
      </section>
    </div>
  )
}

export default HomePage
