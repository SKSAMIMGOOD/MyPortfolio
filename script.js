/* Premium portfolio interactions — written with vanilla JavaScript only. */

const projects = [
  {
    title: "Portfolio",
    kind: "Web experience",
    description: "A personal space for projects, skills, education, and the journey toward a career in technology.",
    tags: ["HTML", "CSS", "JavaScript"],
    categories: ["web", "ui", "freelance"],
    codeUrl: "https://github.com/SKSAMIMGOOD/Portfolio",
    liveUrl: "https://sksamimgood.github.io/Portfolio/",
    color: "#00e5ff",
    glow: "rgba(0,229,255,.17)",
    background: "linear-gradient(145deg, #123951 0%, #0c172c 62%, #1e1553 100%)"
  },
  {
    title: "Modern Calendar App",
    kind: "UI exploration",
    description: "A modern calendar app concept that explores practical app building and clear interface patterns.",
    tags: ["Kotlin", "UI", "AI Studio"],
    categories: ["ui", "college"],
    codeUrl: "https://github.com/SKSAMIMGOOD/Modern-calendar-app",
    color: "#b795ff",
    glow: "rgba(183,149,255,.2)",
    background: "linear-gradient(145deg, #332158 0%, #131a3b 62%, #111b43 100%)"
  },
  {
    title: "GitHub Profile Config",
    kind: "Developer brand",
    description: "The configuration behind a public developer profile — designed to make a first digital impression count.",
    tags: ["Markdown", "GitHub", "Brand"],
    categories: ["web", "business"],
    codeUrl: "https://github.com/SKSAMIMGOOD/SKSAMIMGOOD",
    color: "#00ffa3",
    glow: "rgba(0,255,163,.15)",
    background: "linear-gradient(145deg, #0b4b4a 0%, #112c38 54%, #0c1832 100%)"
  },
  {
    title: "Premium WhatsApp Booking",
    kind: "Learning repository",
    description: "A practical collection of web-development coursework and experiments built while learning the front-end fundamentals.",
    tags: ["HTML", "CSS", "JavaScript"],
    categories: ["web", "college"],
    codeUrl: "https://github.com/SKSAMIMGOOD/WhatsApp-Booking-system",
    color: "#ffb56b",
    glow: "rgba(255,181,107,.16)",
    background: "linear-gradient(145deg, #54331f 0%, #242343 60%, #121b35 100%)"
  }
];

const select = (selector, context = document) => context.querySelector(selector);
const selectAll = (selector, context = document) => [...context.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const projectGrid = select("#project-grid");

function projectCard(project) {
  const liveAction = project.liveUrl
    ? `<a href="${project.liveUrl}" target="_blank" rel="noopener">Live demo <svg><use href="#icon-external" /></svg></a>`
    : `<a href="#contact" class="demo-soon" data-project="${project.title}">Live demo <svg><use href="#icon-arrow" /></svg></a>`;

  return `
    <article class="project-card reveal tilt-card" data-categories="${project.categories.join(" ")}" style="--project-blob:${project.color};--project-glow:${project.glow};--project-bg:${project.background};">
      <div class="project-preview" aria-hidden="true">
        <div class="project-preview__grid"></div>
        <div class="project-preview__blob"></div>
        <div class="project-preview__window"><div class="preview-lines"><i></i><i></i><i></i><i></i></div></div>
      </div>
      <div class="project-content">
        <span class="project-type">${project.kind}</span>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-footer">
          <div class="project-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
          <div class="project-actions">
            <a href="${project.codeUrl}" target="_blank" rel="noopener">Code <svg><use href="#icon-github" /></svg></a>
            ${liveAction}
          </div>
        </div>
      </div>
    </article>`;
}

function renderProjects() {
  projectGrid.innerHTML = projects.map(projectCard).join("");
  setupReveal(selectAll(".project-card", projectGrid));
  setupTilt(selectAll(".tilt-card", projectGrid));

  selectAll(".demo-soon", projectGrid).forEach((link) => {
    link.addEventListener("click", () => {
      sessionStorage.setItem("portfolio-message", `${link.dataset.project} is a learning project — a live preview is being prepared.`);
    });
  });
}

/* Reveal sections only when they are near the viewport. */
let revealObserver;
function setupReveal(items = selectAll(".reveal")) {
  if (!revealObserver || reducedMotion) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }
  items.forEach((item) => revealObserver.observe(item));
}

if (!reducedMotion && "IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -35px" }
  );
}

renderProjects();
setupReveal();

/* Initial loading state. */
window.addEventListener("load", () => {
  window.setTimeout(() => select("#loading-screen")?.classList.add("loaded"), 300);
});

/* Animated role in the hero. */
const roles = ["Frontend Developer", "Web Designer", "UI Enthusiast", "AI Learner", "Freelancer"];
const typedRole = select("#typed-role");
let roleIndex = 0;
let letterIndex = 0;
let erasing = false;

function typeRole() {
  if (!typedRole || reducedMotion) return;
  const activeRole = roles[roleIndex];
  typedRole.textContent = activeRole.slice(0, letterIndex);

  if (!erasing && letterIndex < activeRole.length) {
    letterIndex += 1;
    window.setTimeout(typeRole, 72);
  } else if (!erasing) {
    erasing = true;
    window.setTimeout(typeRole, 1600);
  } else if (erasing && letterIndex > 0) {
    letterIndex -= 1;
    window.setTimeout(typeRole, 38);
  } else {
    erasing = false;
    roleIndex = (roleIndex + 1) % roles.length;
    window.setTimeout(typeRole, 300);
  }
}

if (reducedMotion) typedRole.textContent = roles[0];
else typeRole();

/* Number counters run once after the hero becomes visible. */
function countUp(element) {
  const target = Number(element.dataset.count || 0);
  const duration = 900;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    element.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
    if (progress < 1) requestAnimationFrame(frame);
    else element.textContent = `${target}+`;
  }
  requestAnimationFrame(frame);
}

const counterItems = selectAll("[data-count]");
if (reducedMotion || !("IntersectionObserver" in window)) counterItems.forEach((item) => { item.textContent = `${item.dataset.count}+`; });
else {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .65 });
  counterItems.forEach((item) => counterObserver.observe(item));
}

/* Sticky navigation, mobile menu, active links and scroll position. */
const header = select(".site-header");
const menuToggle = select(".menu-toggle");
const navMenu = select(".nav-menu");
const navLinks = selectAll(".nav-link");
const progressBar = select(".scroll-progress span");

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  menuToggle?.setAttribute("aria-label", "Open menu");
  const icon = select("use", menuToggle);
  if (icon) icon.setAttribute("href", "#icon-menu");
}

menuToggle?.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  const icon = select("use", menuToggle);
  if (icon) icon.setAttribute("href", open ? "#icon-close" : "#icon-menu");
});

navMenu?.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

function handleScroll() {
  header?.classList.toggle("scrolled", window.scrollY > 18);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-42% 0px -52% 0px" });
  selectAll("main section[id]").forEach((section) => navObserver.observe(section));
}

/* Skill filtering. */
selectAll(".skill-tab").forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.skillFilter;
    selectAll(".skill-tab").forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
    selectAll(".skill-card").forEach((card) => card.classList.toggle("is-hidden", target !== "all" && card.dataset.skill !== target));
  });
});

/* Project filters. */
selectAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    selectAll(".filter-btn").forEach((item) => item.classList.toggle("active", item === button));
    selectAll(".project-card", projectGrid).forEach((card) => {
      const matches = category === "all" || card.dataset.categories.split(" ").includes(category);
      card.classList.toggle("is-hidden", !matches);
    });
  });
});

/* A subtle desktop-only tilting effect for selected cards. */
function setupTilt(items) {
  if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
  items.forEach((item) => {
    item.addEventListener("pointermove", (event) => {
      const bounds = item.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      item.style.transform = `perspective(900px) rotateX(${y * -3.5}deg) rotateY(${x * 4}deg) translateY(-5px)`;
    });
    item.addEventListener("pointerleave", () => { item.style.transform = ""; });
  });
}
setupTilt(selectAll(".tilt-card"));

/* A restrained parallax response gives the hero depth without heavy rendering. */
if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  selectAll("[data-parallax]").forEach((element) => {
    const depth = Number(element.dataset.parallax || .02);
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      element.style.transform = `translate3d(${x * depth * 100}px, ${y * depth * 100}px, 0)`;
    });
    element.addEventListener("pointerleave", () => { element.style.transform = ""; });
  });
}

/* Magnetic movement and ripple feedback for buttons. */
if (!reducedMotion && window.matchMedia("(pointer: fine)").matches) {
  selectAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = event.clientX - bounds.left - bounds.width / 2;
      const y = event.clientY - bounds.top - bounds.height / 2;
      element.style.transform = `translate(${x * .09}px, ${y * .12}px)`;
    });
    element.addEventListener("pointerleave", () => { element.style.transform = ""; });
  });
}

selectAll(".btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    const ripple = document.createElement("span");
    const bounds = button.getBoundingClientRect();
    ripple.className = "button-ripple";
    ripple.style.left = `${event.clientX - bounds.left}px`;
    ripple.style.top = `${event.clientY - bounds.top}px`;
    button.append(ripple);
    window.setTimeout(() => ripple.remove(), 650);
  });
});

/* Mouse spotlight follows the pointer without affecting keyboard or touch users. */
const cursorGlow = select(".cursor-glow");
if (!reducedMotion && window.matchMedia("(pointer: fine)").matches && cursorGlow) {
  document.body.classList.add("has-pointer");
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.transform = `translate(${event.clientX - 180}px, ${event.clientY - 180}px)`;
  }, { passive: true });
}

/* Lightweight ambient particles: density is intentionally low for performance. */
const canvas = select("#particle-canvas");
if (canvas && !reducedMotion) {
  const context = canvas.getContext("2d");
  const particles = Array.from({ length: 28 }, () => ({
    x: Math.random(), y: Math.random(), size: Math.random() * 1.7 + .4,
    speed: Math.random() * .00015 + .00004, phase: Math.random() * Math.PI * 2,
    color: Math.random() > .6 ? "0,229,255" : Math.random() > .5 ? "139,92,246" : "0,255,163"
  }));
  let canvasWidth = 0;
  let canvasHeight = 0;

  function resizeParticles() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth * ratio;
    canvas.height = canvasHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function drawParticles(time) {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    particles.forEach((particle) => {
      const x = particle.x * canvasWidth + Math.sin(time * particle.speed + particle.phase) * 26;
      const y = particle.y * canvasHeight + Math.cos(time * particle.speed + particle.phase) * 23;
      context.beginPath();
      context.fillStyle = `rgba(${particle.color}, .52)`;
      context.shadowBlur = 7;
      context.shadowColor = `rgb(${particle.color})`;
      context.arc(x, y, particle.size, 0, Math.PI * 2);
      context.fill();
    });
    context.shadowBlur = 0;
    requestAnimationFrame(drawParticles);
  }
  resizeParticles();
  drawParticles(0);
  window.addEventListener("resize", resizeParticles, { passive: true });
}

/* Simple, no-backend contact flow opens the visitor's email client with a prepared message. */
const contactForm = select("#contact-form");
const formStatus = select("#form-status");
const storedMessage = sessionStorage.getItem("portfolio-message");
if (storedMessage && formStatus) {
  formStatus.textContent = storedMessage;
  sessionStorage.removeItem("portfolio-message");
}

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const body = `Hello Samim,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
  formStatus.textContent = "Opening your email app…";
  window.location.href = `mailto:sksamimgoodboy@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.setTimeout(() => { formStatus.textContent = "Thanks — your email app should be ready to send."; }, 500);
});

/* Auto-sliding testimonial statements, with accessible manual controls. */
const testimonials = selectAll(".testimonial");
const sliderDots = selectAll(".slider-dot");
let currentSlide = 0;
let slideTimer;
function showSlide(index) {
  currentSlide = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((slide, slideIndex) => slide.classList.toggle("active", slideIndex === currentSlide));
  sliderDots.forEach((dot, dotIndex) => dot.classList.toggle("active", dotIndex === currentSlide));
}
function startSlider() {
  if (reducedMotion || testimonials.length < 2) return;
  window.clearInterval(slideTimer);
  slideTimer = window.setInterval(() => showSlide(currentSlide + 1), 6000);
}
sliderDots.forEach((dot, index) => dot.addEventListener("click", () => { showSlide(index); startSlider(); }));
startSlider();

select("#year").textContent = new Date().getFullYear();
