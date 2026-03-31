import { Cookie } from 'lucide-react'

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f5e4cf] text-[#3d2510]">

      {/* HEADER */}
      <header className="border-b border-[#e0c8a3] bg-[#d3a971]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3d2510] text-[#f5e4cf]">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wider">Our Story</p>
              <p className="text-xs text-[#5d3b1a]">How Biskovia came to life</p>
            </div>
          </div>

          <a
            href="/"
            className="text-xs font-semibold underline underline-offset-4 hover:text-[#2b180b]"
          >
            Back to home
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="text-center px-6 py-14 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Crafted with warmth, baked with love 🍪
        </h1>
        <p className="mt-4 text-[#5d3b1a] text-sm sm:text-base">
          Every Biskovia cookie carries a story — of late nights, experiments, and a passion
          for creating the perfect bite between a biscuit and a dessert.
        </p>
      </section>

      {/* STORY SECTION */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 space-y-16">

        <section className="grid gap-10 md:grid-cols-2 bg-[#f9e7cf] p-6 sm:p-10 rounded-[2rem] shadow-xl">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              From Oven Experiments to Biskovia
            </h2>
            <p className="text-sm text-[#5d3b1a] leading-relaxed">
              It all started in a small kitchen with a simple goal — to create something that
              feels nostalgic yet indulgent. What came out of the oven wasn’t just a cookie,
              it was a feeling.
            </p>
            <p className="text-sm text-[#5d3b1a] leading-relaxed">
              Over time, those experiments turned into recipes, and those recipes into the
              heart of Biskovia. Today, we continue to bake with the same curiosity and care.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-[#3d2510] p-5 text-[#f5e4cf]">
              <p className="text-xs uppercase tracking-widest text-[#f7d7a3]">
                Our Ritual
              </p>
              <p className="mt-2 text-sm">
                Dough rests overnight for deeper flavour. Every batch is baked fresh in
                small trays to maintain that perfect texture balance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#f5e4cf] p-4 rounded-xl">
                <p className="font-semibold">Ingredients</p>
                <p className="mt-1 text-[#5d3b1a]">
                  Real butter, premium chocolate, natural vanilla.
                </p>
              </div>

              <div className="bg-[#f5e4cf] p-4 rounded-xl">
                <p className="font-semibold">Texture</p>
                <p className="mt-1 text-[#5d3b1a]">
                  Crisp edges with a soft, gooey centre.
                </p>
              </div>

              <div className="bg-[#f5e4cf] p-4 rounded-xl">
                <p className="font-semibold">Care</p>
                <p className="mt-1 text-[#5d3b1a]">
                  Carefully packed so every cookie arrives perfect.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* IMAGE / VISUAL SECTION */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <img
            src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
            alt="cookies"
            className="rounded-2xl shadow-lg w-full h-[300px] object-cover"
          />
          <div>
            <h2 className="text-2xl font-semibold">More than just cookies</h2>
            <p className="mt-3 text-sm text-[#5d3b1a] leading-relaxed">
              Biskovia isn’t just about desserts — it’s about moments. A quiet evening,
              a shared laugh, or a midnight craving. We bake for memories.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { label: "Cookies Baked", value: "50K+" },
            { label: "Happy Customers", value: "10K+" },
            { label: "Flavours Created", value: "25+" },
            { label: "Years of Love", value: "5+" }
          ].map((item, i) => (
            <div key={i} className="bg-[#f9e7cf] p-6 rounded-xl shadow">
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-xs text-[#5d3b1a] mt-1">{item.label}</p>
            </div>
          ))}
        </section>

        {/* FOUNDER QUOTE */}
        <section className="text-center max-w-2xl mx-auto">
          <p className="text-lg italic">
            “We didn’t just want to bake cookies — we wanted to bake comfort.”
          </p>
          <p className="mt-2 text-xs text-[#5d3b1a]">
            — Founder, Biskovia
          </p>
        </section>

      </main>
    </div>
  )
}

export default AboutPage