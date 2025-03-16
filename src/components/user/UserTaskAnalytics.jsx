import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserTaskAnalytics = ({ completedTasks, pendingTasks }) => {
  const data = {
    labels: ["This Week", "Last Week", "2 Weeks Ago", "3 Weeks Ago"],
    datasets: [
      {
        label: "Completed Tasks",
        data: completedTasks,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Pending Tasks",
        data: pendingTasks,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Your Task Analytics</h3>
      <Bar data={data} />
    </div>
  );
};

export default UserTaskAnalytics;
