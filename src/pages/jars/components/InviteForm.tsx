import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { inviteUserSchema } from "../../../utils/validationSchemas";
import APIService from "../../../services/APIService";
import { InvitationModel } from "../../../models/InvitationModel";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { query, ref } from "firebase/database";

interface InviteFormProps {
  jarId: string;
}

function InviteForm({ jarId }: InviteFormProps) {
  const database = useDatabase();

  // const profilePictureRef = ref(database, `users/${memberId}/profilePicture`);
  // const { status, data: uid } =
  //   useDatabaseObjectData<string>(profilePictureRef);

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

      await APIService.inviteUser(model);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} noValidate>
      <Typography component="h2" variant="h6">
        Invite
      </Typography>
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
