import React from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import { ref } from "firebase/database";
import { JarModel } from "../../models/JarModel";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import MemberTableRow from "./components/MemberTableRow";
import InviteForm from "./components/InviteForm";

export default function MembersPage() {
  const { jarId } = useParams<{ jarId: string }>();
  const database = useDatabase();
  const jarsRef = ref(database, `jars/${jarId}`);
  const { status, data: jarData } = useDatabaseObjectData<JarModel>(jarsRef);

  const renderMemberTableRows = () => {
    const memberTableRows = [];

    for (const [memberId, memberStatus] of Object.entries(jarData.members)) {
      memberTableRows.push(
        <MemberTableRow
          memberId={memberId}
          memberStatus={memberStatus}
          leaderId={jarData.leader}
        />
      );
    }

    return memberTableRows;
  };

  return status === "success" ? (
    <main>
      <Typography component="h1" variant="h4" align="center" sx={{ mb: 2 }}>
        Members of {jarData.name}
      </Typography>

      <Table sx={{ minWidth: 650, mb: 6 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Member</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderMemberTableRows()}</TableBody>
      </Table>
      <InviteForm />
    </main>
  ) : null;
}
