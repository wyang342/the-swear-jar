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
import { JarModel } from "../../../models/JarModel";
import { Link as RouterLink } from "react-router-dom";

interface JarCardProps {
  jarId: string;
}

function JarCard({ jarId }: JarCardProps) {
  const database = useDatabase();
  const jarsRef = ref(database, `jars/${jarId}`);
  const { status, data: jarData } = useDatabaseObjectData<JarModel>(jarsRef);

  return status === "success" ? (
    <Grid item xs={4}>
      <Card
        variant="outlined"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
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
            {Object.keys(jarData.contributions).length}{" "}
            {Object.keys(jarData.contributions).length === 1
              ? "member"
              : "members"}
          </Typography>
          <Typography variant="body2">{jarData.common_purpose}</Typography>
        </CardContent>
        <CardActions sx={{ mt: "auto" }}>
          <Button size="small" component={RouterLink} to={`jars/${jarId}`}>
            Go to Jar
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ) : null;
}

export default JarCard;
