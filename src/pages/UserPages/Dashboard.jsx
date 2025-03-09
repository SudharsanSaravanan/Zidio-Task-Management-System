import React, { useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Column from "./Column";
import SortableItem from "./SortableItem";

const formatTitle = (key) => {
  return key
    .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

const UserDashboard = () => {
  const [tasks, setTasks] = useState({
    "To Do": [
        { id: "1", title: "Design UI", description: "Create a sleek UI for the app", priority: "High", deadline: "Mar 10" },
        { id: "2", title: "Setup Database", description: "Initialize and structure the DB", priority: "Medium", deadline: "Mar 12" },
      ],
      "In Progress": [{ id: "3", title: "Develop Auth System", description: "Implement JWT-based auth", priority: "High", deadline: "Mar 15" }],
      Completed: [{ id: "4", title: "Project Planning", description: "Outline roadmap and milestones", priority: "Low", deadline: "Mar 5" }],
    });

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Identify the source column
    const sourceColumnKey = Object.keys(tasks).find((key) =>
      tasks[key].some((task) => task.id === activeId)
    );
    if (!sourceColumnKey) return;

    // Identify the destination column (even when hovering)
    const destinationColumnKey = Object.keys(tasks).includes(overId)
      ? overId
      : Object.keys(tasks).find((key) => key === overId || tasks[key].some((task) => task.id === overId));

    if (!destinationColumnKey || sourceColumnKey === destinationColumnKey) return;

    const task = tasks[sourceColumnKey].find((task) => task.id === activeId);

    setTasks((prev) => {
      return {
        ...prev,
        [sourceColumnKey]: prev[sourceColumnKey].filter((task) => task.id !== activeId),
        [destinationColumnKey]: [...prev[destinationColumnKey], task],
      };
    });
  };

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">User Dashboard</h2>
      <DndContext collisionDetection={closestCorners} onDragEnd={onDragEnd}>
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
    </div>
  );
};

export default UserDashboard;
