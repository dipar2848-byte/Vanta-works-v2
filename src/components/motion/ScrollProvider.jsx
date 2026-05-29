import { createContext, useEffect, useState } from "react";

export const ScrollContext = createContext(0);

export default function ScrollProvider({ children }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.body.scrollHeight - window.innerHeight;
      setProgress(window.scrollY / h);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <ScrollContext.Provider value={progress}>
      {children}
    </ScrollContext.Provider>
  );
}