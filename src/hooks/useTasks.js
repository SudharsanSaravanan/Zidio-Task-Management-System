import { useState } from "react";
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const addTask = (task) => setTasks([...tasks, task]);
  return { tasks, addTask };
};