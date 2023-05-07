import { Avatar, Badge } from "@mui/material";
import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";

interface MemberAvatarProps {
  memberId: string;
  isLeader: boolean;
}

export default function MemberAvatar({
  memberId,
  isLeader,
}: MemberAvatarProps) {
  const database = useDatabase();
  const profilePictureRef = ref(database, `users/${memberId}/profilePicture`);
  const { status, data: profilePicture } =
    useDatabaseObjectData<string>(profilePictureRef);

  if (status === "success") {
    return isLeader ? (
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
          }}
        />
      </Badge>
    ) : (
      <Badge>
        <Avatar
          alt={memberId}
          src={profilePicture}
          sx={{
            width: 56,
            height: 56,
          }}
        />
      </Badge>
    );
  } else {
    return null;
  }
}
