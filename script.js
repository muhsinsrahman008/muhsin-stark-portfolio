
/* =====================================================
   MSR_01 — STARK INTERFACE
   JAVASCRIPT ENGINE v3.0
   ARC REACTOR + INTERACTIVE SYSTEM
   ===================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // SYSTEM ELEMENTS
  const reactor = document.querySelector(".reactor");
  const reactorWrap = document.querySelector(".reactor-wrap");
  const hero = document.querySelector(".hero");

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  const year = document.getElementById("year");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =====================================================
     01 — ARC REACTOR SYSTEM
     ===================================================== */

  if (reactor && reactorWrap) {
    reactorWrap.setAttribute("role", "img");
    reactorWrap.setAttribute(
      "aria-label",
      "Animated blue Arc Reactor energy core"
    );

    reactorWrap.addEventListener("mouseenter", () => {
      reactorWrap.classList.add("reactor-active");
    });

    reactorWrap.addEventListener("mouseleave", () => {
      reactorWrap.classList.remove("reactor-active");
    });

    reactorWrap.addEventListener("click", () => {
      reactorWrap.classList.remove("reactor-pulse");

      // Restart the pulse animation.
      void reactorWrap.offsetWidth;

      reactorWrap.classList.add("reactor-pulse");

      window.setTimeout(() => {
        reactorWrap.classList.remove("reactor-pulse");
      }, 1200);
    });
  }

  /* =====================================================
     02 — MOBILE NAVIGATION
     ===================================================== */

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");

      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuBtn.textContent = isOpen ? "✕" : "☰";
    });

    // Close menu after selecting a navigation link.
    nav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation");
        menuBtn.textContent = "☰";
      });
    });

    // Close menu when clicking outside it.
    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("active") &&
        !nav.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {
        nav.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation");
        menuBtn.textContent = "☰";
      }
    });

    // Close menu with Escape key.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("active")) {
        nav.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.setAttribute("aria-label", "Open navigation");
        menuBtn.textContent = "☰";

        menuBtn.focus();
      }
    });
  }

  /* =====================================================
     03 — SCROLL REVEAL ENGINE
     Uses existing CSS: .reveal and .reveal.show
     ===================================================== */

  const revealElements = document.querySelectorAll(
    ".hero-content, section .section-title, section .panel"
  );

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    // Keep all content visible when animation is unavailable.
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  /* =====================================================
     04 — SMOOTH SECTION NAVIGATION
     ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });

  /* =====================================================
     05 — HERO INTERACTION
     ===================================================== */

  if (hero && !prefersReducedMotion) {
    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      hero.style.setProperty("--mouse-x", `${x}px`);
      hero.style.setProperty("--mouse-y", `${y}px`);
    });

    hero.addEventListener("mouseleave", () => {
      hero.style.removeProperty("--mouse-x");
      hero.style.removeProperty("--mouse-y");
    });
  }

  /* =====================================================
     06 — DYNAMIC FOOTER YEAR
     ===================================================== */

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* =====================================================
     07 — SYSTEM READY
     ===================================================== */

  document.documentElement.classList.add("js-ready");

  console.log(
    "%c STARK INTERFACE ONLINE ",
    "background:#00eaff;color:#050a12;font-weight:bold;padding:8px;"
  );

  console.log("Arc Reactor: READY");
  console.log("Navigation: READY");
  console.log("Scroll Engine: READY");
});
