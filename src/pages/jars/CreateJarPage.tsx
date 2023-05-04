import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Link,
  Grid,
} from "@mui/material";
import { signUpDefault } from "../../config/firebase";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signUpSchema } from "../../utils/validationSchemas";
import { useFormik } from "formik";
import ErrorAlert from "../../components/Alerts/ErrorAlert";

function CreateJarPage() {
  // const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //     passwordConfirmation: "",
  //   },
  //   validationSchema: signUpSchema,
  //   onSubmit: async (values) => {
  //     const email = values.email;
  //     const password = values.password;

  //     try {
  //       setError(false);
  //       setLoading(true);
  //       const userCredential = await signUpDefault(email, password);

  //       if (userCredential) {
  //         navigate("/");
  //       }
  //     } catch (err: any) {
  //       console.log("Error signing in: ", err.message);
  //       setError(true);
  //     }

  //     setLoading(false);
  //   },
  // });

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Create a Jar
        </Typography>

        {error ? (
          <ErrorAlert>
            An error occurred while creating a jar.
            <br />
            Please try again.
          </ErrorAlert>
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
            id="jarName"
            label="Jar Name"
            name="jarName"
            autoFocus
            value={formik.values.jarName}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateJarPage;
