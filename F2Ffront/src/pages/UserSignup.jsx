// import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material"; // Use Grid from @mui/material
import Container from "@mui/material/Container";

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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{display:'flex', alignItems:'center', flexDirection:'column', marginTop:"80px" }}>
        <Avatar sx={{ margin: 1, backgroundColor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form noValidate style={{marginTop:30}}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" required fullWidth label="First Name" autoFocus />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" required fullWidth label="Last Name" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth label="Email Address" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" required fullWidth label="Password" type="password" />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" sx={{ marginTop: 3 , marginBottom:3}}>
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
