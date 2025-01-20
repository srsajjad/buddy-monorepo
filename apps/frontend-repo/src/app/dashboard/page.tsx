import { Container, Typography, Box } from "@mui/material";
import FetchDataButton from "../../components/FetchDataButton";
import UpdateUserButton from "../../components/UpdateUserButton";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" align="center" sx={{ my: 4 }}>
          Dashboard
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FetchDataButton />
          <UpdateUserButton />
        </Box>
      </Container>
    </>
  );
}
