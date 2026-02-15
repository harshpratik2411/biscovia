import { Cookie } from 'lucide-react'

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5e4cf] text-[#3d2510]">
      <header className="border-b border-[#e0c8a3] bg-[#d3a971]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d2510] text-[#f5e4cf]">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-[0.18em] text-[#3d2510]">Our Story</p>
              <p className="text-xs text-[#5d3b1a]">How Biskovia cookies came to crumble</p>
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
        <section className="grid gap-10 rounded-[2rem] bg-[#f9e7cf] px-8 py-10 md:grid-cols-2 shadow-[0_18px_40px_rgba(61,37,16,0.18)]">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold text-[#3d2510]">From Oven Experiments to Biskovia</h1>
            <p className="text-sm text-[#5d3b1a]">
              Biskovia started as a late-night kitchen experiment in a tiny home oven. The goal was
              simple: build a cookie that felt like the comfort of a biscuit and the indulgence of a
              dessert in one bite.
            </p>
            <p className="text-sm text-[#5d3b1a]">
              Today, every crumbly cookie that leaves our oven still follows that same ritual: slow
              rested dough, real butter and carefully chosen chocolate and toppings.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-[#3d2510] px-5 py-4 text-sm text-[#f5e4cf]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f7d7a3]">
                Biskovia Ritual
              </p>
              <p className="mt-2 text-xs">
                Dough is rested overnight, then baked in small trays so every batch stays soft at the
                centre and crisp at the rim.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 text-xs">
              <div className="rounded-2xl bg-[#f5e4cf] px-4 py-3">
                <p className="font-semibold text-[#3d2510]">Ingredients</p>
                <p className="mt-1 text-[#5d3b1a]">Fine butter, rich chocolate and real vanilla pods.</p>
              </div>
              <div className="rounded-2xl bg-[#f5e4cf] px-4 py-3">
                <p className="font-semibold text-[#3d2510]">Texture</p>
                <p className="mt-1 text-[#5d3b1a]">Balanced crumble outside, soft cookie heart inside.</p>
              </div>
              <div className="rounded-2xl bg-[#f5e4cf] px-4 py-3">
                <p className="font-semibold text-[#3d2510]">Care</p>
                <p className="mt-1 text-[#5d3b1a]">Boxed carefully so every biscuit reaches you intact.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AboutPage

