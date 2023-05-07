import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Link,
  Typography,
  Button,
  Avatar,
  LinearProgress,
} from "@mui/material";
import APIService from "../../services/APIService";
import { updateProfile } from "firebase/auth";
import ErrorAlert from "../../components/alerts/ErrorAlert";

function MyAccountPage() {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !currentUser) {
      return;
    }

    setLoading(true);
    const selectedImage = event.target.files[0];
    try {
      const downloadURL = await APIService.uploadProfilePicture(
        currentUser!,
        selectedImage
      );

      // Update the user's profile picture
      await updateProfile(currentUser!, {
        photoURL: downloadURL,
      });
    } catch (error) {
      console.log(error);
      setError("Error uploading image.");
    }

    setLoading(false);
    window.location.reload();
  };

  return (
    <main>
      {loading ? <LinearProgress sx={{ marginBottom: 1 }} /> : ""}
      <Typography component="h1" variant="h5">
        My Account
      </Typography>

      {error && (
        <ErrorAlert>
          {error}
          <br />
          Please try again.
        </ErrorAlert>
      )}

      {currentUser ? (
        <Avatar
          alt={currentUser!.displayName ?? ""}
          src={currentUser!.photoURL ?? ""}
          sx={{ width: 200, height: 200 }}
        />
      ) : null}

      <Button variant="contained" component="label">
        Change Photo
        <input
          type="file"
          name="profilePicture"
          hidden
          accept="image/*"
          onChange={(event) => handleImageChange(event)}
        />
      </Button>

      <Typography variant="body1">User Id: {currentUser?.uid}</Typography>

      <Typography variant="body1">
        Email: {currentUser?.email}
        <br />
        Nickname: {currentUser?.displayName}
      </Typography>

      <Link component={RouterLink} to="/my-account/edit-profile">
        Change Nickname
      </Link>
      <br />

      <Link component={RouterLink} to="/auth/change-password">
        Change Password
      </Link>
    </main>
  );
}

export default MyAccountPage;
