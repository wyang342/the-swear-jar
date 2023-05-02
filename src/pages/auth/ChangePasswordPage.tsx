import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useFormik } from "formik";
import { changePasswordSchema } from "../../utils/validationSchemas";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";

function ChangePasswordPage() {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      newPasswordConfirmation: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      const currentPassword = values.currentPassword;
      const newPassword = values.newPassword;

      try {
        setSuccess(false);
        setError("");
        setLoading(true);

        // If no user is signed in, navigate to signin page
        if (!currentUser) {
          navigate("/auth/signin");
          return;
        }

        // Reauthenticate user
        const credential = EmailAuthProvider.credential(
          currentUser.email!,
          currentPassword
        );
        await reauthenticateWithCredential(currentUser, credential);

        // Update password
        await updatePassword(currentUser, newPassword);

        setSuccess(true);
      } catch (err: any) {
        if (err.code === "auth/wrong-password") {
          setError("Current password is incorrect.");
        } else {
          setError("An error occurred while resetting your password.");
        }
      }

      setLoading(false);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>

        {error ? (
          <Alert sx={{ marginTop: 2 }} severity="error">
            {error}
            <br />
            Please try again.
          </Alert>
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
            id="currentPassword"
            label="Current Password"
            name="currentPassword"
            type="password"
            autoFocus
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.currentPassword &&
              Boolean(formik.errors.currentPassword)
            }
            helperText={
              formik.touched.currentPassword && formik.errors.currentPassword
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.newPassword && Boolean(formik.errors.newPassword)
            }
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPasswordConfirmation"
            label="New Password Confirmation"
            type="password"
            id="newPasswordConfirmation"
            value={formik.values.newPasswordConfirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.newPasswordConfirmation &&
              Boolean(formik.errors.newPasswordConfirmation)
            }
            helperText={
              formik.touched.newPasswordConfirmation &&
              formik.errors.newPasswordConfirmation
            }
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
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

export default ChangePasswordPage;
