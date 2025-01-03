import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TotalUserGraph = ({ buyerCount, sellerCount }) => {
  // Data for the chart
  const data = {
    labels: ['Buyers', 'Sellers'],
    datasets: [
      {
        label: 'Total Accounts',
        data: [buyerCount, sellerCount],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Color for Buyers
          'rgba(255, 99, 132, 0.6)'   // Color for Sellers
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Users Overview',
      },
    },
  };

  return (
    <div className="my-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default TotalUserGraph;
