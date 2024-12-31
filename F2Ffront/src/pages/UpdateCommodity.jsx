import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";

const UpdateCommodity = () => {
    const location = useLocation();
    const { commodityId } = useParams();
    const navigate = useNavigate();
    const [commodity, setCommodity] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility

    useEffect(() => {
        if (!location.state?.commodity) {
            fetchCommodityData();
        } else {
            setCommodity(location.state.commodity);
        }
    }, [location.state]);

    const fetchCommodityData = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem("serviceToken");
            if (!token) throw new Error("No auth token found. Please login again.");
            const response = await api.get(`/api/commodities/${commodityId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCommodity(response.data);
        } catch (error) {
            setError("Error fetching commodity data. Please try again later.",error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommodity((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem("serviceToken");
            if (!token) throw new Error("No auth token found. Please login again.");
            const response = await api.put(
                `/api/updateCommodity/${commodityId}`,
                commodity,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (response.status === 200) {
                setOpenDialog(true); // Show dialog on success
            } else {
                throw new Error("Failed to update commodity");
            }
        } catch (error) {
            setError("Error updating commodity. Please try again later.",error);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        navigate("/my-listing"); // Navigate to MyListing after closing the dialog
    };

    if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;

    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
                <h1 className="text-3xl font-semibold text-center text-green-600 mb-8">Update Commodity</h1>

                {commodity && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="commodity" className="block text-sm font-medium text-gray-700">Commodity</label>
                            <input
                                id="commodity"
                                name="commodity"
                                type="text"
                                value={commodity.commodity || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                value={commodity.price || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={commodity.quantity || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="totalIn" className="block text-sm font-medium text-gray-700">Unit (Kg/Liters etc.)</label>
                            <input
                                id="totalIn"
                                name="totalIn"
                                type="text"
                                value={commodity.totalIn || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                id="state"
                                name="state"
                                type="text"
                                value={commodity.state || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District</label>
                            <input
                                id="district"
                                name="district"
                                type="text"
                                value={commodity.district || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="w-1/4 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                            >
                                Update Commodity
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Success Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Commodity Updated</DialogTitle>
                <DialogContent>
                    <p>Your commodity has been updated successfully.</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UpdateCommodity;
