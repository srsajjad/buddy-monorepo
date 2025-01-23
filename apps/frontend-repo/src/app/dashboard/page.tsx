"use client";

import { useEffect, useState } from "react";
import { Container, Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import FetchDataButton from "@/components/FetchDataButton";
import UpdateUserButton from "@/components/UpdateUserButton";
import Navbar from "@/components/Navbar";
import { auth } from "@/config/firebase";

export default function Page() {
  const router = useRouter();
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
      setIsAuthChecking(false);
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <>
      <Navbar />
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            mt: 4,
          }}
        >
          {isAuthChecking ? (
            <CircularProgress size={24} />
          ) : (
            <>
              <FetchDataButton />
              <UpdateUserButton />
            </>
          )}
        </Box>
      </Container>
    </>
  );
}
