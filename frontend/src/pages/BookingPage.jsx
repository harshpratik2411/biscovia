import { useLocation, useNavigate } from 'react-router-dom'
import { Cookie, ShoppingBag } from 'lucide-react'
import { products } from '../data/products'

function BookingPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const productSlug = location.state?.productSlug
  const product = products.find((item) => item.slug === productSlug)

  return (
    <div className="min-h-screen bg-[#f5e4cf] text-[#3d2510]">
      <header className="border-b border-[#e0c8a3] bg-[#d3a971]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d2510] text-[#f5e4cf]">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[0.18em] text-[#3d2510]">Booking</p>
              <p className="text-xs text-[#5d3b1a]">Lock in your crumble box and delivery slot</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-[#3d2510] underline underline-offset-4 hover:text-[#2b180b]"
          >
            Back to home
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="grid gap-8 rounded-[2rem] bg-[#f9e7cf] px-8 py-8 shadow-[0_18px_40px_rgba(61,37,16,0.18)] md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-[#3d2510]">Book your cookie box</h1>
            {product ? (
              <div className="flex items-center gap-4 rounded-2xl bg-[#f5e4cf] px-4 py-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 rounded-2xl object-cover"
                />
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-[#3d2510]">{product.name}</p>
                  <p className="text-xs text-[#5d3b1a] line-clamp-2">{product.description}</p>
                  <p className="text-xs font-semibold text-[#c0633a]">Selected box</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-[#5d3b1a]">
                You have not selected a specific box. Choose any cookie box from the home page
                collection or menu, then click Book this box.
              </p>
            )}
          </div>
          <div className="space-y-4 rounded-3xl bg-[#3d2510] px-6 py-6 text-[#f5e4cf]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f7d7a3]">
              Booking form
            </p>
            <form
              className="space-y-3 text-xs"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <div className="space-y-1">
                <label htmlFor="name" className="font-semibold">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-full border border-[#f5e4cf]/30 bg-[#3d2510] px-4 py-2.5 text-sm text-[#f5e4cf] outline-none placeholder:text-[#d3a971]"
                  placeholder="Cookie lover"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="phone" className="font-semibold">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  className="w-full rounded-full border border-[#f5e4cf]/30 bg-[#3d2510] px-4 py-2.5 text-sm text-[#f5e4cf] outline-none placeholder:text-[#d3a971]"
                  placeholder="+91-9xxxx-xxxxx"
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-1">
                  <label htmlFor="date" className="font-semibold">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="w-full rounded-full border border-[#f5e4cf]/30 bg-[#3d2510] px-4 py-2.5 text-sm text-[#f5e4cf] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="time" className="font-semibold">
                    Time slot
                  </label>
                  <select
                    id="time"
                    name="time"
                    required
                    className="w-full rounded-full border border-[#f5e4cf]/30 bg-[#3d2510] px-4 py-2.5 text-sm text-[#f5e4cf] outline-none"
                  >
                    <option value="10-12am">10 – 12 am</option>
                    <option value="12-4pm">12 – 4 pm</option>
                    <option value="4-7pm">4 – 7 pm</option>
                    <option value="7-10pm">7 – 10 pm</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label htmlFor="notes" className="font-semibold">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  className="w-full rounded-2xl border border-[#f5e4cf]/30 bg-[#3d2510] px-4 py-2.5 text-sm text-[#f5e4cf] outline-none placeholder:text-[#d3a971]"
                  placeholder="Tell us any preferences or allergies."
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#f5e4cf] px-5 py-3 text-sm font-semibold text-[#3d2510] hover:bg-white"
              >
                <ShoppingBag className="h-4 w-4" />
                Confirm booking
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default BookingPage

