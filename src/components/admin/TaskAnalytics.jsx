import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskAnalytics = () => {
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [40, 55, 70, 85],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Pending Tasks",
        data: [20, 15, 10, 5],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Task Analytics</h3>
      <Bar data={data} />
    </div>
  );
};

export default TaskAnalytics;
