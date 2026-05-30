import { useState, useEffect } from "react";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScroll = 0;

    const onScroll = () => {
      const current = window.scrollY;

      setHidden(current > lastScroll && current > 100);

      lastScroll = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 nav-blur ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="text-white font-semibold tracking-tight">
          VantaWorks
        </div>

        <a
          href="#pricing"
          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium"
        >
          Start
        </a>

      </div>
    </header>
  );
}