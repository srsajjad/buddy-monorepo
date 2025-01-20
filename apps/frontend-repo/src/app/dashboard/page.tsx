import { Container, Typography } from "@mui/material";
import UpdateButton from "../../components/UpdateButton";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" align="center" sx={{ my: 4 }}>
          Dashboard
        </Typography>
        <UpdateButton />
      </Container>
    </>
  );
}
