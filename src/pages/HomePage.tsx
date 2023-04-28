import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";

function HomePage() {
  const { currentUser, signOut } = useContext(AuthContext);

  return (
    <div>
      <h3>Welcome! {currentUser?.email}</h3>
      <p>Sign In Status: {currentUser && "active"}</p>
      <Button variant="contained" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default HomePage;
