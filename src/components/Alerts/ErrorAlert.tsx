import { Alert } from "@mui/material";

export default function ErrorAlert({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Alert sx={{ marginTop: 2 }} severity="error">
      {children}
    </Alert>
  );
}
