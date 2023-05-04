import { useContext, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Container,
  LinearProgress,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { createJarSchema } from "../../utils/validationSchemas";
import { useFormik } from "formik";
import ErrorAlert from "../../components/Alerts/ErrorAlert";
import { JarData } from "../../utils/types";
import APIService from "../../services/APIService";

function CreateJarPage() {
  const { currentUser } = useContext(AuthContext);
  // const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      commonPurpose: "",
      jarFillingAction: "",
      costPerAction: "",
      goalAmount: "",
    },
    validationSchema: createJarSchema,
    onSubmit: async (values) => {
      // 1 is appended to the end of the name to prevent duplicate names
      const name1 = values.name;
      const commonPurpose1 = values.commonPurpose;
      const jarFillingAction1 = values.jarFillingAction;
      const costPerAction1: number = parseInt(values.costPerAction);
      const goalAmount1: number = parseInt(values.goalAmount);

      if (!currentUser) {
        setError(true);
        return;
      }

      try {
        setError(false);
        setLoading(true);

        const uid = currentUser!.uid;

        const jarData: JarData = {
          name: name1,
          leader: uid,
          members: {
            [uid]: "joined",
          },
          common_purpose: commonPurpose1,
          jar_filling_action: jarFillingAction1,
          cost_per_action: costPerAction1,
          goal_amount: goalAmount1,
          current_amount: 0,
          contributions: {
            [uid]: 0,
          },
        };

        await APIService.createJar(currentUser, jarData);
      } catch (err: any) {
        setError(true);
      }

      setLoading(false);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      {loading ? <LinearProgress sx={{ marginBottom: 1 }} /> : ""}
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
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin="normal"
            fullWidth
            id="commonPurpose"
            label="Common Purpose"
            name="commonPurpose"
            autoFocus
            value={formik.values.commonPurpose}
            onChange={formik.handleChange}
            error={
              formik.touched.commonPurpose &&
              Boolean(formik.errors.commonPurpose)
            }
            helperText={
              formik.touched.commonPurpose && formik.errors.commonPurpose
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="jarFillingAction"
            label="Jar Filling Action"
            name="jarFillingAction"
            autoFocus
            value={formik.values.jarFillingAction}
            onChange={formik.handleChange}
            error={
              formik.touched.jarFillingAction &&
              Boolean(formik.errors.jarFillingAction)
            }
            helperText={
              formik.touched.jarFillingAction && formik.errors.jarFillingAction
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="costPerAction"
            label="$ Cost per Action"
            name="costPerAction"
            autoFocus
            value={formik.values.costPerAction}
            onChange={formik.handleChange}
            error={
              formik.touched.costPerAction &&
              Boolean(formik.errors.costPerAction)
            }
            helperText={
              formik.touched.costPerAction && formik.errors.costPerAction
            }
          />
          <TextField
            margin="normal"
            fullWidth
            id="goalAmount"
            label="$ Goal Amount"
            name="goalAmount"
            autoFocus
            value={formik.values.goalAmount}
            onChange={formik.handleChange}
            error={
              formik.touched.goalAmount && Boolean(formik.errors.goalAmount)
            }
            helperText={formik.touched.goalAmount && formik.errors.goalAmount}
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
