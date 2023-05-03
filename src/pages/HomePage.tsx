import Typography from "@mui/material/Typography";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <main>
      <Typography component="h1" variant="h5">
        {currentUser?.displayName}'s Jars
      </Typography>
    </main>
  );
}

export default HomePage;
