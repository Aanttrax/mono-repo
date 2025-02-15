# 📌 NestJS Project - Authentication and Task Management

## 📖 Description

This is a backend developed with **NestJS** that provides **authentication and JWT token generation** functionalities, along with a **task management system**. It implements security strategies with `passport-jwt` and user management.
And employs a **CI/CD** pipeline with **GitHub Actions**. The Docker images are published to the **GitHub Container Registry**

## 🚀 Technologies Used

- **NestJS** - Framework for building scalable applications in Node.js
- **MongoDB with Mongoose** - NoSQL database for storing users and tasks
- **Passport.js** - Authentication with JWT strategies
- **Bcrypt** - Password encryption

## 📂 Project Structure

```
mono-repo/
│-- src/
│   ├── auth/                # Authentication module
│   │   ├── dto/             # DTOs for data validation
│   │   ├── schemas/         # User schema for MongoDB
│   │   ├── auth.controller.ts  # Authentication controller
│   │   ├── auth.module.ts   # Authentication module
│   │   ├── auth.service.ts  # Authentication logic
│   │   ├── jwt.strategy.ts  # JWT strategy for authentication
│   ├── shared/              # Shared code
│   │   ├── guards/          # Security guards (JWT)
│   │   ├── interceptors/    # Global interceptors
│   │   ├── services/        # Reusable services
│   ├── tasks/               # Task management module
│   │   ├── dto/             # Task DTOs
│   │   ├── schemas/         # Task schema for MongoDB
│   │   ├── tasks.controller.ts  # Task controller
│   │   ├── tasks.module.ts  # Task module
│   │   ├── tasks.service.ts # Task business logic
│   ├── app.module.ts        # Main module
│   ├── main.ts              # Application entry point
```

## 📌 Installation and Setup

### 1️⃣ Clone the repository

```sh
git clone https://github.com/Aanttrax/mono-repo.git
cd mono-repo
```

### 2️⃣ Install dependencies

```sh
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the project root and add:

```env
APP_NAME=mono-repo
PORT=3200
MONGO_URI=mongodb+srv://cluster-******************
MONGO_USER=Aanttrax
MONGO_PWD=**************
MONGO_DB_NAME=**********
MONGO_OPTIONS=****************
TOKEN_SECRET=****************
```

### 4️⃣ Run the server

```sh
npm run start:dev
```

The server will run on `http://localhost:3200` 🚀

## 🔐 Authentication and Security

- **User registration:** `/signup`
- **Login:** `/signin`
- **JWT Protection:** `JwtGuard` is used to protect private routes.

## ✅ Task API (Tasks)

- **Get all tasks:** `GET /task`
- **Get task by Id:**`GET /task/:taskId`
- **Create a task:** `POST /task`
- **Update a task:** `PUT /task/:taskId`
- **Delete a task:** `DELETE /task/:taskId`

## 🛠️ Development and Maintenance

To maintain code quality and backend stability:

- Use **DTOs** for data validation.
- Apply **middlewares and interceptors** for logging and security.
- Protect sensitive routes with **JWT Guards**.

---

✨ _This backend is designed to be secure, scalable, and easy to extend. Happy coding!_
