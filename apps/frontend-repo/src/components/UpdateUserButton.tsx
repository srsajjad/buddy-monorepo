"use client";

import { useState } from "react";
import { Button, Box, Typography, TextField, Paper } from "@mui/material";
import type { UserUpdatePayload } from "@repo/shared-types";
import { updateUserData } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function UpdateUserButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const { loading, error, user } = useAppSelector((state) => state.user);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<UserUpdatePayload>({
    displayName: user?.displayName || "",
  });

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await dispatch(updateUserData(formData));
    setShowForm(false);
  };

  if (!user) return <></>;

  return (
    <Box sx={{ mt: 2, textAlign: "center" }}>
      {!showForm ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
          sx={{ mb: 2 }}
        >
          Update User Data
        </Button>
      ) : (
        <Paper elevation={2} sx={{ p: 3, mb: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Display Name"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              disabled={loading}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => setShowForm(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </Button>
            </Box>
          </form>
        </Paper>
      )}

      {typeof error === "string" && error.length > 0 && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
