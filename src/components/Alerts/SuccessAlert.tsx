import { Alert } from "@mui/material";

export default function SuccessAlert({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Alert sx={{ marginTop: 2 }} severity="success">
      {children}
    </Alert>
  );
}
