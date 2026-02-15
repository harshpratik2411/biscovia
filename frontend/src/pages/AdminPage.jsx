import { Cookie, ShieldCheck, LogOut } from 'lucide-react'

function AdminPage() {
  return (
    <div className="min-h-screen bg-[#3d2510] text-[#f5e4cf]">
      <header className="border-b border-[#f5e4cf]/20 bg-[#2b180b]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5e4cf] text-[#3d2510]">
              <Cookie className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase">Biskovia Admin</p>
              <p className="text-xs text-[#f5e4cf]/80">Staff access only</p>
            </div>
          </div>
          <a
            href="/"
            className="text-xs font-semibold text-[#f5e4cf] underline underline-offset-4 hover:text-[#f7d7a3]"
          >
            Back to site
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-5 rounded-2xl bg-[#2b180b] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.55)]">
            <h1 className="text-xl font-semibold">Admin Sign In</h1>
            <p className="text-xs text-[#f5e4cf]/80">
              Login with your admin credentials to manage cookie flavours, prices and active drops.
            </p>
            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                fetch('/api/admin/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: event.target.username.value,
                    password: event.target.password.value,
                  }),
                })
              }}
            >
              <div className="space-y-1">
                <label htmlFor="username" className="text-xs font-semibold">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full rounded-lg border border-[#f5e4cf]/20 bg-[#3d2510] px-3 py-2 text-sm text-[#f5e4cf] outline-none placeholder:text-[#d3a971] focus:border-[#f7d7a3]"
                  placeholder="admin@biskovia.com"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="password" className="text-xs font-semibold">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-lg border border-[#f5e4cf]/20 bg-[#3d2510] px-3 py-2 text-sm text-[#f5e4cf] outline-none placeholder:text-[#d3a971] focus:border-[#f7d7a3]"
                  placeholder="Minimum 10 characters"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#f5e4cf] px-4 py-2.5 text-sm font-semibold text-[#3d2510] hover:bg-white"
              >
                <ShieldCheck className="h-4 w-4" />
                Login to Dashboard
              </button>
              <button
                type="button"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#f5e4cf]/30 px-4 py-2.5 text-xs font-semibold text-[#f5e4cf]/80 hover:bg-[#2b180b]"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </form>
          </div>

          <div className="space-y-4 rounded-2xl bg-[#3d2510] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#f7d7a3]">
              Oven Control Panel
            </h2>
            <p className="text-xs text-[#f5e4cf]/85">
              Once logged in, you&apos;ll be able to:
            </p>
            <ul className="mt-2 list-disc space-y-1 text-xs text-[#f5e4cf]/85 pl-4">
              <li>Update cookie flavours, prices and availability.</li>
              <li>Open and close special drops like lava midnight boxes.</li>
              <li>View overview of daily orders and baking status.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminPage

