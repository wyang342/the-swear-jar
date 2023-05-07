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
import { signUpDefault } from "../../lib/firebase";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { signUpSchema } from "../../utils/validationSchemas";
import { useFormik } from "formik";
import ErrorAlert from "../../components/alerts/ErrorAlert";
import APIService from "../../services/APIService";

function SignupPage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      const email = values.email;
      const password = values.password;

      try {
        setError(false);
        setLoading(true);
        const userCredential = await signUpDefault(email, password);

        if (userCredential) {
          const uid = userCredential.user.uid;

          await APIService.initializeUser(uid, email);

          navigate("/");
        }
      } catch (err: any) {
        console.log("Error signing in: ", err.message);
        setError(true);
      }

      setLoading(false);
    },
  });

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

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
          Sign up
        </Typography>

        {error && (
          <ErrorAlert>
            An error occurred while signing up.
            <br />
            Please try again.
          </ErrorAlert>
        )}

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
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirmation"
            label="Confirm Password"
            type="password"
            id="passwordConfirmation"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirmation &&
              Boolean(formik.errors.passwordConfirmation)
            }
            helperText={
              formik.touched.passwordConfirmation &&
              formik.errors.passwordConfirmation
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              Already a user?&nbsp;
              <Link to="/auth/signin" component={RouterLink} variant="body2">
                {"Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;
