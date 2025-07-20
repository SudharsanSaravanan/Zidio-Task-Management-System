
# 🚀 TaskFlow - Task Management System (MERN Stack)  

**TaskFlow** is an advanced **Task Management System** built using the **MERN stack (MongoDB, Express.js, React, Node.js)** to help individuals and teams efficiently manage their tasks, track progress, and collaborate in real time.  

This system provides **seamless task organization**, **deadline tracking**, **role-based user access**, and **interactive dashboards** to boost productivity. With a **Kanban board**, **task analytics**, and **calendar scheduling**, TaskFlow ensures smooth workflow management for both users and administrators.  

Admins can manage users, approve tasks, and monitor team performance, while users can create, prioritize, and complete tasks effortlessly. **Real-time notifications, drag-and-drop functionality, and a responsive UI** enhance the user experience.  

Whether you're managing personal tasks or collaborating with a team, **TaskFlow** streamlines your workflow and keeps you ahead of deadlines. 🚀✅


---

## ✨ Features  
✔ **User Authentication** (Sign Up, Login)  
✔ **Task Management** (Create, Update, Delete, Assign, Prioritize Tasks)  
✔ **Kanban Board** for visual task tracking  
✔ **Real-Time Notifications** for task deadlines 🚀  
✔ **Admin Panel** to manage users & tasks 🔐  
✔ **Calendar View** for scheduling and tracking  
✔ **Charts & Analytics** to monitor progress 📊  
✔ **Responsive UI** with **Tailwind CSS** & **Framer Motion**  
✔ **Drag and Drop (DND)** support for easy task organization  

---

## 📂Frontend Project Structure  

```
/task-management-app/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ForgotPassword.jsx
│   │   ├── common/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   └── Notification.jsx
│   │   ├── user/
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── CreateTaskModal.jsx
│   │   └── admin/
│   │       ├── AdminDashboard.jsx
│   │       ├── UserManagement.jsx
│   │       └── TaskVerification.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── NotificationContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useTasks.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── dateFormatter.js
│   │   └── validators.js
│   ├── pages/
│   │   ├── Landing.jsx
│   │   ├── UserPages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── ProfilePage.jsx
│   │   └── AdminPages/
│   │       ├── Dashboard.jsx
│   │       └── Users.jsx
│   ├── App.jsx
│   ├── index.jsx
│   └── index.css
├── tailwind.config.js
└── package.json

```

---

## 🛠 Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/taskflow.git  
cd taskflow
```

### 2️⃣ Install Dependencies  

#### 📌 Frontend  
```sh
cd client
npm install
```

#### 📌 Backend  
```sh
cd server
npm install
```

### 3️⃣ Setup Environment Variables  
Create a **.env** file inside the `/server` folder and add:  
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 4️⃣ Start the Application  

#### 🚀 Start Backend Server  
```sh
for local environment
cd server
node src/index.js
backend deployed on render
```

#### 🚀 Start Frontend Development Server  
```sh
cd client
npm run dev
```

---

## ⚡ Essential Dependencies  

### 🎨 UI & Animations  
```sh
npm install tailwindcss@3 postcss autoprefixer
npm install framer-motion
npm install animate.css --save
```

### 🛠 State Management & Utilities  
```sh
npm install react-router-dom react-toastify react-icons
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/accessibility
npm install date-fns
```

### 📊 Charts & Data Visualization  
```sh
npm install chart.js react-chartjs-2
npm install react-big-calendar
```

### 🔒 Backend & Security  
```sh
npm install bcryptjs cors dotenv express
npm i jsonwebtoken mongoose
npm install crypto nodemailer
```

## 🚀 Features Breakdown  

### 🎯 **Task Management**
- 📝 Create, edit, delete, and assign tasks  
- 📌 Prioritize tasks with labels  
- 📆 Set **due dates** and **track deadlines**  

### 📊 **Task Analytics & Insights**
- 📈 **Progress Tracking** with visual charts  
- 🔥 **Kanban Board** for workflow organization  
- 📅 **Calendar View** for scheduling  

### 🛡 **Admin Controls**
- 🚀 Manage users and their tasks  
- ✅ **Verify & Approve Tasks**  
- 📢 **Send Notifications**  

### 🔔 **Notifications & Alerts**
- ⏳ Deadline reminders with **toast alerts**  
- 🚨 Real-time updates on task status  
- 📬 Email notifications for important events  

---

**🚀 TaskFlow - Your Productivity, Simplified!** 💡✨  
