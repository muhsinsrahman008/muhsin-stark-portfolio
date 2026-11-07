
/* =========================================================
   MUHSIN S RAHMAN — STARK INTERFACE
   JAVASCRIPT ENGINE v3.1
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const reactor = document.querySelector(".reactor");
  const reactorWrap = document.querySelector(".reactor-wrap");

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  const year = document.getElementById("year");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =====================================================
     01 — ARC REACTOR INTERACTION
     ===================================================== */

  if (reactor && reactorWrap) {
    reactorWrap.addEventListener("mouseenter", () => {
      reactorWrap.classList.add("reactor-active");
    });

    reactorWrap.addEventListener("mouseleave", () => {
      reactorWrap.classList.remove("reactor-active");
    });

    reactorWrap.addEventListener("click", () => {
      reactorWrap.classList.remove("reactor-pulse");

      // Restart click animation.
      void reactorWrap.offsetWidth;

      reactorWrap.classList.add("reactor-pulse");

      window.setTimeout(() => {
        reactorWrap.classList.remove("reactor-pulse");
      }, 1200);
    });

    console.log("Arc Reactor: ONLINE");
  } else {
    console.warn("Arc Reactor elements not found.");
  }

  /* =====================================================
     02 — MOBILE NAVIGATION
     ===================================================== */

  function closeMenu() {
    if (!menuBtn || !nav) return;

    nav.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation");
    menuBtn.textContent = "☰";
  }

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

    nav.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("active") &&
        !nav.contains(event.target) &&
        !menuBtn.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  /* =====================================================
     03 — SCROLL REVEAL
     Content stays visible even if this fails.
     ===================================================== */

  const revealElements = document.querySelectorAll(
    ".reveal, .hero-content, section .section-title, section .panel"
  );

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element) => {
      element.classList.add("show");
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("show");
    });
  }

  /* =====================================================
     04 — SMOOTH NAVIGATION
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
     05 — HERO MOUSE INTERACTION
     ===================================================== */

  const hero = document.querySelector(".hero");

  if (hero && !prefersReducedMotion) {
    hero.addEventListener("mousemove", (event) => {
      const rect = hero.getBoundingClientRect();

      hero.style.setProperty(
        "--mouse-x",
        `${event.clientX - rect.left}px`
      );

      hero.style.setProperty(
        "--mouse-y",
        `${event.clientY - rect.top}px`
      );
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

  console.log("Navigation: READY");
  console.log("Text visibility: PROTECTED");
  console.log("Scroll engine: READY");
});
