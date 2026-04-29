import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const waitForSingleImage = (img) => {
  if (img.complete) return Promise.resolve();

  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
};

export default function CasosExito(containerRef, imageRef) {
  if (!containerRef?.current) return;

  let cleanupImageWait = () => {};
  let delayedRefreshTimer;
  gsap.registerPlugin(ScrollTrigger);

  const ctx = gsap.context(() => {
    // Create a timeline that is directly controlled by ScrollTrigger (scrub)
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        markers: true,
        pin: imageRef?.current,
      },
    });

    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    const waitForImages = () => {
      const images = Array.from(containerRef.current.querySelectorAll("img"));

      if (images.length === 0) {
        refreshTriggers();
        return () => {};
      }

      const imagePromises = images.map(waitForSingleImage);

      Promise.all(imagePromises).then(refreshTriggers);

      const fallbackTimer = setTimeout(refreshTriggers, 2000);
      let readyTimer;
      const onWindowLoad = () => {
        readyTimer = setTimeout(refreshTriggers, 500);
      };

      if (document.readyState === "complete") {
        onWindowLoad();
      } else {
        window.addEventListener("load", onWindowLoad);
      }

      return () => {
        clearTimeout(fallbackTimer);
        if (readyTimer) clearTimeout(readyTimer);
        window.removeEventListener("load", onWindowLoad);
      };
    };

    cleanupImageWait = waitForImages();

    delayedRefreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }, containerRef.current);

  return () => {
    cleanupImageWait();
    if (delayedRefreshTimer) clearTimeout(delayedRefreshTimer);
    ctx.revert();
  };
}
