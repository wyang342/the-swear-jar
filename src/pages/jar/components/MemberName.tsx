import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";
import { UserModel } from "../../../models/UserModel";
import { Typography } from "@mui/material";

interface MemberNameProps {
  memberId: string;
}

export default function MemberName({ memberId }: MemberNameProps) {
  const database = useDatabase();
  const memberRef = ref(database, `users/${memberId}`);
  const { status, data: memberData } =
    useDatabaseObjectData<UserModel>(memberRef);

  return status === "success" ? (
    <Typography sx={{ ml: 2 }} display="inline">
      {memberData.nickname}
    </Typography>
  ) : null;
}
