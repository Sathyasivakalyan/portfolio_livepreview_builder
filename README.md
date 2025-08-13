# Portfolio Builder with Live Preview

A responsive, frontend-only web application to **create, preview, and publish professional portfolios in real time**. Build your portfolio with form-based inputs, see changes instantly in a side-by-side preview, and open a full, polished portfolio site in a new tab for sharing.



## ✨ Key Features

- **Live Preview (Side-by-Side):** Edit content and see updates instantly in the preview panel. The app persists data in the browser using `localStorage` under the key `portfolioData`. fileciteturn0file5
- **Full-Site View / New Tab:** Use the built-in **Open Final Portfolio Website** button (or the **View Full Portfolio ↗** button in the preview) to open the completed portfolio at `/opennewwebsite` in a new tab. fileciteturn0file5turn0file3
- **Dark/Light Mode Toggle:** Switch themes via the `ThemeToggle` component; theme preference is saved to `localStorage`. fileciteturn0file4
- **Structured Content Management:** Fill out **Education, Experience, Skills, Awards, Projects, and Contact** sections with intuitive form inputs. Upload a profile photo and project images (base64 preview supported). fileciteturn0file2
- **Interactive Project Gallery:** Hover overlays reveal project details with links for **Live** and **Code** in the final site. fileciteturn0file1
- **Error Safety:** Basic error boundary for graceful fallback UI. fileciteturn0file0



## 🧰 Tech Stack

- **Core:** React, React Router (SPA)
- **State & Storage:** React state + `localStorage` persistence
- **UI/UX:** Custom CSS (`App.css`), modern responsive layout
- **Animation:** `framer-motion` for section transitions in the final site fileciteturn0file1

> **Note:** This is a **frontend-only** project—no backend required.



## 🗺️ App Structure & Routing


/ (Builder & Live Preview)
└─ components/
   ├─ PortfolioBuilder.jsx     # Form inputs, uploads, add/remove section items
   ├─ PortfolioPreview.jsx     # Live preview + "View Full Portfolio" button
   ├─ OpenNewWebsite.jsx       # Final portfolio site (hero, about, projects, contact)
   ├─ ThemeToggle.jsx          # Dark/Light mode toggle
   └─ ErrorBoundary.jsx        # Fallback UI for runtime errors

- **Routes:**
  - `/` – Main builder with **side-by-side** Live Preview. fileciteturn0file5
  - `/opennewwebsite` – Final portfolio website rendered from saved data. fileciteturn0file5

- **Data Flow:**
  - Builder updates `data` → Preview reflects in real time → `localStorage` persists → Final site reads from `localStorage`. fileciteturn0file5



## 📦 Getting Started

1. **Prerequisites**
   - Node.js (v18 or later recommended) & npm

2. **Install**
   ```bash
   npm install
   ```

3. **Run the app (choose one depending on your setup)**
   - Create React App:
     ```bash
     npm start
     ```
   - Vite:
     ```bash
     npm run dev
     ```

4. **Open in browser**
   - Visit `http://localhost:3000` (CRA) or the port Vite shows (e.g., `http://localhost:5173`).

> The app stores your work in `localStorage` so your data survives refreshes.



## 🧩 Core Components

- **`App.jsx`** – Sets up routes (`/` and `/opennewwebsite`), manages portfolio state, and syncs to `localStorage` (`portfolioData`). fileciteturn0file5
- **`PortfolioBuilder.jsx`** – Collects user input: name, bio, **profile photo upload** (base64), resume file (object URL), contact links, and arrays for **education/experience/awards/skills/projects**. Includes file inputs for **project images** with preview. fileciteturn0file2
- **`PortfolioPreview.jsx`** – Renders a clean preview of all sections; includes **View Full Portfolio ↗** button that saves `data` to `localStorage` and opens `/opennewwebsite`. fileciteturn0file3
- **`OpenNewWebsite.jsx`** – Final portfolio site with hero, social links, **animated sections** (`framer-motion`), **project overlay on hover**, testimonials, and contact details; includes **scroll-to-top** control. fileciteturn0file1
- **`ThemeToggle.jsx`** – Dark/Light mode toggle, persists theme in `localStorage`. fileciteturn0file4
- **`ErrorBoundary.jsx`** – Minimal error boundary wrapper. fileciteturn0file0



## 🚀 Deployment

- **Static Hosting:** Works well on Netlify, Vercel, or GitHub Pages.
- Ensure client-side routing supports `/opennewwebsite` (configure SPA fallback to `index.html`).



## 🔧 Configuration Tips

- **Image Uploads:** Profile and project images are stored as **base64** in memory and previewed immediately. fileciteturn0file2
- **Resume Upload:** Stored as an object URL and linked in Preview. fileciteturn0file2
- **Project Links:** Provide **Live** and **GitHub** URLs for each project to appear in cards/overlay. fileciteturn0file1






## 🙌 Acknowledgements

- React & community libraries
- Inspiration from modern developer portfolio designs

