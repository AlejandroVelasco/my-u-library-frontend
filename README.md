# My U Library Frontend

A React + TypeScript frontend for the **My U Library** project, built with Vite and Tailwind CSS.

## 🗂 Repository Structure

```
frontend/
├── .env                   # Environment variables (DO NOT commit)
├── .gitignore             # Ignore node_modules, dist, .env, etc.
├── package.json           # NPM scripts & dependencies
├── tailwind.config.cjs    # Tailwind CSS configuration
├── postcss.config.cjs     # PostCSS configuration
├── vite.config.ts         # Vite configuration
├── public/
│   └── index.html         # HTML template
└── src/
    ├── api/
    │   └── index.ts       # Axios instance & API helpers
    ├── assets/            # Static assets (images, fonts)
    ├── components/        # Reusable UI components (Button, Card, Input)
    ├── features/          # Domain-specific pages and logic
    │   ├── Auth/          # Login page & AuthContext
    │   ├── Books/         # BookList, BookDetail
    │   ├── Checkouts/     # MyCheckouts, ManageCheckouts
    │   └── Admin/         # ManageUsers, ManageBooks
    ├── hooks/             # Custom React hooks (useAuth, useBooks)
    ├── routes/            # React Router setup
    │   └── index.tsx
    ├── App.tsx            # Main app component
    ├── main.tsx           # Entry point
    └── index.css          # Global styles (Tailwind imports)
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone git@github.com:your-username/my-u-library-frontend.git
   cd my-u-library-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**
   Create a `.env` in the project root:

   ```ini
   VITE_API_URL=http://127.0.0.1:8000/api
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**

   ```bash
   npm run preview
   ```

## 🛠 Scripts

In `package.json`:

```jsonc
"scripts": {
  "dev": "vite",
  "build": "tsc -p tsconfig.json && vite build",
  "preview": "vite preview",
  "lint": "eslint ."
}
```

## 🎨 Styling with Tailwind CSS

1. Config files: `tailwind.config.cjs` & `postcss.config.cjs`.
2. In `src/index.css`, include:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```
3. Vite picks up PostCSS automatically.

## 🔑 Environment Variables

| Variable       | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| VITE\_API\_URL | Base URL of the Django API (e.g. `http://localhost:8000/api`) |

## 📚 Features

* **Auth**: Login/logout via TokenAuthentication
* **Books**: List, search, filter by title/author/genre, view details, checkout
* **Student**: View my checkouts
* **Librarian**: Manage users & books, view and mark returns

## 📦 Deployment

* **Vercel** or **Netlify** recommended for static hosting.
* Set `VITE_API_URL` in your project’s environment settings.

## ⚙️ .gitignore

```
node_modules/
dist/
.env
.vscode/
npm-debug.log
yarn-error.log
```