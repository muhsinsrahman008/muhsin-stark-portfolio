
/* =====================================================
   MSR_01 — STARK INTERACTION ENGINE
   VERSION 1.0
   ===================================================== */

"use strict";

// SYSTEM INITIALIZATION

document.addEventListener("DOMContentLoaded", () => {

  console.log(
    "%c MSR_01 SYSTEM INITIALIZED ",
    "background:#00eaff;color:#050a12;font-weight:bold;padding:8px;"
  );

  initializeNavigation();
  initializeRevealAnimations();
  initializeReactorInteraction();
  initializeYear();
  initializeSmoothNavigation();

});


// MOBILE NAVIGATION

function initializeNavigation() {

  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {

    const isOpen = nav.classList.toggle("active");

    menuBtn.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuBtn.textContent = isOpen ? "✕" : "☰";

  });

  nav.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

      nav.classList.remove("active");

      menuBtn.setAttribute("aria-expanded", "false");

      menuBtn.textContent = "☰";

    });

  });

  document.addEventListener("click", event => {

    if (
      !nav.contains(event.target) &&
      !menuBtn.contains(event.target)
    ) {

      nav.classList.remove("active");

      menuBtn.setAttribute("aria-expanded", "false");

      menuBtn.textContent = "☰";

    }

  });

}


// SCROLL REVEAL ENGINE

function initializeRevealAnimations() {

  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {

    elements.forEach(element => {
      element.classList.add("show");
    });

    return;

  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {

      entries.forEach(entry => {

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

  elements.forEach(element => {
    observer.observe(element);
  });

}


// ARC REACTOR POINTER INTERACTION

function initializeReactorInteraction() {

  const reactor = document.getElementById("reactor");

  if (!reactor) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (prefersReducedMotion.matches) return;

  reactor.addEventListener("pointermove", event => {

    const rect = reactor.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 12;
    const rotateX = ((centerY - y) / centerY) * 12;

    reactor.style.transform =
      `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  });

  reactor.addEventListener("pointerleave", () => {

    reactor.style.transform =
      "perspective(500px) rotateX(0deg) rotateY(0deg)";

  });

}


// DYNAMIC COPYRIGHT YEAR

function initializeYear() {

  const year = document.getElementById("year");

  if (year) {

    year.textContent = new Date().getFullYear();

  }

}


// SMOOTH NAVIGATION

function initializeSmoothNavigation() {

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

}


// SYSTEM DIAGNOSTICS

window.addEventListener("load", () => {

  console.log("MSR_01: All interface modules loaded.");

});
