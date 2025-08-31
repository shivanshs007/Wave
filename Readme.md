# 🚀 TaskVault Backend

TaskVault is a secure backend API for managing tasks, built with **Node.js, Express, MongoDB, and JWT authentication**.  
It supports user authentication (login, register, refresh tokens) and full CRUD operations for tasks.

---

## ✨ Features
- 🔐 **JWT-based authentication** with access + refresh tokens
- 📝 **CRUD for tasks** (create, read, update, delete)
- 📑 **Pagination & filtering** for tasks (by status, limit, page)
- 👤 **User account management** (update details, change password, logout)
- ⚡ **Secure & optimized** MongoDB queries
- 🐳 Ready for **Docker** and **CI/CD integration**

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas or local)
- **Auth:** JWT (Access + Refresh tokens)
- **Other:** bcrypt, dotenv, cookie-parser, cors

---

## 📂 Project Structure
src/
 ├── controllers/      # Route handlers (user, task)
 ├── models/           # Mongoose schemas (User, Task)
 ├── routes/           # Express routes
 ├── middlewares/      # JWT auth middleware
 ├── utils/            # Helpers (ApiError, ApiResponse, asyncHandler)
 ├── app.js            # Express app config
 └── index.js          # Entry point (DB + server start)

---

## ⚙️ Setup & Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/taskvault-backend.git
   cd taskvault-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file:
   ```env
   PORT=8000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   DB_NAME=taskvault

   ACCESS_TOKEN_SECRET=supersecretaccesstoken
   REFRESH_TOKEN_SECRET=supersecretrefreshtoken
   ACCESS_TOKEN_EXPIRY=15m
   REFRESH_TOKEN_EXPIRY=7d
   ```

4. **Run the server (dev mode)**
   ```bash
   npm run dev
   ```

---

## 🔑 API Endpoints

### 👤 User Routes
| Method | Endpoint              | Description |
|--------|-----------------------|-------------|
| POST   | `/api/v1/users/register` | Register a new user |
| POST   | `/api/v1/users/login`    | Login and get tokens |
| POST   | `/api/v1/users/refresh-token` | Refresh access token |
| POST   | `/api/v1/users/logout`   | Logout user |
| POST   | `/api/v1/users/change-password` | Change password |
| GET    | `/api/v1/users/current-user` | Get logged-in user |
| PUT    | `/api/v1/users/update-account` | Update email |

---

### 📝 Task Routes (JWT Protected)
| Method | Endpoint          | Description |
|--------|------------------|-------------|
| POST   | `/api/v1/tasks`  | Create a new task |
| GET    | `/api/v1/tasks`  | Get all tasks (with pagination & filters) |
| GET    | `/api/v1/tasks/:id` | Get task by ID |
| PUT    | `/api/v1/tasks/:id` | Update a task |
| DELETE | `/api/v1/tasks/:id` | Delete a task |

---

## 📑 API Documentation
You can test APIs using Postman / Thunder Client.  
👉 [Download Postman Collection](./TaskVault.postman_collection.json) (export this file after testing).  

---

## 🐳 Docker Support
Build and run with Docker:
```bash
docker build -t taskvault-backend .
docker run -p 8000:8000 taskvault-backend
```

Or with `docker-compose.yml` (includes MongoDB):
```bash
docker-compose up
```

---

## 🚀 Deployment
- Deploy easily on **Render / Railway / Heroku**
- Or push Docker image to **DockerHub**

---

## 📌 Future Improvements
- ✅ Role-based access (Admin vs User)
- ✅ Task priority + due dates
- ✅ Swagger API Docs
- ✅ Unit & integration tests with Jest

---

## 👨‍💻 Author
**Shivansh Srivastava**  
Built with ❤️ for learning & portfolio.
