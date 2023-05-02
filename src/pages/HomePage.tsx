import React from "react";
import Typography from "@mui/material/Typography";
import TopAppBar from "../components/TopAppBar";

function HomePage() {
  return (
    <>
      <TopAppBar />
      <main>
        <Typography component="h1" variant="h5">
          Your Groups
        </Typography>
      </main>
    </>
  );
}

export default HomePage;
