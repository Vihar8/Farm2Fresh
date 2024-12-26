import React, { useState, useEffect } from "react";
import api from '../api/axios';
import { Button, Card, CardContent, CardMedia, Typography, CircularProgress, Grid } from "@mui/material";

const UserCommodities = () => {
  const [commodities, setCommodities] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(false);

  // Function to fetch logged-in user's commodities
  const fetchCommodities = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("serviceToken"); // Retrieve token from localStorage
      if (!token) {
        console.error("No auth token found. Please login again.");
        // Optionally, redirect the user to the login page
        // window.location.href = "/login"; // Uncomment if you want to redirect
        return;
      }

      const response = await api.get('/api/commodities', {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Attach the token to the request header
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
  const deleteCommodity = async (commodityId) => {
    if (!window.confirm("Are you sure you want to delete this commodity?")) return;

    try {
      const token = localStorage.getItem("serviceToken");
      if (!token) {
        console.error("No auth token found. Please login again.");
        return;
      }

      await api.delete(`/api/deleteCommodity/${commodityId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCommodities((prev) => prev.filter((commodity) => commodity._id !== commodityId));
      alert("Commodity deleted successfully!");
    } catch (error) {
      console.error("Error deleting commodity:", error.response?.data || error.message);
    }
  };

  // Fetch commodities on component mount
  useEffect(() => {
    fetchCommodities();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h1 className="text-3xl text-green-600 text-center font-bold mb-6">
        My Commodities
      </h1>
      {commodities.length === 0 ? (
        <Typography>No commodities found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {commodities.map((commodity) => (
            <Grid item xs={12} sm={6} md={4} key={commodity._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={commodity.images?.[0] || "placeholder.jpg"} // Show first image or a placeholder
                  alt={commodity.commodity}
                />
                <CardContent>
                  <Typography variant="h6">{commodity.commodity}</Typography>
                  <Typography>Variety: {commodity.varietyType}</Typography>
                  <Typography>
                    Quantity: {commodity.quantity} {commodity.totalIn}
                  </Typography>
                  <Typography>Price: ₹{commodity.price}</Typography>
                  <Typography>Location: {commodity.state}, {commodity.district}</Typography>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteCommodity(commodity._id)}
                    style={{ marginTop: "10px" }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default UserCommodities;
