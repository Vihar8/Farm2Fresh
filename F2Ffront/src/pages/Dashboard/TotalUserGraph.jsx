// import React from "react";
// import ReactApexChart from "react-apexcharts";

// const TotalUserGraph = ({ buyerCount, sellerCount }) => {
//   const chartData = {
//     series: [
//       {
//         name: "Buyers",
//         data: [
//           Math.round(buyerCount),
//           Math.round(buyerCount * 0.9),
//           Math.round(buyerCount * 1.1),
//           Math.round(buyerCount),
//         ],
//       },
//       {
//         name: "Sellers",
//         data: [
//           Math.round(sellerCount),
//           Math.round(sellerCount * 1.2),
//           Math.round(sellerCount * 0.8),
//           Math.round(sellerCount),
//         ],
//       },
//     ],
//     options: {
//       chart: {
//         height: 265,
//         type: "line",
//         zoom: { enabled: false },
//         toolbar: { tools: { download: false } },
//       },
//       dataLabels: { enabled: false },
//       stroke: { curve: "smooth" },
//       xaxis: { categories: ["Q1", "Q2", "Q3", "Q4"] },
//       legend: { show: true },
//       tooltip: { y: { formatter: (val) => `${val}` } },
//       grid: { borderColor: "#f1f1f1" },
//     },
//   };

//   return (
//     <div className="mt-12 ">
//       <h3 className="text-lg font-semibold mb-6">User Growth Over Quarters</h3>
//       <ReactApexChart
//         options={chartData.options}
//         series={chartData.series}
//         type="line"
//         height={265}
//       />
//     </div>
//   );
// };

// export default TotalUserGraph;

import React from "react";
import TotalUserGraph from "./TotalUserGraph";

const App = () => {
  const buyerCount = 1500;  // Example buyer count for the year
  const sellerCount = 800;  // Example seller count for the year

  return (
    <div>
      <TotalUserGraph buyerCount={buyerCount} sellerCount={sellerCount} />
    </div>
  );
};

export default App;
