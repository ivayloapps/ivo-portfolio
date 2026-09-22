document.getElementById("year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(18px)";
  section.style.transition = "opacity .7s ease, transform .7s ease";
  observer.observe(section);
});

const style = document.createElement("style");
style.textContent = ".section.visible{opacity:1!important;transform:none!important}";
document.head.appendChild(style);


const copyButton = document.querySelector(".copy-email");
const copyFeedback = document.querySelector(".copy-feedback");
if (copyButton) {
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      copyFeedback.textContent = "Email copied to clipboard.";
      setTimeout(() => copyFeedback.textContent = "", 2200);
    } catch {
      copyFeedback.textContent = copyButton.dataset.email;
    }
  });
}


const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


// V7 — interactive command center
const focusData = {
  reliability: {
    code: "REL-01",
    title: "Reliability & Troubleshooting",
    text: "Investigating failures across pipelines, workloads, networking and platform integrations, then turning technical findings into controlled fixes.",
    tools: ["Grafana", "Datadog", "Prometheus", "Kubernetes"]
  },
  platform: {
    code: "PLT-02",
    title: "Platform & Developer Enablement",
    text: "Supporting the CI/CD systems, repositories, integrations and workflow controls engineers depend on to build and ship safely.",
    tools: ["Jenkins", "Bamboo", "Bitbucket", "GitOps", "GitHub Actions"]
  },
  infra: {
    code: "INF-03",
    title: "Infrastructure & Automation",
    text: "Working with infrastructure as code, cloud services, containers and repeatable change workflows across controlled environments.",
    tools: ["Terraform", "AWS", "Kubernetes", "Docker", "Atlantis"]
  },
  access: {
    code: "IAM-04",
    title: "Identity, Access & Governance",
    text: "Troubleshooting authorization paths and secure access across service accounts, IAM, RBAC, OAuth, tokens and workload identity.",
    tools: ["IAM", "RBAC", "OAuth", "Service Accounts", "Secrets"]
  }
};

document.querySelectorAll(".focus-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".focus-item").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    const data = focusData[button.dataset.focus];
    document.getElementById("focus-code").textContent = data.code;
    document.getElementById("focus-title").textContent = data.title;
    document.getElementById("focus-text").textContent = data.text;
    document.getElementById("focus-tools").innerHTML = data.tools.map((tool) => `<span>${tool}</span>`).join("");
  });
});

function openOverlay(id) {
  const overlay = document.getElementById(id);
  if (!overlay) return;
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("overlay-open");
  if (id === "terminal-overlay") {
    setTimeout(() => document.getElementById("terminal-input")?.focus(), 50);
  }
}

function closeOverlay(overlay) {
  if (!overlay) return;
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("overlay-open");
}

document.querySelectorAll(".quick-view-trigger").forEach((button) => {
  button.addEventListener("click", () => openOverlay("quick-view"));
});
document.querySelectorAll(".terminal-trigger").forEach((button) => {
  button.addEventListener("click", () => openOverlay("terminal-overlay"));
});
document.querySelectorAll("[data-close-overlay]").forEach((element) => {
  element.addEventListener("click", () => closeOverlay(element.closest(".overlay-shell")));
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".overlay-shell.open").forEach(closeOverlay);
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openOverlay("terminal-overlay");
  }
});

const terminalCommands = {
  help: () => [
    "Available commands:",
    "  whoami       Professional summary",
    "  focus        Core engineering areas",
    "  stack        Main technologies",
    "  projects     Current personal project",
    "  experience   Experience overview",
    "  github       Open GitHub",
    "  linkedin     Open LinkedIn",
    "  cv           Download CV",
    "  clear        Clear terminal"
  ],
  whoami: () => [
    "Ivaylo “Ivo” Radev",
    "Site Reliability / Platform Engineer",
    "I work across enterprise CI/CD, cloud infrastructure, Kubernetes, IaC, observability and developer platforms."
  ],
  focus: () => [
    "Reliability        incidents · troubleshooting · root cause",
    "Platform           CI/CD · developer tooling · GitOps",
    "Infrastructure     Terraform · Kubernetes · AWS",
    "Access             IAM · RBAC · service accounts"
  ],
  stack: () => [
    "Terraform / HCL · Kubernetes · AWS · Docker",
    "Python · Bash · Groovy · JavaScript · YAML · JSON",
    "Jenkins · Bamboo · Bitbucket · GitHub Actions",
    "Datadog · Grafana · Prometheus · Alertmanager"
  ],
  projects: () => [
    "Personal Cloud Platform",
    "Status: in development",
    "Current milestone: Docker",
    "Stack: Python · FastAPI · Docker · Kubernetes · Terraform"
  ],
  experience: () => [
    "2020 — present   Site Reliability / Platform Engineering",
    "2018 — 2020      Customer Service Coordinator",
    "2013 — 2017      Internet Communications Specialist"
  ]
};

const terminalForm = document.getElementById("terminal-form");
const terminalInput = document.getElementById("terminal-input");
const terminalOutput = document.getElementById("terminal-output");

function appendTerminal(text, className = "") {
  const p = document.createElement("p");
  if (className) p.className = className;
  p.textContent = text;
  terminalOutput.appendChild(p);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

if (terminalForm && terminalInput && terminalOutput) {
  terminalForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = terminalInput.value.trim().toLowerCase();
    if (!command) return;

    appendTerminal(`ivo@sre:~$ ${command}`, "term-command");
    terminalInput.value = "";

    if (command === "clear") {
      terminalOutput.innerHTML = "";
      return;
    }
    if (command === "github") {
      appendTerminal("Opening GitHub…", "term-link");
      window.open("https://github.com/ivayloapps", "_blank", "noopener");
      return;
    }
    if (command === "linkedin") {
      appendTerminal("Opening LinkedIn…", "term-link");
      window.open("https://www.linkedin.com/in/ivaylo-radev-a04452155/", "_blank", "noopener");
      return;
    }
    if (command === "cv") {
      appendTerminal("Opening CV…", "term-link");
      window.open("assets/Ivaylo-Radev-CV.pdf", "_blank");
      return;
    }

    const result = terminalCommands[command];
    if (result) result().forEach((line) => appendTerminal(line));
    else appendTerminal(`Command not found: ${command}. Type "help".`, "term-muted");
  });
}
