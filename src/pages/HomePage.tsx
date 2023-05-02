import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import TopAppBar from "../components/TopAppBar";

function HomePage() {
  const { currentUser, signOut } = useContext(AuthContext);

  return (
    <>
      <TopAppBar />

      <main>
        <Typography component="h1" variant="h5">
          Home
        </Typography>
        <p>Sign In Status: {currentUser && "active"}</p>

        <Button variant="contained" onClick={signOut}>
          Sign Out
        </Button>
      </main>
    </>
  );
}

export default HomePage;
