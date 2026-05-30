import { createContext, useEffect, useState } from "react";

export const ScrollContext = createContext({
  progress: 0,
  section: 0
});

export default function ScrollProvider({ children }) {
  const [progress, setProgress] = useState(0);
  const [section, setSection] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            setSection(index);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));

    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(window.scrollY / h);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ progress, section }}>
      {children}
    </ScrollContext.Provider>
  );
}