import { useDatabase, useDatabaseObjectData } from "reactfire";
import { ref } from "firebase/database";
import { JarModel } from "../../../models/JarModel";
import { Typography } from "@mui/material";

interface JarNameProps {
  jarId: string;
}

export default function JarName({ jarId }: JarNameProps) {
  const database = useDatabase();
  const jarsRef = ref(database, `jars/${jarId}`);
  const { status, data: jarData } = useDatabaseObjectData<JarModel>(jarsRef);

  return status === "success" ? (
    <Typography variant="h6">{jarData.name}</Typography>
  ) : null;
}
