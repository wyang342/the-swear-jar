import {
  Button,
  CardContent,
  CardActions,
  LinearProgress,
  Typography,
  Card,
  Grid,
} from "@mui/material";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";
import { JarModel } from "../models/JarModel";

interface JarCardProps {
  jarId: string;
}

function JarCard({ jarId }: JarCardProps) {
  const database = useDatabase();
  const jarsRef = ref(database, `jars/${jarId}`);
  const { status, data: jarData } = useDatabaseObjectData<JarModel>(jarsRef);

  return status === "success" ? (
    <Grid item xs={4}>
      <Card variant="outlined">
        <CardContent>
          <LinearProgress
            variant="determinate"
            value={(jarData.current_amount / jarData.goal_amount) * 100}
            sx={{ marginBottom: 1 }}
          />
          <Typography variant="h6" component="div">
            {jarData.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {Object.keys(jarData.members).length} members
          </Typography>
          <Typography variant="body2">{jarData.common_purpose}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Go to Jar</Button>
        </CardActions>
      </Card>
    </Grid>
  ) : null;
}

export default JarCard;
