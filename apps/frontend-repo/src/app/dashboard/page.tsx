"use client";

import { useEffect } from "react";
import { Container, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import FetchDataButton from "@/components/FetchDataButton";
import UpdateUserButton from "@/components/UpdateUserButton";
import Navbar from "@/components/Navbar";
import { auth } from "@/config/firebase";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <FetchDataButton />
          <UpdateUserButton />
        </Box>
      </Container>
    </>
  );
}
