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
    // Scrolling Typography: Conveyor Belt Effect
    const triggerText = ref.textRef?.current ?? null;
    const triggerText2 = ref.text2Ref?.current ?? null;

    if (triggerText && ref.fondoRef?.current) {
      // Select all word-spans inside the text element
      const words = triggerText.querySelectorAll("span");
      const words2 = triggerText2.querySelectorAll("span");
      if (words.length > 0) {
        // Get the wrapper container (the h2 element)
        const container = triggerText;
        const container2 = triggerText2;
        const centerX = window.innerWidth / 2;
        const baseOffsetX = 260;

        // Save the original title text to restore when reversing
        const originalText = ref.tituloRef.current.textContent;

        const tlText = gsap.timeline({
          scrollTrigger: {
            trigger: ref.fondoRef.current,
            start: "top top",
            end: `+=${words.length * 300}px`,
            scrub: true,
            pin: ref.fondoRef.current,
            markers: false,
            anticipatePin: 1,
            pinSpacing: true,

            invalidateOnRefresh: true,
          },
        });

        // Set initial position to center the first word
        const firstWord = words[0];
        const firstWordCenterX =
          firstWord.offsetLeft + firstWord.offsetWidth / 2;
        gsap.set(container, { x: centerX - firstWordCenterX });

        // Animate each word with conveyor belt effect
        // Each word moves to the center of the viewport
        // Words start 1 second after title animation completes
        words.forEach((word, index) => {
          // Animate the word coming from the right
          if (index === 0) {
            // First word: just set initial position from right
            gsap.set(word, { x: 300, opacity: 0 });
          } else {
            // Other words: hide them initially
            gsap.set(word, { x: 300, opacity: 0 });
          }

          // Animate word entrance from right
          tlText.to(
            word,
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            index === 0 ? ">1" : ">0.5",
          );

          tlText.to(
            container,
            {
              // Slight left displacement instead of centering
              x: () => {
                const wordCenterX = word.offsetLeft + word.offsetWidth / 2;
                const leftDisplacement = index === 2 ? 300 : 150;
                return (
                  (centerX - wordCenterX) * 0.2 - leftDisplacement + baseOffsetX
                );
              },
              duration: 1,
              ease: "power3.inOut",
            },
            "<", // Start together with word animation
          );

          tlText.to(
            ref.tituloRef.current,
            {
              // Move title left by 200px from its current position
              x: "-=200",
              duration: 1,
              ease: "power3.inOut",
            },
            "<", // Synchronized with container movement
          );
        });

        tlText.to(
          container,
          {
            opacity: 1,
            duration: 1,
          },
          "+=1",
        );

        // Reverse sequence: words disappear to the left while container recenters right
        for (let i = words2.length - 1; i >= 0; i -= 1) {
          const word = words2[i];
          const nextWord = i > 0 ? words2[i - 1] : words2[0];
          const nextIndex = i > 0 ? i - 1 : 0;

          // Erase effect: letter by letter from right to left
          tlText.to(
            word,
            {
              clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
            },
            ">0.1",
          );

          tlText.to(
            word,
            {
              x: -120,
              opacity: 0,
              duration: 0.2,
            },
            "<",
          );

          tlText.to(
            container2,
            {
              // Slight left displacement instead of centering
              x: () => {
                const wordCenterX =
                  nextWord.offsetLeft + nextWord.offsetWidth / 2;
                const leftDisplacement = nextIndex === 2 ? 300 : 150;
                return (
                  (centerX - wordCenterX) * 0.2 - leftDisplacement + baseOffsetX
                );
              },
              duration: 2,
              ease: "power3.inOut",
            },
            "<",
          );
        }
        words2.forEach((word, index) => {
          // Animate the word coming from the right
          if (index === 0) {
            // First word: just set initial position from right
            gsap.set(word, { x: 300, opacity: 0 });
          } else {
            // Other words: hide them initially
            gsap.set(word, { x: 300, opacity: 0 });
          }

          // Animate word entrance from right
          tlText.to(
            word,
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            index === 0 ? ">1" : ">0.5",
          );

          tlText.to(
            container2,
            {
              // Slight left displacement instead of centering
              x: () => {
                const wordCenterX = word.offsetLeft + word.offsetWidth / 2;
                const leftDisplacement = index === 2 ? 300 : 150;
                return (
                  (centerX - wordCenterX) * 0.2 - leftDisplacement + baseOffsetX
                );
              },
              duration: 1,
              ease: "power3.inOut",
            },
            "<", // Start together with word animation
          );
        });

        tlText.to(
          container2,
          {
            opacity: 1,
            duration: 1,
          },
          "+=1",
        );
      }
    }

    // Refresh ScrollTrigger after images/elements load to recalculate positions
    const refreshTriggers = () => {
      ScrollTrigger.refresh();
    };
    const normalizeScroll = () => {
      ScrollTrigger.normalizeScroll(true);
    };

    // Wait for all images in the section to load
    const waitForImages = () => {
      const images = Array.from(ref.sectionRef.current.querySelectorAll("img"));

      if (images.length === 0) {
        refreshTriggers();
        normalizeScroll();
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
