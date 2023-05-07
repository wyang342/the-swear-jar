import { Alert } from "@mui/material";

export default function SuccessAlert({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Alert sx={{ my: 1 }} severity="success">
      {children}
    </Alert>
  );
}
