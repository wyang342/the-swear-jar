import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  LinearProgress,
} from "@mui/material";
import { useFormik } from "formik";
import { editProfileSchema } from "../../utils/validationSchemas";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import SuccessAlert from "../../components/alerts/SuccessAlert";
import ErrorAlert from "../../components/alerts/ErrorAlert";
import APIService from "../../services/APIService";

function EditProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { currentUser } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      newNickname: "",
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values) => {
      if (!currentUser) {
        return;
      }

      const newNickname = values.newNickname;

      setLoading(true);
      setSuccess(false);
      setError("");
      try {
        await updateProfile(currentUser, { displayName: newNickname });
        await APIService.addNickname(currentUser, newNickname);
        setSuccess(true);
      } catch (error: any) {
        setError(error.message);
      }
      setLoading(false);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      {loading ? <LinearProgress sx={{ marginBottom: 1 }} /> : ""}
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>

        {error && (
          <ErrorAlert>
            {error}
            <br />
            Please try again.
          </ErrorAlert>
        )}

        {success ? (
          <SuccessAlert>Profile successfully updated!</SuccessAlert>
        ) : null}

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="newNickname"
            label="New Nickname"
            name="newNickname"
            type="text"
            autoFocus
            value={formik.values.newNickname}
            onChange={formik.handleChange}
            // defaultValue={currentUser?.displayName}
            error={
              formik.touched.newNickname && Boolean(formik.errors.newNickname)
            }
            helperText={formik.touched.newNickname && formik.errors.newNickname}
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Submit
          </Button>
        </Box>
        <Button variant="text" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}

export default EditProfilePage;
