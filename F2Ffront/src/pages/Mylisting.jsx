import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import FarmingLoaderSun from "../commoncomponents/FarmingLoaderSun";

const UserCommodities = () => {
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false); // Dialog for update confirmation
  const [commodityToDelete, setCommodityToDelete] = useState(null);
  const [commodityToUpdate, setCommodityToUpdate] = useState(null); // Commodity for update dialog
  const navigate = useNavigate();

  // Fetch commodities
  const fetchCommodities = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("serviceToken");
      if (!token) throw new Error("No auth token found. Please login again.");
      const response = await api.get("/api/commodities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommodities(response.data.commodities || []);
    } catch (error) {
      console.error("Error fetching commodities:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete commodity
  const deleteCommodity = async () => {
    try {
      const token = localStorage.getItem("serviceToken");
      if (!token) throw new Error("No auth token found. Please login again.");
      await api.delete(`/api/deleteCommodity/${commodityToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommodities((prev) =>
        prev.filter((commodity) => commodity._id !== commodityToDelete)
      );
    } catch (error) {
      console.error("Error deleting commodity:", error.response?.data || error.message);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  useEffect(() => {
    fetchCommodities();
  }, []);

  // Handle Update Button Click
  const handleUpdate = (commodityId, commodityData) => {
    setCommodityToUpdate(commodityData); // Set the commodity data for confirmation
    setOpenUpdateDialog(true); // Open the update confirmation dialog
  };

  // Handle Update Confirmation
  const confirmUpdate = () => {
    navigate(`/updateCommodity/${commodityToUpdate._id}`, {
      state: { commodity: commodityToUpdate },
    });
    setOpenUpdateDialog(false); // Close the dialog
  };

  if (loading) return <FarmingLoaderSun />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl text-green-600 text-center font-bold mb-6">
        My Commodities
      </h1>
      {commodities.length === 0 ? (
        <p className="text-gray-500 text-center">No commodities found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {commodities.map((commodity) => (
            <div
              key={commodity._id}
              className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden"
            >
              <div className="px-4 py-2 bg-gray-100 text-sm text-gray-600">
                Date: {new Date(commodity.createdAt).toLocaleDateString("en-GB")}
              </div>

              {/* Image Handling */}
              <div
                className={`relative grid ${
                  commodity.images.length === 1
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

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 capitalize mb-1">
                  {commodity.commodity} ({commodity.varietyType})
                </h3>
                <p className="text-sm font-semibold text-green-700 mb-1">
                  Price: <span className="text-black font-bold">₹{commodity.price} / {commodity.totalIn}</span>
                </p>
                 <p className="text-sm font-semibold text-green-700">
                  Quantity: <span className="text-black font-bold">{commodity.quantity} / {commodity.totalIn}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Location: {commodity.district} , {commodity.state}
                </p>
              </div>
              <div className="p-4 bg-gray-50 flex justify-between">
                {/* Update Button */}
                <button
                  className="w-1/2 bg-blue-600 text-white py-2 mr-2 rounded shadow hover:bg-blue-700"
                  onClick={() => handleUpdate(commodity._id, commodity)} // Trigger update confirmation dialog
                >
                  Update
                </button>
                {/* Delete Button */}
                <button
                  className="w-1/2 bg-red-600 text-white py-2 rounded shadow hover:bg-red-700"
                  onClick={() => {
                    setCommodityToDelete(commodity._id);
                    setOpenDeleteDialog(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog for Delete Confirmation */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this commodity?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteCommodity} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Update Confirmation */}
      <Dialog open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to update this commodity?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUpdateDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmUpdate} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserCommodities;
