import { Avatar, Badge, TableCell, TableRow, Typography } from "@mui/material";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";

interface InvitationTableRowProps {
  invitationId: string;
}

export default function InvitationTableRow({
  invitationId,
}: InvitationTableRowProps) {
  const database = useDatabase();
  const userIdRef = ref(database, `invitations/${invitationId}/user_id`);
  const { status, data: invitedUserId } =
    useDatabaseObjectData<string>(userIdRef);

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
    </TableRow>
  ) : null;
}
