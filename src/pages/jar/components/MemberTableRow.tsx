import { useContext } from "react";
import { TableRow, TableCell, Typography } from "@mui/material";
import MemberAvatar from "./MemberAvatar";
import { ref } from "firebase/database";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { UserModel } from "../../../models/UserModel";
import { AuthContext } from "../../../context/AuthContext";
// import CancelIcon from "@mui/icons-material/Cancel";

interface MemberTableRowProps {
  memberId: string;
  leaderId: string;
}

export default function MemberTableRow({
  memberId,
  leaderId,
}: MemberTableRowProps) {
  const database = useDatabase();
  const memberRef = ref(database, `users/${memberId}`);
  const { status, data: memberData } =
    useDatabaseObjectData<UserModel>(memberRef);
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) return null;

  return status === "success" ? (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <MemberAvatar
          key={memberId}
          memberId={memberId}
          isLeader={memberId === leaderId}
        />
        <Typography component="span" display="inline" sx={{ ml: 2 }}>
          {memberData.nickname ?? null}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography display="inline" variant="body1">
          {memberData.email}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography display="inline" variant="body1">
          joined
        </Typography>
      </TableCell>
      {/* {currentUser!.uid === leaderId && currentUser!.uid !== memberId ? (
        <TableCell align="right">
          <Button
            variant="outlined"
            startIcon={<CancelIcon color="error" />}
            color="error"
          >
            Remove
          </Button>
        </TableCell>
      ) : (
        <TableCell></TableCell>
      )} */}
      <TableCell></TableCell>
    </TableRow>
  ) : null;
}
