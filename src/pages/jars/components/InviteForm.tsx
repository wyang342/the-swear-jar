import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { inviteUserSchema } from "../../../utils/validationSchemas";
import APIService from "../../../services/APIService";
import { InvitationModel } from "../../../models/InvitationModel";
import { useState } from "react";
import ErrorAlert from "../../../components/alerts/ErrorAlert";
import SuccessAlert from "../../../components/alerts/SuccessAlert";

interface InviteFormProps {
  jarId: string;
}

function InviteForm({ jarId }: InviteFormProps) {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      uid: "",
    },
    validationSchema: inviteUserSchema,
    onSubmit: async (values) => {
      const { uid } = values;

      const model: InvitationModel = {
        jar_id: jarId,
        user_id: uid,
      };

      setError(false);
      setSuccess(false);
      try {
        await APIService.inviteUser(model);
        setSuccess(true);
      } catch (error: any) {
        console.log(error);
        setError(true);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography component="h2" variant="h6">
        Invite
      </Typography>

      {error && (
        <ErrorAlert>
          {error}
          <br />
          Please try again.
        </ErrorAlert>
      )}

      {success && <SuccessAlert>User invited successfully!</SuccessAlert>}

      <TextField
        id="uid"
        label="User Id"
        name="uid"
        sx={{ mb: 1, width: "50%" }}
        value={formik.values.uid}
        onChange={formik.handleChange}
        error={formik.touched.uid && Boolean(formik.errors.uid)}
        helperText={formik.touched.uid && formik.errors.uid}
        size="medium"
      />
      <br />
      <Button type="submit" variant="contained">
        Invite
      </Button>
    </Box>
  );
}

export default InviteForm;
