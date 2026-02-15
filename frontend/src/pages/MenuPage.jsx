import { Cookie, ShoppingBag, Star } from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'Choco Chip Crumble',
    tag: 'Classic',
    price: '₹399',
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
    description: 'Soft-centre choco chip cookies with crisp golden edges.',
    highlight: 'Baked fresh daily',
  },
  {
    id: 2,
    name: 'Red Velvet Swirl',
    tag: 'Special',
    price: '₹449',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    description: 'Red velvet cookie with cream cheese white chocolate chips.',
    highlight: 'Limited festive batch',
  },
  {
    id: 3,
    name: 'Caramel Drizzle Stack',
    tag: 'Premium',
    price: '₹499',
    image:
      'https://images.unsplash.com/photo-1549689919-9f3c5c2e8417?auto=format&fit=crop&w=900&q=80',
    description: 'Thick cookies loaded with caramel ribbons and sea salt.',
    highlight: 'Best with coffee',
  },
  {
    id: 4,
    name: 'Nutty Biscuit Medley',
    tag: 'Crunchy',
    price: '₹379',
    image:
      'https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=900&q=80',
    description: 'Assorted biscuit-style cookies with mixed nuts and cocoa.',
    highlight: 'Perfect tea-time pick',
  },
]

function MenuPage() {
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
          {products.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-3xl bg-[#f9e7cf] shadow-[0_18px_40px_rgba(61,37,16,0.18)]"
            >
              <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
                <div className="relative h-56 overflow-hidden md:h-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-[#f5e4cf]/90 px-3 py-1 text-[11px] font-semibold text-[#3d2510]">
                    {item.tag}
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-3 px-5 py-5">
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-[#3d2510]">{item.name}</h2>
                    <p className="text-xs text-[#5d3b1a]">{item.description}</p>
                    <p className="text-xs font-semibold text-[#c0633a]">{item.highlight}</p>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm">
                    <p className="text-xl font-semibold text-[#3d2510]">{item.price}</p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full bg-[#3d2510] px-4 py-2 text-xs font-semibold text-[#f5e4cf] hover:bg-[#2b180b]"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to Box
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default MenuPage

