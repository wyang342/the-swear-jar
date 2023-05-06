import { Box, Typography, TextField, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import { inviteUserSchema } from "../../../utils/validationSchemas";

export default function InviteForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: inviteUserSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography component="h2" variant="h6">
        Invite
      </Typography>
      <TextField
        id="email"
        label="Email Address"
        name="email"
        sx={{ mb: 1 }}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <br />
      <Button type="submit" variant="contained">
        Invite
      </Button>
    </Box>
  );
}
