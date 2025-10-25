# MileApp — Frontend

> Vue 3 + Vite frontend for MileApp (task management).  
> Integrated with Tailwind CSS, Axios, and Pinia (state management).

## 🚀 Setup

```bash
cd frontend
npm install
npm run dev
```

Server runs at `http://localhost:5173` by default.

---

## 🧭 Pages Overview

| Page | Path | Description |
|------|------|--------------|
| **LoginPage** | `/login` | User login page |
| **SignupPage** | `/signup` | Register new user |
| **ForgotPasswordPage** | `/forgot-password` | Request reset link |
| **VerifyTokenPage** | `/verify-reset-token` | Verify token before reset |
| **ResetPasswordPage** | `/reset-password` | Create new password |
| **TasksPage** | `/tasks` | Main dashboard — list/add/edit/delete tasks |
| **AddUserPage** | `/add-user` | Admin adds user (with role) |

---

## 🧩 Core Features

- Login + Register + Forgot/Reset password
- JWT stored securely in `localStorage`
- Role-based UI (admin vs user)
- CRUD task management
- Pagination + Sort + Search + Filter on task list
- Logout functionality
- Protected routes using Vue Router guard
- Responsive design with Tailwind CSS

---

## 🔐 Security Highlights

- Axios interceptor adds Authorization header automatically
- Route protection via router guard
- Session persistence using JWT in localStorage
- Input validations before API calls

---

## ⚙️ Stability & UX Enhancements

- Modern Vue 3 Composition API (`<script setup>`)
- Modular component structure (`TaskTable`, `TaskModal`)
- Real-time state updates via Pinia
- Toast and alert feedbacks for user actions
- Fast HMR via Vite for developer productivity
