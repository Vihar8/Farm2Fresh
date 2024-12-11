import Avatar from "@mui/material/Avatar";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function MadeWithLove() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Connect With Us at  "}
      <Link color="inherit" href="https://material-ui.com/">
        Farm2Fresh
      </Link>
      {" and grow your Business."}
    </Typography>
  );
}

export default function SignUp() {
  const [role, setRole] = useState(1); // Default role is 1 (client)
  const [name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // For OTP input

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
      role,
    };

    try {
      const response = await api.post("/auth/signup", userData);
      console.log("Sign-up successful:", response.data);
         } catch (error) {
      console.error("There was an error during the sign-up:", error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await api.post("/auth/verify-email", { code: otp });
      console.log("OTP verified successfully:", response.data);
      alert("Email verified successfully!"); // Show success message
      
      setFirstName("");
      setEmail("");
      setPassword("");
      setOtp("");
      setRole(1); // Reset to default role (Client)
      navigate("/home"); // Redirect after successful signup

    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "80px" }}>
        <Avatar sx={{ margin: 1, backgroundColor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={handleSubmit} noValidate style={{ marginTop: 30 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="First Name"
                autoFocus
                value={name}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            {/* Role Selection */}
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel>Role</InputLabel>
                <Select value={role} onChange={handleRoleChange} label="Role">
                  <MenuItem value={1}>Client</MenuItem>
                  <MenuItem value={2}>Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 3, marginBottom: 3 }}>
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>

        {/* OTP Input and Verify Button */}
        <Typography component="h2" variant="h6" style={{ marginTop: 20 }}>
          Verify Email
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={{ marginTop: 10 }}
        />
        <Button
          onClick={handleVerifyOtp}
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ marginTop: 2 }}
        >
          Get Verified
        </Button>
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
