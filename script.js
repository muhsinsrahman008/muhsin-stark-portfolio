
/* ==========================================
   STARK PORTFOLIO — ARC REACTOR INTERACTION
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const reactor = document.querySelector(".arc-reactor");
  const hero = document.querySelector(".hero");

  if (!reactor) return;

  // Reactor activation
  reactor.addEventListener("mouseenter", () => {
    reactor.classList.add("reactor-active");
  });

  reactor.addEventListener("mouseleave", () => {
    reactor.classList.remove("reactor-active");
  });

  // Click activation
  reactor.addEventListener("click", () => {
    reactor.classList.toggle("reactor-active");
    reactor.classList.toggle("reactor-pulse");

    setTimeout(() => {
      reactor.classList.remove("reactor-pulse");
    }, 1200);
  });

  // Scroll reveal
  const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);
  });

  // Smooth navigation
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        event.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Hero mouse glow
  if (hero) {
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
  }

  // Dynamic footer year
  const year = document.querySelector("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  console.log("STARK SYSTEM ONLINE ⚡");
});
