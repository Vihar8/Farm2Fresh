import { useState, useEffect } from "react";
import api from "../api/axios";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const UserCommodities = () => {
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [commodityToDelete, setCommodityToDelete] = useState(null); // Track commodity to delete

  // Function to fetch logged-in user's commodities
  const fetchCommodities = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("serviceToken");
      if (!token) {
        console.error("No auth token found. Please login again.");
        return;
      }

      const response = await api.get("/api/commodities", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.commodities)) {
        setCommodities(response.data.commodities);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching commodities:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a commodity
  const deleteCommodity = async () => {
    if (!commodityToDelete) return;

    try {
      const token = localStorage.getItem("serviceToken");
      if (!token) {
        console.error("No auth token found. Please login again.");
        return;
      }

      await api.delete(`/api/deleteCommodity/${commodityToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCommodities((prev) => prev.filter((commodity) => commodity._id !== commodityToDelete));
      
    } catch (error) {
      console.error("Error deleting commodity:", error.response?.data || error.message);
    } finally {
      setOpenDialog(false); // Close the dialog after the operation
    }
  };

  // Function to handle update (placeholder function)
  const updateCommodity = (commodityId) => {
    alert(`Update functionality for commodity ID: ${commodityId} is not yet implemented.`);
    // Implement your update logic here, e.g., open a form to edit details.
  };

  // Fetch commodities on component mount
  useEffect(() => {
    fetchCommodities();
  }, []);

  
  if (loading) return <CircularProgress style={{ color: "lawngreen" }}/> ;



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-green-600 text-center font-bold mb-6">My Commodities</h1>
      {commodities.length === 0 ? (
        <p className="text-gray-500 text-center">No commodities found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {commodities.map((commodity) => (
            <div
              key={commodity._id}
              className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Date */}
              <div className="px-4 py-2 bg-gray-100 text-sm text-gray-600">
                Date: {new Date(commodity.createdAt).toLocaleDateString("en-GB")}
              </div>

              {/* Images */}
              <div
                className={`relative grid ${commodity.images.length === 1
                    ? "grid-cols-1"
                    : commodity.images.length === 2
                      ? "grid-cols-2"
                      : "grid-cols-2 sm:grid-cols-3"
                  } gap-2 p-2 bg-gray-50`}
              >
                {commodity.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-lg shadow-md"
                  >
                    <img
                      src={image}
                      alt={`${commodity.commodity} image ${index + 1}`}
                      className="w-full h-32 object-cover"
                      onError={(e) => (e.target.src = "/fallback-image.jpg")}
                    />
                  </div>
                ))}
              </div>

              {/* Commodity Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 capitalize mb-1">
                  {commodity.commodity} ({commodity.varietyType})
                </h3>
                <p className="text-sm font-semibold text-green-700 mb-1">
                  Price: <span className="text-black font-bold">₹{commodity.price}</span>
                </p>
                <p className="text-sm font-semibold text-green-700">
                  Quantity: <span className="text-black font-bold">{commodity.quantity} {commodity.totalIn}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Location: {commodity.state}, {commodity.district}
                </p>
              </div>

              {/* Buttons */}
              <div className="p-4 bg-gray-50 flex justify-between">
                <button
                  className="w-1/2 bg-blue-600 text-white py-2 mr-2 rounded shadow hover:bg-blue-700"
                  onClick={() => updateCommodity(commodity._id)}
                >
                  Update
                </button>
                <button
                  className="w-1/2 bg-red-600 text-white py-2 rounded shadow hover:bg-red-700"
                  onClick={() => {
                    setCommodityToDelete(commodity._id); // Set the commodity to delete
                    setOpenDialog(true); // Open the dialog
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog for confirmation */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this commodity?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteCommodity} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserCommodities;
