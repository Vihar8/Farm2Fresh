// import React, { useState, useEffect } from "react";
// import { Trash2 } from "lucide-react";
// import api from "../api/axios"; // Assuming you have axios configured

// const DepartmentListing = () => {
//   const tableHeading = [
//     { id: "email", header: "Email", icon: "🥬" },
//     { id: "message", header: "Requirements", icon: "🥕" },
//     { id: "mobile", header: "Mobile", icon: "🍎" },
//     { id: "date", header: "Date", icon: "🍅" },
//     { id: "action", header: "Action", icon: "🫑" },
//   ];

//   const [tableData, setTableData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchTableData = async () => {
//       try {
//         const response = await api.get("/api/enquiryform");
//         if (Array.isArray(response.data)) {
//           const formattedData = response.data.map((item) => ({
//             email: item.email,
//             mobile: item.mobile,
//             message: item.requirement || "N/A",
//             date: item.createdAt
//               ? new Date(item.createdAt).toLocaleDateString()
//               : "N/A",
//             id: item._id,
//           }));
//           setTableData(formattedData);
//         } else {
//           throw new Error("Invalid data format");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTableData();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       // API call to delete the enquiry
//       await api.delete(`/api/enquiryform/delete/${id}`);
//       // Remove the deleted record from the table data
//       setTableData((prev) => prev.filter((item) => item.id !== id));
//     } catch (error) {
//       alert("Failed to delete the enquiry. Please try again.");
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center h-screen bg-green-50">
//         <div className="animate-bounce text-4xl">🥗</div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className=" bg-red-50 p-4 rounded-lg text-red-600">
//         <span className="mr-2">🍎</span>Error: {error}
//       </div>
//     );

//   return (
//     <div className="bg-green-50 rounded-lg shadow-lg">

//       <div className="p-6 mt-24">
//         <div className="rounded-xl overflow-hidden shadow-lg">
//           {/* Desktop View */}
//           <div className="hidden md:block">
//             <table className="w-full">
//               <thead>
//                 <tr className="bg-gradient-to-r from-green-200 to-yellow-200">
//                   {tableHeading.map((column) => (
//                     <th
//                       key={column.id}
//                       className="py-4 px-6 text-left text-green-800 font-semibold"
//                     >
//                       <div className="flex items-center gap-2">
//                         <span>{column.icon}</span>
//                         {column.header}
//                       </div>
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {tableData.map((row, index) => (
//                   <tr
//                     key={index}
//                     className="bg-white hover:bg-green-50 transition-colors"
//                   >
//                     {tableHeading.map((column) => (
//                       <td
//                         key={column.id}
//                         className="py-4 px-6 border-b border-green-100"
//                       >
//                         {column.id === "action" ? (
//                           <button
//                             onClick={() => handleDelete(row.id)}
//                             className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
//                           >
//                             <Trash2 size={18} />
//                             Resolved
//                           </button>
//                         ) : (
//                           <div className="break-words">{row[column.id]}</div>
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Mobile View */}
//           <div className="md:hidden space-y-4">
//             {tableData.map((row, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 rounded-lg shadow-sm border border-green-100"
//               >
//                 {tableHeading.slice(0, -1).map((column) => (
//                   <div key={column.id} className="mb-2">
//                     <div className="flex items-center gap-2 text-green-700 font-medium">
//                       <span>{column.icon}</span>
//                       {column.header}:
//                     </div>
//                     <div className="ml-7 mt-1 text-gray-800">
//                       {row[column.id]}
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   onClick={() => handleDelete(row.id)}
//                   className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-700"
//                 >
//                   <Trash2 size={18} />
//                   Resolved
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DepartmentListing;


import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../api/axios";

const DepartmentListing = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);

  const tableHeading = [
      { id: "sNo", header: "S.No." },
      { id: "email", header: "Email" },
      { id: "message", header: "Requirements" },
      { id: "mobile", header: "Mobile No" },
      { id: "date", header: "Date" },
      { id: "action", header: "Action" },
  ];

  useEffect(() => {
      const fetchTableData = async () => {
          try {
              const response = await api.get("/api/enquiryform");
              const formattedData = response.data.map((item, index) => ({
                  sNo: index + 1,
                  email: item.email,
                  mobile: item.mobile,
                  message: item.requirement || "N/A",
                  date: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A",
                  id: item._id,
              }));
              setTableData(formattedData);
              setLoading(false);
          } catch (err) {
              setError(err.message);
              setLoading(false);
          }
      };

      fetchTableData();
  }, []);

  const handleDelete = async (id) => {
      try {
          await api.delete(`/api/enquiryform/delete/${id}`);
          setTableData((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
          console.error(error);
      }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <>
       <div className="p-6 mt-24">
          <Grid container spacing={2} className="headingSeparate">
              <Grid item xs={12} sm={12}>
                  <TableContainer component={Paper} className="tableShadow">
                      <Table>
                          <TableHead>
                              <TableRow>
                                  {tableHeading.map((column) => (
                                      <TableCell key={column.id} sortDirection={false}>
                                          <TableSortLabel>{column.header}</TableSortLabel>
                                      </TableCell>
                                  ))}
                              </TableRow>
                          </TableHead>
                          <TableBody>
                              {tableData.map((row) => (
                                  <TableRow key={row.id}>
                                      {tableHeading.map((column) => (
                                          <TableCell key={column.id}>
                                              {column.id === "action" ? (
                                                  <>
                                                      <Tooltip title="Delete">
                                                          <IconButton onClick={() => handleDelete(row.id)}>
                                                              <DeleteOutlined />
                                                          </IconButton>
                                                      </Tooltip>
                                                  </>
                                              ) : (
                                                  row[column.id]
                                              )}
                                          </TableCell>
                                      ))}
                                  </TableRow>
                              ))}
                              {tableData.length === 0 && (
                                  <TableRow>
                                      <TableCell colSpan={tableHeading.length} style={{ textAlign: 'center' }}>
                                          No data available
                                      </TableCell>
                                  </TableRow>
                              )}
                          </TableBody>
                      </Table>
                  </TableContainer>
              </Grid>
          </Grid>
          </div>
      </>
  );
};

export default DepartmentListing;