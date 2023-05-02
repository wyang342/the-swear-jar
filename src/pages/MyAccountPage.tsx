import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function MyAccountPage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <Typography component="h1" variant="h5">
        My Account
      </Typography>
      <Typography variant="body1">Welcome! {currentUser?.email}</Typography>
      {/* <Typography variant="body2">Nickname: </Typography> */}

      <Link component={RouterLink} to="/auth/change-password">
        Change Password
      </Link>
    </div>
  );
}

export default MyAccountPage;
