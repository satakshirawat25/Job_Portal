# CareerChange – Job Portal Web Application

CareerChange is a full‑stack **Job Portal web application** built using the **MERN stack**. The platform connects **job seekers** and **recruiters**, allowing companies to post jobs and candidates to apply easily. It focuses on clean UI, secure authentication, and real‑world hiring workflows.

---

## 🚀 Features

### 👤 User (Job Seeker)

* User registration & login (JWT + cookies)
* Browse and search jobs
* Apply for jobs
* View applied jobs
* Profile management

### 🏢 Recruiter / Admin

* Secure admin authentication
* Create and manage companies
* Post, update, and delete jobs
* View applicants for posted jobs

### 🔐 Authentication & Security

* JWT‑based authentication
* Role‑based access control (Admin / User)
* Protected routes
* Secure cookies with CORS handling

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Redux Toolkit
* Redux Persist
* Axios
* Tailwind CSS
* Shadcn/UI

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## 📂 Project Structure

```
CareerChange/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/careerchange.git
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file in backend:

```env
PORT=8000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

