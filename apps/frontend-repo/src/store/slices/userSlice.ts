import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { User, UserUpdatePayload, ApiResponse } from "@repo/shared-types";
import { userApi } from "@/apis/userApi";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const fetchUserData = createAsyncThunk<
  ApiResponse<User>,
  undefined,
  { rejectValue: string }
>("user/fetchUserData", async (_, { rejectWithValue }) => {
  try {
    const response = await userApi.fetchUserData();
    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "User not authenticated") {
      return rejectWithValue("Authentication required");
    }
    return rejectWithValue("Failed to fetch user data");
  }
});

export const updateUserData = createAsyncThunk<
  ApiResponse<User>,
  UserUpdatePayload,
  { rejectValue: string }
>("user/updateUserData", async (userData, { rejectWithValue }) => {
  try {
    const response = await userApi.updateUserData(userData);
    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "User not authenticated") {
      return rejectWithValue("Authentication required");
    }
    return rejectWithValue("Failed to update user data");
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setAuthenticated: (state, action: { payload: boolean }) => {
      state.isAuthenticated = action.payload;
      if (!action.payload) {
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
        if (action.payload === "Authentication required") {
          state.isAuthenticated = false;
          state.user = null;
        }
      })
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
        if (action.payload === "Authentication required") {
          state.isAuthenticated = false;
          state.user = null;
        }
      });
  },
});

export const { clearError, setAuthenticated } = userSlice.actions;
export default userSlice.reducer;
