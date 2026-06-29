import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const id = hash.replace("#", "");
    let frameId = 0;
    let attempts = 0;
    const maxAttempts = 24;

    const jumpToHash = () => {
      const el = document.getElementById(id);

      if (!el) {
        if (attempts < maxAttempts) {
          attempts += 1;
          frameId = requestAnimationFrame(jumpToHash);
        }
        return;
      }

      const top = window.scrollY + el.getBoundingClientRect().top;
      window.scrollTo({ top, left: 0, behavior: "auto" });

      if (Math.abs(el.getBoundingClientRect().top) > 2 && attempts < maxAttempts) {
        attempts += 1;
        frameId = requestAnimationFrame(jumpToHash);
      }
    };

    jumpToHash();

    return () => cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
