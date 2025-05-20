![GitHub last commit](https://img.shields.io/github/last-commit/karlthere/project-gcloud)
![GitHub issues](https://img.shields.io/github/issues/karlthere/project-gcloud)
![GitHub license](https://img.shields.io/github/license/karlthere/project-gcloud)



# 🚀 DevPath – Personal IT Project Tracker

DevPath is a web-based application designed to help beginner and intermediate developers **manage personal IT projects** with clear categorization, progress tracking, and educational references.

![DevPath Screenshot](/public/eg.png) 

---

## 🌟 Features

- 🧩 **Project Categorization** by Type and Difficulty  
- 📌 **CRUD Functionality** for Projects (Add, Edit, Delete)  
- 🔒 **User Authentication** with secure password hashing  
- 📁 **Image Upload** to Google Cloud Storage  
- ☁️ **Deployed Backend** using Google Cloud App Engine  
- 🔐 **Protected Routes** via PrivateRoute system

---

## 🛠 Tech Stack

### Frontend
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/) via Google Cloud SQL
- [Google Cloud Storage](https://cloud.google.com/storage) for image upload

---

## 📦 Folder Structure

```
/frontend      → React App (Vite + Tailwind)
/backend       → Express REST API + GCP config
/database      → MySQL schema and setup (Cloud SQL)
```

---

## 🚀 Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/your-username/project-devpath.git
cd project-devpath
```

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env # Create your .env file
node server.js
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Ensure you have the following in your `.env` file (not committed to repo):

```
DB_HOST=...
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
GCS_BUCKET_NAME=...
GCS_KEY_FILE=...
API_KEY=...
```

---

## 📸 Demo

> Add a link to a live deployed site or a Loom video demo if available.

---

## 📚 Future Improvements

- Project filtering by tags
- Markdown support in project notes
- Team collaboration feature

---

## 🧑‍💻 Author

**Karlthere @ DevPath**  
Feel free to connect or give feedback!  
📬 [skarlina180@gmail.com]

---

## 📄 License

karlthere © 2025
