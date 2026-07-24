const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");

const setHeaderState = () => {
  header?.classList.toggle("scrolled", window.scrollY > 24);

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  header?.style.setProperty("--scroll-progress", `${Math.min(progress, 100)}%`);
};

const closeNavigation = () => {
  if (!navToggle || !nav) return;

  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  nav.classList.remove("open");
  header?.classList.remove("menu-active");
  document.body.classList.remove("nav-open");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";

  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  nav?.classList.toggle("open", !isOpen);
  header?.classList.toggle("menu-active", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

if (year) {
  year.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const trackedSections = document.querySelectorAll("#expertise, #heritage, #contact");
const sectionLinks = document.querySelectorAll(".site-nav a[href^='#']");

const setActiveSection = (sectionId = "") => {
  sectionLinks.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
};

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const activeEntry = entries.find((entry) => entry.isIntersecting);
      if (activeEntry) setActiveSection(activeEntry.target.id);
    },
    {
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    },
  );

  trackedSections.forEach((section) => sectionObserver.observe(section));
}

