import {
  Button,
  CardContent,
  CardActions,
  LinearProgress,
  Typography,
  Card,
} from "@mui/material";

interface JarCardProps {
  progress: number;
  name: string;
  numMembers: number;
  commonPurpose: string;
}

function JarCard({ progress, name, numMembers, commonPurpose }: JarCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ marginBottom: 1 }}
        />
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {numMembers} members
        </Typography>
        <Typography variant="body2">{commonPurpose}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Go to Jar</Button>
      </CardActions>
    </Card>
  );
}

export default JarCard;
