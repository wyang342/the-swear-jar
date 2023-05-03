import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import APIService from "../services/APIService";
import { updateProfile } from "firebase/auth";
import Alert from "@mui/material/Alert";

function MyAccountPage() {
  const { currentUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !currentUser) {
      return;
    }

    const selectedImage = event.target.files[0];
    try {
      const downloadURL = await APIService.uploadProfilePicture(
        currentUser!,
        selectedImage
      );
      setImageUrl(downloadURL);

      // Update the user's profile picture
      await updateProfile(currentUser!, {
        photoURL: downloadURL,
      });
    } catch (error) {
      console.log(error);
      setError("Error uploading image.");
    }

    window.location.reload();
  };

  // Gets profile picture on mount
  useEffect(() => {
    APIService.setProfilePictureUrl(setImageUrl, currentUser);
  }, [currentUser]);

  return (
    <main>
      <Typography component="h1" variant="h5">
        My Account
      </Typography>

      {error ? (
        <Alert sx={{ marginTop: 2 }} severity="error">
          {error}
          <br />
          Please try again.
        </Alert>
      ) : null}

      <Avatar
        alt={currentUser?.displayName ?? ""}
        src={imageUrl}
        sx={{ width: 200, height: 200 }}
      />
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

      <Typography variant="body1">
        Logged in as: {currentUser?.email}
      </Typography>
      {/* <Typography variant="body2">Nickname: {currentUser?.displayName}</Typography> */}

      <Link component={RouterLink} to="/auth/change-password">
        Change Password
      </Link>
    </main>
  );
}

export default MyAccountPage;
