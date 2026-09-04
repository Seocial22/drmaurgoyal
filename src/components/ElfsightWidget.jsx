"use client";

import { useEffect, useState, useRef } from "react";

const ElfsightWidget = () => {
  const containerRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleUserInteraction = () => {
      setShouldLoad(true);
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };

    window.addEventListener("scroll", handleUserInteraction, { passive: true, once: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true, once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;

    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [shouldLoad]);

  return (
    <div ref={containerRef} className="min-h-[200px]">
      <div className="elfsight-app-e8774c62-d88f-49ca-bcbf-576a294c1050" data-elfsight-app-lazy></div>
    </div>
  );
};

export default ElfsightWidget;
