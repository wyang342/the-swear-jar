import { useParams } from "react-router-dom";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";
import { JarModel } from "../../models/JarModel";
import { Typography, LinearProgress, Box, Button } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function JarPage() {
  const { jarId } = useParams<{ jarId: string }>();
  const database = useDatabase();
  const jarsRef = ref(database, `jars/${jarId}`);
  const { status, data: jarData } = useDatabaseObjectData<JarModel>(jarsRef);
  const { currentUser } = useContext(AuthContext);

  if (status === "success") console.log(jarData);

  return status === "success" ? (
    <main>
      <Box>
        <Typography component="h1" variant="h4" align="center" sx={{ mb: 2 }}>
          {jarData.name}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={(jarData.current_amount / jarData.goal_amount) * 100}
        />
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          ${jarData.current_amount} in the jar (Goal: ${jarData.goal_amount})
        </Typography>

        <Typography variant="h6">Common Purpose</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {jarData.common_purpose}
        </Typography>

        <Typography variant="h6">Jar Filling Action</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {jarData.jar_filling_action}
        </Typography>

        <Typography variant="h6">Members</Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          {Object.keys(jarData.members).length} members
        </Typography>

        <Button variant="contained">Pay ${jarData.cost_per_action}</Button>
      </Box>
    </main>
  ) : null;
}
