import { Container, Typography } from "@mui/material";
import UpdateButton from "../../components/UpdateButton";

export default function Dashboard() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" align="center" sx={{ my: 4 }}>
        Dashboard
      </Typography>
      <UpdateButton />
    </Container>
  );
}
