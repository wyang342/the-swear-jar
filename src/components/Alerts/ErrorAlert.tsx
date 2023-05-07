import { Alert } from "@mui/material";

export default function ErrorAlert({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Alert sx={{ my: 1 }} severity="error">
      {children}
    </Alert>
  );
}
