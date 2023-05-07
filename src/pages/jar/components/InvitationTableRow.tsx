import {
  Avatar,
  Badge,
  TableCell,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";
import APIService from "../../../services/APIService";

interface InvitationTableRowProps {
  invitationId: string;
  jarId: string;
}

export default function InvitationTableRow({
  invitationId,
  jarId,
}: InvitationTableRowProps) {
  const database = useDatabase();
  const userIdRef = ref(database, `invitations/${invitationId}/user_id`);
  const { status, data: invitedUserId } =
    useDatabaseObjectData<string>(userIdRef);

  const handleInvitationCancel = async () => {
    await APIService.deleteInvitationAsMember(
      invitedUserId,
      invitationId,
      jarId
    );
  };

  return status === "success" ? (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Badge>
          <Avatar
            sx={{
              width: 56,
              height: 56,
            }}
          />
        </Badge>
        <Typography component="span" display="inline" sx={{ ml: 2 }}>
          {invitedUserId}
        </Typography>
      </TableCell>
      <TableCell></TableCell>
      <TableCell>
        <Typography display="inline" variant="body1">
          invited
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Button
          variant="outlined"
          startIcon={<CancelIcon color="error" />}
          color="error"
          onClick={handleInvitationCancel}
        >
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  ) : null;
}
