import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Cookie, ShoppingBag, User, ShieldCheck, Star } from 'lucide-react'
import { gsap } from 'gsap'
import './App.css'
import chocolateVideo from './assets/chocolate.mp4'

function HomePage() {
  const heroRef = useRef(null)
  const splashRef = useRef(null)

  useEffect(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
    })
    gsap.from(splashRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.2,
      ease: 'elastic.out(1, 0.7)',
    })
  }, [])

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
        <header className="fixed inset-x-0 top-0 z-30 bg-gradient-to-b from-black/70 via-black/30 to-transparent">
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
        </header>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-[#f5e4cf]">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#f7d7a3]">
            Biskovia Crumble Studio
          </p>
          <h1 className="mb-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Chocolate Crumble in Motion
          </h1>
          <p className="mb-6 max-w-md text-sm text-[#fbead0] sm:text-base">
            A slow, cinematic pour of chocolate and crumble to welcome you into the
            Biskovia cookie world.
          </p>
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
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 pt-24">
        <section
          id="home"
          className="mt-10 grid gap-0 overflow-hidden rounded-[2.5rem] bg-[#d3a971] md:grid-cols-[1.1fr_0.9fr]"
        >
          <div ref={heroRef} className="flex flex-col justify-center gap-6 px-10 py-12">
            <h1 className="text-4xl font-semibold leading-tight text-[#3d2510] sm:text-5xl">
              Craving Cookies?
              <br />
              We&apos;ve Got the Crumble!
            </h1>
            <p className="max-w-md text-sm text-[#5d3b1a] sm:text-base">
              From warm ovens to happy moments! Our cookies are made to crumble just right.
              Sweet, soft and baked with love in every batch.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="rounded-full bg-[#3d2510] px-6 py-3 text-sm font-semibold text-[#f5e4cf] shadow-md hover:bg-[#2b180b]"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="rounded-full border border-[#3d2510] px-6 py-3 text-sm font-semibold text-[#3d2510] hover:bg-[#f5e4cf]"
              >
                See Menu
              </button>
            </div>
          </div>
          <div className="relative bg-[#3d2510] p-10">
            <div className="absolute inset-y-0 left-0 w-8 bg-[#d3a971]" />
            <div className="flex h-full items-center justify-center">
              <div
                ref={splashRef}
                className="relative flex h-64 w-64 items-center justify-center rounded-full bg-[#f5e4cf]"
              >
                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-[#f7d7a3] to-[#c07b3f]" />
                <Cookie className="relative h-24 w-24 text-[#3d2510]" />
              </div>
            </div>
            <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 rotate-90 text-4xl font-semibold tracking-[0.2em] text-[#f5e4cf]">
              Cookies
            </div>
          </div>
        </section>

        <section
          id="menu"
          className="mt-16 rounded-[2rem] bg-[#f5e4cf] px-8 py-12 shadow-[0_18px_40px_rgba(61,37,16,0.18)]"
        >
          <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col justify-center gap-4">
              <h2 className="text-3xl font-semibold text-[#3d2510]">
                Only the Finest Go Into Our Crumble
              </h2>
              <p className="text-sm text-[#5d3b1a]">
                With real butter, rich chocolate and hand-selected flavours, we focus on quality
                from the very first step. Each batch is baked fresh using premium ingredients that
                create that signature crumble and deep, satisfying taste you&apos;ll love.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="flex flex-col justify-between rounded-2xl bg-[#3d2510] p-5 text-[#f5e4cf]">
                <div className="space-y-2">
                  <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#f8d9aa]">
                    <Star className="h-3 w-3" />
                    Classic
                  </p>
                  <h3 className="text-lg font-semibold">Choco Chunk Crumble</h3>
                  <p className="text-xs text-[#f8d9aa]">
                    Gooey chocolate pools and golden edges in every bite.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <p className="text-lg font-semibold text-[#f8d9aa]">₹399</p>
                  <button
                    type="button"
                    className="rounded-full bg-[#f5e4cf] px-4 py-2 text-xs font-semibold text-[#3d2510] hover:bg-white"
                  >
                    Add to Box
                  </button>
                </div>
              </article>
              <article className="flex flex-col justify-between rounded-2xl bg-[#f9e7cf] p-5 text-[#3d2510]">
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#c0633a]">
                    Special
                  </p>
                  <h3 className="text-lg font-semibold">Caramel Swirl Delight</h3>
                  <p className="text-xs text-[#5d3b1a]">
                    Soft centre cookies loaded with caramel ribbons and sea salt.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <p className="text-lg font-semibold text-[#c0633a]">₹449</p>
                  <button
                    type="button"
                    className="rounded-full border border-[#3d2510] px-4 py-2 text-xs font-semibold text-[#3d2510] hover:bg-[#d3a971]/30"
                  >
                    See Details
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mt-16 mb-16 grid gap-10 rounded-[2rem] bg-[#f9e7cf] px-8 py-10 md:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[#3d2510]">Stay Crumble-Connected</h2>
            <p className="text-sm text-[#5d3b1a]">
              Drop your email to be the first to know about new cookie drops, festive boxes and
              late-night crumb sales.
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
                Notify Me
              </button>
            </form>
          </div>
          <div className="flex items-center justify-center">
            <div className="rounded-3xl bg-[#d3a971] px-6 py-5 text-sm text-[#3d2510] shadow-md">
              <p className="font-semibold">Customer Care</p>
              <p className="mt-1 text-xs">Mon–Sun · 10am – 11pm</p>
              <p className="mt-3 text-xs">WhatsApp: +91-90000-00000</p>
              <p className="text-xs">Email: hello@biskovia.com</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage
