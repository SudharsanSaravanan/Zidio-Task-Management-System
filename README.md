# 🚀 Task Management System (React + Node.js)

This is a **Task Management System** built using **React** for the frontend and **Node.js (MERN stack)** for the backend.  
It supports **user authentication, task creation, admin management, and notifications.**

---

## 📂 Project Structure

```bash
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
# React Project Setup

## Installation

Follow these steps to set up the project and install necessary dependencies.

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies
Run the following command to install required packages:
```sh
npm install
```

### 3. Install Additional Dependencies
Make sure to install the following:

#### React Router DOM
```sh
npm install react-router-dom
```

#### Tailwind CSS
```sh
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### 4. Configure Tailwind CSS
Edit **tailwind.config.js** to include the paths to your files:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};


### 5. Start the Development Server
Run the following command to start the app:
```sh
npm run dev
```

### 6. Drag and Drop (DND)

npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/accessibility

@dnd-kit/core – Core library for drag-and-drop interactions.
@dnd-kit/sortable – Enables sorting of draggable elements.
@dnd-kit/accessibility – Improves accessibility for drag-and-drop interactions

### 7. Data Visualization (Charts & Graphs)

npm install chart.js react-chartjs-2

chart.js – JavaScript charting library for analytics and reports.
react-chartjs-2 – React wrapper for chart.js.

### 8. Icons & Utility Libraries

npm install react-icons

react-icons – Provides icons for buttons, sidebars, etc

### 9. Routing & Navigation

npm install react-router-dom

Navigation between different pages

### 10. Notifications & Alerts

npm install react-toastify

Displaying toast messages for task deadlines, errors, and status updates.

### 11.  Date & Time Handling

npm install date-fns

Formatting and calculating task deadlineS.

### 12. Calendar & Scheduling

npm install react-big-calendar

Displaying tasks in a calendar view.

### for backend 
npm install bcryptjs,cors,dotenv,express,jsonwebtoken,mongodb,mongoose
npm install crypto nodemailer

## to run server just do -
cd server
node src/index.js

## dont modify or delete env file