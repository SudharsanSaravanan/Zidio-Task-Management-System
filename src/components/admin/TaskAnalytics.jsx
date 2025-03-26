import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const TaskAnalytics = () => {
  const [taskStats, setTaskStats] = useState({
    todo: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedStats = {
      todo: storedTasks.filter((task) => task.progress <= 40).length,
      inProgress: storedTasks.filter((task) => task.progress > 40 && task.progress <= 80).length,
      completed: storedTasks.filter((task) => task.progress > 80).length,
    };
    setTaskStats(updatedStats);
  }, []);

  const chartData = {
    labels: ["To Do", "In Progress", "Completed"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [taskStats.todo, taskStats.inProgress, taskStats.completed],
        backgroundColor: ["#FF6384", "#FFCE56", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-4">📊 Task Analytics</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default TaskAnalytics;
