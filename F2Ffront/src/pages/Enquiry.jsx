import React, { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import api from "../api/axios"; // Assuming you have axios configured

const DepartmentListing = () => {
  const tableHeading = [
    { id: "email", header: "Email", icon: "🥬" },
    { id: "message", header: "Requirements", icon: "🥕" },
    { id: "mobile", header: "Mobile", icon: "🍎" },
    { id: "date", header: "Date", icon: "🍅" },
    { id: "action", header: "Action", icon: "🫑" },
  ];

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await api.get("/api/enquiryform");
        if (Array.isArray(response.data)) {
          const formattedData = response.data.map((item) => ({
            email: item.email,
            mobile: item.mobile,
            message: item.requirement || "N/A",
            date: item.createdAt
              ? new Date(item.createdAt).toLocaleDateString()
              : "N/A",
            id: item._id,
          }));
          setTableData(formattedData);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTableData();
  }, []);

  const handleDelete = async (id) => {
    try {
      // API call to delete the enquiry
      await api.delete(`/api/enquiryform/delete/${id}`);
      // Remove the deleted record from the table data
      setTableData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Failed to delete the enquiry. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="animate-bounce text-4xl">🥗</div>
      </div>
    );

  if (error)
    return (
      <div className=" bg-red-50 p-4 rounded-lg text-red-600">
        <span className="mr-2">🍎</span>Error: {error}
      </div>
    );

  return (
    <div className="bg-green-50 rounded-lg shadow-lg">

      <div className="p-6 mt-24">
        <div className="rounded-xl overflow-hidden shadow-lg">
          {/* Desktop View */}
          <div className="hidden md:block">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-green-200 to-yellow-200">
                  {tableHeading.map((column) => (
                    <th
                      key={column.id}
                      className="py-4 px-6 text-left text-green-800 font-semibold"
                    >
                      <div className="flex items-center gap-2">
                        <span>{column.icon}</span>
                        {column.header}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:bg-green-50 transition-colors"
                  >
                    {tableHeading.map((column) => (
                      <td
                        key={column.id}
                        className="py-4 px-6 border-b border-green-100"
                      >
                        {column.id === "action" ? (
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 size={18} />
                            Resolved
                          </button>
                        ) : (
                          <div className="break-words">{row[column.id]}</div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {tableData.map((row, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm border border-green-100"
              >
                {tableHeading.slice(0, -1).map((column) => (
                  <div key={column.id} className="mb-2">
                    <div className="flex items-center gap-2 text-green-700 font-medium">
                      <span>{column.icon}</span>
                      {column.header}:
                    </div>
                    <div className="ml-7 mt-1 text-gray-800">
                      {row[column.id]}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleDelete(row.id)}
                  className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                  Resolved
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentListing;
