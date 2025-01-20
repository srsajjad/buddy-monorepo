"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import type { AppDispatch, RootState } from "../store/store";
import { fetchUserData } from "../store/slices/userSlice";

export default function FetchDataButton() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  const handleFetch = () => {
    dispatch(fetchUserData());
  };

  return (
    <Box sx={{ textAlign: "center", my: 4 }}>
      {user ? (
        <Card sx={{ mb: 4, textAlign: "left" }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Avatar src={user.photoURL} alt={user.displayName} sx={{ mr: 2 }}>
                {user.displayName?.[0]}
              </Avatar>
              <Box>
                <Typography variant="h6">{user.displayName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>
            {user.createdAt && (
              <Typography variant="body2" color="textSecondary">
                Account created: {new Date(user.createdAt).toLocaleDateString()}
              </Typography>
            )}
            {user.updatedAt && (
              <Typography variant="body2" color="textSecondary">
                Last updated: {new Date(user.updatedAt).toLocaleDateString()}
              </Typography>
            )}
          </CardContent>
        </Card>
      ) : (
        <Button variant="contained" onClick={handleFetch} disabled={loading}>
          {loading ? "Fetching..." : "Fetch User Data"}
        </Button>
      )}

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
