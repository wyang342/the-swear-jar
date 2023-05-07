import { useContext, useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Link,
  Grid,
} from "@mui/material";
import { signInDefault } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import { Link as RouterLink } from "react-router-dom";
import { signInSchema } from "../../utils/validationSchemas";
import ErrorAlert from "../../components/alerts/ErrorAlert";

function SigninPage() {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      const email = values.email;
      const password = values.password;

      try {
        setError(false);
        setLoading(true);
        const userCredential = await signInDefault(email, password);

        if (userCredential) {
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
          Sign in
        </Typography>

        {error && (
          <ErrorAlert>
            Incorrect credentials or too many attempts.
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, color: "white" }}
          >
            Sign In
          </Button>
          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              Don't have an account?&nbsp;
              <Link to="/auth/signup" component={RouterLink} variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SigninPage;
