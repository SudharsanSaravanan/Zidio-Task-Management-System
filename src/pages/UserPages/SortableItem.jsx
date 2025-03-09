import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const priorityColors = {
  High: "bg-red-100 hover:bg-red-300",
  Medium: "bg-yellow-100 hover:bg-yellow-300",
  Low: "bg-green-100 hover:bg-green-300",
};

const SortableItem = ({ id, task }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-4 rounded-lg shadow-md transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-xl ${
        priorityColors[task.priority] || "bg-gray-200"
      }`}
    >
      <p className="font-semibold">{task.title}</p>
      <p className="text-sm text-gray-700">{task.description}</p> {/* Description instead of priority */}
      <p className="text-xs text-gray-600">Deadline: {task.deadline}</p>
    </div>
  );
};

export default SortableItem;
