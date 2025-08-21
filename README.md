# 📂 File Management System (Frontend)

This is the **React frontend** for the File Management System.  
It provides authentication (Register, Login, Logout), file browsing, role-based permissions (Owner, Editor, Viewer), and dark mode support.  

---

## 🚀 Features
- 🔐 **Authentication** (Register, Login, Logout)  
- 📁 **File Management** (List, View, Edit, Delete files)  
- 👥 **Role-based Access** (Owner / Editor / Viewer)  
- 🌙 **Dark Mode** UI with TailwindCSS  
- ⚡ Built with **React + Vite + TailwindCSS**  

---

## 📦 Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)  
- npm (comes with Node.js) or yarn  

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-frontend-repo-url>
cd <repo-folder>
````

### 2. Install Dependencies

```bash
npm install
```

or (if using yarn):

```bash
yarn install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will start on:

```
http://localhost:5173/
```

---

## 🔧 Configuration

Currently, the app is configured to work with a backend running at:

```
http://127.0.0.1:8000/
```

If you don’t want to run the backend, you can switch to **dummy local storage mode** (all files & users are saved in your browser’s storage).
👉 To do this, open `src/api/axios.js` and comment out the backend API code (use local storage simulation).

---

## 🖥️ Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## ✨ Tech Stack

* **React 18**
* **Vite** (bundler)
* **TailwindCSS** (styling)
* **React Router v6** (routing)
* **Axios** (API calls)

---

## 📜 License

This project is for **assignment/demo purposes** only.

