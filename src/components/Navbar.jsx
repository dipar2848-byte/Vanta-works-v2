import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* BRAND */}
        <div className="text-white font-semibold tracking-tight text-lg">
          VantaWorks
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 text-sm text-white/70">
          <a href="#problem" className="hover:text-white">Problem</a>
          <a href="#solution" className="hover:text-white">Solution</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#cta" className="hover:text-white">Contact</a>
        </nav>

        {/* CTA */}
        <a
          href="#cta"
          className="hidden md:inline-block px-4 py-2 rounded-lg bg-white text-black text-sm font-medium"
        >
          Book Call
        </a>

        {/* MOBILE MENU */}
        <button
          className="md:hidden text-white text-xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-white/70 text-sm">
          <a href="#problem">Problem</a>
          <a href="#solution">Solution</a>
          <a href="#pricing">Pricing</a>
          <a href="#cta">Contact</a>
        </div>
      )}
    </header>
  );
}