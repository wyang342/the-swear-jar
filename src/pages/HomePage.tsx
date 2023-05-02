import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import ChangePasswordPage from "./auth/ChangePasswordPage";
import CssBaseline from "@mui/material/CssBaseline";

function HomePage() {
  const { currentUser, signOut } = useContext(AuthContext);

  return (
    <div>
      <CssBaseline />
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && "active"}</p>

      <div>
        <Link component={RouterLink} to="/auth/change-password">
          Change Password
        </Link>
      </div>

      <Button variant="contained" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default HomePage;
