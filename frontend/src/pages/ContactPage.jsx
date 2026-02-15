import { Cookie } from 'lucide-react'

function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5e4cf] text-[#3d2510]">
      <header className="border-b border-[#e0c8a3] bg-[#d3a971]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d2510] text-[#f5e4cf]">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[0.18em] text-[#3d2510]">Contact</p>
              <p className="text-xs text-[#5d3b1a]">Chat with the Biskovia crumble crew</p>
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
        <section className="grid gap-10 rounded-[2rem] bg-[#f9e7cf] px-8 py-10 md:grid-cols-[1.1fr_0.9fr] shadow-[0_18px_40px_rgba(61,37,16,0.18)]">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-[#3d2510]">Tell us about your cookie mood</h1>
            <p className="text-sm text-[#5d3b1a]">
              Fill in the form and we will get back with custom box ideas, bulk order details or
              anything cookie related you need.
            </p>
            <form
              className="mt-2 space-y-3"
              onSubmit={(event) => {
                event.preventDefault()
              }}
            >
              <div className="space-y-1 text-xs">
                <label htmlFor="name" className="font-semibold text-[#3d2510]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full rounded-full border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]"
                  placeholder="Cookie lover"
                />
              </div>
              <div className="space-y-1 text-xs">
                <label htmlFor="email" className="font-semibold text-[#3d2510]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-full border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]"
                  placeholder="you@biskovia.com"
                />
              </div>
              <div className="space-y-1 text-xs">
                <label htmlFor="message" className="font-semibold text-[#3d2510]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-2xl border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]"
                  placeholder="Tell us what kind of cookie box you are imagining."
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-full bg-[#3d2510] px-6 py-3 text-sm font-semibold text-[#f5e4cf] hover:bg-[#2b180b]"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="space-y-4 text-sm text-[#3d2510]">
            <div className="rounded-2xl bg-[#d3a971] px-6 py-5">
              <p className="font-semibold">Store timings</p>
              <p className="mt-1 text-xs">Mon–Sun · 10am – 11pm</p>
              <p className="mt-3 text-xs">Biskovia Crumble Studio, Bengaluru</p>
            </div>
            <div className="rounded-2xl bg-[#f5e4cf] px-6 py-5">
              <p className="font-semibold">Quick reach</p>
              <p className="mt-1 text-xs">WhatsApp: +91-90000-00000</p>
              <p className="text-xs">Email: hello@biskovia.com</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ContactPage

