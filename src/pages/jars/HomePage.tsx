import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import {
  Card,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";
import JarCard from "./components/JarCard";
import InvitationCard from "./components/InvitationCard";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const database = useDatabase();

  // Subscribe to data
  const userJarsRef = ref(database, `users/${currentUser?.uid}/jars`);
  const { status, data: jarIds } = useDatabaseObjectData(userJarsRef);
  const { status: invitationStatus, data: invitationIds } =
    useDatabaseObjectData(
      ref(database, `users/${currentUser?.uid}/invitations`)
    );

  const renderJarCards = () => {
    if (!jarIds) return null;

    const jarCards = [];

    for (const jarId of Object.keys(jarIds as object)) {
      if (jarId === "NO_ID_FIELD") continue;
      jarCards.push(<JarCard jarId={jarId} key={jarId} />);
    }

    return jarCards;
  };

  const renderInvitationCards = () => {
    if (!invitationIds) return null;

    const invitationCards = [];

    for (const invitationId in invitationIds) {
      if (invitationId === "NO_ID_FIELD") continue;
      invitationCards.push(
        <InvitationCard invitationId={invitationId} key={invitationId} />
      );
    }

    return invitationCards;
  };

  if (invitationStatus === "success") console.log(invitationIds);

  return (
    <main>
      <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
        {currentUser?.displayName === null
          ? "My Jars"
          : `${currentUser?.displayName}'s Jars`}
      </Typography>

      <Grid container spacing={2} alignContent="stretch">
        {status === "success" ? renderJarCards() : <CircularProgress />}
        {invitationStatus === "success" ? renderInvitationCards() : null}
        <Grid item xs={4}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <Button
              variant="text"
              sx={{ height: "100%", width: "100%" }}
              onClick={() => navigate("/jars/new")}
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
