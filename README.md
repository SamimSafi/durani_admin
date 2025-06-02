
---

# 🚀 Admin Panel - AKACC

This project is a **modern admin panel** built using **React** and **Vite**, designed for high performance, modularity, and ease of development. It includes essential tools and configurations to streamline your workflow and maintain code quality.

---

## 🔧 Features

* ⚡ **React + Vite**: Lightning-fast development with Hot Module Replacement (HMR).
* ✅ **ESLint Integration**: Enforce consistent code style and quality.
* 🏎️ **SWC or Babel**: Choose between SWC or Babel for fast refresh and optimized builds.
* 🧱 **Modular Architecture**: Clean, scalable folder structure ideal for large projects.

---

## 📦 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v16 or higher recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

---

### 📥 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/admin_panel.git
   cd admin_panel
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

---

### 📦 Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
```

---

### 🔍 Preview the Production Build Locally

After building, you can preview the production output:

```bash
npm run preview
# or
yarn preview
```

---

## 🌐 Environment Configuration

To configure the **API base URL** or other environment variables, create a `.env` file in the root of the project.

### Example `.env` file

```env
VITE_API_URL=https://your-api-server.com/api
```

### How to Use in Code

In Vite, environment variables are accessed using `import.meta.env`:

```ts
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

> ⚠️ **Note**: All environment variables in Vite must be prefixed with `VITE_` to be accessible in your code.

---

## 📂 Project Structure (Optional Example)

```
admin_panel/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── store/
│   └── main.tsx
├── .env
├── vite.config.ts
├── package.json
└── README.md
```

---

## 🧪 Linting

Run ESLint to check code quality:

```bash
npm run lint
# or
yarn lint
```

