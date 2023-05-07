import React, { useContext } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";
import JarName from "./JarName";
import { InvitationModel } from "../../../models/InvitationModel";
import APIService from "../../../services/APIService";
import { AuthContext } from "../../../context/AuthContext";

interface InvitationCardProps {
  invitationId: string;
}

export default function InvitationCard({ invitationId }: InvitationCardProps) {
  const database = useDatabase();
  const invitationRef = ref(database, `invitations/${invitationId}`);
  const { status, data: invitationData } =
    useDatabaseObjectData<InvitationModel>(invitationRef);
  const { currentUser } = useContext(AuthContext);

  return status === "success" ? (
    <Grid item xs={4}>
      <Card
        variant="outlined"
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Invitation to join:
          </Typography>
          <JarName jarId={invitationData.jar_id} />
        </CardContent>
        <CardActions sx={{ mt: "auto" }}>
          <Button
            size="small"
            color="primary"
            onClick={async () => {
              if (!currentUser) {
                return;
              }
              await APIService.acceptInvitation(
                currentUser!,
                invitationId,
                invitationData.jar_id
              );
            }}
          >
            Accept
          </Button>
          <Button
            size="small"
            color="error"
            onClick={async () => {
              if (!currentUser) {
                return;
              }
              await APIService.deleteInvitationAsInvitee(
                currentUser!,
                invitationId,
                invitationData.jar_id
              );
            }}
          >
            Decline
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ) : null;
}
