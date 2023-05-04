import Typography from "@mui/material/Typography";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  LinearProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  const card = (
    <>
      <CardContent>
        <LinearProgress
          variant="determinate"
          value={10}
          sx={{ marginBottom: 1 }}
        />
        <Typography variant="h6" component="div">
          The Holy Trinity
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          4 members
        </Typography>
        <Typography variant="body2">Saving up for our trip to japan</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Go to Jar</Button>
      </CardActions>
    </>
  );

  return (
    <main>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        {currentUser?.displayName}'s Jars
      </Typography>

      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={4}>
          <Card variant="outlined">{card}</Card>
        </Grid>

        <Grid item xs={4}>
          <Card variant="outlined">{card}</Card>
        </Grid>

        <Grid item xs={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <Button
              variant="text"
              sx={{ height: "100%", width: "100%" }}
              onClick={() => console.log("clicked")}
            >
              <AddIcon sx={{ color: green[500] }} fontSize="large" />
            </Button>
          </Card>
        </Grid>
      </Grid>
    </main>
  );
}

export default HomePage;
