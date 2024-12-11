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
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axios from "axios"; // Import Axios
import api from '../api/axios'

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
  const [role, setRole] = React.useState(1); // Default role is 1 (client)
  const [name, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Handle form submission and API call
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
      role,
    };

    try {
      // Replace the URL with your backend API endpoint
      const response = await api.post("/auth/signup", userData);

      // Handle the response, e.g., show a success message or redirect
      console.log("Sign-up successful:", response.data);

      // Redirect to the 'opt' page after successful signup
      navigate("/otp");
    } catch (error) {
      // Handle error
      console.error("There was an error during the sign-up:", error);
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

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
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
      </div>
      <Box mt={5}>
        <MadeWithLove />
      </Box>
    </Container>
  );
}
