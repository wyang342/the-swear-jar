import { Avatar, Badge } from "@mui/material";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";

interface MemberAvatarProps {
  memberId: string;
  memberStatus: string;
  isLeader: boolean;
}

export default function MemberAvatar({
  memberId,
  memberStatus,
  isLeader,
}: MemberAvatarProps) {
  const database = useDatabase();
  const profilePictureRef = ref(database, `users/${memberId}/profilePicture`);
  const { status, data: profilePicture } =
    useDatabaseObjectData<string>(profilePictureRef);

  if (isLeader) {
    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={"👑"}
        color="primary"
      >
        <Avatar
          alt={memberId}
          src={profilePicture}
          sx={{
            width: 56,
            height: 56,
            opacity: memberStatus === "joined" ? 1 : 0.5,
          }}
        />
      </Badge>
    );
  }

  return status === "success" ? (
    <Avatar
      alt={memberId}
      src={profilePicture}
      sx={{
        width: 56,
        height: 56,
        opacity: memberStatus === "joined" ? 1 : 0.5,
      }}
    />
  ) : null;
}
