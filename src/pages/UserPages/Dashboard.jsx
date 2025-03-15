import React, { useState, useEffect, useRef } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSidebar from "./UserSidebar";
import ProfilePage from "../../pages/UserPages/ProfilePage";
import Column from "./Column";
import SortableItem from "./SortableItem";
import notificationSound from "../../assets/notification.mp3";
import UserTaskAnalytics from "../../components/user/UserTaskAnalytics";


const UserDashboard = () => {
  const [tasks, setTasks] = useState({
    "To Do": [
      { id: "1", title: "Design UI", description: "Create a sleek UI for the app", priority: "High", deadline: "2025-03-10" },
      { id: "2", title: "Setup Database", description: "Initialize and structure the DB", priority: "Medium", deadline: "2025-03-12" },
    ],
    "In Progress": [{ id: "3", title: "Develop Auth System", description: "Implement JWT-based auth", priority: "High", deadline: "2025-03-15" }],
    Completed: [{ id: "4", title: "Project Planning", description: "Outline roadmap and milestones", priority: "Low", deadline: "2025-03-05" }],
  });

  const audioRef = useRef(new Audio(notificationSound)); // Create audio reference

  useEffect(() => {
    const today = new Date();
    let newNotifications = [];

    Object.keys(tasks).forEach((column) => {
      tasks[column].forEach((task) => {
        const taskDate = new Date(task.deadline);
        const diffDays = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24)); // Difference in days

        if (diffDays === 1) {
          const message = `⚠️ Task "${task.title}" is due tomorrow!`;
          toast.warning(message);
          audioRef.current.play(); // Play notification sound
          newNotifications.push(message);
        } else if (diffDays === 0) {
          const message = `⏳ Task "${task.title}" is due today!`;
          toast.error(message);
          audioRef.current.play(); // Play notification sound
          newNotifications.push(message);
        }
      });
    });
  }, [tasks]); // Runs whenever tasks change

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar />

      {/* Main Dashboard Content */}
      <div className="flex-1 p-6 bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">User Dashboard</h2>

        {/* Toast Notification Container */}
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />

        {/* Drag-and-Drop Context */}
        <DndContext collisionDetection={closestCorners}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(tasks).map((columnKey) => (
              <Column key={columnKey} title={columnKey} id={columnKey}>
                <SortableContext items={tasks[columnKey]} strategy={verticalListSortingStrategy}>
                  {tasks[columnKey].map((task) => (
                    <SortableItem key={task.id} id={task.id} task={task} />
                  ))}
                </SortableContext>
              </Column>
            ))}
          </div>
        </DndContext>

        <UserTaskAnalytics completedTasks={[5, 10, 7, 12]} pendingTasks={[3, 2, 5, 1]} />
      </div>
    </div>


  );
};

export default UserDashboard;
