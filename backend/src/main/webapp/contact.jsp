<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact (Showcase) - Biskovia</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
    </style>
</head>
<body class="min-h-screen bg-[#f5e4cf] text-[#3d2510]">
    <header class="border-b border-[#e0c8a3] bg-[#d3a971]">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div class="flex items-center gap-2">
                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d2510] text-[#f5e4cf]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cookie"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M16 15.5v.01"/><path d="M12 12v.01"/><path d="M11 17v.01"/><path d="M7 14v.01"/></svg>
                </div>
                <div>
                    <p class="text-lg font-semibold tracking-[0.18em] text-[#3d2510]">Contact (Showcase)</p>
                    <p class="text-xs text-[#5d3b1a]">Showcase JSP Page</p>
                </div>
            </div>
            <a href="http://localhost:5173" class="text-xs font-semibold text-[#3d2510] underline underline-offset-4 hover:text-[#2b180b]">
                Back to React App
            </a>
        </div>
    </header>

    <main class="mx-auto max-w-6xl px-6 py-10">
        <section class="grid gap-10 rounded-[2rem] bg-[#f9e7cf] px-8 py-10 md:grid-cols-[1.1fr_0.9fr] shadow-[0_18px_40px_rgba(61,37,16,0.18)]">
            <div class="space-y-4">
                <h1 class="text-3xl font-semibold text-[#3d2510]">Tell us about your cookie mood</h1>
                <p class="text-sm text-[#5d3b1a]">
                    Fill in the form and we will get back with custom box ideas, bulk order details or
                    anything cookie related you need. (Note: This form is processed by a Java Servlet)
                </p>
                
                <%-- Success/Error display from Servlet redirect --%>
                <% if (request.getAttribute("success") != null) { %>
                    <div class="rounded-2xl bg-green-100 border border-green-300 p-4 text-green-800">
                        <p class="font-semibold"><%= request.getAttribute("success") %></p>
                    </div>
                <% } %>
                
                <% if (request.getAttribute("error") != null) { %>
                    <div class="rounded-2xl bg-red-100 border border-red-300 p-4 text-red-800">
                        <p class="font-semibold"><%= request.getAttribute("error") %></p>
                    </div>
                <% } %>

                <form action="contact" method="POST" class="mt-2 space-y-3">
                    <div class="space-y-1 text-xs">
                        <label for="name" class="font-semibold text-[#3d2510]">Name</label>
                        <input id="name" name="name" required class="w-full rounded-full border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]" placeholder="Cookie lover">
                    </div>
                    <div class="space-y-1 text-xs">
                        <label for="email" class="font-semibold text-[#3d2510]">Email</label>
                        <input id="email" name="email" type="email" required class="w-full rounded-full border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]" placeholder="you@biskovia.com">
                    </div>
                    <div class="space-y-1 text-xs">
                        <label for="subject" class="font-semibold text-[#3d2510]">Subject</label>
                        <input id="subject" name="subject" required class="w-full rounded-full border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]" placeholder="What's this about?">
                    </div>
                    <div class="space-y-1 text-xs">
                        <label for="message" class="font-semibold text-[#3d2510]">Message</label>
                        <textarea id="message" name="message" rows="4" required class="w-full rounded-2xl border border-[#d3a971] bg-[#f5e4cf] px-4 py-2.5 text-sm text-[#3d2510] outline-none placeholder:text-[#b38854]" placeholder="Tell us what kind of cookie box you are imagining."></textarea>
                    </div>
                    <button type="submit" class="mt-2 rounded-full bg-[#3d2510] px-6 py-3 text-sm font-semibold text-[#f5e4cf] hover:bg-[#2b180b]">
                        Send Message (via Servlet)
                    </button>
                </form>
            </div>
            <div class="space-y-4 text-sm text-[#3d2510]">
                <div class="rounded-2xl bg-[#d3a971] px-6 py-5">
                    <p class="font-semibold">Store timings</p>
                    <p class="mt-1 text-xs">Mon–Sun · 10am – 11pm</p>
                    <p class="mt-3 text-xs">Biskovia Crumble Studio, Bengaluru</p>
                </div>
                <div class="rounded-2xl bg-[#f5e4cf] px-6 py-5">
                    <p class="font-semibold">Quick reach</p>
                    <p class="mt-1 text-xs">WhatsApp: +91-90000-00000</p>
                    <p class="text-xs">Email: hello@biskovia.com</p>
                </div>
            </div>
        </section>
    </main>
</body>
</html>
