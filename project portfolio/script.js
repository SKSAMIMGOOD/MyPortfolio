const projects = [
  {
    name: "Portfolio",
    description:
      "A personal portfolio website showcasing projects, skills, education, and achievements as a BCA student passionate about tech, AI, and innovation.",
    language: "HTML",
    updated: "2026",
    url: "https://github.com/SKSAMIMGOOD/Portfolio",
    accent: "rgba(83, 244, 255, 0.9)",
  },
  {
    name: "Modern Calendar App",
    description:
      "A modern calendar app project made with AI Studio assistance, showing practical app-building and UI exploration.",
    language: "Kotlin",
    updated: "2026",
    url: "https://github.com/SKSAMIMGOOD/Modern-calendar-app",
    accent: "rgba(156, 107, 255, 0.9)",
  },
  {
    name: "GitHub Profile Config",
    description:
      "Configuration repository for the GitHub profile, used to shape the public developer identity and profile presentation.",
    language: "Profile",
    updated: "2024",
    url: "https://github.com/SKSAMIMGOOD/SKSAMIMGOOD",
    accent: "rgba(255, 107, 214, 0.9)",
  },
  {
    name: "Web Development Course",
    description:
      "A learning repository for web development source code and practice work while building core front-end fundamentals.",
    language: "Learning",
    updated: "2023",
    url: "https://github.com/SKSAMIMGOOD/Web-devlopment-course",
    accent: "rgba(184, 255, 106, 0.9)",
  },
];

const root = document.documentElement;
const body = document.body;
const progress = document.querySelector(".scroll-progress");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const projectGrid = document.querySelector("#project-grid");
const year = document.querySelector("#year");
const copyEmail = document.querySelector(".copy-email");
const canvas = document.querySelector("#orb-canvas");
const ctx = canvas.getContext("2d");

year.textContent = new Date().getFullYear();

function renderProjects() {
  projectGrid.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card glass-panel reveal tilt-card" style="--accent: ${project.accent}">
          <div>
            <p class="eyebrow">${project.language}</p>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
          </div>
          <div>
            <div class="project-meta">
              <span>${project.language}</span>
              <span>Updated ${project.updated}</span>
            </div>
            <a class="project-link" href="${project.url}" target="_blank" rel="noopener">
              View Repository →
            </a>
          </div>
        </article>
      `
    )
    .join("");
}

renderProjects();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          entry.target.textContent = `${target}+`;
          clearInterval(timer);
          return;
        }
        entry.target.textContent = current;
      }, 28);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.8 }
);

document.querySelectorAll("[data-count]").forEach((counter) => counterObserver.observe(counter));

function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progress.style.width = `${percent}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

navToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = nextTheme;
  localStorage.setItem("samim-theme", nextTheme);
});

const savedTheme = localStorage.getItem("samim-theme");
if (savedTheme) {
  root.dataset.theme = savedTheme;
}

copyEmail.addEventListener("click", async () => {
  const email = copyEmail.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyEmail.textContent = "Email Copied";
    setTimeout(() => {
      copyEmail.textContent = "Copy Email";
    }, 1700);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

document.querySelectorAll(".tilt-card, [data-depth='hero']").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateX(${y * -8}deg) rotateY(${x * 8}deg) translateY(-2px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navItems = [...document.querySelectorAll(".nav-links a")];

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -48% 0px" }
);

sections.forEach((section) => navObserver.observe(section));

const orbs = Array.from({ length: 22 }, (_, index) => ({
  x: Math.random(),
  y: Math.random(),
  radius: 1.5 + Math.random() * 3.5,
  speed: 0.00045 + Math.random() * 0.0007,
  phase: Math.random() * Math.PI * 2,
  color: index % 3 === 0 ? "#53f4ff" : index % 3 === 1 ? "#9c6bff" : "#ff6bd6",
}));

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawOrbs(time = 0) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  orbs.forEach((orb) => {
    const x = orb.x * window.innerWidth + Math.sin(time * orb.speed + orb.phase) * 42;
    const y = orb.y * window.innerHeight + Math.cos(time * orb.speed + orb.phase) * 42;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius * 12);
    gradient.addColorStop(0, `${orb.color}88`);
    gradient.addColorStop(1, `${orb.color}00`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, orb.radius * 12, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawOrbs);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawOrbs();
