[![Portfolio](https://img.shields.io/badge/portfolio-live-5de7c4)](https://ivayloapps.github.io/ivo-portfolio/)
[![Deploy](https://github.com/ivayloapps/ivo-portfolio/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/ivayloapps/ivo-portfolio/actions/workflows/deploy-pages.yml)

# Ivo Portfolio

Professional portfolio website for **Ivaylo (Ivo) Radev** — Site Reliability Engineer / Platform Engineer.

The site presents my professional focus, engineering stack, experience, and personal projects in SRE, Platform Engineering, Cloud Infrastructure, Infrastructure as Code, CI/CD, Kubernetes, automation, and observability.

## Highlights

- Responsive dark engineering / cloud design
- Professional profile and CV download
- Experience timeline
- Animated technology ticker
- Featured Personal Cloud Platform project
- GitHub and LinkedIn links
- Mobile-friendly navigation
- Lightweight HTML/CSS/JavaScript with no framework dependency

## Run locally

Open `index.html` directly or use the **Live Server** extension in Visual Studio Code.

## Deploy

This project is designed to be deployable as a static site using GitHub Pages.

## Featured Project

**Personal Cloud Platform** — a personal cloud-native engineering environment built progressively with Python, FastAPI, Docker, Kubernetes, Terraform, CI/CD, and observability.

## Author

**Ivaylo (Ivo) Radev**  
Site Reliability Engineer / Platform Engineer

## Quick local start

### One click on Windows
Double-click `run-site.bat`. It starts the local Python web server and opens the portfolio at `http://localhost:5500`.

### From Visual Studio Code
Run **Terminal → Run Task → Run Portfolio**, then open `http://localhost:5500`.

Stop the server with `Ctrl+C` in the server terminal.

## CI/CD

Every push to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.

The workflow:
1. Checks out the repository.
2. Verifies required portfolio files.
3. Validates local HTML asset references.
4. Uploads the static site as a GitHub Pages artifact.
5. Deploys it to GitHub Pages.

For Actions-based deployment, set **Settings → Pages → Source** to **GitHub Actions**.


## V5 additions

- Dedicated **Personal Cloud Platform case study**
- Expanded **Experience** section with engineering focus areas
- New **Impact** section describing the types of platform problems I solve
- Responsive **mobile navigation**
- More detailed project architecture and roadmap presentation


## V6 — iPhone responsive fix

This release includes a dedicated small-screen pass, especially for iPhone-sized viewports.

Key fixes:
- Corrected the Experience timeline layout that caused text to collapse into a narrow grid column.
- Experience headings and company names now use the full mobile width.
- Experience detail cards are full-width on phones.
- Improved hero scale, spacing, project cards, terminals and architecture diagrams.
- Added extra layout tuning below 390px.


## Clean public URL

The portfolio now removes tracking query parameters and section hashes from the visible browser URL.

The canonical public address is:

```text
https://ivayloapps.github.io/ivo-portfolio/
```

Internal navigation still scrolls smoothly to sections without leaving URLs such as `#projects` in the address bar.
