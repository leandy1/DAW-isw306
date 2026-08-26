# 🔧 Mechanical Workshop Appointment Management System

A full-stack web application developed for managing appointments in a mechanical workshop.

This project was developed as part of an academic group assignment. Although it was assigned as a group project, I independently handled the complete development of the application, including the frontend, backend, database integration, and deployment.

## 🚀 Live Demo

**[Try the application](http://tallermecanicotest.netlify.app/)**

## 🛠️ Technologies

### Backend

* JavaScript
* Node.js
* Express.js
* MySQL
* mysql2
* express-session
* dotenv
* CORS

### Frontend

* HTML
* CSS
* JavaScript

### Database

* MySQL
* XAMPP / phpMyAdmin

### Development Tools

* Git
* GitHub
* Visual Studio Code

## ✨ Features

* User registration and login
* Appointment creation and management
* Appointment status management
* Dashboard
* Workshop configuration
* Service management
* Database integration
* Session management
* Frontend and backend integration
* Persistent data storage with MySQL

## 🔌 Backend

The application includes a Node.js and Express.js backend with HTTP endpoints for managing the application's data.

The backend implements operations such as:

* **GET** — Retrieve application data
* **POST** — Create new records
* **PATCH** — Update existing records
* **DELETE** — Remove records

The backend is organized into separate route files to keep the application logic structured and maintainable.

## 📁 Project Structure

```text
DAW-isw306/
│
├── backend/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── database/
│   └── taller.sql
│
├── frontend/
│   ├── pages/
│   ├── scripts/
│   └── ...
│
├── img/
├── .gitignore
└── README.md
```

## ⚙️ Local Setup

### Requirements

* Node.js
* MySQL
* XAMPP or another MySQL environment
* Git

### 1. Clone the repository

```bash
git clone https://github.com/leandy1/DAW-isw306.git
cd DAW-isw306
```

### 2. Configure the database

Start MySQL using XAMPP and open phpMyAdmin.

Import the SQL file:

```text
database/taller.sql
```

### 3. Configure environment variables

Inside the `backend` directory, create a `.env` file using `.env.example` as a reference.

Configure the required database and application settings.

### 4. Install dependencies

```bash
cd backend
npm install
```

### 5. Start the backend server

```bash
npm start
```

## 🎯 Project Highlights

This project gave me practical experience developing a complete web application from the ground up.

I worked on:

* Backend development with Node.js and Express.js
* JavaScript application logic
* MySQL database integration
* HTTP endpoints and CRUD operations
* Session management
* Frontend/backend integration
* Database design and queries
* Git and GitHub version control
* Debugging and problem solving
* Organizing a complete web application into separate frontend, backend, and database components

## 👨‍💻 Author

**Leandy Gabin Fermin**

Software Engineering Student focused on Backend and Web Development.

* GitHub: https://github.com/leandy1
* Live Demo: http://tallermecanicotest.netlify.app/
