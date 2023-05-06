import React from "react";
import { TableRow, TableCell, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MemberAvatar from "./MemberAvatar";
import { ref } from "firebase/database";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { UserModel } from "../../models/UserModel";

interface MemberTableRowProps {
  memberId: string;
  memberStatus: string;
  leaderId: string;
}

export default function MemberTableRow({
  memberId,
  memberStatus,
  leaderId,
}: MemberTableRowProps) {
  const database = useDatabase();
  const memberRef = ref(database, `users/${memberId}`);
  const { status, data: memberData } =
    useDatabaseObjectData<UserModel>(memberRef);

  return status === "success" ? (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <MemberAvatar
          key={memberId}
          memberId={memberId}
          memberStatus={memberStatus}
          isLeader={memberId === leaderId}
        />
        <Typography display="inline" variant="body1" sx={{ ml: 2 }}>
          {memberData.nickname ?? null}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography display="inline" variant="body1">
          {memberData.email}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Button
          variant="outlined"
          startIcon={<DeleteIcon color="error" />}
          color="error"
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  ) : null;
}
