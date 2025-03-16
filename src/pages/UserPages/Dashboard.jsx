import React, { useState, useEffect, useRef } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSidebar from "./UserSidebar";
import Column from "./Column";
import SortableItem from "./SortableItem";
import notificationSound from "../../assets/notification.mp3";
import UserTaskAnalytics from "../../components/user/UserTaskAnalytics";

const UserDashboard = () => {
  const [tasks, setTasks] = useState({
    "To Do": [
      { id: "1", title: "Design UI", description: "Create a sleek UI for the app", priority: "High", deadline: "2025-03-17" },
      { id: "2", title: "Setup Database", description: "Initialize and structure the DB", priority: "Medium", deadline: "2025-03-16" },
    ],
    "In Progress": [{ id: "3", title: "Develop Auth System", description: "Implement JWT-based auth", priority: "High", deadline: "2025-03-15" }],
    Completed: [{ id: "4", title: "Project Planning", description: "Outline roadmap and milestones", priority: "Low", deadline: "2025-03-05" }],
  });

  const [notifications, setNotifications] = useState([]);
  const audioRef = useRef(new Audio(notificationSound));

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => console.log("User interaction required to play sound."));
    }
  };

  useEffect(() => {
    const today = new Date();
    let shouldPlaySound = false;
    let newNotifications = [];

    Object.keys(tasks).forEach((column) => {
      tasks[column].forEach((task) => {
        const taskDate = new Date(task.deadline);
        const diffDays = Math.ceil((taskDate - today) / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          const message = `Hurry up! Task "${task.title}" is due tomorrow!`;
          toast.warning(message, {
            icon: "⚠️",
            style: { backgroundColor: "#FFCC00", color: "#000" },
          });
          newNotifications.push(message);
          shouldPlaySound = true;
        } else if (diffDays === 0) {
          const message = `URGENT! Task "${task.title}" is due TODAY!`;
          toast.error(message, {
            icon: "🚨",
            style: { backgroundColor: "#FF4136", color: "#FFF" },
          });
          newNotifications.push(message);
          shouldPlaySound = true;
        }
      });
    });

    if (shouldPlaySound) {
      playSound();
    }

    setNotifications(newNotifications);
  }, [tasks]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const sourceColumn = Object.keys(tasks).find((column) =>
      tasks[column].some((task) => task.id === active.id)
    );
    const targetColumn = Object.keys(tasks).find((column) => tasks[column].some((task) => task.id === over.id)) || over.id;

    if (!sourceColumn || !targetColumn) return;

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };

      // Find and remove task from source column
      const movedTask = updatedTasks[sourceColumn].find((task) => task.id === active.id);
      updatedTasks[sourceColumn] = updatedTasks[sourceColumn].filter((task) => task.id !== active.id);

      // Add the task to the target column
      updatedTasks[targetColumn] = [...(updatedTasks[targetColumn] || []), movedTask];

      return updatedTasks;
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar notifications={notifications} />

      <div className="flex-1 p-6 bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">User Dashboard</h2>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar />

        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(tasks).map((columnKey) => (
              <Column key={columnKey} title={columnKey} id={columnKey}>
                <SortableContext items={tasks[columnKey].map((task) => task.id)} strategy={verticalListSortingStrategy}>
                  {tasks[columnKey].map((task) => (
                    <SortableItem key={task.id} id={task.id} task={task} />
                  ))}
                </SortableContext>
              </Column>
            ))}
          </div>
        </DndContext>

        <div className="mt-8">
          <UserTaskAnalytics completedTasks={[5, 10, 7, 12]} pendingTasks={[3, 2, 5, 1]} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
