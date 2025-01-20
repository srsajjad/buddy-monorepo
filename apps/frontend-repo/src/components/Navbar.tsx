"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
