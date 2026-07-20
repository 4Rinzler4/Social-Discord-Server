import { AuthService } from "@/services/auth-service";
import { clearAccessToken, setAccessToken } from "@/services/token-service";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type UserState = {
  authChecked: boolean;
  isAuthenticated: boolean;
  pageLoad: boolean;
};

const initialState: UserState = {
  authChecked: false,
  isAuthenticated: false,
  pageLoad: false,
};

export const checkAuth = createAsyncThunk(
  "appUser/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AuthService.refresh();
      setAccessToken(data.accessToken);
      return true;
    } catch (error) {
      clearAccessToken();
      return rejectWithValue(`Unknown error: ${error}`);
    }
  },
);

const userSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    authSuccess(state) {
      state.isAuthenticated = true;
    },
    setPageLoading(state, action: PayloadAction<boolean>) {
      state.pageLoad = action.payload;
    },
    logout(state) {
      clearAccessToken();
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state) => {
        state.authChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authChecked = true;
        state.isAuthenticated = false;
      });
  },
});

export const { authSuccess, logout, setPageLoading } = userSlice.actions;
export default userSlice.reducer;
