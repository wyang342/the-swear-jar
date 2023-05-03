import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import Avatar from "@mui/material/Avatar";
import APIService from "../services/APIService";

function MyAccountPage() {
  const { currentUser } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState<string>("");
  // TODO: Add error handling
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      return;
    }

    // Select the image
    const selectedImage = event.target.files[0];

    // Upload the image
    const imageRef = ref(storage, `users/${currentUser?.uid}/profilePicture`);
    await uploadBytes(imageRef, selectedImage);
    const downloadURL = await getDownloadURL(imageRef);
    setImageUrl(downloadURL);

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
