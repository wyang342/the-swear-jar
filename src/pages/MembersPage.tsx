import React from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { ref } from "firebase/database";
import { JarModel } from "../models/JarModel";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import MemberAvatar from "../components/members/MemberAvatar";
import MemberInfo from "../components/members/MemberInfo";

export default function MembersPage() {
  const { jarId } = useParams<{ jarId: string }>();
  const database = useDatabase();
  const jarsRef = ref(database, `jars/${jarId}`);
  const { status, data: jarData } = useDatabaseObjectData<JarModel>(jarsRef);

  const renderMembers = () => {
    const memberGridRows = [];

    for (const [memberId, memberStatus] of Object.entries(jarData.members)) {
      memberGridRows.push(
        <Grid item xs={12}>
          <MemberAvatar
            key={memberId}
            memberId={memberId}
            memberStatus={memberStatus}
            isLeader={memberId === jarData.leader}
          />
          <MemberInfo key={memberId} memberId={memberId} />
        </Grid>
      );
    }

    return memberGridRows;
  };

  return status === "success" ? (
    <main>
      <Typography component="h1" variant="h4" align="center" sx={{ mb: 2 }}>
        Members of {jarData.name}
      </Typography>

      <Grid container spacing={2}>
        {renderMembers()}
      </Grid>
    </main>
  ) : null;
}
