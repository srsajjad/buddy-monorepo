"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Box } from "@mui/material";
import type { AppDispatch, RootState } from "../store/store";
import { fetchUserData, updateUserData } from "../store/slices/userSlice";

export default function UpdateButton() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const handleUpdate = () => {
    if (user) {
      dispatch(
        updateUserData({
          displayName: `${user.displayName} (Updated)`,
          updatedAt: new Date().toISOString(),
        })
      );
    }
  };

  return (
    <Box sx={{ textAlign: "center", my: 4 }}>
      <Button
        variant="contained"
        onClick={handleUpdate}
        disabled={loading || !user}
      >
        {loading ? "Updating..." : "Update User Data"}
      </Button>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {user && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          Current User: {user.displayName}
          <br />
          Last Updated: {new Date(user.updatedAt).toLocaleString()}
        </Typography>
      )}
    </Box>
  );
}
