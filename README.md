# 🍬 Incubyte Sweet Shop Management System 

## 📌 Project Overview
The **Incubyte Sweet Shop Management System** is a **MERN stack application** designed to manage sweet shop operations.  
It includes **user authentication, role-based access (admin & customer), order management, and inventory tracking**.  

This project demonstrates:
- Secure authentication with JWT.
- RESTful API design.
- Separation of concerns (backend & frontend).
- Full-stack MERN development.

---

## 🚀 Tech Stack
- **Frontend:** React (Vite), Axios, React Router  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Auth:** JWT, bcryptjs  
- **Testing:** Jest, Supertest  

---

## ⚙️ Project Setup
```bash
1️⃣ Clone Repository

git clone https://github.com/mohanrajloganathan05/Sweet-Shop-Management-System.git
cd Sweet-Shop-Management-System

2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend/ with the following content:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sweetshop
JWT_SECRET=your_jwt_secret


Run backend:

npm start


Backend runs at: http://localhost:5000

3️⃣ Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend runs at: http://localhost:5173
```

## 📌 Notes
- Make sure **MongoDB** is running locally before starting the backend. You can manage your local database easily using **MongoDB Compass**.
- Update the `.env` file with your own JWT secret for security.
- Frontend and backend run on separate ports (`5173` and `5000`) during development.

```
📂 Folder Structure
Sweet-Shop-Management-System/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```
## 📝 Features

User Authentication: Register/Login with JWT security.

Role-based Access: Admin and customer dashboards.

Order Management: Place, track, and manage orders.

Inventory Tracking: Add, update, and remove sweets.

RESTful APIs: Backend endpoints for all operations.

## Role-Based Access Control

Only users with the role of Admin can access the Admin Panel.

Normal users will not see the Admin Panel link in the navigation and cannot access the admin routes directly.

Admin features include adding, updating, deleting, and restocking sweets.

This ensures that sensitive actions are restricted to authorized users only, enhancing security and proper workflow.

## 🤖 My AI Usage

During the development of the Incubyte Sweet Shop Management System, I leveraged **AI tools** to enhance my workflow and speed up development:

- **AI Tools Used:**
  - **ChatGPT**

- **How I Used AI:**
  - I used ChatGPT to **brainstorm the overall project structure** including backend routes, frontend pages, and context setup.
  - I asked ChatGPT to **generate authentication logic** with JWT, password hashing, and role-based access control.
  - ChatGPT helped me **debug frontend issues**, like missing Admin Panel links, incorrect context usage, and login/logout errors.
  - I requested **React and CSS components** for modern, responsive designs, including login/register pages and sweet shop layouts.


- **Reflection on AI Impact:**
  - ChatGPT significantly **sped up my development** by providing ready-to-use code snippets and guiding me through debugging complex issues.
  - It helped me **maintain clean and organized code** by suggesting proper separation of concerns and best practices.
  - While AI provided solutions, I carefully **reviewed, tested, and customized** the generated code to fit my project requirements.
  - Overall, AI acted as a **smart assistant**, reducing repetitive tasks and allowing me to focus more on problem-solving and project design.


