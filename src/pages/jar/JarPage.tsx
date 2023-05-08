import { useNavigate, useParams } from "react-router-dom";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";
import { JarModel } from "../../models/JarModel";
import {
  Typography,
  LinearProgress,
  Button,
  AvatarGroup,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import MemberAvatar from "./components/MemberAvatar";
import { Link as RouterLink } from "react-router-dom";
import { useContext, useState } from "react";
import APIService from "../../services/APIService";
import { AuthContext } from "../../context/AuthContext";
import NotFoundPage from "../NotFoundPage";

export default function JarPage() {
  // Fetch data
  const { jarId } = useParams<{ jarId: string }>();
  const database = useDatabase();
  const jarsRef = ref(database, `jars/${jarId}`);
  const { status, data: jarData } = useDatabaseObjectData<JarModel>(jarsRef);
  const { currentUser } = useContext(AuthContext);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState<boolean>(false);

  const renderMemberAvatars = () => {
    const memberAvatars = [];

    for (const memberId in jarData.contributions) {
      memberAvatars.push(
        <MemberAvatar
          key={memberId}
          memberId={memberId}
          isLeader={memberId === jarData.leader}
        />
      );
    }

    return (
      <AvatarGroup
        max={5}
        spacing="medium"
        sx={{ flexDirection: "row", mb: 2 }}
      >
        {memberAvatars}
      </AvatarGroup>
    );
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteJar = async () => {
    if (status === "success" && jarId) {
      setDeleting(true);
      await APIService.deleteJar(jarId!, jarData);
      navigate("/");
      setDeleting(false);
    }
  };

  const handlePay = async () => {
    if (!jarId) return;

    APIService.pay(jarId, currentUser!.uid, jarData!.cost_per_action);
  };

  if (deleting) {
    return <LinearProgress />;
  }

  if (!jarData) {
    return <NotFoundPage />;
  }

  return status === "success" ? (
    <main>
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

      <Button variant="contained" sx={{ mb: 4 }} onClick={handlePay}>
        Pay ${jarData.cost_per_action}
      </Button>

      <br />

      <Typography variant="h6">
        <Link component={RouterLink} to={`/jars/${jarId}/members`}>
          Members
        </Link>
      </Typography>
      {status === "success" ? renderMemberAvatars() : null}

      <Typography variant="h6">What is the jar for?</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {jarData.common_purpose}
      </Typography>

      <Typography variant="h6">What action fills the jar?</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        {jarData.jar_filling_action}
      </Typography>

      <Typography variant="h6">Contributions</Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        TODO
      </Typography>

      {currentUser?.uid === jarData.leader ? (
        <Button variant="contained" onClick={handleClickOpen} color="error">
          Delete Jar
        </Button>
      ) : null}

      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Delete {jarData.name}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will delete the jar and all of its data. This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={handleDeleteJar} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  ) : null;
}
