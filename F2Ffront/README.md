# Farm2Fresh Frontend

This is the frontend for the Farm2Fresh platform, built with React.js, Tailwind CSS, Material-UI, and Ant Design. It provides a modern, responsive interface for both farmers and buyers to interact with the Farm2Fresh agri-tech marketplace.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Setup
```bash
cd F2Ffront
npm install
npm run dev
```
- The app will be available at [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
F2Ffront/
  ├── public/           # Static assets
  ├── src/
  │   ├── api/          # Axios instance
  │   ├── assets/       # Images, SVGs, etc.
  │   ├── commoncomponents/ # Shared UI components
  │   ├── components/   # Main UI components
  │   ├── context/      # React Contexts (JWT, Snackbar)
  │   ├── data/         # Static data (e.g., mandi prices)
  │   ├── layouts/      # Layout wrappers
  │   ├── pages/        # Route pages (Home, Login, etc.)
  │   ├── router/       # Route definitions
  │   ├── styles/       # SCSS and Tailwind styles
  │   └── utils/        # Utility functions
  ├── index.html
  ├── package.json
  └── ...
```

---

## 📜 Available Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code with ESLint

---

## 🌐 Environment
- The frontend is configured to proxy API requests to the backend (`proxy` field in `package.json`).
- Update the backend URL in `package.json` if deploying elsewhere.

---

## 📖 Full Documentation
For full-stack setup, backend API documentation, data models, and contribution guidelines, see the main [Farm2Fresh README](../README.md).

---

