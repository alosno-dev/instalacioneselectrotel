import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const waitForSingleImage = (img) => {
  if (img.complete) return Promise.resolve();

  return new Promise((resolve) => {
    img.addEventListener("load", resolve, { once: true });
    img.addEventListener("error", resolve, { once: true });
  });
};

export default function AboutMeAnimation(ref) {
  if (!ref?.sectionRef?.current) return;

  const triggerEl = ref.fondoRef?.current ?? ref.sectionRef.current;
  let cleanupImageWait = () => {};
  let delayedRefreshTimer;

  const ctx = gsap.context(() => {
    // Create a timeline that is directly controlled by ScrollTrigger (scrub)
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: triggerEl,
        start: "top-=100 center",
        end: "top+=100 center",
        scrub: true,
        markers: false,
      },
    });

    if (ref.fondoRef?.current) {
      tl.fromTo(
        ref.fondoRef.current,
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)", opacity: 1 },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          opacity: 1,
          duration: 1,
        },
        0,
      );
    }

    // Create a second, independent ScrollTrigger/timeline for a text element
    // This timeline is separate from `tl` and won't interfere with the fondo animation
    const triggerText = ref.textRef?.current ?? null;
    if (triggerText && ref.fondoRef?.current) {
      // Select all word-spans inside the text element
      const words = triggerText.querySelectorAll("span");
      if (words.length > 0) {
        const tlText = gsap.timeline({
          scrollTrigger: {
            trigger: ref.fondoRef.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: ref.fondoRef.current,
            markers: false,
            anticipatePin: 1,
            pinSpacing: true,
            pinReparent: true,
            invalidateOnRefresh: true,
          },
        });

        // Animate each word with stagger (each word has a small delay)
        tlText.fromTo(
          words,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08, // 80ms delay between each word animation start
          },
        );
      }
    }

    // Refresh ScrollTrigger after images/elements load to recalculate positions
    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };

    // Wait for all images in the section to load
    const waitForImages = () => {
      const images = Array.from(ref.sectionRef.current.querySelectorAll("img"));

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

    // Additional refresh after a small delay to ensure GSAP recalculates layout correctly
    delayedRefreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);
  }, ref.sectionRef.current);

  return () => {
    cleanupImageWait();
    if (delayedRefreshTimer) clearTimeout(delayedRefreshTimer);
    ctx.revert();
  };
}
