import { useState } from 'react'
import { Cookie } from 'lucide-react'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('http://localhost:5001/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to submit contact form')
      }

      const data = await response.json()
      setSuccess('Message sent successfully! We will get back to you soon.')
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
        setSuccess('')
      }, 2000)

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }
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
              onSubmit={handleSubmit}
            >
              {/* Success Message */}
              {success && (
                <div className="rounded-2xl bg-green-100 border border-green-300 p-4 text-green-800">
                  <p className="font-semibold">{success}</p>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="rounded-2xl bg-red-100 border border-red-300 p-4 text-red-800">
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              <div className="space-y-1 text-xs">
                <label htmlFor="name" className="font-semibold text-[#3d2510]">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]"
                  placeholder="you@biskovia.com"
                />
              </div>
              <div className="space-y-1 text-xs">
                <label htmlFor="subject" className="font-semibold text-[#3d2510]">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-full border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]"
                  placeholder="What's this about?"
                />
              </div>
              <div className="space-y-1 text-xs">
                <label htmlFor="message" className="font-semibold text-[#3d2510]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full rounded-2xl border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]"
                  placeholder="Tell us what kind of cookie box you are imagining."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-full bg-[#3d2510] px-6 py-3 text-sm font-semibold text-[#f5e4cf] hover:bg-[#2b180b] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
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

