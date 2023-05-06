import { useParams } from "react-router-dom";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";
import { JarModel } from "../../models/JarModel";
import {
  Typography,
  LinearProgress,
  Button,
  AvatarGroup,
  Link,
} from "@mui/material";
import MemberAvatar from "./components/MemberAvatar";
import { Link as RouterLink } from "react-router-dom";

export default function JarPage() {
  const { jarId } = useParams<{ jarId: string }>();
  const database = useDatabase();
  const jarsRef = ref(database, `jars/${jarId}`);
  const { status, data: jarData } = useDatabaseObjectData<JarModel>(jarsRef);

  const renderMemberAvatars = () => {
    const memberAvatars = [];

    for (const [memberId, memberStatus] of Object.entries(jarData.members)) {
      memberAvatars.push(
        <MemberAvatar
          key={memberId}
          memberId={memberId}
          memberStatus={memberStatus}
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

  if (status === "success") console.log(jarData);

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

      <Button variant="contained" sx={{ mb: 4 }}>
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
    </main>
  ) : null;
}
