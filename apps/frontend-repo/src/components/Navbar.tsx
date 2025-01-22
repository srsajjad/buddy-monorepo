"use client";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { log } from "@repo/logger";
import { auth } from "@/config/firebase";

export default function Navbar(): JSX.Element {
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
      router.push("/"); // Redirect to login page
    } catch (error) {
      log("Logout error:", error);
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
