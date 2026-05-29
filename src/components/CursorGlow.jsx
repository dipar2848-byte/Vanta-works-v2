import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const glow = document.createElement("div");

    glow.style.position = "fixed";
    glow.style.width = "400px";
    glow.style.height = "400px";
    glow.style.borderRadius = "50%";
    glow.style.pointerEvents = "none";
    glow.style.background =
      "radial-gradient(circle, rgba(168,85,247,0.18), transparent 60%)";

    glow.style.transform = "translate(-50%, -50%)";
    glow.style.zIndex = "9999";

    document.body.appendChild(glow);

    const move = (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      document.body.removeChild(glow);
    };
  }, []);

  return null;
}