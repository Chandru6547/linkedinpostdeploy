import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// import { Data1, Data2 } from "../Data";
import "./Graph.scss";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = (props) => {
  // Common options for the graphs


  let Data1 = [];
  let Data2 = [];
  
  Data1 = props?.data?.Data1;
  Data2 = props?.data?.Data2;
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false, // Hide the grid lines for the x-axis
        },
      },
      y: {
        grid: {
          color: "rgba(217,143,7,0.1)", // Light grid lines for the y-axis
        },
      },
    },
    plugins: {
      legend: {
        position: "top", // Position the legend above the chart
        labels: {
          font: {
            size: 14, // Customize legend font size
          },
        },
      },
    },
  };

  // Common function to generate chart data
  const generateChartData = (data) => ({
    labels: data?.map((item) => item.skill),
    datasets: [
      {
        label: "Yet to Learn",
        data: data?.map((item) => item.yet),
        backgroundColor: "rgb(61, 61, 192)",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Basics",
        data: data?.map((item) => item.basics),
        backgroundColor: "rgb(221, 102, 59)",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Intermediate",
        data: data?.map((item) => item.Intermediate),
        backgroundColor: "rgb(255, 176, 72)",
        borderColor: "black",
        borderWidth: 2,
      },
      {
        label: "Good",
        data: data?.map((item) => item.Good),
        backgroundColor: "rgb(80, 211, 80)",
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  // Data for the "Before Session" and "After Session" graphs
  const firstData = generateChartData(Data1);
  const secondData = generateChartData(Data2);

  return (
    <div className="Graph">
      <div className="GraphPortion">
        <h1>Before Session</h1>
        <div className="ChartContainer">
          <Bar data={firstData} options={options} />
        </div>
      </div>
      <div className="GraphPortion">
        <h1>After Session</h1>
        <div className="ChartContainer">
          <Bar data={secondData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Graph;
