import { useParams } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ref } from "firebase/database";
import { JarModel } from "../../models/JarModel";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import MemberTableRow from "./components/MemberTableRow";
import InviteForm from "./components/InviteForm";
import InvitationTableRow from "./components/InvitationTableRow";

export default function MembersPage() {
  const { jarId } = useParams<{ jarId: string }>();
  const database = useDatabase();
  const jarsRef = ref(database, `jars/${jarId}`);
  const { status, data: jarData } = useDatabaseObjectData<JarModel>(jarsRef);

  const renderMemberTableRows = () => {
    const memberTableRows = [];

    for (const memberId in jarData.contributions) {
      memberTableRows.push(
        <MemberTableRow
          key={memberId}
          memberId={memberId}
          leaderId={jarData.leader}
        />
      );
    }

    return memberTableRows;
  };

  const renderInvitationTableRows = () => {
    const invitationTableRows = [];

    if (!jarId) return null;

    for (const invitationId in jarData.invitations) {
      invitationTableRows.push(
        <InvitationTableRow
          key={invitationId}
          invitationId={invitationId}
          jarId={jarId!}
        />
      );
    }

    return invitationTableRows;
  };

  return status === "success" ? (
    <main>
      <Typography component="h1" variant="h4" align="center" sx={{ mb: 2 }}>
        Members of{" "}
        {
          <Link component={RouterLink} to={`/jars/${jarId}`}>
            {jarData.name}
          </Link>
        }
      </Typography>

      <Table sx={{ minWidth: 650, mb: 6 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderMemberTableRows()}</TableBody>
        <TableBody>{renderInvitationTableRows()}</TableBody>
      </Table>
      <InviteForm jarId={jarId!} jarData={jarData} />
    </main>
  ) : null;
}
